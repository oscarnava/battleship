!function(t){var i={};function e(s){if(i[s])return i[s].exports;var o=i[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var o in t)e.d(s,o,function(i){return t[i]}.bind(null,o));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);const s=10,o=30,r=3,h="#065471",a="#4b8e8d",n=[5,4,3,3,2,2,2];class l{constructor({length:t,pos:[i,e],vertical:s=!1}){this.length=t,this.x=i,this.y=e,this.vertical=s,this.hits=[],this.isShip=!0,this._coord=null}getCoordinates(){if(!this._coord){this._coord=[];for(let t=0;t<this.length;t+=1)this._coord.push(this.vertical?[this.x,this.y+t]:[this.x+t,this.y])}return this._coord}gotHit(t,i){const e=this.vertical?i-this.y:t-this.x;return e>=0&&e<this.length}setDamage(t,i){if(this.gotHit(t,i)){const e=t+i*s;this.hits.includes(e)||this.hits.push(e)}}get damage(){return this.hits.length}isSunk(){return this.hits.length===this.length}moveTo(t,i){this.x=t,this.y=i,this._coord=null}turn(){this.vertical=!this.vertical,this._coord=null}reset(){return this._coord=null,this}placeRandom(t){this.x=Math.floor(Math.random()*(t.boardSize-this.length+1)),this.y=Math.floor(Math.random()*(t.boardSize-this.length+1)),this.vertical=Math.random()>=.5,this._coord=null}toString(){return`Ship[${this.length}] @ (${this.x}, ${this.y}); damage: ${this.damage}`}}const d=".",c="H",p="X";class u{constructor(t=s){this.boardSize=t,this.ships=[],this.board=Array.from({length:this.boardSize},()=>Array(this.boardSize).fill(d)),this.validMoves=Array.from({length:this.boardSize*this.boardSize},(t,i)=>i)}getCell(t,i){return this.board[t][i]}forEachShip(t){this.ships.forEach(t)}getStrategicMove(t){return t(this.validMoves.map(t=>({x:t%this.boardSize,y:Math.floor(t/this.boardSize)})))}canPlaceShip(t){const i=t.isShip?t.reset():new l(t);return!(i.x<0||i.y<0)&&!i.getCoordinates().find(([t,i])=>t>=this.boardSize||i>=this.boardSize||this.board[t][i]!==d)}placeShip(t){const i=t.isShip?t.reset():new l(t);return this.ships.push(i),i.getCoordinates().forEach(([t,e])=>{this.board[t][e]=i}),i}removeShip(t){t.getCoordinates().forEach(([t,i])=>{this.board[t][i]=d}),this.ships=this.ships.filter(i=>i!==t)}isWater(t,i){return this.board[t][i]===d}isHit(t,i){return this.board[t][i]===c}isMiss(t,i){return this.board[t][i]===p}isShip(t,i){return!!this.board[t][i].isShip}isValidMove(t,i){return this.isWater(t,i)||this.isShip(t,i)}receiveAttack(t,i){const e=this.board[t][i];e.isShip?(e.setDamage(t,i),this.board[t][i]=c):this.board[t][i]=p,this.validMoves=this.validMoves.filter(e=>e!==i*this.boardSize+t)}allSunk(){return!this.ships.find(t=>!t.isSunk())}shuffleShips(){this.ships.forEach(t=>{for(this.removeShip(t),t.placeRandom(this);!this.canPlaceShip(t);)t.placeRandom(this);this.placeShip(t)})}forEachMove(t){for(let i=0;i<this.boardSize;i+=1)for(let e=0;e<this.boardSize;e+=1)this.isHit(i,e)&&t(i,e,!0),this.isMiss(i,e)&&t(i,e,!1)}toString(){let t="";for(let i=0;i<this.boardSize;i+=1){for(let e=0;e<this.boardSize;e+=1)t+=this.board[e][i].isShip?"S":this.board[e][i];t+="\n"}return t}}const f=document.getElementById("canvas"),S=f.getContext("2d");let b;const v=async()=>{return Promise.all(["splash","explosion","ship-2","ship-3","ship-4","ship-5"].map(t=>new Promise((i,e)=>{const s=new Image;s.src=`./clipart/${t}.svg`,s.onload=()=>i(s),s.onerror=()=>e(new Error("Could not load img"))})))},g=t=>b[t],m=(t,i,e,s,h)=>{S.drawImage(t,i+s*o+r,e+h*o+r,o-2*r,o-2*r)};class M{constructor(t,i,e,s=!1){this.board=t,this.left=i,this.top=e,this.blind=s,this.size=t.boardSize*o,this.size=t.boardSize*o,this.editMode=!1;let r=-1,h=-1;this.onMouseMove((t,i)=>{t===r&&i===h||(r=t,h=i,this.board.allSunk()||!this.editMode&&!this.board.isValidMove(t,i)?f.style.cursor="not-allowed":f.style.cursor="crosshair")}),f.addEventListener("mouseleave",()=>{f.style.cursor="default"})}drawBoard(){S.fillStyle=h,S.fillRect(this.left,this.top,this.size,this.size);for(let t=o;t<this.size;t+=o)S.beginPath(),S.lineWidth="2",S.strokeStyle=a,S.moveTo(this.left+t,this.top),S.lineTo(this.left+t,this.top+this.size),S.moveTo(this.left,this.top+t),S.lineTo(this.left+this.size,this.top+t),S.stroke();S.strokeStyle="#219897",S.lineWidth="4",S.strokeRect(this.left-2,this.top-2,this.size+4,this.size+4)}drawShip(t,i=1,e=t.x,s=t.y){const{length:h,vertical:a}=t,n=g(h),l=this.left+e*o,d=this.top+s*o,c=h*o-2*r,p=o-2*r;S.save(),this.editMode&&(S.lineWidth="0",S.rect(this.left,this.top,this.size,this.size),S.clip()),S.globalAlpha=i,a?(S.translate(l+o,d),S.rotate(Math.PI/2),S.drawImage(n,r,r,c,p)):S.drawImage(n,l+r,d+r,c,p),S.restore()}drawShips(){this.board.forEachShip(t=>{this.blind&&!t.isSunk()?this.drawShip(t,0):this.drawShip(t)})}drawMoves(){this.board.forEachMove((t,i,e)=>{e?this.drawHit(t,i):this.drawMiss(t,i)})}drawGameOver(){S.fillStyle="red",S.font=`bold ${1.5*o}px sans-serif`;const{width:t,actualBoundingBoxAscent:i}=S.measureText("Game over");S.fillText("Game over",this.left+(this.size-t)/2,this.top+(this.size+i)/2)}async draw(){this.drawBoard(),b||(b=await v()),this.drawShips(),this.drawMoves(),this.board.allSunk()&&this.drawGameOver()}drawMiss(t,i){m(b[0],this.left,this.top,t,i)}drawHit(t,i){m(b[1],this.left,this.top,t,i)}mouseEvent(t,i){const{clientX:e=-1,clientY:s=-1}=t,{left:r,top:h}=f.getBoundingClientRect(),a=Math.floor((e-this.left-r)/o),n=Math.floor((s-this.top-h)/o);a>=0&&n>=0&&a<this.board.boardSize&&n<this.board.boardSize&&(i(a,n,this.board.getCell(a,n),this),t.preventDefault())}onClick(t){f.addEventListener("click",i=>{this.editMode||this.board.allSunk()||this.mouseEvent(i,t)})}onMouseMove(t){f.addEventListener("mousemove",i=>this.mouseEvent(i,t))}onMouseDown(t){f.addEventListener("mousedown",i=>this.mouseEvent(i,t))}onMouseUp(t){f.addEventListener("mouseup",i=>this.mouseEvent(i,t))}onDblClick(t){f.addEventListener("dblclick",i=>this.mouseEvent(i,t))}}class w{constructor(t){this.gameboard=t}strategy(t){return t[Math.floor(Math.random()*t.length)]}getMove(){return this.gameboard.getStrategicMove(this.strategy.bind(this))}}let y,z,E,x,k,P,_;const C=(t,i,e)=>{const s=e.board;return s.receiveAttack(t,i),s.isHit(t,i)?(e.draw(),!0):(e.drawMiss(t,i),!1)},T=(t,i,e,s)=>{if(s.board.isValidMove(t,i)){if(!C(t,i,s))for(;;){const{x:t,y:i}=y.getMove();if(!C(t,i,x))break}x.editMode=!1}},O=(t,i,e,s)=>{if(!s.editMode)return;const o=s.board;e.isShip&&(P=e,o.removeShip(e),s.draw(),_={length:e.length,pos:[t,i],vertical:e.vertical},s.drawShip(P,.9,t,i))},H=(t,i,e,s)=>{if(!P||_.pos[0]===t&&_.pos[1]===i)return;const o=s.board;s.draw(),_.pos=[t,i],o.canPlaceShip(_)?s.drawShip(P,.9,t,i):s.drawShip(P,.5,t,i)},j=(t,i,e,s)=>{const o=s.board;_.pos=[t,i],P&&o.canPlaceShip(_)&&(o.canPlaceShip(_),P.moveTo(t,i)),o.placeShip(P),s.draw(),P=null},A=(t,i,e,s)=>{if(!s.editMode)return;const o=s.board;if(e.isShip){o.removeShip(e);const r={length:e.length,pos:[t,i],vertical:!e.vertical};o.canPlaceShip(r)&&e.turn(),o.placeShip(e),s.draw()}};z=new u,E=new u,x=new M(z,20,20),k=new M(E,x.left+x.size+20,x.top,!0),n.forEach((t,i)=>{z.placeShip({length:t,pos:[i,0],vertical:!0}),E.placeShip({length:t,pos:[i,0],vertical:!0})}),y=new w(z),z.shuffleShips(),E.shuffleShips(),x.draw(),k.draw(),k.onClick(T),x.onMouseDown(O),x.onMouseUp(j),x.onMouseMove(H),x.onDblClick(A),x.editMode=!0}]);