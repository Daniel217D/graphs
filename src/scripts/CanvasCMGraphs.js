import {CanvasCM} from 'canvas-chaining-method';
import {defaults} from './Dot';
import {direction, angle, angleToDirection} from './helpers';

class CanvasCMGraphs extends CanvasCM {
    gArrow = (sx, sy, ex, ey, r = defaults.r) => {
        const SIZE = 20;

        const dir = direction(sx, sy, ex, ey);
        const sxArrow = ex - dir.x * r;
        const syArrow = ey - dir.y * r;
        const exArrow = ex - dir.x * 2 * SIZE;
        const eyArrow = ey - dir.y * 2 * SIZE;

        const arrow1 = angleToDirection(angle(sxArrow, syArrow, exArrow, eyArrow) - ( 30 * Math.PI / 180));
        const arrow2 = angleToDirection(angle(sxArrow, syArrow, exArrow, eyArrow) + ( 30 * Math.PI / 180));

        return this.gLine(sx, sy, ex, ey)
            .gLine(sxArrow, syArrow, sxArrow + arrow1.x * SIZE , syArrow + arrow1.y * SIZE)
            .gLine(sxArrow, syArrow, sxArrow + arrow2.x * SIZE, syArrow + arrow2.y * SIZE);
    };

    gLine = (sx, sy, ex, ey) => {
        return this.beginPath()
            .line(sx, sy, ex, ey)
            .closePath()
            .stroke();
    };

    gDot = (x, y, r = defaults.r, color = defaults.color, text = "") => {
        return this.save()
            .beginPath()
            .set({
                "fillStyle": "white",
                "strokeStyle": color,
                "font": "30px Arial",
                "textAlign": "center"
            })
            .circle(x, y, r)
            .stroke()
            .fill()
            .set("fillStyle", color)
            .fillText(text, x, y + r / 4)
            .closePath()
            .restore();
    };
}

const $cg = (canvas) => {
    return new CanvasCMGraphs(canvas);
};

export default $cg;
export {CanvasCMGraphs};