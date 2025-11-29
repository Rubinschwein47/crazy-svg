import {Point, SimplePath} from "./path";

/*
@summary a 3 Point Bézier curve
@param Point a start point
@param Point b interpolation point, will not be crossed
@param Point c end point
@param number precision the amount of steps being taken higher = smoother & more expensive
 */
export function QuadraticBezierPath(a: Point, b: Point, c: Point, precision: number = 8): SimplePath {
    let step = 1 / (precision - 1)
    return {points: Array(precision).map((v, index) => QuadraticBezierPathPoint(step * index, a, b, c))}
}

/*
@summary get a point along the 3 point Bézier curve
@param number t the time between 0 and 1
@param Point a start point
@param Point b interpolation point, will not be crossed
@param Point c end point
 */
export function QuadraticBezierPathPoint(t: number, a: Point, b: Point, c: Point): Point {
    return LerpPoint(t, LerpPoint(t, a, b), LerpPoint(t, b, c));
}

/*
@summary get a point between two points depending on T
@param number t the time between 0 and 1
@param Point a start point
@param Point b end point
 */
export function LerpPoint(t: number, a: Point, b: Point) {
    return {x: a.x * (1 - t) + b.x * t, y: a.y * (1 - t) + b.y * t} as Point;
}

/*
@summary get a point along the 3 point Bézier curve
@param number t the time between 0 and 1
@param Point a start point
@param Point b first interpolation point, will not be crossed
@param Point c second interpolation point, will not be crossed
@param Point d end point
 */
export function CubicBezierPathPoint(t: number, a: Point, b: Point, c: Point, d: Point) {
    return LerpPoint(t,
        QuadraticBezierPathPoint(t, a, b, c),
        QuadraticBezierPathPoint(t, b, c, d)
    );
}

/*
@summary a 3 Point Bézier curve
@param Point a start point
@param Point b first interpolation point, will not be crossed
@param Point c second interpolation point, will not be crossed
@param Point d end point
@param number precision the amount of steps being taken higher = smoother & more expensive
 */
export function CubicBezierPath(a: Point, b: Point, c: Point, d: Point, precision: number = 8): SimplePath {
    let step = 1 / (precision - 1)
    return {points: new Array(precision).fill({x:0,y:0}).map((v, index) => CubicBezierPathPoint(step * index, a, b, c, d))}
}