import {
    showDataForm,
    getBackendUrlApi, getBackendUrl, showToast
} from "./../_shared/functions.js";

const listServices = document.querySelector("#list-services");
const serviceForm = document.querySelector("#edit-form");

const modalService = document.querySelector("#edit-modal");
//modalService.style.display = "flex";
let categories = fetch(`http://localhost:8080/mvc-project-tarde/api/services-categories`).then((response) => {
    response.json().then((categories) => {
        categories.forEach((category) => {

        });
    });
});

fetch(`http://localhost:8080/mvc-project-tarde/api/services/list-by-category/category/1`,{
    method: "GET"
})
    .then((response) => {
    console.log(response.json()
        .then((services) => {
            //console.log(services);
            services.forEach((service) => {
                //console.log(service.id, service.name);
                const newServiceLi = document.createElement("li");
                newServiceLi.setAttribute("service-id",service.id);
                newServiceLi.innerHTML = `
                <span>ID: ${service.id}</span>
                <span>Nome: ${service.name}</span>
                <button class="edit-btn" data-id="1"><i class="fas fa-edit"></i> Editar</button>
                <button class="delete-btn" data-id="1"><i class="fas fa-trash"></i> Excluir</button>
                `;
                listServices.appendChild(newServiceLi);
            });
        }));
});

listServices.addEventListener("click", (e) => {
    console.log(e.target.tagName);
    /*if(e.target.tagName == "BUTTON" && e.target.classList.contains("edit-btn")){
        console.log('edite');
    }*/
    if(e.target.matches("button.edit-btn")){
        console.log('edite');
        console.log();
        fetch(`http://localhost:8080/mvc-project-tarde/api/services/service/${e.target.parentElement.getAttribute("service-id")}`, {
            method: "GET"
        }).then((response)=>{
            response.json()
                .then((service) => {
                    console.log(service);
                    modalService.style.display = "flex";
                    showDataForm(service);
                    console.log(categories);
                    //categories
                });
        });
    }
    if(e.target.matches("button.delete-btn")){
        console.log("delete");
    }
});


/*
fetch(getBackendUrlApi("services/list-by-category/category/1"),
    {
        method: "GET"
    }).then((response) => {
     response.json().then((services) => {
         //console.log(services);
         services.forEach((service) => {
             console.log(service.name, service.id);
             const newServiceLi = document.createElement("li");
             newServiceLi.setAttribute("service-id", service.id);
             newServiceLi.innerHTML = `
             <span>ID: ${service.id}</span>
                <span>Nome: ${service.name}</span>
                <button class="edit-btn" data-id="1"><i class="fas fa-edit"></i> Editar</button>
                <button class="delete-btn" data-id="1"><i class="fas fa-trash"></i> Excluir</button>
             `;
             listServices.appendChild(newServiceLi);
         });
     });
});

listServices.addEventListener("click", (e) => {

    if(e.target.matches("button.edit-btn")){
        console.log();
        document.querySelector("#edit-modal").style.display = "flex";

        fetch(getBackendUrlApi(`services/service/${e.target.parentElement.getAttribute("service-id")}`))
            .then((response) => {
                console.log();
                response.json().then(async (service) => {
                    console.log(service);
                    await showDataForm(service);
                });
            });

    }

    if(e.target.matches("button.delete-btn")){
        console.log("Clicando no botão delete");
    }
});

serviceForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
*/
