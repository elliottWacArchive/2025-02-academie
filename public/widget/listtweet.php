<script>
    document.addEventListener('DOMContentLoaded', async () => {
        const response = await fetch('http://localhost:3000/tweets/findTweets');
        const result = await response.json();
        console.log(result);
        let tweetContainer = document.getElementById('feed');
        result.user.forEach(element => {
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleString('fr-FR', {
                    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                }).replace(',', '').replace(' ', '-').replace(':', 'h');
            };
            let tweet = document.createElement('div');
            tweet.classList.add('pillz-container', 'dark', 'center', 'block-lg-6-3');
            
            // <img class="icon" src="http://localhost:3000/storage/pp/${element.user.pp}" alt=""> pour plus tard
            tweet.innerHTML = `
                    <div class="pillz-header">
                        <div class="small tweets_close">✖️​</div>
                    </div>
                    <div class="pillz-center">
                        <div>${element.body}</div>
                    </div>
                    <div class="pillz-footer">
                    <div class="pillz-information">
                            <div class="elem">${element.user.username}</div>
                            <div class="elem">${formatDate(element.created_at)}</div>
                    </div>
                    <div class="pillz-reaction">
                        <div class="small" id="like">❤️​</div>
                        <div class="small" id="repilz">🔁</div>
                        <button class="small comment" value="${element.id}">💬
                        </button>
                        <button class="btn_pills" value="${element.user.id}">
                            <img class="small_fol" src="../image/follow.png" alt="follow">
                        </button>
                        
                    </div>
                `;
            tweetContainer.appendChild(tweet);
        });
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("tweets_close")) {
                event.target.closest(".block-lg-6-2-column").style.display = "none";
            }
        });
        document.addEventListener("touchstart", (event) => {
            if (event.target.classList.contains("block-lg-6-2-column")) {
                // event.preventDefault();
                const touch = event.touches[0];
                elementX = touch.clientX;
                elementY = touch.clientY;
                console.log(elementX, elementY);
            }
        });
        document.addEventListener("touchmove", (event) => {
            if (event.target.classList.contains("block-lg-6-2-column")) {
                // event.preventDefault();
                const touch = event.touches[0];
                const element = event.target;
                let elementX = touch.clientX;
                let elementY = touch.clientY;
                let elementRadius = element.offsetWidth;
                let elementHeight = element.offsetHeight;
                console.log(elementRadius);
                
                element.style.position = "relative";
                // element.style.left = `${elementX - elementRadius}px`;
                // element.style.top = `${elementY - elementRadius}px`;
                console.log(element);
                element.style.left = `${elementX - elementRadius}px`;
                element.style.top = `${elementY - elementHeight}px`;
                console.log(elementX, elementY);
            }
        });
    });
</script>
<script defer type="module" src="../script/controller/tweet.js"></script>

<!-- </div> -->