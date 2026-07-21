# エッヂャーアラート (eddi-notifier)

エッヂ掲示板と一部の5ch掲示板（なんG、なんJ、ニュー速VIP、嫌儲）のスレッド一覧を定期的に取得し、
指定したキーワードを含む新規スレッドが立った際にDiscordへ自動通知するGoogle Apps Script（GAS）です。

<img width="548" height="344" alt="image" src="https://github.com/user-attachments/assets/a9bb64ba-65a6-4d06-93a2-e72b9a9017d6" />


---

## 特徴

- 無料で利用可能
- 自由にカスタマイズ可能
- サーバー不要（Google Apps Scriptのみで動作）
- エッヂや一部5ch板のスレッド一覧を定期取得
- 指定したキーワードによる通知フィルタリング
- 複数キーワードによるAND条件の通知に対応
- 除外ワード対応
- 重複通知を防止する既読管理機能
- Discord Webhook通知
- オリジナルURLとkyodemoの通知リンク切替
- エッヂのスレッド一覧取得方法を選択可能

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
- `Code.gs` にスクリプト eddiNotifier.gs (https://github.com/acan3xt/eddi-notifier/blob/main/eddiNotifier.gs) を貼り付け
- 初期生成される `myFunction()` などの関数はすべて削除

---

## 3. Webhook URLの設定

先ほど取得したWebhook URLに書き換えます。

```js
 // Discord Webhook URLを設定
const DISCORD_WEBHOOK =
  "https://discordapp.com/api/webhooks/0000000000000000000/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
```
---

## 4. 初回実行時の注意

Discord APIと各掲示板のsubject.txtに対して外部通信を行うため初回のスクリプト起動時とトリガーの設定時に権限承認が必要です。

表示された画面で以下を選択してください：
- 「詳細」
- 「安全ではないページに移動」
- 「許可」

---
## 5. 自動実行用のトリガー設定

1.  左メニューから「トリガー」を選択
2. 「トリガーを追加」
3.  実行する関数に checkThreads を選択
4.  時間ベースのトリガーのタイプを選択「分ベースのタイマー」
5.  時間の間隔を選択（時間）
6. 「5分おき」（任意の時間を選択)
7.  保存
8.  権限の承認をする

---

## 6. キーワードの設定

""で囲われた単語を書き換えることでキーワードを設定することができます。
大文字小文字は区別されず除外ワードは通知キーワードよりも優先されます。

```js
 // 通知キーワード
 // "単語" → 単語を含むスレッドを通知
 // ["単語A", "単語B"] → AとBの両方を含むスレッドを通知（AND）
const KEYWORDS = [
  "通知キーワード00",
  "通知キーワード01",
  "通知キーワード02",
  "通知キーワード03",
  "通知キーワード04",
  ["サンプルa", "サンプルb"],
  ["サンプルc", "サンプルd"],
  ["サンプルe","サンプルf"]
];
 // 除外ワード
const EXCLUDE_KEYWORDS = [
  "除外ワード00",
  "除外ワード01",
  "除外ワード02",
  "除外ワード03"
];
```

---

## 7. Discord表示設定

スレッドのリンク表示方法を切り替えられます。

```js
 // リンク表示
 // "original" → 元の掲示板リンク
 // "kyodemo"  → Kyodemoリンク
 // "both"     → 元の掲示板＋Kyodemo
const LINK_MODE = "both";
```
Discordの通知にオリジナルのリンクのみを表示させたい場合はconst LINK_MODE = "both"; から"original"に書き換えてください。

デフォルトでは両方表示されています。

---

## License

This project is licensed under the BSD Zero Clause License (0BSD).
