export type GameSource = "igdb" | "steam" | "itch" | "indiehub";
export type NamedItem = { id: string; name: string };
export type StoreLink = { store: "steam" | "itch" | "epic" | "gog" | "official"; url: string };
export type Game = { id: string; source: GameSource; sourceId: string; title: string; summary: string | null; coverImageUrl: string | null; coverClass: string; screenshots: string[]; releaseDate: string | null; genres: NamedItem[]; tags: NamedItem[]; platforms: NamedItem[]; developers: NamedItem[]; publishers: NamedItem[]; storeLinks: StoreLink[]; officialWebsiteUrl: string | null };
