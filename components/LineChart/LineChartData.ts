export interface LineChartData {
    name: string,
    data: DataPoint[]
}

export interface DataPoint {
    category: string | number,
    value: string | number
}