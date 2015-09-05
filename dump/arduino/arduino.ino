// using arcore (https://github.com/rkistner/arcore)
// read analog value and send to PC.

void setup() {
  pinMode(13, true);
  Serial.begin(9600);
}

int an;

void loop() {
  an = analogRead(0);
  Serial.println(an);
  if(MIDIUSB.available()){
    MIDIEvent e = {0x0B, 0xB0|1, 10, an>>3};
    MIDIUSB.write(e);
  }

  // blink LED
  digitalWrite(13, true);
  delay(100);
  digitalWrite(13, false);
  delay(100);
}
