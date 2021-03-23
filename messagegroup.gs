function GroupMessage(requestObj,sheetUsers,sheetGroup,userId,groupId,token) {
  
  // Message coming from group will use this Function.
  var values = sheetGroup.getRange(2,1,sheetGroup.getLastRow(),sheetGroup.getLastColumn()).getValues();
  
  
  var checkgroup = 0;
  var checkuser = 0;
  
  if (requestObj.type === "message") {
    
    
    for(var i = 0;i<values.length; i++){
      if(values[i][0] == groupId ){
        checkgroup = 1;
        break;
      }
    }
    if (checkgroup == 0){
      var lastRow = sheetGroup.getLastRow();
      sheetGroup.getRange(lastRow + 1, 1).setValue(groupId); 
      sheetGroup.getRange(lastRow + 2, 1).setValue("CheckList");
    }
    
    for(var i = 0; i<values.length;i++){
      if(values[i][0] == groupId){
        for(var y = 4; y<=sheetGroup.getLastColumn();y++){
          if(values[i][y] == userId){
            checkuser = 1;
            break;
          }
        }
        if(checkuser == 0){
          for(var x = 4;x<=sheetGroup.getLastColumn();x++){
            if(values[i][x] == ""){
              sheetGroup.getRange(i+2,x+1).setValue(userId); 
              sheetGroup.getRange(i+3,x+1).setValue("In Progess");
              break;
            }
          }
          if(x > sheetGroup.getLastColumn()){
            var lastCol = sheetGroup.getLastColumn();
            sheetGroup.getRange(i+2, lastCol + 1).setValue(userId); 
            sheetGroup.getRange(i+3, lastCol + 1).setValue("In Progess");
          }
        }
      } 
    }
    messageG(requestObj,sheetUsers,sheetGroup,userId,groupId,token);
  }
}







