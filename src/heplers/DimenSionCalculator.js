export function calculateWeight(length, breadth, height, density) {
    var volume = length * breadth * height;
    var weight = density * volume;
    return weight;
}

// Example usage:
var length = 5;
var breadth = 3;
var height = 2;
var density = 10; // density of the material

var result = calculateWeight(length, breadth, height, density);
