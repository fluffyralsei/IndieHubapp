import type { Game } from "./game";

export type Creator = {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatarClass: string;
  verified?: boolean;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt?: string;
  followers?: number;
  following?: number;
};

export type DevelopmentPost = {
  id: string;
  author: Creator;
  game: Game;
  type: "progress" | "announcement" | "release";
  body: string;
  createdAt: string;
  mediaClass?: string;
  mediaLabel?: string;
  likes: number;
  comments: number;
};
