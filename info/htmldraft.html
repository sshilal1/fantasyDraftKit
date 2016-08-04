

Class = {
	create: function() {
		var parent = null;
		var properties = Array.prototype.slice.call(arguments);
		if (properties.length > 0 && typeof properties[0] == "function") parent = properties.shift();

		function klass() {
			this.initialize.apply(this, arguments);
		}

		klass.superclass = parent;
		klass.subclasses = [];

		if (parent) {
			var subclass = function() { };
			subclass.prototype = parent.prototype;
			klass.prototype = new subclass;
			parent.subclasses.push(klass);
		}

		klass.addProperties = function(source) {
			for (var property in source) {
				this.prototype[property] = source[property];
			}
			if (typeof this.prototype.initialize == "function" && typeof source._initialize == "function" && typeof source.initialize != "function") {
				var oldInit = this.prototype.initialize;
				this.prototype.initialize = function() {
					oldInit.apply(this, arguments);
					source._initialize.apply(this, arguments);
				};
			}
		};

		for (var i = 0; i < properties.length; i++) {
			klass.addProperties(properties[i]);
		}

		if (!klass.prototype.initialize) klass.prototype.initialize = function() { };

		klass.prototype.constructor = klass;

		return klass;
	}
};



if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(el) {
		for (var i = this.length-1; i >= 0; --i) {
			if (this[i] == el) { return i; } /* should really use === to check type */
		}
		return -1;
	}
}

Function.prototype.bindf = function() {
	if (arguments.length < 2 && typeof arguments[0] == "undefined") return this;
	var __method = this, args = Array.prototype.slice.call(arguments), object = args.shift();
	return function() {
		return __method.apply(object, args.concat(Array.prototype.slice.call(arguments)));
	}
};

Utility = {};

Utility.iterate = function(array, fn, context, progress) {
	if (!array.length) {
		if (progress) {
			progress.call(context, 0);
		}
		return;
	}

	var items = array.concat();
	var startTime = (new Date).getTime();
	(function work() {
		fn.call(context, items.shift());

		var itemsRemaining = !!items.length;
		var timeExpired = (new Date).getTime()-startTime > 100;
		if (progress) {
			if (timeExpired && !itemsRemaining) {
				setTimeout(function() {
					progress.apply(context, [0]);
				}, 20);
			} else {
				progress.call(context, items.length);
			}
		}
		if (itemsRemaining) {
			if (timeExpired) {
				setTimeout(work, 20);
				startTime = (new Date).getTime();
			} else {
				work();
			}
		}
	})();
};

Utility.defer = function(fn, context, args, callback) {
	if (!args) { args = []; }
	setTimeout(function() {
		var passToCallback = fn.apply(context, args);
		if (callback) {
			callback.call(context, passToCallback);
		}
	}, 20);
};

Utility.schedule = function(fns, context) {
	var startTime = (new Date).getTime();
	(function work() {
		fns.shift().call(context);
		if (fns.length > 0) {
			if ((new Date).getTime()-startTime > 100) {
				setTimeout(work, 20);
				startTime = (new Date).getTime();
			} else {
				work();
			}
		}
	})();
};


Utility.formatNumberTea = function(number, pattern) {
	if (isNaN(number)) {number = 0};
	var negativeSign = (number < 0) ? '-' : '';
	var formattedNumber;

	if (number == Infinity || number >= 17976931348623157000000000) {
		formattedNumber = 'INF';
	} else {
		var splitByDec = pattern.split('.');
		var patternL = splitByDec[0];
		var patternR = splitByDec[1] ? splitByDec[1] : '';

		splitByDec = (Math.round(Math.abs(number)*Math.pow(10,patternR.length))/Math.pow(10,patternR.length)+'').split('.');
		var numberL = (splitByDec[0] != '0' || patternL == '') ? splitByDec[0] : '';
		var numberR = splitByDec[1] ? splitByDec[1] : '';

		for (var l=0; l < patternL.length; ++l) {
			if (patternL.charAt(l) == '0' && numberL.length <= l) {
				numberL = '0' + numberL;
			}
		}

		for (var r=0; r < patternR.length; ++r) {
			if (patternR.charAt(r) == '0' && numberR.length <= r) {
				numberR+='0';
			}
		}

		var decimalPoint = (numberR === '') ? '' : '.';
		formattedNumber = numberL + decimalPoint + numberR;
	}
	return negativeSign + formattedNumber + '';
};

Utility.shortOrdinal = function(number) {
	if (number % 100 >= 11 && number % 100 <= 13) {
		return number + 'th';
	} else {
		switch(number % 10) {
			case 1: return number + 'st';
			case 2: return number + 'nd';
			case 3: return number + 'rd';
			default: return number + 'th';
		}
	}	
};

Utility.formatDelta = function(number) {
	if (number > 0.1) return '<span style="color:green">+' + number + '</span>';
	else if (number < -0.1)	return  '<span style="color:red">' + number + '</span>';
	else return '+0';
};

Utility.filterData = function(data, constants) {
	var n = new Object();
	for (var elId in constants) {
		if (data[constants[elId]] != null) n[constants[elId]] = data[constants[elId]];
	}
	return n;
};

Utility.decodeChanges = function(changes, constants) {
	var n = new Object();
	for (var elId in changes) {
		if (constants[elId] != null) n[constants[elId]] = changes[elId];
	}
	return n;
};

Utility.createDateForTimezone = function(ts, timezoneOffset) {
	var d = new Date();
	d.setTime(ts - (timezoneOffset - d.getTimezoneOffset())*60*1000);
	return d;
};

Utility.Listener = Class.create({
	initialize: function(fn, props) {
		this._fn = fn;
		this._props = props;
	},

	broadcast: function(component, args) {
		var props = (args.length > 0 ? args[0] : null);
		if (!props) args.unshift(null);
		args.unshift(component);
		if (!this._props || !props) this._fn.apply(component, args);
		else {
			for (var i = 0; i < this._props.length; i++) {
				if (props.indexOf(this._props[i]) >= 0) {
					this._fn.apply(component, args);
					break;
				}
			}
		}
	}

});

Utility.extend = function(base, top) {
	if (!base) base = new Object();
	for (var p in top) base[p] = top[p];
	return base;
};

Utility.objectToArray = function(ob) {
	if (typeof ob != 'object') { return []; }
	var a = [];
	for (var k in ob) {
		if (ob.hasOwnProperty(k)) {
			a.push(ob[k]);
		}
	}
	return a;
};

Utility.roundToPlace = function(f, p) {
	return Math.round(f*Math.pow(10, p))/Math.pow(10, p);
};

Utility.Zebugger = Class.create({
	initialize: function() {
		this.debugMode = null;
		this.debugAll = false;
		this.timers = new Object();
	},
	
	setDebugMode: function(mode) {
		if (!this.debugMode) this.debugMode = '';
		if (typeof mode == "string") this.debugMode += mode;
		if (mode == "true" || mode == true) this.debugAll = true;
	},
	
	debug: function() {
		try {
			if (this.debugMode) {
				var props = Array.prototype.slice.call(arguments), mode='';
				if (props.length > 0 && typeof props[0] == "string") mode = props.shift();
				if (this.debugAll || this.debugMode.indexOf(mode) >= 0) {
					if (typeof(console) != 'undefined' && typeof(console.log) == 'function') console.log.apply(console, props);
					else {
						//for (var i = 0; i < props.length; i++) alert(props[i]);
					}
				}
			}
		} catch(e) { }
	},
	
	getCurrentTime: function() {
		return (new Date().getTime());
		
	},
	
	startTimer: function(timerName, isStatic) {
		if (this.debugMode) {
			if (timerName == null) timerName = 'default';
			if (this.timers[timerName]) {
				this.timers[timerName].timeStart = this.getCurrentTime();
				this.timers[timerName].count++;
			}
			else this.timers[timerName] = {timeStart: this.getCurrentTime(), totalTime: 0, isStatic: isStatic == true, count: 1};
			this.lastTimerName = timerName;
		}
	},
	
	stopTimer: function(mode, timerName) {
		if (this.debugMode) {
			if (!timerName) timerName = this.lastTimerName;
			var timer = this.timers[timerName];
			if (timer) {
				var timeTaken = this.getCurrentTime() - timer.timeStart;
				if (!timer.isStatic) this.debug(mode, timerName+' took '+timeTaken+'ms');
				else timer.totalTime += timeTaken;
			}
		}
	}
});
Utility.zebugger = new Utility.Zebugger();

Utility.Fetcher = Class.create({
	
	createXHR: function() {
		if(window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
		
		try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch(e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch(e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP") } catch(e) {}
		try { return new ActiveXObject("Microsoft.XMLHTTP") } catch(e) {}
		return null;
	},
	
	fetch: function(url, options) {
		var xhr = new this.createXHR();
		if (!xhr) { return false; }
		
		options = this.setDefaultOptions(options);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				var responseJSON = (options.parseJSON) ? this.parseJSON(xhr.responseText) : null;
				var response = {responseText:xhr.responseText, responseXML:xhr.responseXML, statusCode:xhr.status, responseJSON:responseJSON}
				if (xhr.status >= 200 && xhr.status < 300 && options.onSuccess) {
					options.onSuccess(response);
				} else if (options.onComplete) {
					options.onComplete(response);
				}
			}
		}.bindf(this);
		var paramString = ''
		if (options.parameters) {
			for(option in options.parameters) {
				paramString += (paramString == '') ? '?' : '&';
				paramString+=option+'='+options.parameters[option];
			}
		}
		try {
			xhr.open(options.method, url+paramString, true);
			xhr.send('');
		} catch(e) {
			return false;
		}
		return true;
	},
	
	setDefaultOptions: function(options) {
		if (!options) options = {};
		options.method = (options.method == 'POST' || options.method == 'post') ? 'POST' : 'GET';
		options.parseXML = (options.parseXML == true);
		options.parseJSON = (options.parseJSON == true);
	
		/* convert query string to parameters map */
		if (options.parameters && options.parameters.length && options.parameters.split) {
			parameters = {};
			var paramArray = options.parameters.split('&');
			for (var i=0; i<paramArray.length; ++i) {
				var pair = paramArray[i].split('=');
				if (pair.length == 2) {
					parameters[pair[0]] = pair[1];
				}
			}
			options.parameters = parameters;
		}
		return options;
	},
	
	parseXML: function(text) {
		var parsed = null;
		try {
			if (document.implementation.createDocument) {
				parsed = (new DOMParser()).parseFromString(text,'text/xml');
			} else if (window.ActiveXObject) {
				parsed = new ActiveXObject('Microsoft.XMLDOM');
				parsed.async='false';
				parsed.loadXML(text);
			}
		} catch (e) {}
		return parsed;
	},
	
	parseJSON: function(text) {
		var parsed = null;
		try {
			parsed = eval('(' + text + ')');
		} catch (e) {}
		return parsed;
	}
});
Utility.fetcher = new Utility.Fetcher();


Utility.Component = Class.create({
	registerListener: function(fn, props) {
		if (!this._listeners) {
			this._listeners = new Object();
			this._listenerId = 0;
		}
		this._listeners[this._listenerId] = new Utility.Listener(fn, props);
		return {object: this, id: this._listenerId++};
	},

	broadcastToListeners: function() {
		if (this._listeners) {
			for (var i in this._listeners) {
				this._listeners[i].broadcast(this, Array.prototype.slice.call(arguments));
			}
		}
	},
	
	unregisterListener: function(listenerId) {
		delete this._listeners[listenerId];
	},
	
	stopListening: function(listeners) {
		if (listeners == null) return null;
		for (var i = 0; i < listeners.length; ++i) {
			listeners[i].object.unregisterListener(listeners[i].id);
		}
		return null;
	},
	
	debug: function() {
		Utility.zebugger.debug.apply(Utility.zebugger, arguments);
	},
	
	startTimer: function() {
		Utility.zebugger.startTimer.apply(Utility.zebugger, arguments);
	},
	
	stopTimer: function() {
		Utility.zebugger.stopTimer.apply(Utility.zebugger, arguments);
	}
});

Utility.getCookie = function(name) {
	var cookies = document.cookie.split(';');
	for(var c=cookies.length-1; c >= 0; --c) {
		var cookie = cookies[c];
		while (cookie.charAt(0)==' ') {
			cookie = cookie.substring(1, cookie.length);
		}
		if (cookie.indexOf(name+'=') == 0) {
			return cookie.substring(name.length+1, cookie.length);
		}
	}
	return null;
};


/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();

var Draft = Class.create({
	initialize: function(leagueData, isLeagueManager) {
		this.constants = DraftConstants;
		this.toTeamId = leagueData.toTeamId;
		this.draftToken = leagueData.draftToken;
		this.league = new Draft.League(this, leagueData);
		this.isLeagueManager = isLeagueManager;
		this.poster = new Draft.Poster(this);
		this.connectionManager = new Draft.ConnectionManager(this);
		this.status = new Draft.Status(this);
		this.pickHistory = new Draft.PickHistory(this);
		this.draftList = new Draft.DraftList(this);
		if (this.isLeagueManager) this.lmTools = new Draft.LMTools(this);
		this.picker = new Draft.Picker(this);
		this.playerSearch = new Draft.PlayerSearch(this);
		this.chat = new Draft.Chat(this);
		this.rosterViewer = new Draft.RosterViewer(this);
		this.positionMaxes = new Draft.PositionMaxes(this);
		this.draftMessage = new Draft.DraftMessage(this);
		this.draftOrderNav = new Draft.DraftOrderNav(this);
		this.summaryByRound = new Draft.SummaryByRound(this);
		this.summaryByTeam = new Draft.SummaryByTeam(this);
		this.connectionManager.initPersistentConnection();
	},
	
	processMessage: function(message) {
		this.connectionManager.processMessage(message);
	}
});

Draft.Component = Class.create(Utility.Component, {
		
});


Draft.Module = Class.create(Draft.Component, {

});


Draft.ConnectionManager = Class.create(Draft.Component, {
	pollInterval: null,
	synchTime: 0,
	token: null,

	initialize: function(draft) {
		this.draft = draft;
	},

	initPersistentConnection: function() {
		this.draft.poster.joinTeam();		
	},
	
	initPolling: function() {
		if (this.pollInterval) window.clearTimeout(this.pollInterval);
		this.pollInterval = setInterval(function() { this.draft.poster.poll(); }.bindf(this), this.draft.constants.POLL_INTERVAL);
	},

	directMessage: function(message) {
		if (message.token) this.token = message.token;
		if (message.synchTime) this.handleTimestamp(message.synchTime);
		if (message.draftStatus) this.draft.status.update(message.draftStatus);
		if (message.pickHistory) this.draft.pickHistory.updatePicks(message.pickHistory);
		if (message.chatHistory) this.draft.chat.processMessages(message.chatHistory);
	},
	
	handleTimestamp: function(st) {
		this.synchTime = st;
	},
	
	processMessage: function(message) {
		this.draft.poster.killRequest();
		this.directMessage(message);
		this.initPolling();
	}
});

Draft.Poster = Class.create(Draft.Component, {
	pollPrefix: 'poll-',
	pollId: 0,
	request: null,
	lastSentTime: 0,

	initialize: function(draft) {
		this.draft = draft;
	},
	
	paramsToQueryString: function(params) {
		var qs = '';
		for (var i = 1; i <= params.length; i++) qs += (i > 1 ? '&' : '') + i + '=' + params[i-1];
		return qs;
	},
	
	pollParams: function() {
		return '&poll=' + this.draft.connectionManager.synchTime + (this.draft.connectionManager.token ? '&token=' + this.draft.connectionManager.token : '');
	},
	
	killRequest: function() {
		if (this.request) {
			this.request.parentNode.removeChild(this.request);
			this.request = null;
		}
		this.pollId++;
	},
	
	getRequestId: function() {
		this.pollId++;
		return this.pollPrefix + this.pollId;
	},

	sendCommand: function(command, params) {
		var url = DraftConstants.SERVICE + command + '?' + this.paramsToQueryString(params) + this.pollParams() 
		if(command == "POLL") {
			url += "&r=" + Math.floor(Math.random()*5000);
		}
		var a = document.createElement('script');
		a.setAttribute('src', url);
		a.setAttribute('type', 'text/javascript');
		a.setAttribute('charset', 'UTF-8');
		this.request = a;
		document.getElementsByTagName('body')[0].appendChild(a);		
		this.lastSentTime = new Date().getTime();
	},
	
	joinTeam: function() {
		this.sendCommand('JOIN', [DraftConstants.GAME_ID, this.draft.league.leagueId, this.draft.league.toTeamId, DraftConstants.UP_ID, this.draft.draftToken]);
	},
	
	setPaused: function (paused) {
		this.sendCommand('PAUSE', [(paused ? 1 : 0)]);
	},
	
	undoSelection: function(lastSelectionIdToKeep) {
		this.sendCommand('UNDO', [lastSelectionIdToKeep]);
	},
		
	makePick: function(playerId) {
		this.sendCommand('SELECT', [playerId]);
	},
	
	lmMakePick: function(teamId, playerId) {
		this.sendCommand('ASSIGN', [teamId, playerId]);
	},

	toggleAutopick: function(onAutopick) {
		this.sendCommand('AUTODRAFT', [(onAutopick ? 'true' : 'false')]);
	},
	
	lmToggleAutopick: function(teamId, onAutopick) {
		this.sendCommand('FORCE_AUTO', [teamId, (onAutopick ? 'true' : 'false')]);
	},
	
	chat: function(msg) {
		this.sendCommand('CHAT', [msg]);
	},
	
	poll: function() {
		this.sendCommand('POLL', []);
	}
});





Draft.League = Class.create(Draft.Component, {
	numIrSlots: 0,

	initialize: function(draft, leagueData) {
		this.draft = draft;
		this.draftOrder = leagueData.draftOrder;
		this.maxRosterSize = leagueData.maxRosterSize;
		this.leagueId = leagueData.leagueId;
		this.toTeamId = leagueData.toTeamId;
		if (leagueData.numIrSlots != null) this.numIrSlots = leagueData.numIrSlots;
		this.players = new Object();
		this.owners = new Object();
		this.teams = new Array();
		for (var i = 0; i < leagueData.teams.length; i++) {
			this.createTeam(leagueData.teams[i]);
		}
		this.toTeam = this.getTeamById(this.toTeamId);
		this.numTeams = this.teams.length;
		this.proTeams = new Object();
		for (var i = 0; i < leagueData.proTeams.length; i++) this.proTeams[leagueData.proTeams[i].proTeamId] = leagueData.proTeams[i];
		this.positionItems = new Object();
		for (var i = 0; i < leagueData.positionItems.length; i++) this.positionItems[leagueData.positionItems[i].positionId] = leagueData.positionItems[i];
	},

	createTeam: function(teamData) {
		var team = new Draft.League.Team(this, teamData);
		this.teams.push(team);;
	},

	setTeamAutopicks: function(teamIds) {
		for (var i = 0; i < this.teams.length; i++) {
			this.teams[i].setAutopickStatus((teamIds.indexOf(this.teams[i].teamId) >= 0));
		}
	},

	getTeamById: function(teamId) {
		for (var i = 0; i < this.teams.length; i++) {
			if (this.teams[i].teamId == teamId) return this.teams[i];
		}
		return null;
	},

	getTeamBySelectionId: function(selectionId) {
		return this.getTeamById(this.draftOrder[selectionId]);
	},

	createPlayer: function(playerData) {
		if (!this.getPlayerById(playerData.playerId)) {
			var player = new Draft.League.Player(this, playerData);
			this.players[player.playerId] = player;
			return player;
		}
		return this.getPlayerById(playerData.playerId);
	},

	getPlayerById: function(playerId) {
		return this.players[playerId];
	},

	getPlayerByPick: function(pick) {
		if (pick.player) {
			var player = this.getPlayerById(pick.player.playerId);
			if (!player) player = this.createPlayer(pick.player);
			return player;
		}
	},

	createOwner: function(ownerData, teamId) {
		var owner = new Draft.League.Owner(this, ownerData, teamId);
		this.owners[owner.userProfileId] = owner;
	},

	getOwnerById: function(userProfileId) {
		return this.owners[userProfileId];
	},

	getProTeamAbbrev: function(proTeamId) {
		return this.proTeams[proTeamId].abbrev;
	},

	getProTeamTickerAbbrev: function(proTeamId) {
		return this.proTeams[proTeamId].tickerAbbrev;
	},

	getPositionAbbrev: function(positionId) {
		return this.positionItems[positionId].abbrev;
	},

	// teams listen to picks
	initPickListeners: function() {
		for (var i = 0; i < this.teams.length; i++) {
			this.teams[i].listenForPicks();
		}
	},

	// listen to teams
	registerTeamListeners: function(fn, fields) {
		for (var i = 0; i < this.teams.length; i++) {
			this.teams[i].registerListener(fn, fields);
		}
	}

});

Draft.League.Owner = Class.create(Draft.Component, {
	league: null,
	teamId: null,

	initialize: function(league, ownerData, teamId) {
		this.league = league;
		this.teamId = teamId;
		this.firstName = ownerData.firstName;
		this.lastName = ownerData.lastName;
		this.userProfileId = ownerData.userProfileId;
		this.userName = ownerData.userName;
	},

	getFullName: function() {
		return this.firstName + ' ' + this.lastName;
	}

});

Draft.League.Team = Class.create(Draft.Component, {
	initialize: function(league, teamData) {
		this.league = league;
		this.listeners = new Array();
		this.teamId = teamData.teamId;
		this.abbrev = teamData.teamAbbrev;
		this.location = teamData.teamLocation;
		this.nickname = teamData.teamNickname;
		this.onAutopick = false;
		this.owners = this.registerOwners(teamData.owners);
		this.slotCounts = new Object();
		this.positionCounts = new Object();
		this.picks = new Array();
	},

	registerOwners: function(owners) {
		this.owners = new Array();
		for (var i = 0; i < owners.length; i++) this.owners.push(this.league.createOwner(owners[i], this.teamId));
	},

	getFullName: function(abbrev) {
		var fullName = this.location + ' ' + this.nickname;
		return (abbrev ? fullName.substr(abbrev) + '...' : fullName);
	},

	setAutopickStatus: function(onAutopick) {
		if (onAutopick != this.onAutopick) {
			this.onAutopick = onAutopick == true;
			this.broadcastToListeners(['onAutopick']);
		}
	},

	makePick: function(pick) {
		this.picks.push(pick);
		var player = this.league.getPlayerByPick(pick);
		player.pick(this, pick.slotCategoryId, pick.isKeeper);
		this.broadcastToListeners(['picks'], pick);
	},

	undoPick: function() {
		var pick = this.picks.pop();
		pick.undone = true;
		var player = this.league.getPlayerByPick(pick);
		player.unpick();
		this.broadcastToListeners(['picks'], pick);
	},

	incrementSlotCount: function(slotCategoryId, delta) {
		if (this.slotCounts[slotCategoryId] == null) this.slotCounts[slotCategoryId] = 0;
		this.slotCounts[slotCategoryId] += delta;
		this.broadcastToListeners(['slotCounts'], slotCategoryId);
	},

	incrementPositionCount: function(positionId, delta) {
		if (this.positionCounts[positionId] == null) this.positionCounts[positionId] = 0;
		this.positionCounts[positionId] += delta;
		this.broadcastToListeners(['positionCounts'], positionId);
	},

	getPickRosterErrors: function(player) {
		if (this.league.positionItems[player.positionId].max >= 0 && this.positionCounts[player.positionId] >= this.league.positionItems[player.positionId].max) return 'Max at position reached.';
		// slot errors?
		return null;
	}
});

Draft.League.Player = Class.create(Draft.Component, {
	slotCategoryId: null,
	isKeeper: false,
	team: null,

	initialize: function(league, playerData) {
		this.league = league;
		this.playerId = playerData.playerId;
		this.isTeamPosition = playerData.isTeamPosition == true;
		this.mugshotId = playerData.mugshotId ? playerData.mugshotId : this.playerId;
		this.firstName = playerData.firstName;
		this.lastName = playerData.lastName;
		this.proTeamId = playerData.proTeamId;
		this.positionId = playerData.positionId;
		this.proTeamAbbrev = this.league.getProTeamAbbrev(this.proTeamId);
		this.tickerAbbrev = this.league.getProTeamTickerAbbrev(this.proTeamId);
		this.positionAbbrev = this.league.getPositionAbbrev(this.positionId);
		this.playerNumber = playerData.playerNumber ? playerData.playerNumber : '';
	},

	pick: function(team, slotCategoryId, isKeeper) {
		this.team = team;
		this.slotCategoryId = slotCategoryId;
		team.incrementSlotCount(slotCategoryId, 1);
		team.incrementPositionCount(this.positionId, 1);
		this.isKeeper = isKeeper;
	},

	unpick: function() {
		this.team.incrementSlotCount(this.slotCategoryId, -1);
		this.team.incrementPositionCount(this.positionId, -1);
		this.team = null;
	},

	formatName: function() {
		return this.firstName + ' ' + this.lastName + (this.isKeeper ? ' <span class="keeperIcon">K</span>' : '');
	},

	formatNameDetailed: function(nameClass) {
		var ln = this.firstName + ' ' + this.lastName;
		if (nameClass) ln = '<span class="' + nameClass + '">' + ln + '</span>';
		if (this.proTeamAbbrev != '' || this.posAbbrev != '') ln += ', ';
		ln += this.proTeamAbbrev + (this.proTeamAbbrev != '' ? ' ' : '');
		ln += this.positionAbbrev + (this.positionAbbrev != '' && this.playerNumber != '' ? ' ' : '');
		ln += this.playerNumber;
		ln += (this.isKeeper ? ' <span class="keeperIcon">K</span>' : '');
		return ln;
	},

	getMugshot: function() {
		if (!this.mugshot && !this.isTeamPosition) {
			var ms = document.createElement('img');
			ms.className = 'playerMug';
			ms.src = this.league.draft.constants.GET_PLAYER_MUG(this.mugshotId);
			ms.onerror = function() {
				this.src = draft.constants.NO_MUG_URL;
				this.style.marginLeft = "0px";
			}.bindf(ms);
			this.mugshot = ms;
		}
		return this.mugshot;
	},

	getProTeamLogo: function() {
		if (!this.teamLogo) {
			if (this.tickerAbbrev && this.tickerAbbrev != '' && this.tickerAbbrev != 'fa') {
				tl = document.createElement('img');
				tl.className = 'teamLogo';
				tl.src = this.league.draft.constants.GET_TEAM_LOGO(this.tickerAbbrev);
				this.teamLogo = tl;
			} else {
				this.teamLogo = '';
			}
		}
		return this.teamLogo;
	}
});



		Draft.LMTools = Class.create(Draft.Component, {
			draft: null,
			isLMDrafting: false,
			didPause: false,
			paused: false,

			initialize: function(draft) {
				this.draft = draft;
				this.draft.status.registerListener(this.statusListener.bindf(this), ['statusId']);
				this.draft.status.timer.registerListener(this.timerListener.bindf(this), ['paused']);
				this.draft.league.registerTeamListeners(this.teamListener.bindf(this), ['onAutopick']);
				this.APTeamId = $('#toggleLMAutopickTeamId').val();
			},
			
			statusListener: function(status) {
				this.renderButtons();
			},

			timerListener: function(timer) {
				if (timer.paused != this.paused) {
					this.paused = timer.paused;
					if (!this.paused) this.didPause = false;
					this.renderButtons();
				}
			},
			
			teamListener: function(team) {
				if (team.teamId == this.APTeamId) this.updateToggleAutopickButton();
			},

			togglePause: function() {
				this.didPause = !this.paused;
				this.draft.poster.setPaused(!this.paused);
			},

			toggleLMDrafting: function() {
				this.isLMDrafting = !this.isLMDrafting;
				$('#draftForTeamBtn').val(this.isLMDrafting ? 'Turn Off' : 'Turn On');
				this.broadcastToListeners(['isLMDrafting']);
			},

			undoLastSelection: function() {
				this.draft.poster.undoSelection(this.draft.pickHistory.getLastSelectionId());  // last pick to keep (-1), convert to 1-index (+1)
				this.renderButtons();
			},

			renderButtons: function() {
				var paused = this.draft.status.timer.paused;
				this.formDisabler('lmTools2', !paused);
				this.formDisabler('lmTools1', paused);
			},

			toggleAutopick: function() {
				this.draft.poster.lmToggleAutopick(this.APTeamId, !this.draft.league.getTeamById(this.APTeamId).onAutopick);
			},

			changeAutopickTeam: function() {
				this.APTeamId = $('#toggleLMAutopickTeamId').val();
				this.updateToggleAutopickButton();
			},

			updateToggleAutopickButton: function() {
				$('#toggleLMAutopickBtn').val(this.draft.league.getTeamById(this.APTeamId).onAutopick ? 'Turn Off' : 'Turn On');
			},

			formDisabler: function(formId, disable) {
				$('#'+formId+' :input').attr('disabled', (disable ? 'disabled' : ''));
			},

			lockAllLMTools: function(makeLocked) {
				this.formDisabler('lmTools1', makeLocked);
				this.formDisabler('lmTools2', makeLocked);
			}

		});

	

		Draft.Timer = Class.create(Draft.Component, {
			timeRemaining: 0, //sec
			paused: false,
			timeout: null,

			initialize: function(draft, timeRemaining, paused) {
				this.draft = draft;
				this.clockDiv = $('#clockParentDiv');
				this.timerCell = $('#cd_timer');
				this.updateClock();
			},

			setClockCountdown: function() {
				this.timeout = window.setTimeout(function() { this.decrementTime(); }.bindf(this), this.draft.constants.CLOCK_DECREMENT);
			},

			updateClock: function() {
				if (this.timerCell) {
					var minutes = Math.floor(this.timeRemaining/60);
					var seconds = Math.floor(this.timeRemaining%60);
					this.timerCell.html(minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
				}
			},

			decrementTime: function() {
				this.timeRemaining = Math.max(0, this.timeRemaining - this.draft.constants.CLOCK_DECREMENT/1000);
				this.updateClock();
				if (this.draft.status.connected && this.timeRemaining > 0) this.setClockCountdown();
			},

			updatePaused: function(paused) {
				this.paused = paused == true;
				if (this.paused) {
					if (!this.draft.status.timedPause) window.clearTimeout(this.timeout);
					$('#draftStatusMiniTableStatusAlert').html('<span class="fontRed">Draft Paused</span>');
				} else {
					if (this.draft.status.connected) this.setClockCountdown();
					$('#draftStatusMiniTableStatusAlert').html(Utility.shortOrdinal(this.draft.status.currentSelectionId+1)+' Overall');
				}
			},
			
			setOnClockStatus: function(onClock) {
				if (onClock) this.clockDiv.toggleClass('onClock', onClock);
			},

			syncTimer: function(time, paused) {
				var fields = new Array();
				if (paused != null && this.paused != paused) {
					this.updatePaused(paused);
					fields.push('paused');
				}
				if (time != null && this.timeRemaining != time) {
					if (time < 0) time = 0;
					if (time < this.draft.constants.ALWAYS_SYNC_THRESHOLD || Math.abs(time - this.timeRemaining) > this.draft.constants.OUT_OF_SYNC_THRESHOLD) {
						this.timeRemaining = time;
						this.updateClock();
						if (this.timeout) window.clearTimeout(this.timeout);
						if (this.draft.status.connected && (!this.paused || this.draft.status.timedPause)) this.setClockCountdown();
						fields.push('timeRemaining');
					}
				}
				if (fields.length > 0) this.broadcastToListeners(fields);
			}

		});

		Draft.Status = Class.create(Draft.Component, {
			statusId: null,
			currentSelectionId: null,
			onAutopick: false,
			stateUpdated: false,
			timedPause: false,
			connected: false,
			initialize: function(draft) {
				this.draft = draft;
				this.currentView = this.draft.constants.VIEWS.DRAFT;
				this.timer = new Draft.Timer(this.draft);
			},
			
			getRound: function() {
				if (this.currentSelectionId == null) return 0;
				return Math.ceil((this.currentSelectionId+1)/this.draft.league.numTeams);
			},

			update: function(state) {
				var fields = new Array();
				if (state.status != null && state.status != this.statusId) {
					if (state.status == this.draft.constants.STATUS_PAUSED) state.status = this.draft.constants.STATUS_DRAFTING;
					this.updateStatus(state.status);
					fields.push('statusId');
				}
				if (state.connected != null && state.connected != this.connected) {
					this.connected = state.connected;
					fields.push('connected');
				}
				if (state.currentSelectionId != null && state.currentSelectionId != this.currentSelectionId) {
					this.setCurrentSelectionId(state.currentSelectionId);
					fields.push('currentSelectionId');
				}
				if (state.timedPause != null && state.timedPause != this.timedPause) {
					this.updateTimedPause(state.timedPause);
					fields.push('statusId');
				}
				this.broadcastToListeners(fields);
				
				// broadcast from team
				if (state.autopickTeamIds != null) {
					this.draft.league.setTeamAutopicks(state.autopickTeamIds);
					var newOnAutopick = state.autopickTeamIds.indexOf(this.draft.toTeamId) >= 0;
					if (newOnAutopick != this.onAutopick) {
						this.onAutopick = newOnAutopick;
						$('#autopick').html(newOnAutopick ? 'ON' : 'OFF');
					}
				}
				
				this.timer.syncTimer(state.timeRemaining, state.paused);
								
				if (!this.stateUpdated) {
					$('#appStatus').hide();
					$('#draftStatusMiniTable').show();
					this.stateUpdated = true;
				}
			},
			
			updateTimedPause: function(timedPause) {
				this.timedPause = timedPause == true;
				$('#countdownLabel').html((this.timedPause ? 'DRAFT RESUMES IN' : 'TIME REMAINING'));
			},

			updateStatus: function(statusId) {
				this.statusId = statusId;
				switch (this.statusId) {
					case this.draft.constants.STATUS_POSTDRAFT: 
						window.location.href = this.draft.constants.POST_DRAFT_URL + '?leagueId=' + this.draft.league.leagueId + '&teamId=' + this.draft.league.toTeamId; break;
					case this.draft.constants.STATUS_DRAFTING:
							$('#countdownLabel').html('TIME REMAINING');
							if (!this.paused) $('#draftStatusMiniTableStatusAlert').html(Utility.shortOrdinal(this.currentSelectionId+1)+' Overall');
							break;
					default: break;
				}
			},

			setCurrentSelectionId: function(currentSelectionId) {
				this.currentSelectionId = currentSelectionId;
				this.onClockTeam = this.draft.league.getTeamBySelectionId(currentSelectionId);
				this.timer.setOnClockStatus(this.onClockTeam.teamId == this.draft.league.toTeamId);
				$('#draftStatusMiniTableRnd').html(this.statusId == this.draft.constants.STATUS_PREDRAFT ? 'Pre Draft' : Utility.shortOrdinal(this.getRound())+' Round');
				$('#draftStatusMiniTableTeam').html(this.draft.league.getTeamBySelectionId(this.currentSelectionId).getFullName());
				if (!this.paused) $('#draftStatusMiniTableStatusAlert').html(Utility.shortOrdinal(this.currentSelectionId+1)+' Overall');
			},
			
			toggleToTeamAutopick: function() {
				this.draft.poster.toggleAutopick(!this.onAutopick);
			},
			
			setView: function(view) {
				for (var k in draft.constants.VIEWS) {
					var vl = k.toLowerCase();
					if (view == draft.constants.VIEWS[k]) {
						$('#'+vl+'View').show();
						$('#'+vl+'ViewSelected').html('&bull;');
					} else {
						$('#'+vl+'View').hide();
						$('#'+vl+'ViewSelected').html('&nbsp;');
					}
				}
			}

		});		
		
	
	
		Draft.DraftMessage = Class.create(Draft.Module, {
			didPause: false,
			paused: false,
			timedPause: false,
			connected: false,
	
			initialize: function(draft) {
				this.draft = draft;
				this.draft.status.timer.registerListener(this.timerListener.bindf(this), ['paused']);
				this.draft.status.registerListener(this.statusListener.bindf(this), ['timedPause', 'connected']);
			},
			
			statusListener: function(status) {
				if (status.timedPause != this.timedPause) {
					this.timedPause = status.timedPaused == true;
					this.render();
				}
				if (status.connected != this.connected) {
					this.connected = status.connected == true;
					this.render();
					this.toggle(!this.connected);
				}
			},
			
			timerListener: function(timer) {
				if (timer.paused != this.paused || (this.draft.lmTools && this.draft.lmTools.didPause != this.didPause)) {
					this.paused = timer.paused;
					this.didPause = this.draft.lmTools && this.draft.lmTools.didPause;
					this.render();
				}
			},
			
			toggle: function(show) {
				$('#draftMessageShell').toggle(show)
			},
			
			reconnect: function() {
				if (!this.connected) this.draft.poster.joinTeam();
			},
			
			render: function() {
				var messageTitle = '', messageTitleLong = '', messageShort = '', messageLong = '';
				var noMessage = false;
				if (!this.connected) {
					messageTitle = 'Draft disconnected';
					messageTitleLong = 'You have been disconnected';
					messageShort = 'You are no longer connected to the draft.';
					messageLong = 'You have been disconnected from the draft because you signed on from another location. Click the button below to reconnect and continue using this window.<br /><input type="button" value="Reconnect" onclick="draft.draftMessage.reconnect();" />';
				} else if (this.timedPause) {
					messageTitle = 'The draft is paused';
					messageTitleLong = 'The draft is paused';
					messageShort = 'Your draft will resume shortly.';
					messageLong = 'Your draft is paused and will resume shortly.';
				} else if (this.paused && this.didPause) {
					messageTitle = 'You paused the draft';
					messageTitleLong = 'You Have Paused the Draft';
					messageShort = 'Use the LM Tools above to control your draft and unpause.';
					messageLong = 'As League Manager of your league, you have paused the draft.  While paused, you have the power to make selections for other teams, undo selections, and toggle the autopilot setting of any team.  When you are done, click unpause to resume your draft.  Note: Undoing draft picks may force the draft application of other owners to reload in order to register all the changes you have made.';
				} else if (this.paused) {
					messageTitle = 'Draft Paused';
					messageTitleLong = messageTitle;
					messageShort = 'A League Manager has paused your draft.';
					messageLong = 'A League Manager has paused your draft.  While paused, your League Manager may edit picks and toggle the autopilot setting of any team.  This draft client may automatically reload itself when your League Manager resumes the draft to retrieve all changes made.';
				} else {
					noMessage = true;
				}
				$('#draftMessageOpen').toggle(!noMessage);
				$('#draftMessageTitle').html(messageTitle);
				$('#draftMessageShort').html(messageShort);
				$('#draftMessageTitleLong').html(messageTitleLong);
				$('#draftMessageLong').html(messageLong);	

			}
			
			
		});
			
			
	
	
	Draft.DraftOrderNav = Class.create(Draft.Component, {
		draft: null,
		selectionId: 0,
		onClockSelectionId: 0,

		initialize: function(draft) {
			this.draft = draft;
			this.autopickTeamIds = null;
			this.draft.status.registerListener(this.statusListener.bindf(this), ['currentSelectionId']);
			this.draft.league.registerTeamListeners(this.teamListener.bindf(this), ['onAutopick']);
		},

		statusListener: function(status) {
			if (status.currentSelectionId != this.onClockSelectionId) {
				if (this.selectionId < status.currentSelectionId || status.currentSelectionId < this.onClockSelectionId) this.sync();
				$('#dOrder_' + this.onClockSelectionId).removeClass('draftOrderItemOnClock');
				$('#dOrder_' + status.currentSelectionId).addClass('draftOrderItemOnClock');
				this.onClockSelectionId = status.currentSelectionId;
			}
		},
		
		teamListener: function(team) {
			this.updateAPStatus(team);
		},
		
		setSelectionId: function(selectionId) {
			var numToShow = this.draft.constants.DRAFTORDER_PICKS_TO_SHOW;
			if (!selectionId) selectionId = 0;
			var oldSelectionId = this.selectionId;
			this.selectionId = selectionId;
			if (selectionId - oldSelectionId > 0) {
				var nextEl, endEl, dOrderElement;		
				for (var i = oldSelectionId; i < selectionId; i++) {
					dOrderElement = $('#dOrder_' + i);
					if (!document.getElementById('dOrder_' + (i+1))) { this.selectionId = i; break; }
					else if (dOrderElement) {
						dOrderElement.hide();
						dOrderElementEnd = $('#dOrder_' + (i+numToShow));
						if (dOrderElementEnd) dOrderElementEnd.show();
					}
				}
			} else {
				var lastToShow = selectionId + numToShow-1, dOrderElement;
				for (var i = selectionId; i < oldSelectionId; i++) {
					dOrderElement = $('#dOrder_' + i);
					if (dOrderElement && i <= lastToShow) dOrderElement.show();

					dOrderElementEnd = $('#dOrder_' + (i+numToShow));
					if (dOrderElementEnd) dOrderElementEnd.hide();
				}
			}
		},
		
		moveSelectionId: function(delta) {
			var newSelectionId = Math.max(this.selectionId+delta, this.draft.status.currentSelectionId);
			this.setSelectionId(newSelectionId);
		},
		
		updateAPStatus: function(team) {
			$('#draftOrderNavRow').toggleClass('onAP_'+team.teamId, team.onAutopick);
		},

		sync: function() {
			this.setSelectionId(this.draft.status.currentSelectionId);
		}
	});

			
		
	
	
	Draft.Pick = Class.create(Draft.Component, {
		initialize: function(draft, pickData) {
			this.draft = draft;
			this.undone = pickData.undo == true;
			this.selectionId = pickData.selectionId - 1; // 1-index to 0-index
			this.slotCategoryId = pickData.slotCategoryId;
			var player = (this.undone ? this.draft.pickHistory.getPickBySelectionId(this.selectionId).player : this.draft.league.getPlayerById(pickData.player.playerId));
			this.player = (player ? player : this.draft.league.createPlayer(pickData.player));
			this.team = (this.undone ? this.player.team : this.draft.league.getTeamById(pickData.teamId));
			this.validate();
		},
		
		validate: function() {
			var invalid = false;
			if (!this.undone) {
				invalid = invalid || (this.selectionId == null || !this.team || !this.player);
				invalid = invalid || (this.draft.pickHistory.getNextSelectionId() != this.selectionId);
				var exTeam = this.draft.league.getTeamBySelectionId(this.selectionId);
				invalid = invalid || (!exTeam || exTeam.teamId != this.team.teamId);
				invalid = invalid || (this.player.team != null);
				// check slot?
			
			} else {
				var lastSelectionId = this.draft.pickHistory.getLastSelectionId();
				invalid = invalid || (lastSelectionId == null || this.selectionId != lastSelectionId);
				invalid = invalid || (!this.matches(this.draft.pickHistory.getPickBySelectionId(this.selectionId)));
			}			
			this.isValid = !invalid;
			return this.isValid;
		},
		
		assignToTeam: function() {
			if (this.isValid) return this.team.makePick(this);
			return false;
		},
		
		removeFromTeam: function() {
			if (this.isValid) return this.team.undoPick();
			return false;
		},
		
		createRow: function() {
			var r = document.createElement("tr");
			r.id = "pickRow_" + this.player.playerId;
			r.className = "appRowUnsel fontSml";
			var psc = document.createElement("td");
			psc.className = "picksSelectionCell";
			psc.innerHTML = (this.selectionId+1) + '.'
			r.appendChild(psc);
			var ptc = document.createElement("td");
			ptc.className = "picksTeamCell";
			ptc.innerHTML = this.team.abbrev;
			r.appendChild(ptc);
			var pnc = document.createElement("td");
			pnc.className = "picksNameCell";
			pnc.innerHTML = this.player.formatName();
			r.appendChild(pnc);
			return r;
		},
		
		matches: function(pick) {
			return (this.selectionId == pick.selectionId && this.team && this.team.teamId == pick.team.teamId/* && this.player && this.player.playerId == pick.player.playerId*/);
		}
	});

	
	Draft.PickHistory = Class.create(Draft.Module, {
		initialize: function(draft) {
			this.draft = draft;
			this.currentView = this.draft.constants.VIEWS.DRAFT;
			this.pickHistory = new Array();
		},
		
		updatePicks: function(picks) {
			if (picks.length > 0) {
				var pickSet = new Array();
				for (var i = 0; i < picks.length; i++) {
					var pick = new Draft.Pick(this.draft, picks[i]);
					if (pick.isValid) {
						if (!pick.undone) {
							pick.assignToTeam();
							this.addPickToHistory(pick);
						} else {
							pick.removeFromTeam();
							this.removePickFromHistory(pick);
						}
						pickSet.push(pick);
					}
				}
				this.lastPickSet = pickSet;
				this.broadcastToListeners(['pickHistory'], pickSet);
			}
		},
		
		addPickToHistory: function(pick) {
			this.pickHistory.push(pick);
			$('#picksTableTBody').prepend(pick.createRow());
		},
		
		removePickFromHistory: function() {
			var pick = this.pickHistory.pop();
			$('#picksTableTBody').remove('tr:first');
		},
		
		getNextSelectionId: function() {
			return (this.pickHistory.length > 0 ? this.pickHistory[this.pickHistory.length-1].selectionId + 1 : 0);
		},
		
		getLastSelectionId: function() {
			return (this.pickHistory.length > 0 ? this.pickHistory[this.pickHistory.length-1].selectionId : null);
		},
		
		getPickBySelectionId: function(selectionId) {
			return (this.pickHistory.length > selectionId ? this.pickHistory[selectionId] : null);
		}

	});
			
			
	
		Draft.SummaryByRound = Class.create(Draft.Module, {
			initialize: function(draft) {
				this.draft = draft;
				this.draft.pickHistory.registerListener(this.pickListener.bindf(this), ['pickHistory']);
			},
				
			pickListener: function(pickHistory, fields, picks) {
				for (var i = 0; i < picks.length; i++) {
					if (picks[i].undone) this.removePick(picks[i]);
					else this.addPick(picks[i]);
				}
			},
			
			removePick: function(pick) {
				this.getPickCell(pick).html('');
			},
			
			addPick: function(pick) {
				this.getPickCell(pick).html(this.draft.league.getPlayerByPick(pick).formatNameDetailed(''));
			},
			
			getPickCell: function(pick) {
				return $('#picksSummaryByRoundPickCell_' + pick.selectionId);
			}
			
		});
	
		Draft.SummaryByTeam = Class.create(Draft.Module, {
			initialize: function(draft) {
				this.draft = draft;
				this.draft.league.registerTeamListeners(this.teamListener.bindf(this), ['picks']);
			},
				
			teamListener: function(team, fields, pick) {
				if (team && pick && pick.player) {
					var player = this.draft.league.getPlayerByPick(pick);
					var slotCategoryId = player.slotCategoryId;
					var slotCount = (pick.undone ? team.slotCounts[slotCategoryId] : team.slotCounts[slotCategoryId] - 1);
					var rosterRow = $('#picksSummaryByTeam_' + team.teamId + '_' + slotCategoryId + '_' + slotCount);
					if (!rosterRow) rosterRow = this.addBenchRow(team, slotCategoryId, slotCount);
					rosterRow.children('td').eq(1).html((pick.undone ? '' : player.formatNameDetailed('')));
				}
			},

			addBenchRow: function(team, slotCategoryId, slotCount) {
				var rosterTableObj = document.getElementById('picksSummaryByTeam_' + team.teamId);
				if (rosterTableObj) {
					var insertIndex = (this.draft.league.numIrSlots > 0) ? rosterTableObj.rows.length + 1 - this.draft.league.numIrSlots : -1;
					var flexBenchRow = $(rosterTableObj.insertRow(insertIndex));
					flexBenchRow.addClass("picksSummaryRow").attr('id', 'picksSummaryByTeam_'+team.teamId+'_'+slotCategoryId+'_'+slotCount).html('<td class="teamSummarySlot">BE</td><td>&nbsp;</td>');
					return flexBenchRow;
				}
			}
			
		});
	
		Draft.Picker = Class.create(Draft.Module, {
			currentPlayer: null,
			lastSelectionMade: null,
			lastSelectionId: null,
		
			initialize: function(draft) {
				this.draft = draft;
				this.draft.status.registerListener(this.statusListener.bindf(this), ['statusId', 'currentSelectionId']);
				this.draft.status.timer.registerListener(this.statusListener.bindf(this), ['paused']);
				if (this.draft.lmTools) this.draft.lmTools.registerListener(this.statusListener.bindf(this), ['isLMDrafting']);
			},
			
			statusListener: function(status) {
				this.renderErrorMessage(this.checkErrors());
			},
			
			fetchPlayer: function(playerId) {
				var options = new Object();
				options.method = 'get';
				var onSuccess = function(data) { 
					var player = this.draft.league.createPlayer(data);
					this.selectPlayer(player.playerId, true);
				}.bindf(this);
				var url = DraftConstants.AJAX_PATH + 'getPlayer?leagueId=' + this.draft.league.leagueId + '&playerId=' + playerId;
				$.getJSON(url, null, onSuccess);
			},
			
			selectPlayer: function(playerId, fetched) {
				var player = this.draft.league.getPlayerById(playerId);
				if (player && (!this.currentPlayer || this.currentPlayer.playerId != player.playerId)) {
					this.currentPlayer = player;
					this.renderCurrentPlayer();
					this.renderErrorMessage(this.checkErrors());
					
					this.broadcastToListeners(['currentPlayer']);
				} else if (!player && !fetched) {
					this.fetchPlayer(playerId);
				
				} else {
					// could not find player
				}
			},
			
			renderCurrentPlayer: function() {
				$('#pickerText').hide();
				$('#pickerPlayerInfo').html(this.currentPlayer.formatNameDetailed('pickerPlayerName'));
				$('#pickerPlayerMug').empty().append(this.currentPlayer.getMugshot());
				$('#pickerPlayerLogo').empty().append(this.currentPlayer.getProTeamLogo());
				$('#pickerPlayerShell').show();
			},
			
			makePick: function() {
				this.lockDraftButton(true);
	
				this.lastSelectionId = this.draft.status.currentSelectionId;
				this.lastSelectionMade = this.currentPlayer;
				if (this.draft.lmTools && this.draft.lmTools.isLMDrafting) this.draft.poster.lmMakePick(this.draft.status.onClockTeam.teamId, this.currentPlayer.playerId);
				else this.draft.poster.makePick(this.currentPlayer.playerId);
			},
			
			lockDraftButton: function(makeLocked) {
				$('#draftPlayerButton').attr('disabled', (makeLocked ? 'disabled' : ''));
			},
			
			renderErrorMessage: function(newErrorMsg) {
				if (newErrorMsg) $('#pickerMsg').html(newErrorMsg).show();
				else $('#pickerMsg').hide();
			},
			
			getError: function() {
				var pickerMsg = null;
				if (this.currentPlayer) {
					if (this.draft.status.statusId == this.draft.constants.STATUS_PREDRAFT) { // predraft
						pickerMsg = 'Draft has not begun.';
					
					} else if (this.draft.status.timer.paused && !(this.draft.lmTools && this.draft.lmTools.isLMDrafting)) { // draft paused
						pickerMsg = 'Draft is paused.';
					
					} else if (this.currentPlayer.team != null) { // player drafted
						pickerMsg = 'Player drafted by ' + this.currentPlayer.team.abbrev;
					
					//} else if (status.currentSelectionId <= this.lastSelectionId) {
					//	pickerMsg = 'Pick Error.';
						
					} else {
						var team = (this.draft.lmTools && this.draft.lmTools.isLMDrafting) ? this.draft.status.onClockTeam : this.draft.league.toTeam;
						var errorMsg = team.getPickRosterErrors(this.currentPlayer);
						if (errorMsg) { // not valid on roster
							pickerMsg = errorMsg;
						} else if (this.draft.status.onClockTeam && this.draft.status.onClockTeam.teamId != this.draft.league.toTeam.teamId && !(this.draft.lmTools && this.draft.lmTools.isLMDrafting)) { // not on the clock
							pickerMsg = 'Not on the clock.';
						}
					}
				}
				return pickerMsg;
			},

			checkErrors: function() {
				var newErrorMsg = this.getError();
				this.lockDraftButton(newErrorMsg);
				return newErrorMsg;
			}			
			
		});
		
		
		
	
	
		Draft.RosterViewer = Class.create(Draft.Module, {
			draft: null,
			chooserOpen: false,
			teamId: null,
		
			initialize: function(draft) {
				this.draft = draft;
				this.teamId = this.draft.toTeamId;
				this.draft.league.registerTeamListeners(this.teamListener.bindf(this), ['picks']);
				this.chooseTeam(this.teamId);
			},
			
			teamListener: function(team, fields, pick) {
				if (team && pick && pick.player) {
					var player = this.draft.league.getPlayerByPick(pick);
					var slotCategoryId = player.slotCategoryId;
					var slotCount = (pick.undone ? team.slotCounts[slotCategoryId] : team.slotCounts[slotCategoryId] - 1);
					var rosterRow = $('#rstr' + team.teamId + '_' + slotCategoryId + '_' + slotCount);
					if (!rosterRow) rosterRow = this.addBenchRow(team, slotCategoryId, slotCount);
					rosterRow.children('td').eq(1).html((pick.undone ? '' : player.formatName()));
				}
			},
			
			addBenchRow: function(team, slotCategoryId, slotCount) {
				var rosterTableObj = document.getElementById('rosterTable_' + team.teamId);
				if (rosterTableObj) {
					var insertIndex = (this.draft.league.numIrSlots > 0) ? rosterTableObj.rows.length - this.draft.league.numIrSlots : -1;
					var flexBenchRow = $(rosterTableObj.insertRow(insertIndex));
					flexBenchRow.addClass("rosterItemRow").attr('id','rstr'+team.teamId+'_'+slotCategoryId+'_'+slotCount).html('<td class="rosterItemSlotCell">BE</td><td>&nbsp;</td>');
					return flexBenchRow;
				}
			},
			
			toggleChooser: function() {
				this.chooserOpen = !this.chooserOpen;
				$('#rosterChooserRest').toggle(this.chooserOpen);
				$('#rosterChooserParentDiv').toggleClass('chooserInactive', !this.chooserOpen).toggleClass('chooserActive', this.chooserOpen);
			},
			
			chooseTeam: function(teamId) {
				if (teamId != this.teamId) {
					this.toggleTeamDisplay(this.teamId, false);
					this.teamId = teamId;
					this.toggleTeamDisplay(teamId, true);
					
					$('#rosterChooserSel').html((this.teamId != this.draft.toTeamId) ? this.draft.league.getTeamById(teamId).getFullName() : 'Your Team');
					$('#rosterChooser_'+this.activeTeamId).removeClass('chooserItemHighlight');
				}
				if (this.chooserOpen) this.toggleChooser();
				this.broadcastToListeners(['team']);
			},
			
			toggleTeamDisplay: function(teamId, show) {
				$('#rosterTable_'+teamId).toggle(show);
				$('#rosterContainer_'+teamId).toggle(show);
				$('#rosterChooser_'+teamId).toggle(!show);
			}
		});
			
			
	

	Draft.PositionMaxes = Class.create(Draft.Module, {
		initialize: function(draft) {
			this.draft = draft;
			this.league = this.draft.league;
			this.teamId = this.draft.toTeamId;
			this.positionIds = new Array();
			for (var positionId in this.league.positionItems) {
				if (this.league.positionItems[positionId].max != 0) this.positionIds.push(this.league.positionItems[positionId].positionId);
			}
			this.draft.rosterViewer.registerListener(this.viewerListener.bindf(this), ['team']);
			this.league.registerTeamListeners(this.teamListener.bindf(this), ['positionCounts']);
			this.render(null);
		},

		viewerListener: function(viewer) {
			this.teamId = viewer.teamId;
			this.render(null);
		},

		teamListener: function(team, fields, positionId) {
			if (team.teamId == this.teamId) this.render(positionId);
		},

		render: function(positionId) {
			var team = this.league.getTeamById(this.teamId);
			if (positionId != null) this.renderPosLimit(positionId, team.positionCounts[positionId]);
			else {
				for (var i = 0; i < this.positionIds.length; i++) this.renderPosLimit(this.positionIds[i], team.positionCounts[this.positionIds[i]]);
			}
		},

		renderPosLimit: function(positionId, posCount) {
			var c = $('#posLimit_' + positionId);
			if (c) c.text((posCount != null ? posCount : 0));
		}
	});

	
		
	Draft.PlayerSearch = Class.create(Draft.Module, {
		initialize: function(draft) {
			this.draft = draft;
		},
		
		search: function() {
			var val = $('#plyrSrchInput').val();
			if (val != '') {
				var onSuccess = function(data) { 
					this.processSearchResults(data);
				}.bindf(this);
				var url = DraftConstants.AJAX_PATH + 'getSearch?leagueId=' + this.draft.league.leagueId + '&search=' + val + '&limit=' + this.draft.constants.SEARCH_LIMIT;
				$.getJSON(url, null, onSuccess);
			}
		},
		
		processSearchResults: function(playerJson) {
			var players = playerJson.players;
			this.clear();
			if (!players || players.length == 0) {
				this.showMessage('No ' + this.draft.constants.PLAYER_WORD.toLowerCase() + 's matched your search.');
			} else {
				for (var i = 0; i < players.length; i++) {
					var playerData = players[i];
					var player = this.draft.league.getPlayerById(playerData.playerId);
					if (!player) player = this.draft.league.createPlayer(playerData);
					$('#searchRowsParent').append(this.createPlayerRow(player));
				}
				if (playerJson.more) this.showMessage('Results have been trimmed. Try a more specific search for better results.');
			}
		},
		
		showMessage: function(message) {
			if (!message || message == '') {
				$('#searchMessage').hide();
				$('#searchRowsParent').removeClass('searchResultsTrimmed');
			} else {
				$('#searchMessage').html(message).show();
				$('#searchRowsParent').addClass('searchResultsTrimmed');
			}
		},
		
		playerClick: function(playerId) {
			this.draft.picker.selectPlayer(playerId);
			return false;
		},
		
		createPlayerRow: function(player) {
			return $('<a />').attr('href', '#').click(function(){ this.playerClick(player.playerId) }.bindf(this)).addClass('appRow appRowUnsel searchResultRow'+(player.team?' searchItemDrafted':'')).html(player.formatNameDetailed());
		},
		
		clear: function() {
			this.showMessage(null);
			$('#searchRowsParent').empty().removeClass('searchResultsTrimmed');
		}
		
	});
		
	
		Draft.DraftList = Class.create(Draft.Module, {
			open: false,
			initialize: function(draft) {
				this.draft = draft;
				document.getElementById('dlistFrame').src = 'htmldraft/draftlistiframe?leagueId=' + this.draft.league.leagueId + '&teamId=' + this.draft.league.toTeamId;
				this.draftListFrame = null;
				this.queuedPicks = new Array();
				this.draft.pickHistory.registerListener(this.pickListener.bindf(this), ['pickHistory']);
			},
			
			onFrameLoad: function(f) {
				this.draftListFrame = f;
				while (this.queuedPicks.length) this.pickListener(null, null, this.queuedPicks.shift());
				
				// resize on iPads
				var iframe = $('#dlistFrame');
				if (iframe.height() > 450) {
					iframe.parent().css({
						"height": "450px",
						"overflow-y": "scroll"
					});
				}
			},
			
			queuePicks: function(picks) {
				this.queuedPicks[this.queuedPicks.length] = picks;
			},
			
			pickListener: function(pickHistory, fields, picks) {
				if (this.draftListFrame) {
					for (var i = 0; i < picks.length; i++) {
						if (picks[i].undone) this.draftListFrame.showPlayer(picks[i].player);
						else this.draftListFrame.hidePlayer(picks[i].player);
					}
				} else this.queuePicks(picks);
			},
		
			toggleSlotChooser: function() {
				if (!this.open) {
					$('#dlistPosFilterRest').show();
					$('#dlistPosFilterParentDiv').addClass('dlistPosFilterParentDiv chooserActive');
				} else {
					$('#dlistPosFilterRest').hide();
					$('#dlistPosFilterParentDiv').removeClass('chooserActive');
				}
				this.open = !this.open
			},
			
			chooseSlot: function(slotCategoryId, abbrev) {
				this.draftListFrame.filterBySlot(slotCategoryId, abbrev);
				$('#dlistPosFilterSel').text(abbrev);
				this.toggleSlotChooser();
			},
			
			selectPlayer: function(playerId) {
				this.draft.picker.selectPlayer(playerId);
			}
		});

		
	

		Draft.Chat = Class.create(Draft.Module, {
			sentMessage: false,

			initialize: function(draft) {
				this.draft = draft;
				this.chatDiv = document.getElementById('chatDiv');
				this.inputDiv = document.getElementById('chatInput');
				this.thisUser = this.draft.league.getOwnerById(DraftConstants.UP_ID);
			},

			processMessages: function(messages) {
				for (var i = 0; i < messages.length; i++) {
					this.processMessage(messages[i]);
				}
			},

			postClick: function () {
				this.sendMessage(this.inputDiv.value);
			},

			inputKeyUp: function(event, input) {
				var keyPressed = (event ? event.keyCode : window.event.keyCode);
				if (keyPressed == DraftConstants.ENTER_KEYCODE) this.sendMessage(input);
			},

			sendMessage: function(text) {
				text = encodeURIComponent(text);
				this.draft.poster.chat(text);
				this.inputDiv.value = '';
				if (DraftConstants.AUTO_SHOW_SENT_MESSAGES) {
					this.sentMessage = true;
					var timestamp = new Date().getTime();
					var message = new Draft.Chat.Message(this.draft, {user: this.thisUser, text: text, timestamp: timestamp});

					this.displayMessage(message);
				}
			},

			processMessage: function(chatPost) {
				var message = new Draft.Chat.Message(this.draft, chatPost);
				if (!DraftConstants.AUTO_SHOW_SENT_MESSAGES || message.user.userProfileId != this.thisUser.userProfileId || !this.sentMessage) {
					this.displayMessage(message);
				}
			},

			displayMessage: function(message) {
				var shouldScroll = this.messageTriggersScrolling(message);
				var messageDiv = document.createElement('div');
				messageDiv.innerHTML = message.formatted(true);
				messageDiv.className = 'chatMsg';
				this.chatDiv.appendChild(messageDiv);
				if (shouldScroll) this.scrollToBottom();
			},

			messageTriggersScrolling: function(message) {
				return (message.user.userProfileId == this.thisUser.userProfileId || (this.chatDiv.scrollTop + this.chatDiv.offsetHeight == this.chatDiv.scrollHeight));
			},

			scrollToBottom: function() {
				this.chatDiv.scrollTop = this.chatDiv.scrollHeight;
			}

		});

		Draft.Chat.Message = Class.create(Draft.Component, {
			text: null,
			user: null,
			date: null,
			draft: null,

			initialize: function(draft, messageObj) {
				this.draft = draft;
				this.text = decodeURIComponent(unescape(messageObj.message));
				this.user = this.draft.league.getOwnerById(messageObj.userProfileId);
				this.date = new Date();
				this.date.setTime(messageObj.timestamp);
			},

			formatDate: function() {
				var tempTime = new Date();
				tempTime.setTime(this.date.getTime() - ((DraftConstants.TIMEZONE_OFFSET - this.date.getTimezoneOffset()) * 60 * 1000));

				var timeStr = '' + ((tempTime.getHours() % 12 > 0) ? tempTime.getHours() % 12 : 12);
				timeStr += ':' + (tempTime.getMinutes() < 10 ? '0' : '') + tempTime.getMinutes();
				timeStr += ' ' + (tempTime.getHours() < 12 ? 'AM' : 'PM');

				return timeStr;
			},

			formatText: function() {
				var formatted = this.text;
				formatted = formatted.replace(/</g, '&lt;');
				formatted = formatted.replace(/>/g, '&gt;');
				formatted = formatted.replace(/\b(https?:\/\/\S*)\b/gi, '<a href="$1">$1</a>');
				return formatted;
			},

			formatted: function(showDate) {
				return '<strong>' + this.user.getFullName() + (showDate ? ' (' + this.formatDate() + ')' : '') + ':</strong> ' + this.formatText();
			}
		});

	