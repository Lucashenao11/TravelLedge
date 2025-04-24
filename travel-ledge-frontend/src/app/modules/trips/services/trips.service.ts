import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Para crear Observables
import { map, catchError, delay } from 'rxjs/operators'; // Operadores comunes

@Injectable({
    providedIn: 'root'
  })
  export class TripsService {
    private mockTrips = [
      {
        id: 1,
        name: 'Aventura en los Alpes',
        destination: 'Suiza',
        startDate: '2023-06-15',
        endDate: '2023-06-22',
        description: 'Escalada y senderismo en los Alpes suizos'
      },
      {
        id: 2,
        name: 'Playas del Caribe',
        destination: 'República Dominicana',
        startDate: '2023-08-01',
        endDate: '2023-08-08',
        description: 'Relax en Punta Cana'
      }
    ];
  
    getTrips(): Observable<any[]> {
      // Cambiar luego por this.http.get('api/trips')
      return of(this.mockTrips).pipe(delay(500)); // Simula llamada API
    }
  }