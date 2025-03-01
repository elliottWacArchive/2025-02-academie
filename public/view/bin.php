<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/bin.css">
    <title>Anto_Dev</title>
</head>
<body>
    <h3>Ici se trouve un essai</h3>
    <div class="container">
        <div class="arr">
            <div class="left">
                <img class="img" src="../image/Image.svg" alt="logo">
            </div>
            <div class="right">
                <div class="head">
                    <h5>Le nom de l'user @sonid <span id="date">19/04/3000</span></h5>

                </div>
                <div class="body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.</p>
            </div>
            <div class="bottom">
                <button type="button">Retwit</button>
            <button type="button">Commenter</button> <button type="button">Follow</button>           </div>
            </div>

        </div>
    </div>

    <div class="main-sm-column main-md-column main-lg-column dark">
        <div class="block">
            <div class="block-lg-10-4-column block-sm-1-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae molestias velit quod minima eos veritatis, fugit ad optio placeat cupiditate at modi animi odio cum aliquam fugiat hic nulla culpa.
            </div>
        </div>
        <div class="block">
            <?php
                include 'widget/listtweet.php';
            ?>
        </div>
        <div class="block-10-10">
            <img src="../image/pill_A.png" alt="pill">
            <img src="../image/pill_B.png" alt="pill" height="135px" style="rotate: 15deg;">
            <img src="../image/follow.png" alt="follows">

        </div>
    </div>

</body>
</html>