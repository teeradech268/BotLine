function checkDeadLine() {
  var ssId = "1P23XLdxyBR_KotFZWDWrJQG8M5OMb2EsKYmynFnrBrs";
  var ss = SpreadsheetApp.openById(ssId);
  var sheetUsers = ss.getSheetByName("users");
  var sheetGroup = ss.getSheetByName("group");
  var values = sheetUsers.getRange(2, 1, sheetUsers.getLastRow(),sheetUsers.getLastColumn()).getValues();
  var valuegroup = sheetGroup.getRange(2,1,sheetGroup.getLastRow(),sheetGroup.getLastColumn()).getValues();
  var createFDatetime = [];
  var replyText;
  
  var keepdatetime = new Date();
  var day = keepdatetime.getDate();
  var month = keepdatetime.getMonth() + 1;
  var year = keepdatetime.getFullYear();
  var hour = keepdatetime.getHours();
  var minute = keepdatetime.getMinutes();
  var userYear , userMonth , userDay , userHour , userMin;
  var groupYear , groupMonth , groupDay , groupHour , groupMin;
  
  
  for(var y = 0; y<values.length;y++){
    // year month day hour min
    if (values[y][5] != ''){
      y = y+2;
      
      // notify by time set.
      if((hour - 8 <= 0 && sheetUsers.getRange(y,8).getValue() == "No")|| (hour - 12 == 0  && sheetUsers.getRange(y,9).getValue() == "No")|| (hour - 18 == 0  && sheetUsers.getRange(y,10).getValue() == "No")|| (hour - 22 == 0  && sheetUsers.getRange(y,11).getValue() == "No")){
        var DataTime = sheetUsers.getRange(y,6).getValue();
        var datauser = sheetUsers.getRange(y,1).getValue();
        var datarec = sheetUsers.getRange(y,5).getValue();
        userYear = DataTime.substring(0,4);
        userMonth = DataTime.substring(5,7);
        userDay = DataTime.substring(8,10);
        userHour = DataTime.substring(11,13);
        userMin = DataTime.substring(14);
        var cvhour = Number(userHour);
        var cvinternetHour = Number(hour);
        if(userYear == year && userMonth == month && userDay == day && (cvhour - cvinternetHour >= 0)){
          var replyText = "ทูดูมาช่วยแจ้งเตือนนะครับ\nวันนี้เป็น Deadline ของรายการ\n\"" + datarec + "\" นะครับ\nโดยจะถึง Deadline ในเวลา " + userHour + ":" + userMin + " น. ครับ\nอย่าลืมทำด้วยนะครับ"
          pushMsg(replyText,datauser);
          if(hour - 8 == 0){
            sheetUsers.getRange(y,8).setValue('Yes');
          }
          if(hour - 12 == 0){
            sheetUsers.getRange(y,9).setValue('Yes');
          }
          if(hour - 18 == 0){
            sheetUsers.getRange(y,10).setValue('Yes');
          }
          if(hour - 22 == 0){
            sheetUsers.getRange(y,11).setValue('Yes');
          }
        }
      }
      y = y-2;
    }
  }
  DataTime = '';
  datauser = '';
  datarec = '';
  userYear = '';
  userMonth = '';
  userDay = '';
  userHour = '';
  userMin = '';
  
  
  // notify in group.
  for(var x = 0; x<valuegroup.length;x++){
    if (valuegroup[x][2] != ''){
      if(hour - 8 <= 0 && sheetGroup.getRange(x+3,4).getValue() == "No"){
        var DataTime = sheetGroup.getRange(x+2,3).getValue();
        var datagroup = sheetGroup.getRange(x+2,1).getValue();
        var datarec = sheetGroup.getRange(x+2,2).getValue();
        groupYear = DataTime.substring(0,4);
        groupMonth = DataTime.substring(5,7);
        groupDay = DataTime.substring(8,10);
        groupHour = DataTime.substring(11,13);
        groupMin = DataTime.substring(14);
        
        if(groupYear == year && groupMonth == month && groupDay == day){
          var replyText = "ทูดูมาช่วยแจ้งเตือนนะครับ\nวันนี้เป็น Deadline ของรายการ\n\"" + datarec + "\"\nโดยจะถึง Deadline ในเวลา " + groupHour + ":" + groupMin + " น. ครับ\n\nหากต้องการตรวจสอบ พิมพ์ #ch ได้เลยครับ"
          pushMsg(replyText,datagroup);
          sheetGroup.getRange(x+3,4).setValue("Yes");
        }
      }
    }
  }
}

