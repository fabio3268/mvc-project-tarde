import HttpClientBase from './HttpClientBase.js';

// Exemplo de classe concreta implementando a base
export class HttpService extends HttpClientBase {
    constructor() {
        super(`http://localhost:8080/mvc-project-tarde/api/services`);
    }

    // Métodos específicos da API
    async getServiceById(serviceId) {
        return this.get('/service/:id', { id: serviceId });
    }

    async getServicesByName(serviceName) {
        //console.log()
        return this.get(`/list-by-name/name/:name`,serviceName);
    }

    async getServicesByCategory(category_id) {
        return this.get('/list-by-category/category/:id', {id: category_id});
    }

    async createService(serviceData) {
        return this.post('/service', serviceData);
    }

    async getAllServices() {
        return this.get('/list');
    }

    async updateService(serviceData) {
        return this.put(`/service`, serviceData);
    }

    /*

    async deleteService(serviceId) {
        return this.delete(`/services/${serviceId}`);
    }

    // Exemplo com FormData
    async uploadServiceImage(serviceId, imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        return this.post(`/services/${serviceId}/image`, formData);
    }*/
}