import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {reject} from "q";
import {setTimeout} from "timers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbidenUsernames= ['omar', 'chaimae'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbidenNames.bind(this)]),
        'email' : new FormControl(null, [Validators.required, Validators.email], this.forbidenEmails)
      }),

     'gender' : new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.signupForm.valueChanges.subscribe(
      (value) =>{
        console.log(value);
      }
    );
    this.signupForm.statusChanges.subscribe(
      (value) =>{
        console.log(value);
      }
    );

  }

  onSubmit(){
    console.log(this.signupForm);
  }
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  forbidenNames(control: FormControl): {[s: string]: boolean}{
    if(this.forbidenUsernames.indexOf(control.value) !=-1){
      return{
        'nameIsForbiden': true};
    }return null;
  }

  forbidenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) =>{
      setTimeout(() => {
        if (control.value === 'omar.benaissa@outlook.com') {
          resolve({'Email is Forbiden': true});
        } else {
          resolve(null);
        }
      } , 4000);
    });
    return promise;
  }

}
