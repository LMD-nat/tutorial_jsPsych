var timeline = [];

var trial_one = {
  type: 'html-keyboard-response',
  stimulus: '<<<<<',
  choices: ['z','m'],
  data: {
    stimulus_type: 'congruent',
    target_direction: 'left'
  },
  on_finish: function(data){
    // Score the response as correct or incorrect.
    if(jsPsych.pluginAPI.compareKeys(data.response, "z")){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
}

var trial_two = {
  type: 'html-keyboard-response',
  stimulus: '>>>>>',
  choices: ['z','m'],
  data: {
    stimulus_type: 'congruent',
    target_direction: 'right'
  },
  on_finish: function(data){
    // Score the response as correct or incorrect.
    if(jsPsych.pluginAPI.compareKeys(data.response, "m")){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
}

var trial_three = {
  type: 'html-keyboard-response',
  stimulus: '<<><<',
  choices: ['z','m'],
  data: {
    stimulus_type: 'incongruent',
    target_direction: 'right'
  },
  on_finish: function(data){
    // Score the response as correct or incorrect.
    if(jsPsych.pluginAPI.compareKeys(data.response, "m")){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
}

var trial_four = {
  type: 'html-keyboard-response',
  stimulus: '>><>>',
  choices: ['z','m'],
  data: {
    stimulus_type: 'incongruent',
    target_direction: 'left'
  },
  on_finish: function(data){
    // Score the response as correct or incorrect.
    if(jsPsych.pluginAPI.compareKeys(data.response, "z")){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
}

var trial_neutral_l = {
  type: 'html-keyboard-response',
  stimulus: '--<--',
  choices: ['z','m'],
  data: {
    stimulus_type: 'incongruent',
    target_direction: 'left'
  },
  on_finish: function(data){
    // Score the response as correct or incorrect.
    if(jsPsych.pluginAPI.compareKeys(data.response, "z")){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
}

var trial_neutral_r = {
  type: 'html-keyboard-response',
  stimulus: '-->--',
  choices: ['z','m'],
  data: {
    stimulus_type: 'incongruent',
    target_direction: 'left'
  },
  on_finish: function(data){
    // Score the response as correct or incorrect.
    if(jsPsych.pluginAPI.compareKeys(data.response, "m")){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
}

var feedback = {
  type: 'html-keyboard-response',
  stimulus: function(){
    // The feedback stimulus is a dynamic parameter because we can't know in advance whether
    // the stimulus should be 'correct' or 'incorrect'.
    // Instead, this function will check the accuracy of the last response and use that information to set
    // the stimulus value on each trial.
    var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
    if(last_trial_correct){
      return "<p>Correct!</p>"; // the parameter value has to be returned from the function
    } else {
      return "<p>Wrong.</p>"; // the parameter value has to be returned from the function
    }
  }
}

on = {
  timeline: [trial_one, feedback],
};

tw = {
  timeline: [trial_two, feedback],
};

th = {
  timeline: [trial_three, feedback],
};

fo = {
  timeline: [trial_four, feedback],
};

nl = {
  timeline: [trial_neutral_l, feedback],
};

nr = {
  timeline: [trial_neutral_r, feedback],
};

var flanker = [on, tw, th, fo, nr, nl, on, tw, th, fo, nr, nl, on, tw, th, fo, nr, nl, on, tw, th, fo, nr, nl, on, tw, th, fo, nr, nl];
var experiment = jsPsych.randomization.shuffle(flanker);

jsPsych.init({
        timeline: experiment,
        on_finish: function(data){
			  document.body.innerHTML = '<p><center>Flanker data saved! You can now close this page.</center></p>'
		}
      });
