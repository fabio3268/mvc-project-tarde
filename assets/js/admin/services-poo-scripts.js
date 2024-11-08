import {
    Service
} from './../classes/Service.js';

const api = new Service();

try {
    const services = await api.getServicesByCategory(2);
    console.log(services);
} catch (error) {
    console.error('Erro na requisição:', error);
}

try {
    const service = await api.getServiceById(1);
    console.log(service);
} catch (error) {
    console.error('Erro na requisição:', error);
}

/*
const formInsertService = document.querySelector('#form-insert-service');

formInsertService.addEventListener('submit', async (event) => {
    event.preventDefault();
    api.setAuthToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MzEwNzA3MjYsImp0aSI6ImhHUExTYjRXbDBKUWJ2STFFR2dCVFE9PSIsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwXC9tdmMtcHJvamVjdC10YXJkZSIsIm5iZiI6MTczMTA3MDcyNiwiZXhwIjoxNzMxMDc2MTI2LCJkYXRhIjp7ImlkIjo0LCJuYW1lIjoiRlx1MDBlMWJpbyBMdVx1MDBlZHMgZGEgU2lsdmEiLCJlbWFpbCI6ImZhYmlvc2FudG9zQGlmc3VsLmVkdS5iciJ9fQ.tgG5EGCf0I4psdryCjBM4ZXb9FDqocY3raxXd_yZb74FLJ3Fj4LyUB6IZvwTBPF5w_d6E0tFMxz3vp39EnTbmA');

    const formDataService = new FormData(formInsertService);

    try {
        const newService = await api.createService(formDataService);
        console.log(newService);
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});
*/
