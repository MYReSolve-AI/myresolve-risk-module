import { SECTIONS } from "./questions";

/**
 * Department cost range assumptions inherited from v0.3.1.
 * These are fixed scenario inputs, not calculated financial models.
 */
export function departmentCostRange(
  sectionIndex: number,
): readonly [number, number] {
  const section = SECTIONS[sectionIndex];
  if (!section) {
    throw new Error(`Unknown section index: ${sectionIndex}`);
  }
  return section.cost;
}

export function allDepartmentCostRanges(): ReadonlyArray<{
  name: string;
  low: number;
  high: number;
}> {
  return SECTIONS.map((s) => ({
    name: s.name,
    low: s.cost[0],
    high: s.cost[1],
  }));
}
