import CookieModel from "../model/cookie.js";

document.addEventListener("DOMContentLoaded", async () => {
    const token = CookieModel.getCookie("token");
    if (token != '') {
        const response = await fetch("http://localhost:3000/users/isToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });
    
        const result = await response.json();
        alert(result.message || result.error);
        if (result.token == true) {
            window.location.href = "/";
        } else {
            CookieModel.removeCookie("token");
            window.location.href = "/signin";
        }
    } else {
        window.location.href = "/signin";
    }
});