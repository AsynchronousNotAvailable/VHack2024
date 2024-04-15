export class CreateLoanDto {
    name: string;
    end_date: Date;
    repayment_date: Date;
    loan_amount: number;
    installment_month: number;
    payment_remaining: number;
    interest_rate: number;
    userId: number;
}
