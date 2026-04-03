const UNIT_COLOR_MAP: { keyword: string; color: string }[] = [
  { keyword: "חיל האוויר", color: "#5DADE2" },
  { keyword: "חיל הים", color: "#003366" },
  { keyword: "צנחנים", color: "#8B0000" },
  { keyword: "גולני", color: "#5C4033" },
  { keyword: "גבעתי", color: "#6A0DAD" },
  { keyword: "הנדסה", color: "#8B8C89" },
  { keyword: "נח\"ל", color: "#7CB342" },
  { keyword: "מג\"ב", color: "#004B23" },
];

const DEFAULT_COLOR = "#2563eb";

export function detectUnitColor(role: string, responsibilities: string): string {
  const text = `${role} ${responsibilities}`.toLowerCase();
  for (const { keyword, color } of UNIT_COLOR_MAP) {
    if (text.includes(keyword)) return color;
  }
  return DEFAULT_COLOR;
}
