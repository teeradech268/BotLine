function resetNotify() {
  var ssId = "1P23XLdxyBR_KotFZWDWrJQG8M5OMb2EsKYmynFnrBrs";
  var ss = SpreadsheetApp.openById(ssId);
  var sheetUsers = ss.getSheetByName("users");
  var sheetGroup = ss.getSheetByName("group");
  var values = sheetUsers.getRange(2, 1, sheetUsers.getLastRow(),sheetUsers.getLastColumn()).getValues();
  var valuegroup = sheetGroup.getRange(2,1,sheetGroup.getLastRow(),sheetGroup.getLastColumn()).getValues();
  
  
  // For reset notify with trigger.
  for(var y = 0; y<values.length;y++){
    // year month day hour min
    if (values[y][7] != ''){
      y = y+2;
      sheetUsers.getRange(y,8).setValue('No');
      sheetUsers.getRange(y,9).setValue('No');
      sheetUsers.getRange(y,10).setValue('No');
      sheetUsers.getRange(y,11).setValue('No');
      y = y-2;
    }
  }
  
  // For reset notify in group.
  for(var x = 0; x<valuegroup.length;x++){
    if(valuegroup[x][3] != "No"){
      sheetGroup.getRange(x+3,4).setValue("No");
    }
  }
}
