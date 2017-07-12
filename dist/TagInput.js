module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(14)
  , IE8_DOM_DEFINE = __webpack_require__(44)
  , toPrimitive    = __webpack_require__(24)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(16)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(47)
  , defined = __webpack_require__(25);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(0)
  , core      = __webpack_require__(1)
  , ctx       = __webpack_require__(43)
  , hide      = __webpack_require__(7)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(2)
  , createDesc = __webpack_require__(20);
module.exports = __webpack_require__(3) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(31);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(28)('wks')
  , uid        = __webpack_require__(21)
  , Symbol     = __webpack_require__(0).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(90);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(94);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(31);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("React");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(97)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(99)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(46)
  , enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(101);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(15);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(28)('keys')
  , uid    = __webpack_require__(21);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(67);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(79);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(14)
  , dPs         = __webpack_require__(72)
  , enumBugKeys = __webpack_require__(29)
  , IE_PROTO    = __webpack_require__(27)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(45)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(73).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(2).f
  , has = __webpack_require__(4)
  , TAG = __webpack_require__(10)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(10);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(0)
  , core           = __webpack_require__(1)
  , LIBRARY        = __webpack_require__(32)
  , wksExt         = __webpack_require__(36)
  , defineProperty = __webpack_require__(2).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @alias to pluck
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _pluck = __webpack_require__(106);

Object.defineProperty(exports, 'pluck', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pluck).default;
  }
});
exports.objectSize = objectSize;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isArray = isArray;
exports.isUndefined = isUndefined;
exports.bind = bind;
exports.bindAll = bindAll;
exports.mergeDeep = mergeDeep;
exports.deepCopy = deepCopy;
exports.isIEBrowser = isIEBrowser;
exports.detectIEVersion = detectIEVersion;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Returns the size of an Object
 * @param     {Object}    obj
 * @return    {Number}    size
 */
function objectSize(obj) {
  var size = 0;
  var key = void 0;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }

  return size;
}

/**
 * Checks if value is the language type of Object
 * will skip values === null
 * @param     {Mixed}    prop
 * @return    {Bool}
 */
function isObject(prop) {
  // Weird behaviour with spec in Javascript, the typeof Array is Object
  return prop !== null && !Array.isArray(prop) && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object';
}

/**
 * Checks if value is classified as a Function object
 * @param     {Mixed}    prop
 * @return    {Bool}
 */
function isFunction(prop) {
  return typeof prop === 'function';
}

/**
 * Checks if value is classified as a String primitive or object
 * @param     {Mixed}    prop
 * @return    {Bool}
 */
function isString(prop) {
  return typeof prop === 'string';
}

/**
 * Checks if value is classified as an Array object
 * @param     {Mixed}    prop
 * @return    {Bool}
 */
function isArray(prop) {
  return Array.isArray(prop);
}

/**
 * Checks if value is undefined
 * @param     {Mixed}    prop
 * @return    {Bool}
 */
function isUndefined(prop) {
  return typeof prop === 'undefined';
}

/**
 * Bind to itself
 * @param     {args...}
 * @return    {Undefined}
 * @example   bind(this, 'handleClick', 'handleSubmit');
 */
function bind() {
  var args = Array.prototype.slice.call(arguments);
  var ctx = args.splice(0, 1)[0];
  for (var i = 0; i < args.length; i++) {
    ctx[args[i]] = ctx[args[i]].bind(ctx);
  }
}

/**
 * Binds methods of an object to the object itself,
 * overwriting the existing method.
 * Method names may be specified as individual arguments
 * or as arrays of method names
 * @param     {Object}  obj
 * @return    {Object}  result
 */
function bindAll(obj) {
  var result = obj;

  for (var prop in result) {
    if (result.hasOwnProperty(prop) && typeof result[prop] === 'function') {
      result[prop] = result[prop].bind(result);
    }
  }
  return result;
}

/**
 * This method is like _.assign except that it
 * recursively merges own and inherited enumerable
 * string keyed properties of source objects into the
 * destination object
 * @param     {Object}      target
 * @param     {Object}      source
 * @return    {Object}      target
 */
function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, _defineProperty({}, key, {}));
        }
        mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

/**
 * Recursive object copy
 *
 * @param     {Array<Objects> || Objects}    obj
 * @return    {Array<Objects> || Objects}
 */
/* eslint-disable */
function deepCopy(obj) {
  var result;

  // Handle Date
  if (obj instanceof Date) {
    result = new Date();
    result.setTime(obj.getTime());
    return result;
  }

  var gdcc = '__getDeepCircularCopy__';
  if (obj !== Object(obj)) {
    return obj; // primitive value
  }

  var set = gdcc in obj;
  var cache = obj[gdcc];

  if (set && typeof cache === 'function') {
    return cache();
  }
  // else
  obj[gdcc] = function () {
    return result;
  }; // overwrite

  // Array of objects
  if (obj instanceof Array) {
    result = [];
    for (var i = 0; i < obj.length; i++) {
      result[i] = deepCopy(obj[i]);
    }
  } else if (obj instanceof Object) {
    // Object or nested objects (tree)
    result = {};
    for (var prop in obj) {
      if (prop !== gdcc) {
        result[prop] = deepCopy(obj[prop]);
      } else if (set) {
        result[prop] = deepCopy(cache);
      }
    }
  } else {
    throw new Error('Unable to copy obj! Its type is not supported.');
  }

  if (set) {
    obj[gdcc] = cache; // reset
  } else {
    delete obj[gdcc]; // unset again
  }
  return result;
}
/*eslint-enable */

/**
 * Detect IE browser
 * @param  {String} prop
 * @return {Bool}
 */
function isIEBrowser(prop) {
  switch (prop) {
    case 'ie10':
      return navigator.appVersion.indexOf('MSIE 10') !== -1 && navigator.appVersion.indexOf('Trident') === -1;
    case 'ie11':
      return navigator.appVersion.indexOf('Trident') !== -1 && navigator.appVersion.indexOf('MSIE 10') === -1;
    case 'edge':
      return navigator.appVersion.indexOf('Edge') !== -1;
    // IE10 || IE11
    default:
      return navigator.appVersion.indexOf('Trident') !== -1 || navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
}

/**
 * Detect IE browser version
 * @return {String}
 */
function detectIEVersion() {
  var ua = window ? window.navigator.userAgent : navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(59);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(62);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(16)(function(){
  return Object.defineProperty(__webpack_require__(45)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15)
  , document = __webpack_require__(0).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(4)
  , toIObject    = __webpack_require__(5)
  , arrayIndexOf = __webpack_require__(64)(false)
  , IE_PROTO     = __webpack_require__(27)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(48);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(32)
  , $export        = __webpack_require__(6)
  , redefine       = __webpack_require__(51)
  , hide           = __webpack_require__(7)
  , has            = __webpack_require__(4)
  , Iterators      = __webpack_require__(33)
  , $iterCreate    = __webpack_require__(71)
  , setToStringTag = __webpack_require__(35)
  , getPrototypeOf = __webpack_require__(74)
  , ITERATOR       = __webpack_require__(10)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(46)
  , hiddenKeys = __webpack_require__(29).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(22)
  , createDesc     = __webpack_require__(20)
  , toIObject      = __webpack_require__(5)
  , toPrimitive    = __webpack_require__(24)
  , has            = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(44)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(38);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function isType(type) {
  var not = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var val = arguments[2];

  var result = void 0;
  if (type === 'Undefined') {
    // If value is set to the global `undefined` we'll get the wrong result.
    // Minifiers may do this
    result = typeof val === 'undefined';
  } else {
    result = Object.prototype.toString.call(val) === '[object ' + type + ']';
  }
  return not ? !result : result;
}

var keys = {
  obj: 'Object',
  str: 'String',
  undef: 'Undefined',
  func: 'Function',
  nul: 'Null',
  arr: 'Array',
  num: 'Number'
};

var obj = exports.obj = isType.bind(null, 'Object', false);

var str = exports.str = isType.bind(null, 'String', false);

var undef = exports.undef = isType.bind(null, 'Undefined', false);

var func = exports.func = isType.bind(null, 'Function', false);

var nul = exports.nul = isType.bind(null, 'Null', false);

var arr = exports.arr = isType.bind(null, 'Array', false);

var num = exports.num = isType.bind(null, 'Number', false);

function iter(not, val) {
  var result = obj(val) || arr(val) || func(val);
  return not ? !result : result;
}

var iterable = exports.iterable = iter.bind(null, false);

var not = exports.not = function () {
  // eslint-disable-line func-names
  var fns = {};
  for (var key in keys) {
    if (keys.hasOwnProperty(key)) {
      fns[key] = isType.bind(null, keys[key], true);
    }
  }
  fns.iterable = iter.bind(null, true);
  return fns;
}(undefined);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getIn;
/**
 * Get a nested value of an object or return
 * @param  {Array<String>}  path
 * @param  {Object}         obj
 * @param  {Mixed}          defaultValue
 * @return {Mixed}
 */
function getIn(path, obj, defaultValue) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || path instanceof Array !== true) {
    return defaultValue;
  } else if (path.length === 0) {
    return obj;
  }

  // Let the cloning begin
  path = path.slice(0);
  var result = Object.assign({}, obj);

  while (path.length > 0) {
    var key = path.shift();
    if (!(key in result)) {
      // Can'd the the key in the object so return the defaultValue
      return defaultValue;
    }
    result = result[key];
  }

  return result;
}

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("ship-components-icon");

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(42);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(11);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TagContainer = __webpack_require__(100);

var _TagContainer2 = _interopRequireDefault(_TagContainer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var TagInput = function (_React$Component) {
  (0, _inherits3.default)(TagInput, _React$Component);

  function TagInput() {
    (0, _classCallCheck3.default)(this, TagInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));

    _this.state = {
      selection: []
    };

    _this.handleSelectItem = _this.handleSelectItem.bind(_this);
    _this.handleDeselectItem = _this.handleDeselectItem.bind(_this);
    return _this;
  }

  TagInput.prototype.handleSelectItem = function handleSelectItem(item) {
    var selection = this.state.selection.slice(0);
    selection.push(item);
    this.setState({
      selection: selection
    });
  };

  TagInput.prototype.handleDeselectItem = function handleDeselectItem(item) {
    var selection = this.state.selection;

    var selectItemBy = item.key ? 'key' : 'id';
    var index = selection.findIndex(function (selectedItem) {
      return item[selectItemBy] === selectedItem[selectItemBy];
    });

    if (index > -1) {
      selection.splice(index, 1);
      this.setState({
        selection: selection
      });
    }
  };

  TagInput.prototype.render = function render() {
    return _react2.default.createElement(_TagContainer2.default, (0, _extends3.default)({}, this.props, {
      selection: this.state.selection,
      onSelect: this.handleSelectItem,
      onDeselect: this.handleDeselectItem
    }));
  };

  return TagInput;
}(_react2.default.Component);

// default props


exports.default = TagInput;
TagInput.defaultProps = {
  addItems: false,
  loading: false,
  addOptions: false,
  multiple: true,
  filterable: true,
  darkTheme: false,

  className: '',
  orderOptionsBy: 'title',
  placeholder: 'Select...',
  togglePosition: 'left',
  noOptionsMessage: '',
  toggleSwitchStyle: 'search',

  selection: [],
  optionGroupTitles: []
};

// prop types checking
TagInput.propTypes = {
  loading: _propTypes2.default.bool,
  addOptions: _propTypes2.default.bool,
  multiple: _propTypes2.default.bool,
  filterable: _propTypes2.default.bool,
  darkTheme: _propTypes2.default.bool,

  className: _propTypes2.default.string,
  orderOptionsBy: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  togglePosition: _propTypes2.default.string,
  noOptionsMessage: _propTypes2.default.string,
  toggleSwitchStyle: _propTypes2.default.string,

  options: _propTypes2.default.array.isRequired,
  selection: _propTypes2.default.array,
  optionGroupTitles: _propTypes2.default.array
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
module.exports = __webpack_require__(1).Object.assign;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(63)});

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(17)
  , gOPS     = __webpack_require__(30)
  , pIE      = __webpack_require__(22)
  , toObject = __webpack_require__(49)
  , IObject  = __webpack_require__(47)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(16)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5)
  , toLength  = __webpack_require__(65)
  , toIndex   = __webpack_require__(66);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
__webpack_require__(75);
module.exports = __webpack_require__(36).f('iterator');

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(70)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(50)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26)
  , defined   = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(34)
  , descriptor     = __webpack_require__(20)
  , setToStringTag = __webpack_require__(35)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(10)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(2)
  , anObject = __webpack_require__(14)
  , getKeys  = __webpack_require__(17);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).document && document.documentElement;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(4)
  , toObject    = __webpack_require__(49)
  , IE_PROTO    = __webpack_require__(27)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
var global        = __webpack_require__(0)
  , hide          = __webpack_require__(7)
  , Iterators     = __webpack_require__(33)
  , TO_STRING_TAG = __webpack_require__(10)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(77)
  , step             = __webpack_require__(78)
  , Iterators        = __webpack_require__(33)
  , toIObject        = __webpack_require__(5);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(50)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(81);
__webpack_require__(87);
__webpack_require__(88);
__webpack_require__(89);
module.exports = __webpack_require__(1).Symbol;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(0)
  , has            = __webpack_require__(4)
  , DESCRIPTORS    = __webpack_require__(3)
  , $export        = __webpack_require__(6)
  , redefine       = __webpack_require__(51)
  , META           = __webpack_require__(82).KEY
  , $fails         = __webpack_require__(16)
  , shared         = __webpack_require__(28)
  , setToStringTag = __webpack_require__(35)
  , uid            = __webpack_require__(21)
  , wks            = __webpack_require__(10)
  , wksExt         = __webpack_require__(36)
  , wksDefine      = __webpack_require__(37)
  , keyOf          = __webpack_require__(83)
  , enumKeys       = __webpack_require__(84)
  , isArray        = __webpack_require__(85)
  , anObject       = __webpack_require__(14)
  , toIObject      = __webpack_require__(5)
  , toPrimitive    = __webpack_require__(24)
  , createDesc     = __webpack_require__(20)
  , _create        = __webpack_require__(34)
  , gOPNExt        = __webpack_require__(86)
  , $GOPD          = __webpack_require__(53)
  , $DP            = __webpack_require__(2)
  , $keys          = __webpack_require__(17)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(52).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(22).f  = $propertyIsEnumerable;
  __webpack_require__(30).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(32)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(21)('meta')
  , isObject = __webpack_require__(15)
  , has      = __webpack_require__(4)
  , setDesc  = __webpack_require__(2).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(16)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(17)
  , toIObject = __webpack_require__(5);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17)
  , gOPS    = __webpack_require__(30)
  , pIE     = __webpack_require__(22);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(48);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(5)
  , gOPN      = __webpack_require__(52).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {



/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37)('asyncIterator');

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37)('observable');

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(92);
module.exports = __webpack_require__(1).Object.setPrototypeOf;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(6);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(93).set});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(15)
  , anObject = __webpack_require__(14);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(43)(Function.call, __webpack_require__(53).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
var $Object = __webpack_require__(1).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(34)});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(38);
var invariant = __webpack_require__(39);
var warning = __webpack_require__(54);

var ReactPropTypesSecret = __webpack_require__(40);
var checkPropTypes = __webpack_require__(98);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(39);
  var warning = __webpack_require__(54);
  var ReactPropTypesSecret = __webpack_require__(40);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(38);
var invariant = __webpack_require__(39);
var ReactPropTypesSecret = __webpack_require__(40);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(42);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = __webpack_require__(31);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(11);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(19);

var _classnames2 = _interopRequireDefault(_classnames);

var _shipComponentsUtility = __webpack_require__(104);

var _shipComponentsIcon = __webpack_require__(57);

var _shipComponentsIcon2 = _interopRequireDefault(_shipComponentsIcon);

var _Dropdown = __webpack_require__(113);

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Controls = __webpack_require__(115);

var _Controls2 = _interopRequireDefault(_Controls);

var _TagContainer = __webpack_require__(121);

var _TagContainer2 = _interopRequireDefault(_TagContainer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Filterable Select Dropdown Component
 *
 *   options should be Array<Object> with object fields:
 *   key
 *   title
 *   body
 *   icon (optional node)
 *   optionGroup (optional string)
 *   className (optional string)
 */
var TagContainer = function (_React$Component) {
  (0, _inherits3.default)(TagContainer, _React$Component);

  function TagContainer(props) {
    (0, _classCallCheck3.default)(this, TagContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.state = {
      filterText: '',
      active: false,
      empty: _this.isEmpty.call(_this),
      dropdownPosTop: '53px'
    };

    _this.selectHighlightedItem = _this.selectHighlightedItem.bind(_this);
    _this.highlightPreviousItem = _this.highlightPreviousItem.bind(_this);
    _this.highlightNextItem = _this.highlightNextItem.bind(_this);
    _this.handleDropdownPosition = _this.handleDropdownPosition.bind(_this);
    _this.getVisibleOptions = _this.getVisibleOptions.bind(_this);
    _this.handleOpenDropdown = _this.handleOpenDropdown.bind(_this);
    _this.focusInput = _this.focusInput.bind(_this);
    _this.blurInput = _this.blurInput.bind(_this);
    _this.clearItem = _this.clearItem.bind(_this);
    _this.optionWasSelected = _this.optionWasSelected.bind(_this);
    _this.documentClickHandler = _this.documentClickHandler.bind(_this);
    _this.isEmpty = _this.isEmpty.bind(_this);
    _this.handleToggleDropdown = _this.handleToggleDropdown.bind(_this);
    _this.handleSelectItem = _this.handleSelectItem.bind(_this);
    _this.handleKeyboard = _this.handleKeyboard.bind(_this);
    _this.handleInput = _this.handleInput.bind(_this);
    _this.handleClearItem = _this.handleClearItem.bind(_this);
    _this._toggleSwitch = _this._toggleSwitch.bind(_this);
    return _this;
  }

  TagContainer.prototype.componentDidMount = function componentDidMount() {
    this.handleDropdownPosition();
    document.addEventListener('click', this.documentClickHandler);

    this._inputField = this.refs.selectControls.refs.filterInput;
  };

  TagContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({
      empty: this.isEmpty(nextProps)
    }, this.handleDropdownPosition);
  };

  TagContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler);
  };

  /**
   * Toggle the options dropdown
   * @param  {Event} event
   */

  TagContainer.prototype.handleToggleDropdown = function handleToggleDropdown(event) {
    event.preventDefault();
    if (!this.state.active) {
      this.handleOpenDropdown(event);
    } else {
      this.setState({ active: false });
    }
  };

  /**
   * Opens the options dropdown
   */

  TagContainer.prototype.handleOpenDropdown = function handleOpenDropdown(event) {
    var _this2 = this;

    if (this.state.active) {
      return;
    }

    this.setState({ active: true }, function () {
      // time out because of css transitions.
      setTimeout(_this2.handleDropdownPosition, _this2.props.transitionDelay);
      _this2.focusInput();
    });
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event);
    }
  };

  /**
   * On input, update state: filterText, highlighed item
   * @param  {Event}  event
   */

  TagContainer.prototype.handleInput = function handleInput(event) {
    var _this3 = this;

    var filterText = event.target.value;

    this.setState({
      filterText: filterText,
      active: true
    }, function () {
      _this3.handleDropdownPosition();

      if (typeof _this3.props.onFilter === 'function') {
        _this3.props.onFilter(filterText, event);
      }
    });
  };

  /**
   * Handler for user choosing an option from dropdown
   * @param  {Item}   option  the target option
   * @param  {Event}  event the click or keyboard event
   */

  TagContainer.prototype.handleSelectItem = function handleSelectItem(option, event) {
    event.preventDefault();
    event.stopPropagation();

    if (option === null) {
      return;
    }

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(_shipComponentsUtility.Utils.deepCopy(option));
    }

    this.optionWasSelected();
  };

  /**
   * Peripheral tasks to handleSelectItem
   */

  TagContainer.prototype.optionWasSelected = function optionWasSelected() {
    var _this4 = this;

    this.setState({
      filterText: this.props.multiple ? '' : this.state.filterText,
      empty: false,
      active: false,
      highlightedOption: null
    }, function () {
      _this4.handleDropdownPosition();

      if (_this4.props.multiple) {
        _this4.focusInput();
      }
    });
  };

  /**
   * Remove an item from the selection
   * @param  {Item}   item  the target item
   * @param  {Event}  event
   */

  TagContainer.prototype.handleClearItem = function handleClearItem(item, event) {
    event.preventDefault();
    event.stopPropagation();

    if (typeof this.props.onDeselect === 'function') {
      this.props.onDeselect(item, this.clearItem);
    } else {
      //note: this will not work properly as is. need to manually update state.selection
      this.clearItem();
    }
  };

  /**
   * Peripheral tasks to handleClearitem
   */

  TagContainer.prototype.clearItem = function clearItem() {
    var _this5 = this;

    this.setState({
      empty: this.props.selection.length === 0
    }, function () {
      _this5.handleDropdownPosition();

      if (_this5.props.multiple) {
        _this5.focusInput();
      }
    });
  };

  /**
   * Keyboard shortcuts (select item, close dropdown)
   */

  TagContainer.prototype.handleKeyboard = function handleKeyboard(event) {
    // eslint-disable-line complexity
    var code = event.keyCode || event.which;
    switch (code) {
      case 13:
        // enter
        if (!(this.state.highlightedOption && this.state.active) && typeof this.props.onEnterKey === 'function') {
          this.props.onEnterKey(event);
          break;
        }
      case 9:
        // tab
        event.preventDefault();
        this.selectHighlightedItem(event);
        break;
      case 38:
        // up
        event.preventDefault();
        if (this.state.active) {
          this.highlightPreviousItem();
        }
        break;
      case 40:
        // down
        if (!this.state.active) {
          this.setState({
            active: true
          });
        }
        this.highlightNextItem();
        break;
      case 27:
        // escape
        this.setState({ active: false }, this.blurInput);
        break;
    }
    event.stopPropagation();
  };

  /**
   * Determines the `top` css property for the dropdown
   */

  TagContainer.prototype.handleDropdownPosition = function handleDropdownPosition() {
    var selectBoxHeight = this.refs.selectBox.offsetHeight + 'px';

    // compare strings
    if (selectBoxHeight !== this.state.dropdownPosTop) {
      this.setState({ dropdownPosTop: selectBoxHeight });
    }
  };

  /**
   * Selects the currently highlighted item
   * @param  {Event} event
   */

  TagContainer.prototype.selectHighlightedItem = function selectHighlightedItem(event) {
    var highlightedItem = this.state.highlightedOption;

    if (highlightedItem !== null) {
      this.handleSelectItem(highlightedItem, event);
    }
  };

  /**
   * Highlights one item up in dropdown; meant to be triggered by user pressing `up arrow` key.
   */

  TagContainer.prototype.highlightPreviousItem = function highlightPreviousItem() {
    var highlightedOption = this.state.highlightedOption;

    if (!highlightedOption) {
      return;
    }

    var options = this.getVisibleOptions();
    var currentIndex = options.findIndex(function (option) {
      return option.key === highlightedOption.key;
    });

    if (currentIndex === 0) {
      return;
    }
    highlightedOption = options[currentIndex - 1];
    this.setState({
      highlightedOption: highlightedOption
    });
  };

  /**
   * Highlights one item down in dropdown; meant to be triggered by user pressing `down arrow` key.
   */

  TagContainer.prototype.highlightNextItem = function highlightNextItem() {
    var highlightedOption = this.state.highlightedOption;
    var options = this.getVisibleOptions();

    if (!highlightedOption) {
      highlightedOption = options[0];
    } else {
      var currentIndex = options.findIndex(function (option) {
        return option.key === highlightedOption.key;
      });

      if (currentIndex === options.length - 1) {
        return;
      }
      highlightedOption = options[currentIndex + 1];
    }
    this.setState({
      highlightedOption: highlightedOption
    });
  };

  /**
   * Focus cursor on filter input
   */

  TagContainer.prototype.focusInput = function focusInput() {
    this.refs.selectControls.focusInput();
  };

  TagContainer.prototype.blurInput = function blurInput() {
    this.refs.selectControls.blurInput();
  };

  TagContainer.prototype.getFilterResults = function getFilterResults(filterText) {
    var _props = this.props,
        options = _props.options,
        orderOptionsBy = _props.orderOptionsBy;

    var regex = new RegExp(filterText, 'i');

    return options.filter(function (option) {
      var orderOptionsByType = (0, _typeof3.default)(option[orderOptionsBy]);

      if (orderOptionsByType === 'string') {
        return regex.test(option[orderOptionsBy].toLowerCase());
      }

      if (orderOptionsByType === 'number') {
        return option[orderOptionsBy] === Number(filterText);
      }

      // In case searching through an object
      return option[orderOptionsBy].hasOwnProperty(filterText);
    });
  };

  /**
   * Determines what options to show in dropdown
   * @param  {string}       filterText
   * @return {Array<Option>}  options matching `filterText` and not already selected
   */

  TagContainer.prototype.getVisibleOptions = function getVisibleOptions(filterText) {
    var _this6 = this;

    filterText = typeof filterText === 'undefined' ? this.state.filterText : filterText;
    var options = this.props.options;

    // show filtered results
    if (filterText !== '') {
      options = this.getFilterResults(filterText);
    }

    // exclude selected options
    // TODO : its probably better (in single-select cases) to show the selected item in the dropdown with a checkmark, similar to standard <select />
    if (!this.isEmpty()) {
      if (this.props.selection instanceof Array) {
        if (this.props.selection.length > 0) {
          options = options.filter(function (item) {
            var selector = item.key ? 'key' : 'id';
            var index = _this6.props.selection.findIndex(function (selectedOption) {
              return selectedOption[selector] === item[selector];
            });
            return index < 0;
          });
        }
      } else {
        options = options.filter(function (item) {
          return item.key !== _this6.props.selection.key;
        });
      }
    }

    /**
     * Sort by:
     * 1 - "optionGroup"
     * 2 - "score" if possible
     * 3 - props.orderOptionsBy field
     */
    return options.sort(function (a, b) {
      // eslint-disable-line complexity
      if (a.optionGroup !== b.optionGroup) {
        return a.optionGroup > b.optionGroup ? 1 : -1;
      }
      if (a.score && b.score && a.score !== b.score) {
        // lower score = closer match (Fuse.js)
        return a.score > b.score ? 1 : -1;
      }
      if (typeof a[_this6.props.orderOptionsBy] === 'string') {
        return a[_this6.props.orderOptionsBy].replace(/\s\s+/g, ' ').toLowerCase() > b[_this6.props.orderOptionsBy].replace(/\s\s+/g, ' ').toLowerCase() ? 1 : -1;
      }
      return a[_this6.props.orderOptionsBy] > b[_this6.props.orderOptionsBy] ? 1 : -1;
    });
  };

  TagContainer.prototype.documentClickHandler = function documentClickHandler(event) {
    if (event.defaultPrevented) {
      return;
    }
    this.setState({
      active: false
    });
  };

  TagContainer.prototype.isEmpty = function isEmpty() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    if (props.selection instanceof Array) {
      return props.selection.length === 0;
    } else {
      return !props.selection;
    }
  };

  TagContainer.prototype._toggleSwitch = function _toggleSwitch() {
    return _react2.default.createElement('i', { className: (0, _classnames2.default)(_shipComponentsIcon2.default[this.props.toggleSwitchStyle], _TagContainer2.default.toggleBtn) });
  };

  TagContainer.prototype.render = function render() {
    var _classNames;

    var toggleSwitch = this._toggleSwitch();
    var options = this.getVisibleOptions();

    return _react2.default.createElement('div', {
      ref: 'selectBox',
      onClick: function onClick(event) {
        event.preventDefault();
        event.stopPropagation();
      },
      className: (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, _TagContainer2.default.active, this.state.active), (0, _defineProperty3.default)(_classNames, _TagContainer2.default.empty, this.state.empty), (0, _defineProperty3.default)(_classNames, _TagContainer2.default.darkTheme, this.props.darkTheme), _classNames), _TagContainer2.default.container, this.props.className)
    }, _react2.default.createElement(_Controls2.default, (0, _extends3.default)({}, this.props, {
      ref: 'selectControls',
      style: { top: this.state.dropdownPosTop },
      isActive: this.state.active,
      isEmpty: this.state.empty,
      filterText: this.state.filterText,
      toggleSwitch: toggleSwitch,
      onToggle: this.handleToggleDropdown,
      onChange: this.handleInput,
      onClear: this.handleClearItem,
      onKeyDown: this.handleKeyboard,
      onFocus: this.handleOpenDropdown
    })), _react2.default.createElement(_Dropdown2.default, (0, _extends3.default)({}, this.props, {
      filterText: this.state.filterText,
      open: this.state.active,
      highlightedOption: this.state.highlightedOption,
      options: options,
      onHighlight: this.handleHighlightOption,
      onKeyDown: this.handleKeyboard,
      onSelect: this.handleSelectItem
    })));
  };

  return TagContainer;
}(_react2.default.Component);

// default props


exports.default = TagContainer;
TagContainer.defaultProps = {
  className: '',
  transitionDelay: 250,

  onFilter: function onFilter() {},
  onFocus: function onFocus() {},
  onEnterKey: function onEnterKey() {},
  onNewItem: function onNewItem() {}
};

// prop types checking
TagContainer.propTypes = {
  multiple: _propTypes2.default.bool.isRequired,
  darkTheme: _propTypes2.default.bool.isRequired,

  className: _propTypes2.default.string,
  orderOptionsBy: _propTypes2.default.string.isRequired,
  placeholder: _propTypes2.default.string.isRequired,
  togglePosition: _propTypes2.default.string.isRequired,
  noOptionsMessage: _propTypes2.default.string.isRequired,
  toggleSwitchStyle: _propTypes2.default.string.isRequired,

  options: _propTypes2.default.array.isRequired,
  selection: _propTypes2.default.array.isRequired,
  optionGroupTitles: _propTypes2.default.array.isRequired,

  transitionDelay: _propTypes2.default.number,

  onFilter: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onSelect: _propTypes2.default.func.isRequired,
  onDeselect: _propTypes2.default.func.isRequired,
  onEnterKey: _propTypes2.default.func,
  onNewItem: _propTypes2.default.func
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', {defineProperty: __webpack_require__(2).f});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyEvents = exports.NativeFileUploadDialog = exports.ParseUrl = exports.Collections = exports.Sort = exports.Utils = exports.Strings = undefined;

var _strings = __webpack_require__(105);

var strings = _interopRequireWildcard(_strings);

var _utils = __webpack_require__(41);

var utils = _interopRequireWildcard(_utils);

var _sort = __webpack_require__(107);

var sort = _interopRequireWildcard(_sort);

var _collections = __webpack_require__(108);

var collections = _interopRequireWildcard(_collections);

var _parseUrl = __webpack_require__(109);

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _NativeFileUploadDialog = __webpack_require__(110);

var _NativeFileUploadDialog2 = _interopRequireDefault(_NativeFileUploadDialog);

var _KeyEvents = __webpack_require__(111);

var _KeyEvents2 = _interopRequireDefault(_KeyEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = strings; /**
                            * Exports
                            *
                            * @examples
                            *    import {capitalize, stringShortener} from "ship-components-utility";
                            */

var Strings = exports.Strings = strings;
var Utils = exports.Utils = utils;
var Sort = exports.Sort = sort;
var Collections = exports.Collections = collections;

var ParseUrl = exports.ParseUrl = _parseUrl2.default;
var NativeFileUploadDialog = exports.NativeFileUploadDialog = _NativeFileUploadDialog2.default;
var KeyEvents = exports.KeyEvents = _KeyEvents2.default;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hash = hash;
exports.slugify = slugify;
exports.capitalize = capitalize;
exports.titleCase = titleCase;
exports.camelCase = camelCase;
exports.toUnderscoreCase = toUnderscoreCase;
exports.generateRandomString = generateRandomString;
exports.stringShortener = stringShortener;
exports.convertHTMLToString = convertHTMLToString;
/**
 * Convert a string to a unique hash we can use as an key
 * http://stackoverflow.com/a/7616484
 * @param  {String} str
 * @return {Number}
 */
function hash(str) {
  var result = 0;
  if (str.length === 0) {
    return result;
  }
  for (var i = 0, len = str.length; i < len; i++) {
    var chr = str.charCodeAt(i);
    result = (result << 5) - result + chr;
    result |= 0; // Convert to 32bit integer
  }
  return result;
}

/**
 * Convert a string into something that is url and css friendly
 * @param     {String}    str
 * @return    {String}
 */
function slugify(str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.trim().toLowerCase().replace(/\s|\/|\\|\!|\'|\"|\&/g, '-').replace('--', '-');
}

/**
 * Capitalize string
 * If more than one word, the 1st word will be capilized
 * @param     {String}    str
 * @return    {String}
 */
function capitalize(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Title case string
 * @param     {String}    str
 * @return    {String}
 */
function titleCase(str) {
  return str.split(/\s/g).map(function (word) {
    return capitalize(word, true);
  }).join(' ');
}

/**
 * Convert to camelCase string
 * @param     {String}    str
 * @return    {String}
 */
function camelCase(str) {
  return str.charAt(0).toLowerCase() + titleCase(str).replace(/\s/g, '').substr(1);
}

/**
 * Convert camel case to underscore case
 * @param  {String} str
 * @return {String}
 */
function toUnderscoreCase(str) {
  if (!str) {
    return str;
  }
  return str.replace(/\.?([A-Z])/g, function (x, y) {
    // eslint-disable-line func-names
    return '_' + y.toLowerCase();
  }).replace(/^_/, '').toUpperCase();
}

/**
 * Generates a short random String
 * @param  {Number} len
 * @return {String}
 */
function generateRandomString(len) {
  len = len || 7;
  return (Math.random() * Math.pow(36, len)).toString(36).split('.')[0];
}

/**
 * Shorten string
 * @param     {String}    str
 * @param     {Number}    charCount [default==100]
 * @return    {String}
 */
function stringShortener(str) {
  var charCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  if (typeof str !== 'string' || str.length < charCount) {
    return str;
  }

  return str.slice(0, charCount) + ' ...';
}

/**
 * Removes HTML tags from string
 *
 * @param     {String}    str
 * @return    {String}
 */
function convertHTMLToString(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return str.replace(/<\/?[^>]+(>|$)/g, '');
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluck;

var _is = __webpack_require__(55);

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Extract only certian fields form an objectSize
 * @param    {Object}           src
 * @param    {Array<String>}    fields
 * @return   {Object}
 */
function pluck(src, fields) {
  if (is.not.obj(src)) {
    throw new Error('src is not an object');
  } else if (is.not.arr(fields)) {
    throw new Error('fields is not an array');
  }

  var result = {};
  fields.forEach(function (key) {
    if (key in src) {
      result[key] = src[key];
    }
  });
  return result;
}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareDates = compareDates;
exports.sortBy = sortBy;
exports.sortByDates = sortByDates;
/** ****************************************************************************
 * Sort
 *
 * @author       Isaac Suttell <isaac_suttell@playstation.sony.com>
 * @file         Sorting functions to be user on front and backend
 * @flow
 ******************************************************************************/

/**
 * Check to see if a string starts with a '-'
 * @type    {RegExp}
 */
var directionRegex = /^\-.*/;

/**
 * Compare two dates
 *
 * @param     {Date}    a
 * @param     {Date}    b
 * @return    {Number}
 */
function compareDates(a, b) {
  var aTest = a instanceof Date ? a : new Date(a);
  var bTest = b instanceof Date ? b : new Date(b);
  return aTest - bTest;
}

/**
 * Create a sorting function to sort an array of objects by prop. We accept any
 * number of arguments to sort by
 *
 * @param     {String...}    prop
 * @return    {Function}
 */
function sortBy() {
  var props = Array.prototype.slice.call(arguments);

  /**
   * Comparator
   *
   * @param     {Object}    a
   * @param     {Object}    b
   * @return    {Number}
   */
  // Disable the eslint warning on function complexity
  // TO DO: Improve the anonymus function performance
  // eslint-disable-next-line
  return function (a, b) {
    // Loop through each prop we want to sort by
    var index = -1;
    while (++index < props.length) {
      // Determine if we sort asc or desc
      var direction = directionRegex.test(props[index]) ? -1 : 1;

      // Trim the prop since the object key can't have spaces in it
      var prop = props[index].trim().replace(/^\-/, '');

      var keys = prop.split('.');

      // Sort by sub properties
      if (keys.length > 1) {
        for (var i = 0; i < keys.length - 1; i++) {
          a = a[keys[i]];
          b = b[keys[i]];
        }
      }
      prop = keys[keys.length - 1];

      if (a[prop] instanceof Date && b[prop instanceof Date]) {
        return compareDates(a[prop], b[prop]) * direction;
      } else if (a[prop] && b[prop] && a[prop] > b[prop]) {
        return 1 * direction;
      } else if (a[prop] && b[prop] && a[prop] < b[prop]) {
        return -1 * direction;
      } else if (a[prop] && !b[prop]) {
        return 1 * direction;
      } else if (!a[prop] && b[prop]) {
        return -1 * direction;
      }
      // If a[prop] matches b[prop] try the next prop
    }
    // Default matches
    return 0;
  };
}

/**
 * Create a sorting function to sort an array of objects by prop. We accept any
 * number of arguments to sort by
 *
 * @param     {String...}    prop
 * @return    {Function}
 */
function sortByDates() {
  var props = Array.prototype.slice.call(arguments);

  /**
   * Comparator
   *
   * @param     {Object}    a
   * @param     {Object}    b
   * @return    {Number}
   */
  return function (a, b) {
    // eslint-disable-line func-names
    // Loop through each prop we want to sort by
    var index = -1;
    while (++index < props.length) {
      // Determine if we sort asc or desc
      var direction = directionRegex.test(props[index]) ? -1 : 1;

      // Trim the prop since the object key can't have spaces in it
      var prop = props[index].trim().replace(/^\-/, '');

      return compareDates(a[prop], b[prop]) * direction;
    }
    // Default matches
    return 0;
  };
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIn = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _getIn = __webpack_require__(56);

Object.defineProperty(exports, 'getIn', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getIn).default;
  }
});
exports.keys = keys;
exports.toArray = toArray;
exports.each = each;
exports.size = size;
exports.searchFn = searchFn;
exports.any = any;
exports.find = find;
exports.findIndex = findIndex;
exports.hasIn = hasIn;
exports.isEqual = isEqual;

var _is = __webpack_require__(55);

var is = _interopRequireWildcard(_is);

var _getIn2 = __webpack_require__(56);

var _getIn3 = _interopRequireDefault(_getIn2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the Objects keys
 * @param  {Object} obj
 * @return {Array}  result
 */
function keys(obj) {
  var result = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts an Object to an Array
 * @param  {Object} val
 * @return {Array}  result
 */
function toArray(val) {
  if (is.not.obj(val)) {
    return val;
  }
  var objKeys = keys(val);
  return objKeys.map(function (keyName) {
    return val[keyName];
  });
}

/**
 * Iterate through each Object keys
 * And binds a callback to each keys
 * @param  {Object} val
 * @param  {func}   fn
 */
function each(val, fn) {
  if (is.obj(val)) {
    val = toArray(val);
  }
  if (is.not.arr(val)) {
    throw new TypeError('InvalidArgument: Not iterable');
  }
  for (var i, l = val.length; i < l; i++) {
    fn.call(val, val[i], i, val);
  }
}

/**
 * Returns the size of an object or array
 * @param  {Object || Array} val
 * @return {Number}
 */
function size(val) {
  if (is.obj(val)) {
    return keys(val).length;
  } else if (is.arr(val)) {
    return val.length;
  } else {
    return -1;
  }
}

/**
 * Returns the function if available inside an object
 * @param  {Object || Array || Func} val
 * @return {mixed}
 */
function searchFn(val) {
  if (is.func(val)) {
    return val;
  } else if (is.obj(val)) {
    return function (item) {
      // eslint-disable-line func-names
      if (is.not.obj(item)) {
        return false;
      }
      var found = 0;
      for (var key in val) {
        if (val.hasOwnProperty(key) && item[key] === val[key]) {
          found += 1;
        }
      }
      return size(val) === found;
    };
  } else {
    throw new TypeError('InvalidArgument: compare argument must be a function or object');
  }
}

/**
 * Similar to Javscript .some() function
 * @param  {Object || Array}  values
 * @param  {Func}             compare
 * @return {Bool}
 */
function any(values, compare) {
  // If not array or object, return
  if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object') {
    return false;
  }

  if (is.obj(values)) {
    values = toArray(values);
  }
  for (var i = 0, l = values.length; i < l; i++) {
    if (searchFn(compare).call(values, values[i], i, values) === true) {
      return true;
    }
  }
  return false;
}

/**
 * Similar to  Underscore _.find() function
 * @param  {Array}  arr
 * @param  {Func}   compare
 * @param  {Mixed}  ctx (default value) optional
 * @return {Mixed}
 */
function find(arr, compare, ctx) {
  if (is.not.arr(arr)) {
    return arr;
  }

  for (var i = 0, l = arr.length; i < l; i++) {
    if (searchFn(compare).call(ctx || arr, arr[i], i, arr) === true) {
      return arr[i];
    }
  }
  return void 0;
}

/**
 * Returns the index of an item in array if exisits, -1 otherwise
 * @param  {Array}  arr
 * @param  {Func}   compare
 * @param  {Mixed}  ctx (default value) optional
 * @return {Number} -1 if can't find it
 */
function findIndex(arr, compare, ctx) {
  if (is.not.arr(arr)) {
    return arr;
  }
  for (var i = 0, l = arr.length; i < l; i++) {
    if (searchFn(compare).call(ctx || arr, arr[i], i, arr) === true) {
      return i;
    }
  }
  return -1;
}

/**
 * Returns true if an object has the matched value,
 * otherwise false
 * @param  {Object}         obj
 * @param  {Array<String>}  path
 * @return {Mixed}
 */
function hasIn(obj, path) {
  return is.not.undef((0, _getIn3.default)(obj, path));
}

/**
 * First compres the size of two objects and then does a shallow
 * comparison of the two objects values
 * @param  {Mixed} one
 * @param  {Mixed} two
 * @return {Boolean}
 */
function isEqual(a, b) {
  if (a === b) {
    // Immutable
    return true;
  } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) {
    // Type mismatch
    return false;
  } else if (a instanceof Array && b instanceof Array && a.length !== b.length) {
    // Array length mismatch
    return false;
  } else if (a instanceof Array && b instanceof Array) {
    // Recurisively compare array values
    return a.every(function (val, i) {
      return isEqual(a[i], b[i]);
    });
  } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && Object.keys(a).length !== Object.keys(b).length) {
    // Key length mismatch
    return false;
  } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
    // Recurisively check object keys
    return Object.keys(a).every(function (key) {
      return isEqual(a[key], b[key]);
    });
  } else {
    // No matches
    return false;
  }
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urlPattern = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?');

/**
 * Breaks a URL into parts
 * @param {String} url
 */
function parseUrl(url) {
  var matches = url.match(urlPattern);
  if (matches) {
    return {
      protocol: matches[2],
      hostname: matches[4],
      path: matches[5],
      query: matches[7],
      fragment: matches[9]
    };
  } else {
    return void 0;
  }
}

module.exports = parseUrl;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(41),
    isIEBrowser = _require.isIEBrowser;

/**
 * File upload dialog
 * @constructor param {String} type
 */


var NativeFileUploadDialog = function () {
  function NativeFileUploadDialog(type) {
    _classCallCheck(this, NativeFileUploadDialog);

    this.type = type;
    this.input = document.createElement('input');
    if (this.type) {
      this.input.setAttribute('accept', this.type);
    }
    this.input.setAttribute('style', 'visibility: hidden; opacity: 0; position: absolute;');
    this.input.setAttribute('type', 'file');
    // Check to see if browser is an IE10 or IE11 or edge
    this.isIE10 = isIEBrowser('ie10');
    this.isIE11 = isIEBrowser('ie11');
    this.isEdge = isIEBrowser('edge');
    // onChange event listener
    // Based on browser type
    if (this.isIE10 && this.input.attachEvent) {
      // IE 10
      this.input.attachEvent('onchange', this.onChange.bind(this), false);
    } else {
      // Other browsers including IE11
      this.input.addEventListener('change', this.onChange.bind(this), false);
    }
  }

  /**
   * Allow access to the input elment for other props
   * @param {String} prop
   * @param {String} val
   */


  _createClass(NativeFileUploadDialog, [{
    key: 'setAttribute',
    value: function setAttribute(prop, val) {
      this.input.setAttribute(prop, val);
      return this;
    }

    /**
     * Alias function for types
     * @param  {String} type
     */

  }, {
    key: 'setType',
    value: function setType(type) {
      this.type = type;
      return this.setAttribute('type', type);
    }

    /**
     * Show the dialog
     */

  }, {
    key: 'open',
    value: function open() {
      if (this.type) {
        this.input.setAttribute('accept', this.type);
      }

      document.body.appendChild(this.input);
      this.input.click();

      return this;
    }
  }, {
    key: 'thenWith',
    value: function thenWith(callback) {
      this._callback = callback;

      // Callback needs to fire here when using IE10 or IE11
      // Reason: onChange event fires first
      // Gets the files (IF ANY), then
      // thenWith function fires
      if ((this.isIE10 || this.isIE11 || this.isEdge) && typeof this.files !== 'undefined') {
        this._callback(this.files);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.event = event;

      // Grab the uploaded files
      if (this.isIE10) {
        // IE10
        this.files = event.srcElement.files;
      } else {
        // Other browsers including IE11
        this.files = event.target.files;
      }

      // Callback fires when not using IE10 browser
      // callback is undefined for IE10 at this stage
      if (typeof this._callback === 'function') {
        this._callback(this.files);
      }

      this.input.parentNode.removeChild(this.input);
    }
  }]);

  return NativeFileUploadDialog;
}();

exports.default = NativeFileUploadDialog;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/**
 * List of key events
 * @param  {String} prop
 * @return {Number}
 */
var _require = __webpack_require__(41),
    isUndefined = _require.isUndefined;

function KeyEvents(prop) {
    // Browser detection
    var KeyEvent = !module ? window.KeyEvent : void 0;

    if (isUndefined(KeyEvent)) {
        KeyEvent = {
            DOM_VK_CANCEL: 3,
            DOM_VK_HELP: 6,
            DOM_VK_BACK_SPACE: 8,
            DOM_VK_TAB: 9,
            DOM_VK_CLEAR: 12,
            DOM_VK_RETURN: 13,
            DOM_VK_ENTER: 14,
            DOM_VK_SHIFT: 16,
            DOM_VK_CONTROL: 17,
            DOM_VK_ALT: 18,
            DOM_VK_PAUSE: 19,
            DOM_VK_CAPS_LOCK: 20,
            DOM_VK_ESCAPE: 27,
            DOM_VK_SPACE: 32,
            DOM_VK_PAGE_UP: 33,
            DOM_VK_PAGE_DOWN: 34,
            DOM_VK_END: 35,
            DOM_VK_HOME: 36,
            DOM_VK_LEFT: 37,
            DOM_VK_UP: 38,
            DOM_VK_RIGHT: 39,
            DOM_VK_DOWN: 40,
            DOM_VK_PRINTSCREEN: 44,
            DOM_VK_INSERT: 45,
            DOM_VK_DELETE: 46,
            DOM_VK_0: 48,
            DOM_VK_1: 49,
            DOM_VK_2: 50,
            DOM_VK_3: 51,
            DOM_VK_4: 52,
            DOM_VK_5: 53,
            DOM_VK_6: 54,
            DOM_VK_7: 55,
            DOM_VK_8: 56,
            DOM_VK_9: 57,
            DOM_VK_SEMICOLON: 59,
            DOM_VK_EQUALS: 61,
            DOM_VK_A: 65,
            DOM_VK_B: 66,
            DOM_VK_C: 67,
            DOM_VK_D: 68,
            DOM_VK_E: 69,
            DOM_VK_F: 70,
            DOM_VK_G: 71,
            DOM_VK_H: 72,
            DOM_VK_I: 73,
            DOM_VK_J: 74,
            DOM_VK_K: 75,
            DOM_VK_L: 76,
            DOM_VK_M: 77,
            DOM_VK_N: 78,
            DOM_VK_O: 79,
            DOM_VK_P: 80,
            DOM_VK_Q: 81,
            DOM_VK_R: 82,
            DOM_VK_S: 83,
            DOM_VK_T: 84,
            DOM_VK_U: 85,
            DOM_VK_V: 86,
            DOM_VK_W: 87,
            DOM_VK_X: 88,
            DOM_VK_Y: 89,
            DOM_VK_Z: 90,
            DOM_VK_CONTEXT_MENU: 93,
            DOM_VK_NUMPAD0: 96,
            DOM_VK_NUMPAD1: 97,
            DOM_VK_NUMPAD2: 98,
            DOM_VK_NUMPAD3: 99,
            DOM_VK_NUMPAD4: 100,
            DOM_VK_NUMPAD5: 101,
            DOM_VK_NUMPAD6: 102,
            DOM_VK_NUMPAD7: 103,
            DOM_VK_NUMPAD8: 104,
            DOM_VK_NUMPAD9: 105,
            DOM_VK_MULTIPLY: 106,
            DOM_VK_ADD: 107,
            DOM_VK_SEPARATOR: 108,
            DOM_VK_SUBTRACT: 109,
            DOM_VK_DECIMAL: 110,
            DOM_VK_DIVIDE: 111,
            DOM_VK_F1: 112,
            DOM_VK_F2: 113,
            DOM_VK_F3: 114,
            DOM_VK_F4: 115,
            DOM_VK_F5: 116,
            DOM_VK_F6: 117,
            DOM_VK_F7: 118,
            DOM_VK_F8: 119,
            DOM_VK_F9: 120,
            DOM_VK_F10: 121,
            DOM_VK_F11: 122,
            DOM_VK_F12: 123,
            DOM_VK_F13: 124,
            DOM_VK_F14: 125,
            DOM_VK_F15: 126,
            DOM_VK_F16: 127,
            DOM_VK_F17: 128,
            DOM_VK_F18: 129,
            DOM_VK_F19: 130,
            DOM_VK_F20: 131,
            DOM_VK_F21: 132,
            DOM_VK_F22: 133,
            DOM_VK_F23: 134,
            DOM_VK_F24: 135,
            DOM_VK_NUM_LOCK: 144,
            DOM_VK_SCROLL_LOCK: 145,
            DOM_VK_COMMA: 188,
            DOM_VK_PERIOD: 190,
            DOM_VK_SLASH: 191,
            DOM_VK_BACK_QUOTE: 192,
            DOM_VK_OPEN_BRACKET: 219,
            DOM_VK_BACK_SLASH: 220,
            DOM_VK_CLOSE_BRACKET: 221,
            DOM_VK_QUOTE: 222,
            DOM_VK_META: 224
        };
    }

    return prop ? KeyEvent[prop] : KeyEvent;
}

module.exports = KeyEvents;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(112)(module)))

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(11);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(19);

var _classnames2 = _interopRequireDefault(_classnames);

var _Dropdown = __webpack_require__(114);

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Dropdown = function (_Component) {
  (0, _inherits3.default)(Dropdown, _Component);

  function Dropdown(props) {
    (0, _classCallCheck3.default)(this, Dropdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      highlight: false
    };

    // this.handleHover = this.handleHover.bind(this);
    return _this;
  }

  Dropdown.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.filterText !== this.props.filterText) {
      this.handleHighlight.call(this, nextProps.options.length > 0 ? nextProps.options[0] : null);
      this.setScrollTop(0);
    }
  };

  /**
   * Render
   * @param  {string} msg  the message
   * @return {JSX}
   */

  Dropdown.prototype.renderNoOptionsMessage = function renderNoOptionsMessage() {
    var message = this.props.noOptionsMessage || 'No options matching "' + this.props.filterText + '"';

    if (this.props.loading) {
      message = 'Loading...';
    }

    if (this.props.filterText.length > 0) {
      return _react2.default.createElement('li', { className: _Dropdown2.default['no-results'] }, message);
    }
  };

  Dropdown.prototype.render = function render() {
    var _classNames,
        _this2 = this;

    var highlightedOption = this.props.highlightedOption;

    var currentOptionGroup = -1;
    var togglePositionClass = this.props.togglePosition === 'left' ? _Dropdown2.default['left-toggle'] : _Dropdown2.default['right-toggle'];

    return _react2.default.createElement('ul', {
      ref: 'optionContainer',
      className: (0, _classnames2.default)(_Dropdown2.default.dropdown, togglePositionClass, (_classNames = {}, (0, _defineProperty3.default)(_classNames, _Dropdown2.default.open, this.props.open), (0, _defineProperty3.default)(_classNames, _Dropdown2.default.darkTheme, this.props.darkTheme), _classNames)),
      style: this.props.style,
      onKeyDown: this.props.onKeyDown
    }, this.props.options.length > 0 ? this.props.options.map(function (option) {
      var elements = [];
      var isHighlighted = highlightedOption && highlightedOption.key === option.key;
      if (option.optionGroup && (currentOptionGroup < 0 || currentOptionGroup !== option.optionGroup)) {
        currentOptionGroup = option.optionGroup;
        elements.push(_react2.default.createElement('li', {
          key: currentOptionGroup,
          className: _Dropdown2.default['dropdown-option-group-title']
        }, _this2.props.optionGroupTitles[currentOptionGroup]));
      }

      var optionVariableClasses = (0, _defineProperty3.default)({}, _Dropdown2.default.highlight, isHighlighted);
      optionVariableClasses['ship-select--option-' + option.optionGroup] = !!option.optionGroup;
      elements.push(_react2.default.createElement('li', {
        key: option.key || option.id,
        ref: isHighlighted ? 'highlightedOption' : null
        // eslint-disable-next-line react/jsx-no-bind
        , className: (0, _classnames2.default)(_Dropdown2.default.option, option.className, optionVariableClasses, (0, _defineProperty3.default)({}, _Dropdown2.default.darkTheme, _this2.props.darkTheme))
      }, _react2.default.createElement('div', {
        // eslint-disable-next-line react/jsx-no-bind
        onClick: _this2.props.onSelect.bind(null, option),
        className: (0, _classnames2.default)(_Dropdown2.default['option-btn'], (0, _defineProperty3.default)({}, _Dropdown2.default.darkTheme, _this2.props.darkTheme))
      }, option.icon ? _react2.default.cloneElement(option.icon, { className: (0, _classnames2.default)(option.icon.props.className, _Dropdown2.default['option-icon']) }) : null, _react2.default.createElement('div', { className: _Dropdown2.default['option-text'] }, _react2.default.createElement('span', { className: _Dropdown2.default['option-title'] }, option.title), option.body ? _react2.default.createElement('span', { className: _Dropdown2.default['option-body'] }, option.body) : null))));
      return elements;
    }) : this.renderNoOptionsMessage.call(this));
  };

  return Dropdown;
}(_react.Component);

// default props


exports.default = Dropdown;
Dropdown.defaultProps = {
  open: false,
  loading: false,
  darkTheme: false,

  filterText: '',
  togglePosition: 'left',
  noOptionsMessage: '',

  style: {},
  highlightedOption: {},

  options: [],
  optionGroupTitles: []
};

// prop types checking
Dropdown.propTypes = {
  open: _propTypes2.default.bool,
  loading: _propTypes2.default.bool,
  darkTheme: _propTypes2.default.bool,

  filterText: _propTypes2.default.string,
  togglePosition: _propTypes2.default.string,
  noOptionsMessage: _propTypes2.default.string,

  style: _propTypes2.default.object,
  highlightedOption: _propTypes2.default.object,

  options: _propTypes2.default.array,
  optionGroupTitles: _propTypes2.default.array,

  onKeyDown: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func.isRequired
};

/***/ }),
/* 114 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"dropdown":"Dropdown--dropdown","darkTheme":"Dropdown--darkTheme","open":"Dropdown--open","no-results":"Dropdown--no-results","dropdown-option-group-title":"Dropdown--dropdown-option-group-title","option":"Dropdown--option","option-btn":"Dropdown--option-btn","highlight":"Dropdown--highlight","option-body":"Dropdown--option-body","option-icon":"Dropdown--option-icon","right-toggle":"Dropdown--right-toggle","left-toggle":"Dropdown--left-toggle","new-option":"Dropdown--new-option","add-new-tag":"Dropdown--add-new-tag","material-icons":"Dropdown--material-icons","option-title":"Dropdown--option-title"};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(11);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(19);

var _classnames2 = _interopRequireDefault(_classnames);

var _Tag = __webpack_require__(116);

var _Tag2 = _interopRequireDefault(_Tag);

var _Loader = __webpack_require__(118);

var _Loader2 = _interopRequireDefault(_Loader);

var _Controls = __webpack_require__(120);

var _Controls2 = _interopRequireDefault(_Controls);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var SelectControls = function (_React$Component) {
  (0, _inherits3.default)(SelectControls, _React$Component);

  function SelectControls(props) {
    (0, _classCallCheck3.default)(this, SelectControls);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.handleOpenDropdown = _this.handleOpenDropdown.bind(_this);
    return _this;
  }

  SelectControls.prototype.focusInput = function focusInput() {
    if (this.props.filterable) {
      this.refs.filterInput.focus();
    }
  };

  SelectControls.prototype.blurInput = function blurInput() {
    if (this.props.filterable) {
      this.refs.filterInput.blur();
    }
  };

  SelectControls.prototype.handleOpenDropdown = function handleOpenDropdown() {
    if (this.props.multiple) {
      this.focusInput.call(this);
    }

    this.props.onFocus();
  };

  SelectControls.prototype.filterHtml = function filterHtml() {
    return this.props.filterable ? _react2.default.createElement('input', {
      ref: 'filterInput',
      placeholder: this.props.placeholder,
      onKeyDown: this.props.onKeyDown,
      onChange: this.props.onChange,
      value: this.props.filterText,
      className: (0, _classnames2.default)(_Controls2.default.filter, { empty: this.props.isEmpty, hidden: !this.props.multiple && !this.props.isActive }),
      type: 'text'
    }) : null;
  };

  SelectControls.prototype.selectionDisplayHtml = function selectionDisplayHtml() {
    var _this2 = this;

    if (this.props.multiple) {
      return _react2.default.createElement('div', {
        key: 1,
        className: _Controls2.default['multi-selection-area'],
        onClick: this.handleOpenDropdown
      }, this.props.selection.map(function (item) {
        return _react2.default.createElement(_Tag2.default, {
          key: 'ship-select-tag--' + (item.key || item.id),
          icon: item.icon,
          title: item.title
          // eslint-disable-next-line react/jsx-no-bind
          , onClear: _this2.props.onClear.bind(_this2, item)
        });
      }), this.filterHtml.call(this));
    }

    return _react2.default.createElement('div', {
      key: 1,
      className: _Controls2.default['selection-area'],
      onClick: this.handleOpenDropdown
    }, _react2.default.createElement('span', {
      className: (0, _classnames2.default)(_Controls2.default.selection, {
        empty: this.props.isEmpty,
        hidden: this.props.filterable && this.props.isActive
      })
    }, this.props.selection ? this.props.selection.title : this.props.placeholder), this.filterHtml.call(this));
  };

  SelectControls.prototype.dropdownToggleHtml = function dropdownToggleHtml() {
    var _classNames;

    return _react2.default.createElement('div', {
      key: 0,
      className: _Controls2.default['toggle-container']
    }, this.props.toggleSwitch !== false ? _react2.default.createElement('button', {
      className: (0, _classnames2.default)(_Controls2.default['toggle-btn'], (_classNames = {}, (0, _defineProperty3.default)(_classNames, _Controls2.default.hidden, this.props.loading), (0, _defineProperty3.default)(_classNames, _Controls2.default.darkTheme, this.props.darkTheme), _classNames)),
      onClick: this.props.onToggle
    }, this.props.toggleSwitch) : null, _react2.default.createElement(_Loader2.default, {
      visible: this.props.loading,
      className: _Controls2.default.loader,
      spinnerClassName: _Controls2.default['loader-spinner']
    }));
  };

  SelectControls.prototype.render = function render() {
    var children = [];
    var selectionDisplay = this.selectionDisplayHtml.call(this);
    var toggleBtn = this.dropdownToggleHtml.call(this);

    if (this.props.togglePosition === 'right') {
      children[0] = selectionDisplay;
      children[1] = toggleBtn;
    } else {
      children[0] = toggleBtn;
      children[1] = selectionDisplay;
    }

    return _react2.default.createElement('div', { className: _Controls2.default.controls }, children);
  };

  return SelectControls;
}(_react2.default.Component);

// default props


exports.default = SelectControls;
SelectControls.defaultProps = {
  open: false,
  loading: false,
  isActive: false,
  isEmpty: false,
  multiple: false,
  filterable: false,

  filterText: '',

  toggleSwitch: [],
  togglePosition: [],
  selection: []
};

// prop types checking
SelectControls.propTypes = {
  open: _propTypes2.default.bool,
  loading: _propTypes2.default.bool,
  isActive: _propTypes2.default.bool,
  isEmpty: _propTypes2.default.bool,
  multiple: _propTypes2.default.bool,
  filterable: _propTypes2.default.bool,
  darkTheme: _propTypes2.default.bool.isRequired,

  filterText: _propTypes2.default.string,
  placeholder: _propTypes2.default.string.isRequired,

  toggleSwitch: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
  togglePosition: _propTypes2.default.oneOf(['right', 'left']),
  selection: _propTypes2.default.array,

  onFocus: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onKeyDown: _propTypes2.default.func.isRequired,
  onClear: _propTypes2.default.func.isRequired,
  onToggle: _propTypes2.default.func.isRequired
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(11);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(19);

var _classnames2 = _interopRequireDefault(_classnames);

var _shipComponentsIcon = __webpack_require__(57);

var _shipComponentsIcon2 = _interopRequireDefault(_shipComponentsIcon);

var _Tag = __webpack_require__(117);

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 *  Tag component based on the material "chip" component
 */
var Tag = function (_React$Component) {
  (0, _inherits3.default)(Tag, _React$Component);

  function Tag(props) {
    (0, _classCallCheck3.default)(this, Tag);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.handleClear = _this.handleClear.bind(_this);
    return _this;
  }

  Tag.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    return true;
  };

  Tag.prototype.handleClear = function handleClear(event) {
    if (this.props.onClear === 'function') {
      this.props.onClear(event);
    }
  };

  Tag.prototype.render = function render() {
    return _react2.default.createElement('div', { className: (0, _classnames2.default)(_Tag2.default.container, this.props.className) }, _react2.default.createElement('span', { className: _Tag2.default.title }, this.props.title), _react2.default.createElement('button', {
      className: _Tag2.default['clear-btn'],
      onClick: this.props.onClear
    }, _react2.default.createElement('i', { className: (0, _classnames2.default)(_Tag2.default['cancel-icon'], _shipComponentsIcon2.default.cancel) })));
  };

  return Tag;
}(_react2.default.Component);

// default props


exports.default = Tag;
Tag.defaultProps = {
  className: '',
  title: ''
};

// prop types checking
Tag.propTypes = {
  className: _propTypes2.default.string,
  title: _propTypes2.default.string,

  onClear: _propTypes2.default.func.isRequired
};

/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"Tag--container","title":"Tag--title","clear-btn":"Tag--clear-btn","cancel-icon":"Tag--cancel-icon"};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(11);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(19);

var _classnames2 = _interopRequireDefault(_classnames);

var _Loader = __webpack_require__(119);

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Loader = function (_React$Component) {
  (0, _inherits3.default)(Loader, _React$Component);

  function Loader() {
    (0, _classCallCheck3.default)(this, Loader);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  Loader.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.visible !== nextProps.visible || this.props.absolute !== nextProps.absolute || this.props.className !== nextProps.className;
  };

  Loader.prototype.render = function render() {
    var _classNames;

    if (!this.props.visible) {
      return null;
    }
    return _react2.default.createElement('div', { className: (0, _classnames2.default)(_Loader2.default.container, this.props.className, (_classNames = {}, (0, _defineProperty3.default)(_classNames, _Loader2.default.absolute, this.props.absolute), (0, _defineProperty3.default)(_classNames, _Loader2.default.visible, this.props.visible), _classNames))
    }, _react2.default.createElement('svg', {
      className: (0, _classnames2.default)(_Loader2.default.spinner, this.props.spinnerClassName),
      viewBox: '0 0 66 66',
      xmlns: 'http://www.w3.org/2000/svg'
    }, _react2.default.createElement('circle', {
      className: _Loader2.default['spinner-path'],
      fill: 'none',
      cx: '33',
      cy: '33',
      r: '30'
    })));
  };

  return Loader;
}(_react2.default.Component);

// default props


exports.default = Loader;
Loader.defaultProps = {
  absolute: false,
  visible: true,

  className: '',
  spinnerClassName: ''
};

// prop types checking
Loader.propTypes = {
  absolute: _propTypes2.default.bool,
  visible: _propTypes2.default.bool,

  className: _propTypes2.default.string,
  spinnerClassName: _propTypes2.default.string
};

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"Loader--container","visible":"Loader--visible","absolute":"Loader--absolute","spinner":"Loader--spinner","rotator":"Loader--rotator","spinner-path":"Loader--spinner-path","dash":"Loader--dash","colors":"Loader--colors"};

/***/ }),
/* 120 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"filter":"Controls--filter","empty":"Controls--empty","hidden":"Controls--hidden","controls":"Controls--controls","loader":"Controls--loader","loader-spinner":"Controls--loader-spinner","selection-area":"Controls--selection-area","multi-selection-area":"Controls--multi-selection-area","toggle-container":"Controls--toggle-container","toggle-btn":"Controls--toggle-btn","darkTheme":"Controls--darkTheme","selection":"Controls--selection"};

/***/ }),
/* 121 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"TagContainer--container","darkTheme":"TagContainer--darkTheme","open":"TagContainer--open","active":"TagContainer--active","empty":"TagContainer--empty","toggleBtn":"TagContainer--toggleBtn"};

/***/ })
/******/ ]);
//# sourceMappingURL=TagInput.js.map