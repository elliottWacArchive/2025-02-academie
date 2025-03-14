<head>
<script src="/script/controller/profile.js"></script>

<?php
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    echo "<script>loadProfile(" . $_GET['id'] . ");</script>";
}
?>
</head>
<body>
<div class="main-sm-column main-md-column main-lg colored">
    <!-- <div class="user-block">
        <div class="username">Pseudo</div>
        <img class="pp" src="http://localhost:3000/storage/pp/default.jpg" alt="">
        <div class="dosage">0.25mg</div>
        <div class="bio">Bio</div>
    </div> -->
    <div class="block-lg-2-10 block-md-10-1 block-sm-10-1 colored-secondary"></div>
    <div class="block-lg-8-10-nopad-column block-md-10-9-nopad-column block-sm-10-9-nopad-column">
        <div class="profil-container">
            <div class="user-block">
                <div class="username">Pseudo</div>
                <img class="pp" src="http://localhost:3000/storage/pp/default.jpg" alt=""></img>
                <div class="dosage">0.25mg</div>
                <div class="bio">Bio</div>
                <div class="pills">30 Pills</div>
            </div>
            <div class="block-lg-5-10-column block-md-2-10-column block-sm-2-10-column colored-secondary"></div>
        </div>
        <div class="block-lg-10-10 block-md-10-10 block-sm-10-10 colored-secondary"></div>
    </div>
</div>
</body>
