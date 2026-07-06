const URL = "https://bbs.eddibb.cc/liveedge/subject-metadent.txt";

 //あなたのDiscord Webhook URLに書き換える
const DISCORD_WEBHOOK =
  "https://discordapp.com/api/webhooks/0000000000000000000/qwertyuiopasdfghjklzxcvbnm";
 //通知キーワード
const KEYWORDS = [
  "通知ワード",
  "通知ワード1",
  "通知ワード2",
  "通知ワード3",
  "通知ワード4"
];
 //除外ワード
const EXCLUDE_KEYWORDS = [
  "hoge_",
  "fuga_",
  "foo_",
  "bar_"
];

const LINK_MODE = "both"; 
// エッヂのみ"eddibb" | Kyodemoのみ"kyodemo" | 両方表示"both"  

function checkThreads() {

  const props = PropertiesService.getScriptProperties();

  let seen =
    JSON.parse(props.getProperty("seen") || "[]");

  let seenSet = new Set(seen);

  const text = UrlFetchApp.fetch(URL).getContentText("Shift_JIS");

  const lines = text.split("\n");

  const messages = [];

  for (const line of lines) {

    if (!line.includes(".dat<>")) continue;

    const dat = line.split(".dat<>")[0];
    let title = line.split(".dat<>")[1].split(" (")[0];
    
    title = decodeHtml(title);
    
    // 除外キーワード
    if (EXCLUDE_KEYWORDS.some(k =>
    title.toLowerCase().includes(k.toLowerCase())
    )) {
      continue;
      }

    if (seenSet.has(dat))
      continue;

    seenSet.add(dat);

    if (
      KEYWORDS.length &&
      !KEYWORDS.some(k =>
        title.toLowerCase().includes(k.toLowerCase())
      )
    ) {
      continue;
    }

    messages.push({
     content:
       ` **${title}**\n${buildLinks(dat)}`
    });
  }

  // 古い順に送信
  messages.reverse().forEach(msg => {
    UrlFetchApp.fetch(DISCORD_WEBHOOK, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(msg)
    });
  });

const seenArray = [...seenSet].slice(-1000); 
  
  props.setProperty(
    "seen",
    JSON.stringify(seenArray)
  );

  Logger.log(messages.length + " new thread(s)");
}

function decodeHtml(text) {
  return text
    // 数値文字参照（10進）
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))

    // 数値文字参照（16進）
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
      String.fromCodePoint(parseInt(h, 16))
    )

    // よく使われるHTMLエンティティ
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function buildLinks(dat) {
  const urls = [];

  if (LINK_MODE === "eddibb" || LINK_MODE === "both") {
    urls.push(`eddibb: https://bbs.eddibb.cc/test/read.cgi/liveedge/${dat}/`);
  }

  if (LINK_MODE === "kyodemo" || LINK_MODE === "both") {
    urls.push(`kyodemo: https://www.kyodemo.net/sdemo/r/e_e_liveedge/${dat}/`);
  }

  return urls.join("\n");
}
