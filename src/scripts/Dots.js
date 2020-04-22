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
        let conjunctions = [];
        let disjunctions_temp = [];
        let disjunctions = [];
        let dots_ids = this.dots.map(({id}) => id);

        this.dots.forEach(dot => dot.paths.forEach(path => conjunctions.push([dot.id, path.id])));

        conjunctions.forEach(pair => {
            let index = conjunctions.findIndex(next_pair => next_pair[0] === pair[1] && next_pair[1] === pair[0]);
            if(index >= 0) {
                conjunctions.splice(index, 1);
            }
        });

        const rec_conjunction = (array, index = 0) => {
                    if(array.length - 1 === index) {
                         array[index].forEach(el => disjunctions.push([...disjunctions_temp, el]))
                    } else {
                        array[index].forEach(el => {
                            disjunctions_temp.push(el);
                            rec_conjunction(array, index + 1);
                            disjunctions_temp.pop();
                        });
                    }
        };

        rec_conjunction(conjunctions);

        let min_length = disjunctions
            .map((dis, i, array) => array[i]  = [...new Set(dis)])
            .reduce((min, current) => current.length < min || min === -1 ? current.length : min, -1);

        return disjunctions
            .filter(dis => dis.length === min_length)
            .map(dis => dots_ids.filter(id => dis.findIndex(el => el === id) === -1));
    }
}