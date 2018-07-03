import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ListService {
    constructor(private _http: HttpClient) { }
    list(id: number, search?: string ): Observable<any> {
        if ( search ){
            return this._http.get(`${environment.url}/api/categories/${id}/lists`, {
                params: {
                    search: search
                }
            });
        } else {
            return this._http.get(`${environment.url}/api/categories/${id}/lists`);
        }
    }

    create(id:string, name: string): Observable<any> {
        return this._http.post(`${environment.url}/api/categories/${id}/lists`, {
            name: name
        });
    }

    edit(id: string, list_id: string, name: string): Observable<any> {
        return this._http.put(`${environment.url}/api/categories/${id}/lists/${list_id}`, {
            name: name
        });
    }

    delete(id: string, list_id: string): Observable<any>{
        return this._http.delete(`${environment.url}/api/categories/${id}/lists/${list_id}`);
    }

    getText(id: string){
        return this._http.get(`${environment.url}/api/categories/${id}/lists/${id}/text`);
    }

    saveText(id: string, text: string, tags: string[] = []){
        return this._http.put(`${environment.url}/api/categories/${id}/lists/${id}/text`, {
            doc: {
                text: text,
                tag: tags
            }
        });
    }

}
