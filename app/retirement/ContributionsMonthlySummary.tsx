'use client'
import { Card, CardBody, Spacer } from "@nextui-org/react"

import { Contribution, getMMonthlySpending as getMonthlySpending, getMonthlyInvested, getPostTaxMonthlyIncome, formatMoney } from "./Contribution"

interface Props {
    contributions: Contribution[]
}

export const ContributionsMonthlySummary: React.FC<Props> = (props: Props) => {
    const monthlyIncome = getPostTaxMonthlyIncome(props.contributions);
    const monthlyInvested = getMonthlySpending(props.contributions);
    const monthlySpending = getMonthlyInvested(props.contributions);

    const yearlyIncome = monthlyIncome * 12;
    const yearlyInvested = monthlyInvested * 12;
    const yearlySpending = monthlySpending * 12;

    const dailyIncome = yearlyIncome / 365;
    const dailyInvested = yearlyInvested / 365;
    const dailySpending = yearlySpending / 365;

    return (
        <div className="mt-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-semibold text-orange-500 mb-6">
                Daily Summary
            </h1>
            <Card className="shadow-lg rounded-lg overflow-hidden">
                <CardBody className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Check Income:</span>
                        <span className="text-lg">{formatMoney(dailyIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Invested:</span>
                        <span className="text-lg">{formatMoney(dailyInvested)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Left Over:</span>
                        <span className="text-lg">{formatMoney(dailySpending)}</span>
                    </div>
                </CardBody>
            </Card>
            <Spacer y={10} />

            <h1 className="text-center text-4xl font-semibold text-orange-500 mb-6">
                Monthly Summary
            </h1>
            <Card className="shadow-lg rounded-lg overflow-hidden">
                <CardBody className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Check Income:</span>
                        <span className="text-lg">{formatMoney(monthlyIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Invested (ESPP, RSU, Post/Pre tax investments):</span>
                        <span className="text-lg">{formatMoney(monthlyInvested)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Left Over:</span>
                        <span className="text-lg">{formatMoney(monthlySpending)}</span>
                    </div>
                </CardBody></Card>
            <Spacer y={10} />

            <h1 className="text-center text-4xl font-semibold text-orange-500 mb-6">
                Yearly Summary
            </h1>
            <Card className="shadow-lg rounded-lg overflow-hidden">
                <CardBody className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Check Income:</span>
                        <span className="text-lg">{formatMoney(yearlyIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Invested:</span>
                        <span className="text-lg">{formatMoney(yearlyInvested)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Left Over:</span>
                        <span className="text-lg">{formatMoney(yearlySpending)}</span>
                    </div>
                </CardBody>
            </Card>
            <Spacer y={10} />
        </div>
    );
};
