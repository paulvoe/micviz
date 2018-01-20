//var THREE = { REVISION: '79' };


//if ( typeof define === 'function' && define.amd ) //{

	define( 'three', THREE );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

	module.exports = THREE;
    
    
    ----------------------------------------------

var "animationswahl" 
 setInterval(animationswahl, 2000); //Funktion alle 2s ausführen
  //animationswahl(); //einmal gleich beim Laden ausführen
    
funktion animationswahl() {
    
  var a = Math.floor(Math.random() * jeweilige anzahl der Animationen +1);
  var b= Math.floor(Math.random() * 256);
  var c = Math.floor(Math.random() * 256);
  var d= Math.floor(Math.random() * 256);
  var e = Math.floor(Math.random() * 256);
    
 document.getElementById("animation").style.backgroundColor="rgb("+red+","+green+","+blue+")";
    }