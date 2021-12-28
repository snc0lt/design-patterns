/**
 * The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects efficiently. 
 * Shared flyweight objects are immutable, that is, they cannot be changed as they represent the characteristics that are shared with other objects.
 * 
 * Essentially Flyweight is an 'object normalization technique' in which common properties are factored out into shared flyweight objects. (Note: the idea is similar to data model normalization, a process in which the modeler attempts to minimize redundancy).
 * An example of the Flyweight Pattern is within the JavaScript engine itself which maintains a list of immutable strings that are shared across the application
 * 
 * Other examples include characters and line-styles in a word processor, or 'digit receivers' in a public switched telephone network application. You will find flyweights mostly in utility type applications such as word processors, graphics programs, and network apps; they are less often used in data-driven business type applications.
 */

/**
 * In our example code we are building computers. Many models, makes, and processor combinations are common, so these characteristics are factored out and shared by Flyweight objects.

The FlyweightFactory maintains a pool of Flyweight objects. When requested for a Flyweight object the FlyweightFactory will check if one already exists; if not a new one will be created and stored for future reference. All subsequent requests for that same computer will return the stored Flyweight object.

Several different computers are added to a ComputerCollection. At the end we have a list of 7 Computer objects that share only 2 Flyweights. These are small savings, but with large datasets the memory savings can be significant.
 */


 function Flyweight(make, model, processor) {
    this.make = make;
    this.model = model;
    this.processor = processor;
};

const FlyWeightFactory = (function () {
    let flyweights = {};

    return {

        get: function (make, model, processor) {
            if (!flyweights[make + model]) {
                flyweights[make + model] =
                    new Flyweight(make, model, processor);
            }
            return flyweights[make + model];
        },

        getCount: function () {
            let count = 0;
            for (let f in flyweights) count++;
            return count;
        }
    }
})();

function ComputerCollection() {
    let computers = {};
    let count = 0;

    return {
        add: function (make, model, processor, memory, tag) {
            computers[tag] =
                new Computer(make, model, processor, memory, tag);
            count++;
        },

        get: function (tag) {
            return computers[tag];
        },

        getCount: function () {
            return count;
        }
    };
}

const Computer = function (make, model, processor, memory, tag) {
    this.flyweight = FlyWeightFactory.get(make, model, processor);
    this.memory = memory;
    this.tag = tag;
    this.getMake = function () {
        return this.flyweight.make;
    }
}

function run() {
    let computers = new ComputerCollection();

    computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
    computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
    computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
    computers.add("HP", "Envy", "Intel", "2G", "TXU003283");

    console.log("Computers: " + computers.getCount());
    console.log("Flyweights: " + FlyWeightFactory.getCount());
}
