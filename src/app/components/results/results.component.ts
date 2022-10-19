import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Roomex } from 'src/app/models/roomexForm.model';
import { UserdataService } from '../../services/userdata.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
	storedData: any;
	private dataUpdateSub: Subscription

	constructor(
		private dataService: UserdataService
	) { }

	ngOnInit(): void {
		this.dataUpdateSub = this.dataService.getUpdatedUserData()
			.subscribe(data => {
				this.storedData = data;
			})
	}

	ngOnDestroy() {
		this.dataUpdateSub.unsubscribe();
	}
}
