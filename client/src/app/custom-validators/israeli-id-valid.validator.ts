import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isIsraeliIdValid } from '../utills';

export function createIdValidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value
    const isIdvalid = isIsraeliIdValid(value)
    return !isIdvalid ? { israeliId: true } : null
  }
}
