export default class DotsExamples {
    constructor(dots) {
        this.dots = dots;
    }

    demo1 = () => {
        dots.add(300, 300); //1
        dots.add(600, 300);
        dots.add(600, 600);
        dots.add(350, 700);
        dots.add(800, 700); //5
        dots.add(800, 200);
        dots.add(800, 300);
        dots.add(900, 400);
        dots.add(800, 500);
        dots.add(200, 500); //10
        dots.addPath(1,2);
        dots.addPath(1,10);
        dots.addPath(1,4);
        dots.addPath(2,3);
        dots.addPath(3,2);
        dots.addPath(3,5);
        dots.addPath(3,4);
        dots.addPath(2,4);
        dots.addPath(5,2);
        dots.addPath(5,4);
        dots.addPath(6,2);
        dots.addPath(6,7);
        dots.addPath(7,8);
        dots.addPath(8,5);
        dots.addPath(8,9);
        dots.addPath(9,5);
        dots.addPath(10,4);
    }
}