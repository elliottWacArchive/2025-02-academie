import CookieModel from "../model/cookie.js";

console.log(document.addEventListener("click", event => {
    // console.log(event);
}));
document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("small_fol")) {
        // console.log("oui c'bon");
        let follow_id = parseInt(event.target.parentElement.value);
        // console.log(event.target.parentElement);
        const token = CookieModel.getCookie("token");
        const follower_Id = await fetch('http://localhost:3000/users/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, param: 'id' }),
        });
        const rsl = await follower_Id.json();
        console.log(rsl);
        
        const response = await fetch("http://localhost:3000/follow/createFollow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ followerId: rsl.user, followingId: follow_id }),
        });
        const result = await response.json();
        alert(result.message || result.error);
        // event.target.closest(".block-lg-6-2-column").style.display = "none";
    }
});
