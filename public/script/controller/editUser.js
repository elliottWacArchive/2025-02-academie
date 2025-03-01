import CookieModel from "../model/cookie.js";

document.addEventListener('click', async function (event) {
    const token = CookieModel.getCookie('token');
    if (event.target.id === 'subBio') {
        const bio = document.getElementById('bio').value;
        const check = await editUser(token, 'bio', bio)
        if (check) {
            alert('Votre biographie a bien été modifiée !');
        } else {
            alert('Erreur lors de la modification de votre biographie.');
        }
    }
    if (event.target.id === 'subPassword') {
        const password = document.getElementById('password').value;
        const check = await editUser(token, 'password', password);
        if (check) {
            alert('Votre mot de passe a bien été modifié !');
        } else {
            alert('Erreur lors de la modification de votre mot de passe.');
        }
    }
    if (event.target.id === 'subPp') {
        const pp = document.getElementById('pp');
        const formData = new FormData();
        formData.append('pp', pp.files[0]);
        formData.append('token', token);
        const check = await editPp(formData);
        // if (check) {
        //     alert('Votre photo de profil a bien été modifiée !');
        // } else {
        //     alert('Erreur lors de la modification de votre photo de profil.');
        // }
    }
});

async function editPp(form) {
    try {
        const response = await fetch("http://localhost:3000/users/setPp", {
            method: "POST",
            body: form,
        });
        const data = await response.json();
        console.log(data);
        console.log(data.userId);
        // if (response.status === 201) {
        //     console.log("Photo de profil modifiée avec succès !");
        //     return true;
        // } else {
        //     console.log(response);
        //     return false;
        // }
    } catch (error) {
        console.log("Erreur lors de la modification de la photo de profil : ", error);
        return false;
    }
}

async function editUser(token, param, value) {
    try {
        const response = await fetch("http://localhost:3000/users/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                param: param,
                value: value
            })
        });

        if (response.status === 201) {
            console.log("Utilisateur modifié avec succès !");
            return true;
        } else {
            console.log(response);
            return false;
        }
    } catch (error) {
        console.log("Erreur lors de la modification de l'utilisateur : ", error);
        return false;
    }
}