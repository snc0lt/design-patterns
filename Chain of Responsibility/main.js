/** CHAIN ON RESPONSIBILITY 
 * 
 * The Chain of Responsibility pattern provides a chain of loosely coupled objects one of which can satisfy a request. 
 * This pattern is essentially a linear search for an object that can handle a particular request.
*/

/**USING CHAIN OF RESPONSIBILITY
 * 
 * An example of a chain-of-responsibility is event-bubbling in which an event propagates through a series of nested controls one of which may choose to handle the event.
 * The Chain of Responsiblity patterns is related to the Chaining Pattern which is frequently used in JavaScript (jQuery makes extensive use of this pattern).
 */

/**EXAMPLE
 * 
 * This example differs slightly from the classic Chain of Responsibility pattern in that not one, but all handlers participate in handling the request.
 * The code demonstrates an elegant solution to a money dispensing machine problem. Say, a customer requires $378 from an ATM machine. 
 * What is the combination of bank notes ($100, $50, $20, $10, $5, $1) that satisfies that request?
 * 
 * A Request is created with the amount requested. Next, a series of get calls are chained together, each one handling a particular denomination. 
 * Each handler determines the number of bank notes dispensed and substracts this amount from the remaining amount. 
 * The request object is passed through the chain by returning this in the get method.
 */


const Request = function (amount) {
    this.amount = amount;
    console.log("Requested: $" + amount + "\n");
}

Request.prototype = {
    get: function (bill) {
        let count = Math.floor(this.amount / bill);
        this.amount -= count * bill;
        console.log("Dispense " + count + " $" + bill + " bills");
        return this;
    }
}
function run() {
    let request = new Request(378);

    request.get(100).get(50).get(20).get(10).get(5).get(1);
}
