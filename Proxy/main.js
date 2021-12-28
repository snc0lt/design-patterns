/**PROXY
 * The Proxy pattern provides a surrogate or placeholder object for another object and controls access to this other object.
 */

/** USING PROXY
 * In object-oriented programming, objects do the work they advertise through their interface (properties and methods). 
 * Clients of these objects expect this work to be done quickly and efficiently. 
 * However, there are situations where an object is severely constrained and cannot live up to its responsibility. 
 * Typically this occurs when there is a dependency on a remote resource (resulting in network latency) or when an object takes a long time to load.
 * 
 * In situations like these you apply the Proxy pattern and create a proxy object that ‘stands in’ for the original object. 
 * The Proxy forwards the request to a target object. 
 * The interface of the Proxy object is the same as the original object and clients may not even be aware they are dealing with a proxy rather than the real object
 */

/** EXAMPLE
 * 
 * The GeoCoder object simulates the Google Maps Geocoding service. 
 * In geocoding you provide a location (a place on the earth) and it will return its latitude/longitude (latlng). 
 * Our GeoCoder can resolve only 4 locations, but in reality there are millions, because it involves countries, cities, and streets.
 * 
 * The programmer decided to implement a Proxy object because GeoCoder is relatively slow. 
 * The proxy object is called GeoProxy. It is known that many repeated requests (for the same location) are coming in. 
 * To speed things up GeoProxy caches frequently requested locations. 
 * If a location is not already cached it goes out to the real GeoCoder service and stores the results in cache.
 * 
 * Several city locations are queried and many of these are for the same city. 
 * GeoProxy builds up its cache while supporting these calls. At the end GeoProxy< has processed 11 requests but had to go out to GeoCoder only 3 times. 
 * Notice that the client program has no knowledge about the proxy object (it calls the same interface with the standard getLatLng method).
 */

 function GeoCoder() {

    this.getLatLng = function (address) {

        if (address === "Amsterdam") {
            return "52.3700° N, 4.8900° E";
        } else if (address === "London") {
            return "51.5171° N, 0.1062° W";
        } else if (address === "Paris") {
            return "48.8742° N, 2.3470° E";
        } else if (address === "Berlin") {
            return "52.5233° N, 13.4127° E";
        } else {
            return "";
        }
    };
}

function GeoProxy() {
    let geocoder = new GeoCoder();
    let geocache = {};

    return {
        getLatLng: function (address) {
            if (!geocache[address]) {
                geocache[address] = geocoder.getLatLng(address);
            }
            console.log(address + ": " + geocache[address]);
            return geocache[address];
        },
        getCount: function () {
            let count = 0;
            for (let code in geocache) { count++; }
            return count;
        }
    };
};

function run() {

    let geo = new GeoProxy();

    // geolocation requests

    geo.getLatLng("Paris");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("London");
    geo.getLatLng("London");

    console.log("\nCache size: " + geo.getCount());
    
}
