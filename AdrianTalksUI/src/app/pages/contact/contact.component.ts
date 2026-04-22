import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { UnsubscriberService } from '../../services/unsubscriber.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [ContactService, UnsubscriberService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  public form: FormGroup;
  sending: boolean = false;
  sent: boolean = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  bannerId: number;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private unsubscriberService: UnsubscriberService
  ) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendMessage() {
    if (!this.form.valid || this.sending) {
      this.sending = false;
      return;
    }

    this.sending = true;

    let message: Contact =
    {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      message: this.form.value.message,
      subject: "AdrianTalks: " + this.form.value.subject
    }

    this.contactService.sendMessage(message).pipe(this.unsubscriberService.takeUntilDestroy).subscribe(reg => {
      if (reg) {
        this.sending = false;
        this.sent = true;
        this.initializeForm();
      } else {
        this.sending = false;
      }
    }, () => {
      this.sending = false;
    });
  }
}
