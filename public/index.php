<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="frontend/css/normalize.css">
    <link rel="stylesheet" href="frontend/css/skeleton.css">
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
        require __DIR__ . '/frontend/view/login.php';
        break;
    case '/home':
        require __DIR__ . '/frontend/view/home.php';
        break;
    case '/login':
        require __DIR__ . '/frontend/view/login.php';
        break;
    case '/inscription':
        require __DIR__ . '/frontend/view/signup.php';
        break;
    case '/settings':
        require __DIR__ . '/frontend/view/settings.php';
        break;
    case '/messages':
        require __DIR__ . '/frontend/view/messages.php';
        break;
    default:
        require __DIR__ . '/frontend/view/404.php';
        break;
}

?>

</html>