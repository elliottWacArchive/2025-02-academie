<head>
<script src="script/controller/profile.js"></script>

<?php
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    echo "<script>loadProfile(" . $_GET['id'] . ");</script>";
}
?>
</head>
<body>
<div class="main-sm-column main-md-column main-lg-column dark">
    <div class="block-lg-10-4 block-md-10-4 block-sm-10-4 secondary">
        <div class="username">Pseudo</div>
        <img class="pp" src="http://localhost:3000/storage/pp/default.png" alt="">
        <div class="bio">Bio</div>
    </div>
    <div class="block-lg-10-6 block-md-10-6 block-sm-10-6 secondary">
    </div>
</div>
</body>
