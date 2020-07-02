import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { FocusTrapModule } from 'primeng/focustrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoginComponent } from './_modules/login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MenuComponent } from './_modules/menu/menu.component';
import { LoaderComponent } from './_modules/loader/loader.component';
import { LoaderService } from './_services/common/loader.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { loaderInterceptorProviders } from './_helpers/loader.interceptor';
import { CommonService } from './_services/common/common.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NiftyohlcComponent } from './_modules/niftyohlc/niftyohlc.component';
import { StrategyComponent } from './_modules/strategy/strategy.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    LoaderComponent,
    NiftyohlcComponent,
    StrategyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    MenubarModule,
    CalendarModule,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
    TooltipModule,
    FocusTrapModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    SelectButtonModule,
    InputSwitchModule,
    TabViewModule,
    AutoCompleteModule,
    PasswordModule,
    CheckboxModule,
    OverlayPanelModule,
    NgxChartsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [MessageService, authInterceptorProviders, LoaderService, loaderInterceptorProviders, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
