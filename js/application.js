$(document).ready(function() {
  drumsListener();
  soundsListener();
  bassListener();

  bassAudio_1_1 = $( "#bass_1_1" );
  window.bass_1_1 = function() {
    bassAudio_1_1.currentTime = 0;
    bassAudio_1_1.play();
  }

  bassAudio_1_2 = $( "#bass_1_2" );
  window.bass_1_2 = function() {
    bassAudio_1_2.currentTime = 0;
    bassAudio_1_2.play();
  }

  bassAudio_1_3 = $( "#bass_1_3" );
  window.bass_1_3 = function() {
    bassAudio_1_3.currentTime = 0;
    bassAudio_1_3.play();
  }

  bassAudio_1_4 = $( "#bass_1_4" );
  window.bass_1_4 = function() {
    bassAudio_1_4.currentTime = 0;
    bassAudio_1_4.play();
  }

  bassAudio_1_5 = $( "#bass_1_5" );
  window.bass_1_5 = function() {
    bassAudio_1_5.currentTime = 0;
    bassAudio_1_5.play();
  }

  function sequencer() {
    console.log("4 seconds")
    $(".cell").each(function() {
      console.log($(this))
      if ($(this).hasClass( "active" )) {
        targetSound = ($(this).attr('targetSound'));
        fn = window[targetSound];
        if (typeof fn === "function") {
          fn();
        }
      }
    })
  }

  window.setInterval(sequencer, 4000);
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

var soundsListener = function() {$( ".grid" ).on("click", ".sounds", function() {
    var queue = [];
    queue.push($(this))
    if (queue.length > 3) {
      console.log("Do we get here?")
      queue.shift().toggleClass("active");
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




