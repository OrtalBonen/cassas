import { AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { SessionService } from '../services/session-service/session.service';

export class israeliIdExistsValidator {
  static createValidator(sessionService: SessionService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return sessionService
        .isIsraeliIdExists(control.value)
        .pipe(
          map((result) =>
            result.israeliIdExist ? { israeliIdExist: true } : null
          )
        )
    }
  }
}
