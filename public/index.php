<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="css/normalize.css"> -->
    <!-- <link rel="stylesheet" href="css/skeleton.css"> -->
    <link rel="stylesheet" href="css/digestion.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="icon" href="image/logo.png" type="image/x-icon">
    <!--
    Ici doivent être ajouté les script / style génériques.
    Si un script est utilisé sur toutes les view (ex. Cookie car la gestion des cookies est necessaire partout),
    alors il doit être intégré ici!
    -->
</head>
<?php

$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '/':
        require __DIR__ . '/view/home.php';
        break;
    case '/home':
        require __DIR__ . '/view/home.php';
        break;
    case '/login':
        require __DIR__ . '/view/signin.php';
        break;
    case '/signin':
        require __DIR__ . '/view/signin.php';
        break;
    case '/connexion':
        require __DIR__ . '/view/signin.php';
        break;
    case '/inscription':
        require __DIR__ . '/view/signup.php';
        break;
    case '/signup':
        require __DIR__ . '/view/signup.php';
        break;
    case '/settings':
        require __DIR__ . '/view/settings.php';
        break;
    case '/messages':
        require __DIR__ . '/view/messages.php';
        break;
    default:
        require __DIR__ . '/view/404.php';
        break;
}

?>

</html>