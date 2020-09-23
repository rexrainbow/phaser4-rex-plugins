import * as ChartJS from 'chart.js';
import { GetChartDataset } from './GetChartDataset';

export function SetChartData(
    chartJS: ChartJS,
    datasetIndex: number | string,
    dataIndex: number | string,
    value: (number | number[]) | ChartJS.ChartPoint
) {

    const dataset = GetChartDataset(chartJS, datasetIndex);
    if (!dataset) {
        return;
    }

    if (typeof (dataIndex) === 'string') {
        const labels = chartJS.data.labels;
        dataIndex = labels.indexOf(dataIndex);
        if (dataIndex === -1) {
            return;
        }
    }
    dataset.data[dataIndex] = value;
}
