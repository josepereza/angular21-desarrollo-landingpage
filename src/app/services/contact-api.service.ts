import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  website: string | null;
  description: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  reportSummary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  private readonly http = inject(HttpClient);

  submitLead(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>('/api/clients', payload);
  }
}
