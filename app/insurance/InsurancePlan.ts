export interface InsurancePlan {
    name: string,
    pricePerMonth: number;
    deductible: number;
    maxOutOfPocket: number;
    coinsurance: number;
    companyHsaContribution: number,
    copayPerVisit: number;
  }