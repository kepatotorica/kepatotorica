// // select something and press ctrl + d to do multiselect on a selection!!!
// //                            ctrl + f then your term then alt + enter to do multiselect on a all
// // select something and press alt + shift + . to do multiselect on a selection in visual studio!!!
// //                            alt + shift + ;  selects all

// IN VISUAL STUDIO WHILE DEBUGGING go to immediate window the type
//    ?<var name> to see the whole object
enum MoneyType {
    Income,
    PostTaxInvestments,
    PreTaxInvestments,
    Bill,
    EmployeeStock,
    Food,
    Mortgage
  }
  
  class Payment {
    payment: String;
    amount: number;
    type: MoneyType;
  }
  
  var payments: Payment[] = [
    //income
    { payment: 'payPerMonthKepa', amount: biWeeklyToMonthly(2503.53), type: MoneyType.Income },
    { payment: 'payPerMonthFitri', amount: biWeeklyToMonthly(2471.12), type: MoneyType.Income },
    { payment: 'gekelerRental', amount: 1800 /*Taxes*/, type: MoneyType.Income },
    //investments
    { payment: 'SoFiAutoInvest', amount: 6500, type: MoneyType.PostTaxInvestments },
    { payment: 'm1FinaceIndividual', amount: 6500, type: MoneyType.PostTaxInvestments },
    { payment: 'm1FinanceRoth', amount: weeklyToMonthly(0), type: MoneyType.PostTaxInvestments },
    { payment: 'Kepa 401k', amount: biWeeklyToMonthly(724.04 + 193.08), type: MoneyType.PreTaxInvestments }, // 724.04 + 193.08 match
    { payment: 'Fitri 401k', amount: biWeeklyToMonthly(346.15 + 169.23), type: MoneyType.PreTaxInvestments }, // 346.15 + 169.23 match
    //employee stock
    { payment: 'Kepa espp', amount: 1045.82, type: MoneyType.EmployeeStock },
    { payment: 'Fitri espp', amount: 916, type: MoneyType.EmployeeStock },
    { payment: 'Kepa RSU', amount: RSUAsMonthly(45000, 55000), type: MoneyType.EmployeeStock },
    { payment: 'Fitri RSU', amount: RSUAsMonthly(45000, 45000), type: MoneyType.EmployeeStock },
    //Mortgage
    { payment: 'mortgagePaymentGekeler', amount: -851.95, type: MoneyType.Mortgage },
    { payment: 'hoaGekeler', amount: -311, type: MoneyType.Mortgage },
    { payment: 'mortgagePaymentBendRidge', amount: -3248.99, type: MoneyType.Mortgage },
    { payment: 'hoaBendRidge', amount: -57, type: MoneyType.Mortgage },//$ 342 * 2 per year / 12
    //Utilities
    { payment: 'youtubePremium', amount: -18, type: MoneyType.Bill },
    { payment: 'internet', amount: -60, type: MoneyType.Bill },
    { payment: 'WaterPayment', amount: -75, type: MoneyType.Bill },
    { payment: 'IdahoPowerAverage', amount: -16, type: MoneyType.Bill },
    { payment: 'intermountainGas', amount: -40, type: MoneyType.Bill },
    { payment: 'statefarm', amount: -90, type: MoneyType.Bill },
    //Food
    { payment: 'food', amount: -600, type: MoneyType.Food },
  ]
  
  function RSUAsMonthly(planOne: number = 0, planTwo: number = 0, planThree: number = 0, planFour: number = 0): number{
    let monthsInPlan = 48;
    let savedAfterTaxes = .6
    return (planOne + planTwo + planThree + planFour)/monthsInPlan * savedAfterTaxes
  }
  
  function weeklyToMonthly(weeklyPayment: number): number {
    return weeklyPayment * 52 / 12;
  }
  
  function biWeeklyToMonthly(weeklyPayment: number): number {
    return weeklyPayment * 26 / 12;
  }
  
  function postTaxIncome(payments: Payment[]): number {
    var postTaxIncome = 0;
    for (var i = 0; i < payments.length; i++) {
      let payment = payments[i];
      if(payment.type === MoneyType.Income || payment.type === MoneyType.EmployeeStock) postTaxIncome += payment.amount
    };
    return postTaxIncome;
  }
  
  function spendingMoney(payments: Payment[]): number {
    var spendingMoney = 0;
    for (var i = 0; i < payments.length; i++) {
      let payment = payments[i];
      switch (payment.type) {
        case MoneyType.EmployeeStock || MoneyType.PreTaxInvestments:
          break;
        case MoneyType.PostTaxInvestments:
          spendingMoney -= payment.amount
          break;
        default:
          spendingMoney += payment.amount
          break;
      }
    };
    return spendingMoney;
  }
  
  function investmentMoney(investments: Payment[]) {
    var investedMoney = 0;
    for (var i = 0; i < investments.length; i++) {
      let payment = investments[i];
      switch (payment.type) {
        case MoneyType.EmployeeStock || MoneyType.PostTaxInvestments || MoneyType.PreTaxInvestments:
          investedMoney += payment.amount
          break;
        case MoneyType.PostTaxInvestments:
          investedMoney += payment.amount
          break;
      }
    };
    return investedMoney;
  }
  
  console.log(`Total post tax Income: ${postTaxIncome(payments).toFixed(2)}`)
  console.log(`loose change to play with after investments and bills: ${spendingMoney(payments).toFixed(2)}`)
  console.log(`Total Invested Per Month: ${investmentMoney(payments).toFixed(2)}`)