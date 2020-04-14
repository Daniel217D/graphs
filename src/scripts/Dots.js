import {distance} from "./helpers";
import Dot, {defaults} from './Dot';

export default class Dots {
    constructor($canvas) {
        this.$canvas = $canvas;
    }

    dots = [];

    getById = (id) => {
        return this.dots.findIndex(dot => dot.id === id);
    };

    getByCoordinates = (x, y, r = defaults.r) => {
        return this.dots.find(dot => distance(x, y, dot.x, dot.y) <= dot.r + r);
    };

    getLastId = () => this.dots[this.dots.length - 1]?.id || 0;

    addWithCheck = (x, y, r = defaults.r, ...vars) => {
        if (this.dots.every(dot => distance(x, y, dot.x, dot.y) > dot.r + r)) {
            const dot = new Dot(this.getLastId() + 1, x, y, r, ...vars);
            this.dots.push(dot);
            return dot;
        }
        return false;
    };

    add = (...vars) => {
        const dot = new Dot(this.getLastId() + 1, ...vars);
        this.dots.push(dot);
        return dot;
    };

    addPath = (d1, d2) => {
        if (Number.isInteger(d1)) {
            d1 = this.getById(d1);
        }

        if (Number.isInteger(d2)) {
            d2 = this.getById(d2);
        }

        if (d1.id === d2.id) {
            return;
        }

        d1.paths.push(d2);
        d2.paths.push(d1);
    };

    removeByCoordinates = (x, y) => {
        this.dots.some(dot => {
            if (distance(x, y, dot.x, dot.y) <= dot.r) {
                this.remove(dot.id);
                return true;
            }
            return false;
        });
    };

    remove = (id) => {
        this.dots.splice(this.getById(id), 1);
    };

    show = () => {
        this.dots.forEach(dot => dot.show(this.$canvas));
    };
}