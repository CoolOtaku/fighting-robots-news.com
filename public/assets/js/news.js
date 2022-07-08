var id = $.cookie("news_id");
var gameName = $.cookie("news_gameName");

if (id && gameName) {

    let formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("type", "byIdAndGame");
    formData.append("gameName", gameName);
    formData.append("id", id);

    $.ajax({
        type: "POST",
        url: 'api/getNews',
        contentType: false, processData: false, dataType: "json",
        data: formData,
        success: function (response) {
            $("#img_news").attr('src', response.img);
            $("#title_news").text(response.title);
            $("#description_news").text(response.description);
            $("#text_news").html(response.text);
            $("#date_news").text("📅 "+response.date);
        }
    });
} else {
    $("#title_news").text("Вибачте виникла помилка 😅");
}
