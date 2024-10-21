"use client"
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

import { LineChartData } from "./LineChartData";

import { getRandomColor } from "@/Utilities/helpers";


interface Props {
    data: LineChartData[]
}

const colors = [
    "#eb4034",
    "#23ccc9",
    "#ccc423",
    "#bb23cc",
    "#36cc23",
    "#2353cc",
]

export default function CustomLineChart(props: Props) {
    return (
        <div className='h-96 w-full'>
            {props.data &&
                <ResponsiveContainer height="100%" width="100%">
                    <LineChart height={300} width={500}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis allowDuplicatedCategory={false} dataKey="category" type="category" />
                        <YAxis dataKey="value" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        {props.data.map((point, index) => (
                            // <Line key={point.name} color="0000" data={point.data} dataKey="value" name={point.name} />
                            <Line
                                key={point.name}
                                color={index < colors.length ? colors[index] : getRandomColor()}
                                data={point.data}
                                dataKey="value"
                                // isAnimationActive={true}
                                name={point.name}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            }
        </div>
    );
}


interface ToolTipPayload {
    chartType?: string;
    color: string;
    dataKey: string;
    fill: string;
    formatter?: (value: any) => any;
    hide: boolean;
    name: string;
    payload: {
        category: number;
        value: number;
    };
    stroke: string;
    strokeWidth: number;
    type?: string;
    unit?: string;
    value: number;
}


function CustomTooltip({ payload: mouseInfo, label, active }: any) {
    if (active) {
        return (
            <div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">Cost: </span>
                    <span className="text-sm">${label}</span>
                </div>
                {mouseInfo.map((info: ToolTipPayload) => {
                    return <div key={info.name + info.payload.category} className="flex justify-between items-center">
                        <span className="text-sm">{`${info.name}: `}</span>
                        <span className="text-sm">${info.payload.value}</span>
                    </div>
                })}
            </div>
        );
    }

    return null;
}


