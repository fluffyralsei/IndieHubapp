import Link from "next/link";
import { creators } from "@/lib/social/mock-posts";
import { featuredGames } from "@/lib/games/mock-data";

export function SocialSidebar() {
  return <aside className="social-sidebar"><section className="side-panel about-panel"><p className="eyebrow">WELCOME TO INDIEHUB</p><h2>ゲームが生まれる<br/>場所を、もっと近くに。</h2><p>開発者とプレイヤーがつながる、インディーゲームのコミュニティ。</p><button>IndieHubをはじめる</button></section><section className="side-panel"><div className="side-title"><h3>注目の開発者</h3><Link href="#">すべて見る</Link></div>{creators.map((creator) => <div className="creator-row" key={creator.id}><span className={`avatar ${creator.avatarClass}`}>{creator.name.slice(0, 1)}</span><span><strong>{creator.name}</strong><small>{creator.role}</small></span><button>フォロー</button></div>)}</section><section className="side-panel"><div className="side-title"><h3>話題のゲーム</h3><Link href="/search">もっと見る</Link></div>{featuredGames.slice(0,3).map((game, index) => <Link className="trending-game" href={`/games/${game.id}`} key={game.id}><b>0{index+1}</b><span><strong>{game.title}</strong><small>{game.tags[0]?.name}</small></span><i>↗</i></Link>)}</section></aside>;
}
