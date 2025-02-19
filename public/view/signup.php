<head>
    <title>Inscription</title>
</head>
<body>
    <div class="main flex fcolumn">
        <h1>Abilifeed</h1>
        <form class="flex fcolumn" action="">
            <input type="text" name="username" id="username" placeholder="nom d'utilisateur">
            <input type="email" name="email" id="email" placeholder="adresse mail">
            <input type="password" name="password" id="password" placeholder="mot de passe">
            <input type="date" name="birthdate" id="birthdate">
            <button class='button button-primary'>S'inscrire</button>
        </form>
    </div>
</body>
<script>
    document.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const birthdate = document.getElementById("birthdate").value;

        const response = await fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, birthdate }),
        });

        const result = await response.json();
        alert(result.message || result.error);
    });
</script>
