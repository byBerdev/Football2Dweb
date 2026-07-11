const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
}
resize();
window.onresize=resize;

const player={
    x:200,
    y:200,
    r:20
};

const ball={
    x:300,
    y:250,
    r:12,
    vx:0,
    vy:0
};

let moveX=0;
let moveY=0;

function update(){

    player.x+=moveX*4;
    player.y+=moveY*4;

    ball.x+=ball.vx;
    ball.y+=ball.vy;

    ball.vx*=0.98;
    ball.vy*=0.98;

    let dx=ball.x-player.x;
    let dy=ball.y-player.y;
    let dist=Math.sqrt(dx*dx+dy*dy);

    if(dist<player.r+ball.r){
        ball.x=player.x+dx/dist*(player.r+ball.r);
        ball.y=player.y+dy/dist*(player.r+ball.r);
    }

}

function draw(){

    ctx.fillStyle="#3d9b3d";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="white";
    ctx.fillRect(canvas.width-20,canvas.height/2-80,20,160);

    ctx.beginPath();
    ctx.arc(player.x,player.y,player.r,0,Math.PI*2);
    ctx.fillStyle="blue";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fillStyle="white";
    ctx.fill();

}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();

const joystick=document.getElementById("joystick");
const stick=document.getElementById("stick");

let active=false;

joystick.addEventListener("pointerdown",()=>active=true);

window.addEventListener("pointerup",()=>{
active=false;
moveX=0;
moveY=0;
stick.style.left="35px";
stick.style.top="35px";
});

window.addEventListener("pointermove",(e)=>{

if(!active)return;

const rect=joystick.getBoundingClientRect();

let x=e.clientX-rect.left-60;
let y=e.clientY-rect.top-60;

let len=Math.sqrt(x*x+y*y);

if(len>40){
    x=x/len*40;
    y=y/len*40;
}

stick.style.left=(35+x)+"px";
stick.style.top=(35+y)+"px";

moveX=x/40;
moveY=y/40;

});

document.getElementById("kick").onclick=()=>{

let dx=ball.x-player.x;
let dy=ball.y-player.y;
let d=Math.sqrt(dx*dx+dy*dy);

if(d<60){
    ball.vx=dx/d*12;
    ball.vy=dy/d*12;
}

}
