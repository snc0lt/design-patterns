/** 
 * The Memento pattern provides temporary storage as well as restoration of an object. 
 * The mechanism in which you store the object’s state depends on the required duration of persistence, which may vary.
 */

/** Using MEMENTO 
 * 
 * You could view a database as an implementation of the Memento design pattern in which objects are persisted and restored. 
 * However, the most common reason for using this pattern is to capture a snapshot of an object’s state so that any subsequent changes can be undone easily if necessary.
 * Essentially, a Memento is a small repository that stores an object’s state. 
 * Scenarios in which you may want to restore an object into a state that existed previously include: 
 * saving and restoring the state of a player in a computer game or the implementation of an undo operation in a database.

 * In JavaScript Mementos are easily implemented by serializing and de-serializing objects with JSON
*/

/** EXAMPLE 
 * The example code creates two persons named Mike and John are created using the Person constructor function. 
 * Next, their mementos are created which are maintained by the CareTaker object.
 * 
 * We assign Mike and John bogus names before restoring them from their mementos. 
 * Following the restoration we confirm that the person objects are back to their original state with valid names.
 * 
 * The Memento pattern itself with CareTaker etc. is rarely used in JavaScript. 
 * However, JSON is a highly effective data format that is extremely useful in many different data exchange scenarios.
*/

const Person = function (name, street, city, state) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
}

Person.prototype = {

    hydrate: function () {
        let memento = JSON.stringify(this);
        return memento;
    },

    dehydrate: function (memento) {
        let m = JSON.parse(memento);
        this.name = m.name;
        this.street = m.street;
        this.city = m.city;
        this.state = m.state;
    }
}

const CareTaker = function () {
    this.mementos = {};

    this.add = function (key, memento) {
        this.mementos[key] = memento;
    },

        this.get = function (key) {
            return this.mementos[key];
        }
}

function run() {

    let mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
    let john = new Person("John Wang", "48th Street", "San Jose", "CA");
    let caretaker = new CareTaker();

    // save state

    caretaker.add(1, mike.hydrate());
    caretaker.add(2, john.hydrate());

    // mess up their names

    mike.name = "King Kong";
    john.name = "Superman";

    // restore original state

    mike.dehydrate(caretaker.get(1));
    john.dehydrate(caretaker.get(2));

    console.log(mike.name);
    console.log(john.name);
}
