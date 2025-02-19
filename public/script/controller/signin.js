import CookieModel from "../model/cookie.js";

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    alert(result.message || result.error);
    if (result.token != false) {
        CookieModel.addCookie("token", result.token);
    }
});