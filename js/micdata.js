function getMicData(vizfunction) {
    var audioContext = new AudioContext();

    var BUFF_SIZE = 16384;

    var audioInput = null,
        microphone_stream = null,
        gain_node = null,
        script_processor_node = null,
        script_processor_fft_node = null,
        analyserNode = null;

    if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia ||
                                     navigator.webkitGetUserMedia ||
                                     navigator.mozGetUserMedia ||
                                     navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia(
            {audio:true},
            function(stream) {
                start_microphone(stream, vizfunction);
            },
            function(e) {
                alert('Error capturing audio.');
            }
        );

    } else {
        alert('getUserMedia not supported in this browser.');
    }


    function process_microphone_buffer(event) {
        // currently not in use
        var i, N, inp, microphone_output_buffer;

        microphone_output_buffer = event.inputBuffer.getChannelData(0); // just mono - 1 channel for now
        // microphone_output_buffer  <-- this buffer contains current gulp of data size BUFF_SIZE
        vizfunction(microphone_output_buffer);
    }

    function start_microphone(stream, vizfunction) {
        gain_node = audioContext.createGain();
        gain_node.connect( audioContext.destination );
        console.log(audioContext.destination);

        microphone_stream = audioContext.createMediaStreamSource(stream);
        // microphone_stream.connect(gain_node);

        script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);
        // script_processor_node.onaudioprocess = process_microphone_buffer;

        microphone_stream.connect(script_processor_node);

        // --- setup FFT
        script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
        script_processor_fft_node.connect(gain_node);

        analyserNode = audioContext.createAnalyser();
        analyserNode.smoothingTimeConstant = 0;
        analyserNode.fftSize = 2048;

        microphone_stream.connect(analyserNode);

        analyserNode.connect(script_processor_fft_node);

        script_processor_fft_node.onaudioprocess = function() {
            // get the average for the first channel
            var array = new Uint8Array(analyserNode.frequencyBinCount);
            analyserNode.getByteFrequencyData(array);

            // draw the spectrogram
            if (microphone_stream.playbackState == microphone_stream.PLAYING_STATE) {
                // show_some_data(array, 256, "from fft");
                vizfunction(array);
            }
        };
    }
}
