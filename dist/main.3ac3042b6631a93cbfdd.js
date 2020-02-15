!function(t){var e={};function i(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(s,o,function(e){return t[e]}.bind(null,o));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);const s=10,o=Math.floor(300/s),r=3,h="#065471",a="#4b8e8d",n=[5,4,3,3,2,2,2];class l{constructor({length:t,pos:[e,i],vertical:s=!1}){this.length=t,this.x=e,this.y=i,this.vertical=s,this.hits=[],this.isShip=!0,this._coord=null}get coordinates(){if(!this._coord){this._coord=[];for(let t=0;t<this.length;t+=1)this._coord.push(this.vertical?[this.x,this.y+t]:[this.x+t,this.y])}return this._coord}gotHit(t,e){const i=this.vertical?e-this.y:t-this.x;return i>=0&&i<this.length}setDamage(t,e){if(this.gotHit(t,e)){const i=t+e*s;this.hits.includes(i)||this.hits.push(i)}}get damage(){return this.hits.length}get isSunk(){return this.hits.length===this.length}moveTo(t,e){return this.x=t,this.y=e,this.reset()}turn(){return this.vertical=!this.vertical,this.reset()}reset(){return this._coord=null,this}placeRandom(t){this.x=Math.floor(Math.random()*(t.boardSize-this.length+1)),this.y=Math.floor(Math.random()*(t.boardSize-this.length+1)),this.vertical=Math.random()>=.5,this._coord=null}toString(){return`Ship[${this.length}] @ (${this.x}, ${this.y}); damage: ${this.damage}`}}const d=".",c="*",u="x",p="$";class f{constructor(t=s){this.boardSize=t,this.ships=[],this.board=Array.from({length:this.boardSize},()=>Array(this.boardSize).fill(d)),this.validMoves=Array.from({length:this.boardSize*this.boardSize},(t,e)=>e),this.probs=null}getCell(t,e){return this.board[t][e]}forEachShip(t){this.ships.forEach(t)}getStrategicMove(t){return t(this.validMoves.map(t=>({x:t%this.boardSize,y:Math.floor(t/this.boardSize)})))}canPlaceShip(t){const e=t.isShip?t.reset():new l(t);return!(e.x<0||e.y<0)&&!e.coordinates.find(([t,e])=>t>=this.boardSize||e>=this.boardSize||this.board[t][e]!==d)}placeShip(t){const e=t.isShip?t.reset():new l(t);return this.ships.push(e),e.coordinates.forEach(([t,i])=>{this.board[t][i]=e}),e}removeShip(t){t.coordinates.forEach(([t,e])=>{this.board[t][e]=d}),this.ships=this.ships.filter(e=>e!==t)}isWater(t,e){return this.board[t][e]===d}isSunk(t,e){return this.board[t][e]===p}isHitOnly(t,e){return this.board[t][e]===c}isHit(t,e){return this.isHitOnly(t,e)||this.isSunk(t,e)}isMiss(t,e){return this.board[t][e]===u}isShip(t,e){return!!this.board[t][e].isShip}isValidMove(t,e){return this.isWater(t,e)||this.isShip(t,e)}receiveAttack(t,e){const i=this.board[t][e];i.isShip?(i.setDamage(t,e),i.isSunk?i.coordinates.forEach(([t,e])=>{this.board[t][e]=p}):this.board[t][e]=c):this.board[t][e]=u,this.validMoves=this.validMoves.filter(i=>i!==e*this.boardSize+t)}allSunk(){return!this.ships.find(t=>!t.isSunk)}shipsLeft(){return this.ships.filter(t=>!t.isSunk).map(t=>t.length)}shuffleShips(){this.ships.forEach(t=>{for(this.removeShip(t),t.placeRandom(this);!this.canPlaceShip(t);)t.placeRandom(this);this.placeShip(t)})}forEachMove(t){for(let e=0;e<this.boardSize;e+=1)for(let i=0;i<this.boardSize;i+=1)this.isHit(e,i)&&t(e,i,!0),this.isMiss(e,i)&&t(e,i,!1)}toString(){let t="";for(let e=0;e<this.boardSize;e+=1){for(let i=0;i<this.boardSize;i+=1)t+=this.board[i][e].isShip?"S":this.board[i][e];t+="\n"}return t}}const b=document.getElementById("canvas"),S=b.getContext("2d");let g;const v=async()=>{return Promise.all(["splash","explosion","ship-2","ship-3","ship-4","ship-5"].map(t=>new Promise((e,i)=>{const s=new Image;s.src=`./clipart/${t}.svg`,s.onload=()=>e(s),s.onerror=()=>i(new Error("Could not load img"))})))},m=t=>g[t],M=(t,e,i,s,h)=>{S.drawImage(t,e+s*o+r,i+h*o+r,o-2*r,o-2*r)};class w{constructor(t,e,i,s="Human",r=!1){this.board=t,this.left=e,this.top=i,this.blind=r,this.name=s,this.size=t.boardSize*o,this.size=t.boardSize*o,this.editMode=!1,this.debugMode=!1;let h=-1,a=-1;this.onMouseMove((t,e)=>{t===h&&e===a||(h=t,a=e,this.board.allSunk()||!this.editMode&&!this.board.isValidMove(t,e)?b.style.cursor="not-allowed":b.style.cursor="crosshair")}),b.addEventListener("mouseleave",()=>{b.style.cursor="default"})}get debugging(){return!(!(this.debugMode&&this.board&&this.board.probs)||this.board.allSunk())}drawProbs(){const{probs:t}=this.board,e=o-2*r,i=t.reduce((t,e)=>Math.max(t,...e),0);S.save(),S.fillStyle="#01024e",S.fillStyle="#800000",t.forEach((t,s)=>{const h=this.top+s*o+r;t.forEach((t,s)=>{const a=t/i,n=this.left+s*o+r;S.globalAlpha=a,S.fillRect(n,h,e,e)})}),S.restore()}drawBoard(){S.fillStyle=this.debugging?"white":h,S.fillRect(this.left,this.top,this.size,this.size);for(let t=o;t<this.size;t+=o)S.beginPath(),S.lineWidth="2",S.strokeStyle=a,S.moveTo(this.left+t,this.top),S.lineTo(this.left+t,this.top+this.size),S.moveTo(this.left,this.top+t),S.lineTo(this.left+this.size,this.top+t),S.stroke();S.strokeStyle="#219897",S.lineWidth="4",S.strokeRect(this.left-2,this.top-2,this.size+4,this.size+4)}drawShip(t,e=1,i=t.x,s=t.y){const{length:h,vertical:a}=t,n=m(h),l=this.left+i*o,d=this.top+s*o,c=h*o-2*r,u=o-2*r;S.save(),this.editMode&&(S.lineWidth="0",S.rect(this.left,this.top,this.size,this.size),S.clip()),S.globalAlpha=e,a?(S.translate(l+o,d),S.rotate(Math.PI/2),S.drawImage(n,r,r,c,u)):S.drawImage(n,l+r,d+r,c,u),S.restore()}drawShips(){this.board.forEachShip(t=>{this.blind&&!t.isSunk||this.drawShip(t,this.debugging?.5:1)})}drawMoves(){this.board.forEachMove((t,e,i)=>{i?this.drawHit(t,e):this.drawMiss(t,e)})}drawText(t,e){const{color:i="#ee0000",size:s=1,top:r=this.size/2}=e;S.fillStyle=i,S.font=`bold ${o*s}px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;const{width:h,actualBoundingBoxAscent:a}=S.measureText(t);S.fillText(t,this.left+(this.size-h)/2,this.top+r+a/2)}drawGameOver(){this.drawText("Game over",{size:1.3,top:.8*this.size}),this.drawText(`${this.name} lost!`,{color:"#ffff00",size:.7,top:.9*this.size})}async draw(){this.drawBoard(),g||(g=await v()),this.debugging&&this.drawProbs(),this.drawShips(),this.drawMoves(),this.board.allSunk()&&this.drawGameOver()}drawMiss(t,e){M(g[0],this.left,this.top,t,e)}drawHit(t,e){M(g[1],this.left,this.top,t,e)}mouseEvent(t,e){const{clientX:i=-1,clientY:s=-1}=t,{left:r,top:h}=b.getBoundingClientRect(),a=Math.floor((i-this.left-r)/o),n=Math.floor((s-this.top-h)/o);a>=0&&n>=0&&a<this.board.boardSize&&n<this.board.boardSize&&(e(a,n,this.board.getCell(a,n),this),t.preventDefault())}onClick(t){b.addEventListener("click",e=>{this.editMode||this.board.allSunk()||this.mouseEvent(e,t)})}onMouseMove(t){b.addEventListener("mousemove",e=>this.mouseEvent(e,t))}onMouseDown(t){b.addEventListener("mousedown",e=>this.mouseEvent(e,t))}onMouseUp(t){b.addEventListener("mouseup",e=>this.mouseEvent(e,t))}onDblClick(t){b.addEventListener("dblclick",e=>this.mouseEvent(e,t))}}const y=(t,e,i)=>{const s=t.coordinates;if(s.find(([t,i])=>e.isMiss(t,i)||e.isSunk(t,i)))return;const o=s.reduce((t,[i,s])=>t*(e.isHitOnly(i,s)?5:1),1);s.forEach(([t,s])=>{e.isHitOnly(t,s)||(i[s][t]+=o)})};class z{constructor(t){this.gameboard=t}testShipSize(t,e){const i=this.gameboard,s=i.boardSize,o=new l({length:t,pos:[0,0]});for(let r=0;r<s;r+=1)for(let h=0;h<s-t+1;h+=1)y(o.moveTo(h,r),i,e);o.turn();for(let r=0;r<s;r+=1)for(let h=0;h<s-t+1;h+=1)y(o.moveTo(r,h),i,e);return e}strategy(t){const e=this.gameboard.boardSize,i=Array.from({length:e},()=>Array(e).fill(0));this.gameboard.shipsLeft().forEach(t=>{this.testShipSize(t,i)});for(let e=0;e<t.length-1;e+=1){const i=Math.floor(Math.random()*t.length);if(e!==i){const s=t[e];t[e]=t[i],t[i]=s}}return this.gameboard.probs=i,t.reduce((t,e)=>i[t.y][t.x]>i[e.y][e.x]?t:e)}getMove(){return this.gameboard.getStrategicMove(this.strategy.bind(this))}}const x={explosion:{url:"media/explosion.mp3"},splash:{url:"media/splash.mp3"}},E=new AudioContext;function k(t){const e=x[t],{url:i}=e,s=new XMLHttpRequest;s.open("GET",i,!0),s.responseType="arraybuffer",s.onload=()=>{E.decodeAudioData(s.response,t=>{e.buffer=t})},s.send()}function T(t,e){const i=x[t],s=x[t].volume||1,{buffer:o}=i;if(o){const t=E.createBufferSource();t.buffer=o;const i=E.createGain();e?e.volume&&(i.gain.value=s*e.volume):i.gain.value=s,i.connect(E.destination),t.connect(i),t.start(0)}}for(const t in x)k(t);let P,H,O,_,A,C,L;const D=()=>H.allSunk()||O.allSunk(),R=(t,e,i)=>{const s=i.board;return s.receiveAttack(t,e),i.draw(),s.isHit(t,e)?(T("explosion"),!0):(i.drawMiss(t,e),T("splash"),!1)};let $=!1;const j=async()=>{const{x:t,y:e}=P.getMove();R(t,e,_)&&!D()?setTimeout(j,2e3):$=!1},B=async(t,e,i,s)=>{$||D()||(_.debugMode=document.querySelector("#debug").checked,s.board.isValidMove(t,e)&&($=!0,R(t,e,s)?$=!1:await setTimeout(j,1e3),_.editMode=!1))},I=(t,e,i,s)=>{if(!s.editMode)return;const o=s.board;i.isShip&&(C=i,o.removeShip(i),s.draw(),L={length:i.length,pos:[t,e],vertical:i.vertical},s.drawShip(C,.9,t,e))},G=(t,e,i,s)=>{if(!C||L.pos[0]===t&&L.pos[1]===e)return;const o=s.board;s.draw(),L.pos=[t,e],o.canPlaceShip(L)?s.drawShip(C,.9,t,e):s.drawShip(C,.5,t,e)},W=(t,e,i,s)=>{const o=s.board;L.pos=[t,e],C&&o.canPlaceShip(L)&&(o.canPlaceShip(L),C.moveTo(t,e)),o.placeShip(C),s.draw(),C=null},V=(t,e,i,s)=>{if(!s.editMode)return;const o=s.board;if(i.isShip){o.removeShip(i);const r={length:i.length,pos:[t,e],vertical:!i.vertical};o.canPlaceShip(r)&&i.turn(),o.placeShip(i),s.draw()}};H=new f,O=new f,_=new w(H,20,20,"Human"),A=new w(O,_.left+_.size+20,_.top,"Computer",!0),n.forEach((t,e)=>{H.placeShip({length:t,pos:[e,0],vertical:!0}),O.placeShip({length:t,pos:[e,0],vertical:!0})}),P=new z(H),H.shuffleShips(),O.shuffleShips(),_.draw(),A.draw(),A.onClick(B),_.onMouseDown(I),_.onMouseUp(W),_.onMouseMove(G),_.onDblClick(V),_.editMode=!0}]);