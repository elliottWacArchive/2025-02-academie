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
                tweet.classList.add('block-lg-6-3-column', 'dark', 'center');
                // <img class="icon" src="http://localhost:3000/storage/pp/${element.user.pp}" alt=""> pour plus tard
                tweet.innerHTML = `
                    <div class="block-lg-10-3-nopad dark flex-end header">
                    <div class="small tweets_close">✖️​</div>
                    </div>
                    <div class="block-lg-10-4-nopad dark center">
                        <div>${element.body}</div>
                    </div>
                    <div class="block-lg-10-3-nopad dark flex-end footer">
                    <div class="block-lg-6-10-nopad dark">
                            <div class="elem">${element.user.username}</div>
                            <div class="elem">${formatDate(element.created_at)}</div>
                    </div>
                    <div class="block-lg-3-10-nopad dark flex-end">
                        <div class="small">❤️​</div>
                        <div class="small">🔁</div>
                    </div>
                `;
                tweetContainer.appendChild(tweet);
            });
            document.addEventListener("click", (event) => {
                if (event.target.classList.contains("tweets_close")) {
                    event.target.closest(".block-lg-6-3-column").style.display = "none";
                }
            });
        });
    </script>
<script defer type="module" src="../script/controller/tweet.js"></script>

<!-- </div> -->