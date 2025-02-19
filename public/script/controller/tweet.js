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

