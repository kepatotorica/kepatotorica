import React, { useState, useEffect } from 'react';

import { InsurancePlan } from './InsurancePlan';
import { calculateInsuranceCost } from './insuranceCalculator';

import { LineChartData } from '@/components/LineChart/LineChartData';
import CustomLineChart from '@/components/LineChart/CustomLineChart';


interface Props {
    plans: InsurancePlan[]
    visits: number
}

const costIncrements = Array.from({ length: 1000 }, (_, i) => i * 27);
const ComparisonGraph: React.FC<Props> = (props: Props) => {
    const [data, setData] = useState<LineChartData[] | undefined>(undefined);

    useEffect(() => {
        const calculatedData: LineChartData[] = props.plans.map((plan) => {
            return {
                name: plan.name,
                data: costIncrements.map((cost) => {
                    return {
                        category: cost,
                        value: calculateInsuranceCost(plan, props.visits, cost)
                    }
                })
            }
        })

        setData(calculatedData)
    }, [props.plans]);

    return data ? < CustomLineChart data={data} /> : <></>
};

export default ComparisonGraph;
