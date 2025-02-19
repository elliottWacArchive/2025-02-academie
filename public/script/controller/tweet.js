
let tweet_container = document.getElementById("tweet-container");
let tweet_close = document.getElementById("close-tweet");
tweet_container.addEventListener("click", async (e) => {
    function closeTweet() {
    $('#tweet-container').hide();
}
closeTweet();
});

tweet_send.addEventListener("click", async (e) => {
    e.preventDefault();
    let tweet_text = document.getElementById("text-tweet").value;
    const response = await fetch("http://localhost:3000/tweets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + CookieModel.getCookie("token"),
        },
        body: JSON.stringify({ tweet_text }),
    });

    const result = await response.json();
    alert(result.message || result.error);
    if (result.tweet != false) {
        window.location.href = "/";
    }
});

let tweet_send = document.getElementById("publish-tweet");

