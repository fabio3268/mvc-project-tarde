import {
    Service
} from './../classes/Service.js';

const api = new Service();

try {
    const products = await api.getProductsByCategory(2);
    console.log(products);
} catch (error) {
    console.error('Erro na requisição:', error);
}

try {
    const product = await api.getServiceById(1);
    console.log(product);
} catch (error) {
    console.error('Erro na requisição:', error);
}