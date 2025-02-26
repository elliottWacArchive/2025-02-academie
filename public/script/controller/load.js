import CookieModel from "../model/cookie.js";

document.addEventListener('DOMContentLoaded', async function() {
    const token = CookieModel.getCookie('token');
    if (token != '') {
        const response = await fetch('http://localhost:3000/users/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, param: 'username' }),
        });
        const result = await response.json();
        console.log(result);
        document.querySelector('.username').textContent = result.user;
    } else {
        window.location.href = '/signin';
    }
});