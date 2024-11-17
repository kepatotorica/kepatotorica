import { useState } from 'react';
import { Button, Card, CardBody } from '@nextui-org/react';
import { useTheme } from 'next-themes';

import { Contribution } from './Contribution';

interface Props {
    contributions: Contribution[];
    className: string | undefined;
    onRemove: (index: number) => void;
}

const ContributionTable: React.FC<Props> = (props: Props) => {
    const { theme } = useTheme();

    // State to manage sorting
    const [sortConfig, setSortConfig] = useState<{ key: keyof Contribution | null; direction: 'asc' | 'desc' | null }>({
        key: null,
        direction: null,
    });

    // Function to handle sorting
    const handleSort = (key: keyof Contribution) => {
        let direction: 'asc' | 'desc' = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Sort contributions based on sortConfig
    const sortedContributions = [...props.contributions].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;

        return 0;
    });

    return (
        <div className="mt-10">
            <h1 className="text-center text-3xl text-orange-400">Contributions</h1>
            <Card className="mt-5">
                <CardBody>
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className={theme === "dark" ? "bg-gray-950" : "bg-gray-100"}>
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('name')}
                                >
                                    Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                </th>
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('amount')}
                                >
                                    Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                </th>
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('frequency')}
                                >
                                    Frequency {sortConfig.key === 'frequency' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                </th>
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('type')}
                                >
                                    Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedContributions.map((contribution, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{contribution.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{contribution.amount}</td>
                                    <td className="border border-gray-300 px-4 py-2">{contribution.frequency}</td>
                                    <td className="border border-gray-300 px-4 py-2">{contribution.type}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <Button color="warning" onPress={() => props.onRemove(index)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default ContributionTable;
