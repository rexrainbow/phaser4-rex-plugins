export function Normalize(angle: number): number {
    angle = angle % PI2;

    if (angle >= 0) {
        return angle;
    }
    else {
        return angle + PI2;
    }
};

const PI2 = Math.PI * 2;
