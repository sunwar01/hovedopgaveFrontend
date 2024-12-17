import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable
({
    providedIn: 'root'
})


export class CaseProductService
{

    private baseUrl = 'http://localhost:5257/API/CaseProducts/';

    constructor(private http: HttpClient)
    {

    }

    createCaseProduct(caseProduct: any): Observable<any>
    {
        console.log(" payload" + caseProduct);
        return this.http.post(this.baseUrl + 'CreateCaseProducts', caseProduct);
    }

    getCaseProduct(id: number): Observable<any>
    {
        return this.http.get(this.baseUrl + 'GetCaseProducts/' + id);
    }

    getCaseProducts(): Observable<any>
    {
        return this.http.get(this.baseUrl + 'GetCaseProducts');
    }

    removeCaseProduct(id: number): Observable<any>
    {
        return this.http.delete(this.baseUrl + 'DeleteCaseProducts/' + id);
    }








}
