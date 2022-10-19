import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { MainFormComponent } from './main-form.component';

describe('MainFormComponent', () => {
  let component: MainFormComponent;
	let fixture: ComponentFixture<MainFormComponent>;
	let de: DebugElement ;

  beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				FormsModule
			],
      declarations: [ MainFormComponent ]
    })
    .compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MainFormComponent);
		component = fixture.componentInstance;
		de = fixture.debugElement;

    fixture.detectChanges();
	})

  it('should create form component', () => {
    expect(component).toBeTruthy();
  });
});
