function replyMessage(token, replyText) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <IMlkJM9IrPaMynTNEyS5oa5lxgAep1mbdzW3F320ZkZQeiHNtSp4NC0rIuWIFO43QslvGbILP/tjpH8GOX7iy2x92LZ0N6ZCaU5H6/EcHO65T8vMpn2P2D8tJT3+Ip6+dlUWM/DGqrQ+S111VlYnswdB04t89/1O/w1cDnyilFU=>"
  };
  
  var postData = {
    "replyToken" : token,
    "messages" : [{
      "type" : "text",
      "text" : replyText
    }]
  };
  
  var options = {
    "method" : "POST",
    "headers" : lineHeader,
    "payload" : JSON.stringify(postData)
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
  }
  
  catch (error) {
    Logger.log(error.name + "：" + error.message);
    return;
  }
  
  if (response.getResponseCode() === 200) {
    Logger.log("Sending message completed.");
  }
}
