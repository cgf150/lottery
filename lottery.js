/*
项目名称:大转盘抽奖
维护者邮箱:cgf_150@163.com
公司：湖南快乐益科技有限公司

用法：
	配置参数：
		var lottery=new Lottery();
		lottery.init({
			tar:oRound,
			num:'5',
			trick:'3',
			fn:function(obj){
				alert(obj.prize)
			}
		});
		调用
		lottery.rotate();
*/

var Lottery=function(){
	var self=this;

	if(Lottery.prototype.instance){
		return Lottery.prototype.instance;
	}

	self.init=function(obj){
		self.__check(obj);
		self.__isInit=true;
		self.__offset=parseInt(self.default.num)=='0'?0:(360/parseInt(self.default.num));
		self.__nowOffset=0;
		self.__tar=(self.__offset*self.default.trick)+3600;
	}

	self.rotate=function(){

		if(self.__isInit){
			self.default.tar.style.transition=self.default.duration;
			self.default.tar.style.WebkitTransform=self.default.duration;
			self.__rotate();
			self.__isInit=false;
		}
	}

	self.__rotate=function(){
		var tar=self.default.tar;
		self.timer=setTimeout(function(){
			clearTimeout(self.timer);

			if(self.__nowOffset>self.__tar){
				self.__nowOffset=self.__tar;
				clearTimeout(self.timer);
				self.timer=null;
				self.__transform.call(tar,function(){
					console.log(self.default.fn)
					self.default.fn({prize:self.default.trick});
					self.__reset();
					self.__isInit=true;
				});
				return;
			}

			if(self.__nowOffset>500){
				self.__nowOffset+=self.__min2Max(30,50);
			}else if(self.__nowOffset>1500){
				self.__nowOffset+=self.__min2Max(60,100);
			}else if(self.__nowOffset>2500){
				self.__nowOffset+=self.__min2Max(100,120);
			}else{
				self.__nowOffset+=self.__min2Max(10,20);
			}

			self.__transform.call(tar);
			self.__rotate();
		},50);
	}

	self.__transform=function(fn){
		fn?self.__event.call(this,fn):'';
		this.style.WebkitTransform="rotate("+self.__nowOffset+"deg)";
		this.style.transform="rotate("+self.__nowOffset+"deg)";
	}

	self.__extend=function(obj){
		self.default={
			tar:'',
			num:'',
			trick:'',
			duration:'4.0s',
			fn:function(){}
		}

		for(var attr in obj){
			self.default[attr]=obj[attr];
		}
	}

	self.__reset=function(){
		self.default.tar.style.transition="none";
		self.default.tar.style.WebkitTransition="none";

		setTimeout(function(){
			self.default.tar.style.transform="rotate(0deg)";
			self.default.tar.style.WebkitTransform="rotate(0deg)";
		},20)
	}

	self.__event=function(fn){
		this.addEventListener('transitionEnd',function(){
			this.removeEventListener('transitionEnd',arguments.callee,false);
			fn();
		},false)
		this.addEventListener('webkitTransitionEnd',function(){
			this.removeEventListener('webkitTransitionEnd',arguments.callee,false);
			fn();
		},false)
	}

	self.__min2Max=function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}

	self.__check=function(obj){
		if(typeof obj != 'object'){
			throw new Error('转盘抽奖对象初始化需要一个json对象,你传入的是'+typeof(obj));
		}

		self.__extend(obj);

		if(!self.default.tar||typeof self.default.tar !='object'){
			throw new Error('你还没为转盘抽奖对象指定旋转"对象"呢')
		}

		if(!self.default.trick){
			throw new Error('你还没有传入设定奖项呢！');
		}

		if(self.default.num==''){
			throw new Error('未设定轮盘的奖项数量！');
		}
	}

	Lottery.prototype.instance=self;
}

