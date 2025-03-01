<div class="block-collumn-8-6">
    <div class="block-sm-4-4 tweet-container">
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const response = await fetch('http://localhost:3000/tweets/findTweets');
            const result = await response.json();
            console.log(result.user);
            // alert(result.message || result.error);
        });
    </script>

</div>