import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { errors } from 'src/app/models/errors';
import { SessionService } from 'src/app/services/session-service/session.service';
import { validatorMessages } from 'src/app/models/validator-massages'
import { empty } from 'rxjs';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup
  public get email() { return this.form.get('email') }
  public get password() { return this.form.get('password') }
  serverError: string = ""
  @Output() changeComponent = new EventEmitter<string>()
  showComponent = "register"

  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    private sessionService: SessionService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  validatorMessages = validatorMessages
  ngOnInit(): void {
  }

  async logIn() {

    if (!this.form.valid) return
    this.serverError = ""
    try {
      const user = await this.sessionService.login(this.email.value, this.password.value)
      this.sessionService.user = user
      this.dialog.closeAll()

    } catch (error) {
      console.log({ error })
      if (error.status === 404) {
        this.serverError = errors.userNotFound
        return
      }
      if (error.status === 400) {
        this.serverError = errors.wrongUserNamePassword
        console.log(this.serverError)
        this.serverError
      }

    }

  }

  handleCreateAccountBtn(showComponent: string) {
    this.changeComponent.emit(showComponent)
  }
  openRegisterDialog() {

    this.dialog.open(RegisterComponent)
  }

  closeAllDialogs() {
    this.closeAllDialogs()
  }

}
