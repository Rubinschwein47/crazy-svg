
/*
@summary a local vector expected to go between 0 and 1 starting in the top left corner
 */
export type Point = {
    x: number;
    y: number;
};

export class SimplePath  {
    wraparound?: boolean;
    points: Point[] = [];
}

