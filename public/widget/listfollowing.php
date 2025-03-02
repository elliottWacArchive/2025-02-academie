<script type="module">
import CookieModel from '../script/model/cookie.js';

document.addEventListener('DOMContentLoaded', async () => {
            const token = CookieModel.getCookie('token');
            const para = await fetch('http://localhost:3000/users/getUser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token:token, param:"id" }),
            });
            const param_rsl = await para.json();
            const response = await fetch('http://localhost:3000/follow/getFollowers', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: param_rsl.user }),
            });
            const result = await response.json();
            console.log(result);
            result.followers.forEach(element => {
                let par = document.getElementById("follow_list")
                const banner = document.createElement('div');
                banner.textContent = element.follower.username;
                banner.style.border = '1px solid black';
                banner.style.padding = '10px';
                banner.style.margin = '5px';
                par.appendChild(banner);
            });
        });
</script>