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

        const dataUserTemp = {
            name: data.user.name,
            email: data.user.email,
            address: data.user.address
        };
        showDataForm(dataUserTemp);
        document.querySelector("img").setAttribute("src", getBackendUrl(data.user.photo));
    });
});

const formUserUpdate = document.querySelector("#profile");

formUserUpdate.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new URLSearchParams(new FormData(formUserUpdate)).toString();
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
                if(user.error) {
                    showToast(user.error.message);
                    return;
                }
                showToast("Dados atualizados com sucesso!");
            });
    });
});

const formPhoto = document.querySelector("#form-photo");
formPhoto.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(getBackendUrlApi("users/photo"), {
        method: "POST",
        body: new FormData(formPhoto),
        headers: {
            token: userAuth.token
        }
    }).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                showToast(data.error.message);
                return;
            }
            showToast("Foto atualizada com sucesso!");
            document.querySelector("img").setAttribute("src", getBackendUrl(data.user.photo));
        });
    });
});
