import { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Input,
    Spacer,
} from '@nextui-org/react'

import { InsurancePlan } from './InsurancePlan'

interface Props {
    onAdd: (plan: InsurancePlan) => void;
}

const AddInsurancePlan: React.FC<Props> = (props: Props) => {
    const [newPlan, setNewPlan] = useState<InsurancePlan>({
        name: "",
        pricePerMonth: 0,
        deductible: 0,
        maxOutOfPocket: 0,
        coinsurance: 0,
        companyHsaContribution: 0,
        copayPerVisit: 0,
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlan({
            ...newPlan,
            [event.target.name]: parseFloat(event.target.value),
        })
    }

    const addPlan = () => {
        props.onAdd(newPlan)
        setNewPlan({
            name: "",
            pricePerMonth: 0,
            deductible: 0,
            maxOutOfPocket: 0,
            coinsurance: 0,
            companyHsaContribution: 0,
            copayPerVisit: 0,
        })
    }

    return (
        <Card>
            <CardHeader>
                <h2>Add New Plan</h2>
            </CardHeader>
            <CardBody>
                <Input
                    label="Name"
                    name="name"
                    type="string"
                    value={newPlan.name}
                    onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                    label="Price per Month"
                    name="pricePerMonth"
                    type="number"
                    value={newPlan.pricePerMonth.toString()}
                    onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                    label="Deductible"
                    name="deductible"
                    type="number"
                    value={newPlan.deductible.toString()}
                    onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                    label="Max Out of Pocket"
                    name="maxOutOfPocket"
                    type="number"
                    value={newPlan.maxOutOfPocket.toString()}
                    onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                    label="Coinsurance (%)"
                    name="coinsurance"
                    type="number"
                    value={newPlan.coinsurance.toString()}
                    onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                    label="Company HSA Contribution"
                    name="companyHsaContribution"
                    type="number"
                    value={newPlan.companyHsaContribution.toString()}
                    onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                    label="Copay per Visit"
                    name="copayPerVisit"
                    type="number"
                    value={newPlan.copayPerVisit.toString()}
                    onChange={handleInputChange}
                />
            </CardBody>
            <CardFooter>
                <Button color="primary" onPress={addPlan}>
                    Add Plan
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AddInsurancePlan