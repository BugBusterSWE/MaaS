import * as request from "superagent";

class CompanyAPIs {

    getCompaniesData(token : string) : Promise<Object> {

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

    getCompaniesMembers(company_id : string, token : string) : Promise<Object> {

        return new Promise(function (resolve, reject) {
            request
                .get('http://127.0.0.1:3000/api/companies/'+company_id+'/users')
                .set('x-access-token', token)
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

    addNewMember(company_id : string, token : string, memberData : Object) : Promise<Object> {
        return new Promise(function(resolve, reject) {
            request.post('http://127.0.0.1:3000/api/companies/'+company_id+'/users')
                .send(memberData)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
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
    
    addCompany(user, company) : Promise<Object> {
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

let companyAPIs : CompanyAPIs = new CompanyAPIs();
export default companyAPIs;

