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
        this.dots.forEach(({paths}) => paths.forEach((path, i) => path.id === id ? delete paths[i] : ''))
    };

    clear = () => this.dots = [];

    print = () => {
        this.dots.forEach(dot => dot.printPaths(this.$gcanvas));
        this.dots.forEach(dot => dot.printDot(this.$gcanvas));
    };

    internal_stability = (maximal = false) => {
        maximal = !maximal;
        if (this.dots.length === 0) return []; // если граф пустой возвращаем пустой массив

        let disjunctions = []; // массив парных дизъюнкций
        let conjunctions = []; // массив днф
        let conjunctions_temp = []; // провемежуточный массив с переменными входящими в одну из конъюнкций днф
        let dots_ids = this.dots.map(({id}) => id); // массив id точек

        // составляется массив парных дизъюнкций
        this.dots.forEach(dot => dot.paths.forEach(path => disjunctions.push([dot.id, path.id])));

        // если в массиве нет ребер, возвращаем массив со всеми вершинами
        if (disjunctions.length === 0) return [dots_ids.map(id => id)];

        // убираем дизъюнкии отличающееся положением переменных
        // [[1,2],[2,3],[2,1]] => [[1,2],[2,3]]
        disjunctions.forEach(pair => {
            let index = disjunctions.findIndex(next_pair => next_pair[0] === pair[1] && next_pair[1] === pair[0]);
            if (index >= 0) {
                disjunctions.splice(index, 1);
            }
        });

        /*
        rec_conjunction_min_length - переменная для минимальной длины отдельной конъюнкций
        требуется найти минимальные по длине дизъюнкции, чтобы затем их инвертировать
        и получить наборы с максимальным количеством независимых вершин
        */
        let rec_conjunction_min_length = this.dots.length;

        // рекурсивная функция для приведения массива парных дизъюнкций к массиву днф
        const rec_conjunction = (array, index = 0) => {
            let wasSuchEl;
            //Если дошли до последней пары дизъюнкций ...
            if (array.length - 1 === index) {
                //Цикл перебирает левую и правую переменную (id вершин) в паре дизъюнкции
                array[index].forEach(el => {
                    // Проверка, есть ли переменная в промежуточной конъюнкции
                    wasSuchEl = conjunctions_temp.includes(el);
                    // Провека на то что провемежуточный массив содержит не больше вершин чем минимум
                    // Учитывая включение/невключение переменной el
                    if (maximal || conjunctions_temp.length + !wasSuchEl <= rec_conjunction_min_length) {
                        // Если промежуточный массив в итоге получился короче, то
                        // выставляем новую минимальную длину и обнуляем массив днф
                        if (!maximal && conjunctions_temp.length + !wasSuchEl < rec_conjunction_min_length) {
                            rec_conjunction_min_length = conjunctions_temp.length + !wasSuchEl;
                            conjunctions = [];
                        }
                        // В переменную помещается все элементы массива conjunctions_temp и переменая el если её нет в массиве
                        const push = wasSuchEl ? [...conjunctions_temp] : [...conjunctions_temp, el];
                        // Проверка, что такого набора вершин еще нет в днф
                        // Если массив push не совпадает со всеми массивом в conjunctions, то...
                        const canPush = !conjunctions.some(dis => dis.every(d => push.includes(d)));
                        // Добавляем его в conjunctions (днф)
                        if (canPush) conjunctions.push(push);
                    }
                });
            } else {// Иначе
                //Цикл перебирает левую и правую переменную (id вершин) в паре дизъюнкции
                array[index].forEach(el => {
                    // Проверка, есть ли переменная в промежуточной конъюнкции
                    wasSuchEl = conjunctions_temp.includes(el);
                    // Провека на то что провемежуточный массив содержит не больше вершин чем минимум
                    // Учитывая включение/невключение переменной el
                    if (maximal || conjunctions_temp.length + !wasSuchEl <= rec_conjunction_min_length) {
                        //Если переменной el не было добавляем
                        if (!wasSuchEl) conjunctions_temp.push(el);
                        //Продолжаем рекурсию
                        rec_conjunction(array, index + 1);
                        //Если переменная el была убираем
                        if (!wasSuchEl) conjunctions_temp.pop();
                    }
                });
            }
        };
        //Запуск функции
        rec_conjunction(disjunctions);

        return conjunctions
            .map(dis => dots_ids.filter(id => dis.findIndex(el => el === id) === -1)) // инвертирование полученных вершин
            .reverse(); // располагаем точки по возрастанию id первой вершины
    };

    external_stability = (minimal = false) => {
        if (this.dots.length === 0) return []; // если граф пустой возвращаем пустой массив

        let disjunctions = []; // массив дизъюнкций
        let conjunctions = []; // массив днф
        let conjunctions_temp = []; // провемежуточный массив с переменными входящими в одну из конъюнкций днф
        let dots_ids = this.dots.map(({id}) => id); // массив id точек

        // составляется массив парных дизъюнкций
        this.dots.forEach(dot => disjunctions.push([dot.id, ...dot.paths.map(path => path.id)]));

        // если в массиве нет ребер, возвращаем массив со всеми вершинами
        if (disjunctions.length === 0) return [dots_ids.map(id => id)];

        // убираем дизъюнкии отличающееся положением переменных
        disjunctions.forEach((conj, index, array) => {
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
                //Цикл перебирает  переменные (id вершин) в ююю
                array[index].forEach(el => {
                    // Проверка, есть ли переменная в промежуточной конъюнкции
                    wasSuchEl = conjunctions_temp.includes(el);
                    // В переменную помещается все элементы массива conjunctions_temp и переменая el если её нет в массиве
                    const push = wasSuchEl ? [...conjunctions_temp] : [...conjunctions_temp, el];
                    // Проверка, что такого набора вершин еще нет в днф
                    // Если массив push не совпадает со всеми массивом в conjunctions, то...
                    const canPush = !conjunctions.some(dis => push.length >= dis.length && dis.every(d => push.includes(d)));
                    // Добавляем его в conjunctions (днф)
                    if (canPush) {
                        conjunctions = conjunctions.filter(dis => dis.length <= push.length || !push.every(p => dis.includes(p)));
                        conjunctions.push(push);
                    }
                });
            } else {// Иначе
                //Цикл перебирает левую и правую переменную (id вершин) в ююю
                array[index].forEach(el => {
                    // Проверка, есть ли переменная в промежуточной конъюнкции
                    wasSuchEl = conjunctions_temp.includes(el);
                    //Если переменной el не было добавляем
                    if (!wasSuchEl) conjunctions_temp.push(el);
                    //Продолжаем рекурсию
                    rec_conjunction(array, index + 1);
                    //Если переменная el была убираем
                    if (!wasSuchEl) conjunctions_temp.pop();
                });
            }
        };

        //Запуск функции
        rec_conjunction(disjunctions);

        if(minimal) {
            const min = conjunctions.reduce((min, arr) => arr.length < min ? arr.length : min, conjunctions[0].length);

            return conjunctions.filter(dis => dis.length === min);
        } else {
            return  conjunctions;
        }

    };

    cores = () => {
        const internal = this.internal_stability();
        const external = this.external_stability();

        const max_internal = internal.reduce((min, arr) => arr.length < min ? arr.length : min, internal[0].length);
        const min_external = internal.reduce((min, arr) => arr.length < min ? arr.length : min, internal[0].length);
        if(max_internal < min_external) {
            return [];
        }

        let cores = [];

        internal.forEach(int => {
            if (external.some(ext => ext.length === int.length && ext.every(x => int.includes(x)))) {
                cores.push(int);
            }
        });

        return cores;
    };
}