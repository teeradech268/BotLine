function getUserProfiles(userId) {
  
  // url with /profile and put userid to select profile.
  var url = "https://api.line.me/v2/bot/profile/" + userId;
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <IMlkJM9IrPaMynTNEyS5oa5lxgAep1mbdzW3F320ZkZQeiHNtSp4NC0rIuWIFO43QslvGbILP/tjpH8GOX7iy2x92LZ0N6ZCaU5H6/EcHO65T8vMpn2P2D8tJT3+Ip6+dlUWM/DGqrQ+S111VlYnswdB04t89/1O/w1cDnyilFU=>"
  };
  
  var options = {
    "method" : "GET",
    "headers" : lineHeader
  };
  
  var responseJson = UrlFetchApp.fetch(url, options);
  
  //Logger.log("User Profiles Response: " + responseJson);
  
  var displayName = JSON.parse(responseJson).displayName;
  var pictureUrl = JSON.parse(responseJson).pictureUrl;
  
  return [displayName, pictureUrl];
}