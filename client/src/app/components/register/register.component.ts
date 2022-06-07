import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPasswordValidator } from 'src/app/custom-validators/confirm-password.validator';
import { emailExistsValidator } from 'src/app/custom-validators/email-exists.validator';
import { israeliIdExistsValidator } from 'src/app/custom-validators/israeli-id-exists-validator';
import { createIdValidValidator } from 'src/app/custom-validators/israeli-id-valid.validator';
import { city } from 'src/app/models/city.model';
import { validatorMessages } from 'src/app/models/validator-massages'
import { SessionService } from 'src/app/services/session-service/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cities: city[] = []
  selected = ""
  validatorMessages = validatorMessages
  showComponent = "login"
  registerStep = 1
  registerObj = undefined
  serverError = ''

  public registerFormOne: FormGroup
  public get email() { return this.registerFormOne.get('email') }
  public get password() { return this.registerFormOne.get('password') }
  public get israeliId() { return this.registerFormOne.get('israeliId') }
  public get passwordConfirm() { return this.registerFormOne.get('passwordConfirm') }

  public registerFormTwo: FormGroup
  public get firstName() { return this.registerFormTwo.get('firstName') }
  public get lastName() { return this.registerFormTwo.get('lastName') }
  public get cityId() { return this.registerFormTwo.get('cityId') }
  public get street() { return this.registerFormTwo.get('street') }
  public get streetNumber() { return this.registerFormTwo.get('streetNumber') }


  @Output() changeComponent = new EventEmitter<string>()
  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    public sessionService: SessionService) {

    this.registerFormTwo = fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cityId: [null, [Validators.required]],
      street: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]]

    })

    this.registerFormOne = fb.group({
      israeliId: ['', {
        validators: [Validators.required, createIdValidValidator()],
        asyncValidators: [israeliIdExistsValidator.createValidator(sessionService)],
        updateOn: 'blur'
      }
      ],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailExistsValidator.createValidator(sessionService)],
        updateOn: 'blur'
      }
      ],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      passwordConfirm: ['', [Validators.required]],
    },
      {
        validators: [ConfirmPasswordValidator("password", "passwordConfirm")]

      }
    )
  }

  ngOnInit(): void {
    this.getCities()
  }

  handleCreateAccountBtn(showComponent: string) {
    this.changeComponent.emit(showComponent)
  }

  registerStepOne() {
    if (!this.registerFormOne.valid) return
    this.registerObj = {
      israeliId: this.israeliId.value,
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.passwordConfirm.value
    }
    this.registerStep = 2
  }

  async registerStepTwo() {
    if (!this.registerFormOne.valid) return

    this.registerObj.firstName = this.firstName.value
    this.registerObj.lastName = this.lastName.value
    this.registerObj.cityId = this.cityId.value
    this.registerObj.street = this.street.value
    this.registerObj.streetNumber = this.streetNumber.value

    try {
      await this.sessionService.register(this.registerObj)
      this.dialog.closeAll()
    }
    catch (error) {
      console.log(error)
      this.serverError = 'Failed to register'
    }
  }

  async getCities() {
    this.cities = await this.sessionService.getCities()
  }
}
