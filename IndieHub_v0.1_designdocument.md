# IndieHub v0.1 基本設計書

## 1. 文書概要

### 1.1 文書名
IndieHub v0.1 基本設計書

### 1.2 対象システム
IndieHub

### 1.3 目的
本書は、IndieHub v0.1 の要件定義をもとに、実装に必要となるシステム構成、画面構成、データ構造、外部API連携、主要処理フロー、ディレクトリ構成などを定義することを目的とする。

IndieHub v0.1 では、SNS機能より先に「インディーゲーム情報を探す・見る」機能を実装する。

---

# 2. システム概要

IndieHub は、インディーゲームに関する情報取得に特化したサービスである。

v0.1 では、PCブラウザから利用可能なWebアプリケーションとして開発し、以下を実現する。

- インディーゲーム一覧の閲覧
- ゲームタイトルによる検索
- ジャンルによる絞り込み
- タグによる絞り込み
- ゲーム詳細情報の閲覧
- Steam等の外部販売ページへの遷移
- 外部ゲーム情報APIからのデータ取得

将来的には、ユーザー登録、お気に入り、通知、開発者投稿、SNS、スマートフォンアプリへ拡張する。

---

# 3. システム構成

## 3.1 全体構成

```text
[ユーザー]
    |
    | HTTPS
    v
[Next.js Web Application]
    |
    +-- UI / Page
    |
    +-- Server Components / Route Handlers
    |
    +-- IndieHub API Layer
          |
          +---- IGDB API
          |
          +---- Steam API
          |
          +---- itch.io API（将来拡張）
          |
          +---- Supabase
                  |
                  +---- PostgreSQL
```

---

## 3.2 採用技術

| 分類 | 技術 |
|---|---|
| 言語 | TypeScript |
| Webフレームワーク | Next.js |
| UIライブラリ | React |
| CSS | Tailwind CSS |
| UIコンポーネント | shadcn/ui（必要に応じて） |
| データベース | PostgreSQL |
| BaaS | Supabase |
| ゲーム情報 | IGDB API |
| Steam情報 | Steam Web API |
| バージョン管理 | Git / GitHub |
| 開発環境 | WSL2 / Ubuntu |
| DB実行環境 | Docker |
| 将来のスマホ対応 | React Native + Expo |

---

# 4. アーキテクチャ方針

## 4.1 基本方針

初期バージョンでは、フロントエンドとバックエンドを完全分離せず、Next.jsプロジェクト内で以下をまとめて管理する。

- 画面表示
- APIエンドポイント
- 外部API連携
- データ整形
- DBアクセス

独立したExpressサーバー等はv0.1では使用しない。

---

## 4.2 クライアントとサーバーの責務

### クライアント側

主に以下を担当する。

- 検索文字列の入力
- ジャンル選択
- タグ選択
- ゲーム一覧表示
- ゲーム詳細表示
- ユーザー操作に応じた画面更新

### サーバー側

主に以下を担当する。

- 外部APIへのリクエスト
- APIキーの管理
- ゲームデータの整形
- データベースアクセス
- 検索・絞り込み処理
- エラーハンドリング

APIキー等の秘密情報はクライアントへ送信しない。

---

# 5. 画面設計

## 5.1 画面一覧

| 画面ID | 画面名 | パス | 概要 |
|---|---|---|---|
| SCR-001 | トップページ | `/` | ゲーム一覧、検索、ジャンル、タグを表示 |
| SCR-002 | 検索結果 | `/search` | 検索・絞り込み結果を表示 |
| SCR-003 | ゲーム詳細 | `/games/[id]` | 選択したゲームの詳細を表示 |

---

# 6. SCR-001 トップページ

## 6.1 目的

ユーザーがIndieHubにアクセスした際の入口となる画面。

インディーゲーム一覧を表示し、検索やジャンル選択を開始できるようにする。

---

## 6.2 画面構成

```text
+--------------------------------------------------+
| IndieHub                              Search     |
+--------------------------------------------------+
|                                                  |
| ゲームを探す                                     |
| [________________________________] [検索]         |
|                                                  |
| ジャンル                                          |
| [Action] [RPG] [Horror] [Puzzle] ...             |
|                                                  |
| タグ                                              |
| [Roguelike] [Pixel Art] [Cozy] ...               |
|                                                  |
| おすすめ / ゲーム一覧                             |
|                                                  |
| [Game Card] [Game Card] [Game Card]              |
| [Game Card] [Game Card] [Game Card]              |
|                                                  |
+--------------------------------------------------+
```

---

## 6.3 ゲームカード表示項目

- カバー画像
- ゲームタイトル
- ジャンル
- 主要タグ
- 発売日
- 対応プラットフォーム

ゲームカードを選択するとゲーム詳細画面へ遷移する。

---

# 7. SCR-002 検索結果画面

## 7.1 URL例

```text
/search?q=horror
/search?genre=RPG
/search?tag=roguelike
/search?q=horror&genre=Adventure
```

---

## 7.2 表示項目

- 検索キーワード
- 選択中ジャンル
- 選択中タグ
- 検索結果件数
- ゲームカード一覧
- 結果が存在しない場合のメッセージ

---

## 7.3 検索条件

以下の条件を扱える構造とする。

```ts
type GameSearchParams = {
  query?: string
  genre?: string
  tags?: string[]
  platform?: string
}
```

v0.1では最低限、以下を利用する。

- query
- genre
- tags

---

# 8. SCR-003 ゲーム詳細画面

## 8.1 URL

```text
/games/[id]
```

例：

```text
/games/12345
```

---

## 8.2 表示内容

- タイトル
- カバー画像
- スクリーンショット
- ゲーム説明
- ジャンル
- タグ
- 発売日
- 開発者
- パブリッシャー
- 対応プラットフォーム
- Steam等の販売ページ
- 公式サイト

---

# 9. コンポーネント設計

## 9.1 共通コンポーネント

| コンポーネント | 責務 |
|---|---|
| Header | ロゴやナビゲーションを表示 |
| SearchBar | ゲーム検索入力 |
| GameCard | ゲーム概要をカード表示 |
| GameGrid | GameCardの一覧表示 |
| GenreFilter | ジャンル絞り込み |
| TagFilter | タグ絞り込み |
| PlatformBadge | 対応プラットフォーム表示 |
| StoreLinkButton | 販売ページへのリンク |
| Loading | 読み込み中表示 |
| ErrorMessage | エラー表示 |
| EmptyState | 検索結果0件時の表示 |

---

# 10. データ設計

## 10.1 Game型

IndieHub内部では、各外部APIの形式をそのまま利用せず、共通のGame型に変換する。

```ts
type Game = {
  id: string
  source: GameSource
  sourceId: string
  title: string
  summary: string | null
  coverImageUrl: string | null
  screenshots: string[]
  releaseDate: string | null
  genres: Genre[]
  tags: Tag[]
  platforms: Platform[]
  developers: Company[]
  publishers: Company[]
  storeLinks: StoreLink[]
  officialWebsiteUrl: string | null
}
```

---

## 10.2 GameSource型

```ts
type GameSource =
  | "igdb"
  | "steam"
  | "itch"
  | "indiehub"
```

---

## 10.3 Genre型

```ts
type Genre = {
  id: string
  name: string
}
```

---

## 10.4 Tag型

```ts
type Tag = {
  id: string
  name: string
}
```

---

## 10.5 Platform型

```ts
type Platform = {
  id: string
  name: string
}
```

---

## 10.6 Company型

```ts
type Company = {
  id: string
  name: string
}
```

---

## 10.7 StoreLink型

```ts
type StoreLink = {
  store: "steam" | "itch" | "epic" | "gog" | "official"
  url: string
}
```

---

# 11. データベース設計方針

v0.1では外部APIからゲームを直接取得する実装から開始してよい。

ただし、将来的な以下の機能を考慮し、ゲームデータをSupabaseへ保存できる構造を想定する。

- 検索高速化
- API呼び出し回数削減
- お気に入り
- セール履歴
- 通知
- 開発者登録ゲーム
- 独自タグ
- ゲーム情報の統合

---

# 12. 主要テーブル案

## 12.1 games

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | IndieHub内部ゲームID |
| source | varchar | データ取得元 |
| source_id | varchar | 外部API側ID |
| title | varchar | タイトル |
| summary | text | 概要 |
| cover_image_url | text | カバー画像 |
| release_date | date | 発売日 |
| official_website_url | text | 公式サイト |
| created_at | timestamp | 作成日時 |
| updated_at | timestamp | 更新日時 |

---

## 12.2 genres

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | ジャンルID |
| name | varchar | ジャンル名 |

---

## 12.3 game_genres

| カラム | 型 | 内容 |
|---|---|---|
| game_id | uuid | ゲームID |
| genre_id | uuid | ジャンルID |

---

## 12.4 tags

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | タグID |
| name | varchar | タグ名 |

---

## 12.5 game_tags

| カラム | 型 | 内容 |
|---|---|---|
| game_id | uuid | ゲームID |
| tag_id | uuid | タグID |

---

## 12.6 platforms

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | プラットフォームID |
| name | varchar | プラットフォーム名 |

---

## 12.7 game_platforms

| カラム | 型 | 内容 |
|---|---|---|
| game_id | uuid | ゲームID |
| platform_id | uuid | プラットフォームID |

---

## 12.8 store_links

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | ID |
| game_id | uuid | ゲームID |
| store | varchar | Steam等 |
| url | text | 販売ページURL |

---

# 13. API設計

## 13.1 IndieHub内部API

Next.js Route Handlersを利用する場合、以下のAPIを想定する。

### GET /api/games

ゲーム一覧を取得する。

#### Query Parameters

| 項目 | 必須 | 内容 |
|---|---|---|
| q | No | タイトル検索 |
| genre | No | ジャンル |
| tag | No | タグ |
| page | No | ページ番号 |

#### レスポンス例

```json
{
  "games": [
    {
      "id": "123",
      "title": "Example Game",
      "coverImageUrl": "https://example.com/image.jpg",
      "genres": [
        {
          "id": "1",
          "name": "Action"
        }
      ],
      "tags": [
        {
          "id": "2",
          "name": "Pixel Art"
        }
      ]
    }
  ],
  "page": 1,
  "total": 120
}
```

---

## 13.2 GET /api/games/[id]

特定ゲームの詳細を取得する。

### レスポンス

```json
{
  "id": "123",
  "title": "Example Game",
  "summary": "ゲーム説明",
  "coverImageUrl": "...",
  "screenshots": [],
  "releaseDate": "2026-01-01",
  "genres": [],
  "tags": [],
  "platforms": [],
  "developers": [],
  "publishers": [],
  "storeLinks": []
}
```

---

# 14. 外部API連携設計

## 14.1 IGDB

v0.1の主要ゲーム情報取得元として使用する。

取得候補：

- ID
- タイトル
- summary
- cover
- screenshots
- genres
- themes
- platforms
- release_dates
- involved_companies
- websites

IGDB固有のレスポンスをそのまま画面へ渡さず、Game型へ変換する。

---

## 14.2 Steam

Steam関連情報の補完に使用する。

主な用途候補：

- Steam Store URL
- Steam App ID
- 価格
- セール情報
- Steam上でのゲーム情報

セール情報はv0.1では必須とせず、後続バージョンで本格実装する。

---

## 14.3 itch.io

将来的なデータ取得元として想定する。

公式APIで取得できる範囲を確認しながら段階的に実装する。

itch.ioに存在する全ゲームをSteamと同じ方法で横断検索できることを前提にはしない。

---

# 15. 外部API抽象化

外部サービスごとの差異を吸収するため、API処理をサービス層へ分離する。

```text
lib/
  games/
    igdb.ts
    steam.ts
    itch.ts
    normalize-game.ts
```

例：

```ts
async function searchGames(
  params: GameSearchParams
): Promise<Game[]> {
  const result = await searchIgdbGames(params)

  return result.map(normalizeIgdbGame)
}
```

画面側では、どの外部APIから取得したデータかを意識しなくてよい構造を目指す。

---

# 16. 主要処理フロー

## 16.1 ゲーム一覧表示

```text
ユーザー
    |
    | トップページへアクセス
    v
Next.js
    |
    | ゲーム一覧取得
    v
Game Service
    |
    +---- DB確認
    |
    +---- 必要に応じて外部API
    |
    v
Game[]へ整形
    |
    v
GameGrid
    |
    v
ブラウザへ表示
```

---

## 16.2 タイトル検索

```text
ユーザー
    |
    | "hollow" と入力
    v
SearchBar
    |
    | /search?q=hollow
    v
検索結果ページ
    |
    v
/api/games?q=hollow
    |
    v
Game Service
    |
    v
IGDBなど
    |
    v
Game[]
    |
    v
検索結果表示
```

---

## 16.3 ゲーム詳細

```text
ユーザー
    |
    | GameCardをクリック
    v
/games/[id]
    |
    v
ゲームIDを取得
    |
    v
Game Service
    |
    +---- DB
    |
    +---- 外部API
    |
    v
ゲーム詳細
    |
    v
Game Detail Page
```

---

# 17. エラーハンドリング

## 17.1 想定エラー

- 外部APIが利用できない
- API認証失敗
- APIレート制限
- ネットワークエラー
- ゲームが見つからない
- 不正なゲームID
- DB接続エラー
- 画像取得失敗

---

## 17.2 表示方針

ユーザーには技術的なエラー内容をそのまま表示しない。

例：

```text
ゲーム情報を取得できませんでした。
時間をおいてもう一度お試しください。
```

ゲームが存在しない場合：

```text
指定されたゲームが見つかりませんでした。
```

---

# 18. ローディング設計

外部API取得中はローディングUIを表示する。

例：

```text
ゲームを読み込んでいます...
```

またはゲームカード型のSkeleton UIを使用する。

---

# 19. セキュリティ設計

## 19.1 APIキー

以下のような秘密情報をクライアントへ公開しない。

- IGDB Client Secret
- Steam API Key
- Supabase Service Role Key

`.env.local`などの環境変数で管理する。

---

## 19.2 環境変数例

```env
IGDB_CLIENT_ID=
IGDB_CLIENT_SECRET=

STEAM_API_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

秘密情報に `NEXT_PUBLIC_` を付けない。

---

# 20. ディレクトリ構成案

Next.js App Routerを利用する。

```text
indiehubapp/
|
+-- app/
|   |
|   +-- page.tsx
|   |
|   +-- search/
|   |   +-- page.tsx
|   |
|   +-- games/
|   |   +-- [id]/
|   |       +-- page.tsx
|   |
|   +-- api/
|       +-- games/
|           +-- route.ts
|           +-- [id]/
|               +-- route.ts
|
+-- components/
|   +-- Header.tsx
|   +-- SearchBar.tsx
|   +-- GameCard.tsx
|   +-- GameGrid.tsx
|   +-- GenreFilter.tsx
|   +-- TagFilter.tsx
|   +-- PlatformBadge.tsx
|   +-- StoreLinkButton.tsx
|
+-- lib/
|   |
|   +-- games/
|   |   +-- search-games.ts
|   |   +-- get-game.ts
|   |   +-- normalize-game.ts
|   |
|   +-- external/
|   |   +-- igdb.ts
|   |   +-- steam.ts
|   |   +-- itch.ts
|   |
|   +-- supabase/
|       +-- client.ts
|       +-- server.ts
|
+-- types/
|   +-- game.ts
|
+-- public/
|
+-- .env.local
+-- package.json
+-- README.md
```

---

# 21. レスポンシブ設計

v0.1ではPCを主対象とするが、スマホ対応を見越して画面幅を固定しすぎない。

ゲーム一覧は例として以下とする。

```text
Desktop:
4カード / 1行

Tablet:
2～3カード / 1行

Mobile:
1～2カード / 1行
```

Tailwind CSSのレスポンシブ機能を利用する。

---

# 22. 状態管理

v0.1では大規模なグローバル状態管理ライブラリを導入しない。

以下を基本とする。

- URL Query Parameters
- React State
- Server Components
- Next.jsのデータ取得機能

必要性が明確になった場合のみ、Zustand等を追加する。

---

# 23. ページング

ゲーム件数が多くなることを考慮し、一度に全ゲームを取得しない。

例：

```text
1ページ = 20ゲーム
```

API例：

```text
/api/games?page=1
/api/games?page=2
```

UIは初期段階では、

- 「次へ」
- 「前へ」

によるページングでよい。

無限スクロールは将来検討する。

---

# 24. キャッシュ方針

外部APIを毎回直接呼び出すと以下の問題がある。

- レスポンスが遅くなる
- API制限に到達する可能性
- 外部サービス障害の影響を受ける

そのため将来的には、

```text
ユーザー
    |
    v
IndieHub
    |
    +---- DB / Cache
              |
              | データが古い場合のみ
              v
          外部API
```

とする。

v0.1初期では、まず外部APIとの疎通を優先してよい。

---

# 25. ログ設計

サーバー側では最低限以下をログとして記録する。

- API通信失敗
- 外部APIレスポンスエラー
- DB接続失敗
- 不正なパラメータ

APIキー等の秘密情報はログへ出力しない。

---

# 26. テスト方針

## 26.1 v0.1で確認する項目

### トップページ

- ページが表示される
- ゲーム一覧が表示される
- ゲームカードを押せる

### 検索

- タイトルで検索できる
- 該当するゲームが表示される
- 0件時に適切な表示になる

### ジャンル

- ジャンルを選択できる
- 選択ジャンルのゲームのみ表示される

### タグ

- タグを選択できる
- タグによる絞り込みができる

### 詳細ページ

- ゲーム情報が表示される
- 不正IDでエラーになる
- 外部ストアリンクが機能する

---

# 27. v0.1 開発タスク構成

## Phase 1: UI基盤

- Next.jsセットアップ
- Tailwind CSS設定
- Header作成
- GameCard作成
- GameGrid作成
- 仮ゲームデータ表示

---

## Phase 2: 画面作成

- トップページ
- 検索結果ページ
- ゲーム詳細ページ
- レスポンシブ対応

---

## Phase 3: IGDB連携

- IGDB開発者登録
- API認証
- APIクライアント作成
- ゲーム検索
- ゲーム詳細取得
- IndieHub Game型への変換

---

## Phase 4: 検索・フィルタリング

- タイトル検索
- ジャンル検索
- タグ検索
- ページング

---

## Phase 5: Steam連携

- Steam情報取得
- Steam App ID管理
- Steam Storeリンク表示

価格・セール機能は後続フェーズでもよい。

---

## Phase 6: DB導入

- Supabaseプロジェクト作成
- PostgreSQL接続
- gamesテーブル
- genresテーブル
- tagsテーブル
- platformsテーブル
- store_linksテーブル

---

# 28. 将来拡張を考慮した設計

以下はv0.1では実装しないが、後から追加可能な構造とする。

## ユーザー機能

```text
users
favorites
follows
```

---

## 通知機能

```text
game_follows
notifications
price_history
```

---

## SNS

```text
posts
comments
likes
user_follows
```

---

## 開発者

```text
developer_profiles
developer_games
development_posts
```

---

# 29. スマートフォン版への移行方針

将来的にはReact Native + Expoでスマートフォン向けUIを作成する。

Web版とスマートフォン版では画面実装は分かれるが、以下は共有可能な設計を目指す。

```text
                 IndieHub API
                /            \
               /              \
      Next.js Web          React Native
         PC               iOS / Android
               \              /
                \            /
                Supabase / DB
```

共有対象：

- DB
- API
- データモデル
- 外部API連携
- 認証
- お気に入り情報
- SNSデータ

---

# 30. v0.1 完成条件

以下をすべて満たした場合、基本機能完成とする。

- PCブラウザでIndieHubを利用できる
- ゲーム一覧を表示できる
- 外部APIから実際のゲーム情報を取得できる
- ゲームタイトルで検索できる
- ジャンルで絞り込める
- タグで絞り込める
- ゲーム詳細を表示できる
- Steam等の外部ページへ遷移できる
- APIキーがブラウザ側に公開されていない
- 外部APIエラー時にアプリ全体がクラッシュしない

---

# 31. 開発優先順位

実装は以下の順番で進める。

```text
1. Next.jsの画面を表示
        ↓
2. 仮データでゲーム一覧を作成
        ↓
3. GameCard / GameGridを完成
        ↓
4. ゲーム詳細画面
        ↓
5. タイトル検索
        ↓
6. IGDB API連携
        ↓
7. ジャンル・タグ検索
        ↓
8. Steam連携
        ↓
9. Supabase導入
        ↓
10. v0.1完成
```

最初からDBや複数の外部APIを同時に実装せず、まず仮データでUIと画面遷移を完成させる。

---

# 32. 次期バージョン

## IndieHub v0.2

候補機能：

- ユーザー登録
- ログイン
- お気に入り
- ゲームフォロー

## IndieHub v0.3

候補機能：

- Steam価格取得
- セール追跡
- 値下げ通知
- 発売日通知

## IndieHub v0.4

候補機能：

- 投稿
- いいね
- コメント
- フォロー
- タイムライン

## IndieHub v0.5

候補機能：

- 開発者プロフィール
- 開発者によるゲーム登録
- 開発進捗投稿
- ゲーム告知

## IndieHub v1.0

候補：

- Web版正式公開
- SNS機能統合
- 通知機能
- 検索・レコメンド強化
- スマートフォン版開発開始
