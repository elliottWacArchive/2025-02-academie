async function loadProfile(id) {
    console.log(id);
    const response = await fetch('http://localhost:3000/users/loadProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    const result = await response.json();
    console.log(result);
    document.querySelector('.username').textContent = result.user.username;
    document.querySelector('.pp').src = 'http://localhost:3000/storage/pp/' + result.user.pp;
    document.querySelector('.bio').textContent = result.user.bio;
}

document.addEventListener('DOMContentLoaded', () => {
    // getFollower(id);
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    
});

// async function getFollowers(id) {
//     const response = await fetch('http://localhost3000/follows/getFollowers', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id }),
//     });
//     const result = await response.json();
//     console.log(result);

// }