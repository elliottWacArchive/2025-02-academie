import CookieModel from "../model/cookie.js";

let isOpen = false;
document.addEventListener('click', function (event) {
    if (event.target.id === 'ball') {
        if (isOpen) {
            return;
        } else {
            isOpen = !isOpen;
            event.target.style.width = '70%';
            event.target.style.left = 'calc(30% - 20px)';
            event.target.style.height = '70%';
            event.target.style.top = 'calc(30% - 20px)';
            createTweet(event.target);
            document.getElementById('pillz-img').remove();
        }
    }
    if (event.target.id === 'close-tweet') {
        isOpen = !isOpen;
        const element = document.getElementById('ball');
        element.style.width = '100px';
        element.style.left = 'calc(100% - 120px)';
        element.style.height = '100px';
        element.style.top = 'calc(100% - 120px)';
        const tweetContainer = document.getElementById('tweet-container');
        element.removeChild(tweetContainer);
        const image = document.createElement('img');
        image.src = 'image/publish-btn.png';
        image.id = 'pillz-img';
        element.appendChild(image);
    }
});

function createTweet(element) {
    const pillzerContainer = document.createElement('div');
    // pillzerContainer.classList.add('pillz');
    pillzerContainer.id = 'tweet-container';

    const header = document.createElement('div');
    header.classList.add('header');

    const close = document.createElement('img');
    close.classList.add('icon');
    close.id = 'close-tweet';
    close.src = 'image/icon/close.svg';

    header.appendChild(close);
    pillzerContainer.appendChild(header);

    const center = document.createElement('div');
    center.classList.add('center');

    const textTweet = document.createElement('div');
    textTweet.id = 'text-tweet';
    textTweet.contentEditable = 'true';

    center.appendChild(textTweet);
    pillzerContainer.appendChild(center);

    const footer = document.createElement('div');
    footer.classList.add('footer');
    const publishTweet = document.createElement('img');
    publishTweet.id = 'publish-tweet';
    publishTweet.classList.add('icon');
    publishTweet.src = 'image/publish-btn.png';
    footer.appendChild(publishTweet);
    pillzerContainer.appendChild(footer);
    element.appendChild(pillzerContainer);
    listenTweet();
};

function listenTweet() {
    const publishTweet = document.getElementById("publish-tweet");
    publishTweet.addEventListener("click", async () => {
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
}
