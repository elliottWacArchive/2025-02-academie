<script>
    document.addEventListener('DOMContentLoaded', function() {
        const searchBar = document.getElementById('searchbar');
        searchBar.style.justifyContent = 'center';
        // searchBar.addClassName('block-lg-10-10-collumn');
        searchBar.style.display = 'flex';
        searchBar.style.alignItems = 'center';
        searchBar.style.flexDirection = 'column';
        searchBar.innerHTML = `
            <h2>What are you looking for ?</h2>
            <div class="block-lg-10-10 center dark">
            <input style="width:30%" type="text" id="search_people" placeholder="Search people">
            <input style="width:30%" type="text" id="search_pills" placeholder="Search pills">
            <input style="width:30%" type="text" id="search_hashtag" placeholder="Search #">
            </div>
            <ul id="results"></ul>
        `;
        const searchPeople = document.getElementById('search_people');
        const searchPills = document.getElementById('search_pills');
        const searchHashtag = document.getElementById('search_hashtag');
        const results = document.getElementById('results');
        // console.log(searchPeople, searchHashtag, searchPills);
        searchPeople.addEventListener('input', async function(event) {
            const query = event.target.value;
            console.log(query);
            const response = await fetch('http://localhost:3000/users/loadProfile', {
                    method: 'POST',
                    body: query,
        });
        const result = await response.json();
        console.log(result);
        
        result.user.forEach(element => {
            console.log(element.username);
            
        });        
        // results.innerHTML = "reslut";
    
        // forEach(result => {
        //     const listItem = document.createElement('li');
        //     listItem.textContent = result.user.username;
        //     results.appendChild(listItem);
        // });
    });

        
        
    //     searchPeople.addEventListener('input', function(event) {
    //         const query = event.target.value.toLowerCase();
    //         const results = document.getElementById('results');
    //         results.innerHTML = '';

    //         // Simulate search results
    //         const items = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi'];

    //         // const filteredItems = items.filter(item => item.toLowerCase().includes(query));
    //         const response = await fetch('http://localhost:3000/users/getProfile', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ token, param: 'username' }),
    //     });        const result = await response.json();
    //     console.log(result);
    //     let tweetContainer = document.getElementById('feed');
    //     result.user.forEach(element => {
    //         filteredItems.forEach(item => {
    //             const listItem = document.createElement('li');
    //             listItem.textContent = item;
    //             results.appendChild(listItem);
    //         });
    //     });
    // });
});
</script>
<!-- <script defer type="module" src="../script/controller/tweet.js"></script> -->