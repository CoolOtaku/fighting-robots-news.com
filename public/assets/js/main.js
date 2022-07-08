let api_key = $("#api_key").val();

let formData = new FormData();

jQuery.isSubstring = function (haystack, needle) {
  return haystack.indexOf(needle) !== -1;
};

function goToNews(id, gameName) {
  $.cookie('news_id', id);
  $.cookie('news_gameName', gameName);
  window.location.href = "news";
}

$("#searchBtn").click(function () {
  $("#searchList").empty();
  var searchText = $("#searchInput").val();
  if (searchText !== "") {
    let formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("type", "all");

    $.ajax({
      type: "POST",
      url: 'api/getNews',
      contentType: false, processData: false, dataType: "json",
      data: formData,
      success: function (response) {
        response.forEach((value, index) => {
          AddToSearchList(value, searchText);
        })

        if ($('#searchList').is(':empty')) {
          $("#searchList").append("<h3 class=\"text-white\">Нічого не знайдено!</h3>");
        }
        $('#searchModal').modal('show')
      }
    });
  }
});

function AddToSearchList(v, searchText) {
  var isContains = false;
  if ($.isSubstring(v.title, searchText) || $.isSubstring(v.description, searchText) || $.isSubstring(v.text, searchText)) {
    isContains = true;
  }

  if (isContains) {
    $("#searchList").append("<div class=\"col-12 mb-3\"><div onClick=\"goToNews('" + v.id + "','" + v.gameName + "');\" class=\"news-block p-2\"><div class=\"rounded-3\" width=\"100%\" height=\"200\" style=\"background: url(" + v.img + "); min-height: 200px; background-size: cover; background-repeat: no-repeat; background-position: center;\"></div><h4 class=\"text-white\">" + v.title + "</h4><p>" + v.description + "</p><p class=\"text-end\">📅 " + v.date + "</p></div></div>");
  }
}

function login() {
  if ($.cookie('user_id')) {
    Swal.fire({
      title: $.cookie('user_full_name'),
      imageUrl: $.cookie('user_image'),
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Custom image',
      html:
        '<a href="#" onclick="signOut();">Вийти з профілю</a><br><br>' +
        '<div id="AdminPanelButton"></div>',
    })
    formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("email", $.cookie('user_email'));
    $.ajax({
      type: "POST",
      url: 'api/verifyAdmin',
      contentType: false, processData: false, dataType: "json",
      data: formData,
      success: function (response) {
        console.log(response);
        if (response.res) {
          $("#AdminPanelButton").append(response.button)
        }
      },
      error: function (jqXhr, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  } else {
    $('#loginModal').modal('show')
  }
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  if (!profile.getId()) {
    Swal.fire({
      icon: 'error',
      title: data.title,
      text: data.res
    })
  } else {
    $.cookie('user_id', profile.getId());
    $.cookie('user_full_name', profile.getName());
    $.cookie('user_image', profile.getImageUrl());
    $.cookie('user_email', profile.getEmail());
    loadUser();
    $('#loginModal').modal('hide')
  }
}

function loadUser() {
  if ($.cookie('user_id')) {
    $("#login-img").attr('src', $.cookie('user_image'));
  }
}

function signOut() {
  Swal.fire({
    title: 'Вихід з профілю',
    text: "Ви дійсно хочете вийти з профілю?",
    icon: 'question',
    showCancelButton: true,
    cancelButtonText: 'Ні',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Так'
  }).then((result) => {
    if (result.isConfirmed) {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        $.cookie('user_id', "");
        $.cookie('user_full_name', "");
        $.cookie('user_image', "");
        $.cookie('user_email', "");
        document.location.href = "/";
      });
    }
  })
}