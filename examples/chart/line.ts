import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { On } from '@phaserjs/phaser/events';
import { Chart } from '../../src';

function GetNormalRandom(
    randomCount: number = 1,
    maxValue: number = 1
): number {

    let result = 0;
    for (let i = 0; i < randomCount; i++) {
        result += Math.random();
    }
    return (result * maxValue) / randomCount;
}

class Demo extends Scene {
    constructor() {
        super();

        const maxValue = 100;
        const labels: number[] = [];
        const resultRand1: number[] = [];
        const resultRand2: number[] = [];
        const resultRand3: number[] = [];
        const resultRand4: number[] = [];
        for (let i = 0; i < maxValue; i++) {
            labels.push(i);
            resultRand1.push(0)
            resultRand2.push(0);
            resultRand3.push(0);
            resultRand4.push(0);
        }

        const world = new StaticWorld(this);

        const chart = new Chart(400, 300, 600, 400, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: resultRand1,
                        label: "Random1",
                        borderColor: "#e8c3b9",
                        fill: false
                    },
                    {
                        data: resultRand2,
                        label: 'Random2',
                        borderColor: '#3e95cd',
                        fill: false
                    },
                    {
                        data: resultRand3,
                        label: 'Random3',
                        borderColor: '#8e5ea2',
                        fill: false
                    },
                    {
                        data: resultRand4,
                        label: 'Random4',
                        borderColor: '#3cba9f',
                        fill: false
                    },
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Total samples = 0'
                },
                animation: {
                    duration: 0
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })

        AddChild(world, chart);

        let totalSamples = 0;
        On(world, 'update', function (delta: number) {
            if (totalSamples > 999999) {
                return;
            }

            const iterCount = 1000;
            for (let i = 0; i < iterCount; i++) {
                resultRand1[Math.floor(GetNormalRandom(1, maxValue))]++;
                resultRand2[Math.floor(GetNormalRandom(2, maxValue))]++;
                resultRand3[Math.floor(GetNormalRandom(3, maxValue))]++;
                resultRand4[Math.floor(GetNormalRandom(4, maxValue))]++;
            }

            totalSamples += iterCount;
            chart.chart.options.title.text = `Total samples = ${totalSamples}`;
            chart.updateChart();
        });
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0xffffff),
    Scenes(Demo)
);
