import { ProfileView } from "@/components/profile-view";
import { featuredGames } from "@/lib/games/mock-data";
import { currentUser } from "@/lib/social/mock-posts";
import type { DevelopmentPost } from "@/types/post";

export const metadata = { title: "マイプロフィール" };
const myPosts: DevelopmentPost[] = [{ id: "my-post-1", author: currentUser, game: featuredGames[5], type: "progress", body: "新しいアドベンチャーゲームの世界観を考えています。今日は主人公が最初に訪れる街のラフを作りました。少しずつ形になっていく時間が一番楽しい。", createdAt: "35分前", mediaClass: "post-media-paper", mediaLabel: "FIRST CONCEPT / WIP", likes: 12, comments: 3 }];
export default function MyProfilePage() { return <ProfileView creator={currentUser} posts={myPosts} games={[featuredGames[5]]} isOwn/>; }
