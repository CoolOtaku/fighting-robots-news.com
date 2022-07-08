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
    <div class="text-center">
        <img id="img_news" src="" width="80%">
        <h2 id="title_news"></h2>
        <h4 class="text-white" id="description_news"></h4>
    </div>
    <p id="text_news"></p>
    <p id="date_news" class="text-end"></p>
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

<script src="public/assets/js/news.js" type="text/javascript"></script>

</body>
</html>