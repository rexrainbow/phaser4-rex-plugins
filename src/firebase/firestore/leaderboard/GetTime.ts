import { TimeDataType } from './ILeaderboard';

export function GetTime(
    timeStamp?: number
): TimeDataType {

    let date = (timeStamp) ? (new Date(timeStamp)) : (new Date());
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let Jan1st = new Date(date.getFullYear(), 0, 1);
    let w = Math.ceil(
        (((date.getTime() - Jan1st.getTime()) / 86400000) + Jan1st.getDay() + 1) / 7
    );

    return {
        d: `${y}-${m}-${d}`,
        w: `${y}-${w}`,
        m: `${y}-${m}`,
        y: `${y}`,
        a: ''
    };
}