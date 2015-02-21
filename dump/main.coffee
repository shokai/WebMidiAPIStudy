info = (msg) ->
  $('#log').prepend $('<li>').text msg

$ ->
  info "start"

  navigator.requestMIDIAccess()
  .then (midi) ->
    info "MIDI Access is OK"
    return new Promise (resolve, reject) ->
      console.log midi
      info "#{midi.inputs.size} input devices"
      info "#{midi.outputs.size} output devices"
      it = midi.inputs.values()
      loop
        input = it.next()
        break if input.done
        return resolve input.value
      reject "input device not found"

  .then (input) ->
    info "Input Device found: #{input.manufacturer} - #{input.name}"
    console.log input
    input.onmidimessage = (msg) ->
      data = msg.data
      console.log data
      info JSON.stringify msg.data

  .catch (err) ->
    info "Error: #{JSON.stringify err}"
    console.error err

