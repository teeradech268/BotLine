function addDataFlex(token,datainput,createFDatetime) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <IMlkJM9IrPaMynTNEyS5oa5lxgAep1mbdzW3F320ZkZQeiHNtSp4NC0rIuWIFO43QslvGbILP/tjpH8GOX7iy2x92LZ0N6ZCaU5H6/EcHO65T8vMpn2P2D8tJT3+Ip6+dlUWM/DGqrQ+S111VlYnswdB04t89/1O/w1cDnyilFU=>"
  };
  
  var postData = {
    "replyToken" : token,
    "messages" : [{"type" : "flex","altText" : "flex","contents" :
                   {
                     "type": "carousel",
                     "contents": [
                       {
                         "type": "bubble",
                         "size": "kilo",
                         "header": {
                           "type": "box",
                           "layout": "vertical",
                           "contents": [
                             {
                               "type": "text",
                               "text": "บันทึกรายการเรียบร้อย",
                               "color": "#ffffff",
                               "align": "center",
                               "size": "lg",
                               "gravity": "center",
                               "weight": "bold"
                             }
                           ],
                           "backgroundColor": "#27ACB2",
                           "paddingTop": "6px",
                           "paddingAll": "12px",
                           "paddingBottom": "6px",
                           "spacing": "xs",
                           "margin": "xs"
                         },
                         "body": {
                           "type": "box",
                           "layout": "vertical",
                           "contents": [
                             {
                               "type": "text",
                               "text": "รายการที่บันทึกไว้",
                               "size": "sm",
                               "color": "#888888"
                             },
                             {
                               "type": "text",
                               "text": datainput,
                               "wrap": true
                             },
                             {
                               "type": "text",
                               "text": "ภายในวันที่ " + createFDatetime[2] + "/" + createFDatetime[1] + "/" + createFDatetime[0] + " " + createFDatetime[3] + " น.",
                               "size": "sm",
                               "align": "end",
                               "color": "#888888"
                             }
                           ],
                           "spacing": "md",
                           "paddingAll": "10px",
                           "paddingTop": "5px",
                           "paddingBottom": "5px"
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