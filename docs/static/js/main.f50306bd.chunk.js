(this["webpackJsonpphys-prj"]=this["webpackJsonpphys-prj"]||[]).push([[0],{28:function(e,t,n){e.exports=n(49)},33:function(e,t,n){},43:function(e,t,n){},48:function(e,t,n){e.exports=n.p+"static/media/rand.7fb5be4a.jpg"},49:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),r=n(25),s=n.n(r),c=(n(33),n(1)),o=n(6),l=n(10),u=n(9),d=n(8),h=n(14),p=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var i;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a>1?a-1:0),s=1;s<a;s++)r[s-1]=arguments[s];return(i=t.call(this,r)).renderTarget=void 0,i.G=void 0,i.app=void 0,i.prevUpdateTime=void 0,i.screen=void 0,i.fps=60,i.title=void 0,i.initPIXI=function(e){i.app=new h.a({width:i.screen.screenWidth,height:i.screen.screenHeight,backgroundColor:e,antialias:!0}),i.renderTarget.appendChild(i.app.view),i.app.start(),i.app.stage.addChild(i.G),i.prevUpdateTime=Date.now()},i.title=e,i.G=new h.b,i}return n}(i.Component),m=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e.title)).draw=function(){i.G.lineStyle(0),i.G.beginFill(14561865,1),i.G.drawCircle(100,250,50),i.G.endFill()},i.update=function(){i.draw(),setTimeout(i.update,16.7)},i.handlePress=function(e){},i}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.screen={screenHeight:window.innerHeight,screenWidth:window.innerWidth,startX:0,endX:15,startY:0,endY:10},this.initPIXI(0),this.update()}},{key:"render",value:function(){var e=this,t=this;return document.addEventListener("keyup",(function(t){e.handlePress(t)})),a.a.createElement("div",{className:"GameFrameWrapper"},a.a.createElement("div",{ref:function(e){t.renderTarget=e},onMouseMove:function(e){}}))}}]),n}(p),v=function e(t,n){var i=this;Object(o.a)(this,e),this.x=void 0,this.y=void 0,this.length=function(){return Math.sqrt(i.x*i.x+i.y*i.y)},this.radians=function(){return Math.atan2(i.y,i.x)},this.congugate=function(){return new e(i.x,-i.y)},this.inv=function(){return new e(-i.x,-i.y)},this.add=function(t){return new e(i.x+t.x,i.y+t.y)},this.sub=function(t){return new e(i.x-t.x,i.y-t.y)},this.multScalar=function(t){return new e(i.x*t,i.y*t)},this.dot=function(e){return i.x*e.x+i.y*e.y},this.x=t,this.y=n};v.fromPolar=function(e,t){return new v(e*Math.cos(t),e*Math.sin(t))};var f=function(){function e(t,n,i){var a=this;Object(o.a)(this,e),this.pos=void 0,this.vel=void 0,this.acc=void 0,this.g=void 0,this.setPos=function(e){return a.pos=e},this.setVel=function(e){return a.vel=e},this.setAcc=function(e){return a.acc=e},this.pos=t,this.vel=n,this.acc=i,this.g=new h.b}return Object(l.a)(e,[{key:"update",value:function(e){this.pos=this.pos.add(this.vel.multScalar(e)),this.vel=this.vel.add(this.acc.multScalar(e))}},{key:"posToPx",value:function(e){var t=(e.endY-e.startY)/e.screenHeight,n=(e.endX-e.startX)/e.screenWidth,i=(this.pos.x-e.startX)/n,a=-1*(this.pos.y-e.endY)/t;return new v(i,a)}},{key:"draw",value:function(e){this.g.clear();var t=this.posToPx(e);this.g.lineStyle(0),this.g.beginFill(14561865,1),this.g.drawCircle(t.x,t.y,20),this.g.endFill()}}]),e}(),w=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e.title)).ball=void 0,i.draw=function(){i.ball.draw(i.screen)},i.update=function(){var e=(Date.now()-i.prevUpdateTime)/1e3;i.ball.update(e),(i.ball.pos.y<i.screen.startY||i.ball.pos.y>i.screen.endY||i.ball.pos.x<i.screen.startX||i.ball.pos.x>i.screen.endX)&&(i.ball.setAcc(new v(0,0)),i.ball.setVel(new v(0,0))),i.draw(),i.prevUpdateTime=Date.now(),setTimeout(i.update,16.66)},i.handlePress=function(e){},i}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.screen={screenHeight:window.innerHeight,screenWidth:window.innerWidth,startX:0,endX:10,startY:0,endY:3},this.initPIXI(0),this.ball=new f(new v(2,0),new v(3,7),new v(0,-10)),this.app.stage.addChild(this.ball.g),this.update()}},{key:"render",value:function(){var e=this,t=this;return document.addEventListener("keyup",(function(t){e.handlePress(t)})),a.a.createElement("div",{className:"GameFrameWrapper"},a.a.createElement("div",{ref:function(e){t.renderTarget=e},onMouseMove:function(e){}}))}}]),n}(p),b=(n(43),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).state={isClicked:!1,isHovered:!1},i}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return this.state.isClicked?a.a.createElement(c.a,{to:{pathname:this.props.link}}):a.a.createElement("div",{className:"card-container",onClick:function(t){return e.setState({isClicked:!0})}},a.a.createElement("div",{className:"card title"},this.props.title),a.a.createElement("div",{className:"card-descriptor"},this.props.description))}}]),n}(i.Component)),y=n(48),g=function(){return a.a.createElement("div",{className:"home"},a.a.createElement("h1",null,"Welcome to the home of Theo's physics sims"),a.a.createElement("p",null,"you will notice it looks like shit bc im too lazy to write the css to make it pretty"),a.a.createElement("h2",null,"Anyways heres a link to some sims:"),a.a.createElement(b,{link:"/testsim",preview_img:y,title:"Basic blank render with a circle",description:"Purely for testing purposes."}),a.a.createElement(b,{link:"/particlesim",preview_img:y,title:"2d particle motion",description:"demonstrates kinematic equations"}))},k=function(){return Object(i.useEffect)((function(){}),[]),a.a.createElement(c.d,null,a.a.createElement(c.b,{exact:!0,path:"/",component:g}),a.a.createElement(c.b,{exact:!0,path:"/testsim",component:m}),a.a.createElement(c.b,{exact:!0,path:"/particlesim",component:w}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var x=n(17);s.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(x.a,null,a.a.createElement(k,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[28,1,2]]]);
//# sourceMappingURL=main.f50306bd.chunk.js.map