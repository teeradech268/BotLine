function doPost(e) {
  // Main Function when Line User connect to Line Server. Line Server receive JSON from user.
  
  // ssId from Google Sheet Url.
  var ssId = "1P23XLdxyBR_KotFZWDWrJQG8M5OMb2EsKYmynFnrBrs";
  var ss = SpreadsheetApp.openById(ssId);
  var sheetUsers = ss.getSheetByName("users");
  var sheetGroup = ss.getSheetByName("group");
  
  
  
  //use BetterLog to get log.
  Logger = BetterLog.useSpreadsheet(ssId);
  
  //Example log.
  //Logger.log("Hello from BetterLog :)");
  
  var requestJSON = e.postData.contents;
  Logger.log(requestJSON);
  
  var requestObj = JSON.parse(requestJSON).events[0];
  
  var token = requestObj.replyToken;
  
  var userId = requestObj.source.userId;
  
  // Select all range cell in Google Sheet with Array 2D.
  var values = sheetUsers.getRange(2, 1, sheetUsers.getLastRow(),sheetUsers.getLastColumn()).getValues();
  var valuegroup = sheetGroup.getRange(2,1,sheetGroup.getLastRow(),sheetGroup.getLastColumn()).getValues();
  
  //------------------------------------------------------------------------------------------------------------
  
  // Use all Function with Request Object(requestObj).
  typeJoin(requestObj,token);
  typeMemberJoin(requestObj,values,sheetUsers,token);
  typeFollow(requestObj,values,sheetUsers,userId,token);
  typeUnFollow(requestObj,values,sheetUsers,userId);  
  typeMessage(requestObj,values,sheetUsers,sheetGroup,userId,token);
  typePostBack(requestObj,values,sheetUsers,sheetGroup,userId,token);
  toupdate(requestObj,sheetGroup,sheetUsers,token);
  
}
