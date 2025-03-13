<head>
    <link rel="stylesheet" href="/css/pillz.css">
    <title>Home</title>
    <script type="module" src="script/controller/load.js"></script>
    <script defer src='script/controller/ball.js'></script>
    <script defer src='script/controller/comments.js'></script>
</head>
<body>
    <div class="main-sm-column main-md-column main-lg dark">
        <div class="block-lg-2-10-column block-md-10-2 block-sm-10-2 secondary">
            <div class="block-lg-10-3 block-md-3-10 block-sm-3-10 dark center">
                <div class="profile">
                    <img class="pp" src="http://localhost:3000/storage/pp/default.jpg" alt="">
                    <div class="username"></div>
                </div>
            </div>
            <div class="block-lg-10-7 block-md-7-10 block-sm-7-10 dark"></div>
        </div>
        <div class="block-lg-8-10-column block-md-10-8-column block-sm-10-8-column secondary">
            <div id="searchbar">
                <?php include 'widget/searchbar.php' ?>
            </div>
            <div id="feed"></div>
            <?php // include 'widget/tweet.php' ?>
            <?php include 'widget/listtweet.php' ?>
        </div>
    </div>
    <div id="ball">
        <img id="pillz-img" src="image/publish-btn.png" alt="">
    </div>
</body>
<script type="module" src="script/controller/follows.js"></script>