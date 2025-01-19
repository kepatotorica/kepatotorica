import { useState } from 'react'
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
} from '@nextui-org/react'

import { ContributionFrequency, ContributionType, Contribution } from './Contribution'

interface Props {
    onAdd: (contribution: Contribution) => Promise<void>;
}

const defaultPlan = {
    id: "",
    name: "Paycheck",
    amount: 1000,
    frequency: ContributionFrequency.Biweekly,
    type: ContributionType.CheckIncome
}

const ContributionEditor: React.FC<Props> = (props: Props) => {
    const [newContribution, setNewContribution] = useState<Contribution>({ ...defaultPlan })

    const setPropertyOnState = (propertyToUpdate: string, value: string) => {
        setNewContribution({
            ...newContribution,
            [propertyToUpdate]: propertyToUpdate === "amount" ? parseFloat(value) : value,
        })
    }

    const addPlan = () => {
        props.onAdd(newContribution)
        setNewContribution({ ...defaultPlan })
    }

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
                    defaultSelectedKeys={[ContributionFrequency.Biweekly]}
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
                <Select
                    required
                    defaultSelectedKeys={[ContributionType.CheckIncome]}
                    label="Type"
                    placeholder="Select a type"
                    onChange={(e) => setPropertyOnState("type", e.target.value)}
                >
                    {Object.values(ContributionType).map((type) => (
                        <SelectItem key={type} value={type} >
                            {type}
                        </SelectItem>
                    ))}
                </Select>
            </CardBody>
            <CardFooter>
                <Button color="primary" onPress={addPlan}>
                    Add Contribution
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ContributionEditor