import {distance} from "./helpers";
import Dot, {defaults} from './Dot';

export default class Dots {
    constructor($gcanvas) {
        this.$gcanvas = $gcanvas;
    }

    dots = [];

    getById = (id) => {
        return this.dots.findIndex(dot => dot.id === id);
    };

    getByCoordinates = (x, y, r = defaults.r) => {
        return this.dots.find(dot => distance(x, y, dot.x, dot.y) <= dot.r + r);
    };

    getLastId = () => this.dots[this.dots.length - 1]?.id || 0;

    add = (...vars) => {
        const dot = new Dot(this.getLastId() + 1, ...vars);
        this.dots.push(dot);
        return dot;
    };

    addPath = (d1, d2) => {
        if (Number.isInteger(d1)) {
            d1 = this.dots[this.getById(d1)];
        }

        if (Number.isInteger(d2)) {
            d2 = this.dots[this.getById(d2)];
        }

        if (d1.id === d2.id || !d1.paths.every(dot => dot.id !== d2.id)) {
            return;
        }

        d1.addPath(d2);
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

    print = () => {
        this.dots.forEach(dot => dot.printPaths(this.$gcanvas));
        this.dots.forEach(dot => dot.printDot(this.$gcanvas));
    };

    maximal_independent_set = () => {
        const conjunctions = [];
        const disjunctions = [];

        this.dots.forEach(dot => dot.paths.forEach(path => conjunctions.push([dot.id, path.id])));

        conjunctions.forEach(pair => {
            let index = conjunctions.findIndex(next_pair => next_pair[0] === pair[1] && next_pair[1] === pair[0]);
            if(index >= 0) {
                conjunctions.splice(index, 1);
            }
        });
        console.log(conjunctions);
        // conjunctions.forEach(left => conjunctions.forEach(right) => )
    }
}