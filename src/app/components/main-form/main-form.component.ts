import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
	myForm: FormGroup;
	countryOptions: string[] = ['Ireland', 'United Kingdom'];
	movieList: string[] = ['Episode 1', 'Episode 2', 'The return of the Jedi']
  constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
		this.myForm = this.fb.group({
			name: ['',
				Validators.required,
				Validators.pattern('^[a-zA-Z \-\']+')],
			userName: ['', Validators.email],
			country: [''],
			postCode: [''],
			favMovie: ''
		});
  }

}
