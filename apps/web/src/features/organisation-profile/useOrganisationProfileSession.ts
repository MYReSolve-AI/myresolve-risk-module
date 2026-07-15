"use client";

import { useCallback, useMemo, useState } from "react";
import {
  SECTION_ORDER,
  areProfileFieldsComplete,
  createEmptyOrganisationProfile,
  getProfileCompletion,
  isProfileComplete,
  missingRequiredFields,
  type OrganisationProfile,
  type ProfileSectionId,
} from "@/src/domain/organisationProfile";
import {
  loadOrganisationProfile,
  saveOrganisationProfile,
  type OrganisationProfileSaveStatus,
} from "@/src/lib/organisationProfilePersistence";

export type ProfileMode = "section" | "review";

function setPathValue(
  profile: OrganisationProfile,
  path: string,
  value: unknown,
): OrganisationProfile {
  const [root, leaf] = path.split(".") as [
    keyof OrganisationProfile,
    string,
  ];
  const section = profile[root];
  if (!section || typeof section !== "object") return profile;
  return {
    ...profile,
    [root]: {
      ...(section as object),
      [leaf]: value,
    },
  };
}

export function useOrganisationProfileSession(
  initial?: OrganisationProfile,
) {
  const [profile, setProfile] = useState<OrganisationProfile>(
    () => initial ?? loadOrganisationProfile(),
  );
  const [sectionIndex, setSectionIndex] = useState(0);
  const [mode, setMode] = useState<ProfileMode>("section");
  const [saveStatus, setSaveStatus] =
    useState<OrganisationProfileSaveStatus>("idle");
  const [showValidation, setShowValidation] = useState(false);

  const currentSectionId = SECTION_ORDER[sectionIndex]!;
  const completion = useMemo(
    () => getProfileCompletion(profile),
    [profile],
  );
  const missingRequired = useMemo(
    () => missingRequiredFields(profile),
    [profile],
  );
  const fieldsComplete = useMemo(
    () => areProfileFieldsComplete(profile),
    [profile],
  );
  const explicitlyComplete = useMemo(
    () => isProfileComplete(profile),
    [profile],
  );

  const persist = useCallback((next: OrganisationProfile) => {
    setSaveStatus("saving");
    try {
      saveOrganisationProfile(next);
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }, []);

  const updateField = useCallback(
    (path: string, value: unknown) => {
      setProfile((prev) => {
        let next = setPathValue(prev, path, value);
        if (path === "operations.operatingModels") {
          const models = Array.isArray(value) ? (value as string[]) : [];
          if (!models.includes("other")) {
            next = setPathValue(next, "operations.operatingModelOther", "");
          }
        }
        // Editing clears explicit completion — require Complete again.
        next = { ...next, completedAt: null };
        persist(next);
        return next;
      });
      setShowValidation(false);
    },
    [persist],
  );

  const goNext = useCallback(() => {
    if (sectionIndex >= SECTION_ORDER.length - 1) {
      setMode("review");
      return;
    }
    setSectionIndex((i) => Math.min(SECTION_ORDER.length - 1, i + 1));
  }, [sectionIndex]);

  const goPrevious = useCallback(() => {
    if (mode === "review") {
      setMode("section");
      setSectionIndex(SECTION_ORDER.length - 1);
      return;
    }
    setSectionIndex((i) => Math.max(0, i - 1));
  }, [mode]);

  const goToSection = useCallback((id: ProfileSectionId) => {
    const index = SECTION_ORDER.indexOf(id);
    if (index >= 0) {
      setSectionIndex(index);
      setMode("section");
      setShowValidation(false);
    }
  }, []);

  const openReview = useCallback(() => {
    setMode("review");
    setShowValidation(false);
  }, []);

  const saveAndExit = useCallback(() => {
    persist(profile);
  }, [persist, profile]);

  const attemptComplete = useCallback((): boolean => {
    if (!areProfileFieldsComplete(profile)) {
      persist(profile);
      setShowValidation(true);
      setMode("review");
      return false;
    }
    const completed: OrganisationProfile = {
      ...profile,
      completedAt: new Date().toISOString(),
    };
    setProfile(completed);
    persist(completed);
    setShowValidation(false);
    return true;
  }, [persist, profile]);

  return {
    profile,
    mode,
    currentSectionId,
    sectionIndex,
    sectionCount: SECTION_ORDER.length,
    completion,
    missingRequired,
    fieldsComplete,
    explicitlyComplete,
    saveStatus,
    showValidation,
    updateField,
    goNext,
    goPrevious,
    goToSection,
    openReview,
    saveAndExit,
    attemptComplete,
    setMode,
    reset: () => {
      const empty = createEmptyOrganisationProfile();
      setProfile(empty);
      persist(empty);
      setSectionIndex(0);
      setMode("section");
    },
  };
}

export type OrganisationProfileSession = ReturnType<
  typeof useOrganisationProfileSession
>;
