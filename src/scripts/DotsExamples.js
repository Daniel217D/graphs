export default class DotsExamples {
    constructor(dots) {
        this.dots = dots;
    }

    demo1 = () => {
        this.dots.clear();
        this.dots.addDots([
            [50, 150], [200, 150], [200, 300], [75, 350], [300, 350],
            [300, 50], [300, 150], [350, 200], [300, 250], [100, 250]
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