import HttpClientBase from './HttpClientBase.js';

// Exemplo de classe concreta implementando a base
export class Service extends HttpClientBase {
    constructor() {
        super(`http://localhost:8080/mvc-project-tarde/api/`);
    }

    // Métodos específicos da API
    async getServiceById(productId) {
        return this.get('/services/service/:id', { id: productId });
    }

    async getProductsByCategory(category_id) {
        return this.get('/services/list-by-category/category/:id', {id: category_id});
    }

    async createProduct(productData) {
        return this.post('/products', productData);
    }

    async updateProduct(productId, productData) {
        return this.put(`/products/${productId}`, productData);
    }

    async deleteProduct(productId) {
        return this.delete(`/products/${productId}`);
    }

    // Exemplo com FormData
    async uploadProductImage(productId, imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        return this.post(`/products/${productId}/image`, formData);
    }
}