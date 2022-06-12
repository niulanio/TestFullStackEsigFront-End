import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Responsavel } from './responsaveis/responsavel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsaveisService {

  constructor(private http: HttpClient) { }

  baseUrl =environment.urlBase + '/api/responsavel';


  save(responsavel: Responsavel): Observable<Responsavel>{
    return this.http.post<Responsavel>(this.baseUrl,responsavel);
  }
  update(responsavel: Responsavel): Observable<Responsavel>{
    return this.http.put<any>(this.baseUrl+`/${responsavel.id}`,responsavel);
  }

  findAllResponsaveis() : Observable<Responsavel[]>{
    
    return this.http.get<Responsavel[]>(this.baseUrl);
  }

  findById(id:number) : Observable<Responsavel>{
    return this.http.get<Responsavel>(this.baseUrl+`/${id}`);
  }

  deleteById(id:number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl+`/${id}`);
  }

}
