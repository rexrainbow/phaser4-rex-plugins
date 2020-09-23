import { BaseCanvas } from '../canvas/BaseCanvas';
import * as ChartJS from 'chart.js';
import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { CreateChartJSInstance } from './CreateChartJS';
import { GetChartDataset } from './GetChartDataset';
import { GetChartData } from './GetChartData';
import { SetChartData } from './SetChartData';

export class Chart extends BaseCanvas {
    type = 'rexChart';
    chart: ChartJS;

    constructor(
        x: number = 0,
        y: number = 0,
        width: number = 128,
        height: number = 128,
        config: ChartJS.ChartConfiguration = {}

    ) {
        super(x, y, width, height);
        this.setChart(config);
    }

    destroy(reparentChildren?: IContainer): void {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        super.destroy(reparentChildren);
    }

    setChart(
        config: ChartJS.ChartConfiguration = {}
    ): this {

        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = CreateChartJSInstance(this, config)
        return this;
    }

    resize(
        width: number = this.width,
        height: number = this.height
    ): this {

        if ((width === this.width) && (height === this.height)) {
            return this;
        }

        super.resize(width, height);

        if (this.chart) {
            const chart = this.chart;
            chart.height = this.canvas.height;
            chart.width = this.canvas.width;
            chart.aspectRatio = (chart.height) ? chart.width / chart.height : null;
            chart.update();
        }
        return this;
    }

    getChartDataset(
        datasetIndex: number | string
    ): ChartJS.ChartDataSets {

        let dataset: ChartJS.ChartDataSets;
        if (this.chart) {
            dataset = GetChartDataset(this.chart, datasetIndex);
        }
        return dataset;
    }

    getChartData(
        datasetIndex: number | string,
        dataIndex: number | string,
    ): (number | number[]) | ChartJS.ChartPoint {

        let value: (number | number[]) | ChartJS.ChartPoint;
        if (this.chart) {
            value = GetChartData(this.chart, datasetIndex, dataIndex);
        }

        return value;
    }

    setChartData(
        datasetIndex: number | string,
        dataIndex: number | string,
        value: (number | number[]) | ChartJS.ChartPoint
    ): this {

        if (this.chart) {
            SetChartData(this.chart, datasetIndex, dataIndex, value);
        }
        return this;
    }
    
    updateChart(): this {

        if (this.chart) {
            this.chart.update();
        }
        return this;
    }

}