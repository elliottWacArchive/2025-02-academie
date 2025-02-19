
class CookieModel {
    static addCookie(name, value) {
        try {
            document.cookie = `${name}=${value}; path=/`;
        } 
        catch (error) {
            console.error("Erreur lors de l'ajout du cookie : ", error);
            throw error;
        }
    }
    static deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    static getCookie(name) {
        const cookie = document.cookie.split(';').find(item => item.trim().startsWith(name + '='));
        if (cookie) {
            return cookie.split('=')[1];
        }
        return false;
    }
    static deleteAllCookies() {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            this.deleteCookie(name);
        }
    }
}

export default CookieModel;
