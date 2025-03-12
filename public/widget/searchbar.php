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
            if (query.length != 0) {
                const response = await fetch('http://localhost:3000/users/loadProfile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Indiquer que c'est du JSON
                    },
                    body: JSON.stringify({ name: query }), // Correction : envoyer "name"
                });
                const result = await response.json();
                console.log(result);
                
                results.innerHTML = "";
                result.user.forEach(ele => {
                    const listItem = document.createElement('li');
                    listItem.textContent = ele.username;
                    results.appendChild(listItem);
                });
            } else {
                results.innerHTML = "";
            }
    });
});
</script>