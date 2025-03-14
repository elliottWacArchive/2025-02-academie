import CookieModel from "../model/cookie.js";

document.addEventListener('DOMContentLoaded', function() {
    const theme = CookieModel.getCookie('theme');
    if (theme === 'light') {
        document.querySelector('link[href="/css/dark-theme.css"]').href = '/css/light-theme.css';
        if (document.getElementById('dark-theme')) {
            document.getElementById('dark-theme').innerText = 'dark mode';
            document.getElementById('dark-theme').id = 'light-theme';
        }
    }
});

export function changeTheme(event) {
    const theme = event.target.id;
    if (theme === 'dark-theme') {
        CookieModel.addCookie('theme', 'light');
        event.target.innerText = 'dark mode';
        event.target.id = 'light-theme';
        document.querySelector('link[href="/css/dark-theme.css"]').href = '/css/light-theme.css';
    } else {
        CookieModel.deleteCookie('theme');
        event.target.innerText = 'light mode';
        event.target.id = 'dark-theme';
        document.querySelector('link[href="/css/light-theme.css"]').href = '/css/dark-theme.css';
    }
}
