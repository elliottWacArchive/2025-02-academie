
async function getFollowers(id) {
    console.log(id);
    
    const response = await fetch('http://localhost:3000/follow/getFollowers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    });
    const result = await response.json();
    console.log(result);

    createFollowerDivs(result.followers);
    // CREATION ELEMESNT
    
}

function getRandomPosition(container, ballSize) {
    let containerRect = container.getBoundingClientRect();
    console.log(containerRect);
    let A = {x:0, y:0};
    let B = {x:0, y:containerRect.height};
    let C = {x:containerRect.width - ballSize, y:containerRect.height - ballSize * 2};
    // let A = {x:0, y:0};
    // let B = {x:containerRect.left, y:containerRect.top + containerRect.height};
    // let C = {x:containerRect.left + containerRect.width, y:containerRect.top + containerRect.height};
   console.log(A);
    console.log(B);
    console.log(C);
   
    let balls = document.querySelectorAll(".ball");
    let maxAttempts = 100; // Pour éviter une boucle infinie

    for (let i = 0; i < maxAttempts; i++) {
        // Génération d'un point aléatoire dans le triangle (coordonnées barycentriques)
        let r1 = Math.random();
        let r2 = Math.random();

        if (r1 + r2 > 1) {
            r1 = 1 - r1;
            r2 = 1 - r2;
        }
        let randomX = A.x + r1 * (B.x - A.x) + r2 * (C.x - A.x);
        let randomY = A.y + r1 * (B.y - A.y) + r2 * (C.y - A.y);
        // let randomX = containerRect.width * r1;
        // let randomX = A.x * r1 + B.x * r2 + C.x * r1; 
        // let randomY = containerRect.height * r2;
        // let randomX = A.x + r1 * (B.x - A.x) + r2 * (C.x - A.x);
        // let randomY = A.y + r1 * (B.y - A.y) + r2 * (C.y - A.y);

        let overlap = false;
        balls.forEach(ball => {
            let rect = ball.getBoundingClientRect();
            if (
                randomX < rect.right - containerRect.left &&
                randomX + ballSize > rect.left - containerRect.left &&
                randomY < rect.bottom - containerRect.top &&
                randomY + ballSize > rect.top - containerRect.top
            ) {
                overlap = true;
            }
        });

        if (!overlap) return { x: randomX, y: randomY };
    }
    return null; // Aucun espace trouvé
}

function createArea(container) {
    let containerRect = container.getBoundingClientRect();
    let follower = document.createElement('div');
    follower.id = 'follower';
    follower.className += 'block-md-2-10-column';
    // follower.style.width = '100%';
    // follower.style.height = '100%';
    follower.style.position = 'fixed';
    let canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    if (!canvas.getContext) {
        alert("Canvas non supporté !");
        return;
    } else {
        let ctx = canvas.getContext('2d');
        console.log(containerRect);
        
        var sWidth = containerRect.width;
        console.log(sWidth);
        
        var sHeight = containerRect.height;
        console.log(sHeight);
        var path=new Path2D();
        path.moveTo(0,0);
        path.lineTo(sWidth/2, sHeight/2);
        path.lineTo(sWidth,sHeight);
        path.lineTo(sWidth*2, sHeight*2);
        ctx.strokeStyle = "rgb(0 0 255 / 0.5)";
        ctx.stroke(path);
        ctx.closePath();
        follower.appendChild(canvas);
        container.appendChild(follower);
    }
}

function createFollowerDivs(followers) {
    let fol_section = document.getElementsByClassName('follow')[0];
    console.log(fol_section);
    let rect = fol_section.getBoundingClientRect();
    console.log(rect);
    
    

    // RETURN LISTNODE -> ELELS
    followers.forEach(follower => {
        const followerDiv = document.createElement('div');
        const followerId = document.createElement('div');
        const ballSize = 45;
        let position = getRandomPosition(fol_section, ballSize);

        if (!position) {
            alert("Plus d'espace disponible !");
            return;
        }
        followerDiv.style.position = 'relative';
        followerDiv.style.width = ballSize + "px";
        followerDiv.style.height = ballSize + "px";
        followerDiv.style.left = position.x + "px";
        followerDiv.style.top = position.y + "px";
        followerDiv.className = 'follower';
        followerDiv.className = 'ball';


        followerId.innerText = follower.following.username;
        followerDiv.appendChild(followerId);
        // followerDiv.style.display = 'relative';
        // followerDiv.style.transform = 'translateX(50)';
        createArea(fol_section);
        fol_section.appendChild(followerDiv);
    });
}

console.log(document.addEventListener("click", event => {
    console.log(CookieModel.getCookie("token"));
}));

document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("small_fol")) {
        // console.log("oui c'bon");
        let follow_id = parseInt(event.target.parentElement.value);
        // console.log(event.target.parentElement);
        const token = CookieModel.getCookie("token");
        const follower_Id = await fetch('http://localhost:3000/users/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, param: 'id' }),
        });
        const rsl = await follower_Id.json();
        console.log(rsl);
        
        const response = await fetch("http://localhost:3000/follow/createFollow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ followerId: rsl.user, followingId: follow_id }),
        });
        const result = await response.json();
        alert(result.message || result.error);
        // event.target.closest(".block-lg-6-2-column").style.display = "none";
    };

});
