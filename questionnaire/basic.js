var timeline = [];

var survey_trial = {
  type: 'survey-text',
  questions: [
    {prompt: "What's your name", name: 'name'}, 
    {prompt: "Where were you born?", name: 'birth.loc'},
    {prompt: "What are you studying?", name: 'study'}
  ],
};

timeline.push(survey_trial);

jsPsych.init({
  timeline: timeline
});
