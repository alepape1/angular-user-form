import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './_helpers/must-match.validator';





@Component({
    selector: 'app',
    templateUrl: 'app.component.html',})


export class AppComponent implements OnInit {

    SERVER_URL = "http://localhost:3000/addUsers";
    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private http: HttpClient) { };


    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            title: ['', Validators.required],
            userName:['', [Validators.required, Validators.maxLength(10)]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!!  hi :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
        this.http.post<any>(this.SERVER_URL,this.registerForm.value).subscribe(
            (res) => console.log(res),
            (err) => console.log(err)
        );
        //console.log(FormGroup)
    }

    onReset() {

        this.submitted = false;
        this.registerForm.reset();
    }
}
