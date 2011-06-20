function defaultPage(){
  var experimentData = window.env.getValue("experimentalData");
  // experimentData = $.parseJSON(experimentData);
  // this is a no-no
  experimentData = eval('(' + experimentData + ')');
  if (!experimentData) {
    alert("No Data");
    return;
  }
  var responsesHtml = "";
  
  var latestEvent = experimentData[0];
  var responses = latestEvent.responses;
  for ( var i = 0; i < responses.length; i++) {
    var response = responses[i];
    if (response.answer == null || response.answer.length == 0) {
      response.answer = "No Answer";
    }
  
    responsesHtml += "<div>";
    responsesHtml += "<div style='text-align:left;line-height:1.5;font-size:20;'>";
    responsesHtml += response["prompt"];
    responsesHtml += "</div><br/>";
    responsesHtml += "<div style='color:#333333;text-align:center;line-height:1.5;font-size:18;'>";
    if (response["responseType"] == "photo") {
      responsesHtml += "<img src='data:image/jpg;base64," + response["answer"] + "' width=150>";
    } else if (response["responseType"] == "location") {
      responsesHtml += "&nbsp;&nbsp;&nbsp;<a href='file:///android_asset/map.html?inputId=" + response["inputId"] + "'>Go to Interwebs, Get Google Maps</a>";
    } else {
      responsesHtml += response["answer"];
      responsesHtml += "&nbsp;&nbsp;&nbsp;<a href='file:///android_asset/time.html?inputId=" + response["inputId"] + "'>Chart</a>";
    }
    responsesHtml += "</div><br/></div>";
  }
  if (responsesHtml == "") {
    responsesHtml = "No responses found!";
  }
  $("#responses").html(responsesHtml);
}