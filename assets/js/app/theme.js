import {
    getBackendUrl, getBackendUrlApi, showToast
} from "./../_shared/functions.js";

import {
    userAuth
} from "./../_shared/globals.js";

if(!userAuth){
    window.location.href = getBackendUrl("login");
}

document.querySelector("img").setAttribute("src", getBackendUrl(userAuth.photo));

// Código aqui está repetitivo, pois o thema faz a validação do token por tempo
// e depois os demais scripts também farão a validação do token por tempo

fetch(getBackendUrlApi("users/token-validate"), {
    method: "GET",
    headers: {
        token: userAuth.token
    }
}).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            showToast(data.error.message);
            setTimeout(() => {
                window.location.href = getBackendUrl("login");
            },3000);
        }
    });
});