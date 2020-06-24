import Dots from './Dots';

const STORE_NAME = 'graphs';

export default class Storage {
    constructor(dots) {
        this.dots = dots;

        this.store = window.localStorage.getItem('graphs');
        if (!this.store) {
            this.store = [];
        }

        try {
            this.store = JSON.parse(this.store);
        } catch (e) {
            this.store = [];
        }

        this.update();
    }

    setItem = () => {
        this.store.push(this.dots.map(({id, x, y, paths}) => ({id, x, y, paths: paths.map(({id}) => id)})));
        this.update();
    };

    getItem = (id) => {
        const data = this.store[id];
        if (!data) return false;

        this.dots.clear();
        data.forEach(({x,y}) => this.dots.add(x,y));
        data.forEach(({id, paths}) => paths.forEach(path => this.dots.addPath(id, path)))

        return true
    };

    update = () => {
        window.localStorage.setItem(STORE_NAME, JSON.stringify(this.store));
    };

    clear = () => {
        this.store = [];
        this.update();
    };
}