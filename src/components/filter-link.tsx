import Link from "next/link";
export function FilterLink({ label, param, subtle = false, active = false }: { label: string; param: "genre" | "tag"; subtle?: boolean; active?: boolean }) { return <Link className={`filter-chip${subtle ? " subtle" : ""}${active ? " active" : ""}`} href={`/search?${param}=${encodeURIComponent(label)}`}>{label}<span>{subtle ? "+" : "↗"}</span></Link>; }
