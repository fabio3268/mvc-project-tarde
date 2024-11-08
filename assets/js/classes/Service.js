import HttpClientBase from './HttpClientBase.js';

// Exemplo de classe concreta implementando a base
export class Service extends HttpClientBase {
    constructor() {
        super(`http://localhost:8080/mvc-project-tarde/api/services`);
    }

    // Métodos específicos da API
    async getServiceById(productId) {
        return this.get('/service/:id', { id: productId });
    }

    async getServicesByCategory(category_id) {
        return this.get('/list-by-category/category/:id', {id: category_id});
    }

    async createService(serviceData) {
        return this.post('/service', serviceData);
    }

    async updateService(productId, productData) {
        return this.put(`/products/${productId}`, productData);
    }

    async deleteService(productId) {
        return this.delete(`/products/${productId}`);
    }

    // Exemplo com FormData
    async uploadServiceImage(productId, imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        return this.post(`/products/${productId}/image`, formData);
    }
}