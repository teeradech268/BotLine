function typePostBack(requestObj,values,sheetUsers,sheetGroup,userId,token) {
  // postback type from Line server.
  // postback from user reply by pick Datetime or click Button.
  
  var valuegroup = sheetGroup.getRange(2,1,sheetGroup.getLastRow(),sheetGroup.getLastColumn()).getValues();
  
  if (requestObj.type === "postback"){
    
    // Clear button clicked by person use.
    if (requestObj.postback.data == "Clear"){
      for(var i = 0;i<values.length; i++){
        if(values[i][0] == userId ){
          i=i+2;  
          if(sheetUsers.getRange(i,5).getValue() == ''){
            var replyText = "เคลียร์รายการที่ค้างไว้ไปแล้วครับผม";
            return replyMessage(token,replyText);
          }
          else{
            sheetUsers.getRange(i,5).setValue('');
            sheetUsers.getRange(i,6).setValue('');
            var replyText = "ทำรายการเสร็จสิ้นแล้ว! เยี่ยมมากเลยครับ!";
            return replyMessage(token,replyText);
          }
        } //close if
      }//close for 
    }
    
    // for Delete button (Optional)
    else if(requestObj.postback.data == "datadel"){
      var groupId = requestObj.source.groupId; 
      for(var i = 0;i,valuegroup.length;i++){
        if(valuegroup[i][0] == groupId){
          i=i+2;
          sheetGroup.getRange(i,2).setValue('');
          sheetGroup.getRange(i,3).setValue('');
          var replyText = "ลบรายการเรียบร้อยครับ";
          return replyMessage(token,replyText);
        }
      }
    }
    
    // for Clear button from group.
    else if(requestObj.postback.data == "clear"){
      
      // Time from internet for check with task time.
      var isgroup = requestObj.source.groupId;
      var createGrouptime = [];
      var datetimeinternet = new Date(); 
      var hour = datetimeinternet.getHours(); 
      var min = datetimeinternet.getMinutes(); 
      var day = datetimeinternet.getDate(); 
      var month = datetimeinternet.getMonth(); 
      var year = datetimeinternet.getFullYear(); 
      var cvinternetHour = Number(hour); 
      var cvinternetMin = Number(min); 
      var cvinternetDay = Number(day); 
      var cvinternetMonth = Number(month)+1; 
      var cvinternetYear = Number(year);
      var replytext;
      var thisusername;
      
      for(var i = 0;i<valuegroup.length;i++){
        if(valuegroup[i][0] == isgroup){
          
          // Time inputed by membergroup.
          var DataTime = sheetGroup.getRange(i+2,3).getValue();
          createGrouptime.push(DataTime.substring(0,4));
          createGrouptime.push(DataTime.substring(5,7));
          createGrouptime.push(DataTime.substring(8,10));
          createGrouptime.push(DataTime.substring(11));
          var usertime = DataTime.substring(11,13); 
          var usermin = DataTime.substring(14); 
          var userday = createGrouptime[2]; 
          var usermonth = createGrouptime[1]; 
          var useryear = createGrouptime[0];
          var cvusertime = Number(usertime); 
          var cvusermin = Number(usermin); 
          var cvuserday = Number(userday); 
          var cvusermonth = Number(usermonth); 
          var cvuseryear = Number(useryear);
          
          
          for(var y = 4; y<=sheetGroup.getLastColumn();y++){
            if(valuegroup[i][y] == userId){
              
              // Compare userid in group with userid in profile DB to check username.
              for(var xz = 0; xz < values.length; xz++){
                if(values[xz][0] == userId){
                  thisusername = sheetUsers.getRange(xz+2,2).getValue();
                  break;
                }
              }
              
              // check finish or not.
              if(sheetGroup.getRange(i+3,y+1).getValue() == "Finish" || sheetGroup.getRange(i+3,y+1).getValue() == "Finish Late"){
                replytext = thisusername + " ได้ทำรายการเสร็จสิ้นไปแล้วก่อนหน้านี้นะครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                return replyMessage(token,replytext); 
              }
              
              // set work list.
              else if (cvuseryear - cvinternetYear > 0){
                sheetGroup.getRange(i+3,y+1).setValue("Finish");
                replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                return replyMessage(token,replytext);
              } // moreyear
              else if (cvuseryear - cvinternetYear < 0){
                sheetGroup.getRange(i+3,y+1).setValue("Finish Late");
                replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                return replyMessage(token,replytext);
              } // lateyear
              else if (cvuseryear - cvinternetYear == 0){
                if(cvusermonth - cvinternetMonth > 0){
                  sheetGroup.getRange(i+3,y+1).setValue("Finish");
                  replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                  return replyMessage(token,replytext);
                } // moremonth
                else if(cvusermonth - cvinternetMonth < 0){
                  sheetGroup.getRange(i+3,y+1).setValue("Finish Late");
                  replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                  return replyMessage(token,replytext);
                } // latemonth
                else if(cvusermonth - cvinternetMonth == 0){
                  if(cvuserday - cvinternetDay > 0){
                    sheetGroup.getRange(i+3,y+1).setValue("Finish");
                    replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                    return replyMessage(token,replytext);
                  } // moreday
                  else if(cvuserday - cvinternetDay < 0){
                    sheetGroup.getRange(i+3,y+1).setValue("Finish Late");
                    replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                    return replyMessage(token,replytext);
                  } // lateday
                  else if(cvuserday - cvinternetDay == 0){
                    if (cvusertime - cvinternetHour > 0){
                      sheetGroup.getRange(i+3,y+1).setValue("Finish");
                      replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                      return replyMessage(token,replytext);
                    } // morehour
                    else if(cvusertime - cvinternetHour < 0){
                      sheetGroup.getRange(i+3,y+1).setValue("Finish Late");
                      replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                      return replyMessage(token,replytext);
                    } // latehour
                    else if (cvusertime - cvinternetHour == 0){
                      if (cvusermin - cvinternetMin >= 0){
                        sheetGroup.getRange(i+3,y+1).setValue("Finish");
                        replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                        return replyMessage(token,replytext);
                      } // moremin
                      else if(cvusermin - cvinternetMin < 0){
                        sheetGroup.getRange(i+3,y+1).setValue("Finish Late");
                        replytext = thisusername + " ได้ทำรายการเรียบร้อยแล้วครับ สามารถพิมพ์ #ch เพื่อตรวจสอบได้เลยครับ";
                        return replyMessage(token,replytext);
                      } 
                    } 
                  } 
                } 
              }
              break;
            }
          }
          break;
        }
      }
    }
    
    // pick datetime.
    var createFDatetime = [];
    var keepdatetime = requestObj.postback.params.datetime;
    var datainput = requestObj.postback.data;
    
    // group pick datetime.
    if(requestObj.source.groupId != null){
      var groupId = requestObj.source.groupId; 
      for(var i = 0;i<valuegroup.length;i++){
        if(valuegroup[i][0] == groupId){
          sheetGroup.getRange(i+2,2).setValue(datainput);
          sheetGroup.getRange(i+2,3).setValue(keepdatetime); 
        }
      }
      createFDatetime.push(keepdatetime.substring(0,4));
      createFDatetime.push(keepdatetime.substring(5,7));
      createFDatetime.push(keepdatetime.substring(8,10));
      createFDatetime.push(keepdatetime.substring(11));
      return addDataFlex(token,datainput,createFDatetime);
    }
    
    // person use pick datetime.
    else{
      for(var i = 0;i<values.length; i++){
        if(values[i][0] == userId ){
          i=i+2;  
          sheetUsers.getRange(i,5).setValue(datainput);
          sheetUsers.getRange(i,6).setValue(keepdatetime);
        } //close if
      }//close for 
      createFDatetime.push(keepdatetime.substring(0,4));
      createFDatetime.push(keepdatetime.substring(5,7));
      createFDatetime.push(keepdatetime.substring(8,10));
      createFDatetime.push(keepdatetime.substring(11));
      return addDataFlex(token,datainput,createFDatetime);
    } 
  }
}
