import Link from "next/link";
import type { DevelopmentPost } from "@/types/post";

const labels = { progress: "開発進捗", announcement: "お知らせ", release: "リリース" };

export function PostCard({ post }: { post: DevelopmentPost }) {
  return <article className="post-card">
    <header className="post-header"><Link className={`avatar ${post.author.avatarClass}`} href="#">{post.author.name.slice(0, 1)}</Link><div className="post-author"><div><strong>{post.author.name}</strong>{post.author.verified && <span className="verified" aria-label="認証済み">✓</span>}</div><p>{post.author.handle} · {post.createdAt}</p></div><span className={`post-type type-${post.type}`}>{labels[post.type]}</span><button className="more-button" aria-label="投稿メニュー">•••</button></header>
    <div className="post-content"><p>{post.body}</p>{post.mediaClass && <Link href={`/games/${post.game.id}`} className={`post-media ${post.mediaClass}`}><span className="media-grid"/><b>{post.mediaLabel}</b><i>{post.game.title}</i></Link>}<Link className="attached-game" href={`/games/${post.game.id}`}><span className={`mini-cover ${post.game.coverClass}`}>{post.game.title.slice(0, 1)}</span><span><small>DEVELOPING</small><strong>{post.game.title}</strong><em>{post.game.genres[0]?.name} · {post.game.platforms.map((x) => x.name).join(" / ")}</em></span><b>ゲームを見る ↗</b></Link></div>
    <footer className="post-actions"><button>♡ <span>{post.likes}</span></button><button>◯ <span>{post.comments}</span></button><button>↗ <span>シェア</span></button><button className="bookmark">⌑</button></footer>
  </article>;
}
