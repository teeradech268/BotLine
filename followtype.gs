function typeFollow(requestObj,values,sheetUsers,userId,token) {
  
  if (requestObj.type === "follow") {
    
    //userId = requestObj.source.userId;
    var stackcheck = 1;
    for(var i = 0;i<values.length; i++){
      
      if(values[i][0] == userId ){
        i=i+2;
        Logger.log("UserID " + userId + " is follow.");
        sheetUsers.getRange(i,7).setValue("follow");
        stackcheck = 0;
        var replyText = "สวัสดีครับ คุณ "+ sheetUsers.getRange(i,2).getValue() + ", ขอบคุณที่เพิ่มทูดูเป็นเพื่อนนะครับ \nการใช้งานเบื้องต้นของน้องทูดู คือ การจดบันทึกสิ่งที่ต้องทำให้ครับ และ สามารถแจ้งเตือนคุณผู้ใช้ได้หากใกล้ถึงเวลา Deadline ในวันนั้นแล้ว\n\nสงสัยอะไรเรียกทูดูด้วยการพิมพ์ \"todo\" ได้เลยครับ!";
        return replyMessage(token, replyText);
      } //close if
    }//close for
    if (stackcheck == 1){
      var userProfiles = getUserProfiles(userId);
      var lastRow = sheetUsers.getLastRow();
      sheetUsers.getRange(lastRow + 1, 1).setValue(userId);
      sheetUsers.getRange(lastRow + 1, 2).setValue(userProfiles[0]);
      sheetUsers.getRange(lastRow + 1, 3).setValue(userProfiles[1]);
      sheetUsers.getRange(lastRow + 1, 4).setFormula("=image(C" + (lastRow + 1) + ")");
      sheetUsers.getRange(lastRow + 1, 7).setValue("follow");
      sheetUsers.getRange(lastRow + 1, 8).setValue("No");
      sheetUsers.getRange(lastRow + 1, 9).setValue("No");
      sheetUsers.getRange(lastRow + 1, 10).setValue("No");
      sheetUsers.getRange(lastRow + 1, 11).setValue("No");
      var replyText = "สวัสดีครับ คุณ "+ userProfiles[0] + ", ขอบคุณที่เพิ่มทูดูเป็นเพื่อนนะครับ \nการใช้งานเบื้องต้นของน้องทูดู คือ การจดบันทึกสิ่งที่ต้องทำให้ครับ และ สามารถแจ้งเตือนคุณผู้ใช้ได้หากใกล้ถึงเวลา Deadline ในวันนั้นแล้ว\n\nสงสัยอะไรเรียกทูดูด้วยการพิมพ์ \"todo\" ได้เลยครับ!";
      return replyMessage(token, replyText);
    } //close if
  }
  
}
