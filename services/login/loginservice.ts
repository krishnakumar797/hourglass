import fetch from 'isomorphic-unfetch'

export default class LoginService {

    constructor() {}

    login(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(r => {
                resolve(r.json());
            }).catch(err => {
                reject(err);
            });
        });
    }
}