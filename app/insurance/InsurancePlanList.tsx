import { Card, CardBody, Button } from '@nextui-org/react';

import { InsurancePlan } from './InsurancePlan';

interface Props {
    plans: InsurancePlan[];
    className: string | undefined;
    onRemove: (index: number) => void;
}

const InsurancePlanList: React.FC<Props> = (props: Props) => (
    <div>
        <h2>Insurance Plans</h2>
        {props.plans.map((plan, index) => (
            <Card key={index} >
                <CardBody>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className='px-2'><span className={props.className}>Name: </span> {plan.name}</span>
                            <p>
                                <span className='px-2'><span className={props.className}>Price per Month: </span> {plan.pricePerMonth}</span>
                                <span className='px-2'><span className={props.className}>Deductible: </span> {plan.deductible}</span>
                            </p>
                            <p>
                                <span className='px-2'><span className={props.className}>Coinsurance: </span> 0.{plan.coinsurance}</span>
                                <span className='px-2'><span className={props.className}>Copay per Visit: </span> {plan.copayPerVisit}</span>
                            </p>
                            <p>
                                <span className='px-2'><span className={props.className}>Max Out of Pocket: </span> {plan.maxOutOfPocket}</span>
                                <span className='px-2'><span className={props.className}>Company HSA Contribution: </span> {plan.companyHsaContribution}</span>
                            </p>
                        </div>
                        <div>
                            <Button color="warning" onPress={() => props.onRemove(index)}>
                                Remove
                            </Button></div>
                    </div>
                </CardBody>
            </Card>
        ))}
    </div>
);

export default InsurancePlanList;