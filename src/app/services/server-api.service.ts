import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../constant';
import { People } from '../models/people';
import { State } from '../models/state';
import { User } from '../models/user';
import { LoanType } from '../models/loan-type';
import { PaymentTerm } from '../models/payment-term';
import { BusinessType } from '../models/business-type';
import { LoanProviderType } from '../models/loan-provider-type';
import { Bank } from '../models/bank';
import { Loan } from '../models/loan';
import { Packages } from '../models/packages';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  constructor(private http: HttpClient) { }

  readonly people = {
    uri: `${Constant.API.SERVER_URL}${Constant.API.URI.PEOPLE}/`,
    create: (people: People) => this.http.put(this.people.uri, people),
    getMe: () => this.http.get<People>(`${this.people.uri}me`)
  }

  readonly state = {
    uri: `${Constant.API.SERVER_URL}${Constant.API.URI.STATE}/`,
    getAll: () => this.http.get<Array<State>>(this.state.uri)
  }

  readonly custom = {
    people: {
      uri: `${Constant.API.SERVER_URL}${Constant.API.URI.CUSTOM}${Constant.API.URI.PEOPLE}/`,
      create: (people: People) => this.http.put(this.custom.people.uri, people),
      selfSaveAndUpdate: (people: People) => this.http.put<People>(`${this.custom.people.uri}me`, people)
    }
  }

  readonly public = {
    state: {
      uri: `${Constant.API.SERVER_URL}${Constant.API.URI.PUBLIC}${Constant.API.URI.STATE}/`,
      getAll: () => this.http.get<Array<State>>(this.public.state.uri)
    },
    loanType: {
      uri: `${Constant.API.SERVER_URL}${Constant.API.URI.PUBLIC}${Constant.API.URI.LOAN_TYPE}/`,
      getAll: () => this.http.get<Array<LoanType>>(this.public.loanType.uri)
    },
    paymentTerm: {
      uri: `${Constant.API.SERVER_URL}${Constant.API.URI.PUBLIC}${Constant.API.URI.PAYMENT_TERM}/`,
      getAll: () => this.http.get<Array<PaymentTerm>>(this.public.paymentTerm.uri)
    },
    businessType: {
      uri: `${Constant.API.SERVER_URL}${Constant.API.URI.PUBLIC}${Constant.API.URI.BUSINESS_TYPE}/`,
      getAll: () => this.http.get<Array<BusinessType>>(this.public.businessType.uri)
    },
    loanProviderType: {
      uri: `${Constant.API.SERVER_URL}${Constant.API.URI.PUBLIC}${Constant.API.URI.LOAN_PROVIDER_TYPE}/`,
      getAll: () => this.http.get<Array<LoanProviderType>>(this.public.loanProviderType.uri)
    },
    bank: {
      uri: `${Constant.API.SERVER_URL}${Constant.API.URI.PUBLIC}${Constant.API.URI.BANK}/`,
      getAll: () => this.http.get<Array<Bank>>(this.public.bank.uri)
    },
    package: {
      uri: `${Constant.API.SERVER_URL}${Constant.API.URI.PUBLIC}${Constant.API.URI.PACKAGE}/`,
      getActivePackageByLoanType: (loanTypeCode: string, page: number) => this.http.get<Array<Packages>>(`${this.public.package.uri}active`, { params: { type: loanTypeCode, page: page.toString() } })
    }
  }

  readonly user = {
    uri: `${Constant.API.SERVER_URL}${Constant.API.URI.USER}/`,
    getSelf: () => this.http.get<User>(`${this.user.uri}me`)
  }

  readonly loan = {
    uri: `${Constant.API.SERVER_URL}${Constant.API.URI.LOAN}/`,
    create: (loan: Loan) => this.http.put(this.loan.uri, loan)
  }
}