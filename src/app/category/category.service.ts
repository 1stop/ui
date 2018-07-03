import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {
    constructor(private _http: HttpClient) { }
    list(search?: string): Observable<any> {
        console.log('list');
        if ( search ){
            return this._http.get(`${environment.url}/api/categories`, {
                params: {
                    search: search
                }
            });
        } else {
            return this._http.get(`${environment.url}/api/categories?namespace=1`);
            //return this._http.get(`${environment.url}/api/categories`);
        }
    }

    create(name: string): Observable<any> {
        return this._http.post(`${environment.url}/api/categories/`, {
            name: name
        });
    }

    edit(id: string, name: string): Observable<any> {
        return this._http.put(`${environment.url}/api/categories/${id}`, {
            name: name
        });
    }

    delete(id: string): Observable<any>{
        return this._http.delete(`${environment.url}/api/categories/${id}`);
    }
}
