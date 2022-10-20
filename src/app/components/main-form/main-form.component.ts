import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { postCodeValidator } from './postCode.validator';
import { UserdataService } from '../../services/userdata.service';
import { HttpClient } from '@angular/common/http'

import { Roomex } from '../../models/roomexForm.model';
import { Movie } from '../../models/movie.model';

import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const BASE_URL = `http://www.omdbapi.com/?apikey=`
const API_KEY = 83513884

@Component({
	selector: 'app-main-form',
	templateUrl: './main-form.component.html',
	styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
	myForm: FormGroup;
	countryOptions: string[] = ['Ireland', 'United Kingdom'];

	// Autocomplete
	favMovieCtrl = new FormControl();
	filteredMovies: Movie [] = [];
	isLoading = false;
	errorMsg!: string;
	minLengthTerm = 3;


	constructor(
		private fb: FormBuilder,
		private dataService: UserdataService,
		private postCodeValidator: postCodeValidator,
		private http: HttpClient
	) { }

	onSelected(e) {
    this.favMovieCtrl.setValue(e.option.value);
  }

  displayWith(value: any) {
    return value?.Title;
  }

  clearSelection() {
    this.favMovieCtrl.setValue('');
    this.filteredMovies = [];
  }


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
		this.setUpMovieSearch();
	}

	// Getters to simplify HTML template
	get name() { return this.myForm.get('name'); }
	get userName() { return this.myForm.get('userName'); }
	get country() { return this.myForm.get('country'); }
	get postCode() { return this.myForm.get('postCode'); }
	get favMovie() { return this.favMovieCtrl.value; }


	setUpMovieSearch() {
		this.favMovieCtrl.valueChanges
			.pipe(
				filter(res => {
					return res !== null && res.length >= this.minLengthTerm
				}),
				distinctUntilChanged(),// Prevents duplicate calls
				debounceTime(500), // Wait 500ms after last keystroke before considering the term
				tap(() => {
					this.errorMsg = "";
					this.isLoading = true;
					this.filteredMovies = [];
				}),
				switchMap(value => this.http.get(`${BASE_URL}${API_KEY}&s=${value}`)
					.pipe(
						map((movieData: any) => {
							// Normalize data from API to match Movie interface
							return {
								error: movieData.Error,
								movies: movieData['Search']?.map(movie => {
									return {
										title: movie['Title'],
										year: movie['Year'],
										id: movie['imdbID'],
										type: movie['Type'],
										poster: movie['Poster']
									}
								})
							}
						 }),
						finalize(() => {
							this.isLoading = false
						}),
					))
			)
			.subscribe((normalizedData: any) => {
				// console.log(this.filteredMovies);
				if (normalizedData.error) {
					this.errorMsg = normalizedData.error;
					this.filteredMovies = [];
				} else {
					this.errorMsg = "";
					this.filteredMovies = [...normalizedData.movies];
				}
				// console.log(this.filteredMovies);
			});
	}

	submitForm(): Roomex | void {
		if (this.myForm.invalid) {
			console.error('Form is invalid');
			return
		}
		this.myForm.patchValue({
			favMovie: this.favMovieCtrl.value
		})
		this.dataService.setUserData(this.myForm.value);
	}
}
