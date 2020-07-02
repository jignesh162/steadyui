import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NiftyOHLCModel } from 'src/app/_models/niftyohlcmodel';

@Injectable({
  providedIn: 'root'
})
export class NiftyOHLCService {

  constructor(private http: HttpClient) {
  }

  getNiftyOHLCs(): Observable<NiftyOHLCModel[]> {
    return this.http.get<NiftyOHLCModel[]>(environment.apiUrl + '/niftyohlc/all');
  }
}
