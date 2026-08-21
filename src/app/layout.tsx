import type { Metadata } from "next";
import { Header } from "@/components/header";
import "./globals.css";
export const metadata: Metadata = { title: { default: "IndieHub — まだ知らない最高の一本へ", template: "%s | IndieHub" }, description: "気分や遊び方からインディーゲームを探せるディスカバリープラットフォーム。" };
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="ja"><body><Header />{children}<footer className="footer shell"><span>INDIEHUB</span><p>Small games. Big worlds.</p><small>© 2026 IndieHub</small></footer></body></html>; }
