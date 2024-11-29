import {
    showDataForm, showDataSelect, showToast
} from "../_shared/functions.js";

import {
    HttpService
} from '../classes/HttpService.js';

import  {
    HttpServiceCategory
} from "../classes/HttpServiceCategory.js";

const api = new HttpService();
const apiCategoryService =  new HttpServiceCategory();

const selectCategoriesServices = document.querySelector('#service_category_id');
const modal = document.querySelector('.modal');
const servicesContainer = document.querySelector('.services-container');
const editForm = document.querySelector('#editForm');
const searchCategories = document.querySelector('#searchCategories');

try {
    const categoriesServices = await apiCategoryService.getAllCategories();
    //console.log(categoriesServices);
    showDataSelect(categoriesServices, selectCategoriesServices);
    showDataSelect(categoriesServices, searchCategories);

} catch (error) {
    console.error('Erro na requisição:', error);
}

// função para abrir modal
function openModal() {
    modal.style.display = 'flex';
}
// função para fechar modal
function closeModal() {
    modal.style.display = 'none';
}

document.querySelector(".btn-cancel").addEventListener('click', () => {
    closeModal();
});

function renderServices (listServices) {
    servicesContainer.innerHTML = ``;
    listServices.forEach(service => {
        const serviceArticle = document.createElement('article');
        serviceArticle.setAttribute("service-id", service.id);
        serviceArticle.innerHTML = `
                <span data-label="ID">${service.id}</span>
                <span data-label="Name">${service.name}</span>
                <span data-label="Category">${service.category_name}</span>
                <div class="service-actions">
                    <button class="btn btn-edit">Edit</button>
                    <button class="btn btn-delete">Delete</button>
                </div>
        `;
        serviceArticle.classList.add('service-item');
        servicesContainer.appendChild(serviceArticle);
    });
}

try {
    const listServices = await api.getAllServices();
    renderServices(listServices);
} catch (error) {
    console.error('Erro na requisição:', error);
}

// Evento de clique em um botão de edição
servicesContainer.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('btn-edit')) {
        const serviceId = target.parentElement.parentElement.getAttribute('service-id');
        try {
            const service = await api.getServiceById(serviceId);
            console.log(service);
            showDataForm(service);
            openModal();
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }
});

editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(editForm);
    //const data = new URLSearchParams(new FormData(editForm)).toString();
    try {
        const serviceUpdate = await api.updateService(formData);
        //const response = await api.updateService(data);
        showToast(serviceUpdate.message, serviceUpdate.type);
        const serviceArticle = document.querySelector(`article[service-id="${serviceUpdate.data.id}"]`);
        if(serviceUpdate.type == "success"){
            if(searchCategories.value == "all") {
                serviceArticle.querySelector('span[data-label="Name"]').textContent = serviceUpdate.data.name;
                serviceArticle.querySelector('span[data-label="Category"]').textContent = serviceUpdate.data.category_name;
            } else {
                if(searchCategories.value == serviceUpdate.data.service_category_id) {
                    serviceArticle.querySelector('span[data-label="Name"]').textContent = serviceUpdate.data.name;
                    serviceArticle.querySelector('span[data-label="Category"]').textContent = serviceUpdate.data.category_name;
                } else {
                    serviceArticle.remove();
                }
            }
            if(!serviceArticle) {
                // criar uma nova linha na tabela e inserir no topo
                const newServiceArticle = document.createElement('article');
                newServiceArticle.setAttribute("service-id", serviceUpdate.data.id);
                newServiceArticle.innerHTML = `
                    <span data-label="ID">${serviceUpdate.data.id}</span>
                    <span data-label="Name">${serviceUpdate.data.name}</span>
                    <span data-label="Category">${serviceUpdate.data.category_name}</span>
                    <div class="service-actions">
                        <button class="btn btn-edit">Edit</button>
                        <button class="btn btn-delete">Delete</button>
                    </div>
                `;
                newServiceArticle.classList.add('service-item');
                servicesContainer.prepend(newServiceArticle);
            }
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('keyup', async () => {
    if(searchInput.value.length < 3)
    {
        return;
    }

    try {
        const servicesListSearch = await api.getServicesByName({name: searchInput.value});
        renderServices(servicesListSearch);
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

searchCategories.addEventListener("change", async () => {
    let servicesListFilter;

    if(searchCategories.value == "all") {
        servicesListFilter = await api.getAllServices();
    } else {
        servicesListFilter = await api.getServicesByCategory(searchCategories.value);
    }

    renderServices(servicesListFilter);
});