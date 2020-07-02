import { Component, OnInit, OnChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from '../../_services/common/token-storage.service';
import { Menuitemmodel } from 'src/app/_models/menuitemmodel';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  isLoggedIn = false;
  username: string;
  environmentName: string;

  constructor(private translate: TranslateService, private titleService: Title, private tokenStorageService: TokenStorageService ) {
    translate.addLangs(['en', 'fi']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fi/) ? browserLang : 'en');
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit(): void {
    this.translate.get('topMenuBar').subscribe((res: any) => {
      this.items = this.processMenuItems(res);
    });

    this.translate.get('app.title').subscribe((res: string) => {
      this.setTitle(res);
    });

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn) {
      const user: any = this.tokenStorageService.getUser();
      this.username = user.username;
    }

    this.environmentName = environment.environmentName;
  }

  private processMenuItems(res: any) {
    var processedMenuItems: MenuItem[] = [];
    var menuItems: Menuitemmodel[] = res;
    menuItems.forEach(menuItem => {      
      menuItem.visible = this.tokenStorageService.hasValidRole(menuItem.roles);
      processedMenuItems.push(menuItem);
    });
    return processedMenuItems;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
  