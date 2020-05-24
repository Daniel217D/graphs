import {distance} from "./helpers";
import Dot, {defaults} from './Dot';

export default class Dots {
    constructor($gcanvas) {
        this.$gcanvas = $gcanvas;
    }

    dots = [];

    getIndexById = (id) => {
        return this.dots.findIndex(dot => dot.id === id);
    };

    getDotById = (id) => this.dots[this.getIndexById(id)];

    getByCoordinates = (x, y, more = {}) => {
        more = Object.assign({r: defaults.r, except: []}, more);
        return this.dots.find(dot => distance(x, y, dot.x, dot.y) <= dot.r + more.r && !more.except.includes(dot.id));
    };

    getLastId = () => this.dots[this.dots.length - 1]?.id || 0;

    add = (...vars) => {
        const dot = new Dot(this.getLastId() + 1, ...vars);
        this.dots.push(dot);
        return dot;
    };

    addDots = (arr) => arr.forEach(args => this.add(...args));

    addPath = (d1, d2) => {
        if (Number.isInteger(d1)) {
            d1 = this.getDotById(d1);
        }

        if (Number.isInteger(d2)) {
            d2 = this.getDotById(d2);
        }
        if (d1 === undefined || d2 === undefined) {
            console.warn("Dots::addPath", d1, d2);
            return;
        }

        if (d1.id === d2.id || !d1.paths.every(dot => dot.id !== d2.id)) {
            return;
        }

        d1.addPath(d2);
    };

    addPaths = (arr) => arr.forEach(args => this.addPath(...args));

    remove = (id) => {
        this.dots.splice(this.getIndexById(id), 1);
    };

    clear = () => this.dots = [];

    print = () => {
        this.dots.forEach(dot => dot.printPaths(this.$gcanvas));
        this.dots.forEach(dot => dot.printDot(this.$gcanvas));
    };

    maximal_internal_stability = () => {
        if (this.dots.length === 0) return []; // если граф пустой возвращаем пустой массив

        let conjunctions = []; // массив парных дизъюнкций
        let disjunctions = []; // массив днф
        let disjunctions_temp = []; // провемежуточный массив с переменными входящими в одну из конъюнкций днф
        let dots_ids = this.dots.map(({id}) => id); // массив id точек

        // составляется массив парных дизъюнкций
        this.dots.forEach(dot => dot.paths.forEach(path => conjunctions.push([dot.id, path.id])));

        // если в массиве нет ребер, возвращаем массив со всеми вершинами
        if (conjunctions.length === 0) return [dots_ids.map(id => id)];

        // убираем дизъюнкии отличающееся положением переменных
        // [[1,2],[2,3],[2,1]] => [[1,2],[2,3]]
        conjunctions.forEach(pair => {
            let index = conjunctions.findIndex(next_pair => next_pair[0] === pair[1] && next_pair[1] === pair[0]);
            if (index >= 0) {
                conjunctions.splice(index, 1);
            }
        });

        /*
        переменная для минимальной длины отдельной дизъюнкции
        требуется найти минимальные по длине дизъюнкции, чтобы затем их инвертировать
        и получить наборы с максимальным количеством независимых вершин
        */
        let rec_conjunction_max_length = this.dots.length;

        // рекурсивная функция для приведения массива парных дизъюнкций к массиву днф
        const rec_conjunction = (array, index = 0) => {
            let wasSuchEl;
            //Если дошли до последней пары дизъюнкций ...
            if (array.length - 1 === index) {
                //Цикл переберает левую и правую переменную (id вершин) в паре дизъюнкции
                array[index].forEach(el => {
                    // Проверка, есть ли переменная в промежуточной конъюнкции
                    wasSuchEl = disjunctions_temp.includes(el);
                    // Провека на то что провемежуточный массив содержит не больше вершин чем минимум
                    // Учитывая включение/невключение переменной el
                    if (disjunctions_temp.length + !wasSuchEl <= rec_conjunction_max_length) {
                        // Если промежуточный массив в итоге получился короче, то
                        // выставляем новую минимальную длину и обнуляем массив днф
                        if (disjunctions_temp.length + !wasSuchEl < rec_conjunction_max_length) {
                            rec_conjunction_max_length = disjunctions_temp.length + !wasSuchEl;
                            disjunctions = [];
                        }
                        // В переменную помещается все элементы массива disjunctions_temp и переменая el если её нет в массиве
                        const push = wasSuchEl ? [...disjunctions_temp] : [...disjunctions_temp, el];
                        // Проверка, что такого набора вершин еще нет в днф
                        // Если массив push не совпадает со всеми массивом в disjunctions, то...
                        const canPush = !disjunctions.some(dis => dis.every(d => push.includes(d)));
                        // Добавляем его в disjunctions (днф)
                        if (canPush) disjunctions.push(push);
                    }
                });
            } else {// Иначе
                //Цикл переберает левую и правую переменную (id вершин) в паре дизъюнкции
                array[index].forEach(el => {
                    // Проверка, есть ли переменная в промежуточной конъюнкции
                    wasSuchEl = disjunctions_temp.includes(el);
                    // Провека на то что провемежуточный массив содержит не больше вершин чем минимум
                    // Учитывая включение/невключение переменной el
                    if (disjunctions_temp.length + !wasSuchEl <= rec_conjunction_max_length) {
                        //Если переменной el не было добавляем
                        if (!wasSuchEl) disjunctions_temp.push(el);
                        //Продолжаем рекурсию
                        rec_conjunction(array, index + 1);
                        ////Если переменная el была убираем
                        if (!wasSuchEl) disjunctions_temp.pop();
                    }
                });
            }
        };
        //Запуск функции
        rec_conjunction(conjunctions);

        return disjunctions
            .map(dis => dots_ids.filter(id => dis.findIndex(el => el === id) === -1)) // инвертирование полученных вершин
            .reverse(); // располагаем точки по возрастанию id первой вершины
    };

    minimal_external_stability = () => {
        if (this.dots.length === 0) return []; // если граф пустой возвращаем пустой массив

        let conjunctions = []; // массив дизъюнкций
        let disjunctions = []; // массив днф
        let disjunctions_temp = []; // провемежуточный массив с переменными входящими в одну из конъюнкций днф
        let dots_ids = this.dots.map(({id}) => id); // массив id точек

        // составляется массив парных дизъюнкций
        this.dots.forEach(dot => conjunctions.push([dot.id, ...dot.paths.map(path => path.id)]));

        // если в массиве нет ребер, возвращаем массив со всеми вершинами
        if (conjunctions.length === 0) return [dots_ids.map(id => id)];

        // убираем дизъюнкии отличающееся положением переменных
        conjunctions.forEach((conj, index, array) => {
            for (let i = index + 1; i < array.length; i++) {
                if (array[i].length === conj.length && array[i].every(el => conj.includes(el))) {
                    array.splice(i, 1);
                }
            }
        });

        // рекурсивная функция для приведения массива парных дизъюнкций к массиву днф
        const rec_conjunction = (array, index = 0) => {
            let wasSuchEl;
            //Если дошли до последней пары дизъюнкций ...
            if (array.length - 1 === index) {
                //Цикл переберает  переменные (id вершин) в ююю
                array[index].forEach(el => {
                    // Проверка, есть ли переменная в промежуточной конъюнкции
                    wasSuchEl = disjunctions_temp.includes(el);
                    // В переменную помещается все элементы массива disjunctions_temp и переменая el если её нет в массиве
                    const push = wasSuchEl ? [...disjunctions_temp] : [...disjunctions_temp, el];
                    // Проверка, что такого набора вершин еще нет в днф
                    // Если массив push не совпадает со всеми массивом в disjunctions, то...
                    const canPush = !disjunctions.some(dis => push.length >= dis.length && dis.every(d => push.includes(d)));
                    // Добавляем его в disjunctions (днф)
                    if (canPush) {
                        disjunctions = disjunctions.filter(dis => dis.length <= push.length || !push.every(p => dis.includes(p)));
                        disjunctions.push(push);
                    }
                });
            } else {// Иначе
                //Цикл переберает левую и правую переменную (id вершин) в ююю
                array[index].forEach(el => {
                    // Проверка, есть ли переменная в промежуточной конъюнкции
                    wasSuchEl = disjunctions_temp.includes(el);
                    //Если переменной el не было добавляем
                    if (!wasSuchEl) disjunctions_temp.push(el);
                    //Продолжаем рекурсию
                    rec_conjunction(array, index + 1);
                    //Если переменная el была убираем
                    if (!wasSuchEl) disjunctions_temp.pop();
                });
            }
        };

        //Запуск функции
        rec_conjunction(conjunctions);

        const min = disjunctions.reduce((min, arr) => arr.length < min ? arr.length : min, disjunctions[0].length);

        return disjunctions.filter(dis => dis.length === min);
    };

    cores = () => {
        const internal = this.maximal_internal_stability();
        const external = this.minimal_external_stability();
        const arr = [...internal, ...external];
        let cores = [];

        arr.forEach(a => {
            if(!cores.some(core => core.length === a.length && core.every(c => a.includes(c)))) {
                cores.push(a);
            }
        });

        return cores;
    };
}