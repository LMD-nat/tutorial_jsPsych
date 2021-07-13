let timeline = [];

var subject_id = jsPsych.randomization.randomID(7); //random 7 digit id

jsPsych.data.addProperties({ // add random data to file
  subject: subject_id
});

var welcome = {
    type: 'instructions',
    pages: [
        'Welcome! This survey is about your interest in learning coding for psychology at Concordia.',
        'All of these questions are completely optional, but you will have to consent to the questionnaire to move forward.',
        'Any personal information you might submit will be kept anonymous.', 
        'I would like to share group data with the department and maybe with the research world at some point.<br> It won\'t be possible to identify your individual data.',
    ],
    show_clickable_nav: true
}
            
var pre_if_trial = {
    type: 'html-button-response',
    stimulus: '',
    choices: ['Yes', 'No thanks'],
    prompt: "<p>Do you consent to participate in this survey?</p>",
    data: {
    task: 'consent'
  },
}

var if_trial = {
    type: 'html-keyboard-response',
    stimulus: '<p> No worries! Hit the link below to close your window.</p><br><a href="javascript:window.close();">Close Window</a>'
}

var if_node = {
    timeline: [if_trial],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check which key was pressed
        var data = jsPsych.data.get().last(1).values()[0];
        if(jsPsych.pluginAPI.compareKeys(data.response, 0)){
            return false;
        } else {
            return true;
        }
    }
}

var after_if_trial = {
    type: 'html-button-response',
    choices: ['Undergraduate Student', 'Recently Graduated', 'Graduate Student', 'Professor or Researcher'],
    stimulus: '<p>Alright! Let\'s keep going. Which of these options best describes you?<br></p>'
}

var move_into_moreq = {
    type: 'instructions',
    pages: [
        'Great! Good to know!',
        '<p>This questionnaire will not only ask you a few questions about your experiences with programming and coding, it will also show you what kinds of things you can code pretty easily, because this whole survey is written in JavaScript.<br></p>'
    ],
    show_clickable_nav: true
}

var page_1_options = ["Yes", "No"];
var page_2_options = ["Strongly Disagree", "Disagree", "Somewhat Disagree", "Neutral", "Somewhat Agree", "Agree", "Strongly Agree"];

var forced_choice = {
  type: 'survey-multi-choice',
  questions: [
    {prompt: "Is this your first time taking this survey?", name:"repeatsurvey", options: page_1_options, required:false}, 
    {prompt: "Do you feel like you need to know some form of programming or coding to be successful in your studies or career?", name:"prog", options: page_2_options, required: false},
    {prompt: "Do you have existing experience in <b>ANY</b> type of programming or coding?", name:"anyprog", options: page_1_options, required:false}, 
    {prompt: "Would you enroll in an introductory programming or coding class designed for the psychology department if it was offered to you?", name:"classoff", options: page_1_options, required:false}
    ],
};

var prog_experience = {
    type: 'html-slider-response',
    stimulus: 'Use the slider to answer this question. You can slide the indicator anywhere between these two extremes.',
    labels: ['Clueless', 'Very knowledgeable'],
    prompt: "<p><b>How would you rate your knowledge of the basics of computer programming?<b></p>"
};

var sorting_stimuli = [];
for (var i = 1; i <= 8; i++) {
    sorting_stimuli.push("Stimuli/" + i + ".jpg");
}

var sort_instructions = {
    type: 'instructions',
    pages: [
        'Thanks! This next question will be a bit more interactive. If you\'re having trouble with the screen, you can rotate your device or zoom out.',
        'You\'ll see some common programs and programming languages used in psychology.',
        'Please rate your familiarity with these programs by dragging their icons and placing them in the box.',
        'Put programs you know really well at the <b>top</b> of the box, and programs you don\'t know at the <b>bottom<b>.',
        'You can also drag them anywhere in the middle to idicate different levels of experience or familiarity.'
    ],
    show_clickable_nav: true
}

var sort_trial = {
    type: 'free-sort',
    sort_area_height: 400,
    sort_area_width: 400,
    sort_area_shape: 'square',
    prompt_location: 'above',
    stimuli: sorting_stimuli,
    stim_starts_inside: true,
    column_spread_factor: 1.5,
    prompt: "<br>Drag programs you know really well to the top of the box, and programs you don't know to the bottom of the box.",
};

var survey_box = {
  type: 'survey-text',
  questions: [
    {prompt: "Did I miss any languages or programs? Go ahead and specify any programs or programming languages you know.", rows: 5, columns: 40}
  ],
};

var multi_select_block = {
    type: 'survey-multi-select',
    questions: [
      {
        prompt: "<b>What kinds of research topics are most interesting to you?</b>", 
        options: ["Clinical and Health", "Language", "Cognitive Science", "Development", "Psychometrics", "Personality and Social", "Neuroscience"], 
        horizontal: true,
        required: false,
        name: 'Topics_research'
      }, 
      {
        prompt: "<b>If you were to learn more about coding, what would you want to use it for?</b>", 
        options: ["Data analysis and visualization", "Building experiments", "Making websites and apps", "Getting a job", "For my own knowledge"], 
        horizontal: true,
        required: false,
        name: 'Topics_analyses'
      }
    ],
    preamble: "Great! Thanks!<br> This is a last set of questions about your interests in coding. Select as many as you'd like.<br> This is just to see what kinds of topics would be most interesting to psychology students at a coding workshop.",
    randomize_question_order: true
};


var survey_close = {
  type: 'survey-text',
  questions: [
    {prompt: "Where can I send you messages about future workshops?", placeholder: 'email@address.com', name: 'email'}, 
    {prompt: "Do you have any comments or questions?", name: 'comments'}
  ],
  preamble: "Last page! <br> If you'd like to be emailed about coding workshops in the Concordia psychology department, please leave your email. <br> Otherwise you can check the <b>CUPA Classifieds</b> page for updates."
};

jsPsych.init({
    timeline: [welcome, pre_if_trial, if_node, after_if_trial, move_into_moreq, forced_choice, prog_experience, sort_instructions, sort_trial, survey_box, multi_select_block, survey_close],
    preload_images: true,
    show_progress_bar: true,
    show_preload_progress_bar: true,
    on_finish: function(data){
			//jsPsych.data.get().localSave('csv','questionnaire_'+subject_id+'_'+cond+'.csv'); // download locally if you'd like
			document.body.innerHTML = '<br> <p style="font-size:35px"> <center>Thank you for completing the survey! Have a great day! You can now close this page.</center></p>'	}
});
