'use client'
import { Card, CardBody, Spacer } from "@nextui-org/react"

import { Contribution, getLeftOver as getLeftOver, getMonthlyInvested, getPostTaxMonthlyIncome, formatMoney } from "./Contribution"

interface Props {
    contributions: Contribution[]
}

export const ContributionSummary: React.FC<Props> = (props: Props) => {
    const monthlyIncome = getPostTaxMonthlyIncome(props.contributions);
    const monthlyInvested = getMonthlyInvested(props.contributions);
    const monthlyLeftOver = getLeftOver(props.contributions);

    const yearlyIncome = monthlyIncome * 12;
    const yearlyInvested = monthlyInvested * 12;
    const yearlyLeftOver = monthlyLeftOver * 12;

    const dailyIncome = yearlyIncome / 365;
    const dailyInvested = yearlyInvested / 365;
    const dailyLeftOver = yearlyLeftOver / 365;

    return (
        <div className="mt-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-semibold text-orange-500 mb-6">
                Daily Summary
            </h1>
            <Card className="shadow-lg rounded-lg overflow-hidden">
                <CardBody className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Direct Income:</span>
                        <span className="text-lg">{formatMoney(dailyIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Invested (ESPP, RSU, Post/Pre tax investments):</span>
                        <span className="text-lg">{formatMoney(dailyInvested)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Free Cash Over:</span>
                        <span className="text-lg">{formatMoney(dailyLeftOver)}</span>
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
                        <span className="text-lg font-medium">Direct Income:</span>
                        <span className="text-lg">{formatMoney(monthlyIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Invested (ESPP, RSU, Post/Pre tax investments):</span>
                        <span className="text-lg">{formatMoney(monthlyInvested)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Free Cash Over:</span>
                        <span className="text-lg">{formatMoney(monthlyLeftOver)}</span>
                    </div>
                </CardBody></Card>
            <Spacer y={10} />

            <h1 className="text-center text-4xl font-semibold text-orange-500 mb-6">
                Yearly Summary
            </h1>
            <Card className="shadow-lg rounded-lg overflow-hidden">
                <CardBody className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Direct Income:</span>
                        <span className="text-lg">{formatMoney(yearlyIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Invested (ESPP, RSU, Post/Pre tax investments):</span>
                        <span className="text-lg">{formatMoney(yearlyInvested)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-lg font-medium">Free Cash Over:</span>
                        <span className="text-lg">{formatMoney(yearlyLeftOver)}</span>
                    </div>
                </CardBody>
            </Card>
            <Spacer y={10} />
        </div>
    );
};
