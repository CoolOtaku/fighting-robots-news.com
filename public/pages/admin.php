<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Адмін панель</title>

    <? include 'public/libs/favicon.php' ?>
    <? include 'public/libs/css.php' ?>
    <? include 'public/libs/google_login.php' ?>

    <!-- Шрифти -->
    <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet">

    <!-- Стилі -->
    <link rel="stylesheet" type="text/css" href="public/assets/css/admin.css">

</head>

<body>
    <input type="hidden" id="api_key" name="api_key" value="<? echo $_SESSION['ApiKey']; ?>">

    <header class="navbar sticky-top flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">
            <img src="public/assets/img/wrench_adjustable.svg">
            Адмін - панель
        </a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
                <img src="public/assets/img/list.svg">
            </span>
        </button>
    </header>

    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block alert alert-white sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link text-white" href="/">
                                <img src="public/assets/img/home.svg">
                                На головну
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="/#cs-go">
                                <img src="public/assets/img/cs-go.svg">
                                Counter-Strike: Global Offensive
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="/#dota-2">
                                <img src="public/assets/img/dota2.svg">
                                Dota 2
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="/#lol">
                                <img src="public/assets/img/lol.svg">
                                League of Legends
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="/#Valorant">
                                <img src="public/assets/img/valorant.svg">
                                Valorant
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#Title-List-News">
                                <img src="public/assets/img/newspaper.svg">
                                Новини
                            </a>
                        </li>
                    </ul>

                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                        <a class="link-secondary" href="javascript: addAdministrators();">
                        ➕ Добавити адміністратора
                        </a>
                    </h6>
                    <ul id="List-Administrators" class="nav flex-column mb-2">
                        <!-- Дані заповняються через JS -->
                    </ul>
                </div>
            </nav>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="chartjs-size-monitor">
                    <div class="chartjs-size-monitor-expand">
                        <div class=""></div>
                    </div>
                    <div class="chartjs-size-monitor-shrink">
                        <div class=""></div>
                    </div>
                </div>

                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 id="Title-List-News" class="h2 text-white">Новини:</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addNews();">➕ Дабавити новину</button>
                    </div>
                </div>

                <table class="table table-hover">
                    <tbody id="List-News">
                        <!-- Дані заповняються через JS -->
                    </tbody>
                </table>

            </main>
        </div>
    </div>

    <? include 'public/libs/pre_loader.php' ?>

    <? include 'public/libs/js.php' ?>

    <link rel="stylesheet" type="text/css" href="public/assets/css/changeAlert.css">

    <script src="public/assets/js/admin.js" type="text/javascript"></script>

</body>

</html>