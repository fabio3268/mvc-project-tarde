import {
    showDataForm,
    getBackendUrlApi, getBackendUrl, showToast
} from "./../_shared/functions.js";

import {
    userAuth
} from "./../_shared/globals.js";

fetch(getBackendUrlApi("users/me"), {
    method: "GET",
    headers: {
        token: userAuth.token
    }
}).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            showToast(data.error.message);
            setTimeout(() => {
                window.location.href = getBackendUrl();
            },3000);
        }
        showDataForm(data.user);
    });
});

const formUserUpdate = document.querySelector("#profile");

formUserUpdate.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new URLSearchParams(new FormData(formUserUpdate)).toString();
    console.log(formData);
    fetch(getBackendUrlApi("users/update"), {
        method: "put",
        body: formData,
        headers: {
            token: userAuth.token,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then((response) => {
        response.json()
            .then((user) => {
                console.log(user);
            });
    });
});
