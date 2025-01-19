export interface Contribution {
  id: string;
  name: string;
  amount: number;
  frequency: ContributionFrequency;
  type: ContributionType;
}

export enum ContributionFrequency {
  Daily = "Daily",
  Weekly = "Weekly",
  Biweekly = "Biweekly",
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  Annually = "Annually",
}

export enum ContributionType {
  CheckIncome = "Check Income",
  OtherIncome = "Other Income",
  PreTaxInvestment = "Pre-Tax",
  PostTaxInvestment = "Post-Tax",
  Bill = "Bills",
  Housing = "Housing",
  EmployeeStock = "Employee Stock",
  Food = "Food",
}

export const contributionToMonthlyAmount = (contribution: Contribution): number => {
  switch (contribution.frequency) {
    case ContributionFrequency.Daily:
      return contribution.amount * 30 // Assuming 30 days in a month for simplicity
    case ContributionFrequency.Weekly:
      return (contribution.amount * 52) / 12
    case ContributionFrequency.Biweekly:
      return (contribution.amount * 26) / 12
    case ContributionFrequency.Monthly:
      return contribution.amount
    case ContributionFrequency.Quarterly:
      return contribution.amount / 4
    case ContributionFrequency.Annually:
      return contribution.amount / 12
    default:
      return 0
  }
}

export const getPostTaxMonthlyIncome = (contributions: Contribution[]): number => {
  let postTaxIncome = 0

  for (let i = 0; i < contributions.length; i++) {
    let contribution = contributions[i]

    if (
      contribution.type === ContributionType.CheckIncome || contribution.type === ContributionType.OtherIncome
    ) {
      postTaxIncome += contributionToMonthlyAmount(contribution)
    }
  }

  return postTaxIncome
}

export const getLeftOver = (contributions: Contribution[]): number => {
  let leftoverCash = getPostTaxMonthlyIncome(contributions)

  for (let i = 0; i < contributions.length; i++) {
    let contribution = contributions[i]
    const monthlyAmount = contributionToMonthlyAmount(contribution)

    switch (contribution.type) {
      case ContributionType.Bill:
      case ContributionType.PostTaxInvestment:
      case ContributionType.Housing:
      case ContributionType.Food:
        leftoverCash -= monthlyAmount
      default:
        break
    }
  }

  return leftoverCash
}

export const getMonthlyInvested = (contributions: Contribution[]): number => {
  let investedMoney = 0

  for (let i = 0; i < contributions.length; i++) {
    let contribution = contributions[i]
    const monthlyAmount = contributionToMonthlyAmount(contribution)

    switch (contribution.type) {
      case ContributionType.EmployeeStock:
      case ContributionType.PostTaxInvestment:
      case ContributionType.PreTaxInvestment:
        investedMoney += monthlyAmount // Investments are added to the invested money
        break
      default:
        break // Non-investment contributions don't affect this
    }
  }

  return investedMoney
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }).format(amount)
}