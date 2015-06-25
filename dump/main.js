"use strict";

function info(msg){
  $("#log").prepend($("<li>").text(msg));
}

$(function(){
  info("start");

  if(typeof navigator.requestMIDIAccess !== "function"){
    info("WebMIDI API is not supported");
    return;
  }

  navigator.requestMIDIAccess()
    .then(function(midi){
      info("MIDI Access is OK");
      console.log(midi);
      info(`${midi.inputs.size} input devices`);
      info(`${midi.outputs.size} output devices`);
      for(let input of midi.inputs.values()){
        info(`Input Device found: ${input.manufacturer} - ${input.name}`);
        console.log(input);
        input.onmidimessage = function(msg){
          console.log(msg);
          info(JSON.stringify(msg.data));
        };
      }
    })
    .catch(function(err){
      console.error(err);
      info(`Error: ${err}`);
    });
});
