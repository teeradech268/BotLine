function messageG(requestObj,sheetUsers,sheetGroup,userId,groupId,token) {
  
  // Check all message to use bot.
  
  var checkText = requestObj.message.text;   
  var wordSplit = checkText.split(" ");
  var checkWord = wordSplit[0];
  var inputWord = wordSplit[1]; var replyText; var recordtext = "";
  var createFDatetime = [];
  var keepdatetime = new Date();
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
  var values = sheetUsers.getRange(2, 1, sheetUsers.getLastRow(),sheetUsers.getLastColumn()).getValues();
  var valuegroup = sheetGroup.getRange(2,1,sheetGroup.getLastRow(),sheetGroup.getLastColumn()).getValues();
  
  if (checkText == "todo" || checkText == "ทูดู"){
    replyText = "ทูดูอยู่นี่แล้วว!\n เดี๋ยวทูดูจะช่วยสร้างรายการสิ่งที่ต้องทำให้นะครับ";
    replyActionMessage(token, replyText)
  }
  else if (checkText == "#howto"){
    replyText = "ทูดูใช้งานไม่ยากครับ แบ่งออกเป็น 2 ส่วนด้วยกันคือ\n1.) การใช้งานสำหรับรายบุคคล\n2.) การใช้งานสำหรับ Group (หากต้องการใช้งานในกลุ่มให้เต็มประสิทธิภาพ รบกวนให้สมาชิกภายในกลุ่มเพิ่มทูดูเป็นเพื่อนด้วยนะครับ)\n\nโดยสามารถเรียกใช้ทูดูได้ตามคำสั่งต่อไปนี้เลยครับ\n1. #add - การเพิ่มสิ่งที่ต้องทำเพียงแค่พิมพ์ #add เว้นวรรคและตามด้วยรายการที่ผู้ใช้ต้องการเพิ่มได้เลยครับ \n\n2.#ch - คำสั่งในการตรวจเช็คว่ามีรายการที่ต้องทำมั้ย\nสำหรับการใช้งานรายบุคคลทูดูจะมีเวลาแจ้งเตือนผู้ใช้โดยในหนึ่งวันจะแจ้งเตือน 4 เวลาด้วยกันครับ\nโดยจะเตือนประมาณเวลาดังต่อไปนี้\n1. 07:00 น.\n2. 12:00 น.\n3. 18:00น.\n4. 22:00 น.\nสำหรับการใช้งานภายในกลุ่ม\nไม่ต้องห่วงนะครับ หากสิ่งที่ต้องทำเลยกำหนดการ หรือยังไม่ถึงวันนั้น ทูดูจะไม่รบกวนคุณผู้ใช้แน่นอนครับ\n*สำหรับการแจ้งเตือนภายในกลุ่ม ทูดูจะแจ้งเตือนในช่วงเช้าเวลา 07:00 น. เท่านั้นนะครับ เพื่อไม่ให้เป็นการรบกวนจนเกินไป แต่ยังสามารถ #ch ตรวจสอบได้ครับ\n3.#dl - หากคุณผู้ใช้ไม่ต้องการที่จะให้ทูดูติดตามรายการนั้นแล้วสามารถพิมพ์ #dl เพื่อลบรายการนั้นได้ครับ\n\nสามารถเรียก \"todo\" ได้ทุกเมื่อเลยครับ";
    return replyMessage(token,replyText);
  }
  else if (checkText == "#ch"){
    for(var i = 0;i<valuegroup.length; i++){
      if(valuegroup[i][0] == groupId ){
        var Data = sheetGroup.getRange(i+2,2).getValue();
        var createGrouptime = [];
        if (Data != ''){
          var DataTime = sheetGroup.getRange(i+2,3).getValue(); 
          // datetime to send to reply.
          createFDatetime.push(DataTime.substring(0,4));
          createFDatetime.push(DataTime.substring(5,7));
          createFDatetime.push(DataTime.substring(8,10));
          createFDatetime.push(DataTime.substring(11));
          
          // datetime to compare to set finish list.
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
            if(valuegroup[i][y] != ""){
              if (cvuseryear - cvinternetYear < 0){
                if(sheetGroup.getRange(i+3,y+1).getValue() == "In Progess"){
                  sheetGroup.getRange(i+3,y+1).setValue("Overdue");
                }
              } // lateyear
              else if (cvuseryear - cvinternetYear == 0){
                if(cvusermonth - cvinternetMonth < 0){
                  if(sheetGroup.getRange(i+3,y+1).getValue() == "In Progess"){
                    sheetGroup.getRange(i+3,y+1).setValue("Overdue");
                  }
                } // latemonth
                else if(cvusermonth - cvinternetMonth == 0){
                  if(cvuserday - cvinternetDay < 0){
                    if(sheetGroup.getRange(i+3,y+1).getValue() == "In Progess"){
                      sheetGroup.getRange(i+3,y+1).setValue("Overdue");
                    }
                  } // lateday
                  else if(cvuserday - cvinternetDay == 0){
                    if(cvusertime - cvinternetHour < 0){
                      if(sheetGroup.getRange(i+3,y+1).getValue() == "In Progess"){
                        sheetGroup.getRange(i+3,y+1).setValue("Overdue");
                      }
                    } // latehour
                    else if (cvusertime - cvinternetHour == 0){
                      if(cvusermin - cvinternetMin < 0){
                        if(sheetGroup.getRange(i+3,y+1).getValue() == "In Progess"){
                          sheetGroup.getRange(i+3,y+1).setValue("Overdue");
                        }
                      } 
                    } 
                  } 
                } 
              } 
            }
            else if(valuegroup[i][y] == ""){
              break;
            }
          }
          return groupFlexCheck(token,Data,createFDatetime,sheetUsers,sheetGroup,groupId);
        } //close if
        
        else if (Data == ''){
          replyText = "ยังไม่มีรายการที่บันทึกไว้นะครับ";
          return replyMessage(token,replyText);
        } //close else if
      } //close if
    } //close for
  }
  
  else if (checkText == "#add" || checkText == "#add "){
    replyText = "หากต้องการเพิ่มสิ่งที่จะทำ พิมพ์ #add เว้นวรรค และตามด้วยสิ่งที่ต้องการบันทึกได้เลยครับ";
    return replyMessage(token,replyText);
  } //close #เพิ่มtutorial
  if (checkWord == "#add" && inputWord != null && inputWord != ''){ 
    for(var y = 1;y<wordSplit.length;y++){
      recordtext += wordSplit[y] + " ";
    }
    for(var i = 0;i<valuegroup.length; i++){
      if(valuegroup[i][0] == groupId ){
        i=i+2;
        if(sheetGroup.getRange(i,2).getValue() != ''){
          return replyMessage(token,"ทูดูสามารถบันทึกรายการได้แค่รายการเดียวนะครับ\n\nหากต้องการบันทึกรายการใหม่ต้องเคลียร์รายการเก่าก่อนครับ");
        }
        else{
          return replyFlexMessage(token,recordtext);
        }
      } //close if
    } //close for
  } //close #เพิ่มรายการ
  
  else if (checkText === "#dl"){
    for(var i = 0;i<valuegroup.length; i++){
      if(valuegroup[i][0] == groupId ){
        var Data = sheetGroup.getRange(i+2,2).getValue();
        if (Data != ''){
          sheetGroup.getRange(i+2,2).setValue(null);sheetGroup.getRange(i+2,3).setValue(null);
          for(var y = 4; y<sheetGroup.getLastColumn();y++){
            if(y == sheetGroup.getLastColumn()){
              break;
            }
            else if(valuegroup[i][y] != ""){
              sheetGroup.getRange(i+3,y+1).setValue("In Progess");
            }
            else if(valuegroup[i][y] == ""){
              break;
            }
          }
          replyText = "ทูดูลบรายการที่จะต้องทำให้แล้วนะครับ";
          return replyMessage(token,replyText);
        } //close if
        else if(Data == ''){
          replyText = "ทูดูเช็คแล้วไม่มีรายการต้องทำที่จะให้ลบนะครับ"; 
          return replyMessage(token,replyText);
        }
      }
    } // close for
  } //close #ลบ 
}
