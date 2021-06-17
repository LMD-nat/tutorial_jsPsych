// press the "L" key to move forward one word!

var dog = { // normal sentence
      type: 'moving-window',
      words: "The dog chased the car",
    }
    
    var chien = { // code-switch on dog
      type: 'moving-window',
      words: "The chien chased the car"
    }
    
    var voiture = { // code-switch on car
      type: 'moving-window',
      words: "The dog chased the voiture"
    }
    
    var banana = { // normal sentence
      type: 'moving-window',
      words: "The monkey ate a banana"
    }
    
    var banane = { // code-switch on banana
      type: 'moving-window',
      words: "The monkey ate a banane"
    }  
    
    var singe = { // code-switch on monkey
      type: 'moving-window',
      words: "The singe ate a banana"
    }

var words = [dog, chien, voiture, banana, banane, singe];
var experiment = jsPsych.randomization.shuffle(words);

jsPsych.init({
    timeline: experiment, 
    on_finish: function(data){
			//jsPsych.data.get().localSave('csv','questionnaire_'+subject_id+'_'+cond+'.csv'); // download locally if you'd like
		document.body.innerHTML = '<br> <p style="font-size:35px"> <center>You have completed this reading task! Have a great day! You can now close this page.</center></p>'	}

});
