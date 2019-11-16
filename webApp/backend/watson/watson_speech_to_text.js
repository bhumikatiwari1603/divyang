	var express = require('express');
	var app = express();

	var path = require('path');
	var request = require('request');
	const https = require('https');

	var fs = require('fs');
	
	var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
	const mic = require('mic');
	var command = 'sox';

	//app.engine('html', require('ejs').renderFile); 

	var bodyParser = require("body-parser");
	app.use(bodyParser.urlencoded({ extended: false }));

	// define routes here..

	app.get('/', function (req, res) {
	    res.sendFile('/Users/bhumikatiwari/JavascriptPrograms/watsonTest.html');
	});	

	app.post('/submit-audio', function (req, res) {

	var speechToText = new SpeechToTextV1({
	  username: 'apikey',
	  password: 'j9SvIjQpREewJkanbpQunN-McXWEjRNFTI87Vrvicr_I',
	  url: 'https://stream.watsonplatform.net/speech-to-text/api/'
	});	
	 
	// 1. Microphone settings
	var micInstance = mic({

	  rate: 44100,
	  channels: 2,
	  debug: false,
	  exitOnSilence: 6
	});

	// 2. Service recognize settings
/*
	var params = {
	content_type: 'audio/l16; rate=44100; channels=2',
  	model: 'zh-CN_BroadbandModel',
  	interim_results: true,
  	continuous: true,
     inactivity_timeout: -1	
	};

const recognizeStream = speechToText.createRecognizeStream(params);

*/

// 3. Start recording

function pipeStream() {

//mic.getAudioStream()
//getAudioStream:This returns a simple Transform stream that contains the data from the arecord OR sox process. This sream can be directly piped to a speaker sream OR a file stream. Further this provides a number of events triggered by the state of the stream:

micInstance.start();

var micInputStream = micInstance.getAudioStream();

micInputStream.on('data', function(data) {
        //console.log("Recieved Input Stream: " + data.length);
    });

    micInputStream.on('error', function(err) {
        console.log("Error in Input Stream: " + err);
    });

    micInputStream.on('silence', function() {
        // detect silence.
    });

//micInstance.start();

console.log('Watson is listening, you may speak now.');

    var recognizeparams = {
    	recordProgram: 'sox',
        content_type: 'audio/l16; rate=44100; channels=2',
        interim_results: true,
        smart_formatting: true,
        model: 'en-US_BroadbandModel'  // Specify your language model here
   //     continuous: true
    };


    const textStream = micInputStream.pipe(speechToText.recognizeUsingWebSocket(recognizeparams));
    textStream.setEncoding('utf8');


    textStream.on('data', function(str) {
    console.log(' ===== Speech to Text ===== : ' + str); // print each text we receive
    //parseText(str);
    // res.send(str);
    app.get('/submit-audio', function(req, res) {
	res.render(__dirname + "/watsonTest.html", {str:str});

});	


});


textStream.on('error', function(err) {
    console.log(' === Watson Speech to Text : An Error has occurred ===== \n'); // handle errors
    console.log(err);
    var reconnectinterval = 3000;
    console.log(err + "Attempting to reconnect .. in " + reconnectinterval / 1000 + " seconds");
    micInstance.stop();
    setTimeout(function() {

        pipeStream();
    });


});
};

 pipeStream();

});




// 4. Pipe audio to service

/*
textStream.on('data', user_speech_text => console.log('Watson hears:', user_speech_text));
textStream.on('error', e => console.log(`error: ${e}`));
textStream.on('close', e => console.log(`close: ${e}`));
*/

/*

	var params = {
	  // From file
	  audio: fs.createReadStream('./audio-file.flac'),
	  content_type: 'audio/flac'
	};
	 
	speechToText.recognize(params, function(err, res) {
	  if (err)
	    console.log(err);
	  else
	    console.log(JSON.stringify(res, null, 2));
	});
	 
	// or streaming
	fs.createReadStream('./audio-file.flac')
	  .pipe(speechToText.recognizeUsingWebSocket({ content_type: 'audio/flac' }))
	  .pipe(fs.createWriteStream('./transcription.txt'));
*/
		


	var server = app.listen(3000, function () {
	    console.log('Node server is running..')
	});