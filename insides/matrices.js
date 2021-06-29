
/*

1. matrices --> this is what should be
pushed to the timeline in the main index
file (e.g., timeline.push(matrices);)

2. return_matrices_folder() --> this function
allows you to assign a variable to the
images used in the task (for preloading).
For example:
var matrix_img = return_matrices_folder();

Originally created by Stephen Van Hedger, June 2020
Adapted by Nathalie Germain, July 2021

*/

/**************/
/** TIMELINE **/
/**************/

var timeline = []; //specify the jsPsych timeline to which all trials/blocks are pushed

var totalScore = 0; //for logging the total number of correct responses
var totalSeen = 0; //for logging the total number of items participants get to in the specified time frame
var specDuration = 15; //number of MINUTES you want participants to be able to spend on the task

/************************/
/** TIMELINE VARIABLES **/
/************************/

var matrixList = [
{name: 'MAT-01', pattern: 'i1.png', option_01: 'a2.png', option_02: 'a8.png', type: 'animal', correct:0},
{name: 'MAT-02', pattern: 'i5.png', option_01: 'a1.png', option_02: 'a5.png', type: 'machine', correct:1},
{name: 'MAT-03', pattern: 'i2.png', option_01: 'a7.png', option_02: 'a4.png', type: 'animal', correct:1},
{name: 'MAT-04', pattern: 'i6.png', option_01: 'a6.png', option_02: 'a3.png', type: 'machine', correct:0},
{name: 'MAT-05', pattern: 'i3.png', option_01: 'a5.png', option_02: 'a2.png', type: 'animal', correct:1},
{name: 'MAT-06', pattern: 'i7.png', option_01: 'a4.png', option_02: 'a7.png', type: 'machine', correct:1},
{name: 'MAT-07', pattern: 'i4.png', option_01: 'a3.png', option_02: 'a8.png', type: 'animal', correct:0},
{name: 'MAT-08', pattern: 'i8.png', option_01: 'a6.png', option_02: 'a1.png', type: 'machine', correct:0}
];


/************************/
/** BASIC INSTRUCTIONS **/
/************************/

var matrix_instructions = {
	type: 'html-button-response',
	stimulus: '<p><b>Insides Task</b></p><p>Welcome to this puzzle game! You will be presented with some items, one at a time.'+
			  '<p>The items will have a piece missing. Your job is to pick what you think goes on the inside of the item. You can use your mouse or tap on the answer with your finger.</p><p>You will have '+specDuration+' minutes to complete as many puzzles as you can! Good luck!</p>',
	choices: ['BEGIN']
}


/**************************/
/** MAIN RESPONSE SCREEN **/
/**************************/

var matrix_response = {
	type: 'ravens-matrix',
	stimulus: jsPsych.timelineVariable('pattern'),
	data: {item: jsPsych.timelineVariable('name'), correct_ans: jsPsych.timelineVariable('correct')},
	post_trial_gap: 250,
	choices: [
	jsPsych.timelineVariable('option_01'),
	jsPsych.timelineVariable('option_02')
	],
	on_finish:function(data){
		//score the response
		if(data.button_pressed == data.correct_ans){
			var gotitright = 1;
			totalScore += 1;
			console.log("correct");
		} else {
			var gotitright = 0;
			console.log("NOPE");
		}

		 jsPsych.data.addDataToLastTrial({
			  designation: "MATRIX-RESP",
			  correct: gotitright
            });

		totalSeen += 1;	//add to the total number of seen items
	}
};


var matrix_proc = {
	timeline: [matrix_response],
	timeline_variables: matrixList,
	//function to terminate this timeline after a specific duration
	on_start: function(){
		setTimeout(function(){
		jsPsych.endCurrentTimeline();
		}, (specDuration*60000));
	}
};



/*************/
/** WRAP-UP **/
/*************/

//final feedback screen
var matrix_goodbye = {
    type: "html-button-response",
    stimulus: "<p>All done! Great work. Thank you for participating!</p>",
    choices: ['Exit']
    };


/******************/
/** MAIN OUTPUTS **/
/******************/

//This is the ultimate variable that you will push to the timeline in the main section
var matrices = {
	timeline: [matrix_instructions, matrix_proc, matrix_goodbye]
}

//This function will allow you to assign the to-be-preloaded images to a variable name of your choice
function return_matrices_folder(){
	return img_preload;
}
