export interface Contribution {
  name: string;
  amount: number;
  frequency: ContributionFrequency;
  type: contributionType;
}

export enum ContributionFrequency {
  Daily = "Daily",
  Weekly = "Weekly",
  Biweekly = "Biweekly",
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  Annually = "Annually",
}

export enum contributionType {
  CheckIncome = "Check Income",
  PreTaxInvestment = "Pre-Tax",
  PostTaxInvestment = "Post-Tax",
  Bill = "Bills",
  Housing = "Housing",
  EmployeeStock = "Employee Stock",
  Food = "Food",
}

export const weeklyToMonthly = (weeklyPayment: number): number => {
  return (weeklyPayment * 52) / 12;
}

export const biWeeklyToMonthly = (biWeeklyPayment: number): number => {
  return (biWeeklyPayment * 26) / 12;
}

export const contributionToMonthlyAmount = (contribution: Contribution): number => {
  switch (contribution.frequency) {
    case ContributionFrequency.Daily:
      return contribution.amount * 30; // Assuming 30 days in a month for simplicity
    case ContributionFrequency.Weekly:
      return weeklyToMonthly(contribution.amount);
    case ContributionFrequency.Biweekly:
      return biWeeklyToMonthly(contribution.amount);
    case ContributionFrequency.Monthly:
      return contribution.amount;
    case ContributionFrequency.Quarterly:
      return contribution.amount / 3;
    case ContributionFrequency.Annually:
      return contribution.amount / 12;
    default:
      return 0;
  }
}

export const getPostTaxMonthlyIncome = (contributions: Contribution[]): number => {
  let postTaxIncome = 0;

  for (let i = 0; i < contributions.length; i++) {
    let contribution = contributions[i];

    if (
      contribution.type === contributionType.CheckIncome
    ) {
      postTaxIncome += contributionToMonthlyAmount(contribution);
    }
  }

  return postTaxIncome;
}

export const getMMonthlySpending = (contributions: Contribution[]): number => {
  let spendingMoney = 0;

  for (let i = 0; i < contributions.length; i++) {
    let contribution = contributions[i];
    const monthlyAmount = contributionToMonthlyAmount(contribution);

    switch (contribution.type) {
      case contributionType.EmployeeStock:
      case contributionType.PreTaxInvestment:
        break;
      case contributionType.PostTaxInvestment:
        spendingMoney -= monthlyAmount;
        break;
      case contributionType.Bill:
        spendingMoney -= monthlyAmount;
        break;
      default:
        spendingMoney += monthlyAmount;
        break;
    }
  }

  return spendingMoney;
}

export const getMonthlyInvested = (contributions: Contribution[]): number => {
  let investedMoney = 0;

  for (let i = 0; i < contributions.length; i++) {
    let contribution = contributions[i];
    const monthlyAmount = contributionToMonthlyAmount(contribution);

    switch (contribution.type) {
      case contributionType.EmployeeStock:
      case contributionType.PostTaxInvestment:
      case contributionType.PreTaxInvestment:
        investedMoney += monthlyAmount; // Investments are added to the invested money
        break;
      default:
        break; // Non-investment contributions don't affect this
    }
  }

  return investedMoney;
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }).format(amount);
};