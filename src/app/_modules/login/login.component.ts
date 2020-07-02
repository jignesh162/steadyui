import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/common/auth.service';
import { TokenStorageService } from '../../_services/common/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    isLoggedIn = false;
    loginErrorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private tokenStorageService: TokenStorageService,
        private translateService: TranslateService
    ) {
        // redirect to home if already logged in
        if (this.tokenStorageService.getUser()) { 
            this.router.navigate(['/']);
        }

        this.translateService.addLangs(['en', 'fi']);
        this.translateService.setDefaultLang('en');

        const browserLang = this.translateService.getBrowserLang();
        this.translateService.use(browserLang.match(/en|fi/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)]))
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.tokenStorageService.saveToken(data.token);
                    this.tokenStorageService.saveUser(data);
                    this.isLoggedIn = true;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loginErrorMessage = error.errorMessage;
                });
    }
}
