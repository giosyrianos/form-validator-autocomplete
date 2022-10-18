import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class postCodeValidator {

  public checkUKvalidity(): ValidatorFn {
		return (formGroup: FormGroup) => {
			const country = formGroup.get('country');
			if (country.value === 'Ireland' || country.value === '') {
      return null;
			} else {
				const postCode = formGroup.get('postCode');
				const pattern = new RegExp("^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$");
				if (!postCode.value || !pattern.test(postCode.value)) {
					return postCode.value ? { falsePostCode: true } : { emptyPostCode: true };
				} else {
					return null;
				}
			}
    };
  }
}
