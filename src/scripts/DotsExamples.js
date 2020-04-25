export default class DotsExamples {
    constructor(dots) {
        this.dots = dots;
    }

    demo1 = () => {
        this.dots.clear();
        this.dots.addDots([
            [300, 300], [600, 300], [600, 600], [350, 700], [800, 700],
            [800, 200], [800, 300], [900, 400], [800, 500], [200, 500]
        ]);
        this.dots.addPaths([
            [1, 2], [1, 10], [1, 4], [2, 3], [3, 2], [3, 5], [3, 4],
            [2, 4], [5, 2], [5, 4], [6, 2], [6, 7], [7, 8], [8, 5], [8, 9],
            [9, 5], [10, 4]
        ]);
    };

    demo2 = () => {
        this.dots.clear();
        this.dots.addDots([[300, 300], [600, 300], [600, 600], [300, 600]]);
        this.dots.addPaths([[1, 2], [1, 3], [1, 4], [2, 1], [3, 1], [4, 3]]);
    };
}