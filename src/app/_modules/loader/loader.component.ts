import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../_services/common/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading:  Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService){}
}