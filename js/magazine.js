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
	animateFn.show=function(obj){
		console(obj);
		}
	animateFn.hide=function(obj){
		console(obj);
		}
	pointFn["text"]=function(num,con,data){
		if(data["max-width"]){
			data.lineWidth=data["max-width"];
			}
		var baseData={"x":0,"y":0,"scaleX":1,"scaleY":1,"rotation":0,"font":"12px 'Microsoft YaHei'","color":"#000000","text":"未输入","textAlign":"left","alpha":1}
		data=$.extend({},baseData,data);
		var changeArry="";
		$.each(data.text,function(i,n){
			changeArry+=n+"\t";
			})
			data.text=changeArry;
		var txt = new createjs.Text();
		txt=$.extend(txt,data);
		con.addChild(txt);
		if(data.in_animate){
			in_animate[num].push({"obj":txt,"animate":data.in_animate})
			}
		if(data.on_animate){
			on_animate[num].push({"obj":txt,"animate":data.on_animate})
			}
		if(data.out_animate){
			out_animate[num].push({"obj":txt,"animate":data.out_animate})
			}
		if(data["background-color"]){
			var bounds = txt.getBounds();
		var pad = data.padding;
		var bg = new createjs.Shape();
		bg.alpha=data.alpha;
		bg.graphics.beginFill(data["background-color"]).drawRect(bounds.x-pad,bounds.y-pad, bounds.width + pad * 2, bounds.height + pad * 2);
		bg=$.extend(bg,data);
		var layer=con.getChildIndex(txt);
		con.getChildIndex(txt,layer+1);
		con.addChildAt(bg,layer);
			}
		};
	pointFn["image"]=function(num,con,data){
		var baseData={"x":0,"y":0,"scaleX":1,"scaleY":1,"rotation":0,"alpha":1}
		data=$.extend({},baseData,data);
		var bitmap = new createjs.Bitmap(data.url);
		bitmap=$.extend(bitmap,data);
		con.addChild(bitmap);
		}
	createjs.Ticker.setFPS(48)
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
			$(window).on("resize",function(){
				changeCanvas.width=canvas.width;
			changeCanvas.height=canvas.height;
			con=changeCanvas.getContext("2d");
			con.drawImage(img,0,0,canvas.width,canvas.height);
			newimg.src=changeCanvas.toDataURL("image/jpeg");
				})
			
			bg.y=num*stage.height;
			}
			img.src=url;
		}
	function init(){
		canvas = $(contain)[0];
		canvas.width=$(window).width();
		canvas.height=$(window).height();
		$(window).on("resize",function(){
			canvas.width=$(window).width();
		canvas.height=$(window).height();
			});
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
			creatBg(i,containArry[i],n.bg);
			if(n.child&&n.child.length){
				$.each(n.child,function(u,v){
					if(pointFn[v.type]){
						pointFn[v.type](i,containArry[i],v)
						}
					});
				}
			});
		}
	function changePage(num){
		console.log(pageNum)
		console.log(out_animate[pageNum])
		$.each(out_animate[pageNum],function(i,n){
			if(animateFn[n.animate]){
				animateFn[n.animate](n.obj);
				};
			});
		pageNum=num;
		createjs.Tween.get(rollContair).to({y:-pageNum*stage.height}, 500, createjs.Ease.backOut);
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