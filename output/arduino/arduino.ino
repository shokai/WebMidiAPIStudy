// read MIDI Message from PC. write LED value.

void setup() {
  pinMode(9, true);
  analogWrite(9, 80);
  Serial.begin(9600);
}

void loop() {
  if(MIDIUSB.available()){
    MIDIEvent e;
    e = MIDIUSB.read();
    if(
       e.m1 == 0x0B|1 && // channel 1
       e.m2 == 10
       ){
      analogWrite(9, e.m3);
    }
  }
}
