Start();

function Start(){
  let formData = new FormData();
  formData.append("api_key", api_key);
  formData.append("type", "byGame");

  formData.append("gameName", "cs-go");
  $.ajax({
      type: "POST",
      url: 'api/getNews',
      contentType: false,processData: false,dataType: "json",
      data:formData,
      success: function(response) {
        response.forEach((value, index) => {
          AddNewsToList("#news-cs-go", value, "cs-go");
        })
      }
  });
  formData.append("gameName", "dota-2");
  $.ajax({
      type: "POST",
      url: 'api/getNews',
      contentType: false,processData: false,dataType: "json",
      data:formData,
      success: function(response) {
        response.forEach((value, index) => {
          AddNewsToList("#news-dota-2", value, "dota-2");
        })
      }
  });
  formData.append("gameName", "lol");
  $.ajax({
      type: "POST",
      url: 'api/getNews',
      contentType: false,processData: false,dataType: "json",
      data:formData,
      success: function(response) {
        response.forEach((value, index) => {
          AddNewsToList("#news-lol", value, "lol");
        })
      }
  });
  formData.append("gameName", "valorant");
  $.ajax({
      type: "POST",
      url: 'api/getNews',
      contentType: false,processData: false,dataType: "json",
      data:formData,
      success: function(response) {
        response.forEach((value, index) => {
          AddNewsToList("#news-valorant", value, "valorant");
        })
      }
  });
}
function AddNewsToList(id, value, gameName){
  $(id).append("<div class=\"col-lg-4 mb-3\"><div onClick=\"goToNews('"+value.id+"','"+gameName+"');\" class=\"news-block p-2\"><div class=\"rounded-3\" width=\"100%\" height=\"200\" style=\"background: url("+value.img+"); min-height: 200px; background-size: cover; background-repeat: no-repeat; background-position: center;\"></div><h4 class=\"text-white\">"+value.title+"</h4><p>"+value.description+"</p><p class=\"text-end\">📅 "+value.date+"</p></div></div>")
}