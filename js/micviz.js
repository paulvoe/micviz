$(document).ready(function() {
    getMicData(vizfunction1);
});

function max(arr) {
    var maxi = 0;
    for (var i = 1; i < arr.length; i++)
        if(arr[i] > arr[maxi])
            maxi = i;
    return maxi;
}

// Returns a random integer between [0, n-1]
function random_integer(n) {
    return Math.floor(Math.random() * n);
}

// Returns a random element from the array arr
function random_element(arr) {
    return arr[random_integer(arr.length)];
}

// this function is getting called all the time (almost)!
function vizfunction1(freqArr) {
    fftSize = freqArr.length

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

    averages = [avgA, avgB, avgC, avgD, avgE];
    animations = [
        ['wunder', 'aarm','wirbelsau.006','also','bootyshaken.002','ekick.001','poporunter.002','aarm.008','aarm.010','sprung','efuss.001','drehung','ganztief.001'], 
        
        ['also1.001','also1.001', 'chipsdont','efuss','ekick','poporunter.005','wirbelsau','wunder','aarm.007','aarm.009','bkoerperwelle','sprung.003','drehung.002','ganztief','ganztief.002','ganztief.003','huenertanz'],
        
        ['poporunter.002', 'wirbelsau.003', 'bootyshaken','poporunter','poporunter.004','wirbelsau.005','aarm.001','aarm.003','aarm.006','sprung.001','sprung.004','efusskick.001','drehung.001','ganztief.004','ganztief.006'],
        ['poporunter.001','bootyshaken.001','poporunter.003', 'efusskick','wirbelsau.002','aarm.002','aarm.005','sprung.002','sprung.005','ekick.002','eknick.001','poporunter.006','ganztief.005'],
        ['wirbelsau.001','erfusskick','wirbelsau.004','aarm.004','drehung.003','ganztief.007'] 
    ];
    fadeAction(random_element(animations[max(averages)]));
}
