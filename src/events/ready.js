const DBL = require("dblapi.js")
const moment = require('moment');

module.exports = client => {
   
 
 /* let mamank = [`LISTENING`, `WATCHING`, `STREAMING`, `PLAYING`]
  let rmamank = Math.floor(Math.random() * mamank.length);*/
  /*function randStatus() {
        let status = [`Maintence`]
        let rstatus = Math.floor(Math.random() * status.length);*/
    client.user.setStatus("dnd")
       client.user.setActivity("in repair", {type: 'PLAYING'});
                /*client.user.setActivity("Spotify", {
          type: "LISTENING",
       url: "https://open.spotify.com/track/6qAzAmPBUpGrk7XADZHR5k?si=Jo2QrIn2SsipRQzGkFdgIw"
        });*/
  //client.user.setActivity("Nao Tomri | v 2.9.5", {type: "STREAMING"});
  //console.log(`Now status playing: ${status[rstatus]}`)
    //}; setInterval(randStatus, 60000)

  console.log(`${client.user.username} sudah online!`);
   // console.log(`Now status playing : ${status[rstatus]}`)
  
}
