import {
    HttpUser
} from '../classes/HttpUser.js';

import {
    getBackendUrl,
    getBackendUrlApi,
    getFirstName,
    showToast
} from "./../_shared/functions.js";

const formRegister = document.querySelector("#formRegister");
const api = new HttpUser();

formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const users = await api.createUser(new FormData(formRegister));
        showToast(users.message);
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

const formLogin = document.querySelector("#formLogin");
formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/login', new FormData(formLogin));
        console.log(response);
        if (response.type == "error" || response.type == "warning") {
            showToast(response.message, response.type);
            return;
        }
        //console.log(response);
        showToast(`Olá, ${getFirstName(response.user.name)} como vai!`);
        setTimeout(() => {
            window.location.href = getBackendUrl("app");
        }, 3000);
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});