import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StrategyResponseModel } from 'src/app/_models/strategyresponsemodel';
import { StrategyRequestModel } from 'src/app/_models/strategyrequestmodel';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {

  constructor(private http: HttpClient) {
  }

  runStrategy(requestModel: StrategyRequestModel): Observable<StrategyResponseModel> {
    return this.http.post<StrategyResponseModel>(environment.apiUrl + '/strategies/runStratagegy', requestModel);
  }
}
