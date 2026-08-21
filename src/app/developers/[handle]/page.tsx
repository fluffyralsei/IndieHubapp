import { notFound } from "next/navigation";
import { ProfileView } from "@/components/profile-view";
import { creators, developmentPosts } from "@/lib/social/mock-posts";
import { featuredGames } from "@/lib/games/mock-data";

type Props = { params: Promise<{ handle: string }> };
export default async function DeveloperProfilePage({ params }: Props) { const { handle } = await params; const creator = creators.find((item) => item.handle === `@${handle}`); if (!creator) notFound(); const posts = developmentPosts.filter((post) => post.author.id === creator.id); const games = featuredGames.filter((game) => posts.some((post) => post.game.id === game.id)); return <ProfileView creator={creator} posts={posts} games={games}/>; }
