var timeline = [];

var trial = {
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

timeline.push(trial, feedback);
