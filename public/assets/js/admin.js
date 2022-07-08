
let newsList = null;
let news = {
    title: "",
    img: "",
    description: "",
    date: "",
    text: "",
    gameName: ""
};

formData = new FormData();
formData.append("api_key", api_key);
formData.append("email", $.cookie('user_email'));
$.ajax({
    type: "POST",
    url: 'api/verifyAdmin',
    contentType: false, processData: false, dataType: "json",
    data: formData,
    success: function (response) {
        if (!response.res) {
            document.location.href = "/";
        }
    }
});

Start();
function Start() {
    formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("type", "all");

    $.ajax({
        type: "POST",
        url: 'api/getNews',
        contentType: false, processData: false, dataType: "json",
        data: formData,
        success: function (response) {
            response.forEach((value, index) => {
                $("#List-News").append("<tr class=\"row\"><th class=\"col text-center\"><img class=\"rounded quizzes-img\" src=\"" + value.img + "\"></th><td class=\"col-md-6 text-center\"><h5 class=\"text-white\">" + value.title + "</h5><span class=\"badge bg-primary rounded-pill\">Гра: " + value.gameName + "</span><span class=\"badge bg-primary rounded-pill\">Дата: " + value.date + "</span></td><td class=\"col text-center\"><a class=\"link-secondary me-3\" href=\"javascript: editNews('" + value.id + "', '" + value.gameName + "');\"><img src=\"public/assets/img/edit.svg\"></a><a class=\"link-secondary\" href=\"javascript: deleteNews('" + value.id + "', '" + value.gameName + "');\"><img src=\"public/assets/img/delete.svg\"></a></td></tr>")
            })
            newsList = response;
        }
    });

    $.ajax({
        type: "POST",
        url: 'api/getAdministrators',
        contentType: false, processData: false, dataType: "json",
        data: formData,
        success: function (response) {
            response.forEach((value, index) => {
                $("#List-Administrators").append("<li class=\"nav-item text-center mb-1 text-white\">" + value.email + "<p><a class=\"link-secondary\" href=\"javascript: deleteAdministrators('" + value.email + "');\"><img src=\"public/assets/img/delete.svg\"></a></p></li>")
            })
        }
    });
}

function addNews() {
    if (news.id) {
        news = {
            title: "",
            img: "",
            description: "",
            date: "",
            text: "",
            gameName: ""
        };
    }
    viewNewsForm("add");
}

function newsSave() {
    news.title = $("#news-name").val();
    news.img = $("#news-img").val();
    news.description = $("#news-description").val();
    news.text = $("#news-text").val();
    news.date = $("#news-date").val();
}

function viewNewsForm(type) {
    confirmButtonText = "Добавити";
    title = "Добавити новину";
    if (type == "edit") {
        confirmButtonText = "Зберегти";
        title = "Редагувати новину";
    }

    Swal.fire({
        title: title,
        input: 'select',
        inputOptions: {
            'cs-go':'Counter-Strike: Global Offensive',
            'dota-2':'Dota 2',
            'lol':'League of Legends',
            'valorant':'Valorant'
        },
        inputPlaceholder: swalSelect(),
        inputValidator: (value) => {
            if (value) {
                news.gameName = value;
            }
        },
        html:
            '<p><label for="news-name">Назва:</label></p>' +
            '<input id="news-name" class="swal2-input" placeholder="Назва новини" value="' + news.title + '">' +
            '<p><label for="news-img">Зображення:</label></p>' +
            '<input id="news-img" class="swal2-input" placeholder="Зо браження прикріплене до новини" value="' + news.img + '">' +
            '<p><label for="news-description">Опис:</label></p>' +
            '<input id="news-description" class="swal2-input" placeholder="Опис новини" value="' + news.description + '">' +
            '<p><label for="news-text">Текст:</label></p>' +
            '<textarea id="news-text" class="swal2-textarea" cols="25" placeholder="Весь текст новини">' + news.text + '</textarea>' +
            '<p><label for="news-date">Дата:</label></p>' +
            '<input id="news-date" class="swal2-input" placeholder="Дата новини" value="' + news.date + '">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Скасувати',
        preConfirm: () => {
            newsSave();
            if (!news.title || !news.description || !news.text || !news.date || !news.img || !news.gameName) {
                Swal.fire({
                    icon: 'error',
                    title: 'Помилка!',
                    text: 'Не всі поля були заповнені. Будьласка заповніт їх!',
                })
                return false;
            }
            formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("news", JSON.stringify(news));

            if(type == "edit"){
                $.ajax({
                    type: "POST",
                    url: 'api/editNews',
                    contentType: false, processData: false, dataType: "json",
                    data: formData,
                    success: function (response) {
                        if (response.res) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Новину відредаговано!',
                                showConfirmButton: false,
                                timer: 1500
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    location.reload();
                                }
                            })
                        }
                    }
                });
            }else{
                $.ajax({
                    type: "POST",
                    url: 'api/addNews',
                    contentType: false, processData: false, dataType: "json",
                    data: formData,
                    success: function (response) {
                        if (response.res) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Новину добавлено!',
                                showConfirmButton: false,
                                timer: 1500
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    location.reload();
                                }
                            })
                        }
                    }
                });
            }
        }
    })
}

function swalSelect() {
    if (news.gameName) {
        return news.gameName;
    } else {
        return 'Гра';
    }
}

function editNews(id, gameName) {
    newsList.forEach((v, i) => {
        if (v.id == id && v.gameName == gameName ) {
            news = v;
            viewNewsForm("edit");
        }
    })
}

function deleteNews(id, gameName) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Видалення новини',
        text: "Ви дійсно хочете видалити дану новину?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Так!',
        cancelButtonText: 'Ні!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("id", id);
            formData.append("gameName", gameName);
            $.ajax({
                type: "POST",
                url: 'api/deleteNews',
                contentType: false, processData: false, dataType: "json",
                data: formData,
                success: function (response) {
                    if (response.res) {
                        swalWithBootstrapButtons.fire(
                            'Новину видалено',
                            'Успішно видалено новину!',
                            'success'
                        ).then((result) => {
                            location.reload();
                        })
                    } else {
                        swalWithBootstrapButtons.fire(
                            'Сталася помилка',
                            'Новину не було видалено!',
                            'error'
                        )
                    }
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Відміна',
                'Новину не було видалено, ви її зберегли ;)',
                'error'
            )
        }
    })
}

function addAdministrators() {
    Swal.fire({
        title: 'Добавити адміністратора',
        html: '<input id="swal-administrators" class="swal2-input" placeholder="Email">',
        focusConfirm: false,
        preConfirm: () => {
            var email = $("#swal-administrators").val();
            if (!email) {
                return false;
            }
            formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("email", email);
            $.ajax({
                type: "POST",
                url: 'api/addAdministrators',
                contentType: false, processData: false, dataType: "json",
                data: formData,
                success: function (response) {
                    if (response.res) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Адміністратора будо добавлено!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                location.reload();
                            }
                        })
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Адміністратора не було добавлено! Можливо такий уже присутній.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            });
        }
    })
}

function deleteAdministrators(email) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Видалення адміністратора',
        text: "Ви дійсно хочете видалити даного адміністратора?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Так!',
        cancelButtonText: 'Ні!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("email", email);
            $.ajax({
                type: "POST",
                url: 'api/deleteAdministrators',
                contentType: false, processData: false, dataType: "json",
                data: formData,
                success: function (response) {
                    if (response.res) {
                        swalWithBootstrapButtons.fire(
                            'Адміністратора видалено',
                            'Успішно видалено адміністратора!',
                            'success'
                        ).then((result) => {
                            location.reload();
                        })
                    } else {
                        swalWithBootstrapButtons.fire(
                            'Сталася помилка',
                            'Адміністратора не було видалено!',
                            'error'
                        )
                    }
                }
            });
        }
    })
}