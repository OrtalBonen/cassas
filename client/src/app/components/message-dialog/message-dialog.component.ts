import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SessionComponent } from '../session/session.component';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  constructor(
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openLogInDialog() {
    this.dialog.closeAll()
    this.dialog.open(SessionComponent)
  }
}
