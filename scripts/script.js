const Scene = require("Scene");
const TouchGestures = require("TouchGestures");
const Patches = require("Patches");
const Reactive = require("Reactive");
const Time = require("Time");
const Audio = require("Audio");
const Animation = require("Animation");

// prettier-ignore
const timestamps = [ 2.45, 9.45, 12.4, 14.5, 22.5, 34.4, 46.6, 58, 67.4, 77.3, 86.1, 94.2, 103.2, 118.4];

let currentStep = 0;
let prevTime = 0;
let isPaused = true;

Promise.all([
  // touch boxes
  Scene.root.findFirst("faucetTouchBox"),
  Scene.root.findFirst("dispenserTouchBox"),
  Scene.root.findFirst("r_handTouchBox"),
  Scene.root.findFirst("l_handTouchBox"),

  // arrow
  Scene.root.findFirst("arrow"),

  // start button
  Scene.root.findFirst("start_button"),

  // particle emitters
  Scene.root.findFirst("water_emitter"),
  Scene.root.findFirst("star_emitter_0"),
  Scene.root.findFirst("star_emitter_1"),

  // voice audio controllers
  Audio.getPlaybackController("voice_0"),
  Audio.getPlaybackController("voice_1"),
  Audio.getPlaybackController("voice_2"),
  Audio.getPlaybackController("voice_3"),
  Audio.getPlaybackController("voice_4"),
  Audio.getPlaybackController("voice_5"),
  Audio.getPlaybackController("voice_6"),
  Audio.getPlaybackController("voice_7"),
  Audio.getPlaybackController("voice_8"),
  Audio.getPlaybackController("voice_9"),
  Audio.getPlaybackController("voice_10"),
  Audio.getPlaybackController("voice_11"),

  // other sounds
  Audio.getPlaybackController("water"),
  Audio.getPlaybackController("dispenser"),
  Audio.getPlaybackController("success"),
]).then(function (results) {
  let faucetTouchBox = results[0];
  let dispenserTouchBox = results[1];
  let r_handTouchBox = results[2];
  let l_handTouchBox = results[3];
  let arrow = results[4];
  let startButton = results[5];
  let waterEmitter = results[6];
  let starEmitter0 = results[7];
  let starEmitter1 = results[8];
  let voice0 = results[9];
  let voice1 = results[10];
  let voice2 = results[11];
  let voice3 = results[12];
  let voice4 = results[13];
  let voice5 = results[14];
  let voice6 = results[15];
  let voice7 = results[16];
  let voice8 = results[17];
  let voice9 = results[18];
  let voice10 = results[19];
  let voice11 = results[20];
  let waterAudio = results[21];
  let dispenserAudio = results[22];
  let successAudio = results[23];

  setStepActions();

  TouchGestures.onTap(startButton).subscribe(function () {
    Time.setTimeout(function () {
      voice0.setPlaying(true);
      voice0.reset();
    }, 100);
    arrow.hidden = false;
    faucetTouchBox.hidden = false;
  });

  for (let i = 0; i <= 3; i++) {
    TouchGestures.onTap(results[i]).subscribe(function () {
      if (isPaused) {
        // play animation
        isPaused = false;
        arrow.hidden = true;
        Patches.inputs.setBoolean("play", Reactive.val(true));

        // pause animation
        Time.setTimeout(function () {
          isPaused = true;
          arrow.hidden = false;
          currentStep++;
          prevTime = timestamps[currentStep - 1] * 1000;
          Patches.inputs.setBoolean("play", Reactive.val(false));
          setStepActions();
        }, timestamps[currentStep] * 1000 - prevTime);

        // select action steps
        switch (currentStep) {
          case 0:
            emitWater(waterEmitter, waterAudio, 1000, true);
            waterEmitter.hidden = false;
            break;
          case 1:
            voice1.setPlaying(true);
            voice1.reset();
            voice0.setPlaying(false); // temporary fix to overlapping audio
            break;
          case 2:
            emitWater(waterEmitter, waterAudio, 0, false);
            break;
          case 3:
            voice2.setPlaying(true);
            voice2.reset();
            Time.setTimeout(function () {
              dispenserAudio.setPlaying(true);
              dispenserAudio.reset();
            }, 1000);
            break;
          case 4:
            voice3.setPlaying(true);
            voice3.reset();
            break;
          case 5:
            voice4.setPlaying(true);
            voice4.reset();
            break;
          case 6:
            voice5.setPlaying(true);
            voice5.reset();
            break;
          case 7:
            voice6.setPlaying(true);
            voice6.reset();
            break;
          case 8:
            voice7.setPlaying(true);
            voice7.reset();
            break;
          case 9:
            voice8.setPlaying(true);
            voice8.reset();
            break;
          case 10:
            voice5.setPlaying(true);
            voice5.reset();
            break;
          case 11:
            voice9.setPlaying(true);
            voice9.reset();
            break;
          case 12:
            voice5.setPlaying(true);
            voice5.reset();
            break;
          case 13:
            emitWater(waterEmitter, waterAudio, 1000, true);
            voice10.setPlaying(true);
            voice10.reset();
            break;
        }
      }
    });
  }

  function setStepActions() {
    switch (currentStep) {
      case 0:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = true;
        l_handTouchBox.hidden = true;

        arrow.transform.x = 0;
        arrow.transform.y = 0.3054;
        arrow.transform.z = -0.06527;

        break;
      case 1:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = true;
        l_handTouchBox.hidden = false;

        arrow.transform.x = -0.06192;
        arrow.transform.y = 0.21732;
        arrow.transform.z = 0.19539;

        break;
      case 2:
        faucetTouchBox.hidden = false;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = true;
        l_handTouchBox.hidden = true;

        arrow.transform.x = 0;
        arrow.transform.y = 0.3054;
        arrow.transform.z = -0.06527;

        break;
      case 3:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = false;
        r_handTouchBox.hidden = true;
        l_handTouchBox.hidden = true;

        arrow.transform.x = 0.10368;
        arrow.transform.y = 0.39509;
        arrow.transform.z = -0.08206;
        break;
      case 4:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = false;
        l_handTouchBox.hidden = true;

        arrow.transform.x = 0.06297;
        arrow.transform.y = 0.21894;
        arrow.transform.z = 0.17912;
        break;
      case 5:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = true;
        l_handTouchBox.hidden = false;

        arrow.transform.x = -0.06192;
        arrow.transform.y = 0.21732;
        arrow.transform.z = 0.19539;
        break;
      case 6:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = false;
        l_handTouchBox.hidden = true;

        arrow.transform.x = 0.06297;
        arrow.transform.y = 0.21894;
        arrow.transform.z = 0.17912;
        break;
      case 7:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = true;
        l_handTouchBox.hidden = false;

        arrow.transform.x = -0.06192;
        arrow.transform.y = 0.21732;
        arrow.transform.z = 0.19539;

        break;
      case 8:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = false;
        l_handTouchBox.hidden = true;

        arrow.transform.x = 0.06297;
        arrow.transform.y = 0.21894;
        arrow.transform.z = 0.17912;
        break;
      case 9:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = true;
        l_handTouchBox.hidden = false;

        arrow.transform.x = -0.06192;
        arrow.transform.y = 0.21732;
        arrow.transform.z = 0.19539;
        break;
      case 10:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = false;
        l_handTouchBox.hidden = true;

        arrow.transform.x = 0.06297;
        arrow.transform.y = 0.21894;
        arrow.transform.z = 0.17912;
        break;
      case 11:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = true;
        l_handTouchBox.hidden = false;

        arrow.transform.x = -0.06192;
        arrow.transform.y = 0.21732;
        arrow.transform.z = 0.19539;

        break;
      case 12:
        faucetTouchBox.hidden = true;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = false;
        l_handTouchBox.hidden = true;

        arrow.transform.x = 0.06297;
        arrow.transform.y = 0.21894;
        arrow.transform.z = 0.17912;

        break;
      case 13:
        faucetTouchBox.hidden = false;
        dispenserTouchBox.hidden = true;
        r_handTouchBox.hidden = true;
        l_handTouchBox.hidden = true;

        arrow.transform.x = 0;
        arrow.transform.y = 0.3054;
        arrow.transform.z = -0.06527;

        break;
      case 14:
        waterEmitter.birthrate = 0;

        successAudio.setPlaying(true);
        successAudio.reset();

        waterAudio.setPlaying(false);
        waterAudio.setLooping(false);
        waterAudio.reset();

        voice11.setPlaying(true);
        voice11.reset();

        starEmitter0.hidden = false;
        starEmitter0.birthrate = 30;

        starEmitter1.hidden = false;
        starEmitter1.birthrate = 30;

        arrow.hidden = true;

        Time.setTimeout(function () {
          starEmitter0.birthrate = 0;
          starEmitter1.birthrate = 0;
        }, 2000);
        break;
    }
  }
});

function emitWater(waterEmitter, waterAudio, birthrate, play) {
  Time.setTimeout(function () {
    waterEmitter.birthrate = birthrate;
    waterAudio.setPlaying(play);
    waterAudio.setLooping(play);
    waterAudio.reset();
  }, 1500);
}
