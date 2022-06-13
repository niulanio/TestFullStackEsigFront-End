import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Tarefa } from './tarefas/tarefa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.urlBase + '/api/tarefas';


  save(tarefa: Tarefa): Observable<Tarefa> {


    let date = new Date(tarefa.dataFinal)
    let formattedDate = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    tarefa.dataFinal = formattedDate
    tarefa.status = 0
    console.log(tarefa)


    return this.http.post<Tarefa>(this.baseUrl, tarefa);
  }
  update(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<any>(this.baseUrl + `/${tarefa.id}`, tarefa);
  }

  findByParams(tarefa: Tarefa): Observable<Tarefa[]> {
    let httpParams
    if (tarefa.prioridade && !tarefa.status) {
      httpParams = new HttpParams()
        .set("titulo", tarefa.titulo ? tarefa.titulo : '')
        .set("id_responsavel", tarefa.responsavel.id)
        .set("prioridade", tarefa.prioridade);

    } else if (tarefa.status && !tarefa.prioridade) {
      httpParams = new HttpParams()
        .set("titulo", tarefa.titulo ? tarefa.titulo : '')
        .set("id_responsavel", tarefa.responsavel.id)
        .set("status", tarefa.status);
    } else if (tarefa.status && tarefa.prioridade) {
      httpParams = new HttpParams()
        .set("titulo", tarefa.titulo ? tarefa.titulo : '')
        .set("id_responsavel", tarefa.responsavel.id)
        .set("prioridade", tarefa.prioridade)
        .set("status", tarefa.status);
    } if (!tarefa.status && !tarefa.prioridade) {
      httpParams = new HttpParams()
        .set("titulo",tarefa.titulo ? tarefa.titulo : '')
        .set("id_responsavel", tarefa.responsavel.id)

    }
    const url = this.baseUrl + "/tarefaAvancada/" + "?" + httpParams;
    return this.http.get<any>(url);

  }

  findAllTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.baseUrl);
  }

  findById(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(this.baseUrl + `/${id}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${id}`);
  }

}
