<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="css/normalize.css"> -->
    <!-- <link rel="stylesheet" href="css/skeleton.css"> -->
    <link rel="stylesheet" href="/css/digestion/digestion.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/fonts.css">
    <link rel="icon" href="/image/logo.png" type="image/x-icon">
    <script type="module" src="/script/controller/checkCookies.js"></script>
    <!--
    Ici doivent être ajouté les script / style génériques.
    Si un script est utilisé sur toutes les view (ex. Cookie car la gestion des cookies est necessaire partout),
    alors il doit être intégré ici!
    -->
</head>
<?php

$request = $_SERVER['REQUEST_URI'];
$parsed_url = parse_url($request);
$path = $parsed_url['path'];

switch ($path) {
    case '/':
        require __DIR__ . '/view/home.php';
        break;
    case '/home':
        require __DIR__ . '/view/home.php';
        break;
    case '/login':
    case '/signin':
    case '/connexion':
        require __DIR__ . '/view/signin.php';
        break;
    case '/inscription':
    case '/signup':
        require __DIR__ . '/view/signup.php';
        break;
    case '/parameters':
    case '/settings':
        require __DIR__ . '/view/settings.php';
        break;
    case '/messages':
        require __DIR__ . '/view/messages.php';
        break;
    case (preg_match('/^\/user\/([0-9]+)$/', $path, $matches) ? true : false):
        $_GET['id'] = $matches[1];
        require __DIR__ . '/view/user.php';
        break;
    default:
        require __DIR__ . '/view/404.php';
        break;
}

?>

</html>