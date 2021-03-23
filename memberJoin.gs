function typeMemberJoin(requestObj,values,sheetUsers,token) {
  // Member Join Group.
  
  if(requestObj.type === "memberJoined"){
    var stackcheck = 1;
    var newuserjoin = requestObj.joined.members[0];
    var replyText;
    
    for(var i = 0;i<values.length; i++){
      
      if(values[i][0] == newuserjoin ){
        i=i+2;
        Logger.log("UserID " + newuserjoin + " is joined.");
        stackcheck = 0;
        replyText = "สวัสดีครับ คุณ "+ sheetUsers.getRange(i,2).getValue(); + ", ยินดีต้อนรับครับผม หากมีอะไรที่จะต้องทำสามารถเรียก \"ทูดู\" เพื่อใช้งานได้เลยนะครับ";
        return replyMessage(token, replyText);
      }
    }
    if (stackcheck == 1){
      newuserjoin = requestObj.joined.members.userId;
      var userProfiles = getUserProfiles(newuserjoin);
      var lastRow = sheetUsers.getLastRow();
      sheetUsers.getRange(lastRow + 1, 1).setValue(newuserjoin);
      sheetUsers.getRange(lastRow + 1, 2).setValue(userProfiles[0]);
      sheetUsers.getRange(lastRow + 1, 3).setValue(userProfiles[1]);
      sheetUsers.getRange(lastRow + 1, 4).setFormula("=image(C" + (lastRow + 1) + ")");
      sheetUsers.getRange(lastRow + 1, 7).setValue("join from group");
      replyText = "สวัสดีครับ คุณ "+ userProfiles[0] + ", ยินดีต้อนรับครับผม หากมีอะไรที่จะต้องทำสามารถเรียก \"ทูดู\" เพื่อใช้งานได้เลยนะครับ";
      return replyMessage(token, replyText);
    }
  }
}
