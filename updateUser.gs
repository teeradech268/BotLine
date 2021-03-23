function toupdate(requestObj,sheetGroup,sheetUsers,token) {
  
  // to update user when user use bot / text in a group that has bot in it.
  var values = sheetUsers.getRange(2, 1, sheetUsers.getLastRow(),sheetUsers.getLastColumn()).getValues();
  var valuegroup = sheetGroup.getRange(2,1,sheetGroup.getLastRow(),sheetGroup.getLastColumn()).getValues();
  var userId = requestObj.source.userId;
  var groupId = requestObj.source.groupId;
  var iduseringroup = [];
  var usergroup;
  var stackcheck = 1;
  var userProfiles;  
  
  if (requestObj.type === "message") {
    
    // with group.
   if(requestObj.source.groupId != null) {
     for(var i = 0; i<valuegroup.length;i++){
       if(valuegroup[i][0] == groupId){
         for(var y = 4; y<sheetGroup.getLastColumn();y++){
           if(y == sheetGroup.getLastColumn()){
             break;
           }
           else if(valuegroup[i][y] != ""){
             usergroup = sheetGroup.getRange(i+2,y+1).getValue();
             iduseringroup.push(usergroup);
             //replyMessage(token,"iduser group " + usergroup);
           }
           else if(valuegroup[i][y] == ""){
             break;
           }
         }
                 
         for(var x = 0; x< iduseringroup.length; x++){
           for(var i = 0;i<values.length; i++){
           if(values[i][0] == iduseringroup[x] ){
             userProfiles = getUserProfiles(iduseringroup[x]);
             sheetUsers.getRange(i+2, 2).setValue(userProfiles[0]);
             sheetUsers.getRange(i+2, 3).setValue(userProfiles[1]);
             sheetUsers.getRange(i+2, 4).setFormula("=image(C" + (i+2) + ")");
             stackcheck = 0;
             break;
           } //close if
         }//close for
         if (stackcheck == 1){
           userProfiles = getUserProfiles(iduseringroup[x]);
           var lastRow = sheetUsers.getLastRow();
           sheetUsers.getRange(lastRow + 1, 1).setValue(iduseringroup[x]);
           sheetUsers.getRange(lastRow + 1, 2).setValue(userProfiles[0]);
           sheetUsers.getRange(lastRow + 1, 3).setValue(userProfiles[1]);
           sheetUsers.getRange(lastRow + 1, 4).setFormula("=image(C" + (lastRow + 1) + ")");
           //sheetUsers.getRange(lastRow + 1, 7).setValue("Unfollow");
           sheetUsers.getRange(lastRow + 1, 8).setValue("No");
           sheetUsers.getRange(lastRow + 1, 9).setValue("No");
           sheetUsers.getRange(lastRow + 1, 10).setValue("No");
           sheetUsers.getRange(lastRow + 1, 11).setValue("No");
         } //close if
         }
       } 
     }
   }
    
    // with person use.
    else{
      for(var i = 0;i<values.length; i++){
           if(values[i][0] == userId ){
             userProfiles = getUserProfiles(userId);
             sheetUsers.getRange(i+2, 2).setValue(userProfiles[0]);
             sheetUsers.getRange(i+2, 3).setValue(userProfiles[1]);
             sheetUsers.getRange(i+2, 4).setFormula("=image(C" + (i+2) + ")");
             break;
           } //close if
         }//close for
    }
    
  }
}
