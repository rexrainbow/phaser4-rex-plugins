import * as ChartJS from 'chart.js';

export function GetChartDataset(
    chartJS: ChartJS,
    datasetIndex: number | string
): ChartJS.ChartDataSets {

    if (typeof (datasetIndex) === 'string') {
        const datasets = chartJS.data.datasets;
        for (let i = 0, cnt = datasets.length; i < cnt; i++) {
            const dataset = datasets[i];
            if (dataset.label === datasetIndex) {
                return dataset;
            }
        }
    } else {
        return chartJS.data.datasets[datasetIndex];
    }

    return null;
}