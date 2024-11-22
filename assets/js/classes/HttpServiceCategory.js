import HttpClientBase from './HttpClientBase.js';

export class HttpServiceCategory extends HttpClientBase {
    constructor() {
        super(`http://localhost:8080/mvc-project-tarde/api/services-categories`);
    }

    async getAllCategories() {
        return this.get('/list');
    }

}