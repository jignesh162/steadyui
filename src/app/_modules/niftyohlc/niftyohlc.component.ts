import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CommonService } from '../../_services/common/common.service';
import { NiftyOHLCModel } from 'src/app/_models/niftyohlcmodel';
import { NiftyOHLCService } from 'src/app/_services/nifty/niftyohlc.service';

const FOCUS_FIELD_ID: string = "focusField";

@Component({
  selector: 'app-niftyohlc',
  templateUrl: './niftyohlc.component.html',
  providers: [ ConfirmationService, CommonService ],
  styleUrls: ['./niftyohlc.component.css']
})
export class NiftyohlcComponent implements OnInit {
  isReadonly: boolean;
  isAdmin: boolean;
  isUser: boolean;
  niftyohlcs: NiftyOHLCModel[];
  niftyohlcColumns: any[];
  newniftyohlc: boolean;
  isniftyohlcDialogVisible: boolean;
  niftyohlcform: FormGroup;
  @ViewChild(FOCUS_FIELD_ID, {static: false}) focusField: ElementRef;

  constructor(private niftyOHLCService: NiftyOHLCService,
              private fb: FormBuilder,
              private commonService: CommonService) {
    // niftyohlcs Ui form validation
    this.niftyohlcform = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      active: new FormControl(true, Validators.required)
    });

    // Columns meta data
    this.niftyohlcColumns = [
      { field: 'type', type: 'string', translationKey: 'niftyohlc.type', priorityClass:'ui-p-1' },
      { field: 'startDate', type: 'date', translationKey: 'niftyohlc.startDate', priorityClass:'ui-p-1' },
      { field: 'endDate', type: 'date', translationKey: 'niftyohlc.endDate', priorityClass:'ui-p-1' },
      { field: 'open', type: 'string', translationKey: 'niftyohlc.open', priorityClass:'ui-p-1' },
      { field: 'high', type: 'string', translationKey: 'niftyohlc.high', priorityClass:'ui-p-4' },
      { field: 'highTime', type: 'time', translationKey: 'niftyohlc.highTime', priorityClass:'ui-p-1' },
      { field: 'low', type: 'string', translationKey: 'niftyohlc.low', priorityClass:'ui-p-1' },
      { field: 'lowTime', type: 'time', translationKey: 'niftyohlc.lowTime', priorityClass:'ui-p-1' },
      { field: 'close', type: 'string', translationKey: 'niftyohlc.close', priorityClass:'ui-p-4' },
      { field: 'up', type: 'string', translationKey: 'niftyohlc.up', priorityClass:'ui-p-1' },
      { field: 'down', type: 'string', translationKey: 'niftyohlc.down', priorityClass:'ui-p-1' }
    ];

  }

  ngOnInit() {
    this.isAdmin = this.commonService.isAdmin();
    this.isReadonly = this.commonService.isReadonly();
    this.isUser = this.commonService.isUser();
    this.niftyOHLCService.getNiftyOHLCs().subscribe( data => {
      this.niftyohlcs = data;
    },
    error => {
      this.commonService.handleError(error);
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.niftyohlcform.controls; }

  exportExcel() {
    this.commonService.exportExcel(this.niftyohlcs, "niftyohlcs");
  }
}
