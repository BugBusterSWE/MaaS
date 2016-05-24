import * as request from "superagent";

class CompanyAPIs {

    companiesData : Array<Object> = [
        {
            id: "5322b62f33ab349012bb5c1",
            name: "BugBusters",
            owner: "Matteo Di Pirro"
        },
        {
            id: "5322b62f33ab349012bb5c2",
            name: "SteakHolders",
            owner: "Luca De Franceschi"
        },
        {
            id: "24W4Q8y2435430934r23",
            name: "Red Babel",
            owner: "Alessandro Maccagnan"
        }
    ];

    companiesMembers : Array<Object> = [
        {
            id: "5322b62f33ab3490sdbb5c1",
            name: "Matteo Di Pirro",
            email: "matteo@gmail.com"
        },
        {
            id: "5322b62f33ab34901hjb5c2",
            name: "Davide Rigoni",
            email: "davide@gmail.com"
        },
        {
            id: "5322b62f33ab349yu2bb5c3",
            name: "Emanuele Carraro",
            email: "emanuele@gmail.com"
        }
    ];

    getCompaniesData(token : string) : Promise {

        let companiesData : Array<Object> = this.companiesData;

        return new Promise(function (resolve, reject) {
            request
                .get('http://127.0.0.1:3000/api/admin/companies')
                .set('Content-Type', 'application/json')
                //.set('x-access-token', token)
                .end(function(error, result) {
                    if(result) {
                        resolve(result.body);
                    } else {
                        reject(error);
                    }
                });
            // Ritorno dei dati per mochup
        });
    }

    getCompaniesMembers(company_id, token : String) : Promise {

        let companiesMembers : Array<Object> = this.companiesMembers;

        return new Promise(function (resolve, reject) {
            request
                .get('http://127.0.0.1:3000/api/users')
                //.get('http://127.0.0.1:3000/api/companies/'+company_id+'/users')
                //.set('x-access-token', token)
                .end(function(error, result) {
                    var data = result.body;
                    if(data) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                });
        });
    }

    addNewMember(company_id, memberData : Object) : Promise {
        return new Promise(function(resolve, reject) {
            request.post('http://127.0.0.1:3000/api/companies/'+company_id+'/users')
                .send(memberData)
            .set('Accept', 'application/json')
            //.set('x-access-token', token)
            .end(function(error, data){

                if (data) {
                    if (data.error) {
                        reject(error);
                    } else {
                        resolve(data.body);
                    }
                }
            });
        });
    }
    
    addCompany(user, company) {
        return new Promise(function(resolve, reject) {
            request
                .post('http://127.0.0.1:3000/api/admin/companies')
                .send({user, company})
                .end(function(error, data) {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
        })
    }
}

export let companyAPIs : CompanyAPIs = new CompanyAPIs();

