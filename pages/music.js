function getUrl(pagetoken) {
  var pt = typeof pagetoken === "undefined" ? "" : `&pageToken=${pagetoken}`,
    mykey = "AIzaSyB5wxwfSy47iW5CDNNkwLXRhxSd0kIdHnI",
    playListID = "PLkIuQ1b3Y3bhUNTX2iw-RWALd_J53bbxf",
    URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playListID}&key=${mykey}${pt}`;
  return URL;
}

async function apiCall(npt) {
  fetch(getUrl(npt))
    .then((response) => {
      return response.json();
    })
    .then(function (response) {
      if (response.error) {
        console.log(response.error);
      } else {
        responseHandler(response);
        if (response.items.length < 50) {
          randomSong();
        }
      }
    });
}

function responseHandler(response) {
  if (response.nextPageToken) apiCall(response.nextPageToken);

  //console.log(response);
  songs = songs.concat(response.items);
  //console.log(songs.length);
  //console.log(songs);
}
function randomSong() {
  song = Math.floor(Math.random() * songs.length);
  console.log(songs);
  //var a = document.getElementById('player'); //or grab it by tagname etc
  let a = document.getElementById("player");
  a.setAttribute(
    "src",
    songUrl + songs[song].snippet.resourceId.videoId + "?autoplay=1"
  );
  document.getElementById("info").innerHTML =
    songs[song].snippet.title +
    " by " +
    songs[song].snippet.videoOwnerChannelTitle;
  redirectUrl =
    "https://www.youtube.com/watch?v=" + songs[song].snippet.resourceId.videoId;
}
function redirectToSong() {
  window.location.replace(redirectUrl);
}
let songUrl = "https://www.youtube.com/embed/";
let redirectUrl = "https://www.youtube.com/watch?v=";
let songs = [];
let song;
apiCall();
