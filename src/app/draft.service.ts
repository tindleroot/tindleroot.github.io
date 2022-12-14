import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Draft, DraftPick, DraftTeam } from './data';

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  // private baseUrl: string = 'http://127.0.0.1:5000/api/v1';
  private baseUrl: string = 'https://fantasy-first-bot.herokuapp.com/api/v1';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getDraft(id: number): Observable<Draft> {
    return this.http.get<Draft>(`${this.baseUrl}/draft/${id}`)
    .pipe(
      tap(_ => this.log('fetched draft')),
      catchError(this.handleError<Draft>('getDraft', null))
    );
  }

  getDrafts(league_id: number): Observable<Draft[]> {
    return this.http.get<Draft[]>(`${this.baseUrl}/league/${league_id}/drafts`)
    .pipe(
      tap(_ => this.log('fetched drafts')),
      catchError(this.handleError<Draft[]>('getDraft', []))
    );
  }

  getDraftPicks(id: number): Observable<DraftPick[]> {
    return this.http.get<DraftPick[]>(`${this.baseUrl}/draft/${id}/picks`)
    .pipe(
      tap(_ => this.log('fetched draft_picks')),
      catchError(this.handleError<DraftPick[]>('getDraftPicks', []))
    );
  }

  getDraftTeams(id: number): Observable<DraftTeam[]> {
    return this.http.get<DraftTeam[]>(`${this.baseUrl}/draft/${id}/teams`)
    .pipe(
      tap(_ => this.log('fetched draft_picks')),
      catchError(this.handleError<DraftTeam[]>('getDraftPicks', []))
    );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
    console.info(`HeroService: ${message}`)
  }
}
