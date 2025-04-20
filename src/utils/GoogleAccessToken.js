import { gapi } from "gapi-script";

export function verifyGoogleAccessToken() {
    const googleAccessToken = JSON.parse(localStorage.getItem("google_access_token"));
    if (!googleAccessToken || Date.now() > googleAccessToken.expiryTime) {
        newLogin(); // Como não salvamos o refresh por enquanto tem que fazer um novo login;
    } else {
        gapi.auth.setToken({
            access_token: googleAccessToken.access_token,
        });
    }
}

function newLogin() {
    if(localStorage.getItem("user")){
        localStorage.removeItem("user");
        window.location.reload();
    }
}