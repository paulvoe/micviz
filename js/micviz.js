$(document).ready(function() {
    getMicData(vizfunction1);
});


var app = new Vue({
    el: '#app',
    data: {
        a: '0%',
        b: '0%',
        c: '0%',
        d: '0%',
        e: '0%',
    }
});


function vizfunction1(freqArr) {
    fftSize = freqArr.length * 2

    SAMPLERATE = 44100

    upperA = parseInt(200 / (44100 / fftSize));
    sumA = freqArr.slice(0, upperA).reduce(function(a, b) { return a + b; });
    avgA = sumA / (upperA - 0);

    upperB = parseInt(800 / (44100 / fftSize));
    sumB = freqArr.slice(upperA, upperB).reduce(function(a, b) { return a + b; });
    avgB = sumB / (upperB - upperA);

    upperC = parseInt(3000 / (44100 / fftSize));
    sumC = freqArr.slice(upperB, upperC).reduce(function(a, b) { return a + b; });
    avgC = sumC / (upperC - upperB);

    upperD = parseInt(5000 / (44100 / fftSize));
    sumD = freqArr.slice(upperC, upperD).reduce(function(a, b) { return a + b; });
    avgD = sumD / (upperD - upperC);

    upperE = freqArr.length - 1;
    sumE = freqArr.slice(upperD, upperE).reduce(function(a, b) { return a + b; });
    avgE = sumE / (upperE - upperD);

    app.a = (avgA / 256) * 100;
    app.b = (avgB / 256) * 100;
    app.c = (avgC / 256) * 100;
    app.d = (avgD / 256) * 100;
    app.e = (avgE / 256) * 100;
}
