/**************************/
/** timeline and preload **/
/**************************/

var timeline = []; //specify the jsPsych timeline to which all trials/blocks are pushed
var preload = {
    type: 'preload',
    show_progress_bar: true,
    images: ['i1.png', 'i2.png', 'i3.png', 'i4.png', 'i5.png', 'i6.png', 'i7.png', 'i8.png', 'a1.png', 'a2.png', 'a3.png', 'a4.png', 'a5.png', 'a6.png', 'a7.png', 'a8.png']
};

/**********************/
/** Participant Code **/
/**********************/

//participant id
var participantCode = jsPsych.randomization.randomID(8); //random alpha-numeric string
jsPsych.data.addProperties({subject: participantCode}); // add participant code to data

/**************/
/** feedback **/
/**************/

//final feedback screen
var goodbye = {
    type: "html-button-response",
    stimulus: function(){return "<p>This concludes the task.</p><p>Thank you for your participation!</p>" +
				  "<p><b>You got "+totalScore+" puzzles correct.</b>";},
    choices: ['Exit']
    };

timeline.push(preload);
timeline.push(matrices); //from matrices.js
timeline.push(goodbye); //feedback
      

//initialize the experiment
     jsPsych.init({
        timeline: timeline,
        on_finish: function(data){
			  document.body.innerHTML = '<p>Data saved! You can now close this page.</p>'
		}
      });
