import { AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { SessionService } from '../services/session-service/session.service';


export class isDeliveryDateConfirmedValidator {
  static createValidator(sessionService: SessionService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return sessionService
        .confirmDeliveryDate(control.value)
        .pipe(
          map((result) =>
            !result.isDateValid ? { isDateConfirmed: true } : null
          )
        )
    }
  }
}


