(this["webpackJsonpphys-prj"]=this["webpackJsonpphys-prj"]||[]).push([[0],{24:function(e,t,n){},29:function(e,t,n){e.exports=n(51)},34:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){e.exports=n.p+"static/media/rand.7fb5be4a.jpg"},51:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(26),s=n.n(r),c=(n(34),n(1)),l=n(3),o=n(10),d=n(9),u=n(8),h=n(7),p=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e.title)).draw=function(){a.G.lineStyle(0),a.G.beginFill(14561865,1),a.G.drawCircle(100,250,50),a.G.endFill()},a.update=function(){a.draw(),setTimeout(a.update,16.7)},a.handlePress=function(e){},a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.screen={screenHeight:window.innerHeight,screenWidth:window.innerWidth,startX:0,endX:15,startY:0,endY:10},this.initPIXI(0),this.update()}},{key:"render",value:function(){var e=this,t=this;return document.addEventListener("keyup",(function(t){e.handlePress(t)})),i.a.createElement("div",{className:"GameFrameWrapper"},i.a.createElement("div",{ref:function(e){t.renderTarget=e},onMouseMove:function(e){}}))}}]),n}(function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;Object(l.a)(this,n);for(var i=arguments.length,r=new Array(i>1?i-1:0),s=1;s<i;s++)r[s-1]=arguments[s];return(a=t.call(this,r)).renderTarget=void 0,a.G=void 0,a.app=void 0,a.prevUpdateTime=void 0,a.screen=void 0,a.fps=60,a.title=void 0,a.initPIXI=function(e){a.app=new h.a({width:a.screen.screenWidth,height:a.screen.screenHeight,backgroundColor:e,antialias:!0}),a.renderTarget.appendChild(a.app.view),a.app.start(),a.app.stage.addChild(a.G),a.prevUpdateTime=Date.now()},a.title=e,a.G=new h.b,a}return n}(a.Component)),m=function e(t,n){var a=this;Object(l.a)(this,e),this.x=void 0,this.y=void 0,this.toString=function(){return"x: "+a.x.toString()+", y: "+a.y.toString()},this.length=function(){return Math.sqrt(a.x*a.x+a.y*a.y)},this.isZero=function(){return a.length()<1e-5},this.radians=function(){return Math.atan2(a.y,a.x)},this.congugate=function(){return new e(a.x,-a.y)},this.norm=function(){return a.multScalar(1/a.length())},this.inv=function(){return new e(-a.x,-a.y)},this.add=function(t){return new e(a.x+t.x,a.y+t.y)},this.sub=function(t){return new e(a.x-t.x,a.y-t.y)},this.multScalar=function(t){return new e(a.x*t,a.y*t)},this.dot=function(e){return a.x*e.x+a.y*e.y},this.x=t,this.y=n};m.fromPolar=function(e,t){return new m(e*Math.cos(t),e*Math.sin(t))};n(24);var v=function(){function e(t,n,a){var i=this;Object(l.a)(this,e),this.pos=void 0,this.vel=void 0,this.acc=void 0,this.g=void 0,this.setPos=function(e){return i.pos=e},this.setVel=function(e){return i.vel=e},this.setAcc=function(e){return i.acc=e},this.pos=t,this.vel=n,this.acc=a,this.g=new h.b}return Object(o.a)(e,[{key:"update",value:function(e){this.pos=this.pos.add(this.vel.multScalar(e)),this.vel=this.vel.add(this.acc.multScalar(e))}},{key:"posToPx",value:function(e){var t=(e.endY-e.startY)/e.screenHeight,n=(e.endX-e.startX)/e.screenWidth,a=(this.pos.x-e.startX)/n,i=-1*(this.pos.y-e.endY)/t;return new m(a,i)}},{key:"draw",value:function(e){this.g.clear();var t=this.posToPx(e);this.g.lineStyle(0),this.g.beginFill(14561865,1),this.g.drawCircle(t.x,t.y,20),this.g.endFill()}}]),e}(),f=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).renderTarget=void 0,a.G=void 0,a.app=void 0,a.prevUpdateTime=void 0,a.screen=void 0,a.timeoutPtr=void 0,a.fps=60,a.title=void 0,a.ball=void 0,a.initPIXI=function(e){a.app=new h.a({width:window.innerWidth,height:window.innerHeight,backgroundColor:e,antialias:!0}),a.renderTarget.appendChild(a.app.view),a.app.start(),a.app.stage.addChild(a.G)},a.draw=function(){a.ball.draw(a.screen)},a.update=function(){if(a.state.paused)a.prevUpdateTime=Date.now();else{a.prevUpdateTime||(a.prevUpdateTime=Date.now());var e=(Date.now()-a.prevUpdateTime)/1e3;a.ball.update(e),(a.ball.pos.x<a.screen.startX||a.ball.pos.x>a.screen.endX)&&(a.ball.setAcc(new m(0,0)),a.ball.setVel(new m(0,0))),a.ball.pos.y<a.screen.startY&&(a.ball.setPos(new m(a.ball.pos.x,a.screen.startY)),a.ball.setVel(new m(a.ball.vel.x,-a.ball.vel.y*(1-Number(a.state.dampingLevel)/10)))),a.draw(),a.prevUpdateTime=Date.now(),a.timeoutPtr=setTimeout(a.update,16.66)}},a.handlePress=function(e){},a.state={goBack:!1,paused:!1,dampingLevel:"0.5"},a.G=new h.b,a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){console.log(this.renderTarget.getBoundingClientRect()),this.screen={screenWidth:window.innerWidth,screenHeight:window.innerHeight,startX:0,endX:15,startY:0,endY:10},this.initPIXI(0),this.initSim()}},{key:"initSim",value:function(){this.timeoutPtr&&clearTimeout(this.timeoutPtr),this.ball&&this.ball.g.clear(),this.ball=new v(new m(2,0),new m(3,7),new m(0,-10)),this.app.stage.addChild(this.ball.g),this.update()}},{key:"render",value:function(){var e=this;if(this.state.goBack)return i.a.createElement(c.a,{to:{pathname:"/"}});var t=this;return document.addEventListener("keyup",(function(t){e.handlePress(t)})),i.a.createElement("div",{className:"sim-wrapper"},i.a.createElement("div",{className:"sim-header"},"Basic Bouncing Ball"),i.a.createElement("div",{className:"sim-sidebar"},i.a.createElement("div",{className:"back-butt",onClick:function(t){return e.setState({goBack:!0})}},"back"),i.a.createElement("div",{className:"pause-butt",onClick:function(t){return e.setState({paused:!e.state.paused})}},this.state.paused?"unpause":"pause"),i.a.createElement("div",{className:"restart-butt",onClick:function(t){return e.initSim()}},"restart"),i.a.createElement("div",{className:"num-input"},i.a.createElement("em",null,"damping level:"),i.a.createElement("input",{className:"slider",type:"range",min:"0",max:"10",value:this.state.dampingLevel,onChange:function(t){return e.setState({dampingLevel:t.target.value})}}))),i.a.createElement("div",{className:"sim-content",ref:function(e){t.renderTarget=e},onMouseMove:function(e){}}),i.a.createElement("div",{className:"sim-footer"},"written by theo cooper"))}}]),n}(a.Component),g=[-15,15,-10,10],b=function(e){return(g[1]-g[0])/e},w=function(e){return(g[3]-g[2])/e},y=function(){function e(t,n,a,i){var r=this;Object(l.a)(this,e),this.pos=void 0,this.vel=void 0,this.acc=void 0,this.mass=void 0,this.g=void 0,this.setPos=function(e){return r.pos=e},this.setVel=function(e){return r.vel=e},this.setAcc=function(e){return r.acc=e},this.pos=t,this.vel=n,this.acc=a,this.mass=i,this.g=new h.b}return Object(o.a)(e,[{key:"update",value:function(e){this.pos=this.pos.add(this.vel.multScalar(e)),this.vel=this.vel.add(this.acc.multScalar(e))}},{key:"posToPx",value:function(e){var t=(this.pos.x-e.startX)/b(e.screenWidth),n=-1*(this.pos.y-e.endY)/w(e.screenHeight);return new m(t,n)}},{key:"draw",value:function(e){this.g.clear();var t=this.posToPx(e);this.g.lineStyle(0),this.g.beginFill(0,1),this.g.drawEllipse(t.x,t.y,.5/b(e.screenWidth),.5/w(e.screenHeight)),this.g.endFill()}}]),e}(),k=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).renderTarget=void 0,a.G=void 0,a.app=void 0,a.prevUpdateTime=void 0,a.screen=void 0,a.timeoutPtr=void 0,a.fps=60,a.title=void 0,a.ball=void 0,a.initPIXI=function(e){a.app=new h.a({width:window.innerWidth,height:window.innerHeight,backgroundColor:e,antialias:!0}),a.renderTarget.appendChild(a.app.view),a.app.start(),a.app.stage.addChild(a.G)},a.draw=function(){a.G.clear(),a.G.lineStyle(0),a.G.beginFill(14561865,1),a.G.drawEllipse(a.screen.screenWidth/2,a.screen.screenHeight/2,3.1855/b(a.screen.screenWidth),3.1855/w(a.screen.screenHeight)),a.G.endFill(),a.ball.draw(a.screen)},a.update=function(){if(a.state.paused)a.prevUpdateTime=Date.now();else{a.prevUpdateTime||(a.prevUpdateTime=Date.now());var e=(Date.now()-a.prevUpdateTime)/1e3,t=a.ball.pos,n=t.norm().multScalar(-39.6*a.ball.mass/Math.pow(t.length(),2));a.ball.setAcc(n.multScalar(1/a.ball.mass)),(a.ball.pos.x<a.screen.startX||a.ball.pos.x>a.screen.endX||a.ball.pos.y<a.screen.startY||a.ball.pos.y>a.screen.endY)&&(a.ball.setAcc(new m(0,0)),a.ball.setVel(new m(0,0))),t.length()<3.1855&&(a.ball.setAcc(new m(0,0)),a.ball.setVel(new m(0,0))),a.ball.update(e),a.draw(),a.prevUpdateTime=Date.now(),a.timeoutPtr=setTimeout(a.update,16.66)}},a.handlePress=function(e){},a.state={goBack:!1,paused:!1,rVel:String(3.1)},a.G=new h.b,a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){console.log(this.renderTarget.getBoundingClientRect()),this.screen={screenWidth:window.innerWidth,screenHeight:window.innerHeight,startX:g[0],endX:g[1],startY:g[2],endY:g[3]},console.log(b(this.screen.screenWidth),w(this.screen.screenHeight)),this.initPIXI(11513775),this.initSim()}},{key:"initSim",value:function(){console.log("initsim called"),this.timeoutPtr&&clearTimeout(this.timeoutPtr),this.ball&&this.ball.g.clear(),this.ball=new y(new m(0,3.6855),new m(Number(this.state.rVel),0),new m(0,0),5),this.app.stage.addChild(this.G),this.app.stage.addChild(this.ball.g),this.update()}},{key:"render",value:function(){var e=this;if(this.state.goBack)return i.a.createElement(c.a,{to:{pathname:"/"}});var t=this;return document.addEventListener("keyup",(function(t){e.handlePress(t)})),i.a.createElement("div",{className:"sim-wrapper"},i.a.createElement("div",{className:"sim-header"},"Orbit Simulation"),i.a.createElement("div",{className:"sim-sidebar"},i.a.createElement("div",{className:"back-butt",onClick:function(t){return e.setState({goBack:!0})}},"back"),i.a.createElement("div",{className:"pause-butt",onClick:function(t){return e.setState({paused:!e.state.paused})}},this.state.paused?"unpause":"pause"),i.a.createElement("div",{className:"restart-butt",onClick:function(t){return e.initSim()}},"restart"),i.a.createElement("div",{className:"num-input"},i.a.createElement("em",null,"Initial rightward velocity: (km/s)"),"1",i.a.createElement("input",{className:"slider",type:"range",min:"1",max:"5",value:this.state.rVel,onChange:function(t){return e.setState({rVel:t.target.value})}}),"5")),i.a.createElement("div",{className:"sim-content",ref:function(e){t.renderTarget=e},onMouseMove:function(e){}}),i.a.createElement("div",{className:"sim-footer"},"Written by Theo Cooper"))}}]),n}(a.Component),E=(n(48),function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={isClicked:!1,isHovered:!1},a}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return this.state.isClicked?i.a.createElement(c.a,{to:{pathname:this.props.link}}):i.a.createElement("div",{className:"preview-card",onClick:function(t){return e.setState({isClicked:!0})}},i.a.createElement("div",{className:"card-title"},this.props.title),i.a.createElement("div",{className:"card-descriptor"},i.a.createElement("em",null,this.props.description)))}}]),n}(a.Component)),x=(n(49),n(50)),T=function(){return i.a.createElement("div",{className:"home"},i.a.createElement("div",{className:"home-heading"},i.a.createElement("h1",null,"Welcome to the home of Theo's physics sims"),i.a.createElement("em",null,"you will notice it looks like shit bc im too lazy to write the css to make it pretty")),i.a.createElement("hr",null),i.a.createElement("h2",null,"Anyways heres a link to some sims:"),i.a.createElement("div",{className:"card-container"},i.a.createElement(E,{link:"/testsim",preview_img:x,title:"Basic blank render with a circle",description:"Purely for testing purposes."}),i.a.createElement(E,{link:"/particlesim",preview_img:x,title:"2d particle motion",description:"demonstrates kinematic equations"}),i.a.createElement(E,{link:"/orbitsim",preview_img:x,title:"2d orbit",description:"demonstrates universal gravitation"})))},C=function(){return Object(a.useEffect)((function(){}),[]),i.a.createElement(c.d,null,i.a.createElement(c.b,{exact:!0,path:"/",component:T}),i.a.createElement(c.b,{exact:!0,path:"/testsim",component:p}),i.a.createElement(c.b,{exact:!0,path:"/particlesim",component:f}),i.a.createElement(c.b,{exact:!0,path:"/orbitsim",component:k}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var S=n(13);s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(S.a,null,i.a.createElement(C,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.69242959.chunk.js.map