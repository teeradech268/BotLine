function typeUnFollow(requestObj,values,sheetUsers,userId) {
  
  if (requestObj.type === "unfollow"){
    for(var i = 0;i<values.length; i++){
      
      if(values[i][0] == userId ){
        i=i+2;
        Logger.log("UserID " + userId + " is unfollow.");
        sheetUsers.getRange(i,5).setValue(null);
        sheetUsers.getRange(i,6).setValue(null);
        sheetUsers.getRange(i,7).setValue("Unfollow");
      } //close if
    } //close for
  } // close unfollow
}
