import { Loan } from './loan';

export interface LoanDocument {
    id?: number,
    url: string,
    fileName: string,
    loan: Loan
}