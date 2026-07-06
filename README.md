# エッヂャーアラート (eddi-notifier)

エッヂ掲示板の最新スレッド一覧を定期的に取得し、  
指定したキーワードを含む新規スレッドが立った場合にDiscordへ自動通知するGoogle Apps Scriptです。

---

# 特徴

- 無料
- サーバー不要（Google Apps Scriptのみで動作）
- スレッド一覧を定期取得
- キーワードフィルタリング
- 除外ワード対応
- 重複通知防止（既読管理）
- Discord Webhook通知
- eddibb.cc / kyodemo リンク切替（LINK_MODE）

## 必要なもの

- Googleアカウント
- 自身の管理下にあるDiscordのサーバーorチャンネル


---

# 導入方法

## 1. Discord Webhook URLの取得

Discordサーバーの対象チャンネルでWebhookを作成します。

1. チャンネルを右クリック →「チャンネルの編集」
2. 「連携サービス」→「ウェブフック」
3. 「ウェブフックを作成」
4. 「ウェブフックURLをコピー」

Webhook URLは絶対に他人に公開しないでください

---

## 2. Google Apps Script の作成

https://script.google.com/home

- 新しいプロジェクトを作成
- `Code.gs` にスクリプト (https://github.com/acan3xt/eddi-notifier/blob/main/Google%20Apps%20Script) を貼り付け
- 初期生成される `myFunction()` などの関数はすべて削除

---

## 3. Webhook URLの設定

先ほど取得したWebhook URLに書き換えます。

```js
const DISCORD_WEBHOOK =
  "https://discordapp.com/api/webhooks/0000000000000000000/qwertyuiopasdfghjklzxcvbnm";
```
---

## 4. 初回実行時の注意

Discord APIとエッヂのsubject-metadent.txtに対して外部通信を行うため初回のスクリプト起動時とトリガーの設定時に権限承認が必要です。

表示された画面で以下を選択してください：
- 「詳細」
- 「安全ではないページに移動」
- 「許可」

---
## 5. 自動実行用のトリガー設定

1.  左メニューから「トリガー」を選択
2. 「トリガーを追加」
3.  時間ベースのトリガーのタイプを選択「分ベースのタイマー」
4.  時間の間隔を選択（時間）
5. 「5分おき」（任意の時間を選択）
6.  保存
7.  権限の承認をする

---

## 6. キーワードの設定

""で囲われた単語を書き換えることでキーワードを設定することができます。
大文字小文字は区別されず除外ワードは通知キーワードよりも優先されます。

```js
 //通知キーワード
const KEYWORDS = [
  "通知ワード1",
  "通知ワード2",
  "通知ワード3",
  "通知ワード4",
  "通知ワード5",
  "通知ワード6"
];
 //除外ワード
const EXCLUDE_KEYWORDS = [
  "hoge_",
  "fuga_",
  "foo_",
  "bar_"
];
```

---

## 7. Discord表示設定

スレッドのリンク表示方法を切り替えられます。

```js
const LINK_MODE = "both"; 
// エッヂのみ"eddibb" | Kyodemoのみ"kyodemo" | 両方表示"both"
```
Discordの通知にeddibbsのリンクのみを表示させたい場合はconst LINK_MODE = "both"; から"eddibb"に書き換えてください。

デフォルトでは両方表示されています。

---
This project is licensed under the MIT License.
