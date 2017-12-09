$(document).ready(function() {
    getMicData(vizfunction1);
});


var app = new Vue({
    el: '#app',
    data: {
        a: [],
        b: '0%'
    }
});


function vizfunction1(freqArr) {
    var sum = freqArr.reduce(function(a, b) { return a + b; });
    var avg = sum / freqArr.length;
    app.a = freqArr;
    app.b = (avg / 256) * 100;
}
