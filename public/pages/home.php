<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Fighting Robot News</title>

  <? include 'public/libs/favicon.php' ?>
  <? include 'public/libs/css.php' ?>
  <? include 'public/libs/google_login.php' ?>

</head>

<body>
  <input type="hidden" id="api_key" value="<? echo $_SESSION['ApiKey']; ?>">

  <? include 'public/libs/header.php' ?>

  <main class="pt-4">
    <div class="container mt-4">
      <hr class="featurette-divider">
      <div id="cs-go" class="alert alert-secondary cap-news" role="alert" style="background: url(public/assets/img/cs-go.jpg); min-height: 350px; background-size: cover; background-repeat: no-repeat; background-position: center;">
        <h2 class="text-center mt-5 pt-5">Counter-Strike: Global Offensive</h2>
      </div>
      <div class="row text-center" id="news-cs-go">
        <!-- Load data is Json -->
      </div>

      <hr class="featurette-divider">
      <div id="dota-2" class="alert alert-secondary cap-news" role="alert" style="background: url(public/assets/img/dota2.jpg); min-height: 350px; background-size: cover; background-repeat: no-repeat; background-position: center;">
        <h2 class="text-center mt-5 pt-5">Dota 2</h2>
      </div>
      <div class="row text-center" id="news-dota-2">
        <!-- Load data is Json -->
      </div>

      <hr class="featurette-divider">
      <div id="lol" class="alert alert-secondary cap-news" role="alert" style="background: url(public/assets/img/lol.jpg); min-height: 350px; background-size: cover; background-repeat: no-repeat; background-position: center;">
        <h2 class="text-center mt-5 pt-5">League of Legends</h2>
      </div>
      <div class="row text-center" id="news-lol">
        <!-- Load data is Json -->
      </div>

      <hr class="featurette-divider">
      <div id="Valorant" class="alert alert-secondary cap-news" role="alert" style="background: url(public/assets/img/valorant.jpg); min-height: 350px; background-size: cover; background-repeat: no-repeat; background-position: center;">
        <h2 class="text-center mt-5 pt-5">Valorant</h2>
      </div>
      <div class="row text-center" id="news-valorant">
        <!-- Load data is Json -->
      </div>

      <hr class="featurette-divider">
    </div><!-- /.container -->
  </main>

  <? include 'public/libs/searchModal.php' ?>

  <? include 'public/libs/loginModal.php' ?>

  <? include 'public/libs/footer.php' ?>

  <? include 'public/libs/pre_loader.php' ?>

  <!-- JS -->

  <? include 'public/libs/js.php' ?>

  <link rel="stylesheet" type="text/css" href="public/assets/css/changeAlert.css">

  <script src="public/assets/js/index.js" type="text/javascript"></script>

</body>

</html>