<!-- <div class="block-lg-10-8-column" id="l"> -->

<style>
    #list-tweet {
    min-height: 500px; /* Ajustez selon le besoin */
    overflow-y: auto;  /* Permet de scroller si besoin */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Aligner les tweets en haut */
}
</style>

    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const response = await fetch('http://localhost:3000/tweets/findTweets');
            const result = await response.json();
            console.log(result);
            let tweetContainer = document.getElementById('feed');
            tweetContainer.classList.add('block-lg-10-8-column', 'dark');
            result.user.forEach(element => {
                const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    return date.toLocaleString('fr-FR', {
                        weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    }).replace(',', '').replace(' ', '-').replace(':', 'h');
                };
                // console.log('element', element);
                // let tweetContainer = document.getElementById('tweets-container');
                let tweet = document.createElement('div');
                tweet.style.minHeight = '100px';
                tweet.classList.add('block-lg-10-6-column', 'dark');

                tweet.innerHTML = `
                    <div class="block-lg-10-1-nopad dark flex-end header">
                        <img class="icon" src="image/icon/close.svg" alt="">
                    </div>
                    <div class="block-lg-10-4-nopad dark center">
                        <div>${element.body}</div>
                    </div>
                    <div class="block-lg-10-3 dark">
                            <div>${element.user.username}</div>
                            <div>${formatDate(element.created_at)}</div>
                    </div>
                `;
                tweetContainer.appendChild(tweet);
            });

            // alert(result.message || result.error);
        });
    </script>

<!-- </div> -->