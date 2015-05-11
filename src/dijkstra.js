/*global module*/

var Dijkstra = function (map) {
    "use strict";
    this.getPath = function (start, end) {
        var u, v;
        this.data.distance[start] = 0;
        while (this.data.set.length !== 0) {
            u = this.data.getVertexWithMinDistance();
            this.data.removeFromSet(u);
            for (v in this.map[u]) {
                if (this.map[u].hasOwnProperty(v) && this.data.inSet(v)) {
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
        var path = [end], u = end;
        while (this.data.previous[u]) {
            u = this.data.previous[u];
            path.push(u);
        }
        return path.reverse();
    };
    this.DijkstraWorkingData = function (map) {
        this.distance = [];
        this.previous = [];
        this.set = [];
        this.init = function (map) {
            var v;
            for (v in map) {
                if (map.hasOwnProperty(v)) {
                    this.distance[v] = Number.MAX_VALUE;
                    this.previous[v] = undefined;
                    this.set.push(v);
                }
            }
        };
        this.init(map);
        this.getVertexWithMinDistance = function () {
            var minVertex = this.set[0], minVal = Number.MAX_VALUE, i, v;
            for (i in this.set) {
                if (this.set.hasOwnProperty(i)) {
                    v = this.set[i];
                    if (this.distance[v] < minVal) {
                        minVal = this.distance[v];
                        minVertex = v;
                    }
                }
            }
            return minVertex;
        };
        this.removeFromSet = function (vertex) {
            var i, j;
            for (i in this.set) {
                if (this.set.hasOwnProperty(i) && this.set[i] === vertex) {
                    j = this.set.indexOf(this.set[i]);
                    if (j !== -1) {
                        this.set.splice(j, 1);
                    }
                }
            }
        };
        this.inSet = function (vertex) {
            return this.set.indexOf(vertex) !== -1;
        };
        return this;
    };
    this.map = map;
    this.data = new this.DijkstraWorkingData(map);
    return this;
};

if (module) {
    module.exports.Dijkstra = Dijkstra;
}