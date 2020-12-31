let previous = document.getElementById("previous");
let play = document.getElementById("play_btn");
let next = document.getElementById("next");
let title = document.getElementById("title");
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.getElementById("slider");
let show_duration = document.querySelector('#show_duration');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist =  document.getElementById("artist");

var song = "";
var artiist = "";


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
next.innerHTML= '<i class="fa fa-step-forward" aria-hidden="true">';
previous.innerHTML = '<i class="fa fa-step-backward" aria-hidden="true">'

//create a audio Element
let track = document.createElement('audio');

//All songs list
let All_song = [
  {
    name: "Chandelier",
    singer: "Sia",
    path: "Sia-Chandelier.mp3",
    no:1
  },
  {
    name: "Shallow",
    singer: "Lady Gaga & Breadly Cooper",
    path: "Shallow.mp3",
    no:2
  },
  {
    name: "Someone You Loved",
    singer: "Lewis Capaldi",
    path: "Lewis-Capaldi.mp3",
    no:3
  },
  {
    name: "Cold Hearted Women",
    singer: "Chris Bell",
    path: "Chris Bell.mp3",
    no:1
  },
  {
    name: "The Sky is Crying",
    singer: "Gary B. B. Coleman",
    path: "Gary.mp3",
    no:2
  },
  {
    name: "Need Her So Bad",
    singer: "Aynsley Lister",
    path: "aynsley.mp3",
    no:3
  },
  {
    name: "Neighbors",
    singer: "J Cole",
    path: "JCole.mp3",
    no:1
  },
  {
    name: "Blinding Lights",
    singer: "The Weeknd",
    path: "The-Weeknd.mp3",
    no:2
  },
  {
    name: "24k Magic",
    singer: "Bruno Mars",
    path: "Bruno-Mars.mp3",
    no:3
  }
];

let flag = 0;

// All functions
function fillTable(k, a) {
  pausesong();
  var table = document.getElementById("myTable");
  var main = document.getElementById("show");
  main.style.display="none";
  table.style.display = 'block';
  flag = a;
  //rows
  for (let i = 1; i < table.rows.length; i++) {
    //cells
    table.rows[i].cells[1].innerHTML = All_song[k].name
    table.rows[i].cells[2].innerHTML = All_song[k].singer
    k = k + 1;
  }
}

function display(){
  var table = document.getElementById("myTable");
  var main = document.getElementById("show");
  document.getElementById("ply1").addEventListener("click", function() {
    table.style.display = 'none';
    main.style.display = 'block';
    if(flag == 1){
      load_track(0)
      index_no=0;
    }
    if(flag == 2){
      load_track(3)
      index_no=3
    }
    if(flag == 3){
      load_track(6)
      index_no=6
    }
    playsong();
  })
  document.getElementById("ply2").addEventListener("click", function() {
    table.style.display = 'none';
    main.style.display = 'block';
    if(flag == 1){
      load_track(1)
      index_no=1
    }
    if(flag == 2){
      load_track(4)
      index_no=4
    }
    if(flag == 3){
      load_track(7)
      index_no=7
    }
    playsong();
  })
  document.getElementById("ply3").addEventListener("click", function() {
    table.style.display = 'none';
    main.style.display = 'block';
    if(flag == 1){
      load_track(2)
      index_no=2
    }
    if(flag == 2){
      load_track(5)
      index_no=5
    }
    if(flag == 3){
      load_track(8)
      index_no=8
    }
    playsong();
  })
  flag=0
}
display();

function back(){
  var table = document.getElementById("myTable");
  var main = document.getElementById("show");
  table.style.display = 'block';
  main.style.display = 'none';
  pausesong();
}
// function load the track
function load_track(index_no) {
  clearInterval(timer);
  reset_slider();

  track.src = All_song[index_no].path;
  title.innerHTML = All_song[index_no].name;
  artist.innerHTML = All_song[index_no].singer;
  track.load();

  timer = setInterval(range_slider, 1000);
  total.innerHTML = All_song.length/3;
  present.innerHTML = All_song[index_no].no;
}


//mute sound function
function mute_sound() {
  track.volume = 0;
  volume.value = 0;
  volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
function justplay() {
  if (Playing_song == false) {
    playsong();

  } else {
    pausesong();
  }
}


// reset song slider
function reset_slider() {
  slider.value = 0;
}

// play song
function playsong() {
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
  track.pause();
  Playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

// next song
function next_song() {
  if(index_no == 2){
    index_no=-1
  }
  if(index_no == 5){
    index_no=2
  }
  if(index_no == 8){
    index_no=5
  }
  if (index_no < All_song.length - 1) {
    index_no += 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = 0;
    load_track(index_no);
    playsong();
  }

}


// previous song
function previous_song() {
  if(index_no == 0) index_no=3
  if (index_no > 0) {
    index_no -= 1;
    load_track(index_no);
    playsong();

  } else {
    index_no = All_song.length;
    load_track(index_no);
    playsong();
  }
}


// change volume
function volume_change() {
  volume_show.innerHTML = recent_volume.value;
  track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration() {
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch() {
  if (autoplay == 1) {
    autoplay = 0;
    auto_play.style.background = "rgba(255,255,255,0.2)";
  } else {
    autoplay = 1;
    auto_play.style.background = "#FF8A65";
  }
}


function range_slider() {
  let position = 0;

  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }


  // function will run when the song is over
  if (track.ended) {
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    if (autoplay == 1) {
      index_no += 1;
      load_track(index_no);
      playsong();
    }
  }
}