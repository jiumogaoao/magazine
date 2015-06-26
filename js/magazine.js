// JavaScript Document
;(function(){
	window.magazine={}
	var contain="#all";
	var stage=null;
	var page=[];
	var animate={};
	var pageNum=0;
	var roll=0;
	var canvas=null;
	var containArry=[];
	var rollContair=new createjs.Container();
	var pointFn={};
	var in_animate=[];
	var on_animate=[];
	var out_animate=[];
	var animateFn={};
	animateFn.show=function(obj,fn){
		obj.visible=true;
		if(fn){
			fn();
			}
		}
	animateFn.hide=function(obj,fn){
		obj.visible=false;
		if(fn){
			fn();
			}
		}
	animateFn.B_S=function(obj,fn){
		var old_x=obj.scaleX;
		var old_y=obj.scaleY;
		createjs.Tween.get(obj, {loop: true})
		.to({scaleX: old_x*0.9, scaleY: old_y*0.9}, 200)
		.to({scaleX: old_x*1, scaleY: old_y*1}, 200)
		.to({scaleX: old_x*1.1, scaleY: old_y*1.1}, 200)
		.to({scaleX: old_x*1, scaleY: old_y*1}, 200)
		if(fn){
			fn();
			}
		}
	animateFn.top_in=function(obj,fn){
		var oldX=obj.x;
		var oldY=obj.y;
		var oldA=obj.alpha;
		obj.alpha=0;
		obj.y=oldY-200;
		obj.visible=true;
		createjs.Tween.get(obj)
		.to({alpha: oldA, y: oldY}, 600)
		.call(fn,[])
		}
	animateFn.bottom_in=function(obj,fn){
		var oldX=obj.x;
		var oldY=obj.y;
		var oldA=obj.alpha;
		obj.alpha=0;
		obj.y=oldY+200;
		obj.visible=true;
		createjs.Tween.get(obj)
		.to({alpha: oldA, y: oldY}, 600)
		.call(fn,[])
		}
	animateFn.small_in=function(obj,fn){
		var oldX=obj.scaleX;
		var oldY=obj.scaleY;
		var oldA=obj.alpha;
		obj.alpha=0;
		obj.scaleX=0;
		obj.scaleY=0;
		obj.visible=true;
		createjs.Tween.get(obj)
		.to({alpha: oldA, scaleX: oldX,scaleY: oldY}, 600)
		.call(fn,[])
		}
	animateFn.left_side_in=function(obj,fn){
		var oldSX=obj.scaleX;
		var oldSY=obj.scaleY;
		var oldX=obj.x;
		var oldY=obj.y;
		var oldA=obj.alpha;
		obj.alpha=0;
		obj.scaleX=0;
		obj.scaleY=0;
		obj.x-=200;
		obj.y-=100;
		obj.visible=true;
		createjs.Tween.get(obj)
		.to({alpha: oldA, scaleX: oldSX,scaleY: oldSY,x:oldX,y:oldY}, 600)
		.call(fn,[])
		}
	animateFn.right_side_in=function(obj,fn){
		var oldSX=obj.scaleX;
		var oldSY=obj.scaleY;
		var oldX=obj.x;
		var oldY=obj.y;
		var oldA=obj.alpha;
		obj.alpha=0;
		obj.scaleX=0;
		obj.scaleY=0;
		obj.x+=200;
		obj.y-=100;
		obj.visible=true;
		createjs.Tween.get(obj)
		.to({alpha: oldA, scaleX: oldSX,scaleY: oldSY,x:oldX,y:oldY}, 600)
		.call(fn,[])
		}
	animateFn.flickered_in=function(obj,fn){
		createjs.Tween.get(obj)
		.wait(100)
		.set({visible:true})
		.wait(100)
		.set({visible:false})
		.wait(100)
		.set({visible:true})
		.wait(100)
		.set({visible:false})
		.wait(100)
		.set({visible:true})
		.call(fn,[])
		}
	pointFn["text"]=function(num,con,data){
		if(data["max-width"]){
			data.lineWidth=data["max-width"];
			}
		var baseData={"x":0,"y":0,"scaleX":1,"scaleY":1,"rotation":0,"font":"12px 'Microsoft YaHei'","lineHeight":"12","color":"#000000","text":"未输入","textAlign":"left","alpha":1,"in_animate":"show","out_animate":"hide","width":0,"height":0,"offsetX":0,"offsetY":0,visible:false}
		data=$.extend({},baseData,data);
		var textCon=new createjs.Container();
		textCon=$.extend(textCon,data);
		con.addChild(textCon);
		var changeArry="";
		$.each(data.text,function(i,n){
			changeArry+=n+"\t";
			})
			data.text=changeArry;
		var txt = new createjs.Text(data.text);
		txt.font = data.font;
		txt.color = data.color;
		txt.text = data.text;
		txt.lineHeight = data.lineHeight;
		txt.textAlign = data.textAlign;
		txt.x=data.offsetX;
		txt.y=data.offsetY;
		if(data.lineWidth){
			txt.lineWidth = data.lineWidth;
			}
		textCon.addChildAt(txt);
		if(data["background-color"]){
		var pad = data.padding;
		var bg = new createjs.Shape();
		bg.graphics.beginFill(data["background-color"]).drawRect(0,0, data.width, data.height);
		textCon.addChildAt(bg,0);
			}
		textCon.regX=textCon.getBounds().width*.5;
		textCon.regY=textCon.getBounds().height*.5;
		if(data.href&&data.href.length){
 textCon.on("click", function(event) {
     window.location.href=this.href;
 });
 
			}
		if(data.in_animate){
			in_animate[num].push({"obj":textCon,"animate":data.in_animate})
			}
		if(data.on_animate){
			if(animateFn[data.on_animate]){
				animateFn[data.on_animate](textCon);
				}
			}
		if(data.out_animate){
			out_animate[num].push({"obj":textCon,"animate":data.out_animate})
			}
		};
	pointFn["image"]=function(num,con,data){
		var baseData={"x":0,"y":0,"scaleX":1,"scaleY":1,"rotation":0,"alpha":1,"in_animate":"show","out_animate":"hide",visible:false}
		data=$.extend({},baseData,data);
		var bitmap = new createjs.Bitmap(data.url);
		bitmap.image.onload=function(){
			bitmap.regX=bitmap.getBounds().width*.5;
			bitmap.regY=bitmap.getBounds().height*.5;
			}
		bitmap=$.extend(bitmap,data);
		con.addChild(bitmap);
		if(data.href&&data.href.length){
			bitmap.on("click", function(event) {
    	window.location.href=this.href;
 });}
		if(data.in_animate){
			in_animate[num].push({"obj":bitmap,"animate":data.in_animate})
			}
		if(data.on_animate){
			if(animateFn[data.on_animate]){
				animateFn[data.on_animate](bitmap);
				}
			}
		if(data.out_animate){
			out_animate[num].push({"obj":bitmap,"animate":data.out_animate})
			}
		}
	createjs.Ticker.setFPS(24)
    	createjs.Ticker.on("tick",tick);
		function tick(event){
			stage.update();
		};
	function creatBg(num,obj,url){
		var img= new Image();
		img.crossOrigin = "Anonymous";
		var newimg=new Image();
		var bg=new createjs.Bitmap(newimg);
			obj.addChild(bg); 
		img.onload=function(){
			var changeCanvas=$('<canvas></canvas>')[0]
			changeCanvas.width=canvas.width;
			changeCanvas.height=canvas.height;
			var con=changeCanvas.getContext("2d");
			con.drawImage(img,0,0,canvas.width,canvas.height);
			newimg.src=changeCanvas.toDataURL("image/jpeg");
			
			function orientationChange(){
			if($(window).width()<$(window).height()){
			canvas.width=760;
			canvas.height=1520;
			}else{
				canvas.width=1520;
			canvas.height=760;
				}
 			changeCanvas.width=canvas.width;
			changeCanvas.height=canvas.height;
			con=changeCanvas.getContext("2d");
			con.drawImage(img,0,0,canvas.width,canvas.height);
			newimg.src=changeCanvas.toDataURL("image/jpeg");
}   
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false); 
			}
			img.src=url;
		}
	function init(){
		canvas = $(contain)[0];
		if($(window).width()<$(window).height()){
			canvas.width=760;
			canvas.height=1520;
			}else{
				canvas.width=1520;
			canvas.height=760;
				}
		console.log(canvas)
    	stage = new createjs.Stage(canvas);
		stage.width=canvas.width;
		stage.height=canvas.height;
		rollContair.height=stage.height*page.length;
		rollContair.width=stage.width;
		stage.addChild(rollContair);
		$.each(page,function(i,n){
			in_animate[i]=[];
			on_animate[i]=[];
			out_animate[i]=[];
			containArry[i]=new createjs.Container();
			rollContair.addChild(containArry[i]);
			containArry[i].y=i*canvas.height;
			creatBg(i,containArry[i],n.bg);
			if(n.child&&n.child.length){
				$.each(n.child,function(u,v){
					if(pointFn[v.type]){
						pointFn[v.type](i,containArry[i],v)
						}
					});
				}
			});
			changePage(0);
		}
	function changePage(num){
		function in_call_back(){
			
			}
		function in_page(){
			$.each(in_animate[pageNum],function(i,n){
			if(animateFn[n.animate]){
				animateFn[n.animate](n.obj,in_call_back);
				};
			});
			}
		function run_page(){
			pageNum=num;	
		createjs.Tween.get(rollContair).to({y:-pageNum*stage.height}, 500, createjs.Ease.backOut).call(in_page,[]);
			}
		function out_call_back(){
			out_count++;
			if(out_count==out_animate[pageNum].length){
				run_page();
				}
			}
		if(out_animate[pageNum].length){
			var out_count=0;
			$.each(out_animate[pageNum],function(i,n){
			if(animateFn[n.animate]){
				animateFn[n.animate](n.obj,out_call_back);
				};
			});
			}else{
				run_page();
				}
		
		
		
		
			
		}
	magazine.run=function(){
		init();
		}
	magazine.setContain=function(data){
		contain=data;
		}
	magazine.setPage=function(data){
		page=data;
		}
	magazine.up=function(){
		if(pageNum!=page.length-1){
			var newPage=pageNum+1;
			changePage(newPage);
			}
		}
	magazine.down=function(){
		if(pageNum!=0){
			var newPage=pageNum-1;
			changePage(newPage);
			}
		}
	})();