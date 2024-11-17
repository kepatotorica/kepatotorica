import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Input,
    Spacer,
    Select,
    SelectItem,
} from '@nextui-org/react';

import { ContributionFrequency, contributionType, Contribution } from './Contribution';

interface Props {
    onAdd: (contribution: Contribution) => void;
}

const defaultPlan = {
    name: "Robinhood",
    amount: 100,
    frequency: ContributionFrequency.Biweekly,
    type: contributionType.PostTaxInvestment
}

const ContributionEditor: React.FC<Props> = (props: Props) => {
    const [newContribution, setNewContribution] = useState<Contribution>({ ...defaultPlan });

    const setPropertyOnState = (propertyToUpdate: string, value: string) => {
        setNewContribution({
            ...newContribution,
            [propertyToUpdate]: parseFloat(value),
        });
    };

    const addPlan = () => {
        props.onAdd(newContribution);
        setNewContribution({ ...defaultPlan });
    };

    return (
        <Card>
            <CardHeader>
                <h2>Add New Contribution</h2>
            </CardHeader>
            <CardBody>
                <Input
                    label="Name"
                    name="name"
                    type="string"
                    value={newContribution.name}
                    onChange={e => setPropertyOnState(e.target.name, e.target.value)}
                />
                <Spacer y={1} />
                <Input
                    label="Amount"
                    name="amount"
                    type="number"
                    value={newContribution.amount.toString()}
                    onChange={e => setPropertyOnState(e.target.name, e.target.value)}
                />
                <Spacer y={1} />
                <Select
                    required
                    label="Contribution Frequency"
                    placeholder="Select a frequency"
                    onChange={(e) => setPropertyOnState("frequency", e.target.value)}
                >
                    {Object.values(ContributionFrequency).map((frequency) => (
                        <SelectItem key={frequency} value={frequency}>
                            {frequency}
                        </SelectItem>
                    ))}
                </Select>
                <Spacer y={1} />
            </CardBody>
            <CardFooter>
                <Button color="primary" onPress={addPlan}>
                    Add Contribution
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ContributionEditor;