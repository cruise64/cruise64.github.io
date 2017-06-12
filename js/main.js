function convert(x,y,w,h){
    return [x,y*-1+h/2];
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}
function test(angle,planet){
    const width = planet.width;
    const height = planet.height;
    // use min to adjust the radius on mobile (or a really small browser)
    var radius = Math.min(planet.width/2,window.innerWidth/2);//200;
    if(radius<400){
        radius = Math.min(radius*2,window.innerWidth/2)
    }
    var x = 0 + radius * Math.cos(toRadians(angle));
    var y = 450 + radius * Math.sin(toRadians(angle));
    var pos = convert(x,y,width,height); 
    return [x,y]
    
}
function moveTo(angle,planet,element){
    const width = planet.width;
    const height = planet.height;
    var pos = test(angle,planet)
    //console.log(pos,element)
    pos = convert(pos[0],pos[1],width,height); 
    pos[0]-=planet.width/2+30
    // put y into the z argument, to make the orbit parrallel to the user
    // change the y axis by a portion of the z, to give the illusion of a tilted orbit.
    element.style.transform = " perspective(500px) translate3d(" + (pos[0]).toString() + "px," + (pos[1]/10).toString() + "px," + pos[1].toString() + "px)";
    // fade the text as the z axis increases
    element.style.opacity = Math.min(pos[1]*0.3,1)
}
function an(offset,calibrate){
    var x = document.getElementById("orbitz");
    x = x.getElementsByTagName("p");
    var planet = document.getElementById("planet");
    var positions = [];
    // generate a set of angles equal distances apart, based on the amount of <p> tags
    // 20 degrees offset to get it just right
    // this may make it less compatible with other planet images
    for(var i=0;i<x.length;i++){
        positions.push((360/x.length)*(i+1)+100);
    }
    // right-shift positions
    for(i=0;i<x.length;i++){
        moveTo(positions[(i+offset) % (x.length)],planet,x[i]);
    }
    if(calibrate !== true){
        setTimeout(function(){
            an((offset+1) % x.length);
        },4000);   
    }
}
function boot(){
    // place orbiting text in their positions first, so we don't see this happening.
    an(0,true);
    // add transition time afterwards
    setTimeout(function(){
        const s = document.styleSheets
        var st;
        for(var i=0;i<s.length;i++){
            if(s[i].href.toString().search("main.css") >=0){
                s[i].insertRule(".orbit{transition: all 2s ease-in-out;}",1);
                break
            }
        }
    },1)
    an(1)
}