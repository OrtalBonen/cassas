import { AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { SessionService } from '../services/session-service/session.service';

export class emailExistsValidator {
  static createValidator(sessionService: SessionService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return sessionService
        .isEmailExists(control.value)
        .pipe(
          map((result) =>
            result.emailExist ? { emailExists: true } : null
          )
        )
    }
  }
}
