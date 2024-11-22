import {
    showDataForm, showDataSelect
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
        serviceArticle.innerHTML = `
                <span data-label="ID">${service.id}</span>
                <span data-label="Name">${service.name}</span>
                <span data-label="Category">${service.category}</span>
                <div class="service-actions">
                    <button service-id="${service.id}" class="btn btn-edit">Edit</button>
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
        const serviceId = target.getAttribute('service-id');
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
    //console.log(data);
    try {
        const response = await api.updateService(formData);
        //const response = await api.updateService(data);
        console.log(response);
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