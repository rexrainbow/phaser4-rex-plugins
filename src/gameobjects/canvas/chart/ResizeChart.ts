import * as ChartJS from 'chart.js';

export function ResizeChart(
    chartJS: ChartJS,
    width: number,
    height: number
) {

    chartJS.height = width;
    chartJS.width = height;
    chartJS.aspectRatio = (chartJS.height) ? chartJS.width / chartJS.height : null;
    chartJS.update();
}