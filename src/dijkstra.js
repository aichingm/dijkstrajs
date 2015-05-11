Dijkstra = function (map) {
    this.map = map;
    this.data = new DijkstraWorkingData(map);
    this.getPath = function (start, end) {
        this.data.distance[start] = 0;
        while (this.data.set.length !== 0) {
            var u = this.data.getVertexWithMinDistance();
            this.data.removeFromSet(u);
            for (var v in this.map[u]) {
                if (this.data.inSet(v)) {
                    this.updateDistance(u, v);
                }
            }
        }
        return this.buildPath(end);
    };
    this.updateDistance = function (u, v) {
        var alternative = this.data.distance[u] + this.map[u][v];
        if (alternative < this.data.distance[v]) {
            this.data.distance[v] = alternative;
            this.data.previous[v] = u;
        }
    };
    this.buildPath = function (end) {
        var path = [end];
        var u = end;
        while (this.data.previous[u]) {
            u = this.data.previous[u];
            path.push(u);
        }
        return path.reverse();
    };
    return this;
};
DijkstraWorkingData = function (map, startVertex) {
    this.distance = [];
    this.previous = [];
    this.vertices = [];
    this.set = [];
    for (var v in map) {
        this.distance[v] = Number.MAX_VALUE;
        this.previous[v] = undefined;
        this.set.push(v);
    }
    this.getVertexWithMinDistance = function () {
        var minVertex = this.set[0];
        var minVal = Number.MAX_VALUE;
        for (var i in this.set) {
            var v = this.set[i];
            if (this.distance[v] < minVal) {
                minVal = this.distance[v];
                minVertex = v;
            }
        }
        return minVertex;
    };
    this.removeFromSet = function (vertex) {
        for (var i in this.set) {
            var v = this.set[i];
            if (v === vertex) {
                var i = this.set.indexOf(v);
                if (i !== -1) {
                    this.set.splice(i, 1);
                }
            }
        }
    };
    this.inSet = function (vertex) {
        return this.set.indexOf(vertex) !== -1;
    };
    return this;
};




var graph = new Dijkstra({a: {b: 2}, b: {a: 3, c: 48}, c: {b: 4}});
var graph = new Dijkstra({
    "Frankfurt": {"Kassel": 173, "Mannheim": 85, "Würzburg": 217},
    "Mannheim": {"Frankfurt": 85, "Karlsruhe": 80},
    "Karlsruhe": {"Mannheim": 80, "Augsburg": 250},
    "Augsburg": {"Karlsruhe": 250, "München": 84},
    "München": {"Augsburg": 84, "Kassel": 502, "Nürnberg": 167},
    "Kassel": {"Frankfurt": 173, "München": 502},
    "Nürnberg": {"Würzburg": 103, "München": 167, "Stuttgart": 183},
    "Stuttgart": {"Nürnberg": 183},
    "Erfurt": {"Würzburg": 186},
    "Würzburg": {"Erfurt": 186, "Nürnberg": 103, "Frankfurt": 217}
});


console.log(graph.getPath("Frankfurt", "München"));
console.log(graph);

