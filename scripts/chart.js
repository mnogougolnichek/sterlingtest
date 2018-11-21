"use strict";

function Chart() {
    this.pointsY = [400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400];
    this.polyline = document.getElementById("chartPolyline");
    this.init();
}

Chart.prototype.init = function () {
    setInterval(() => {
        this.getData();
    }, 1000);
};

Chart.prototype.getData = function () {
    fetch('http://dev.stearling.net/api/point')
        .then(response => {
            return response.json();
        })
        .then(response => {
            this.pointsY.push(400 - response.y);
            this.pointsY.shift();
            this.setPoints();
        })
        .catch( console.log );
};

Chart.prototype.setPoints = function () {
    let str = "",
        pointsX = 0;
    for(let i = 0; i < this.pointsY.length; i++){
        pointsX+= 25;
        str+= (" " + pointsX + "," + this.pointsY[i]);
    }
    this.polyline.setAttribute('points', str );
};