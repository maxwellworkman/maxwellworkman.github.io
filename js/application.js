$(document).ready(function() {
  $( "#load" ).load( "loadAudio.html" );
  drumsListener();
  soundsListener();
  bassListener();
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

var audioCtx = new AudioContext();
var buffer = audioCtx.createBuffer(2, 22050, 44100);

