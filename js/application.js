$(document).ready(function() {

  drumsListener();
  var queue = [];
  soundsListener(queue);
  bassListener();

  bassAudio_1_1 = $( "#bass_1_1" ).get(0);
  window.bass_1_1 = function() {
    bassAudio_1_1.currentTime = 0;
    bassAudio_1_1.play();
  }

  bassAudio_1_2 = $( "#bass_1_2" ).get(0);
  window.bass_1_2 = function() {
    bassAudio_1_2.currentTime = 0;
    bassAudio_1_2.play();
  }

  bassAudio_1_3 = $( "#bass_1_3" ).get(0);
  window.bass_1_3 = function() {
    bassAudio_1_3.currentTime = 0;
    bassAudio_1_3.play();
  }

  bassAudio_1_4 = $( "#bass_1_4" ).get(0);
  window.bass_1_4 = function() {
    bassAudio_1_4.currentTime = 0;
    bassAudio_1_4.play();
  }

  bassAudio_1_5 = $( "#bass_1_5" ).get(0);
  window.bass_1_5 = function() {
    bassAudio_1_5.currentTime = 0;
    bassAudio_1_5.play();
  }

  bassAudio_1_6 = $( "#bass_1_6" ).get(0);
  window.bass_1_6 = function() {
    bassAudio_1_6.currentTime = 0;
    bassAudio_1_6.play();
  }

  bassAudio_1_7 = $( "#bass_1_7" ).get(0);
  window.bass_1_7 = function() {
    bassAudio_1_7.currentTime = 0;
    bassAudio_1_7.play();
  }

  bassAudio_1_8 = $( "#bass_1_8" ).get(0);
  window.bass_1_8 = function() {
    bassAudio_1_8.currentTime = 0;
    bassAudio_1_8.play();
  }
  bassAudio_1_9 = $( "#bass_1_9" ).get(0);
  bassAudio_1_9_path = $( "#bass_1_9" );
  window.bass_1_9 = function() {
    bassAudio_1_9.currentTime = 0;
    bassAudio_1_9.play();
  }
  bassAudio_1_10 = $( "#bass_1_10" ).get(0);
  bassAudio_1_10_path = ( "#bass_1_10" );
  window.bass_1_10 = function() {
    bassAudio_1_10.currentTime = 0;
    bassAudio_1_10.play();
  }
  soundsAudio_1_1 = $( "#sounds_1_1" ).get(0);
  window.sounds_1_1 = function() {
    soundsAudio_1_1.currentTime = 0;
    soundsAudio_1_1.play();
  }
  soundsAudio_1_2 = $( "#sounds_1_2" ).get(0);
  window.sounds_1_2 = function() {
    soundsAudio_1_2.currentTime = 0;
    soundsAudio_1_2.play();
  }
  soundsAudio_1_3 = $( "#sounds_1_3" ).get(0);
  window.sounds_1_3 = function() {
    soundsAudio_1_3.currentTime = 0;
    soundsAudio_1_3.play();
  }
  soundsAudio_1_4 = $( "#sounds_1_4" ).get(0);
  window.sounds_1_4 = function() {
    soundsAudio_1_4.currentTime = 0;
    soundsAudio_1_4.play();
  }
  soundsAudio_1_5 = $( "#sounds_1_5" ).get(0);
  window.sounds_1_5 = function() {
    soundsAudio_1_5.currentTime = 0;
    soundsAudio_1_5.play();
  }
  soundsAudio_1_6 = $( "#sounds_1_6" ).get(0);
  window.sounds_1_6 = function() {
    soundsAudio_1_6.currentTime = 0;
    soundsAudio_1_6.play();
  }
  soundsAudio_1_7 = $( "#sounds_1_7" ).get(0);
  window.sounds_1_7 = function() {
    soundsAudio_1_7.currentTime = 0;
    soundsAudio_1_7.play();
  }
  soundsAudio_1_8 = $( "#sounds_1_8" ).get(0);
  window.sounds_1_8 = function() {
    soundsAudio_1_8.currentTime = 0;
    soundsAudio_1_8.play();
  }
  soundsAudio_1_9 = $( "#sounds_1_9" ).get(0);
  window.sounds_1_9 = function() {
    soundsAudio_1_9.currentTime = 0;
    soundsAudio_1_9.play();
  }
  soundsAudio_1_10 = $( "#sounds_1_10" ).get(0);
  window.sounds_1_10 = function() {
    soundsAudio_1_10.currentTime = 0;
    soundsAudio_1_10.play();
  }
  soundsAudio_1_11 = $( "#sounds_1_11" ).get(0);
  window.sounds_1_11 = function() {
    soundsAudio_1_11.currentTime = 0;
    soundsAudio_1_11.play();
  }
  soundsAudio_1_12 = $( "#sounds_1_12" ).get(0);
  window.sounds_1_12 = function() {
    soundsAudio_1_12.currentTime = 0;
    soundsAudio_1_12.play();
  }
  soundsAudio_1_13 = $( "#sounds_1_13" ).get(0);
  window.sounds_1_13 = function() {
    soundsAudio_1_13.currentTime = 0;
    soundsAudio_1_13.play();
  }
  soundsAudio_1_14 = $( "#sounds_1_14" ).get(0);
  window.sounds_1_14 = function() {
    soundsAudio_1_14.currentTime = 0;
    soundsAudio_1_14.play();
  }
  soundsAudio_1_15 = $( "#sounds_1_15" ).get(0);
  window.sounds_1_15 = function() {
    soundsAudio_1_15.currentTime = 0;
    soundsAudio_1_15.play();
  }
  drumsAudio_1_1 = $( "#drums_1_1" ).get(0);
  window.drums_1_1 = function() {
    drumsAudio_1_1.currentTime = 0;
    drumsAudio_1_1.play();
  }
  drumsAudio_1_2 = $( "#drums_1_2" ).get(0);
  window.drums_1_2 = function() {
    drumsAudio_1_2.currentTime = 0;
    drumsAudio_1_2.play();
  }
  drumsAudio_1_3 = $( "#drums_1_3" ).get(0);
  window.drums_1_3 = function() {
    drumsAudio_1_3.currentTime = 0;
    drumsAudio_1_3.play();
  }
  drumsAudio_1_4 = $( "#drums_1_4" ).get(0);
  window.drums_1_4 = function() {
    drumsAudio_1_4.currentTime = 0;
    drumsAudio_1_4.play();
  }
  drumsAudio_1_5 = $( "#drums_1_5" ).get(0);
  window.drums_1_5 = function() {
    drumsAudio_1_5.currentTime = 0;
    drumsAudio_1_5.play();
  }
  drumsAudio_1_6 = $( "#drums_1_6" ).get(0);
  window.drums_1_6 = function() {
    drumsAudio_1_6.currentTime = 0;
    drumsAudio_1_6.play();
  }
  drumsAudio_1_7 = $( "#drums_1_7" ).get(0);
  window.drums_1_7 = function() {
    drumsAudio_1_7.currentTime = 0;
    drumsAudio_1_7.play();
  }
  drumsAudio_1_8 = $( "#drums_1_8" ).get(0);
  window.drums_1_8 = function() {
    drumsAudio_1_8.currentTime = 0;
    drumsAudio_1_8.play();
  }
  drumsAudio_1_9 = $( "#drums_1_9" ).get(0);
  window.drums_1_9 = function() {
    drumsAudio_1_9.currentTime = 0;
    drumsAudio_1_9.play();
  }
  drumsAudio_1_10 = $( "#drums_1_10" ).get(0);
  window.drums_1_10 = function() {
    drumsAudio_1_10.currentTime = 0;
    drumsAudio_1_10.play();
  }

  cells = $(".cell")

  function sequencer() {
    cells.each(function() {
      if ($(this).hasClass( "active" )) {
        targetSound = ($(this).attr('targetSound'));
        fn = window[targetSound];
        if (typeof fn === "function") {
          fn();
        }
      }
    })
  }

  bar = $("#myBar");
  var width = 1;
  function timeBar() {
    if (width >= 100) {
        width = 1;
    } else {
        width+= 0.5;
        bar.width(width + '%');
    }
  }


  window.setInterval(sequencer, 4370);
  window.setInterval(timeBar, 22.1);
});



var drumsListener = function() {$( ".grid" ).on("click", ".drums", function() {
    var previousActive = $(this).parent().parent().find('.drums.active')
    if (previousActive.attr("class") != $(this).attr("class")) {
      previousActive.toggleClass("active");
      $(this).toggleClass("active");
    } else {
      $(this).toggleClass("active");
    }
  })
}

var soundsListener = function(queue) {$( ".grid" ).on("click", ".sounds", function() {
    if ($(this).hasClass("active")== false) {
      queue.push($(this));
      if (queue.length > 4) {
        queue.shift().toggleClass("active");
      }
    }
    $(this).toggleClass("active");
  })
}

var bassListener = function() {$( ".grid" ).on("click", ".bass", function() {
    var previousActive = $(this).parent().parent().find('.bass.active')
    if (previousActive.attr("class") != $(this).attr("class")) {
      previousActive.toggleClass("active");
      $(this).toggleClass("active");
    } else {
      $(this).toggleClass("active");
    }
  })
}




