import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SocialSidebar } from "@/components/social-sidebar";
import { developmentPosts } from "@/lib/social/mock-posts";

export default function Home() {
  return <main className="social-page shell"><div className="social-layout"><section className="feed" aria-labelledby="feed-title"><div className="feed-heading"><div><p className="eyebrow">FROM THE COMMUNITY</p><h1 id="feed-title">みんなの開発ログ</h1></div><Link href="/search">ゲームを探す ↗</Link></div><div className="feed-tabs"><button className="active">おすすめ</button><button>フォロー中</button><button>リリース情報</button></div><div className="composer"><span className="avatar avatar-default">Y</span><button><span>開発の進捗やゲームの話をシェアしよう</span><b>投稿する</b></button></div>{developmentPosts.map((post) => <PostCard key={post.id} post={post} />)}<button className="load-more">もっと読み込む <span>↓</span></button></section><SocialSidebar /></div></main>;
}
