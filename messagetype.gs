function typeMessage(requestObj,values,sheetUsers,sheetGroup,userId,token) {
  
  if (requestObj.type === "message") {
    
    // When message coming from group.
    if(requestObj.source.groupId != null){ 
      var groupId = requestObj.source.groupId; 
      GroupMessage(requestObj,sheetUsers,sheetGroup,userId,groupId,token);
    } 
    
    // When message From person use.
    else { 
      var checkText = requestObj.message.text; 
      var wordSplit = checkText.split(" "); 
      var checkWord = wordSplit[0]; 
      var inputWord = wordSplit[1]; 
      var replyText; var recordtext = "" ; 
      var createFDatetime = []; 
      var keepdatetime = new Date(); 
      var hour = keepdatetime.getHours(); 
      var min = keepdatetime.getMinutes(); 
      var day = keepdatetime.getDate(); 
      var month = keepdatetime.getMonth(); 
      var year = keepdatetime.getFullYear(); 
      var cvinternetHour = Number(hour); 
      var cvinternetMin = Number(min); 
      var cvinternetDay = Number(day); 
      var cvinternetMonth = Number(month)+1; 
      var cvinternetYear = Number(year);
      
      if (checkText == "todo" || checkText == "ทูดู" || checkText == "Todo"){
        replyText = "ทูดูอยู่นี่แล้วว!\n เดี๋ยวทูดูจะช่วยบันทึกสิ่งที่ต้องทำให้นะครับ";
        return replyActionMessage(token,replyText);
      } //close ทูดู
      
      if (checkText == "#howto"){
        replyText = "ทูดูใช้งานไม่ยากครับ แบ่งออกเป็น 2 ส่วนด้วยกันคือ\n1.) การใช้งานสำหรับรายบุคคล\n2.) การใช้งานสำหรับ Group\n\nโดยสามารถเรียกใช้ทูดูได้ตามคำสั่งต่อไปนี้เลยครับ\n1. #add - การเพิ่มสิ่งที่ต้องทำเพียงแค่พิมพ์ #add เว้นวรรคและตามด้วยรายการที่ผู้ใช้ต้องการเพิ่มได้เลยครับ \n\n2.#ch - คำสั่งในการตรวจเช็คว่ามีรายการที่ต้องทำมั้ย ซึ่งทูดูจะมีเวลาแจ้งเตือนผู้ใช้โดยในหนึ่งวันจะแจ้งเตือน 4 เวลาด้วยกันครับ\nโดยจะเตือนประมาณเวลาดังต่อไปนี้\n1. 07:00 น.\n2. 12:00 น.\n3. 18:00น.\n4. 22:00 น.\nไม่ต้องห่วงนะครับ หากสิ่งที่ต้องทำเลยกำหนดการ หรือยังไม่ถึงวันนั้น ทูดูจะไม่รบกวนคุณผู้ใช้แน่นอนครับ\n\n3.#dl - หากคุณผู้ใช้ไม่ต้องการที่จะให้ทูดูติดตามรายการนั้นแล้วสามารถพิมพ์ #dl เพื่อลบรายการนั้นได้ครับ\n\nสามารถเรียก \"todo\" ได้ทุกเมื่อเลยครับ";
        return replyMessage(token,replyText);
      } // close #วิธีใช้
      
      if (checkWord == "#add" && inputWord != null && inputWord != ''){ 
        for(var y = 1;y<wordSplit.length;y++){
          recordtext += wordSplit[y] + " ";
        }
        for(var i = 0;i<values.length; i++){
          if(values[i][0] == userId ){
            i=i+2;
            if(sheetUsers.getRange(i,5).getValue() != ''){
              return replyMessage(token,"ทูดูสามารถบันทึกรายการได้แค่รายการเดียวนะครับ\n\nหากต้องการบันทึกรายการใหม่ต้องเคลียร์รายการเก่าก่อนครับ");
            }
            else{
              return replyFlexMessage(token,recordtext);
            }
          } //close if
        } //close for
      } //close #เพิ่มรายการ
      
      else if (checkText == "#add" || checkText == "#add "){
        replyText = "หากต้องการเพิ่มสิ่งที่จะทำ พิมพ์ #add เว้นวรรค และตามด้วยสิ่งที่ต้องการบันทึกได้เลยครับ";
        return replyMessage(token,replyText);
      } //close #เพิ่มtutorial
      
      else if (checkText == "#ch"){
        for(var i = 0;i<values.length; i++){
          if(values[i][0] == userId ){
            i=i+2;
            var Data = sheetUsers.getRange(i,5).getValue();
            if (Data != ''){
              var DataTime = sheetUsers.getRange(i,6).getValue(); 
              createFDatetime.push(DataTime.substring(0,4));
              createFDatetime.push(DataTime.substring(5,7));
              createFDatetime.push(DataTime.substring(8,10));
              createFDatetime.push(DataTime.substring(11));
              var usertime = DataTime.substring(11,13); 
              var usermin = DataTime.substring(14); 
              var userday = createFDatetime[2]; 
              var usermonth = createFDatetime[1]; 
              var useryear = createFDatetime[0];
              var cvusertime = Number(usertime); 
              var cvusermin = Number(usermin); 
              var cvuserday = Number(userday); 
              var cvusermonth = Number(usermonth); 
              var cvuseryear = Number(useryear);
              
              if (cvuseryear - cvinternetYear > 0){
                return replyFlexData(token,Data,createFDatetime);
              } // moreyear
              else if (cvuseryear - cvinternetYear < 0){
                return latereplyFlexData(token,Data,createFDatetime);
              } // lateyear
              else if (cvuseryear - cvinternetYear == 0){
                
                if(cvusermonth - cvinternetMonth > 0){
                  return replyFlexData(token,Data,createFDatetime);
                } // moremonth
                else if(cvusermonth - cvinternetMonth < 0){
                  return latereplyFlexData(token,Data,createFDatetime);
                } // latemonth
                else if(cvusermonth - cvinternetMonth == 0){
                  
                  if(cvuserday - cvinternetDay > 0){
                    return replyFlexData(token,Data,createFDatetime);
                  } // moreday
                  else if(cvuserday - cvinternetDay < 0){
                    return latereplyFlexData(token,Data,createFDatetime);
                  } // lateday
                  else if(cvuserday - cvinternetDay == 0){
                    
                    if (cvusertime - cvinternetHour > 0){
                      return replyFlexData(token,Data,createFDatetime);
                    } // morehour
                    else if(cvusertime - cvinternetHour < 0){
                      return latereplyFlexData(token,Data,createFDatetime);
                    } // latehour
                    else if (cvusertime - cvinternetHour == 0){
                      
                      if (cvusermin - cvinternetMin >= 0){
                        return replyFlexData(token,Data,createFDatetime);
                      } // moremin
                      else if(cvusermin - cvinternetMin < 0){
                        return latereplyFlexData(token,Data,createFDatetime);
                      } 
                    } 
                  } 
                } 
              } 
            }
            else if (Data == ''){
              replyText = "เยี่ยมมากครับ!\nไม่มีรายการค้างที่จะต้องทำเลยครับ";
              return replyMessage(token,replyText);
            } //close else if
          } //close if
        } //close for
      } //close #ดู 
      
      else if (checkText === "#dl"){
        for(var i = 0;i<values.length; i++){
          if(values[i][0] == userId ){
            i=i+2;
            var Data = sheetUsers.getRange(i,5).getValue();
            if (Data != ''){
              sheetUsers.getRange(i,5).setValue(null);
              sheetUsers.getRange(i,6).setValue(null);
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
  }
}
