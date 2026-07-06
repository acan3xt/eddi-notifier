function testDiscord() {
  UrlFetchApp.fetch("Discord Webhook URLを入力", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      content: "テスト通知"
    })
  });
}
