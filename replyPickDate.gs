function replyFlexMessage(token,inputWord) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <IMlkJM9IrPaMynTNEyS5oa5lxgAep1mbdzW3F320ZkZQeiHNtSp4NC0rIuWIFO43QslvGbILP/tjpH8GOX7iy2x92LZ0N6ZCaU5H6/EcHO65T8vMpn2P2D8tJT3+Ip6+dlUWM/DGqrQ+S111VlYnswdB04t89/1O/w1cDnyilFU=>"
  };
  
  var postData = {
    "replyToken" : token,
    "messages" : [{
      "type" : "flex",
      "altText" : "flex",
      "contents" : {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "size": "mega",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "จะให้สิ้นสุดเมื่อไหร่ครับ?",
                  "color": "#7C7C7C",
                  "align": "start",
                  "size": "lg",
                  "gravity": "center",
                  "weight": "bold",
                  "style": "normal"
                }
              ],
              "backgroundColor": "#FFFFFF",
              "paddingTop": "19px",
              "paddingAll": "12px",
              "paddingBottom": "16px",
              "position": "relative"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "datetimepicker",
                    "label": "เลือกวันสิ้นสุด",
                    "data": inputWord,
                    "mode": "datetime",
                    "max": "2022-12-31T23:59"
                  },
                  "position": "relative",
                  "gravity": "top",
                  "color": "#2375FF",
                  "style": "primary",
                  "height": "sm"
                }
              ],
              "spacing": "md",
              "paddingAll": "12px"
            },
            "styles": {
              "footer": {
                "separator": false
              }
            }
          }
        ]
      }
    }
                 ]
  }
  
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
