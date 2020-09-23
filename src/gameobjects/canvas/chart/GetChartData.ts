import * as ChartJS from 'chart.js';
import { GetChartDataset } from './GetChartDataset';

export function GetChartData(
    chartJS: ChartJS,
    datasetIndex: number | string,
    dataIndex: number | string,
): (number | number[]) | ChartJS.ChartPoint {

    const dataset = GetChartDataset(chartJS, datasetIndex);
    if (!dataset) {
        return undefined;
    }
    if (typeof (dataIndex) === 'string') {
        const labels = chartJS.data.labels;
        dataIndex = labels.indexOf(dataIndex);
        if (dataIndex === -1) {
            return undefined;
        }
    }
    return dataset.data[dataIndex];
}