import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { postCodeValidator } from './postCode.validator';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
	myForm: FormGroup;
	countryOptions: string[] = ['Ireland', 'United Kingdom'];
	movieList: string[] = ['Episode 1', 'Episode 2', 'The return of the Jedi']
  constructor(private fb: FormBuilder, private postCodeValidator: postCodeValidator) { }

	ngOnInit(): void {
		this.myForm = this.fb.group({
			name: ['',
				[Validators.required,
				Validators.pattern('^[a-zA-Z \-\']+')]],
			userName: ['', Validators.email],
			country: ['', Validators.required],
			postCode: [''],
			favMovie: ''
		}, {
			validators: [this.postCodeValidator.checkUKvalidity()],
			updateOn: 'blur'
		});
  }

	// Getters to simplify HTML template
	get name() { return this.myForm.get('name'); }
	get userName() { return this.myForm.get('userName'); }
	get country () { return this.myForm.get('country'); }
	get postCode() { return this.myForm.get('postCode'); }
	get favMovie() { return this.myForm.get('favMovie'); }

	submitForm() {
		console.log(this.myForm);
	}
}
