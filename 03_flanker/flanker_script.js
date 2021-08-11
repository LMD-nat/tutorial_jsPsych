// Flanker Task by Nathalie
// use the z (left flanker) and the m (right flanker) to perform the task

// always initialize the timeline at the top of the page
var timeline = []

var one = {
  type: 'html-keyboard-response',
  stimulus: '<<<<<',
  choices: ['z','m'],
  data: {
    stimulus_type: 'congruent',
    target_direction: 'left',
    correct_response: 'z'
  },
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, data.correct_response)){
      data.correct = true;
    } else {
      data.correct = false;
    }
  }
}

var two = {
  type: 'html-keyboard-response',
  stimulus: '>>>>>',
  choices: ['z','m'],
  data: {
    stimulus_type: 'congruent',
    target_direction: 'right',
    correct_response: 'm'
  },
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, data.correct_response)){
      data.correct = true;
    } else {
      data.correct = false;
    }
  }
}

var three = {
  type: 'html-keyboard-response',
  stimulus: '<<><<',
  choices: ['z','m'],
  data: {
    stimulus_type: 'incongruent',
    target_direction: 'right',
    correct_response: 'm'
  },
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, data.correct_response)){
      data.correct = true;
    } else {
      data.correct = false;
    }
  }
}

var four = {
  type: 'html-keyboard-response',
  stimulus: '>><>>',
  choices: ['z','m'],
  data: {
    stimulus_type: 'incongruent',
    target_direction: 'left',
    correct_response: 'z'
  },
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, data.correct_response)){
      data.correct = true;
    } else {
      data.correct = false;
    }
  }
}

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<p style="font-size: 48px;">+</p>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
};

// this way, the fixation will always come before the presentation of the flanker trial

on = {
  timeline: [fixation, one],
};
tw = {
  timeline: [fixation, two],
};
th = {
  timeline: [fixation, three],
};
fo = {
  timeline: [fixation, four],
};

// five of each trial in an Array
var flanker = [on, tw, th, fo, on, tw, th, fo, on, tw, th, fo, on, tw, th, fo, on, tw, th, fo];

// shuffles (randomizes all of the trials)
var experiment = jsPsych.randomization.shuffle(flanker);

// the init file will go at the bottom of the page
jsPsych.init({
        timeline: experiment,
        on_finish: function(data){
			  document.body.innerHTML = '<p><center>Flanker data saved! You can now close this page.</center></p>'
		}
      });
