import { featuredGames } from "@/lib/games/mock-data";
import type { Creator, DevelopmentPost } from "@/types/post";

export const creators: Creator[] = [
  { id: "night-current", name: "Mina / Night Current", handle: "@nightcurrent", role: "Solo developer", avatarClass: "avatar-cyan", verified: true, bio: "深海とネオンが好きな個人ゲーム開発者。現在は探索アクション『Neon Abyssal』を制作しています。", location: "Tokyo, Japan", website: "nightcurrent.dev", joinedAt: "2025年4月", followers: 2841, following: 182 },
  { id: "fern-studio", name: "Fern Studio", handle: "@fernstudio", role: "2-person team", avatarClass: "avatar-green", verified: true, bio: "物語と心地よい時間をつくる、2人組のインディーゲームスタジオ。Moss & Moonを開発中です。", location: "Kyoto, Japan", website: "fernstudio.games", joinedAt: "2025年8月", followers: 1653, following: 94 },
  { id: "orbit-works", name: "Kai", handle: "@orbitworks", role: "Game designer", avatarClass: "avatar-violet", bio: "音と宇宙をテーマにしたゲームを作っています。", location: "Osaka, Japan", joinedAt: "2026年1月", followers: 892, following: 211 },
];

export const currentUser: Creator = { id: "indie-maker", name: "Noa", handle: "@noa_makes_games", role: "Indie game developer", avatarClass: "avatar-default", bio: "小さくても忘れられないゲームを作りたい。現在、新作アドベンチャーゲームを企画中です。", location: "Tokyo, Japan", website: "noa-games.dev", joinedAt: "2026年8月", followers: 128, following: 76 };

export const developmentPosts: DevelopmentPost[] = [
  { id: "post-1", author: creators[0], game: featuredGames[0], type: "progress", body: "深海エリアのライティングを調整しました。暗闇の中でも、プレイヤーが自然と進む方向を見つけられるように光の粒子を配置しています。", createdAt: "12分前", mediaClass: "post-media-neon", mediaLabel: "LIGHTING UPDATE / WIP", likes: 184, comments: 23 },
  { id: "post-2", author: creators[1], game: featuredGames[1], type: "announcement", body: "Moss & Moonの体験版を今週末に公開します！森で過ごす最初の3日間と、精霊たちとの出会いを遊べます。フィードバックをお待ちしています 🌿", createdAt: "2時間前", mediaClass: "post-media-moss", mediaLabel: "DEMO THIS WEEKEND", likes: 426, comments: 51 },
  { id: "post-3", author: creators[2], game: featuredGames[2], type: "progress", body: "通信パズルの新しいプロトタイプ。音だけを頼りに、遠い星から送られた信号を復元します。ヘッドフォン推奨です。", createdAt: "昨日", likes: 98, comments: 14 },
];
