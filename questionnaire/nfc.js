// Need for cognition questionnaire 

/* 
Cacioppo, J. T., Petty, R. E., & Kao, C. F. (1984). The efficient assessment of need for cognition. Journal of Personality Assessment, 48, 306-307
PDF version of the Scale (https://www.midss.org/sites/default/files/ncogscale.pdf)
*/

var subject_id = jsPsych.randomization.randomID(7); //random 7 digit id
jsPsych.data.addProperties({ // add random data to file
  subject: subject_id
});

// change library version to 6.10
var ngs = ['1: Extremely uncharacteristic of me', '2: Somewhat uncharacteristic of me', '3: Uncertain', '4: Somewhat characteristic of me', '5: Extremely characteristic of me']
var ngs = ['Extremely uncharacteristic of me', 'Somewhat uncharacteristic of me', 'Uncertain', 'Somewhat characteristic of me', 'Extremely characteristic of me']
var NFC = {
  type: 'survey-likert',
  questions: [
    {prompt: "I prefer complex to simple problems.", name:'ngs_01', labels: ngs, required:true},
    {prompt: "I like to have the responsibility of handling a situation that requires a lot of thinking.", name:'ngs_02', labels: ngs, required:true},
    {prompt: "Thinking is not my idea of fun.", name:'ngs_03', labels: ngs, required:true},
    {prompt: "I would rather do something that requires little thought than something that is sure to challenge my thinking abilities.", name:'ngs_04', labels: ngs, required:true},
    {prompt: "I try to anticipate and avoid situations where there is a likely chance I will have to think in depth about something.", name:'ngs_05', labels: ngs, required:true},
    {prompt: "I find satisfaction in deliberating hard and for long hours.", name:'ngs_06', labels: ngs, required:true},
    {prompt: "I only think as hard as I have to.", name:'ngs_07', labels: ngs, required:true},
    {prompt: "I prefer to think about small daily projects to long term ones.", name:'ngs_08', labels: ngs, required:true},
    {prompt: "I like tasks that require little thought once I have learned them.", name:'ngs_09', labels: ngs, required:true},
    {prompt: "The idea of relying on thought to make my way to the top appeals to me.", name:'ngs_10', labels: ngs, required:true},
    {prompt: "I really enjoy a task that involves coming up with new solutions to problems.", name:'ngs_11', labels: ngs, required:true},
    {prompt: "Learning new ways to think does not excite me very much.", name:'ngs_12', labels: ngs, required:true},
    {prompt: "I prefer my life to be filled with puzzles I must solve.", name:'ngs_13', labels: ngs, required:true},
    {prompt: "The notion of thinking abstractly is appealing to me.", name:'ngs_14', labels: ngs, required:true},
    {prompt: "I would prefer a task that is intellectual, difficult, and important to one that is somewhat important but does not require much thought.", name:'ngs_15', labels: ngs, required:true},
    {prompt: "I feel relief rather than satisfaction after completing a task that requires a lot of mental effort.", name:'ngs_16', labels: ngs, required:true},
    {prompt: "It's enough for me that something gets the job done; I do not care how or why it works.", name:'ngs_17', labels: ngs, required:true},
    {prompt: "I usually end up deliberating about issues even when they do not affect me personally.", name:'ngs_18', labels: ngs, required:true}
      ],
  preamble: '<br><i>For each of the statements below, please indicate whether or not the statement is characteristic of you or of what you believe. For example, if the statement is extremely uncharacteristic of you or of what you believe about yourself (not at all like you) please select "1". If the statement is extremely characteristic of you or of what you believe about yourself (very much like you) please select "5".</i>',
  on_finish: function(data){
    jsPsych.data.addProperties({
      ngs_01: JSON.parse(data.responses)['ngs_01'],
      ngs_02: JSON.parse(data.responses)['ngs_02'],
      ngs_03: JSON.parse(data.responses)['ngs_03'],
      ngs_04: JSON.parse(data.responses)['ngs_04'],
      ngs_05: JSON.parse(data.responses)['ngs_05'],
      ngs_06: JSON.parse(data.responses)['ngs_06'],
      ngs_07: JSON.parse(data.responses)['ngs_07'],
      ngs_08: JSON.parse(data.responses)['ngs_08'],
      ngs_09: JSON.parse(data.responses)['ngs_09'],
      ngs_10: JSON.parse(data.responses)['ngs_10'],
      ngs_11: JSON.parse(data.responses)['ngs_11'],
      ngs_12: JSON.parse(data.responses)['ngs_12'],
      ngs_13: JSON.parse(data.responses)['ngs_13'],
      ngs_14: JSON.parse(data.responses)['ngs_14'],
      ngs_15: JSON.parse(data.responses)['ngs_15'],
      ngs_16: JSON.parse(data.responses)['ngs_16'],
      ngs_17: JSON.parse(data.responses)['ngs_17'],
      ngs_18: JSON.parse(data.responses)['ngs_18'] 
    });
  }
};

var start = {
    type: 'instructions',
    pages: [
        'Click next to begin the questionnaire.'
    ],
    show_clickable_nav: true
}

var finish = {
    type: 'instructions',
    pages: [
        'That\'s all! Click next to finish.'
    ],
    show_clickable_nav: true
}

var timeline = [start, NFC, finish];
      
//initialize the experiment
     jsPsych.init({
        timeline: timeline,
        on_finish: function(data){
			  document.body.innerHTML = '<p>Data saved! You can now close this page.</p>'
		}
      });
