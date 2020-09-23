import { ICanvas } from '../canvas/ICanvas';
import * as ChartJS from 'chart.js';

export function CreateChartJSInstance(
    baseCanvas: ICanvas,
    config?: ChartJS.ChartConfiguration
): ChartJS {

    const chartJSInstance = new ChartJS.Chart(
        baseCanvas.context,
        FillConfig(baseCanvas, config)
    );
    return chartJSInstance;
}

function FillConfig(
    baseCanvas: ICanvas,
    config: ChartJS.ChartConfiguration = {}
): ChartJS.ChartConfiguration {

    if (!config.hasOwnProperty('options')) {
        config.options = {};
    }
    const options = config.options;

    // Fill options
    options.responsive = false;
    options.maintainAspectRatio = false;
    if (!options.hasOwnProperty('devicePixelRatio')) {
        options.devicePixelRatio = 1;
    }

    // Get animation config
    let noAnimation = false;
    if (!options.hasOwnProperty('animation')) {
        options.animation = {};
    } else if (options.animation === false) {
        noAnimation = true;
        options.animation = {};
    }
    const animationConfig = options.animation;

    // Fill animation config
    if (noAnimation) {
        animationConfig.duration = 0;
    }

    const onProgress = animationConfig.onProgress;
    animationConfig.onProgress = function (animation) {
        if (onProgress) {
            onProgress(animation);
        }
        baseCanvas.updateTexture();
    }

    const onComplete = animationConfig.onComplete;
    animationConfig.onComplete = function (animation) {
        if (onComplete) {
            onComplete(animation);
        }
        baseCanvas.updateTexture();
    }
    return config;
}