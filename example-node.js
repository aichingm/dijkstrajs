/*global require*/
/*global console*/

var DIJKSTRA = require("./src/dijkstra.js");

var graph1 = new DIJKSTRA.Dijkstra({a: {b: 2}, b: {a: 3, c: 48}, c: {b: 4}});
console.log(graph1.getPath("a", "c"));
console.log(graph1);

var graph2 = new DIJKSTRA.Dijkstra({
    "Frankfurt": {"Kassel": 173, "Mannheim": 85, "Würzburg": 217},
    "Mannheim": {"Frankfurt": 85, "Karlsruhe": 80},
    "Karlsruhe": {"Mannheim": 80, "Augsburg": 250},
    "Augsburg": {"Karlsruhe": 250, "München": 84},
    "München": {"Augsburg": 84, "Kassel": 502, "Nürnberg": 167},
    "Kassel": {"Frankfurt": 173, "München": 502},
    "Nürnberg": {"Würzburg": 103, "München": 167, "Stuttgart": 183},
    "Stuttgart": {"Nürnberg": 183},
    "Erfurt": {"Würzburg": 186},
    "Würzburg": {"Erfurt": 186, "Nürnberg": 103, "Frankfurt": 217},
    "Wien": {}
});
console.log(graph2.getPath("Frankfurt", "München"));

console.log(graph2.getPath("München", "Mannheim"));

try{
    graph2.getPath("Frankfurt", "Wien");
}catch (e){
    console.log(e);
}
console.log(graph2);