import HttpClientBase from './HttpClientBase.js';

export class HttpUser extends HttpClientBase {
    constructor() {
        super(`http://localhost:8080/mvc-project-tarde/api/users`);
    }

    async createUser(userData) {
        return this.post('/', userData);
    }

}