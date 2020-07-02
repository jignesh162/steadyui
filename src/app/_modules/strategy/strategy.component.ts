import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { CommonService } from '../../_services/common/common.service';
import { StrategyService } from 'src/app/_services/strategy/strategy.service';
import { StrategyResponseModel } from 'src/app/_models/strategyresponsemodel';
import { OverlayPanel } from 'primeng/overlaypanel';
import { OptionsTickGraphLineModel } from 'src/app/_models/optiontickgraph';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  providers: [ ConfirmationService, CommonService ],
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {
  isReadonly: boolean;
  isAdmin: boolean;
  isUser: boolean;
  strategyColumns: any[];
  quantityOrPriceItems: SelectItem[];
  strategyForm: FormGroup;
  strategyData: StrategyResponseModel[] = [];
  globalFilterFields: string[];
  selectedStrategyResponseModel: StrategyResponseModel;
  //Graph
  view: any[] = [1600, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price';
  timeline: boolean = true;
  autoScale: boolean = true;

  chartData: any = [
      {
        name: 'CE',
        series: []
      },
      {
        name: 'PE',
        series: []
      }
    ];

  colorScheme = {
    domain: ['#5AA454', '#E44D25']
  };

  constructor(private strategyService: StrategyService,
              private fb: FormBuilder,
              private commonService: CommonService) {
    // strategy Ui form validation
    this.strategyForm = this.fb.group({
      entryDateTime: new FormControl(''),
      exitDateTime: new FormControl(''),
      stopLossPercentage: new FormControl(''),
      profitBookPercentage: new FormControl(''),
      initialAmount: new FormControl(''),
      quantityOrPrice: new FormControl(''),
      strikeAwayPoints: new FormControl('')
    });

    this.globalFilterFields = [
      'entryDateTime',
      'exitDateTime'
    ];

    this.strategyColumns = [
      { field: 'blank', type: 'strategyInputPanel', translationKey: 'strategy.columns.strategyInput.tooltip', priorityClass:'ui-p-1', widthPercentage:'2%', icon:'pi pi-directions'},
      { field: 'initialAmount', type: 'currency', translationKey: 'strategy.columns.initialAmount', priorityClass:'ui-p-1', widthPercentage:'7%'},

      { field: 'blank', type: 'buyDetailsPanel', translationKey: 'strategy.columns.buyDetails.tooltip', priorityClass:'ui-p-1', widthPercentage:'2%', icon:'pi pi-info-circle'},
      { field: 'combined', type: 'combined', dateField: 'buyDateTime', perField: 'buyPercentage',
       amountField: 'buyAmount', translationKey: 'strategy.columns.buy', priorityClass:'ui-p-1', widthPercentage:'16%'},

      { field: 'combined', type: 'combined', dateField: 'sellDateTime', perField: 'sellPercentage',
       amountField: 'sellAmount', translationKey: 'strategy.columns.sell', priorityClass:'ui-p-1', widthPercentage:'16%'},
      { field: 'blank', type: 'sellDetailsPanel', translationKey: 'strategy.columns.sellDetails.tooltip', priorityClass:'ui-p-1', widthPercentage:'2%', icon:'pi pi-info-circle'},

      { field: 'combined', type: 'combined', dateField: 'highestAmountDateTime', perField: 'highestPercentage',
       amountField: 'highestAmountGoesTo', translationKey: 'strategy.columns.highest', priorityClass:'ui-p-1', widthPercentage:'16%'},
      { field: 'combined', type: 'combined', dateField: 'lowestAmountDateTime', perField: 'lowestPercentage',
       amountField: 'lowestAmountGoesTo', translationKey: 'strategy.columns.lowest', priorityClass:'ui-p-1', widthPercentage:'16%'},

       { field: 'combined', type: 'combined', dateField: 'profitOrLossDateTime', perField: 'profitOrLossPercentage',
       amountField: 'profitOrLossAmount', translationKey: 'strategy.columns.profitOrLoss', priorityClass:'ui-p-1', widthPercentage:'16%'},

      { field: 'deInvestmentAmount', type: 'currency', translationKey: 'strategy.columns.deInvestmentAmount', priorityClass:'ui-p-1', widthPercentage:'7%'},
      { field: 'balanceAmount', type: 'currency', translationKey: 'strategy.columns.balanceAmount', priorityClass:'ui-p-1', widthPercentage:'7%'}
    ];
  }

  ngOnInit() {
    this.isAdmin = this.commonService.isAdmin();
    this.isReadonly = this.commonService.isReadonly();
    this.isUser = this.commonService.isUser();

    this.commonService.getDropdownValues("dropdownLists.quantityOrPriceItems").subscribe(data => {
      this.quantityOrPriceItems = data;
    },
    error => {
      this.commonService.handleError(error);
    });

    this.setDefaultStrategyFormValues();
  }

  setDefaultStrategyFormValues() {
    this.strategyForm.get('entryDateTime').setValue('2018-01-01 09:15:20');
    this.strategyForm.get('exitDateTime').setValue('2018-01-01 15:29:20');
    this.strategyForm.get('stopLossPercentage').setValue(4);
    this.strategyForm.get('profitBookPercentage').setValue(3);
    this.strategyForm.get('initialAmount').setValue(100000);
    this.strategyForm.get('quantityOrPrice').setValue('price');
    this.strategyForm.get('strikeAwayPoints').setValue(0);
  }

  // convenience getter for easy access to form fields
  get f() { return this.strategyForm.controls; }

  runStrategy() {
    this.strategyService.runStrategy(this.strategyForm.value).subscribe( data => {
      this.strategyData.unshift(data);
      this.convertAndAssignToChartData(data.optionsTickGraph.optionsTickGraphLineList);
    },
    error => {
      this.commonService.handleError(error);
    });

  }

  exportExcel() {
    this.commonService.exportExcel(this.strategyData, "Strategy");
  }

  showSystemTableDataInOverlay(event, strategyResponseModel: StrategyResponseModel, overlaypanel: OverlayPanel) {
    this.selectedStrategyResponseModel = strategyResponseModel;
    overlaypanel.toggle(event);
  }

  convertAndAssignToChartData(optionsTickGraphLineList: OptionsTickGraphLineModel[]) {
    this.chartData = [
      {
        name: 'CE',
        series: []
      },
      {
        name: 'PE',
        series: []
      }
    ];
    let dateToShow;
    optionsTickGraphLineList[0].series.map((optionsTickGraphLine) => {
      dateToShow = new Date(optionsTickGraphLine.name);
      this.chartData[0].name = optionsTickGraphLineList[0].name;
      this.chartData[0].series.push({ name: dateToShow, value: optionsTickGraphLine.value });
    });

    optionsTickGraphLineList[1].series.map((optionsTickGraphLine) => {
      dateToShow = new Date(optionsTickGraphLine.name);
      this.chartData[1].name = optionsTickGraphLineList[1].name;
      this.chartData[1].series.push({ name: dateToShow, value: optionsTickGraphLine.value });
    });
    this.chartData = [...this.chartData];
  }
}
