<?php
if (isset($_GET['id'])) {
    echo '<h1>Profil de ' . ($_GET['id']) . '</h1>';
} else {
    echo '<h1>ID utilisateur non spécifié</h1>';
}
?>