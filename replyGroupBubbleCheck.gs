function groupFlexCheck(token,Data,createFDatetime,sheetUsers,sheetGroup,groupId) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <IMlkJM9IrPaMynTNEyS5oa5lxgAep1mbdzW3F320ZkZQeiHNtSp4NC0rIuWIFO43QslvGbILP/tjpH8GOX7iy2x92LZ0N6ZCaU5H6/EcHO65T8vMpn2P2D8tJT3+Ip6+dlUWM/DGqrQ+S111VlYnswdB04t89/1O/w1cDnyilFU=>"
  };
  var values = sheetUsers.getRange(2, 1, sheetUsers.getLastRow(),sheetUsers.getLastColumn()).getValues();
  var valuegroup = sheetGroup.getRange(2,1,sheetGroup.getLastRow(),sheetGroup.getLastColumn()).getValues();
  var usergetname = [];
  var keepusername;
  var isuserid;
  var arrayuserid = [];
  var ischecklist;
  var arraychecklist = [];
  var color;
  
  for(var i = 0;i<valuegroup.length;i++){
    if(valuegroup[i][0] == groupId){
      for(var y = 4; y<sheetGroup.getLastColumn();y++){
        if(valuegroup[i][y] != ''){
          isuserid = sheetGroup.getRange(i+2,y+1).getValue();
          arrayuserid.push(isuserid);
          ischecklist = sheetGroup.getRange(i+3,y+1).getValue();
          arraychecklist.push(ischecklist);
        }
        else if(valuegroup[i][y] == ''){
          break; 
        }
      }
      break;
    }
  }
  
  for(var zzz = 0; zzz < arrayuserid.length ; zzz++){
    for(var xz = 0; xz < values.length; xz++){
      if(values[xz][0] == arrayuserid[zzz]){
        keepusername = sheetUsers.getRange(xz+2,2).getValue();
        usergetname.push(keepusername);
        break;
      }
    }
  }
  
  
  // create object and make JSON.
  var jsonloop = [];
  for (var p = 0; p <usergetname.length; p++){
    if(arraychecklist[p] == "In Progess"){
      color = "#6B6B6B";
    }
    else if(arraychecklist[p] == "Finish"){
      color = "#28E73E";
    }
    else if(arraychecklist[p] == "Overdue"){
      color = "#FF0000";
    }
    else if(arraychecklist[p] == "Finish Late"){
      color = "#F0DA3F";
    }
    var alltouse = {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": " "+usergetname[p],
          "size": "sm",
          "color": "#555555",
          "flex": 0
        },
        {
          "type": "text",
          "text": arraychecklist[p],
          "size": "sm",
          "color": color,
          "align": "end"
        }
      ]
    }
    jsonloop.push(alltouse); // push array to object.
    
    
  }
  
  var postData = {
    "replyToken" : token,
    "messages" : [{"type" : "flex","altText" : "flex","contents" :
                   {
                     "type": "bubble",
                     "size": "mega",
                     "body": {
                       "type": "box",
                       "layout": "vertical",
                       "contents": [
                         {
                           "type": "text",
                           "text": "To do List",
                           "weight": "bold",
                           "color": "#1DB446",
                           "size": "sm"
                         },
                         {
                           "type": "text",
                           "text": Data,
                           "weight": "bold",
                           "size": "xxl",
                           "margin": "md",
                           "wrap" : true
                         },
                         {
                           "type": "text",
                           "text": "ภายใน " + createFDatetime[2] + "/" + createFDatetime[1] + "/" + createFDatetime[0] + " เวลา " + createFDatetime[3] + " น.",
                           "size": "xs",
                           "color": "#aaaaaa",
                           "wrap": true
                         },
                         {
                           "type": "separator",
                           "margin": "xxl"
                         },
                         {
                           "type": "box",
                           "layout": "vertical",
                           "margin": "xxl",
                           "spacing": "sm",
                           "contents": JSON.parse(JSON.stringify(jsonloop))
                         },
                         {
                           "type": "separator",
                           "margin": "xxl"
                         },
                         {
                           "type": "box",
                           "layout": "vertical",
                           "contents": [
                             {
                               "type": "text",
                               "text": "หากทำรายการเสร็จสิ้นแล้วกดปุ่ม Clear ได้เลยนะครับ",
                               "size": "xs",
                               "wrap": true,
                               "color": "#aaaaaa"
                             }
                           ],
                           "spacing": "sm",
                           "margin": "xxl"
                         },
                         {
                           "type": "button",
                           "action": {
                             "type": "postback",
                             "label": "Clear",
                             "data": "clear"
                           },
                           "style": "primary",
                           "margin": "sm"
                         }
                       ]
                     },
                     "styles": {
                       "footer": {
                         "separator": true
                       }
                     }
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
