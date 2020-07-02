import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SteadyError } from '../../_models/steadyerror';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './token-storage.service';
import { Role } from 'src/app/_models/role';

const SEVERITY_ERROR: string = "error";
const SEVERITY_SUCCESS: string = "success";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
  constructor(private messageService: MessageService,
              private translateService: TranslateService,
              private confirmationService: ConfirmationService,
              private tokenService: TokenStorageService) {
  }

  public handleError(error: any): Observable<any> {
    var errorMessage = '';
    if (error instanceof SteadyError) {
        errorMessage = `${error.errorMessage}`;
        if(error.invalidParams) {
          error.invalidParams.forEach(element => {
            errorMessage = `${element.message}`;
            this.messageService.add({severity: SEVERITY_ERROR, detail: errorMessage});
          });
        } else {
          this.messageService.add({severity: SEVERITY_ERROR, detail: errorMessage});
        }

    } else {
      errorMessage = `${error.error.message}`;
      this.messageService.add({severity: SEVERITY_ERROR, detail: errorMessage});
    }
    return throwError(error);
  }

  public showSuccessMessage(messageKey: string) {
    this.getTranslation(messageKey).subscribe(data => {
      this.messageService.add({severity: SEVERITY_SUCCESS, detail: data.detail});
    });
  }

  public showErrorMessage(messageKey: string) {
    this.getTranslation(messageKey).subscribe(data => {
      this.messageService.add({severity: SEVERITY_ERROR, detail: data.detail});
    });
  }

  public getTranslation(key: string): Observable<any> {
    return this.translateService.get(key);
  }

  public getDropdownValues(key: string): Observable<any[]> {
    return this.translateService.get(key);
  }

  public confirmDialog(customData: any) {
    var confirmationMessage: string ;
    var confirmationHeader: string ;
    var confirmationAcceptLabel: string ;
    var confirmationRejectLabel: string ;

    this.getTranslation("confirmation.message").subscribe( data => {
      confirmationMessage = data;
    });
    this.getTranslation("confirmation.header").subscribe( data => {
      confirmationHeader = data;
    });
    this.getTranslation("confirmation.acceptLabel").subscribe( data => {
      confirmationAcceptLabel = data;
    });
    this.getTranslation("confirmation.rejectLabel").subscribe( data => {
      confirmationRejectLabel = data;
    });

    this.confirmationService.confirm({
      message: customData.message != undefined ? customData.message : confirmationMessage,
      header: customData.header != undefined ? customData.header : confirmationHeader,
      icon: customData.icon != undefined ? customData.icon : 'pi pi-info-circle',
      acceptLabel: customData.acceptLabel != undefined ? customData.acceptLabel : confirmationAcceptLabel,
      rejectLabel: customData.rejectLabel != undefined ? customData.rejectLabel : confirmationRejectLabel,
      accept: () => {
        if (customData.hasOwnProperty('accept')) {
          customData.accept();
        }
      },
      reject: () => {
        if (customData.hasOwnProperty('reject')) {
          customData.reject();
        }
      }
    });
  }

  public exportExcel(data: any[], fileName: string) {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  public isAdmin(): boolean {
    return this.tokenService.hasValidRole([Role.Admin]);
  }

  public isUser(): boolean {
    return this.tokenService.hasValidRole([Role.User]);
  }

  public isReadonly(): boolean {
    return this.tokenService.hasValidRole([Role.ReadOnly]);
  }

  public hasValidRole(rolesToCheck: string[]) {
    return this.tokenService.hasValidRole(rolesToCheck);
  }
}
