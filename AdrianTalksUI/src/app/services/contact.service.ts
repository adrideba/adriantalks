import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl = `${environment.contactApi}/contact`;
  reqHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private http: HttpClient) {
  }

  sendMessage(contact: Contact) {
    return this.http.
      post<boolean>(`${this.apiUrl}/sendmessage`, contact, { headers: this.reqHeader });
  }
}
