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
        if(d1 === undefined || d2 === undefined) {
            console.warn("Dots::addPath", d1, d2);
            return;
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
        if(this.dots.length === 0) return false; // если граф пустой возвращаем false

        let conjunctions = [];
        let disjunctions_temp = [];
        let disjunctions = [];
        let dots_ids = this.dots.map(({id}) => id);

        this.dots.forEach(dot => dot.paths.forEach(path => conjunctions.push([dot.id, path.id])));

        if(conjunctions.length === 0) return dots_ids.map(id => [id]); // если в массиве нет ребер, возвращаем все точки

        conjunctions.forEach(pair => {
            let index = conjunctions.findIndex(next_pair => next_pair[0] === pair[1] && next_pair[1] === pair[0]);
            if (index >= 0) {
                conjunctions.splice(index, 1);
            }
        });

        let rec_conjunction_min_length = this.dots.length;

        const rec_conjunction = (array, index = 0) => {
            let wasSuchEl;
            if (array.length - 1 === index) {
                array[index].forEach(el => {
                    wasSuchEl = disjunctions_temp.includes(el);

                    if (disjunctions_temp.length + !wasSuchEl <= rec_conjunction_min_length) {
                        // console.log("/");
                        if (disjunctions_temp.length + !wasSuchEl < rec_conjunction_min_length) {
                            // console.log(disjunctions_temp.length + !wasSuchEl, rec_conjunction_min_length, "!");
                            rec_conjunction_min_length = disjunctions_temp.length + !wasSuchEl;
                            disjunctions = [];
                        }
                        const push = wasSuchEl ? [...disjunctions_temp] : [...disjunctions_temp, el];
                        const canPush = !disjunctions.some(dis => dis.every(d => push.includes(d)));
                        if (canPush) disjunctions.push(push);
                    }
                });
            } else {
                array[index].forEach(el => {
                    wasSuchEl = disjunctions_temp.includes(el);
                    if(disjunctions_temp.length + !wasSuchEl<= rec_conjunction_min_length) {
                        if(!wasSuchEl) disjunctions_temp.push(el);
                        rec_conjunction(array, index + 1);
                        if(!wasSuchEl) disjunctions_temp.pop();
                    }
                });
            }
        };
        console.time("maximal_independent_set-multiply");
        rec_conjunction(conjunctions);
        console.timeEnd("maximal_independent_set-multiply");
        return disjunctions
             .map(dis => dots_ids.filter(id => dis.findIndex(el => el === id) === -1)) // инвертирование полученных вершин
            .reverse(); // располагаем точки по возрастанию id первой вершины\
    };

    maximal_independent_set2 = () => {
        if (this.dots.length === 0) return false; // если граф пустой возвращаем false

        let conjunctions = [];
        let helper = []; //TODO rename
        const dots_ids = this.dots.map(({id}) => id);

        this.dots.forEach(dot => dot.paths.forEach(path => conjunctions.push([dot.id, path.id])));

        if (conjunctions.length === 0) return dots_ids.map(id => [id]); // если в массиве нет ребер, возвращаем все точки

        conjunctions.forEach(pair => {
            let index = conjunctions.findIndex(next_pair => next_pair[0] === pair[1] && next_pair[1] === pair[0]);
            if (index >= 0) {
                conjunctions.splice(index, 1);
            }
        });


        const rec = (array, index = 0) => {
            if (array.length - 1 === index) {
                helper = [[array[index][0]], [array[index][1]]];
                return;
            }

            rec(array, index + 1);


            let temp = [
                ...helper.map(dis => dis.includes(array[index][0]) ? [...dis] : [array[index][0], ...dis]),
                ...helper.map(dis => dis.includes(array[index][1]) ? [...dis] : [array[index][1], ...dis]),
            ];

            helper= [];
            for (let i = 0; i < temp.length; i++) {
                if (!Array.isArray(temp[i])) continue;

                for (let j = i + 1; j < temp.length; j++) {
                    if (Array.isArray(temp[j]) && temp[i].length === temp[j].length && temp[j].every(el => temp[i].includes(el))) {
                        temp[j] = false;
                    }
                }

                helper.push(temp[i]);
            }
        };
        console.time("rec");
        rec(conjunctions);
        console.timeEnd("rec");

        const min_length = helper.reduce((min, arr) => arr.length < min ? arr.length : min, helper[0].length);
        return helper.filter(arr => arr.length === min_length)
            .map(dis => dots_ids.filter(id => dis.findIndex(el => el === id) === -1)) // инвертирование полученных вершин
            .reverse(); // располагаем точки по возрастанию id первой вершины

    };
}