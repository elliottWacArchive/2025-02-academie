import CookieModel from "../model/cookie.js";

const tweet_container = document.getElementById("tweet-container");
const tweet_close = document.getElementById("close-tweet");
const tweet_send = document.getElementById("publish-tweet");

tweet_close.addEventListener("click", () => {
    tweet_container.style.display = "none";
});

tweet_send.addEventListener("click", async () => {
    const tweet_text = document.getElementById("text-tweet").innerText;
    if (tweet_text.length < 1) {
        alert("Tweet cannot be empty");
        return;
    }
    console.log(tweet_text);
    const response = await fetch("http://localhost:3000/tweets/createTweet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tweet_text, token: CookieModel.getCookie("token") }),
    });

    const result = await response.json();
    alert(result.message || result.error);
    if (result.tweet != false) {
        window.location.href = "/";
    }
});

// MOUVEMENT DE LA BALLE (credit: https://controlistes.fr/)
const element = document.getElementById('ball');
const elementRadius = 50; // moitié de la taille de l'element
const threshold = 300; // distance avant repoussement
const stopThreshold = 100; // distance avant arrêt
const maxSpeed = 100; // vmax
const friction = 0.98; // frottement
let velocityX = 0;
let velocityY = 0;
let isFrozen = false;

let elementX = window.innerWidth / 1.3;
let elementY = window.innerHeight / 1.5;
element.style.left = `${elementX - elementRadius}px`;
element.style.top = `${elementY - elementRadius}px`;

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const deltaX = mouseX - elementX;
    const deltaY = mouseY - elementY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance < stopThreshold) {
        isFrozen = true;
    } else {
        isFrozen = false;
    }

    if (!isFrozen && distance < threshold) {
        const angle = Math.atan2(deltaY, deltaX);
        const forceX = Math.cos(angle) * (threshold - distance) * 0.005;
        const forceY = Math.sin(angle) * (threshold - distance) * 0.005;

        velocityX -= forceX;
        velocityY -= forceY;

        velocityX = Math.min(Math.max(velocityX, -maxSpeed), maxSpeed);
        velocityY = Math.min(Math.max(velocityY, -maxSpeed), maxSpeed);
    }
});

function updatePosition() {
    if (!isFrozen) {
        velocityX *= friction;
        velocityY *= friction;

        elementX += velocityX;
        elementY += velocityY;

        if (elementX - elementRadius <= 0) {
            elementX = elementRadius;
            velocityX *= -1;
        } else if (elementX + elementRadius >= window.innerWidth) {
            elementX = window.innerWidth - elementRadius;
            velocityX *= -1;
        }

        if (elementY - elementRadius <= 0) {
            elementY = elementRadius;
            velocityY *= -1;
        } else if (elementY + elementRadius >= window.innerHeight) {
            elementY = window.innerHeight - elementRadius;
            velocityY *= -1;
        }

        element.style.left = `${elementX - elementRadius}px`;
        element.style.top = `${elementY - elementRadius}px`;
    }

    requestAnimationFrame(updatePosition);
}

requestAnimationFrame(updatePosition);

