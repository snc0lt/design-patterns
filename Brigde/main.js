/**
 * The Bridge pattern allows two components, a client and a service, to work together with each component having its own interface.
 * Bridge is a high-level architectural pattern and its main goal is to write better code through two levels of abstraction. 
 * It facilitates very loose coupling of objects. It is sometimes referred to as a double Adapter pattern.
 */

/**
 * An example of the Bridge pattern is an application (the client) and a database driver (the service). 
 * The application writes to a well-defined database API, for example ODBC, 
 * but behind this API you will find that each driver's implementation is totally different for each database vendor (SQL Server, MySQL, etc.).
 */

/**
 * Example
 * 
 * The objective of the example is to show that with the Bridge pattern input and output devices can vary independently (without changes to the code); 
 * the devices are loosely coupled by two levels of abstraction.
 * 
 * JavaScript does not support abstract classes therefore Abstraction and Implementor are not included. However, 
 * their interfaces (properties and methods) are consistently implemented in RefinedAbstraction and ConcreteImplementor. 
 * In our example code the Abstraction represents Input devices and the Implementor represents Output devices
 * 
 * Gestures (finger movements) and the Mouse are very different input devices, 
 * but their actions map to a common set of output instructions: click, move, drag, etc. 
 * Screen and Audio are very different output devices, but they respond to the same set of instructions.
 * Of course, the effects are totally different, that is, video updates vs. sound effects. 
 * The Bridge pattern allows any input device to work with any output device.
 */


// input devices

const Gestures = function (output) {
    this.output = output;

    this.tap = function () { this.output.click(); }
    this.swipe = function () { this.output.move(); }
    this.pan = function () { this.output.drag(); }
    this.pinch = function () { this.output.zoom(); }
};

const Mouse = function (output) {
    this.output = output;

    this.click = function () { this.output.click(); }
    this.move = function () { this.output.move(); }
    this.down = function () { this.output.drag(); }
    this.wheel = function () { this.output.zoom(); }
};

// output devices

const Screen = function () {
    this.click = function () { console.log("Screen select"); }
    this.move = function () { console.log("Screen move"); }
    this.drag = function () { console.log("Screen drag"); }
    this.zoom = function () { console.log("Screen zoom in"); }
};

const Audio = function () {
    this.click = function () { console.log("Sound oink"); }
    this.move = function () { console.log("Sound waves"); }
    this.drag = function () { console.log("Sound screetch"); }
    this.zoom = function () { console.log("Sound volume up"); }
};

function run() {

    const screen = new Screen();
    const audio = new Audio();

    const hand = new Gestures(screen);
    const mouse = new Mouse(audio);

    hand.tap();
    hand.swipe();
    hand.pinch();

    mouse.click();
    mouse.move();
    mouse.wheel();
}
