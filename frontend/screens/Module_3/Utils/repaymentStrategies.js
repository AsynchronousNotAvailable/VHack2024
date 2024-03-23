const calculateMonthlyPayment = (principal, annualInterestRate, years) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;
    return (
        principal *
        (monthlyInterestRate /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)))
    );
};

const calculateTotalPayment = (monthlyPayment, years) => {
    return monthlyPayment * years * 12;
};

const calculateInterestPaid = (totalPayment, principal) => {
    return totalPayment - principal;
};

export const calculateDebtSnowball = (loans, extraPayment) => {
    let sortedLoans = [...loans].sort((a, b) => a.currentLoan - b.currentLoan);
    let totalInterestPaid = 0;
    let timeToPayOff = 0;
    sortedLoans.forEach(loan => {
        const { currentLoan, totalLoan, interestRate } = loan;
        let monthlyPayment = calculateMonthlyPayment(currentLoan, interestRate, (totalLoan - currentLoan) / 12) + extraPayment;
        let years = currentLoan / monthlyPayment / 12;
        timeToPayOff += years;
        totalInterestPaid += calculateInterestPaid(calculateTotalPayment(monthlyPayment, years), currentLoan);
    });
    return { timeToPayOff: timeToPayOff.toFixed(2), totalInterestPaid: totalInterestPaid.toFixed(2) };
};

export const calculateDebtAvalanche = (loans, extraPayment) => {
    let sortedLoans = [...loans].sort((a, b) => b.interestRate - a.interestRate);
    let totalInterestPaid = 0;
    let timeToPayOff = 0;
    sortedLoans.forEach(loan => {
        const { currentLoan, totalLoan, interestRate } = loan;
        let monthlyPayment = calculateMonthlyPayment(currentLoan, interestRate, (totalLoan - currentLoan) / 12) + extraPayment;
        let years = currentLoan / monthlyPayment / 12;
        timeToPayOff += years;
        totalInterestPaid += calculateInterestPaid(calculateTotalPayment(monthlyPayment, years), currentLoan);
    });
    return { timeToPayOff: timeToPayOff.toFixed(2), totalInterestPaid: totalInterestPaid.toFixed(2) };
};
