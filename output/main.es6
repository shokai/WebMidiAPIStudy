"use strict";
/*global $*/

function info(msg){
  $("#log").prepend($("<li>").text(msg));
}

$(function(){
  info("start");

  $("#slider").on("input", function(e){
    $("#sliderValue").text(e.target.value);
  });

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
      for(let output of midi.outputs.values()){
        info(`Output Device found: ${output.name} (${output.manufacturer})`);
        console.log(output);
        $("#slider").on("input", function(e){
          output.send([0xB0|1, 10, e.target.value]); // write MIDI message
        });
      }
    })
    .catch(function(err){
      console.error(err);
      info(`Error: ${err}`);
    });
});
