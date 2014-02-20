/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 14-2-10
 * Time: AM11:40
 * 思路：当跳到一个上下左右都不能走的点就从起点重新跳。
 */


(function () {
	var root = window;

	var Fish = {};
	Fish.Version = '0.1.0';//版本号
	Fish.$ = root.jQuery || root.Zepto || root.$;


	var isFunction = function (it) {
		return {}.toString.call(it) == "[object Function]";
	};

	var isString = function (it) {
		return {}.toString.call(it) == "[object String]";
	};

	var isArray = function (it) {
		return {}.toString.call(it) == "[object Array]";
	};

	var isObject = function (it) {
		return {}.toString.call(it) == "[object Object]";
	};

	/**
	 * 克隆对象和数组
	 * @param obj
	 * @returns {{}}
	 */
	var clon = function (obj) {
		var newObj = {}, self = this;

		if(self.isArray(obj)){
			newObj = [];
		}

		var cloneObject = (function (a, b) {
			if (self.isObject(a)) {
				for (k in a) {
					if (a.hasOwnProperty(k)) {
						if (self.isObject(a[k])) {
							b[k] = {};
							arguments.callee(a[k], b[k]);
						} else if (self.isArray(a[k])) {
							b[k] = [];
							arguments.callee(a[k], b[k]);
						} else {
							b[k] = a[k];
						}
					}
				}
			} else if (self.isArray(a)) {
				for (k in a) {
					if (self.isObject(a[k])) {
						b[k] = {};
						arguments.callee(a[k], b[k]);
					} else if (self.isArray(a[k])) {
						b[k] = [];
						arguments.callee(a[k], b[k]);
					} else {
						b[k] = a[k];
					}
				}
			}
		}(obj, newObj));

		return newObj;
	};

	var equals = function (a, b, aStack, bStack) {
		if (!aStack) {
			aStack = []
		}

		if (!bStack) {
			bStack = [];
		}

		// Identical objects are equal. `0 === -0`, but they aren't identical.
		// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
		if (a === b) return a !== 0 || 1 / a == 1 / b;
		// A strict comparison is necessary because `null == undefined`.
		if (a == null || b == null) return a === b;
		// Unwrap any wrapped objects.
//		if (a instanceof _) a = a._wrapped;
//		if (b instanceof _) b = b._wrapped;
		// Compare `[[Class]]` names.
		var className = toString.call(a);
		if (className != toString.call(b)) return false;
		switch (className) {
			// Strings, numbers, dates, and booleans are compared by value.
			case '[object String]':
				// Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
				// equivalent to `new String("5")`.
				return a == String(b);
			case '[object Number]':
				// `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
				// other numeric values.
				return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
			case '[object Date]':
			case '[object Boolean]':
				// Coerce dates and booleans to numeric primitive values. Dates are compared by their
				// millisecond representations. Note that invalid dates with millisecond representations
				// of `NaN` are not equivalent.
				return +a == +b;
			// RegExps are compared by their source patterns and flags.
			case '[object RegExp]':
				return a.source == b.source &&
					a.global == b.global &&
					a.multiline == b.multiline &&
					a.ignoreCase == b.ignoreCase;
		}
		if (typeof a != 'object' || typeof b != 'object') return false;
		// Assume equality for cyclic structures. The algorithm for detecting cyclic
		// structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
		var length = aStack.length;
		while (length--) {
			// Linear search. Performance is inversely proportional to the number of
			// unique nested structures.
			if (aStack[length] == a) return bStack[length] == b;
		}
		// Objects with different constructors are not equivalent, but `Object`s
		// from different frames are.
		var aCtor = a.constructor, bCtor = b.constructor;
		if (aCtor !== bCtor && !(isFunction(aCtor) && (aCtor instanceof aCtor) &&
			isFunction(bCtor) && (bCtor instanceof bCtor))) {
			return false;
		}
		// Add the first object to the stack of traversed objects.
		aStack.push(a);
		bStack.push(b);
		var size = 0, result = true;
		// Recursively compare objects and arrays.
		if (className == '[object Array]') {
			// Compare array lengths to determine if a deep comparison is necessary.
			size = a.length;
			result = size == b.length;
			if (result) {
				// Deep compare the contents, ignoring non-numeric properties.
				while (size--) {
					if (!(result = equals(a[size], b[size], aStack, bStack))) break;
				}
			}
		} else {
			// Deep compare objects.
			for (var key in a) {
				if (a.hasOwnProperty(key)) {
					// Count the expected number of properties.
					size++;
					// Deep compare each member.
					if (!(result = b.hasOwnProperty(key) && equals(a[key], b[key], aStack, bStack))) break;
				}
			}
			// Ensure that both objects contain the same number of properties.
			if (result) {
				for (key in b) {
					if (b.hasOwnProperty(key) && !(size--)) break;
				}
				result = !size;
			}
		}
		// Remove the first object from the stack of traversed objects.
		aStack.pop();
		bStack.pop();
		return result;
	};

	var slice = [].slice;


	var Events = Fish.events = {
		//绑定事件 格式 “change:age” ，context为调用上下文
		on: function (name, callback, context) {
			this._events || (this._events = {});
			var events = this._events[name] || (this._events[name] = []);
			events.push({callback: callback, context: context || this});
			return this;
		},

		once: function (name, callback, context) {
			var self = this;
			var once = function () {
				self.off(name);
				callback.apply(this, arguments);
			};

			this.on(name, once, context);
		},

		off: function (name) {
			var names, i, l, j, k;

			if (!name) {
				return this;
			}

			if(isString(name)){
				names=[name];
			}else{
				names = name;
			}

			for (i = 0, l = names.length; i < l; i++) {
				name = names[i];
				delete this._events[name];
			}
		},

		trigger: function (name) {
			if (!this._events) return this;
			var args = slice.call(arguments, 1);
			var events = this._events[name];
			var allEvents = this._events.all;
			if (events) triggerEvents(events, args);
			if (allEvents) triggerEvents(allEvents, arguments);
			return this;
		}
	};

	var triggerEvents = function (events, args) {
		var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
		switch (args.length) {
			case 0:
				while (++i < l) (ev = events[i]).callback.call(ev.context);
				return;
			case 1:
				while (++i < l) (ev = events[i]).callback.call(ev.context, a1);
				return;
			case 2:
				while (++i < l) (ev = events[i]).callback.call(ev.context, a1, a2);
				return;
			case 3:
				while (++i < l) (ev = events[i]).callback.call(ev.context, a1, a2, a3);
				return;
			default:
				while (++i < l) (ev = events[i]).callback.apply(ev.context, args);
		}
	};


	var Module = Fish.Module = function(attributes,options){
		this.attributes = {};
		this.default = true;
		this.set(attributes,options);
	};

	Module.prototype = {
		get:function(key){
			return this.attributes[key];
		},

		del:function(key){
			delete this.attributes[key];
			this.trigger('del:'+key,this)
		},

		set:function(key,val,options){
			var attr,attrs,silent,del,changing,current,changes=[];

			if(isObject(key)){
				attrs = key;
				options = val;
			}else{
				(attrs={})[key]=val;
			}

			options || (options = {});

			silent = options.silent;
			del = options.del;
			current = this.attributes;

			for(attr in attrs){
				val = attrs[attr];
				if(this.default || !equals(current[attr],val)){
					changes.push(attr);
				}

				if(del){
					this.del(attr);
				}else{
					current[attr]=val;
				}
			}

			if(!silent){
				for(var i=0;i<changes.length;i++){
					this.trigger('change:'+changes[i],this,current[changes[i]],options);
				}
			}

			this.default=false;

			return this;
		}
	};




	//视图对象
	var View = Fish.View = function (includes) {
		this.initializer.apply(this, arguments);
		this.init.apply(this, arguments);
		this.fn = this.constructor.prototype;
	};


	View.prototype = {
		proxy: function (func) {
			return $.proxy(func, this);
		},

		include: function (obj) {
			$.extend(this.fn, obj);
		},

		init: function () {
		},

		initializer: function (options) {
			for (var key in options) {
				this[key] = options[key];
			}


			if (this.elements) {
				this.refreshElements();
			}

			if (this.events) {
				this.delegateEvents();
			}
		},

		$: function (selector) {
			this.el || (this.el=$(document.body));
			return $(selector, this.el);
		},

		eventSplitter: /^(\w+)\s*(.*)$/,

		delegateEvents: function () {
			for (var key in this.events) {
				var methodName = this.events[key];

				var tempethod = this.proxy(this[methodName]);
				var method = (function(tempethod){
					return function(event){
						tempethod(this,event);
					};
				}(tempethod));


				var match = key.match(this.eventSplitter);
				var eventName = match[1], selector = match[2];
				if (selector === '') {
					this.el.bind(eventName, method);
				} else {
					if (selector.search(/_rel$/) !== -1) {
						selector = this[selector+'Selector'];
					}
					this.el.delegate(this[selector] ? this[selector] : selector, eventName, method);
				}
			}
		},

		//更新元素
		refreshElements: function () {
			var self = this;
			for (var key in this.elements) {

				var keyName = this.elements[key];

				if (keyName.search(/_rel$/) !== -1) {
					this[keyName+'Selector'] = key;

					var name = keyName.replace(/_rel$/, '');
					this[keyName] = (function (key, name) {
						return function () {
							return self[name] = self.$(key);
						}
					}(key, name));
				} else {
					var a = this.$(key);
					this[keyName] = a;
				}
			}
		}
	};

	//返回一个函数用于对象实例化
	var extend = function (obj) {


		var self = this;
		var child = function () {
			self.apply(this, arguments);
		};

		child.prototype = Object.create(this.prototype);

		$.extend(child.prototype, obj);

		return child;
	};

	Module.extend=View.extend = extend;

	$.extend(Module.prototype, Events);
	window.FishMVC = Fish;
})();