/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.querySelector('head').childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = __bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var _ref;
      if ((value > (_ref = this.value) && _ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return "" + this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
if(function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){function c(a){var b=a.length,c=_.type(a);return"function"===c||_.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}function d(a,b,c){if(_.isFunction(b))return _.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return _.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(hb.test(b))return _.filter(b,a,c);b=_.filter(b,a)}return _.grep(a,function(a){return U.call(b,a)>=0!==c})}function e(a,b){for(;(a=a[b])&&1!==a.nodeType;);return a}function f(a){var b=ob[a]={};return _.each(a.match(nb)||[],function(a,c){b[c]=!0}),b}function g(){Z.removeEventListener("DOMContentLoaded",g,!1),a.removeEventListener("load",g,!1),_.ready()}function h(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=_.expando+Math.random()}function i(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(ub,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:tb.test(c)?_.parseJSON(c):c}catch(e){}sb.set(a,b,c)}else c=void 0;return c}function j(){return!0}function k(){return!1}function l(){try{return Z.activeElement}catch(a){}}function m(a,b){return _.nodeName(a,"table")&&_.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function n(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function o(a){var b=Kb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function p(a,b){for(var c=0,d=a.length;d>c;c++)rb.set(a[c],"globalEval",!b||rb.get(b[c],"globalEval"))}function q(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(rb.hasData(a)&&(f=rb.access(a),g=rb.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)_.event.add(b,e,j[e][c])}sb.hasData(a)&&(h=sb.access(a),i=_.extend({},h),sb.set(b,i))}}function r(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&_.nodeName(a,b)?_.merge([a],c):c}function s(a,b){var c=b.nodeName.toLowerCase();"input"===c&&yb.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}function t(b,c){var d,e=_(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:_.css(e[0],"display");return e.detach(),f}function u(a){var b=Z,c=Ob[a];return c||(c=t(a,b),"none"!==c&&c||(Nb=(Nb||_("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=Nb[0].contentDocument,b.write(),b.close(),c=t(a,b),Nb.detach()),Ob[a]=c),c}function v(a,b,c){var d,e,f,g,h=a.style;return c=c||Rb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||_.contains(a.ownerDocument,a)||(g=_.style(a,b)),Qb.test(g)&&Pb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function w(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}function x(a,b){if(b in a)return b;for(var c=b[0].toUpperCase()+b.slice(1),d=b,e=Xb.length;e--;)if(b=Xb[e]+c,b in a)return b;return d}function y(a,b,c){var d=Tb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function z(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=_.css(a,c+wb[f],!0,e)),d?("content"===c&&(g-=_.css(a,"padding"+wb[f],!0,e)),"margin"!==c&&(g-=_.css(a,"border"+wb[f]+"Width",!0,e))):(g+=_.css(a,"padding"+wb[f],!0,e),"padding"!==c&&(g+=_.css(a,"border"+wb[f]+"Width",!0,e)));return g}function A(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Rb(a),g="border-box"===_.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=v(a,b,f),(0>e||null==e)&&(e=a.style[b]),Qb.test(e))return e;d=g&&(Y.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+z(a,b,c||(g?"border":"content"),d,f)+"px"}function B(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=rb.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&xb(d)&&(f[g]=rb.access(d,"olddisplay",u(d.nodeName)))):(e=xb(d),"none"===c&&e||rb.set(d,"olddisplay",e?c:_.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function C(a,b,c,d,e){return new C.prototype.init(a,b,c,d,e)}function D(){return setTimeout(function(){Yb=void 0}),Yb=_.now()}function E(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=wb[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function F(a,b,c){for(var d,e=(cc[b]||[]).concat(cc["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function G(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},n=a.style,o=a.nodeType&&xb(a),p=rb.get(a,"fxshow");c.queue||(h=_._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,_.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[n.overflow,n.overflowX,n.overflowY],j=_.css(a,"display"),k="none"===j?rb.get(a,"olddisplay")||u(a.nodeName):j,"inline"===k&&"none"===_.css(a,"float")&&(n.display="inline-block")),c.overflow&&(n.overflow="hidden",l.always(function(){n.overflow=c.overflow[0],n.overflowX=c.overflow[1],n.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],$b.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(o?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;o=!0}m[d]=p&&p[d]||_.style(a,d)}else j=void 0;if(_.isEmptyObject(m))"inline"===("none"===j?u(a.nodeName):j)&&(n.display=j);else{p?"hidden"in p&&(o=p.hidden):p=rb.access(a,"fxshow",{}),f&&(p.hidden=!o),o?_(a).show():l.done(function(){_(a).hide()}),l.done(function(){var b;rb.remove(a,"fxshow");for(b in m)_.style(a,b,m[b])});for(d in m)g=F(o?p[d]:0,d,l),d in p||(p[d]=g.start,o&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function H(a,b){var c,d,e,f,g;for(c in a)if(d=_.camelCase(c),e=b[d],f=a[c],_.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=_.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function I(a,b,c){var d,e,f=0,g=bc.length,h=_.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Yb||D(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:_.extend({},b),opts:_.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Yb||D(),duration:c.duration,tweens:[],createTween:function(b,c){var d=_.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(H(k,j.opts.specialEasing);g>f;f++)if(d=bc[f].call(j,a,k,j.opts))return d;return _.map(k,F,j),_.isFunction(j.opts.start)&&j.opts.start.call(a,j),_.fx.timer(_.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function J(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(nb)||[];if(_.isFunction(c))for(;d=f[e++];)"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function K(a,b,c,d){function e(h){var i;return f[h]=!0,_.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||g||f[j]?g?!(i=j):void 0:(b.dataTypes.unshift(j),e(j),!1)}),i}var f={},g=a===vc;return e(b.dataTypes[0])||!f["*"]&&e("*")}function L(a,b){var c,d,e=_.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&_.extend(!0,a,d),a}function M(a,b,c){for(var d,e,f,g,h=a.contents,i=a.dataTypes;"*"===i[0];)i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function N(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];for(f=k.shift();f;)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}function O(a,b,c,d){var e;if(_.isArray(b))_.each(b,function(b,e){c||zc.test(a)?d(a,e):O(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==_.type(b))d(a,b);else for(e in b)O(a+"["+e+"]",b[e],c,d)}function P(a){return _.isWindow(a)?a:9===a.nodeType&&a.defaultView}var Q=[],R=Q.slice,S=Q.concat,T=Q.push,U=Q.indexOf,V={},W=V.toString,X=V.hasOwnProperty,Y={},Z=a.document,$="2.1.1",_=function(a,b){return new _.fn.init(a,b)},ab=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,bb=/^-ms-/,cb=/-([\da-z])/gi,db=function(a,b){return b.toUpperCase()};_.fn=_.prototype={jquery:$,constructor:_,selector:"",length:0,toArray:function(){return R.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:R.call(this)},pushStack:function(a){var b=_.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return _.each(this,a,b)},map:function(a){return this.pushStack(_.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(R.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:T,sort:Q.sort,splice:Q.splice},_.extend=_.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||_.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(_.isPlainObject(d)||(e=_.isArray(d)))?(e?(e=!1,f=c&&_.isArray(c)?c:[]):f=c&&_.isPlainObject(c)?c:{},g[b]=_.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},_.extend({expando:"jQuery"+($+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===_.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!_.isArray(a)&&a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==_.type(a)||a.nodeType||_.isWindow(a)?!1:a.constructor&&!X.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?V[W.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=_.trim(a),a&&(1===a.indexOf("use strict")?(b=Z.createElement("script"),b.text=a,Z.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(bb,"ms-").replace(cb,db)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,d){var e,f=0,g=a.length,h=c(a);if(d){if(h)for(;g>f&&(e=b.apply(a[f],d),e!==!1);f++);else for(f in a)if(e=b.apply(a[f],d),e===!1)break}else if(h)for(;g>f&&(e=b.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(e=b.call(a[f],f,a[f]),e===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(ab,"")},makeArray:function(a,b){var d=b||[];return null!=a&&(c(Object(a))?_.merge(d,"string"==typeof a?[a]:a):T.call(d,a)),d},inArray:function(a,b,c){return null==b?-1:U.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,d){var e,f=0,g=a.length,h=c(a),i=[];if(h)for(;g>f;f++)e=b(a[f],f,d),null!=e&&i.push(e);else for(f in a)e=b(a[f],f,d),null!=e&&i.push(e);return S.apply([],i)},guid:1,proxy:function(a,b){var c,d,e;return"string"==typeof b&&(c=a[b],b=a,a=c),_.isFunction(a)?(d=R.call(arguments,2),e=function(){return a.apply(b||this,d.concat(R.call(arguments)))},e.guid=a.guid=a.guid||_.guid++,e):void 0},now:Date.now,support:Y}),_.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){V["[object "+b+"]"]=b.toLowerCase()});var eb=function(a){function b(a,b,c,d){var e,f,g,h,i,j,l,n,o,p;if((b?b.ownerDocument||b:O)!==G&&F(b),b=b||G,c=c||[],!a||"string"!=typeof a)return c;if(1!==(h=b.nodeType)&&9!==h)return[];if(I&&!d){if(e=sb.exec(a))if(g=e[1]){if(9===h){if(f=b.getElementById(g),!f||!f.parentNode)return c;if(f.id===g)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(g))&&M(b,f)&&f.id===g)return c.push(f),c}else{if(e[2])return _.apply(c,b.getElementsByTagName(a)),c;if((g=e[3])&&v.getElementsByClassName&&b.getElementsByClassName)return _.apply(c,b.getElementsByClassName(g)),c}if(v.qsa&&(!J||!J.test(a))){if(n=l=N,o=b,p=9===h&&a,1===h&&"object"!==b.nodeName.toLowerCase()){for(j=z(a),(l=b.getAttribute("id"))?n=l.replace(ub,"\\$&"):b.setAttribute("id",n),n="[id='"+n+"'] ",i=j.length;i--;)j[i]=n+m(j[i]);o=tb.test(a)&&k(b.parentNode)||b,p=j.join(",")}if(p)try{return _.apply(c,o.querySelectorAll(p)),c}catch(q){}finally{l||b.removeAttribute("id")}}}return B(a.replace(ib,"$1"),b,c,d)}function c(){function a(c,d){return b.push(c+" ")>w.cacheLength&&delete a[b.shift()],a[c+" "]=d}var b=[];return a}function d(a){return a[N]=!0,a}function e(a){var b=G.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function f(a,b){for(var c=a.split("|"),d=a.length;d--;)w.attrHandle[c[d]]=b}function g(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||W)-(~a.sourceIndex||W);if(d)return d;if(c)for(;c=c.nextSibling;)if(c===b)return-1;return a?1:-1}function h(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function i(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function j(a){return d(function(b){return b=+b,d(function(c,d){for(var e,f=a([],c.length,b),g=f.length;g--;)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function k(a){return a&&typeof a.getElementsByTagName!==V&&a}function l(){}function m(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function n(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=Q++;return b.first?function(b,c,f){for(;b=b[d];)if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[P,f];if(g){for(;b=b[d];)if((1===b.nodeType||e)&&a(b,c,g))return!0}else for(;b=b[d];)if(1===b.nodeType||e){if(i=b[N]||(b[N]={}),(h=i[d])&&h[0]===P&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function o(a){return a.length>1?function(b,c,d){for(var e=a.length;e--;)if(!a[e](b,c,d))return!1;return!0}:a[0]}function p(a,c,d){for(var e=0,f=c.length;f>e;e++)b(a,c[e],d);return d}function q(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function r(a,b,c,e,f,g){return e&&!e[N]&&(e=r(e)),f&&!f[N]&&(f=r(f,g)),d(function(d,g,h,i){var j,k,l,m=[],n=[],o=g.length,r=d||p(b||"*",h.nodeType?[h]:h,[]),s=!a||!d&&b?r:q(r,m,a,h,i),t=c?f||(d?a:o||e)?[]:g:s;if(c&&c(s,t,h,i),e)for(j=q(t,n),e(j,[],h,i),k=j.length;k--;)(l=j[k])&&(t[n[k]]=!(s[n[k]]=l));if(d){if(f||a){if(f){for(j=[],k=t.length;k--;)(l=t[k])&&j.push(s[k]=l);f(null,t=[],j,i)}for(k=t.length;k--;)(l=t[k])&&(j=f?bb.call(d,l):m[k])>-1&&(d[j]=!(g[j]=l))}}else t=q(t===g?t.splice(o,t.length):t),f?f(null,g,t,i):_.apply(g,t)})}function s(a){for(var b,c,d,e=a.length,f=w.relative[a[0].type],g=f||w.relative[" "],h=f?1:0,i=n(function(a){return a===b},g,!0),j=n(function(a){return bb.call(b,a)>-1},g,!0),k=[function(a,c,d){return!f&&(d||c!==C)||((b=c).nodeType?i(a,c,d):j(a,c,d))}];e>h;h++)if(c=w.relative[a[h].type])k=[n(o(k),c)];else{if(c=w.filter[a[h].type].apply(null,a[h].matches),c[N]){for(d=++h;e>d&&!w.relative[a[d].type];d++);return r(h>1&&o(k),h>1&&m(a.slice(0,h-1).concat({value:" "===a[h-2].type?"*":""})).replace(ib,"$1"),c,d>h&&s(a.slice(h,d)),e>d&&s(a=a.slice(d)),e>d&&m(a))}k.push(c)}return o(k)}function t(a,c){var e=c.length>0,f=a.length>0,g=function(d,g,h,i,j){var k,l,m,n=0,o="0",p=d&&[],r=[],s=C,t=d||f&&w.find.TAG("*",j),u=P+=null==s?1:Math.random()||.1,v=t.length;for(j&&(C=g!==G&&g);o!==v&&null!=(k=t[o]);o++){if(f&&k){for(l=0;m=a[l++];)if(m(k,g,h)){i.push(k);break}j&&(P=u)}e&&((k=!m&&k)&&n--,d&&p.push(k))}if(n+=o,e&&o!==n){for(l=0;m=c[l++];)m(p,r,g,h);if(d){if(n>0)for(;o--;)p[o]||r[o]||(r[o]=Z.call(i));r=q(r)}_.apply(i,r),j&&!d&&r.length>0&&n+c.length>1&&b.uniqueSort(i)}return j&&(P=u,C=s),p};return e?d(g):g}var u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N="sizzle"+-new Date,O=a.document,P=0,Q=0,R=c(),S=c(),T=c(),U=function(a,b){return a===b&&(E=!0),0},V="undefined",W=1<<31,X={}.hasOwnProperty,Y=[],Z=Y.pop,$=Y.push,_=Y.push,ab=Y.slice,bb=Y.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},cb="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",db="[\\x20\\t\\r\\n\\f]",eb="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",fb=eb.replace("w","w#"),gb="\\["+db+"*("+eb+")(?:"+db+"*([*^$|!~]?=)"+db+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+fb+"))|)"+db+"*\\]",hb=":("+eb+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+gb+")*)|.*)\\)|)",ib=new RegExp("^"+db+"+|((?:^|[^\\\\])(?:\\\\.)*)"+db+"+$","g"),jb=new RegExp("^"+db+"*,"+db+"*"),kb=new RegExp("^"+db+"*([>+~]|"+db+")"+db+"*"),lb=new RegExp("="+db+"*([^\\]'\"]*?)"+db+"*\\]","g"),mb=new RegExp(hb),nb=new RegExp("^"+fb+"$"),ob={ID:new RegExp("^#("+eb+")"),CLASS:new RegExp("^\\.("+eb+")"),TAG:new RegExp("^("+eb.replace("w","w*")+")"),ATTR:new RegExp("^"+gb),PSEUDO:new RegExp("^"+hb),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+db+"*(even|odd|(([+-]|)(\\d*)n|)"+db+"*(?:([+-]|)"+db+"*(\\d+)|))"+db+"*\\)|)","i"),bool:new RegExp("^(?:"+cb+")$","i"),needsContext:new RegExp("^"+db+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+db+"*((?:-\\d)?\\d*)"+db+"*\\)|)(?=[^-]|$)","i")},pb=/^(?:input|select|textarea|button)$/i,qb=/^h\d$/i,rb=/^[^{]+\{\s*\[native \w/,sb=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,tb=/[+~]/,ub=/'|\\/g,vb=new RegExp("\\\\([\\da-f]{1,6}"+db+"?|("+db+")|.)","ig"),wb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{_.apply(Y=ab.call(O.childNodes),O.childNodes),Y[O.childNodes.length].nodeType}catch(xb){_={apply:Y.length?function(a,b){$.apply(a,ab.call(b))}:function(a,b){for(var c=a.length,d=0;a[c++]=b[d++];);a.length=c-1}}}v=b.support={},y=b.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},F=b.setDocument=function(a){var b,c=a?a.ownerDocument||a:O,d=c.defaultView;return c!==G&&9===c.nodeType&&c.documentElement?(G=c,H=c.documentElement,I=!y(c),d&&d!==d.top&&(d.addEventListener?d.addEventListener("unload",function(){F()},!1):d.attachEvent&&d.attachEvent("onunload",function(){F()})),v.attributes=e(function(a){return a.className="i",!a.getAttribute("className")}),v.getElementsByTagName=e(function(a){return a.appendChild(c.createComment("")),!a.getElementsByTagName("*").length}),v.getElementsByClassName=rb.test(c.getElementsByClassName)&&e(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),v.getById=e(function(a){return H.appendChild(a).id=N,!c.getElementsByName||!c.getElementsByName(N).length}),v.getById?(w.find.ID=function(a,b){if(typeof b.getElementById!==V&&I){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},w.filter.ID=function(a){var b=a.replace(vb,wb);return function(a){return a.getAttribute("id")===b}}):(delete w.find.ID,w.filter.ID=function(a){var b=a.replace(vb,wb);return function(a){var c=typeof a.getAttributeNode!==V&&a.getAttributeNode("id");return c&&c.value===b}}),w.find.TAG=v.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==V?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){for(;c=f[e++];)1===c.nodeType&&d.push(c);return d}return f},w.find.CLASS=v.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==V&&I?b.getElementsByClassName(a):void 0},K=[],J=[],(v.qsa=rb.test(c.querySelectorAll))&&(e(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&J.push("[*^$]="+db+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||J.push("\\["+db+"*(?:value|"+cb+")"),a.querySelectorAll(":checked").length||J.push(":checked")}),e(function(a){var b=c.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&J.push("name"+db+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||J.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),J.push(",.*:")})),(v.matchesSelector=rb.test(L=H.matches||H.webkitMatchesSelector||H.mozMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&e(function(a){v.disconnectedMatch=L.call(a,"div"),L.call(a,"[s!='']:x"),K.push("!=",hb)}),J=J.length&&new RegExp(J.join("|")),K=K.length&&new RegExp(K.join("|")),b=rb.test(H.compareDocumentPosition),M=b||rb.test(H.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)for(;b=b.parentNode;)if(b===a)return!0;return!1},U=b?function(a,b){if(a===b)return E=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!v.sortDetached&&b.compareDocumentPosition(a)===d?a===c||a.ownerDocument===O&&M(O,a)?-1:b===c||b.ownerDocument===O&&M(O,b)?1:D?bb.call(D,a)-bb.call(D,b):0:4&d?-1:1)}:function(a,b){if(a===b)return E=!0,0;var d,e=0,f=a.parentNode,h=b.parentNode,i=[a],j=[b];if(!f||!h)return a===c?-1:b===c?1:f?-1:h?1:D?bb.call(D,a)-bb.call(D,b):0;if(f===h)return g(a,b);for(d=a;d=d.parentNode;)i.unshift(d);for(d=b;d=d.parentNode;)j.unshift(d);for(;i[e]===j[e];)e++;return e?g(i[e],j[e]):i[e]===O?-1:j[e]===O?1:0},c):G},b.matches=function(a,c){return b(a,null,null,c)},b.matchesSelector=function(a,c){if((a.ownerDocument||a)!==G&&F(a),c=c.replace(lb,"='$1']"),!(!v.matchesSelector||!I||K&&K.test(c)||J&&J.test(c)))try{var d=L.call(a,c);if(d||v.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return b(c,G,null,[a]).length>0},b.contains=function(a,b){return(a.ownerDocument||a)!==G&&F(a),M(a,b)},b.attr=function(a,b){(a.ownerDocument||a)!==G&&F(a);var c=w.attrHandle[b.toLowerCase()],d=c&&X.call(w.attrHandle,b.toLowerCase())?c(a,b,!I):void 0;return void 0!==d?d:v.attributes||!I?a.getAttribute(b):(d=a.getAttributeNode(b))&&d.specified?d.value:null},b.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},b.uniqueSort=function(a){var b,c=[],d=0,e=0;if(E=!v.detectDuplicates,D=!v.sortStable&&a.slice(0),a.sort(U),E){for(;b=a[e++];)b===a[e]&&(d=c.push(e));for(;d--;)a.splice(c[d],1)}return D=null,a},x=b.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(1===e||9===e||11===e){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=x(a)}else if(3===e||4===e)return a.nodeValue}else for(;b=a[d++];)c+=x(b);return c},w=b.selectors={cacheLength:50,createPseudo:d,match:ob,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(vb,wb),a[3]=(a[3]||a[4]||a[5]||"").replace(vb,wb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||b.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&b.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return ob.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&mb.test(c)&&(b=z(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(vb,wb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=R[a+" "];return b||(b=new RegExp("(^|"+db+")"+a+"("+db+"|$)"))&&R(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==V&&a.getAttribute("class")||"")})},ATTR:function(a,c,d){return function(e){var f=b.attr(e,a);return null==f?"!="===c:c?(f+="","="===c?f===d:"!="===c?f!==d:"^="===c?d&&0===f.indexOf(d):"*="===c?d&&f.indexOf(d)>-1:"$="===c?d&&f.slice(-d.length)===d:"~="===c?(" "+f+" ").indexOf(d)>-1:"|="===c?f===d||f.slice(0,d.length+1)===d+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){for(;p;){for(l=b;l=l[p];)if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){for(k=q[N]||(q[N]={}),j=k[a]||[],n=j[0]===P&&j[1],m=j[0]===P&&j[2],l=n&&q.childNodes[n];l=++n&&l&&l[p]||(m=n=0)||o.pop();)if(1===l.nodeType&&++m&&l===b){k[a]=[P,n,m];break}}else if(s&&(j=(b[N]||(b[N]={}))[a])&&j[0]===P)m=j[1];else for(;(l=++n&&l&&l[p]||(m=n=0)||o.pop())&&((h?l.nodeName.toLowerCase()!==r:1!==l.nodeType)||!++m||(s&&((l[N]||(l[N]={}))[a]=[P,m]),l!==b)););return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,c){var e,f=w.pseudos[a]||w.setFilters[a.toLowerCase()]||b.error("unsupported pseudo: "+a);return f[N]?f(c):f.length>1?(e=[a,a,"",c],w.setFilters.hasOwnProperty(a.toLowerCase())?d(function(a,b){for(var d,e=f(a,c),g=e.length;g--;)d=bb.call(a,e[g]),a[d]=!(b[d]=e[g])}):function(a){return f(a,0,e)}):f}},pseudos:{not:d(function(a){var b=[],c=[],e=A(a.replace(ib,"$1"));return e[N]?d(function(a,b,c,d){for(var f,g=e(a,null,d,[]),h=a.length;h--;)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,d,f){return b[0]=a,e(b,null,f,c),!c.pop()}}),has:d(function(a){return function(c){return b(a,c).length>0}}),contains:d(function(a){return function(b){return(b.textContent||b.innerText||x(b)).indexOf(a)>-1}}),lang:d(function(a){return nb.test(a||"")||b.error("unsupported lang: "+a),a=a.replace(vb,wb).toLowerCase(),function(b){var c;do if(c=I?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===H},focus:function(a){return a===G.activeElement&&(!G.hasFocus||G.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!w.pseudos.empty(a)},header:function(a){return qb.test(a.nodeName)},input:function(a){return pb.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:j(function(){return[0]}),last:j(function(a,b){return[b-1]}),eq:j(function(a,b,c){return[0>c?c+b:c]}),even:j(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:j(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:j(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:j(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},w.pseudos.nth=w.pseudos.eq;for(u in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})w.pseudos[u]=h(u);for(u in{submit:!0,reset:!0})w.pseudos[u]=i(u);return l.prototype=w.filters=w.pseudos,w.setFilters=new l,z=b.tokenize=function(a,c){var d,e,f,g,h,i,j,k=S[a+" "];if(k)return c?0:k.slice(0);for(h=a,i=[],j=w.preFilter;h;){(!d||(e=jb.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),d=!1,(e=kb.exec(h))&&(d=e.shift(),f.push({value:d,type:e[0].replace(ib," ")}),h=h.slice(d.length));for(g in w.filter)!(e=ob[g].exec(h))||j[g]&&!(e=j[g](e))||(d=e.shift(),f.push({value:d,type:g,matches:e}),h=h.slice(d.length));if(!d)break}return c?h.length:h?b.error(a):S(a,i).slice(0)},A=b.compile=function(a,b){var c,d=[],e=[],f=T[a+" "];if(!f){for(b||(b=z(a)),c=b.length;c--;)f=s(b[c]),f[N]?d.push(f):e.push(f);f=T(a,t(e,d)),f.selector=a}return f},B=b.select=function(a,b,c,d){var e,f,g,h,i,j="function"==typeof a&&a,l=!d&&z(a=j.selector||a);if(c=c||[],1===l.length){if(f=l[0]=l[0].slice(0),f.length>2&&"ID"===(g=f[0]).type&&v.getById&&9===b.nodeType&&I&&w.relative[f[1].type]){if(b=(w.find.ID(g.matches[0].replace(vb,wb),b)||[])[0],!b)return c;j&&(b=b.parentNode),a=a.slice(f.shift().value.length)}for(e=ob.needsContext.test(a)?0:f.length;e--&&(g=f[e],!w.relative[h=g.type]);)if((i=w.find[h])&&(d=i(g.matches[0].replace(vb,wb),tb.test(f[0].type)&&k(b.parentNode)||b))){if(f.splice(e,1),a=d.length&&m(f),!a)return _.apply(c,d),c;break}}return(j||A(a,l))(d,b,!I,c,tb.test(a)&&k(b.parentNode)||b),c},v.sortStable=N.split("").sort(U).join("")===N,v.detectDuplicates=!!E,F(),v.sortDetached=e(function(a){return 1&a.compareDocumentPosition(G.createElement("div"))}),e(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||f("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),v.attributes&&e(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||f("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),e(function(a){return null==a.getAttribute("disabled")})||f(cb,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),b}(a);_.find=eb,_.expr=eb.selectors,_.expr[":"]=_.expr.pseudos,_.unique=eb.uniqueSort,_.text=eb.getText,_.isXMLDoc=eb.isXML,_.contains=eb.contains;var fb=_.expr.match.needsContext,gb=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,hb=/^.[^:#\[\.,]*$/;_.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?_.find.matchesSelector(d,a)?[d]:[]:_.find.matches(a,_.grep(b,function(a){return 1===a.nodeType}))},_.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(_(a).filter(function(){for(b=0;c>b;b++)if(_.contains(e[b],this))return!0
}));for(b=0;c>b;b++)_.find(a,e[b],d);return d=this.pushStack(c>1?_.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(d(this,a||[],!1))},not:function(a){return this.pushStack(d(this,a||[],!0))},is:function(a){return!!d(this,"string"==typeof a&&fb.test(a)?_(a):a||[],!1).length}});var ib,jb=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,kb=_.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:jb.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||ib).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof _?b[0]:b,_.merge(this,_.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:Z,!0)),gb.test(c[1])&&_.isPlainObject(b))for(c in b)_.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=Z.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=Z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):_.isFunction(a)?"undefined"!=typeof ib.ready?ib.ready(a):a(_):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),_.makeArray(a,this))};kb.prototype=_.fn,ib=_(Z);var lb=/^(?:parents|prev(?:Until|All))/,mb={children:!0,contents:!0,next:!0,prev:!0};_.extend({dir:function(a,b,c){for(var d=[],e=void 0!==c;(a=a[b])&&9!==a.nodeType;)if(1===a.nodeType){if(e&&_(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),_.fn.extend({has:function(a){var b=_(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(_.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=fb.test(a)||"string"!=typeof a?_(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&_.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?_.unique(f):f)},index:function(a){return a?"string"==typeof a?U.call(_(a),this[0]):U.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(_.unique(_.merge(this.get(),_(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}}),_.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return _.dir(a,"parentNode")},parentsUntil:function(a,b,c){return _.dir(a,"parentNode",c)},next:function(a){return e(a,"nextSibling")},prev:function(a){return e(a,"previousSibling")},nextAll:function(a){return _.dir(a,"nextSibling")},prevAll:function(a){return _.dir(a,"previousSibling")},nextUntil:function(a,b,c){return _.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return _.dir(a,"previousSibling",c)},siblings:function(a){return _.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return _.sibling(a.firstChild)},contents:function(a){return a.contentDocument||_.merge([],a.childNodes)}},function(a,b){_.fn[a]=function(c,d){var e=_.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=_.filter(d,e)),this.length>1&&(mb[a]||_.unique(e),lb.test(a)&&e.reverse()),this.pushStack(e)}});var nb=/\S+/g,ob={};_.Callbacks=function(a){a="string"==typeof a?ob[a]||f(a):_.extend({},a);var b,c,d,e,g,h,i=[],j=!a.once&&[],k=function(f){for(b=a.memory&&f,c=!0,h=e||0,e=0,g=i.length,d=!0;i&&g>h;h++)if(i[h].apply(f[0],f[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,i&&(j?j.length&&k(j.shift()):b?i=[]:l.disable())},l={add:function(){if(i){var c=i.length;!function f(b){_.each(b,function(b,c){var d=_.type(c);"function"===d?a.unique&&l.has(c)||i.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),d?g=i.length:b&&(e=c,k(b))}return this},remove:function(){return i&&_.each(arguments,function(a,b){for(var c;(c=_.inArray(b,i,c))>-1;)i.splice(c,1),d&&(g>=c&&g--,h>=c&&h--)}),this},has:function(a){return a?_.inArray(a,i)>-1:!(!i||!i.length)},empty:function(){return i=[],g=0,this},disable:function(){return i=j=b=void 0,this},disabled:function(){return!i},lock:function(){return j=void 0,b||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return!i||c&&!j||(b=b||[],b=[a,b.slice?b.slice():b],d?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!c}};return l},_.extend({Deferred:function(a){var b=[["resolve","done",_.Callbacks("once memory"),"resolved"],["reject","fail",_.Callbacks("once memory"),"rejected"],["notify","progress",_.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return _.Deferred(function(c){_.each(b,function(b,f){var g=_.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&_.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?_.extend(a,d):d}},e={};return d.pipe=d.then,_.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b,c,d,e=0,f=R.call(arguments),g=f.length,h=1!==g||a&&_.isFunction(a.promise)?g:0,i=1===h?a:_.Deferred(),j=function(a,c,d){return function(e){c[a]=this,d[a]=arguments.length>1?R.call(arguments):e,d===b?i.notifyWith(c,d):--h||i.resolveWith(c,d)}};if(g>1)for(b=new Array(g),c=new Array(g),d=new Array(g);g>e;e++)f[e]&&_.isFunction(f[e].promise)?f[e].promise().done(j(e,d,f)).fail(i.reject).progress(j(e,c,b)):--h;return h||i.resolveWith(d,f),i.promise()}});var pb;_.fn.ready=function(a){return _.ready.promise().done(a),this},_.extend({isReady:!1,readyWait:1,holdReady:function(a){a?_.readyWait++:_.ready(!0)},ready:function(a){(a===!0?--_.readyWait:_.isReady)||(_.isReady=!0,a!==!0&&--_.readyWait>0||(pb.resolveWith(Z,[_]),_.fn.triggerHandler&&(_(Z).triggerHandler("ready"),_(Z).off("ready"))))}}),_.ready.promise=function(b){return pb||(pb=_.Deferred(),"complete"===Z.readyState?setTimeout(_.ready):(Z.addEventListener("DOMContentLoaded",g,!1),a.addEventListener("load",g,!1))),pb.promise(b)},_.ready.promise();var qb=_.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===_.type(c)){e=!0;for(h in c)_.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,_.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(_(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};_.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType},h.uid=1,h.accepts=_.acceptData,h.prototype={key:function(a){if(!h.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=h.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,_.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(_.isEmptyObject(f))_.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,_.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{_.isArray(b)?d=b.concat(b.map(_.camelCase)):(e=_.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(nb)||[])),c=d.length;for(;c--;)delete g[d[c]]}},hasData:function(a){return!_.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var rb=new h,sb=new h,tb=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ub=/([A-Z])/g;_.extend({hasData:function(a){return sb.hasData(a)||rb.hasData(a)},data:function(a,b,c){return sb.access(a,b,c)},removeData:function(a,b){sb.remove(a,b)},_data:function(a,b,c){return rb.access(a,b,c)},_removeData:function(a,b){rb.remove(a,b)}}),_.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=sb.get(f),1===f.nodeType&&!rb.get(f,"hasDataAttrs"))){for(c=g.length;c--;)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=_.camelCase(d.slice(5)),i(f,d,e[d])));rb.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){sb.set(this,a)}):qb(this,function(b){var c,d=_.camelCase(a);if(f&&void 0===b){if(c=sb.get(f,a),void 0!==c)return c;if(c=sb.get(f,d),void 0!==c)return c;if(c=i(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=sb.get(this,d);sb.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&sb.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){sb.remove(this,a)})}}),_.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=rb.get(a,b),c&&(!d||_.isArray(c)?d=rb.access(a,b,_.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=_.queue(a,b),d=c.length,e=c.shift(),f=_._queueHooks(a,b),g=function(){_.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return rb.get(a,c)||rb.access(a,c,{empty:_.Callbacks("once memory").add(function(){rb.remove(a,[b+"queue",c])})})}}),_.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?_.queue(this[0],a):void 0===b?this:this.each(function(){var c=_.queue(this,a,b);_._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&_.dequeue(this,a)})},dequeue:function(a){return this.each(function(){_.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=_.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};for("string"!=typeof a&&(b=a,a=void 0),a=a||"fx";g--;)c=rb.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var vb=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,wb=["Top","Right","Bottom","Left"],xb=function(a,b){return a=b||a,"none"===_.css(a,"display")||!_.contains(a.ownerDocument,a)},yb=/^(?:checkbox|radio)$/i;!function(){var a=Z.createDocumentFragment(),b=a.appendChild(Z.createElement("div")),c=Z.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),Y.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",Y.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var zb="undefined";Y.focusinBubbles="onfocusin"in a;var Ab=/^key/,Bb=/^(?:mouse|pointer|contextmenu)|click/,Cb=/^(?:focusinfocus|focusoutblur)$/,Db=/^([^.]*)(?:\.(.+)|)$/;_.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=rb.get(a);if(q)for(c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=_.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return typeof _!==zb&&_.event.triggered!==b.type?_.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(nb)||[""],j=b.length;j--;)h=Db.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=_.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=_.event.special[n]||{},k=_.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&_.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),_.event.global[n]=!0)},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=rb.hasData(a)&&rb.get(a);if(q&&(i=q.events)){for(b=(b||"").match(nb)||[""],j=b.length;j--;)if(h=Db.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){for(l=_.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;f--;)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||_.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)_.event.remove(a,n+b[j],c,d,!0);_.isEmptyObject(i)&&(delete q.handle,rb.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,j,k,l,m=[d||Z],n=X.call(b,"type")?b.type:b,o=X.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||Z,3!==d.nodeType&&8!==d.nodeType&&!Cb.test(n+_.event.triggered)&&(n.indexOf(".")>=0&&(o=n.split("."),n=o.shift(),o.sort()),j=n.indexOf(":")<0&&"on"+n,b=b[_.expando]?b:new _.Event(n,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=o.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:_.makeArray(c,[b]),l=_.event.special[n]||{},e||!l.trigger||l.trigger.apply(d,c)!==!1)){if(!e&&!l.noBubble&&!_.isWindow(d)){for(i=l.delegateType||n,Cb.test(i+n)||(g=g.parentNode);g;g=g.parentNode)m.push(g),h=g;h===(d.ownerDocument||Z)&&m.push(h.defaultView||h.parentWindow||a)}for(f=0;(g=m[f++])&&!b.isPropagationStopped();)b.type=f>1?i:l.bindType||n,k=(rb.get(g,"events")||{})[b.type]&&rb.get(g,"handle"),k&&k.apply(g,c),k=j&&g[j],k&&k.apply&&_.acceptData(g)&&(b.result=k.apply(g,c),b.result===!1&&b.preventDefault());return b.type=n,e||b.isDefaultPrevented()||l._default&&l._default.apply(m.pop(),c)!==!1||!_.acceptData(d)||j&&_.isFunction(d[n])&&!_.isWindow(d)&&(h=d[j],h&&(d[j]=null),_.event.triggered=n,d[n](),_.event.triggered=void 0,h&&(d[j]=h)),b.result}},dispatch:function(a){a=_.event.fix(a);var b,c,d,e,f,g=[],h=R.call(arguments),i=(rb.get(this,"events")||{})[a.type]||[],j=_.event.special[a.type]||{};if(h[0]=a,a.delegateTarget=this,!j.preDispatch||j.preDispatch.call(this,a)!==!1){for(g=_.event.handlers.call(this,a,i),b=0;(e=g[b++])&&!a.isPropagationStopped();)for(a.currentTarget=e.elem,c=0;(f=e.handlers[c++])&&!a.isImmediatePropagationStopped();)(!a.namespace_re||a.namespace_re.test(f.namespace))&&(a.handleObj=f,a.data=f.data,d=((_.event.special[f.origType]||{}).handle||f.handler).apply(e.elem,h),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()));return j.postDispatch&&j.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?_(e,this).index(i)>=0:_.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||Z,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[_.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];for(g||(this.fixHooks[e]=g=Bb.test(e)?this.mouseHooks:Ab.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new _.Event(f),b=d.length;b--;)c=d[b],a[c]=f[c];return a.target||(a.target=Z),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==l()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===l()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&_.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return _.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=_.extend(new _.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?_.event.trigger(e,null,b):_.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},_.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},_.Event=function(a,b){return this instanceof _.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?j:k):this.type=a,b&&_.extend(this,b),this.timeStamp=a&&a.timeStamp||_.now(),void(this[_.expando]=!0)):new _.Event(a,b)},_.Event.prototype={isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=j,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=j,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=j,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},_.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){_.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!_.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),Y.focusinBubbles||_.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){_.event.simulate(b,a.target,_.event.fix(a),!0)};_.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=rb.access(d,b);e||d.addEventListener(a,c,!0),rb.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=rb.access(d,b)-1;e?rb.access(d,b,e):(d.removeEventListener(a,c,!0),rb.remove(d,b))}}}),_.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=k;else if(!d)return this;return 1===e&&(f=d,d=function(a){return _().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=_.guid++)),this.each(function(){_.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,_(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=k),this.each(function(){_.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){_.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?_.event.trigger(a,b,c,!0):void 0}});var Eb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Fb=/<([\w:]+)/,Gb=/<|&#?\w+;/,Hb=/<(?:script|style|link)/i,Ib=/checked\s*(?:[^=]|=\s*.checked.)/i,Jb=/^$|\/(?:java|ecma)script/i,Kb=/^true\/(.*)/,Lb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Mb={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Mb.optgroup=Mb.option,Mb.tbody=Mb.tfoot=Mb.colgroup=Mb.caption=Mb.thead,Mb.th=Mb.td,_.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=_.contains(a.ownerDocument,a);if(!(Y.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||_.isXMLDoc(a)))for(g=r(h),f=r(a),d=0,e=f.length;e>d;d++)s(f[d],g[d]);if(b)if(c)for(f=f||r(a),g=g||r(h),d=0,e=f.length;e>d;d++)q(f[d],g[d]);else q(a,h);return g=r(h,"script"),g.length>0&&p(g,!i&&r(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===_.type(e))_.merge(l,e.nodeType?[e]:e);else if(Gb.test(e)){for(f=f||k.appendChild(b.createElement("div")),g=(Fb.exec(e)||["",""])[1].toLowerCase(),h=Mb[g]||Mb._default,f.innerHTML=h[1]+e.replace(Eb,"<$1></$2>")+h[2],j=h[0];j--;)f=f.lastChild;_.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));for(k.textContent="",m=0;e=l[m++];)if((!d||-1===_.inArray(e,d))&&(i=_.contains(e.ownerDocument,e),f=r(k.appendChild(e),"script"),i&&p(f),c))for(j=0;e=f[j++];)Jb.test(e.type||"")&&c.push(e);return k},cleanData:function(a){for(var b,c,d,e,f=_.event.special,g=0;void 0!==(c=a[g]);g++){if(_.acceptData(c)&&(e=c[rb.expando],e&&(b=rb.cache[e]))){if(b.events)for(d in b.events)f[d]?_.event.remove(c,d):_.removeEvent(c,d,b.handle);rb.cache[e]&&delete rb.cache[e]}delete sb.cache[c[sb.expando]]}}}),_.fn.extend({text:function(a){return qb(this,function(a){return void 0===a?_.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=m(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=m(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?_.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||_.cleanData(r(c)),c.parentNode&&(b&&_.contains(c.ownerDocument,c)&&p(r(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(_.cleanData(r(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return _.clone(this,a,b)})},html:function(a){return qb(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!Hb.test(a)&&!Mb[(Fb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Eb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(_.cleanData(r(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,_.cleanData(r(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=S.apply([],a);var c,d,e,f,g,h,i=0,j=this.length,k=this,l=j-1,m=a[0],p=_.isFunction(m);if(p||j>1&&"string"==typeof m&&!Y.checkClone&&Ib.test(m))return this.each(function(c){var d=k.eq(c);p&&(a[0]=m.call(this,c,d.html())),d.domManip(a,b)});if(j&&(c=_.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(e=_.map(r(c,"script"),n),f=e.length;j>i;i++)g=c,i!==l&&(g=_.clone(g,!0,!0),f&&_.merge(e,r(g,"script"))),b.call(this[i],g,i);if(f)for(h=e[e.length-1].ownerDocument,_.map(e,o),i=0;f>i;i++)g=e[i],Jb.test(g.type||"")&&!rb.access(g,"globalEval")&&_.contains(h,g)&&(g.src?_._evalUrl&&_._evalUrl(g.src):_.globalEval(g.textContent.replace(Lb,"")))}return this}}),_.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){_.fn[a]=function(a){for(var c,d=[],e=_(a),f=e.length-1,g=0;f>=g;g++)c=g===f?this:this.clone(!0),_(e[g])[b](c),T.apply(d,c.get());return this.pushStack(d)}});var Nb,Ob={},Pb=/^margin/,Qb=new RegExp("^("+vb+")(?!px)[a-z%]+$","i"),Rb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};!function(){function b(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",g.innerHTML="",e.appendChild(f);var b=a.getComputedStyle(g,null);c="1%"!==b.top,d="4px"===b.width,e.removeChild(f)}var c,d,e=Z.documentElement,f=Z.createElement("div"),g=Z.createElement("div");g.style&&(g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",Y.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",f.appendChild(g),a.getComputedStyle&&_.extend(Y,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return null==d&&b(),d},reliableMarginRight:function(){var b,c=g.appendChild(Z.createElement("div"));return c.style.cssText=g.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),b}}))}(),_.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Sb=/^(none|table(?!-c[ea]).+)/,Tb=new RegExp("^("+vb+")(.*)$","i"),Ub=new RegExp("^([+-])=("+vb+")","i"),Vb={position:"absolute",visibility:"hidden",display:"block"},Wb={letterSpacing:"0",fontWeight:"400"},Xb=["Webkit","O","Moz","ms"];_.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=v(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=_.camelCase(b),i=a.style;return b=_.cssProps[h]||(_.cssProps[h]=x(i,h)),g=_.cssHooks[b]||_.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ub.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(_.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||_.cssNumber[h]||(c+="px"),Y.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=_.camelCase(b);return b=_.cssProps[h]||(_.cssProps[h]=x(a.style,h)),g=_.cssHooks[b]||_.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=v(a,b,d)),"normal"===e&&b in Wb&&(e=Wb[b]),""===c||c?(f=parseFloat(e),c===!0||_.isNumeric(f)?f||0:e):e}}),_.each(["height","width"],function(a,b){_.cssHooks[b]={get:function(a,c,d){return c?Sb.test(_.css(a,"display"))&&0===a.offsetWidth?_.swap(a,Vb,function(){return A(a,b,d)}):A(a,b,d):void 0},set:function(a,c,d){var e=d&&Rb(a);return y(a,c,d?z(a,b,d,"border-box"===_.css(a,"boxSizing",!1,e),e):0)}}}),_.cssHooks.marginRight=w(Y.reliableMarginRight,function(a,b){return b?_.swap(a,{display:"inline-block"},v,[a,"marginRight"]):void 0}),_.each({margin:"",padding:"",border:"Width"},function(a,b){_.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+wb[d]+b]=f[d]||f[d-2]||f[0];return e}},Pb.test(a)||(_.cssHooks[a+b].set=y)}),_.fn.extend({css:function(a,b){return qb(this,function(a,b,c){var d,e,f={},g=0;if(_.isArray(b)){for(d=Rb(a),e=b.length;e>g;g++)f[b[g]]=_.css(a,b[g],!1,d);return f}return void 0!==c?_.style(a,b,c):_.css(a,b)},a,b,arguments.length>1)},show:function(){return B(this,!0)},hide:function(){return B(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){xb(this)?_(this).show():_(this).hide()})}}),_.Tween=C,C.prototype={constructor:C,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(_.cssNumber[c]?"":"px")},cur:function(){var a=C.propHooks[this.prop];return a&&a.get?a.get(this):C.propHooks._default.get(this)},run:function(a){var b,c=C.propHooks[this.prop];return this.pos=b=this.options.duration?_.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):C.propHooks._default.set(this),this}},C.prototype.init.prototype=C.prototype,C.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=_.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){_.fx.step[a.prop]?_.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[_.cssProps[a.prop]]||_.cssHooks[a.prop])?_.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},C.propHooks.scrollTop=C.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},_.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},_.fx=C.prototype.init,_.fx.step={};var Yb,Zb,$b=/^(?:toggle|show|hide)$/,_b=new RegExp("^(?:([+-])=|)("+vb+")([a-z%]*)$","i"),ac=/queueHooks$/,bc=[G],cc={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=_b.exec(b),f=e&&e[3]||(_.cssNumber[a]?"":"px"),g=(_.cssNumber[a]||"px"!==f&&+d)&&_b.exec(_.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,_.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};_.Animation=_.extend(I,{tweener:function(a,b){_.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],cc[c]=cc[c]||[],cc[c].unshift(b)},prefilter:function(a,b){b?bc.unshift(a):bc.push(a)}}),_.speed=function(a,b,c){var d=a&&"object"==typeof a?_.extend({},a):{complete:c||!c&&b||_.isFunction(a)&&a,duration:a,easing:c&&b||b&&!_.isFunction(b)&&b};return d.duration=_.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in _.fx.speeds?_.fx.speeds[d.duration]:_.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){_.isFunction(d.old)&&d.old.call(this),d.queue&&_.dequeue(this,d.queue)},d},_.fn.extend({fadeTo:function(a,b,c,d){return this.filter(xb).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=_.isEmptyObject(a),f=_.speed(b,c,d),g=function(){var b=I(this,_.extend({},a),f);(e||rb.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=_.timers,g=rb.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&ac.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&_.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=rb.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=_.timers,g=d?d.length:0;for(c.finish=!0,_.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),_.each(["toggle","show","hide"],function(a,b){var c=_.fn[b];
_.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(E(b,!0),a,d,e)}}),_.each({slideDown:E("show"),slideUp:E("hide"),slideToggle:E("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){_.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),_.timers=[],_.fx.tick=function(){var a,b=0,c=_.timers;for(Yb=_.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||_.fx.stop(),Yb=void 0},_.fx.timer=function(a){_.timers.push(a),a()?_.fx.start():_.timers.pop()},_.fx.interval=13,_.fx.start=function(){Zb||(Zb=setInterval(_.fx.tick,_.fx.interval))},_.fx.stop=function(){clearInterval(Zb),Zb=null},_.fx.speeds={slow:600,fast:200,_default:400},_.fn.delay=function(a,b){return a=_.fx?_.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=Z.createElement("input"),b=Z.createElement("select"),c=b.appendChild(Z.createElement("option"));a.type="checkbox",Y.checkOn=""!==a.value,Y.optSelected=c.selected,b.disabled=!0,Y.optDisabled=!c.disabled,a=Z.createElement("input"),a.value="t",a.type="radio",Y.radioValue="t"===a.value}();var dc,ec,fc=_.expr.attrHandle;_.fn.extend({attr:function(a,b){return qb(this,_.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){_.removeAttr(this,a)})}}),_.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===zb?_.prop(a,b,c):(1===f&&_.isXMLDoc(a)||(b=b.toLowerCase(),d=_.attrHooks[b]||(_.expr.match.bool.test(b)?ec:dc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=_.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void _.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(nb);if(f&&1===a.nodeType)for(;c=f[e++];)d=_.propFix[c]||c,_.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!Y.radioValue&&"radio"===b&&_.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),ec={set:function(a,b,c){return b===!1?_.removeAttr(a,c):a.setAttribute(c,c),c}},_.each(_.expr.match.bool.source.match(/\w+/g),function(a,b){var c=fc[b]||_.find.attr;fc[b]=function(a,b,d){var e,f;return d||(f=fc[b],fc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,fc[b]=f),e}});var gc=/^(?:input|select|textarea|button)$/i;_.fn.extend({prop:function(a,b){return qb(this,_.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[_.propFix[a]||a]})}}),_.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!_.isXMLDoc(a),f&&(b=_.propFix[b]||b,e=_.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||gc.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),Y.optSelected||(_.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),_.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){_.propFix[this.toLowerCase()]=this});var hc=/[\t\r\n\f]/g;_.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(_.isFunction(a))return this.each(function(b){_(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(nb)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(hc," "):" ")){for(f=0;e=b[f++];)d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=_.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(_.isFunction(a))return this.each(function(b){_(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(nb)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(hc," "):"")){for(f=0;e=b[f++];)for(;d.indexOf(" "+e+" ")>=0;)d=d.replace(" "+e+" "," ");g=a?_.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(_.isFunction(a)?function(c){_(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c)for(var b,d=0,e=_(this),f=a.match(nb)||[];b=f[d++];)e.hasClass(b)?e.removeClass(b):e.addClass(b);else(c===zb||"boolean"===c)&&(this.className&&rb.set(this,"__className__",this.className),this.className=this.className||a===!1?"":rb.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(hc," ").indexOf(b)>=0)return!0;return!1}});var ic=/\r/g;_.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=_.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,_(this).val()):a,null==e?e="":"number"==typeof e?e+="":_.isArray(e)&&(e=_.map(e,function(a){return null==a?"":a+""})),b=_.valHooks[this.type]||_.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=_.valHooks[e.type]||_.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(ic,""):null==c?"":c)}}}),_.extend({valHooks:{option:{get:function(a){var b=_.find.attr(a,"value");return null!=b?b:_.trim(_.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(Y.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&_.nodeName(c.parentNode,"optgroup"))){if(b=_(c).val(),f)return b;g.push(b)}return g},set:function(a,b){for(var c,d,e=a.options,f=_.makeArray(b),g=e.length;g--;)d=e[g],(d.selected=_.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),_.each(["radio","checkbox"],function(){_.valHooks[this]={set:function(a,b){return _.isArray(b)?a.checked=_.inArray(_(a).val(),b)>=0:void 0}},Y.checkOn||(_.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),_.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){_.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),_.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var jc=_.now(),kc=/\?/;_.parseJSON=function(a){return JSON.parse(a+"")},_.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&_.error("Invalid XML: "+a),b};var lc,mc,nc=/#.*$/,oc=/([?&])_=[^&]*/,pc=/^(.*?):[ \t]*([^\r\n]*)$/gm,qc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rc=/^(?:GET|HEAD)$/,sc=/^\/\//,tc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,uc={},vc={},wc="*/".concat("*");try{mc=location.href}catch(xc){mc=Z.createElement("a"),mc.href="",mc=mc.href}lc=tc.exec(mc.toLowerCase())||[],_.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:mc,type:"GET",isLocal:qc.test(lc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":wc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":_.parseJSON,"text xml":_.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?L(L(a,_.ajaxSettings),b):L(_.ajaxSettings,a)},ajaxPrefilter:J(uc),ajaxTransport:J(vc),ajax:function(a,b){function c(a,b,c,g){var i,k,r,s,u,w=b;2!==t&&(t=2,h&&clearTimeout(h),d=void 0,f=g||"",v.readyState=a>0?4:0,i=a>=200&&300>a||304===a,c&&(s=M(l,v,c)),s=N(l,s,v,i),i?(l.ifModified&&(u=v.getResponseHeader("Last-Modified"),u&&(_.lastModified[e]=u),u=v.getResponseHeader("etag"),u&&(_.etag[e]=u)),204===a||"HEAD"===l.type?w="nocontent":304===a?w="notmodified":(w=s.state,k=s.data,r=s.error,i=!r)):(r=w,(a||!w)&&(w="error",0>a&&(a=0))),v.status=a,v.statusText=(b||w)+"",i?o.resolveWith(m,[k,w,v]):o.rejectWith(m,[v,w,r]),v.statusCode(q),q=void 0,j&&n.trigger(i?"ajaxSuccess":"ajaxError",[v,l,i?k:r]),p.fireWith(m,[v,w]),j&&(n.trigger("ajaxComplete",[v,l]),--_.active||_.event.trigger("ajaxStop")))}"object"==typeof a&&(b=a,a=void 0),b=b||{};var d,e,f,g,h,i,j,k,l=_.ajaxSetup({},b),m=l.context||l,n=l.context&&(m.nodeType||m.jquery)?_(m):_.event,o=_.Deferred(),p=_.Callbacks("once memory"),q=l.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!g)for(g={};b=pc.exec(f);)g[b[1].toLowerCase()]=b[2];b=g[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return d&&d.abort(b),c(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,l.url=((a||l.url||mc)+"").replace(nc,"").replace(sc,lc[1]+"//"),l.type=b.method||b.type||l.method||l.type,l.dataTypes=_.trim(l.dataType||"*").toLowerCase().match(nb)||[""],null==l.crossDomain&&(i=tc.exec(l.url.toLowerCase()),l.crossDomain=!(!i||i[1]===lc[1]&&i[2]===lc[2]&&(i[3]||("http:"===i[1]?"80":"443"))===(lc[3]||("http:"===lc[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=_.param(l.data,l.traditional)),K(uc,l,b,v),2===t)return v;j=l.global,j&&0===_.active++&&_.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!rc.test(l.type),e=l.url,l.hasContent||(l.data&&(e=l.url+=(kc.test(e)?"&":"?")+l.data,delete l.data),l.cache===!1&&(l.url=oc.test(e)?e.replace(oc,"$1_="+jc++):e+(kc.test(e)?"&":"?")+"_="+jc++)),l.ifModified&&(_.lastModified[e]&&v.setRequestHeader("If-Modified-Since",_.lastModified[e]),_.etag[e]&&v.setRequestHeader("If-None-Match",_.etag[e])),(l.data&&l.hasContent&&l.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",l.contentType),v.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+wc+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)v.setRequestHeader(k,l.headers[k]);if(l.beforeSend&&(l.beforeSend.call(m,v,l)===!1||2===t))return v.abort();u="abort";for(k in{success:1,error:1,complete:1})v[k](l[k]);if(d=K(vc,l,b,v)){v.readyState=1,j&&n.trigger("ajaxSend",[v,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){v.abort("timeout")},l.timeout));try{t=1,d.send(r,c)}catch(w){if(!(2>t))throw w;c(-1,w)}}else c(-1,"No Transport");return v},getJSON:function(a,b,c){return _.get(a,b,c,"json")},getScript:function(a,b){return _.get(a,void 0,b,"script")}}),_.each(["get","post"],function(a,b){_[b]=function(a,c,d,e){return _.isFunction(c)&&(e=e||d,d=c,c=void 0),_.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),_.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){_.fn[b]=function(a){return this.on(b,a)}}),_._evalUrl=function(a){return _.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},_.fn.extend({wrapAll:function(a){var b;return _.isFunction(a)?this.each(function(b){_(this).wrapAll(a.call(this,b))}):(this[0]&&(b=_(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){for(var a=this;a.firstElementChild;)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(_.isFunction(a)?function(b){_(this).wrapInner(a.call(this,b))}:function(){var b=_(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=_.isFunction(a);return this.each(function(c){_(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){_.nodeName(this,"body")||_(this).replaceWith(this.childNodes)}).end()}}),_.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},_.expr.filters.visible=function(a){return!_.expr.filters.hidden(a)};var yc=/%20/g,zc=/\[\]$/,Ac=/\r?\n/g,Bc=/^(?:submit|button|image|reset|file)$/i,Cc=/^(?:input|select|textarea|keygen)/i;_.param=function(a,b){var c,d=[],e=function(a,b){b=_.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=_.ajaxSettings&&_.ajaxSettings.traditional),_.isArray(a)||a.jquery&&!_.isPlainObject(a))_.each(a,function(){e(this.name,this.value)});else for(c in a)O(c,a[c],b,e);return d.join("&").replace(yc,"+")},_.fn.extend({serialize:function(){return _.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=_.prop(this,"elements");return a?_.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!_(this).is(":disabled")&&Cc.test(this.nodeName)&&!Bc.test(a)&&(this.checked||!yb.test(a))}).map(function(a,b){var c=_(this).val();return null==c?null:_.isArray(c)?_.map(c,function(a){return{name:b.name,value:a.replace(Ac,"\r\n")}}):{name:b.name,value:c.replace(Ac,"\r\n")}}).get()}}),_.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Dc=0,Ec={},Fc={0:200,1223:204},Gc=_.ajaxSettings.xhr();a.ActiveXObject&&_(a).on("unload",function(){for(var a in Ec)Ec[a]()}),Y.cors=!!Gc&&"withCredentials"in Gc,Y.ajax=Gc=!!Gc,_.ajaxTransport(function(a){var b;return Y.cors||Gc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Dc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Ec[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Fc[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Ec[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),_.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return _.globalEval(a),a}}}),_.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),_.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=_("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),Z.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Hc=[],Ic=/(=)\?(?=&|$)|\?\?/;_.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Hc.pop()||_.expando+"_"+jc++;return this[a]=!0,a}}),_.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ic.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ic.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=_.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ic,"$1"+e):b.jsonp!==!1&&(b.url+=(kc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||_.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Hc.push(e)),g&&_.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),_.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||Z;var d=gb.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=_.buildFragment([a],b,e),e&&e.length&&_(e).remove(),_.merge([],d.childNodes))};var Jc=_.fn.load;_.fn.load=function(a,b,c){if("string"!=typeof a&&Jc)return Jc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=_.trim(a.slice(h)),a=a.slice(0,h)),_.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&_.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?_("<div>").append(_.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},_.expr.filters.animated=function(a){return _.grep(_.timers,function(b){return a===b.elem}).length};var Kc=a.document.documentElement;_.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=_.css(a,"position"),l=_(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=_.css(a,"top"),i=_.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),_.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},_.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){_.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,_.contains(b,d)?(typeof d.getBoundingClientRect!==zb&&(e=d.getBoundingClientRect()),c=P(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===_.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),_.nodeName(a[0],"html")||(d=a.offset()),d.top+=_.css(a[0],"borderTopWidth",!0),d.left+=_.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-_.css(c,"marginTop",!0),left:b.left-d.left-_.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||Kc;a&&!_.nodeName(a,"html")&&"static"===_.css(a,"position");)a=a.offsetParent;return a||Kc})}}),_.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;_.fn[b]=function(e){return qb(this,function(b,e,f){var g=P(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),_.each(["top","left"],function(a,b){_.cssHooks[b]=w(Y.pixelPosition,function(a,c){return c?(c=v(a,b),Qb.test(c)?_(a).position()[b]+"px":c):void 0})}),_.each({Height:"height",Width:"width"},function(a,b){_.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){_.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return qb(this,function(b,c,d){var e;return _.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?_.css(b,c,g):_.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),_.fn.size=function(){return this.length},_.fn.andSelf=_.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return _});var Lc=a.jQuery,Mc=a.$;return _.noConflict=function(b){return a.$===_&&(a.$=Mc),b&&a.jQuery===_&&(a.jQuery=Lc),_},typeof b===zb&&(a.jQuery=a.$=_),_}),"undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});return this.$element.trigger(j),j.isDefaultPrevented()?void 0:(this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this)};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);!e&&f.toggle&&"show"==c&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(b){a(d).remove(),a(e).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown",h),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=" li:not(.divider):visible a",i=f.find("[role=menu]"+h+", [role=listbox]"+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu], [role=listbox]",f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});
d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n="body"==this.options.container?window.innerWidth:k.outerWidth(),o="body"==this.options.container?window.innerHeight:k.outerHeight(),p="body"==this.options.container?0:k.offset().left;e="bottom"==e&&h.top+h.height+j-m>o?"top":"top"==e&&h.top-m-j<0?"bottom":"right"==e&&h.right+i>n?"left":"left"==e&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;if("top"==c&&k!=g&&(d=!0,b.top=b.top+g-k),/bottom|top/.test(c)){var l=0;b.left<0&&(l=-2*b.left,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(a(c).is("body")?window:c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"top"==this.affixed&&(e.top+=d),"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:c-h-this.$element.height()}))}}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery),!function(){function a(a,b){return b>a?-1:a>b?1:a>=b?0:0/0}function b(a){return null!=a&&!isNaN(a)}function c(a){return{left:function(b,c,d,e){for(arguments.length<3&&(d=0),arguments.length<4&&(e=b.length);e>d;){var f=d+e>>>1;a(b[f],c)<0?d=f+1:e=f}return d},right:function(b,c,d,e){for(arguments.length<3&&(d=0),arguments.length<4&&(e=b.length);e>d;){var f=d+e>>>1;a(b[f],c)>0?e=f:d=f+1}return d}}}function d(a){return a.length}function e(a){for(var b=1;a*b%1;)b*=10;return b}function f(a,b){try{for(var c in b)Object.defineProperty(a.prototype,c,{value:b[c],enumerable:!1})}catch(d){a.prototype=b}}function g(){}function h(a){return jh+a in this}function i(a){return a=jh+a,a in this&&delete this[a]}function j(){var a=[];return this.forEach(function(b){a.push(b)}),a}function k(){var a=0;for(var b in this)b.charCodeAt(0)===kh&&++a;return a}function l(){for(var a in this)if(a.charCodeAt(0)===kh)return!1;return!0}function m(){}function n(a,b,c){return function(){var d=c.apply(b,arguments);return d===b?a:d}}function o(a,b){if(b in a)return b;b=b.charAt(0).toUpperCase()+b.substring(1);for(var c=0,d=lh.length;d>c;++c){var e=lh[c]+b;if(e in a)return e}}function p(){}function q(){}function r(a){function b(){for(var b,d=c,e=-1,f=d.length;++e<f;)(b=d[e].on)&&b.apply(this,arguments);return a}var c=[],d=new g;return b.on=function(b,e){var f,g=d.get(b);return arguments.length<2?g&&g.on:(g&&(g.on=null,c=c.slice(0,f=c.indexOf(g)).concat(c.slice(f+1)),d.remove(b)),e&&c.push(d.set(b,{on:e})),a)},b}function s(){Wg.event.preventDefault()}function t(){for(var a,b=Wg.event;a=b.sourceEvent;)b=a;return b}function u(a){for(var b=new q,c=0,d=arguments.length;++c<d;)b[arguments[c]]=r(b);return b.of=function(c,d){return function(e){try{var f=e.sourceEvent=Wg.event;e.target=a,Wg.event=e,b[e.type].apply(c,d)}finally{Wg.event=f}}},b}function v(a){return nh(a,sh),a}function w(a){return"function"==typeof a?a:function(){return oh(a,this)}}function x(a){return"function"==typeof a?a:function(){return ph(a,this)}}function y(a,b){function c(){this.removeAttribute(a)}function d(){this.removeAttributeNS(a.space,a.local)}function e(){this.setAttribute(a,b)}function f(){this.setAttributeNS(a.space,a.local,b)}function g(){var c=b.apply(this,arguments);null==c?this.removeAttribute(a):this.setAttribute(a,c)}function h(){var c=b.apply(this,arguments);null==c?this.removeAttributeNS(a.space,a.local):this.setAttributeNS(a.space,a.local,c)}return a=Wg.ns.qualify(a),null==b?a.local?d:c:"function"==typeof b?a.local?h:g:a.local?f:e}function z(a){return a.trim().replace(/\s+/g," ")}function A(a){return new RegExp("(?:^|\\s+)"+Wg.requote(a)+"(?:\\s+|$)","g")}function B(a){return a.trim().split(/^|\s+/)}function C(a,b){function c(){for(var c=-1;++c<e;)a[c](this,b)}function d(){for(var c=-1,d=b.apply(this,arguments);++c<e;)a[c](this,d)}a=B(a).map(D);var e=a.length;return"function"==typeof b?d:c}function D(a){var b=A(a);return function(c,d){if(e=c.classList)return d?e.add(a):e.remove(a);var e=c.getAttribute("class")||"";d?(b.lastIndex=0,b.test(e)||c.setAttribute("class",z(e+" "+a))):c.setAttribute("class",z(e.replace(b," ")))}}function E(a,b,c){function d(){this.style.removeProperty(a)}function e(){this.style.setProperty(a,b,c)}function f(){var d=b.apply(this,arguments);null==d?this.style.removeProperty(a):this.style.setProperty(a,d,c)}return null==b?d:"function"==typeof b?f:e}function F(a,b){function c(){delete this[a]}function d(){this[a]=b}function e(){var c=b.apply(this,arguments);null==c?delete this[a]:this[a]=c}return null==b?c:"function"==typeof b?e:d}function G(a){return"function"==typeof a?a:(a=Wg.ns.qualify(a)).local?function(){return this.ownerDocument.createElementNS(a.space,a.local)}:function(){return this.ownerDocument.createElementNS(this.namespaceURI,a)}}function H(a){return{__data__:a}}function I(a){return function(){return rh(this,a)}}function J(b){return arguments.length||(b=a),function(a,c){return a&&c?b(a.__data__,c.__data__):!a-!c}}function K(a,b){for(var c=0,d=a.length;d>c;c++)for(var e,f=a[c],g=0,h=f.length;h>g;g++)(e=f[g])&&b(e,g,c);return a}function L(a){return nh(a,uh),a}function M(a){var b,c;return function(d,e,f){var g,h=a[f].update,i=h.length;for(f!=c&&(c=f,b=0),e>=b&&(b=e+1);!(g=h[b])&&++b<i;);return g}}function N(){var a=this.__transition__;a&&++a.active}function O(a,b,c){function d(){var b=this[g];b&&(this.removeEventListener(a,b,b.$),delete this[g])}function e(){var e=i(b,Yg(arguments));d.call(this),this.addEventListener(a,this[g]=e,e.$=c),e._=b}function f(){var b,c=new RegExp("^__on([^.]+)"+Wg.requote(a)+"$");for(var d in this)if(b=d.match(c)){var e=this[d];this.removeEventListener(b[1],e,e.$),delete this[d]}}var g="__on"+a,h=a.indexOf("."),i=P;h>0&&(a=a.substring(0,h));var j=wh.get(a);return j&&(a=j,i=Q),h?b?e:d:b?p:f}function P(a,b){return function(c){var d=Wg.event;Wg.event=c,b[0]=this.__data__;try{a.apply(this,b)}finally{Wg.event=d}}}function Q(a,b){var c=P(a,b);return function(a){var b=this,d=a.relatedTarget;d&&(d===b||8&d.compareDocumentPosition(b))||c.call(b,a)}}function R(){var a=".dragsuppress-"+ ++yh,b="click"+a,c=Wg.select(_g).on("touchmove"+a,s).on("dragstart"+a,s).on("selectstart"+a,s);if(xh){var d=$g.style,e=d[xh];d[xh]="none"}return function(f){function g(){c.on(b,null)}c.on(a,null),xh&&(d[xh]=e),f&&(c.on(b,function(){s(),g()},!0),setTimeout(g,0))}}function S(a,b){b.changedTouches&&(b=b.changedTouches[0]);var c=a.ownerSVGElement||a;if(c.createSVGPoint){var d=c.createSVGPoint();return d.x=b.clientX,d.y=b.clientY,d=d.matrixTransform(a.getScreenCTM().inverse()),[d.x,d.y]}var e=a.getBoundingClientRect();return[b.clientX-e.left-a.clientLeft,b.clientY-e.top-a.clientTop]}function T(){return Wg.event.changedTouches[0].identifier}function U(){return Wg.event.target}function V(){return _g}function W(a){return a>0?1:0>a?-1:0}function X(a,b,c){return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])}function Y(a){return a>1?0:-1>a?zh:Math.acos(a)}function Z(a){return a>1?Bh:-1>a?-Bh:Math.asin(a)}function $(a){return((a=Math.exp(a))-1/a)/2}function _(a){return((a=Math.exp(a))+1/a)/2}function ab(a){return((a=Math.exp(2*a))-1)/(a+1)}function bb(a){return(a=Math.sin(a/2))*a}function cb(){}function db(a,b,c){return new eb(a,b,c)}function eb(a,b,c){this.h=a,this.s=b,this.l=c}function fb(a,b,c){function d(a){return a>360?a-=360:0>a&&(a+=360),60>a?f+(g-f)*a/60:180>a?g:240>a?f+(g-f)*(240-a)/60:f}function e(a){return Math.round(255*d(a))}var f,g;return a=isNaN(a)?0:(a%=360)<0?a+360:a,b=isNaN(b)?0:0>b?0:b>1?1:b,c=0>c?0:c>1?1:c,g=.5>=c?c*(1+b):c+b-c*b,f=2*c-g,sb(e(a+120),e(a),e(a-120))}function gb(a,b,c){return new hb(a,b,c)}function hb(a,b,c){this.h=a,this.c=b,this.l=c}function ib(a,b,c){return isNaN(a)&&(a=0),isNaN(b)&&(b=0),jb(c,Math.cos(a*=Eh)*b,Math.sin(a)*b)}function jb(a,b,c){return new kb(a,b,c)}function kb(a,b,c){this.l=a,this.a=b,this.b=c}function lb(a,b,c){var d=(a+16)/116,e=d+b/500,f=d-c/200;return e=nb(e)*Ph,d=nb(d)*Qh,f=nb(f)*Rh,sb(pb(3.2404542*e-1.5371385*d-.4985314*f),pb(-.969266*e+1.8760108*d+.041556*f),pb(.0556434*e-.2040259*d+1.0572252*f))}function mb(a,b,c){return a>0?gb(Math.atan2(c,b)*Fh,Math.sqrt(b*b+c*c),a):gb(0/0,0/0,a)}function nb(a){return a>.206893034?a*a*a:(a-4/29)/7.787037}function ob(a){return a>.008856?Math.pow(a,1/3):7.787037*a+4/29}function pb(a){return Math.round(255*(.00304>=a?12.92*a:1.055*Math.pow(a,1/2.4)-.055))}function qb(a){return sb(a>>16,a>>8&255,255&a)}function rb(a){return qb(a)+""}function sb(a,b,c){return new tb(a,b,c)}function tb(a,b,c){this.r=a,this.g=b,this.b=c}function ub(a){return 16>a?"0"+Math.max(0,a).toString(16):Math.min(255,a).toString(16)}function vb(a,b,c){var d,e,f,g=0,h=0,i=0;if(d=/([a-z]+)\((.*)\)/i.exec(a))switch(e=d[2].split(","),d[1]){case"hsl":return c(parseFloat(e[0]),parseFloat(e[1])/100,parseFloat(e[2])/100);case"rgb":return b(zb(e[0]),zb(e[1]),zb(e[2]))}return(f=Uh.get(a))?b(f.r,f.g,f.b):(null==a||"#"!==a.charAt(0)||isNaN(f=parseInt(a.substring(1),16))||(4===a.length?(g=(3840&f)>>4,g=g>>4|g,h=240&f,h=h>>4|h,i=15&f,i=i<<4|i):7===a.length&&(g=(16711680&f)>>16,h=(65280&f)>>8,i=255&f)),b(g,h,i))}function wb(a,b,c){var d,e,f=Math.min(a/=255,b/=255,c/=255),g=Math.max(a,b,c),h=g-f,i=(g+f)/2;return h?(e=.5>i?h/(g+f):h/(2-g-f),d=a==g?(b-c)/h+(c>b?6:0):b==g?(c-a)/h+2:(a-b)/h+4,d*=60):(d=0/0,e=i>0&&1>i?0:d),db(d,e,i)}function xb(a,b,c){a=yb(a),b=yb(b),c=yb(c);var d=ob((.4124564*a+.3575761*b+.1804375*c)/Ph),e=ob((.2126729*a+.7151522*b+.072175*c)/Qh),f=ob((.0193339*a+.119192*b+.9503041*c)/Rh);return jb(116*e-16,500*(d-e),200*(e-f))}function yb(a){return(a/=255)<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)}function zb(a){var b=parseFloat(a);return"%"===a.charAt(a.length-1)?Math.round(2.55*b):b}function Ab(a){return"function"==typeof a?a:function(){return a}}function Bb(a){return a}function Cb(a){return function(b,c,d){return 2===arguments.length&&"function"==typeof c&&(d=c,c=null),Db(b,c,a,d)}}function Db(a,b,c,d){function e(){var a,b=i.status;if(!b&&i.responseText||b>=200&&300>b||304===b){try{a=c.call(f,i)}catch(d){return void g.error.call(f,d)}g.load.call(f,a)}else g.error.call(f,i)}var f={},g=Wg.dispatch("beforesend","progress","load","error"),h={},i=new XMLHttpRequest,j=null;return!_g.XDomainRequest||"withCredentials"in i||!/^(http(s)?:)?\/\//.test(a)||(i=new XDomainRequest),"onload"in i?i.onload=i.onerror=e:i.onreadystatechange=function(){i.readyState>3&&e()},i.onprogress=function(a){var b=Wg.event;Wg.event=a;try{g.progress.call(f,i)}finally{Wg.event=b}},f.header=function(a,b){return a=(a+"").toLowerCase(),arguments.length<2?h[a]:(null==b?delete h[a]:h[a]=b+"",f)},f.mimeType=function(a){return arguments.length?(b=null==a?null:a+"",f):b},f.responseType=function(a){return arguments.length?(j=a,f):j},f.response=function(a){return c=a,f},["get","post"].forEach(function(a){f[a]=function(){return f.send.apply(f,[a].concat(Yg(arguments)))}}),f.send=function(c,d,e){if(2===arguments.length&&"function"==typeof d&&(e=d,d=null),i.open(c,a,!0),null==b||"accept"in h||(h.accept=b+",*/*"),i.setRequestHeader)for(var k in h)i.setRequestHeader(k,h[k]);return null!=b&&i.overrideMimeType&&i.overrideMimeType(b),null!=j&&(i.responseType=j),null!=e&&f.on("error",e).on("load",function(a){e(null,a)}),g.beforesend.call(f,i),i.send(null==d?null:d),f},f.abort=function(){return i.abort(),f},Wg.rebind(f,g,"on"),null==d?f:f.get(Eb(d))}function Eb(a){return 1===a.length?function(b,c){a(null==b?c:null)}:a}function Fb(){var a=Gb(),b=Hb()-a;b>24?(isFinite(b)&&(clearTimeout(Yh),Yh=setTimeout(Fb,b)),Xh=0):(Xh=1,$h(Fb))}function Gb(){var a=Date.now();for(Zh=Vh;Zh;)a>=Zh.t&&(Zh.f=Zh.c(a-Zh.t)),Zh=Zh.n;return a}function Hb(){for(var a,b=Vh,c=1/0;b;)b.f?b=a?a.n=b.n:Vh=b.n:(b.t<c&&(c=b.t),b=(a=b).n);return Wh=a,c}function Ib(a,b){return b-(a?Math.ceil(Math.log(a)/Math.LN10):1)}function Jb(a,b){var c=Math.pow(10,3*ih(8-b));return{scale:b>8?function(a){return a/c}:function(a){return a*c},symbol:a}}function Kb(a){var b=a.decimal,c=a.thousands,d=a.grouping,e=a.currency,f=d?function(a){for(var b=a.length,e=[],f=0,g=d[0];b>0&&g>0;)e.push(a.substring(b-=g,b+g)),g=d[f=(f+1)%d.length];return e.reverse().join(c)}:Bb;return function(a){var c=ai.exec(a),d=c[1]||" ",g=c[2]||">",h=c[3]||"",i=c[4]||"",j=c[5],k=+c[6],l=c[7],m=c[8],n=c[9],o=1,p="",q="",r=!1;switch(m&&(m=+m.substring(1)),(j||"0"===d&&"="===g)&&(j=d="0",g="=",l&&(k-=Math.floor((k-1)/4))),n){case"n":l=!0,n="g";break;case"%":o=100,q="%",n="f";break;case"p":o=100,q="%",n="r";break;case"b":case"o":case"x":case"X":"#"===i&&(p="0"+n.toLowerCase());case"c":case"d":r=!0,m=0;break;case"s":o=-1,n="r"}"$"===i&&(p=e[0],q=e[1]),"r"!=n||m||(n="g"),null!=m&&("g"==n?m=Math.max(1,Math.min(21,m)):("e"==n||"f"==n)&&(m=Math.max(0,Math.min(20,m)))),n=bi.get(n)||Lb;var s=j&&l;return function(a){var c=q;if(r&&a%1)return"";var e=0>a||0===a&&0>1/a?(a=-a,"-"):h;if(0>o){var i=Wg.formatPrefix(a,m);a=i.scale(a),c=i.symbol+q}else a*=o;a=n(a,m);var t=a.lastIndexOf("."),u=0>t?a:a.substring(0,t),v=0>t?"":b+a.substring(t+1);!j&&l&&(u=f(u));var w=p.length+u.length+v.length+(s?0:e.length),x=k>w?new Array(w=k-w+1).join(d):"";return s&&(u=f(x+u)),e+=p,a=u+v,("<"===g?e+a+x:">"===g?x+e+a:"^"===g?x.substring(0,w>>=1)+e+a+x.substring(w):e+(s?a:x+a))+c}}}function Lb(a){return a+""}function Mb(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function Nb(a,b,c){function d(b){var c=a(b),d=f(c,1);return d-b>b-c?c:d}function e(c){return b(c=a(new di(c-1)),1),c}function f(a,c){return b(a=new di(+a),c),a}function g(a,d,f){var g=e(a),h=[];if(f>1)for(;d>g;)c(g)%f||h.push(new Date(+g)),b(g,1);else for(;d>g;)h.push(new Date(+g)),b(g,1);return h}function h(a,b,c){try{di=Mb;var d=new Mb;return d._=a,g(d,b,c)}finally{di=Date}}a.floor=a,a.round=d,a.ceil=e,a.offset=f,a.range=g;var i=a.utc=Ob(a);return i.floor=i,i.round=Ob(d),i.ceil=Ob(e),i.offset=Ob(f),i.range=h,a}function Ob(a){return function(b,c){try{di=Mb;var d=new Mb;return d._=b,a(d,c)._}finally{di=Date}}}function Pb(a){function b(a){function b(b){for(var c,e,f,g=[],h=-1,i=0;++h<d;)37===a.charCodeAt(h)&&(g.push(a.substring(i,h)),null!=(e=fi[c=a.charAt(++h)])&&(c=a.charAt(++h)),(f=C[c])&&(c=f(b,null==e?"e"===c?" ":"0":e)),g.push(c),i=h+1);return g.push(a.substring(i,h)),g.join("")}var d=a.length;return b.parse=function(b){var d={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},e=c(d,a,b,0);if(e!=b.length)return null;"p"in d&&(d.H=d.H%12+12*d.p);var f=null!=d.Z&&di!==Mb,g=new(f?Mb:di);return"j"in d?g.setFullYear(d.y,0,d.j):"w"in d&&("W"in d||"U"in d)?(g.setFullYear(d.y,0,1),g.setFullYear(d.y,0,"W"in d?(d.w+6)%7+7*d.W-(g.getDay()+5)%7:d.w+7*d.U-(g.getDay()+6)%7)):g.setFullYear(d.y,d.m,d.d),g.setHours(d.H+Math.floor(d.Z/100),d.M+d.Z%100,d.S,d.L),f?g._:g},b.toString=function(){return a},b}function c(a,b,c,d){for(var e,f,g,h=0,i=b.length,j=c.length;i>h;){if(d>=j)return-1;if(e=b.charCodeAt(h++),37===e){if(g=b.charAt(h++),f=D[g in fi?b.charAt(h++):g],!f||(d=f(a,c,d))<0)return-1}else if(e!=c.charCodeAt(d++))return-1}return d}function d(a,b,c){w.lastIndex=0;var d=w.exec(b.substring(c));return d?(a.w=x.get(d[0].toLowerCase()),c+d[0].length):-1}function e(a,b,c){u.lastIndex=0;var d=u.exec(b.substring(c));return d?(a.w=v.get(d[0].toLowerCase()),c+d[0].length):-1}function f(a,b,c){A.lastIndex=0;var d=A.exec(b.substring(c));return d?(a.m=B.get(d[0].toLowerCase()),c+d[0].length):-1}function g(a,b,c){y.lastIndex=0;var d=y.exec(b.substring(c));return d?(a.m=z.get(d[0].toLowerCase()),c+d[0].length):-1}function h(a,b,d){return c(a,C.c.toString(),b,d)}function i(a,b,d){return c(a,C.x.toString(),b,d)}function j(a,b,d){return c(a,C.X.toString(),b,d)}function k(a,b,c){var d=t.get(b.substring(c,c+=2).toLowerCase());return null==d?-1:(a.p=d,c)}var l=a.dateTime,m=a.date,n=a.time,o=a.periods,p=a.days,q=a.shortDays,r=a.months,s=a.shortMonths;b.utc=function(a){function c(a){try{di=Mb;var b=new di;return b._=a,d(b)}finally{di=Date}}var d=b(a);return c.parse=function(a){try{di=Mb;var b=d.parse(a);return b&&b._}finally{di=Date}},c.toString=d.toString,c},b.multi=b.utc.multi=hc;var t=Wg.map(),u=Rb(p),v=Sb(p),w=Rb(q),x=Sb(q),y=Rb(r),z=Sb(r),A=Rb(s),B=Sb(s);o.forEach(function(a,b){t.set(a.toLowerCase(),b)
});var C={a:function(a){return q[a.getDay()]},A:function(a){return p[a.getDay()]},b:function(a){return s[a.getMonth()]},B:function(a){return r[a.getMonth()]},c:b(l),d:function(a,b){return Qb(a.getDate(),b,2)},e:function(a,b){return Qb(a.getDate(),b,2)},H:function(a,b){return Qb(a.getHours(),b,2)},I:function(a,b){return Qb(a.getHours()%12||12,b,2)},j:function(a,b){return Qb(1+ci.dayOfYear(a),b,3)},L:function(a,b){return Qb(a.getMilliseconds(),b,3)},m:function(a,b){return Qb(a.getMonth()+1,b,2)},M:function(a,b){return Qb(a.getMinutes(),b,2)},p:function(a){return o[+(a.getHours()>=12)]},S:function(a,b){return Qb(a.getSeconds(),b,2)},U:function(a,b){return Qb(ci.sundayOfYear(a),b,2)},w:function(a){return a.getDay()},W:function(a,b){return Qb(ci.mondayOfYear(a),b,2)},x:b(m),X:b(n),y:function(a,b){return Qb(a.getFullYear()%100,b,2)},Y:function(a,b){return Qb(a.getFullYear()%1e4,b,4)},Z:fc,"%":function(){return"%"}},D={a:d,A:e,b:f,B:g,c:h,d:_b,e:_b,H:bc,I:bc,j:ac,L:ec,m:$b,M:cc,p:k,S:dc,U:Ub,w:Tb,W:Vb,x:i,X:j,y:Xb,Y:Wb,Z:Yb,"%":gc};return b}function Qb(a,b,c){var d=0>a?"-":"",e=(d?-a:a)+"",f=e.length;return d+(c>f?new Array(c-f+1).join(b)+e:e)}function Rb(a){return new RegExp("^(?:"+a.map(Wg.requote).join("|")+")","i")}function Sb(a){for(var b=new g,c=-1,d=a.length;++c<d;)b.set(a[c].toLowerCase(),c);return b}function Tb(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+1));return d?(a.w=+d[0],c+d[0].length):-1}function Ub(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c));return d?(a.U=+d[0],c+d[0].length):-1}function Vb(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c));return d?(a.W=+d[0],c+d[0].length):-1}function Wb(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+4));return d?(a.y=+d[0],c+d[0].length):-1}function Xb(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+2));return d?(a.y=Zb(+d[0]),c+d[0].length):-1}function Yb(a,b,c){return/^[+-]\d{4}$/.test(b=b.substring(c,c+5))?(a.Z=-b,c+5):-1}function Zb(a){return a+(a>68?1900:2e3)}function $b(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+2));return d?(a.m=d[0]-1,c+d[0].length):-1}function _b(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+2));return d?(a.d=+d[0],c+d[0].length):-1}function ac(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+3));return d?(a.j=+d[0],c+d[0].length):-1}function bc(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+2));return d?(a.H=+d[0],c+d[0].length):-1}function cc(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+2));return d?(a.M=+d[0],c+d[0].length):-1}function dc(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+2));return d?(a.S=+d[0],c+d[0].length):-1}function ec(a,b,c){gi.lastIndex=0;var d=gi.exec(b.substring(c,c+3));return d?(a.L=+d[0],c+d[0].length):-1}function fc(a){var b=a.getTimezoneOffset(),c=b>0?"-":"+",d=~~(ih(b)/60),e=ih(b)%60;return c+Qb(d,"0",2)+Qb(e,"0",2)}function gc(a,b,c){hi.lastIndex=0;var d=hi.exec(b.substring(c,c+1));return d?c+d[0].length:-1}function hc(a){for(var b=a.length,c=-1;++c<b;)a[c][0]=this(a[c][0]);return function(b){for(var c=0,d=a[c];!d[1](b);)d=a[++c];return d[0](b)}}function ic(){}function jc(a,b,c){var d=c.s=a+b,e=d-a,f=d-e;c.t=a-f+(b-e)}function kc(a,b){a&&li.hasOwnProperty(a.type)&&li[a.type](a,b)}function lc(a,b,c){var d,e=-1,f=a.length-c;for(b.lineStart();++e<f;)d=a[e],b.point(d[0],d[1],d[2]);b.lineEnd()}function mc(a,b){var c=-1,d=a.length;for(b.polygonStart();++c<d;)lc(a[c],b,1);b.polygonEnd()}function nc(){function a(a,b){a*=Eh,b=b*Eh/2+zh/4;var c=a-d,g=c>=0?1:-1,h=g*c,i=Math.cos(b),j=Math.sin(b),k=f*j,l=e*i+k*Math.cos(h),m=k*g*Math.sin(h);ni.add(Math.atan2(m,l)),d=a,e=i,f=j}var b,c,d,e,f;oi.point=function(g,h){oi.point=a,d=(b=g)*Eh,e=Math.cos(h=(c=h)*Eh/2+zh/4),f=Math.sin(h)},oi.lineEnd=function(){a(b,c)}}function oc(a){var b=a[0],c=a[1],d=Math.cos(c);return[d*Math.cos(b),d*Math.sin(b),Math.sin(c)]}function pc(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]}function qc(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function rc(a,b){a[0]+=b[0],a[1]+=b[1],a[2]+=b[2]}function sc(a,b){return[a[0]*b,a[1]*b,a[2]*b]}function tc(a){var b=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);a[0]/=b,a[1]/=b,a[2]/=b}function uc(a){return[Math.atan2(a[1],a[0]),Z(a[2])]}function vc(a,b){return ih(a[0]-b[0])<Ch&&ih(a[1]-b[1])<Ch}function wc(a,b){a*=Eh;var c=Math.cos(b*=Eh);xc(c*Math.cos(a),c*Math.sin(a),Math.sin(b))}function xc(a,b,c){++pi,ri+=(a-ri)/pi,si+=(b-si)/pi,ti+=(c-ti)/pi}function yc(){function a(a,e){a*=Eh;var f=Math.cos(e*=Eh),g=f*Math.cos(a),h=f*Math.sin(a),i=Math.sin(e),j=Math.atan2(Math.sqrt((j=c*i-d*h)*j+(j=d*g-b*i)*j+(j=b*h-c*g)*j),b*g+c*h+d*i);qi+=j,ui+=j*(b+(b=g)),vi+=j*(c+(c=h)),wi+=j*(d+(d=i)),xc(b,c,d)}var b,c,d;Ai.point=function(e,f){e*=Eh;var g=Math.cos(f*=Eh);b=g*Math.cos(e),c=g*Math.sin(e),d=Math.sin(f),Ai.point=a,xc(b,c,d)}}function zc(){Ai.point=wc}function Ac(){function a(a,b){a*=Eh;var c=Math.cos(b*=Eh),g=c*Math.cos(a),h=c*Math.sin(a),i=Math.sin(b),j=e*i-f*h,k=f*g-d*i,l=d*h-e*g,m=Math.sqrt(j*j+k*k+l*l),n=d*g+e*h+f*i,o=m&&-Y(n)/m,p=Math.atan2(m,n);xi+=o*j,yi+=o*k,zi+=o*l,qi+=p,ui+=p*(d+(d=g)),vi+=p*(e+(e=h)),wi+=p*(f+(f=i)),xc(d,e,f)}var b,c,d,e,f;Ai.point=function(g,h){b=g,c=h,Ai.point=a,g*=Eh;var i=Math.cos(h*=Eh);d=i*Math.cos(g),e=i*Math.sin(g),f=Math.sin(h),xc(d,e,f)},Ai.lineEnd=function(){a(b,c),Ai.lineEnd=zc,Ai.point=wc}}function Bc(){return!0}function Cc(a,b,c,d,e){var f=[],g=[];if(a.forEach(function(a){if(!((b=a.length-1)<=0)){var b,c=a[0],d=a[b];if(vc(c,d)){e.lineStart();for(var h=0;b>h;++h)e.point((c=a[h])[0],c[1]);return void e.lineEnd()}var i=new Ec(c,a,null,!0),j=new Ec(c,null,i,!1);i.o=j,f.push(i),g.push(j),i=new Ec(d,a,null,!1),j=new Ec(d,null,i,!0),i.o=j,f.push(i),g.push(j)}}),g.sort(b),Dc(f),Dc(g),f.length){for(var h=0,i=c,j=g.length;j>h;++h)g[h].e=i=!i;for(var k,l,m=f[0];;){for(var n=m,o=!0;n.v;)if((n=n.n)===m)return;k=n.z,e.lineStart();do{if(n.v=n.o.v=!0,n.e){if(o)for(var h=0,j=k.length;j>h;++h)e.point((l=k[h])[0],l[1]);else d(n.x,n.n.x,1,e);n=n.n}else{if(o){k=n.p.z;for(var h=k.length-1;h>=0;--h)e.point((l=k[h])[0],l[1])}else d(n.x,n.p.x,-1,e);n=n.p}n=n.o,k=n.z,o=!o}while(!n.v);e.lineEnd()}}}function Dc(a){if(b=a.length){for(var b,c,d=0,e=a[0];++d<b;)e.n=c=a[d],c.p=e,e=c;e.n=c=a[0],c.p=e}}function Ec(a,b,c,d){this.x=a,this.z=b,this.o=c,this.e=d,this.v=!1,this.n=this.p=null}function Fc(a,b,c,d){return function(e,f){function g(b,c){var d=e(b,c);a(b=d[0],c=d[1])&&f.point(b,c)}function h(a,b){var c=e(a,b);q.point(c[0],c[1])}function i(){s.point=h,q.lineStart()}function j(){s.point=g,q.lineEnd()}function k(a,b){p.push([a,b]);var c=e(a,b);u.point(c[0],c[1])}function l(){u.lineStart(),p=[]}function m(){k(p[0][0],p[0][1]),u.lineEnd();var a,b=u.clean(),c=t.buffer(),d=c.length;if(p.pop(),o.push(p),p=null,d)if(1&b){a=c[0];var e,d=a.length-1,g=-1;if(d>0){for(v||(f.polygonStart(),v=!0),f.lineStart();++g<d;)f.point((e=a[g])[0],e[1]);f.lineEnd()}}else d>1&&2&b&&c.push(c.pop().concat(c.shift())),n.push(c.filter(Gc))}var n,o,p,q=b(f),r=e.invert(d[0],d[1]),s={point:g,lineStart:i,lineEnd:j,polygonStart:function(){s.point=k,s.lineStart=l,s.lineEnd=m,n=[],o=[]},polygonEnd:function(){s.point=g,s.lineStart=i,s.lineEnd=j,n=Wg.merge(n);var a=Jc(r,o);n.length?(v||(f.polygonStart(),v=!0),Cc(n,Ic,a,c,f)):a&&(v||(f.polygonStart(),v=!0),f.lineStart(),c(null,null,1,f),f.lineEnd()),v&&(f.polygonEnd(),v=!1),n=o=null},sphere:function(){f.polygonStart(),f.lineStart(),c(null,null,1,f),f.lineEnd(),f.polygonEnd()}},t=Hc(),u=b(t),v=!1;return s}}function Gc(a){return a.length>1}function Hc(){var a,b=[];return{lineStart:function(){b.push(a=[])},point:function(b,c){a.push([b,c])},lineEnd:p,buffer:function(){var c=b;return b=[],a=null,c},rejoin:function(){b.length>1&&b.push(b.pop().concat(b.shift()))}}}function Ic(a,b){return((a=a.x)[0]<0?a[1]-Bh-Ch:Bh-a[1])-((b=b.x)[0]<0?b[1]-Bh-Ch:Bh-b[1])}function Jc(a,b){var c=a[0],d=a[1],e=[Math.sin(c),-Math.cos(c),0],f=0,g=0;ni.reset();for(var h=0,i=b.length;i>h;++h){var j=b[h],k=j.length;if(k)for(var l=j[0],m=l[0],n=l[1]/2+zh/4,o=Math.sin(n),p=Math.cos(n),q=1;;){q===k&&(q=0),a=j[q];var r=a[0],s=a[1]/2+zh/4,t=Math.sin(s),u=Math.cos(s),v=r-m,w=v>=0?1:-1,x=w*v,y=x>zh,z=o*t;if(ni.add(Math.atan2(z*w*Math.sin(x),p*u+z*Math.cos(x))),f+=y?v+w*Ah:v,y^m>=c^r>=c){var A=qc(oc(l),oc(a));tc(A);var B=qc(e,A);tc(B);var C=(y^v>=0?-1:1)*Z(B[2]);(d>C||d===C&&(A[0]||A[1]))&&(g+=y^v>=0?1:-1)}if(!q++)break;m=r,o=t,p=u,l=a}}return(-Ch>f||Ch>f&&0>ni)^1&g}function Kc(a){var b,c=0/0,d=0/0,e=0/0;return{lineStart:function(){a.lineStart(),b=1},point:function(f,g){var h=f>0?zh:-zh,i=ih(f-c);ih(i-zh)<Ch?(a.point(c,d=(d+g)/2>0?Bh:-Bh),a.point(e,d),a.lineEnd(),a.lineStart(),a.point(h,d),a.point(f,d),b=0):e!==h&&i>=zh&&(ih(c-e)<Ch&&(c-=e*Ch),ih(f-h)<Ch&&(f-=h*Ch),d=Lc(c,d,f,g),a.point(e,d),a.lineEnd(),a.lineStart(),a.point(h,d),b=0),a.point(c=f,d=g),e=h},lineEnd:function(){a.lineEnd(),c=d=0/0},clean:function(){return 2-b}}}function Lc(a,b,c,d){var e,f,g=Math.sin(a-c);return ih(g)>Ch?Math.atan((Math.sin(b)*(f=Math.cos(d))*Math.sin(c)-Math.sin(d)*(e=Math.cos(b))*Math.sin(a))/(e*f*g)):(b+d)/2}function Mc(a,b,c,d){var e;if(null==a)e=c*Bh,d.point(-zh,e),d.point(0,e),d.point(zh,e),d.point(zh,0),d.point(zh,-e),d.point(0,-e),d.point(-zh,-e),d.point(-zh,0),d.point(-zh,e);else if(ih(a[0]-b[0])>Ch){var f=a[0]<b[0]?zh:-zh;e=c*f/2,d.point(-f,e),d.point(0,e),d.point(f,e)}else d.point(b[0],b[1])}function Nc(a){function b(a,b){return Math.cos(a)*Math.cos(b)>f}function c(a){var c,f,i,j,k;return{lineStart:function(){j=i=!1,k=1},point:function(l,m){var n,o=[l,m],p=b(l,m),q=g?p?0:e(l,m):p?e(l+(0>l?zh:-zh),m):0;if(!c&&(j=i=p)&&a.lineStart(),p!==i&&(n=d(c,o),(vc(c,n)||vc(o,n))&&(o[0]+=Ch,o[1]+=Ch,p=b(o[0],o[1]))),p!==i)k=0,p?(a.lineStart(),n=d(o,c),a.point(n[0],n[1])):(n=d(c,o),a.point(n[0],n[1]),a.lineEnd()),c=n;else if(h&&c&&g^p){var r;q&f||!(r=d(o,c,!0))||(k=0,g?(a.lineStart(),a.point(r[0][0],r[0][1]),a.point(r[1][0],r[1][1]),a.lineEnd()):(a.point(r[1][0],r[1][1]),a.lineEnd(),a.lineStart(),a.point(r[0][0],r[0][1])))}!p||c&&vc(c,o)||a.point(o[0],o[1]),c=o,i=p,f=q},lineEnd:function(){i&&a.lineEnd(),c=null},clean:function(){return k|(j&&i)<<1}}}function d(a,b,c){var d=oc(a),e=oc(b),g=[1,0,0],h=qc(d,e),i=pc(h,h),j=h[0],k=i-j*j;if(!k)return!c&&a;var l=f*i/k,m=-f*j/k,n=qc(g,h),o=sc(g,l),p=sc(h,m);rc(o,p);var q=n,r=pc(o,q),s=pc(q,q),t=r*r-s*(pc(o,o)-1);if(!(0>t)){var u=Math.sqrt(t),v=sc(q,(-r-u)/s);if(rc(v,o),v=uc(v),!c)return v;var w,x=a[0],y=b[0],z=a[1],A=b[1];x>y&&(w=x,x=y,y=w);var B=y-x,C=ih(B-zh)<Ch,D=C||Ch>B;if(!C&&z>A&&(w=z,z=A,A=w),D?C?z+A>0^v[1]<(ih(v[0]-x)<Ch?z:A):z<=v[1]&&v[1]<=A:B>zh^(x<=v[0]&&v[0]<=y)){var E=sc(q,(-r+u)/s);return rc(E,o),[v,uc(E)]}}}function e(b,c){var d=g?a:zh-a,e=0;return-d>b?e|=1:b>d&&(e|=2),-d>c?e|=4:c>d&&(e|=8),e}var f=Math.cos(a),g=f>0,h=ih(f)>Ch,i=nd(a,6*Eh);return Fc(b,c,i,g?[0,-a]:[-zh,a-zh])}function Oc(a,b,c,d){return function(e){var f,g=e.a,h=e.b,i=g.x,j=g.y,k=h.x,l=h.y,m=0,n=1,o=k-i,p=l-j;if(f=a-i,o||!(f>0)){if(f/=o,0>o){if(m>f)return;n>f&&(n=f)}else if(o>0){if(f>n)return;f>m&&(m=f)}if(f=c-i,o||!(0>f)){if(f/=o,0>o){if(f>n)return;f>m&&(m=f)}else if(o>0){if(m>f)return;n>f&&(n=f)}if(f=b-j,p||!(f>0)){if(f/=p,0>p){if(m>f)return;n>f&&(n=f)}else if(p>0){if(f>n)return;f>m&&(m=f)}if(f=d-j,p||!(0>f)){if(f/=p,0>p){if(f>n)return;f>m&&(m=f)}else if(p>0){if(m>f)return;n>f&&(n=f)}return m>0&&(e.a={x:i+m*o,y:j+m*p}),1>n&&(e.b={x:i+n*o,y:j+n*p}),e}}}}}}function Pc(a,b,c,d){function e(d,e){return ih(d[0]-a)<Ch?e>0?0:3:ih(d[0]-c)<Ch?e>0?2:1:ih(d[1]-b)<Ch?e>0?1:0:e>0?3:2}function f(a,b){return g(a.x,b.x)}function g(a,b){var c=e(a,1),d=e(b,1);return c!==d?c-d:0===c?b[1]-a[1]:1===c?a[0]-b[0]:2===c?a[1]-b[1]:b[0]-a[0]}return function(h){function i(a){for(var b=0,c=q.length,d=a[1],e=0;c>e;++e)for(var f,g=1,h=q[e],i=h.length,j=h[0];i>g;++g)f=h[g],j[1]<=d?f[1]>d&&X(j,f,a)>0&&++b:f[1]<=d&&X(j,f,a)<0&&--b,j=f;return 0!==b}function j(f,h,i,j){var k=0,l=0;if(null==f||(k=e(f,i))!==(l=e(h,i))||g(f,h)<0^i>0){do j.point(0===k||3===k?a:c,k>1?d:b);while((k=(k+i+4)%4)!==l)}else j.point(h[0],h[1])}function k(e,f){return e>=a&&c>=e&&f>=b&&d>=f}function l(a,b){k(a,b)&&h.point(a,b)}function m(){D.point=o,q&&q.push(r=[]),y=!0,x=!1,v=w=0/0}function n(){p&&(o(s,t),u&&x&&B.rejoin(),p.push(B.buffer())),D.point=l,x&&h.lineEnd()}function o(a,b){a=Math.max(-Ci,Math.min(Ci,a)),b=Math.max(-Ci,Math.min(Ci,b));var c=k(a,b);if(q&&r.push([a,b]),y)s=a,t=b,u=c,y=!1,c&&(h.lineStart(),h.point(a,b));else if(c&&x)h.point(a,b);else{var d={a:{x:v,y:w},b:{x:a,y:b}};C(d)?(x||(h.lineStart(),h.point(d.a.x,d.a.y)),h.point(d.b.x,d.b.y),c||h.lineEnd(),z=!1):c&&(h.lineStart(),h.point(a,b),z=!1)}v=a,w=b,x=c}var p,q,r,s,t,u,v,w,x,y,z,A=h,B=Hc(),C=Oc(a,b,c,d),D={point:l,lineStart:m,lineEnd:n,polygonStart:function(){h=B,p=[],q=[],z=!0},polygonEnd:function(){h=A,p=Wg.merge(p);var b=i([a,d]),c=z&&b,e=p.length;(c||e)&&(h.polygonStart(),c&&(h.lineStart(),j(null,null,1,h),h.lineEnd()),e&&Cc(p,f,b,j,h),h.polygonEnd()),p=q=r=null}};return D}}function Qc(a,b){function c(c,d){return c=a(c,d),b(c[0],c[1])}return a.invert&&b.invert&&(c.invert=function(c,d){return c=b.invert(c,d),c&&a.invert(c[0],c[1])}),c}function Rc(a){var b=0,c=zh/3,d=fd(a),e=d(b,c);return e.parallels=function(a){return arguments.length?d(b=a[0]*zh/180,c=a[1]*zh/180):[b/zh*180,c/zh*180]},e}function Sc(a,b){function c(a,b){var c=Math.sqrt(f-2*e*Math.sin(b))/e;return[c*Math.sin(a*=e),g-c*Math.cos(a)]}var d=Math.sin(a),e=(d+Math.sin(b))/2,f=1+d*(2*e-d),g=Math.sqrt(f)/e;return c.invert=function(a,b){var c=g-b;return[Math.atan2(a,c)/e,Z((f-(a*a+c*c)*e*e)/(2*e))]},c}function Tc(){function a(a,b){Ei+=e*a-d*b,d=a,e=b}var b,c,d,e;Ji.point=function(f,g){Ji.point=a,b=d=f,c=e=g},Ji.lineEnd=function(){a(b,c)}}function Uc(a,b){Fi>a&&(Fi=a),a>Hi&&(Hi=a),Gi>b&&(Gi=b),b>Ii&&(Ii=b)}function Vc(){function a(a,b){g.push("M",a,",",b,f)}function b(a,b){g.push("M",a,",",b),h.point=c}function c(a,b){g.push("L",a,",",b)}function d(){h.point=a}function e(){g.push("Z")}var f=Wc(4.5),g=[],h={point:a,lineStart:function(){h.point=b},lineEnd:d,polygonStart:function(){h.lineEnd=e},polygonEnd:function(){h.lineEnd=d,h.point=a},pointRadius:function(a){return f=Wc(a),h},result:function(){if(g.length){var a=g.join("");return g=[],a}}};return h}function Wc(a){return"m0,"+a+"a"+a+","+a+" 0 1,1 0,"+-2*a+"a"+a+","+a+" 0 1,1 0,"+2*a+"z"}function Xc(a,b){ri+=a,si+=b,++ti}function Yc(){function a(a,d){var e=a-b,f=d-c,g=Math.sqrt(e*e+f*f);ui+=g*(b+a)/2,vi+=g*(c+d)/2,wi+=g,Xc(b=a,c=d)}var b,c;Li.point=function(d,e){Li.point=a,Xc(b=d,c=e)}}function Zc(){Li.point=Xc}function $c(){function a(a,b){var c=a-d,f=b-e,g=Math.sqrt(c*c+f*f);ui+=g*(d+a)/2,vi+=g*(e+b)/2,wi+=g,g=e*a-d*b,xi+=g*(d+a),yi+=g*(e+b),zi+=3*g,Xc(d=a,e=b)}var b,c,d,e;Li.point=function(f,g){Li.point=a,Xc(b=d=f,c=e=g)},Li.lineEnd=function(){a(b,c)}}function _c(a){function b(b,c){a.moveTo(b,c),a.arc(b,c,g,0,Ah)}function c(b,c){a.moveTo(b,c),h.point=d}function d(b,c){a.lineTo(b,c)}function e(){h.point=b}function f(){a.closePath()}var g=4.5,h={point:b,lineStart:function(){h.point=c},lineEnd:e,polygonStart:function(){h.lineEnd=f},polygonEnd:function(){h.lineEnd=e,h.point=b},pointRadius:function(a){return g=a,h},result:p};return h}function ad(a){function b(a){return(h?d:c)(a)}function c(b){return dd(b,function(c,d){c=a(c,d),b.point(c[0],c[1])})}function d(b){function c(c,d){c=a(c,d),b.point(c[0],c[1])}function d(){t=0/0,y.point=f,b.lineStart()}function f(c,d){var f=oc([c,d]),g=a(c,d);e(t,u,s,v,w,x,t=g[0],u=g[1],s=c,v=f[0],w=f[1],x=f[2],h,b),b.point(t,u)}function g(){y.point=c,b.lineEnd()}function i(){d(),y.point=j,y.lineEnd=k}function j(a,b){f(l=a,m=b),n=t,o=u,p=v,q=w,r=x,y.point=f}function k(){e(t,u,s,v,w,x,n,o,l,p,q,r,h,b),y.lineEnd=g,g()}var l,m,n,o,p,q,r,s,t,u,v,w,x,y={point:c,lineStart:d,lineEnd:g,polygonStart:function(){b.polygonStart(),y.lineStart=i},polygonEnd:function(){b.polygonEnd(),y.lineStart=d}};return y}function e(b,c,d,h,i,j,k,l,m,n,o,p,q,r){var s=k-b,t=l-c,u=s*s+t*t;if(u>4*f&&q--){var v=h+n,w=i+o,x=j+p,y=Math.sqrt(v*v+w*w+x*x),z=Math.asin(x/=y),A=ih(ih(x)-1)<Ch||ih(d-m)<Ch?(d+m)/2:Math.atan2(w,v),B=a(A,z),C=B[0],D=B[1],E=C-b,F=D-c,G=t*E-s*F;(G*G/u>f||ih((s*E+t*F)/u-.5)>.3||g>h*n+i*o+j*p)&&(e(b,c,d,h,i,j,C,D,A,v/=y,w/=y,x,q,r),r.point(C,D),e(C,D,A,v,w,x,k,l,m,n,o,p,q,r))}}var f=.5,g=Math.cos(30*Eh),h=16;return b.precision=function(a){return arguments.length?(h=(f=a*a)>0&&16,b):Math.sqrt(f)},b}function bd(a){var b=ad(function(b,c){return a([b*Fh,c*Fh])});return function(a){return gd(b(a))}}function cd(a){this.stream=a}function dd(a,b){return{point:b,sphere:function(){a.sphere()},lineStart:function(){a.lineStart()},lineEnd:function(){a.lineEnd()},polygonStart:function(){a.polygonStart()},polygonEnd:function(){a.polygonEnd()}}}function ed(a){return fd(function(){return a})()}function fd(a){function b(a){return a=h(a[0]*Eh,a[1]*Eh),[a[0]*m+i,j-a[1]*m]}function c(a){return a=h.invert((a[0]-i)/m,(j-a[1])/m),a&&[a[0]*Fh,a[1]*Fh]}function d(){h=Qc(g=jd(r,s,t),f);var a=f(p,q);return i=n-a[0]*m,j=o+a[1]*m,e()}function e(){return k&&(k.valid=!1,k=null),b}var f,g,h,i,j,k,l=ad(function(a,b){return a=f(a,b),[a[0]*m+i,j-a[1]*m]}),m=150,n=480,o=250,p=0,q=0,r=0,s=0,t=0,u=Bi,v=Bb,w=null,x=null;return b.stream=function(a){return k&&(k.valid=!1),k=gd(u(g,l(v(a)))),k.valid=!0,k},b.clipAngle=function(a){return arguments.length?(u=null==a?(w=a,Bi):Nc((w=+a)*Eh),e()):w},b.clipExtent=function(a){return arguments.length?(x=a,v=a?Pc(a[0][0],a[0][1],a[1][0],a[1][1]):Bb,e()):x},b.scale=function(a){return arguments.length?(m=+a,d()):m},b.translate=function(a){return arguments.length?(n=+a[0],o=+a[1],d()):[n,o]},b.center=function(a){return arguments.length?(p=a[0]%360*Eh,q=a[1]%360*Eh,d()):[p*Fh,q*Fh]},b.rotate=function(a){return arguments.length?(r=a[0]%360*Eh,s=a[1]%360*Eh,t=a.length>2?a[2]%360*Eh:0,d()):[r*Fh,s*Fh,t*Fh]},Wg.rebind(b,l,"precision"),function(){return f=a.apply(this,arguments),b.invert=f.invert&&c,d()}}function gd(a){return dd(a,function(b,c){a.point(b*Eh,c*Eh)})}function hd(a,b){return[a,b]}function id(a,b){return[a>zh?a-Ah:-zh>a?a+Ah:a,b]}function jd(a,b,c){return a?b||c?Qc(ld(a),md(b,c)):ld(a):b||c?md(b,c):id}function kd(a){return function(b,c){return b+=a,[b>zh?b-Ah:-zh>b?b+Ah:b,c]}}function ld(a){var b=kd(a);return b.invert=kd(-a),b}function md(a,b){function c(a,b){var c=Math.cos(b),h=Math.cos(a)*c,i=Math.sin(a)*c,j=Math.sin(b),k=j*d+h*e;return[Math.atan2(i*f-k*g,h*d-j*e),Z(k*f+i*g)]}var d=Math.cos(a),e=Math.sin(a),f=Math.cos(b),g=Math.sin(b);return c.invert=function(a,b){var c=Math.cos(b),h=Math.cos(a)*c,i=Math.sin(a)*c,j=Math.sin(b),k=j*f-i*g;return[Math.atan2(i*f+j*g,h*d+k*e),Z(k*d-h*e)]},c}function nd(a,b){var c=Math.cos(a),d=Math.sin(a);return function(e,f,g,h){var i=g*b;null!=e?(e=od(c,e),f=od(c,f),(g>0?f>e:e>f)&&(e+=g*Ah)):(e=a+g*Ah,f=a-.5*i);for(var j,k=e;g>0?k>f:f>k;k-=i)h.point((j=uc([c,-d*Math.cos(k),-d*Math.sin(k)]))[0],j[1])}}function od(a,b){var c=oc(b);c[0]-=a,tc(c);var d=Y(-c[1]);return((-c[2]<0?-d:d)+2*Math.PI-Ch)%(2*Math.PI)}function pd(a,b,c){var d=Wg.range(a,b-Ch,c).concat(b);return function(a){return d.map(function(b){return[a,b]})}}function qd(a,b,c){var d=Wg.range(a,b-Ch,c).concat(b);return function(a){return d.map(function(b){return[b,a]})}}function rd(a){return a.source}function sd(a){return a.target}function td(a,b,c,d){var e=Math.cos(b),f=Math.sin(b),g=Math.cos(d),h=Math.sin(d),i=e*Math.cos(a),j=e*Math.sin(a),k=g*Math.cos(c),l=g*Math.sin(c),m=2*Math.asin(Math.sqrt(bb(d-b)+e*g*bb(c-a))),n=1/Math.sin(m),o=m?function(a){var b=Math.sin(a*=m)*n,c=Math.sin(m-a)*n,d=c*i+b*k,e=c*j+b*l,g=c*f+b*h;return[Math.atan2(e,d)*Fh,Math.atan2(g,Math.sqrt(d*d+e*e))*Fh]}:function(){return[a*Fh,b*Fh]};return o.distance=m,o}function ud(){function a(a,e){var f=Math.sin(e*=Eh),g=Math.cos(e),h=ih((a*=Eh)-b),i=Math.cos(h);Mi+=Math.atan2(Math.sqrt((h=g*Math.sin(h))*h+(h=d*f-c*g*i)*h),c*f+d*g*i),b=a,c=f,d=g}var b,c,d;Ni.point=function(e,f){b=e*Eh,c=Math.sin(f*=Eh),d=Math.cos(f),Ni.point=a},Ni.lineEnd=function(){Ni.point=Ni.lineEnd=p}}function vd(a,b){function c(b,c){var d=Math.cos(b),e=Math.cos(c),f=a(d*e);return[f*e*Math.sin(b),f*Math.sin(c)]}return c.invert=function(a,c){var d=Math.sqrt(a*a+c*c),e=b(d),f=Math.sin(e),g=Math.cos(e);return[Math.atan2(a*f,d*g),Math.asin(d&&c*f/d)]},c}function wd(a,b){function c(a,b){g>0?-Bh+Ch>b&&(b=-Bh+Ch):b>Bh-Ch&&(b=Bh-Ch);var c=g/Math.pow(e(b),f);return[c*Math.sin(f*a),g-c*Math.cos(f*a)]}var d=Math.cos(a),e=function(a){return Math.tan(zh/4+a/2)},f=a===b?Math.sin(a):Math.log(d/Math.cos(b))/Math.log(e(b)/e(a)),g=d*Math.pow(e(a),f)/f;return f?(c.invert=function(a,b){var c=g-b,d=W(f)*Math.sqrt(a*a+c*c);return[Math.atan2(a,c)/f,2*Math.atan(Math.pow(g/d,1/f))-Bh]},c):yd}function xd(a,b){function c(a,b){var c=f-b;return[c*Math.sin(e*a),f-c*Math.cos(e*a)]}var d=Math.cos(a),e=a===b?Math.sin(a):(d-Math.cos(b))/(b-a),f=d/e+a;return ih(e)<Ch?hd:(c.invert=function(a,b){var c=f-b;return[Math.atan2(a,c)/e,f-W(e)*Math.sqrt(a*a+c*c)]},c)}function yd(a,b){return[a,Math.log(Math.tan(zh/4+b/2))]}function zd(a){var b,c=ed(a),d=c.scale,e=c.translate,f=c.clipExtent;return c.scale=function(){var a=d.apply(c,arguments);return a===c?b?c.clipExtent(null):c:a},c.translate=function(){var a=e.apply(c,arguments);return a===c?b?c.clipExtent(null):c:a},c.clipExtent=function(a){var g=f.apply(c,arguments);if(g===c){if(b=null==a){var h=zh*d(),i=e();f([[i[0]-h,i[1]-h],[i[0]+h,i[1]+h]])}}else b&&(g=null);return g},c.clipExtent(null)}function Ad(a,b){return[Math.log(Math.tan(zh/4+b/2)),-a]}function Bd(a){return a[0]}function Cd(a){return a[1]}function Dd(a){for(var b=a.length,c=[0,1],d=2,e=2;b>e;e++){for(;d>1&&X(a[c[d-2]],a[c[d-1]],a[e])<=0;)--d;c[d++]=e}return c.slice(0,d)}function Ed(a,b){return a[0]-b[0]||a[1]-b[1]}function Fd(a,b,c){return(c[0]-b[0])*(a[1]-b[1])<(c[1]-b[1])*(a[0]-b[0])}function Gd(a,b,c,d){var e=a[0],f=c[0],g=b[0]-e,h=d[0]-f,i=a[1],j=c[1],k=b[1]-i,l=d[1]-j,m=(h*(i-j)-l*(e-f))/(l*g-h*k);return[e+m*g,i+m*k]}function Hd(a){var b=a[0],c=a[a.length-1];return!(b[0]-c[0]||b[1]-c[1])}function Id(){be(this),this.edge=this.site=this.circle=null}function Jd(a){var b=Zi.pop()||new Id;return b.site=a,b}function Kd(a){Ud(a),Wi.remove(a),Zi.push(a),be(a)}function Ld(a){var b=a.circle,c=b.x,d=b.cy,e={x:c,y:d},f=a.P,g=a.N,h=[a];Kd(a);for(var i=f;i.circle&&ih(c-i.circle.x)<Ch&&ih(d-i.circle.cy)<Ch;)f=i.P,h.unshift(i),Kd(i),i=f;h.unshift(i),Ud(i);for(var j=g;j.circle&&ih(c-j.circle.x)<Ch&&ih(d-j.circle.cy)<Ch;)g=j.N,h.push(j),Kd(j),j=g;h.push(j),Ud(j);var k,l=h.length;for(k=1;l>k;++k)j=h[k],i=h[k-1],$d(j.edge,i.site,j.site,e);i=h[0],j=h[l-1],j.edge=Yd(i.site,j.site,null,e),Td(i),Td(j)}function Md(a){for(var b,c,d,e,f=a.x,g=a.y,h=Wi._;h;)if(d=Nd(h,g)-f,d>Ch)h=h.L;else{if(e=f-Od(h,g),!(e>Ch)){d>-Ch?(b=h.P,c=h):e>-Ch?(b=h,c=h.N):b=c=h;break}if(!h.R){b=h;break}h=h.R}var i=Jd(a);if(Wi.insert(b,i),b||c){if(b===c)return Ud(b),c=Jd(b.site),Wi.insert(i,c),i.edge=c.edge=Yd(b.site,i.site),Td(b),void Td(c);if(!c)return void(i.edge=Yd(b.site,i.site));Ud(b),Ud(c);var j=b.site,k=j.x,l=j.y,m=a.x-k,n=a.y-l,o=c.site,p=o.x-k,q=o.y-l,r=2*(m*q-n*p),s=m*m+n*n,t=p*p+q*q,u={x:(q*s-n*t)/r+k,y:(m*t-p*s)/r+l};$d(c.edge,j,o,u),i.edge=Yd(j,a,null,u),c.edge=Yd(a,o,null,u),Td(b),Td(c)}}function Nd(a,b){var c=a.site,d=c.x,e=c.y,f=e-b;if(!f)return d;var g=a.P;if(!g)return-1/0;c=g.site;var h=c.x,i=c.y,j=i-b;if(!j)return h;var k=h-d,l=1/f-1/j,m=k/j;return l?(-m+Math.sqrt(m*m-2*l*(k*k/(-2*j)-i+j/2+e-f/2)))/l+d:(d+h)/2}function Od(a,b){var c=a.N;if(c)return Nd(c,b);var d=a.site;return d.y===b?d.x:1/0}function Pd(a){this.site=a,this.edges=[]}function Qd(a){for(var b,c,d,e,f,g,h,i,j,k,l=a[0][0],m=a[1][0],n=a[0][1],o=a[1][1],p=Vi,q=p.length;q--;)if(f=p[q],f&&f.prepare())for(h=f.edges,i=h.length,g=0;i>g;)k=h[g].end(),d=k.x,e=k.y,j=h[++g%i].start(),b=j.x,c=j.y,(ih(d-b)>Ch||ih(e-c)>Ch)&&(h.splice(g,0,new _d(Zd(f.site,k,ih(d-l)<Ch&&o-e>Ch?{x:l,y:ih(b-l)<Ch?c:o}:ih(e-o)<Ch&&m-d>Ch?{x:ih(c-o)<Ch?b:m,y:o}:ih(d-m)<Ch&&e-n>Ch?{x:m,y:ih(b-m)<Ch?c:n}:ih(e-n)<Ch&&d-l>Ch?{x:ih(c-n)<Ch?b:l,y:n}:null),f.site,null)),++i)}function Rd(a,b){return b.angle-a.angle}function Sd(){be(this),this.x=this.y=this.arc=this.site=this.cy=null}function Td(a){var b=a.P,c=a.N;if(b&&c){var d=b.site,e=a.site,f=c.site;if(d!==f){var g=e.x,h=e.y,i=d.x-g,j=d.y-h,k=f.x-g,l=f.y-h,m=2*(i*l-j*k);if(!(m>=-Dh)){var n=i*i+j*j,o=k*k+l*l,p=(l*n-j*o)/m,q=(i*o-k*n)/m,l=q+h,r=$i.pop()||new Sd;r.arc=a,r.site=e,r.x=p+g,r.y=l+Math.sqrt(p*p+q*q),r.cy=l,a.circle=r;for(var s=null,t=Yi._;t;)if(r.y<t.y||r.y===t.y&&r.x<=t.x){if(!t.L){s=t.P;break}t=t.L}else{if(!t.R){s=t;break}t=t.R}Yi.insert(s,r),s||(Xi=r)}}}}function Ud(a){var b=a.circle;b&&(b.P||(Xi=b.N),Yi.remove(b),$i.push(b),be(b),a.circle=null)}function Vd(a){for(var b,c=Ui,d=Oc(a[0][0],a[0][1],a[1][0],a[1][1]),e=c.length;e--;)b=c[e],(!Wd(b,a)||!d(b)||ih(b.a.x-b.b.x)<Ch&&ih(b.a.y-b.b.y)<Ch)&&(b.a=b.b=null,c.splice(e,1))}function Wd(a,b){var c=a.b;if(c)return!0;var d,e,f=a.a,g=b[0][0],h=b[1][0],i=b[0][1],j=b[1][1],k=a.l,l=a.r,m=k.x,n=k.y,o=l.x,p=l.y,q=(m+o)/2,r=(n+p)/2;if(p===n){if(g>q||q>=h)return;if(m>o){if(f){if(f.y>=j)return}else f={x:q,y:i};c={x:q,y:j}}else{if(f){if(f.y<i)return}else f={x:q,y:j};c={x:q,y:i}}}else if(d=(m-o)/(p-n),e=r-d*q,-1>d||d>1)if(m>o){if(f){if(f.y>=j)return}else f={x:(i-e)/d,y:i};c={x:(j-e)/d,y:j}}else{if(f){if(f.y<i)return}else f={x:(j-e)/d,y:j};c={x:(i-e)/d,y:i}}else if(p>n){if(f){if(f.x>=h)return}else f={x:g,y:d*g+e};c={x:h,y:d*h+e}}else{if(f){if(f.x<g)return}else f={x:h,y:d*h+e};c={x:g,y:d*g+e}}return a.a=f,a.b=c,!0}function Xd(a,b){this.l=a,this.r=b,this.a=this.b=null}function Yd(a,b,c,d){var e=new Xd(a,b);return Ui.push(e),c&&$d(e,a,b,c),d&&$d(e,b,a,d),Vi[a.i].edges.push(new _d(e,a,b)),Vi[b.i].edges.push(new _d(e,b,a)),e}function Zd(a,b,c){var d=new Xd(a,null);return d.a=b,d.b=c,Ui.push(d),d}function $d(a,b,c,d){a.a||a.b?a.l===c?a.b=d:a.a=d:(a.a=d,a.l=b,a.r=c)}function _d(a,b,c){var d=a.a,e=a.b;this.edge=a,this.site=b,this.angle=c?Math.atan2(c.y-b.y,c.x-b.x):a.l===b?Math.atan2(e.x-d.x,d.y-e.y):Math.atan2(d.x-e.x,e.y-d.y)}function ae(){this._=null}function be(a){a.U=a.C=a.L=a.R=a.P=a.N=null}function ce(a,b){var c=b,d=b.R,e=c.U;e?e.L===c?e.L=d:e.R=d:a._=d,d.U=e,c.U=d,c.R=d.L,c.R&&(c.R.U=c),d.L=c}function de(a,b){var c=b,d=b.L,e=c.U;e?e.L===c?e.L=d:e.R=d:a._=d,d.U=e,c.U=d,c.L=d.R,c.L&&(c.L.U=c),d.R=c}function ee(a){for(;a.L;)a=a.L;return a}function fe(a,b){var c,d,e,f=a.sort(ge).pop();for(Ui=[],Vi=new Array(a.length),Wi=new ae,Yi=new ae;;)if(e=Xi,f&&(!e||f.y<e.y||f.y===e.y&&f.x<e.x))(f.x!==c||f.y!==d)&&(Vi[f.i]=new Pd(f),Md(f),c=f.x,d=f.y),f=a.pop();else{if(!e)break;Ld(e.arc)}b&&(Vd(b),Qd(b));var g={cells:Vi,edges:Ui};return Wi=Yi=Ui=Vi=null,g}function ge(a,b){return b.y-a.y||b.x-a.x}function he(a,b,c){return(a.x-c.x)*(b.y-a.y)-(a.x-b.x)*(c.y-a.y)}function ie(a){return a.x}function je(a){return a.y}function ke(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function le(a,b,c,d,e,f){if(!a(b,c,d,e,f)){var g=.5*(c+e),h=.5*(d+f),i=b.nodes;i[0]&&le(a,i[0],c,d,g,h),i[1]&&le(a,i[1],g,d,e,h),i[2]&&le(a,i[2],c,h,g,f),i[3]&&le(a,i[3],g,h,e,f)}}function me(a,b){a=Wg.rgb(a),b=Wg.rgb(b);var c=a.r,d=a.g,e=a.b,f=b.r-c,g=b.g-d,h=b.b-e;return function(a){return"#"+ub(Math.round(c+f*a))+ub(Math.round(d+g*a))+ub(Math.round(e+h*a))}}function ne(a,b){var c,d={},e={};for(c in a)c in b?d[c]=qe(a[c],b[c]):e[c]=a[c];for(c in b)c in a||(e[c]=b[c]);return function(a){for(c in d)e[c]=d[c](a);return e}}function oe(a,b){return b-=a=+a,function(c){return a+b*c}}function pe(a,b){var c,d,e,f=aj.lastIndex=bj.lastIndex=0,g=-1,h=[],i=[];for(a+="",b+="";(c=aj.exec(a))&&(d=bj.exec(b));)(e=d.index)>f&&(e=b.substring(f,e),h[g]?h[g]+=e:h[++g]=e),(c=c[0])===(d=d[0])?h[g]?h[g]+=d:h[++g]=d:(h[++g]=null,i.push({i:g,x:oe(c,d)})),f=bj.lastIndex;return f<b.length&&(e=b.substring(f),h[g]?h[g]+=e:h[++g]=e),h.length<2?i[0]?(b=i[0].x,function(a){return b(a)+""}):function(){return b}:(b=i.length,function(a){for(var c,d=0;b>d;++d)h[(c=i[d]).i]=c.x(a);return h.join("")})}function qe(a,b){for(var c,d=Wg.interpolators.length;--d>=0&&!(c=Wg.interpolators[d](a,b)););return c}function re(a,b){var c,d=[],e=[],f=a.length,g=b.length,h=Math.min(a.length,b.length);for(c=0;h>c;++c)d.push(qe(a[c],b[c]));for(;f>c;++c)e[c]=a[c];for(;g>c;++c)e[c]=b[c];return function(a){for(c=0;h>c;++c)e[c]=d[c](a);return e}}function se(a){return function(b){return 0>=b?0:b>=1?1:a(b)}}function te(a){return function(b){return 1-a(1-b)}}function ue(a){return function(b){return.5*(.5>b?a(2*b):2-a(2-2*b))}}function ve(a){return a*a}function we(a){return a*a*a}function xe(a){if(0>=a)return 0;if(a>=1)return 1;var b=a*a,c=b*a;return 4*(.5>a?c:3*(a-b)+c-.75)}function ye(a){return function(b){return Math.pow(b,a)}}function ze(a){return 1-Math.cos(a*Bh)}function Ae(a){return Math.pow(2,10*(a-1))}function Be(a){return 1-Math.sqrt(1-a*a)}function Ce(a,b){var c;return arguments.length<2&&(b=.45),arguments.length?c=b/Ah*Math.asin(1/a):(a=1,c=b/4),function(d){return 1+a*Math.pow(2,-10*d)*Math.sin((d-c)*Ah/b)}}function De(a){return a||(a=1.70158),function(b){return b*b*((a+1)*b-a)}}function Ee(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}function Fe(a,b){a=Wg.hcl(a),b=Wg.hcl(b);var c=a.h,d=a.c,e=a.l,f=b.h-c,g=b.c-d,h=b.l-e;return isNaN(g)&&(g=0,d=isNaN(d)?b.c:d),isNaN(f)?(f=0,c=isNaN(c)?b.h:c):f>180?f-=360:-180>f&&(f+=360),function(a){return ib(c+f*a,d+g*a,e+h*a)+""}}function Ge(a,b){a=Wg.hsl(a),b=Wg.hsl(b);var c=a.h,d=a.s,e=a.l,f=b.h-c,g=b.s-d,h=b.l-e;return isNaN(g)&&(g=0,d=isNaN(d)?b.s:d),isNaN(f)?(f=0,c=isNaN(c)?b.h:c):f>180?f-=360:-180>f&&(f+=360),function(a){return fb(c+f*a,d+g*a,e+h*a)+""}}function He(a,b){a=Wg.lab(a),b=Wg.lab(b);var c=a.l,d=a.a,e=a.b,f=b.l-c,g=b.a-d,h=b.b-e;return function(a){return lb(c+f*a,d+g*a,e+h*a)+""}}function Ie(a,b){return b-=a,function(c){return Math.round(a+b*c)}}function Je(a){var b=[a.a,a.b],c=[a.c,a.d],d=Le(b),e=Ke(b,c),f=Le(Me(c,b,-e))||0;b[0]*c[1]<c[0]*b[1]&&(b[0]*=-1,b[1]*=-1,d*=-1,e*=-1),this.rotate=(d?Math.atan2(b[1],b[0]):Math.atan2(-c[0],c[1]))*Fh,this.translate=[a.e,a.f],this.scale=[d,f],this.skew=f?Math.atan2(e,f)*Fh:0}function Ke(a,b){return a[0]*b[0]+a[1]*b[1]}function Le(a){var b=Math.sqrt(Ke(a,a));return b&&(a[0]/=b,a[1]/=b),b}function Me(a,b,c){return a[0]+=c*b[0],a[1]+=c*b[1],a}function Ne(a,b){var c,d=[],e=[],f=Wg.transform(a),g=Wg.transform(b),h=f.translate,i=g.translate,j=f.rotate,k=g.rotate,l=f.skew,m=g.skew,n=f.scale,o=g.scale;return h[0]!=i[0]||h[1]!=i[1]?(d.push("translate(",null,",",null,")"),e.push({i:1,x:oe(h[0],i[0])},{i:3,x:oe(h[1],i[1])})):d.push(i[0]||i[1]?"translate("+i+")":""),j!=k?(j-k>180?k+=360:k-j>180&&(j+=360),e.push({i:d.push(d.pop()+"rotate(",null,")")-2,x:oe(j,k)})):k&&d.push(d.pop()+"rotate("+k+")"),l!=m?e.push({i:d.push(d.pop()+"skewX(",null,")")-2,x:oe(l,m)}):m&&d.push(d.pop()+"skewX("+m+")"),n[0]!=o[0]||n[1]!=o[1]?(c=d.push(d.pop()+"scale(",null,",",null,")"),e.push({i:c-4,x:oe(n[0],o[0])},{i:c-2,x:oe(n[1],o[1])})):(1!=o[0]||1!=o[1])&&d.push(d.pop()+"scale("+o+")"),c=e.length,function(a){for(var b,f=-1;++f<c;)d[(b=e[f]).i]=b.x(a);return d.join("")}}function Oe(a,b){return b=b-(a=+a)?1/(b-a):0,function(c){return(c-a)*b}}function Pe(a,b){return b=b-(a=+a)?1/(b-a):0,function(c){return Math.max(0,Math.min(1,(c-a)*b))}}function Qe(a){for(var b=a.source,c=a.target,d=Se(b,c),e=[b];b!==d;)b=b.parent,e.push(b);for(var f=e.length;c!==d;)e.splice(f,0,c),c=c.parent;return e}function Re(a){for(var b=[],c=a.parent;null!=c;)b.push(a),a=c,c=c.parent;return b.push(a),b}function Se(a,b){if(a===b)return a;for(var c=Re(a),d=Re(b),e=c.pop(),f=d.pop(),g=null;e===f;)g=e,e=c.pop(),f=d.pop();return g}function Te(a){a.fixed|=2}function Ue(a){a.fixed&=-7}function Ve(a){a.fixed|=4,a.px=a.x,a.py=a.y}function We(a){a.fixed&=-5}function Xe(a,b,c){var d=0,e=0;if(a.charge=0,!a.leaf)for(var f,g=a.nodes,h=g.length,i=-1;++i<h;)f=g[i],null!=f&&(Xe(f,b,c),a.charge+=f.charge,d+=f.charge*f.cx,e+=f.charge*f.cy);if(a.point){a.leaf||(a.point.x+=Math.random()-.5,a.point.y+=Math.random()-.5);var j=b*c[a.point.index];a.charge+=a.pointCharge=j,d+=j*a.point.x,e+=j*a.point.y}a.cx=d/a.charge,a.cy=e/a.charge
}function Ye(a,b){return Wg.rebind(a,b,"sort","children","value"),a.nodes=a,a.links=cf,a}function Ze(a,b){for(var c=[a];null!=(a=c.pop());)if(b(a),(e=a.children)&&(d=e.length))for(var d,e;--d>=0;)c.push(e[d])}function $e(a,b){for(var c=[a],d=[];null!=(a=c.pop());)if(d.push(a),(f=a.children)&&(e=f.length))for(var e,f,g=-1;++g<e;)c.push(f[g]);for(;null!=(a=d.pop());)b(a)}function _e(a){return a.children}function af(a){return a.value}function bf(a,b){return b.value-a.value}function cf(a){return Wg.merge(a.map(function(a){return(a.children||[]).map(function(b){return{source:a,target:b}})}))}function df(a){return a.x}function ef(a){return a.y}function ff(a,b,c){a.y0=b,a.y=c}function gf(a){return Wg.range(a.length)}function hf(a){for(var b=-1,c=a[0].length,d=[];++b<c;)d[b]=0;return d}function jf(a){for(var b,c=1,d=0,e=a[0][1],f=a.length;f>c;++c)(b=a[c][1])>e&&(d=c,e=b);return d}function kf(a){return a.reduce(lf,0)}function lf(a,b){return a+b[1]}function mf(a,b){return nf(a,Math.ceil(Math.log(b.length)/Math.LN2+1))}function nf(a,b){for(var c=-1,d=+a[0],e=(a[1]-d)/b,f=[];++c<=b;)f[c]=e*c+d;return f}function of(a){return[Wg.min(a),Wg.max(a)]}function pf(a,b){return a.value-b.value}function qf(a,b){var c=a._pack_next;a._pack_next=b,b._pack_prev=a,b._pack_next=c,c._pack_prev=b}function rf(a,b){a._pack_next=b,b._pack_prev=a}function sf(a,b){var c=b.x-a.x,d=b.y-a.y,e=a.r+b.r;return.999*e*e>c*c+d*d}function tf(a){function b(a){k=Math.min(a.x-a.r,k),l=Math.max(a.x+a.r,l),m=Math.min(a.y-a.r,m),n=Math.max(a.y+a.r,n)}if((c=a.children)&&(j=c.length)){var c,d,e,f,g,h,i,j,k=1/0,l=-1/0,m=1/0,n=-1/0;if(c.forEach(uf),d=c[0],d.x=-d.r,d.y=0,b(d),j>1&&(e=c[1],e.x=e.r,e.y=0,b(e),j>2))for(f=c[2],xf(d,e,f),b(f),qf(d,f),d._pack_prev=f,qf(f,e),e=d._pack_next,g=3;j>g;g++){xf(d,e,f=c[g]);var o=0,p=1,q=1;for(h=e._pack_next;h!==e;h=h._pack_next,p++)if(sf(h,f)){o=1;break}if(1==o)for(i=d._pack_prev;i!==h._pack_prev&&!sf(i,f);i=i._pack_prev,q++);o?(q>p||p==q&&e.r<d.r?rf(d,e=h):rf(d=i,e),g--):(qf(d,f),e=f,b(f))}var r=(k+l)/2,s=(m+n)/2,t=0;for(g=0;j>g;g++)f=c[g],f.x-=r,f.y-=s,t=Math.max(t,f.r+Math.sqrt(f.x*f.x+f.y*f.y));a.r=t,c.forEach(vf)}}function uf(a){a._pack_next=a._pack_prev=a}function vf(a){delete a._pack_next,delete a._pack_prev}function wf(a,b,c,d){var e=a.children;if(a.x=b+=d*a.x,a.y=c+=d*a.y,a.r*=d,e)for(var f=-1,g=e.length;++f<g;)wf(e[f],b,c,d)}function xf(a,b,c){var d=a.r+c.r,e=b.x-a.x,f=b.y-a.y;if(d&&(e||f)){var g=b.r+c.r,h=e*e+f*f;g*=g,d*=d;var i=.5+(d-g)/(2*h),j=Math.sqrt(Math.max(0,2*g*(d+h)-(d-=h)*d-g*g))/(2*h);c.x=a.x+i*e+j*f,c.y=a.y+i*f-j*e}else c.x=a.x+d,c.y=a.y}function yf(a,b){return a.parent==b.parent?1:2}function zf(a){var b=a.children;return b.length?b[0]:a.t}function Af(a){var b,c=a.children;return(b=c.length)?c[b-1]:a.t}function Bf(a,b,c){var d=c/(b.i-a.i);b.c-=d,b.s+=c,a.c+=d,b.z+=c,b.m+=c}function Cf(a){for(var b,c=0,d=0,e=a.children,f=e.length;--f>=0;)b=e[f],b.z+=c,b.m+=c,c+=b.s+(d+=b.c)}function Df(a,b,c){return a.a.parent===b.parent?a.a:c}function Ef(a){return 1+Wg.max(a,function(a){return a.y})}function Ff(a){return a.reduce(function(a,b){return a+b.x},0)/a.length}function Gf(a){var b=a.children;return b&&b.length?Gf(b[0]):a}function Hf(a){var b,c=a.children;return c&&(b=c.length)?Hf(c[b-1]):a}function If(a){return{x:a.x,y:a.y,dx:a.dx,dy:a.dy}}function Jf(a,b){var c=a.x+b[3],d=a.y+b[0],e=a.dx-b[1]-b[3],f=a.dy-b[0]-b[2];return 0>e&&(c+=e/2,e=0),0>f&&(d+=f/2,f=0),{x:c,y:d,dx:e,dy:f}}function Kf(a){var b=a[0],c=a[a.length-1];return c>b?[b,c]:[c,b]}function Lf(a){return a.rangeExtent?a.rangeExtent():Kf(a.range())}function Mf(a,b,c,d){var e=c(a[0],a[1]),f=d(b[0],b[1]);return function(a){return f(e(a))}}function Nf(a,b){var c,d=0,e=a.length-1,f=a[d],g=a[e];return f>g&&(c=d,d=e,e=c,c=f,f=g,g=c),a[d]=b.floor(f),a[e]=b.ceil(g),a}function Of(a){return a?{floor:function(b){return Math.floor(b/a)*a},ceil:function(b){return Math.ceil(b/a)*a}}:mj}function Pf(a,b,c,d){var e=[],f=[],g=0,h=Math.min(a.length,b.length)-1;for(a[h]<a[0]&&(a=a.slice().reverse(),b=b.slice().reverse());++g<=h;)e.push(c(a[g-1],a[g])),f.push(d(b[g-1],b[g]));return function(b){var c=Wg.bisect(a,b,1,h)-1;return f[c](e[c](b))}}function Qf(a,b,c,d){function e(){var e=Math.min(a.length,b.length)>2?Pf:Mf,i=d?Pe:Oe;return g=e(a,b,i,c),h=e(b,a,i,qe),f}function f(a){return g(a)}var g,h;return f.invert=function(a){return h(a)},f.domain=function(b){return arguments.length?(a=b.map(Number),e()):a},f.range=function(a){return arguments.length?(b=a,e()):b},f.rangeRound=function(a){return f.range(a).interpolate(Ie)},f.clamp=function(a){return arguments.length?(d=a,e()):d},f.interpolate=function(a){return arguments.length?(c=a,e()):c},f.ticks=function(b){return Uf(a,b)},f.tickFormat=function(b,c){return Vf(a,b,c)},f.nice=function(b){return Sf(a,b),e()},f.copy=function(){return Qf(a,b,c,d)},e()}function Rf(a,b){return Wg.rebind(a,b,"range","rangeRound","interpolate","clamp")}function Sf(a,b){return Nf(a,Of(Tf(a,b)[2]))}function Tf(a,b){null==b&&(b=10);var c=Kf(a),d=c[1]-c[0],e=Math.pow(10,Math.floor(Math.log(d/b)/Math.LN10)),f=b/d*e;return.15>=f?e*=10:.35>=f?e*=5:.75>=f&&(e*=2),c[0]=Math.ceil(c[0]/e)*e,c[1]=Math.floor(c[1]/e)*e+.5*e,c[2]=e,c}function Uf(a,b){return Wg.range.apply(Wg,Tf(a,b))}function Vf(a,b,c){var d=Tf(a,b);if(c){var e=ai.exec(c);if(e.shift(),"s"===e[8]){var f=Wg.formatPrefix(Math.max(ih(d[0]),ih(d[1])));return e[7]||(e[7]="."+Wf(f.scale(d[2]))),e[8]="f",c=Wg.format(e.join("")),function(a){return c(f.scale(a))+f.symbol}}e[7]||(e[7]="."+Xf(e[8],d)),c=e.join("")}else c=",."+Wf(d[2])+"f";return Wg.format(c)}function Wf(a){return-Math.floor(Math.log(a)/Math.LN10+.01)}function Xf(a,b){var c=Wf(b[2]);return a in nj?Math.abs(c-Wf(Math.max(ih(b[0]),ih(b[1]))))+ +("e"!==a):c-2*("%"===a)}function Yf(a,b,c,d){function e(a){return(c?Math.log(0>a?0:a):-Math.log(a>0?0:-a))/Math.log(b)}function f(a){return c?Math.pow(b,a):-Math.pow(b,-a)}function g(b){return a(e(b))}return g.invert=function(b){return f(a.invert(b))},g.domain=function(b){return arguments.length?(c=b[0]>=0,a.domain((d=b.map(Number)).map(e)),g):d},g.base=function(c){return arguments.length?(b=+c,a.domain(d.map(e)),g):b},g.nice=function(){var b=Nf(d.map(e),c?Math:pj);return a.domain(b),d=b.map(f),g},g.ticks=function(){var a=Kf(d),g=[],h=a[0],i=a[1],j=Math.floor(e(h)),k=Math.ceil(e(i)),l=b%1?2:b;if(isFinite(k-j)){if(c){for(;k>j;j++)for(var m=1;l>m;m++)g.push(f(j)*m);g.push(f(j))}else for(g.push(f(j));j++<k;)for(var m=l-1;m>0;m--)g.push(f(j)*m);for(j=0;g[j]<h;j++);for(k=g.length;g[k-1]>i;k--);g=g.slice(j,k)}return g},g.tickFormat=function(a,b){if(!arguments.length)return oj;arguments.length<2?b=oj:"function"!=typeof b&&(b=Wg.format(b));var d,h=Math.max(.1,a/g.ticks().length),i=c?(d=1e-12,Math.ceil):(d=-1e-12,Math.floor);return function(a){return a/f(i(e(a)+d))<=h?b(a):""}},g.copy=function(){return Yf(a.copy(),b,c,d)},Rf(g,a)}function Zf(a,b,c){function d(b){return a(e(b))}var e=$f(b),f=$f(1/b);return d.invert=function(b){return f(a.invert(b))},d.domain=function(b){return arguments.length?(a.domain((c=b.map(Number)).map(e)),d):c},d.ticks=function(a){return Uf(c,a)},d.tickFormat=function(a,b){return Vf(c,a,b)},d.nice=function(a){return d.domain(Sf(c,a))},d.exponent=function(g){return arguments.length?(e=$f(b=g),f=$f(1/b),a.domain(c.map(e)),d):b},d.copy=function(){return Zf(a.copy(),b,c)},Rf(d,a)}function $f(a){return function(b){return 0>b?-Math.pow(-b,a):Math.pow(b,a)}}function _f(a,b){function c(c){return f[((e.get(c)||("range"===b.t?e.set(c,a.push(c)):0/0))-1)%f.length]}function d(b,c){return Wg.range(a.length).map(function(a){return b+c*a})}var e,f,h;return c.domain=function(d){if(!arguments.length)return a;a=[],e=new g;for(var f,h=-1,i=d.length;++h<i;)e.has(f=d[h])||e.set(f,a.push(f));return c[b.t].apply(c,b.a)},c.range=function(a){return arguments.length?(f=a,h=0,b={t:"range",a:arguments},c):f},c.rangePoints=function(e,g){arguments.length<2&&(g=0);var i=e[0],j=e[1],k=(j-i)/(Math.max(1,a.length-1)+g);return f=d(a.length<2?(i+j)/2:i+k*g/2,k),h=0,b={t:"rangePoints",a:arguments},c},c.rangeBands=function(e,g,i){arguments.length<2&&(g=0),arguments.length<3&&(i=g);var j=e[1]<e[0],k=e[j-0],l=e[1-j],m=(l-k)/(a.length-g+2*i);return f=d(k+m*i,m),j&&f.reverse(),h=m*(1-g),b={t:"rangeBands",a:arguments},c},c.rangeRoundBands=function(e,g,i){arguments.length<2&&(g=0),arguments.length<3&&(i=g);var j=e[1]<e[0],k=e[j-0],l=e[1-j],m=Math.floor((l-k)/(a.length-g+2*i)),n=l-k-(a.length-g)*m;return f=d(k+Math.round(n/2),m),j&&f.reverse(),h=Math.round(m*(1-g)),b={t:"rangeRoundBands",a:arguments},c},c.rangeBand=function(){return h},c.rangeExtent=function(){return Kf(b.a[0])},c.copy=function(){return _f(a,b)},c.domain(a)}function ag(c,d){function e(){var a=0,b=d.length;for(g=[];++a<b;)g[a-1]=Wg.quantile(c,a/b);return f}function f(a){return isNaN(a=+a)?void 0:d[Wg.bisect(g,a)]}var g;return f.domain=function(d){return arguments.length?(c=d.filter(b).sort(a),e()):c},f.range=function(a){return arguments.length?(d=a,e()):d},f.quantiles=function(){return g},f.invertExtent=function(a){return a=d.indexOf(a),0>a?[0/0,0/0]:[a>0?g[a-1]:c[0],a<g.length?g[a]:c[c.length-1]]},f.copy=function(){return ag(c,d)},e()}function bg(a,b,c){function d(b){return c[Math.max(0,Math.min(g,Math.floor(f*(b-a))))]}function e(){return f=c.length/(b-a),g=c.length-1,d}var f,g;return d.domain=function(c){return arguments.length?(a=+c[0],b=+c[c.length-1],e()):[a,b]},d.range=function(a){return arguments.length?(c=a,e()):c},d.invertExtent=function(b){return b=c.indexOf(b),b=0>b?0/0:b/f+a,[b,b+1/f]},d.copy=function(){return bg(a,b,c)},e()}function cg(a,b){function c(c){return c>=c?b[Wg.bisect(a,c)]:void 0}return c.domain=function(b){return arguments.length?(a=b,c):a},c.range=function(a){return arguments.length?(b=a,c):b},c.invertExtent=function(c){return c=b.indexOf(c),[a[c-1],a[c]]},c.copy=function(){return cg(a,b)},c}function dg(a){function b(a){return+a}return b.invert=b,b.domain=b.range=function(c){return arguments.length?(a=c.map(b),b):a},b.ticks=function(b){return Uf(a,b)},b.tickFormat=function(b,c){return Vf(a,b,c)},b.copy=function(){return dg(a)},b}function eg(a){return a.innerRadius}function fg(a){return a.outerRadius}function gg(a){return a.startAngle}function hg(a){return a.endAngle}function ig(a){function b(b){function g(){j.push("M",f(a(k),h))}for(var i,j=[],k=[],l=-1,m=b.length,n=Ab(c),o=Ab(d);++l<m;)e.call(this,i=b[l],l)?k.push([+n.call(this,i,l),+o.call(this,i,l)]):k.length&&(g(),k=[]);return k.length&&g(),j.length?j.join(""):null}var c=Bd,d=Cd,e=Bc,f=jg,g=f.key,h=.7;return b.x=function(a){return arguments.length?(c=a,b):c},b.y=function(a){return arguments.length?(d=a,b):d},b.defined=function(a){return arguments.length?(e=a,b):e},b.interpolate=function(a){return arguments.length?(g="function"==typeof a?f=a:(f=wj.get(a)||jg).key,b):g},b.tension=function(a){return arguments.length?(h=a,b):h},b}function jg(a){return a.join("L")}function kg(a){return jg(a)+"Z"}function lg(a){for(var b=0,c=a.length,d=a[0],e=[d[0],",",d[1]];++b<c;)e.push("H",(d[0]+(d=a[b])[0])/2,"V",d[1]);return c>1&&e.push("H",d[0]),e.join("")}function mg(a){for(var b=0,c=a.length,d=a[0],e=[d[0],",",d[1]];++b<c;)e.push("V",(d=a[b])[1],"H",d[0]);return e.join("")}function ng(a){for(var b=0,c=a.length,d=a[0],e=[d[0],",",d[1]];++b<c;)e.push("H",(d=a[b])[0],"V",d[1]);return e.join("")}function og(a,b){return a.length<4?jg(a):a[1]+rg(a.slice(1,a.length-1),sg(a,b))}function pg(a,b){return a.length<3?jg(a):a[0]+rg((a.push(a[0]),a),sg([a[a.length-2]].concat(a,[a[1]]),b))}function qg(a,b){return a.length<3?jg(a):a[0]+rg(a,sg(a,b))}function rg(a,b){if(b.length<1||a.length!=b.length&&a.length!=b.length+2)return jg(a);var c=a.length!=b.length,d="",e=a[0],f=a[1],g=b[0],h=g,i=1;if(c&&(d+="Q"+(f[0]-2*g[0]/3)+","+(f[1]-2*g[1]/3)+","+f[0]+","+f[1],e=a[1],i=2),b.length>1){h=b[1],f=a[i],i++,d+="C"+(e[0]+g[0])+","+(e[1]+g[1])+","+(f[0]-h[0])+","+(f[1]-h[1])+","+f[0]+","+f[1];for(var j=2;j<b.length;j++,i++)f=a[i],h=b[j],d+="S"+(f[0]-h[0])+","+(f[1]-h[1])+","+f[0]+","+f[1]}if(c){var k=a[i];d+="Q"+(f[0]+2*h[0]/3)+","+(f[1]+2*h[1]/3)+","+k[0]+","+k[1]}return d}function sg(a,b){for(var c,d=[],e=(1-b)/2,f=a[0],g=a[1],h=1,i=a.length;++h<i;)c=f,f=g,g=a[h],d.push([e*(g[0]-c[0]),e*(g[1]-c[1])]);return d}function tg(a){if(a.length<3)return jg(a);var b=1,c=a.length,d=a[0],e=d[0],f=d[1],g=[e,e,e,(d=a[1])[0]],h=[f,f,f,d[1]],i=[e,",",f,"L",xg(zj,g),",",xg(zj,h)];for(a.push(a[c-1]);++b<=c;)d=a[b],g.shift(),g.push(d[0]),h.shift(),h.push(d[1]),yg(i,g,h);return a.pop(),i.push("L",d),i.join("")}function ug(a){if(a.length<4)return jg(a);for(var b,c=[],d=-1,e=a.length,f=[0],g=[0];++d<3;)b=a[d],f.push(b[0]),g.push(b[1]);for(c.push(xg(zj,f)+","+xg(zj,g)),--d;++d<e;)b=a[d],f.shift(),f.push(b[0]),g.shift(),g.push(b[1]),yg(c,f,g);return c.join("")}function vg(a){for(var b,c,d=-1,e=a.length,f=e+4,g=[],h=[];++d<4;)c=a[d%e],g.push(c[0]),h.push(c[1]);for(b=[xg(zj,g),",",xg(zj,h)],--d;++d<f;)c=a[d%e],g.shift(),g.push(c[0]),h.shift(),h.push(c[1]),yg(b,g,h);return b.join("")}function wg(a,b){var c=a.length-1;if(c)for(var d,e,f=a[0][0],g=a[0][1],h=a[c][0]-f,i=a[c][1]-g,j=-1;++j<=c;)d=a[j],e=j/c,d[0]=b*d[0]+(1-b)*(f+e*h),d[1]=b*d[1]+(1-b)*(g+e*i);return tg(a)}function xg(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]}function yg(a,b,c){a.push("C",xg(xj,b),",",xg(xj,c),",",xg(yj,b),",",xg(yj,c),",",xg(zj,b),",",xg(zj,c))}function zg(a,b){return(b[1]-a[1])/(b[0]-a[0])}function Ag(a){for(var b=0,c=a.length-1,d=[],e=a[0],f=a[1],g=d[0]=zg(e,f);++b<c;)d[b]=(g+(g=zg(e=f,f=a[b+1])))/2;return d[b]=g,d}function Bg(a){for(var b,c,d,e,f=[],g=Ag(a),h=-1,i=a.length-1;++h<i;)b=zg(a[h],a[h+1]),ih(b)<Ch?g[h]=g[h+1]=0:(c=g[h]/b,d=g[h+1]/b,e=c*c+d*d,e>9&&(e=3*b/Math.sqrt(e),g[h]=e*c,g[h+1]=e*d));for(h=-1;++h<=i;)e=(a[Math.min(i,h+1)][0]-a[Math.max(0,h-1)][0])/(6*(1+g[h]*g[h])),f.push([e||0,g[h]*e||0]);return f}function Cg(a){return a.length<3?jg(a):a[0]+rg(a,Bg(a))}function Dg(a){for(var b,c,d,e=-1,f=a.length;++e<f;)b=a[e],c=b[0],d=b[1]+uj,b[0]=c*Math.cos(d),b[1]=c*Math.sin(d);return a}function Eg(a){function b(b){function i(){p.push("M",h(a(r),l),k,j(a(q.reverse()),l),"Z")}for(var m,n,o,p=[],q=[],r=[],s=-1,t=b.length,u=Ab(c),v=Ab(e),w=c===d?function(){return n}:Ab(d),x=e===f?function(){return o}:Ab(f);++s<t;)g.call(this,m=b[s],s)?(q.push([n=+u.call(this,m,s),o=+v.call(this,m,s)]),r.push([+w.call(this,m,s),+x.call(this,m,s)])):q.length&&(i(),q=[],r=[]);return q.length&&i(),p.length?p.join(""):null}var c=Bd,d=Bd,e=0,f=Cd,g=Bc,h=jg,i=h.key,j=h,k="L",l=.7;return b.x=function(a){return arguments.length?(c=d=a,b):d},b.x0=function(a){return arguments.length?(c=a,b):c},b.x1=function(a){return arguments.length?(d=a,b):d},b.y=function(a){return arguments.length?(e=f=a,b):f},b.y0=function(a){return arguments.length?(e=a,b):e},b.y1=function(a){return arguments.length?(f=a,b):f},b.defined=function(a){return arguments.length?(g=a,b):g},b.interpolate=function(a){return arguments.length?(i="function"==typeof a?h=a:(h=wj.get(a)||jg).key,j=h.reverse||h,k=h.closed?"M":"L",b):i},b.tension=function(a){return arguments.length?(l=a,b):l},b}function Fg(a){return a.radius}function Gg(a){return[a.x,a.y]}function Hg(a){return function(){var b=a.apply(this,arguments),c=b[0],d=b[1]+uj;return[c*Math.cos(d),c*Math.sin(d)]}}function Ig(){return 64}function Jg(){return"circle"}function Kg(a){var b=Math.sqrt(a/zh);return"M0,"+b+"A"+b+","+b+" 0 1,1 0,"+-b+"A"+b+","+b+" 0 1,1 0,"+b+"Z"}function Lg(a,b){return nh(a,Fj),a.id=b,a}function Mg(a,b,c,d){var e=a.id;return K(a,"function"==typeof c?function(a,f,g){a.__transition__[e].tween.set(b,d(c.call(a,a.__data__,f,g)))}:(c=d(c),function(a){a.__transition__[e].tween.set(b,c)}))}function Ng(a){return null==a&&(a=""),function(){this.textContent=a}}function Og(a,b,c,d){var e=a.__transition__||(a.__transition__={active:0,count:0}),f=e[c];if(!f){var h=d.time;f=e[c]={tween:new g,time:h,ease:d.ease,delay:d.delay,duration:d.duration},++e.count,Wg.timer(function(d){function g(d){return e.active>c?j():(e.active=c,f.event&&f.event.start.call(a,k,b),f.tween.forEach(function(c,d){(d=d.call(a,k,b))&&p.push(d)}),void Wg.timer(function(){return o.c=i(d||1)?Bc:i,1},0,h))}function i(d){if(e.active!==c)return j();for(var g=d/n,h=l(g),i=p.length;i>0;)p[--i].call(a,h);return g>=1?(f.event&&f.event.end.call(a,k,b),j()):void 0}function j(){return--e.count?delete e[c]:delete a.__transition__,1}var k=a.__data__,l=f.ease,m=f.delay,n=f.duration,o=Zh,p=[];return o.t=m+h,d>=m?g(d-m):void(o.c=g)},0,h)}}function Pg(a,b){a.attr("transform",function(a){return"translate("+b(a)+",0)"})}function Qg(a,b){a.attr("transform",function(a){return"translate(0,"+b(a)+")"})}function Rg(a){return a.toISOString()}function Sg(a,b,c){function d(b){return a(b)}function e(a,c){var d=a[1]-a[0],e=d/c,f=Wg.bisect(Oj,e);return f==Oj.length?[b.year,Tf(a.map(function(a){return a/31536e6}),c)[2]]:f?b[e/Oj[f-1]<Oj[f]/e?f-1:f]:[Rj,Tf(a,c)[2]]}return d.invert=function(b){return Tg(a.invert(b))},d.domain=function(b){return arguments.length?(a.domain(b),d):a.domain().map(Tg)},d.nice=function(a,b){function c(c){return!isNaN(c)&&!a.range(c,Tg(+c+1),b).length}var f=d.domain(),g=Kf(f),h=null==a?e(g,10):"number"==typeof a&&e(g,a);return h&&(a=h[0],b=h[1]),d.domain(Nf(f,b>1?{floor:function(b){for(;c(b=a.floor(b));)b=Tg(b-1);return b},ceil:function(b){for(;c(b=a.ceil(b));)b=Tg(+b+1);return b}}:a))},d.ticks=function(a,b){var c=Kf(d.domain()),f=null==a?e(c,10):"number"==typeof a?e(c,a):!a.range&&[{range:a},b];return f&&(a=f[0],b=f[1]),a.range(c[0],Tg(+c[1]+1),1>b?1:b)},d.tickFormat=function(){return c},d.copy=function(){return Sg(a.copy(),b,c)},Rf(d,a)}function Tg(a){return new Date(a)}function Ug(a){return JSON.parse(a.responseText)}function Vg(a){var b=Zg.createRange();return b.selectNode(Zg.body),b.createContextualFragment(a.responseText)}var Wg={version:"3.4.8"};Date.now||(Date.now=function(){return+new Date});var Xg=[].slice,Yg=function(a){return Xg.call(a)},Zg=document,$g=Zg.documentElement,_g=window;try{Yg($g.childNodes)[0].nodeType}catch(ah){Yg=function(a){for(var b=a.length,c=new Array(b);b--;)c[b]=a[b];return c}}try{Zg.createElement("div").style.setProperty("opacity",0,"")}catch(bh){var ch=_g.Element.prototype,dh=ch.setAttribute,eh=ch.setAttributeNS,fh=_g.CSSStyleDeclaration.prototype,gh=fh.setProperty;ch.setAttribute=function(a,b){dh.call(this,a,b+"")},ch.setAttributeNS=function(a,b,c){eh.call(this,a,b,c+"")},fh.setProperty=function(a,b,c){gh.call(this,a,b+"",c)}}Wg.ascending=a,Wg.descending=function(a,b){return a>b?-1:b>a?1:b>=a?0:0/0},Wg.min=function(a,b){var c,d,e=-1,f=a.length;if(1===arguments.length){for(;++e<f&&!(null!=(c=a[e])&&c>=c);)c=void 0;for(;++e<f;)null!=(d=a[e])&&c>d&&(c=d)}else{for(;++e<f&&!(null!=(c=b.call(a,a[e],e))&&c>=c);)c=void 0;for(;++e<f;)null!=(d=b.call(a,a[e],e))&&c>d&&(c=d)}return c},Wg.max=function(a,b){var c,d,e=-1,f=a.length;if(1===arguments.length){for(;++e<f&&!(null!=(c=a[e])&&c>=c);)c=void 0;for(;++e<f;)null!=(d=a[e])&&d>c&&(c=d)}else{for(;++e<f&&!(null!=(c=b.call(a,a[e],e))&&c>=c);)c=void 0;for(;++e<f;)null!=(d=b.call(a,a[e],e))&&d>c&&(c=d)}return c},Wg.extent=function(a,b){var c,d,e,f=-1,g=a.length;if(1===arguments.length){for(;++f<g&&!(null!=(c=e=a[f])&&c>=c);)c=e=void 0;for(;++f<g;)null!=(d=a[f])&&(c>d&&(c=d),d>e&&(e=d))}else{for(;++f<g&&!(null!=(c=e=b.call(a,a[f],f))&&c>=c);)c=void 0;for(;++f<g;)null!=(d=b.call(a,a[f],f))&&(c>d&&(c=d),d>e&&(e=d))}return[c,e]},Wg.sum=function(a,b){var c,d=0,e=a.length,f=-1;if(1===arguments.length)for(;++f<e;)isNaN(c=+a[f])||(d+=c);else for(;++f<e;)isNaN(c=+b.call(a,a[f],f))||(d+=c);return d},Wg.mean=function(a,c){var d,e=0,f=a.length,g=-1,h=f;if(1===arguments.length)for(;++g<f;)b(d=a[g])?e+=d:--h;else for(;++g<f;)b(d=c.call(a,a[g],g))?e+=d:--h;return h?e/h:void 0},Wg.quantile=function(a,b){var c=(a.length-1)*b+1,d=Math.floor(c),e=+a[d-1],f=c-d;return f?e+f*(a[d]-e):e},Wg.median=function(c,d){return arguments.length>1&&(c=c.map(d)),c=c.filter(b),c.length?Wg.quantile(c.sort(a),.5):void 0};var hh=c(a);Wg.bisectLeft=hh.left,Wg.bisect=Wg.bisectRight=hh.right,Wg.bisector=function(b){return c(1===b.length?function(c,d){return a(b(c),d)}:b)},Wg.shuffle=function(a){for(var b,c,d=a.length;d;)c=Math.random()*d--|0,b=a[d],a[d]=a[c],a[c]=b;return a},Wg.permute=function(a,b){for(var c=b.length,d=new Array(c);c--;)d[c]=a[b[c]];return d},Wg.pairs=function(a){for(var b,c=0,d=a.length-1,e=a[0],f=new Array(0>d?0:d);d>c;)f[c]=[b=e,e=a[++c]];return f},Wg.zip=function(){if(!(e=arguments.length))return[];for(var a=-1,b=Wg.min(arguments,d),c=new Array(b);++a<b;)for(var e,f=-1,g=c[a]=new Array(e);++f<e;)g[f]=arguments[f][a];return c},Wg.transpose=function(a){return Wg.zip.apply(Wg,a)},Wg.keys=function(a){var b=[];for(var c in a)b.push(c);return b},Wg.values=function(a){var b=[];for(var c in a)b.push(a[c]);return b},Wg.entries=function(a){var b=[];for(var c in a)b.push({key:c,value:a[c]});return b},Wg.merge=function(a){for(var b,c,d,e=a.length,f=-1,g=0;++f<e;)g+=a[f].length;for(c=new Array(g);--e>=0;)for(d=a[e],b=d.length;--b>=0;)c[--g]=d[b];return c};var ih=Math.abs;Wg.range=function(a,b,c){if(arguments.length<3&&(c=1,arguments.length<2&&(b=a,a=0)),(b-a)/c===1/0)throw new Error("infinite range");var d,f=[],g=e(ih(c)),h=-1;if(a*=g,b*=g,c*=g,0>c)for(;(d=a+c*++h)>b;)f.push(d/g);else for(;(d=a+c*++h)<b;)f.push(d/g);return f},Wg.map=function(a){var b=new g;if(a instanceof g)a.forEach(function(a,c){b.set(a,c)});else for(var c in a)b.set(c,a[c]);return b},f(g,{has:h,get:function(a){return this[jh+a]},set:function(a,b){return this[jh+a]=b},remove:i,keys:j,values:function(){var a=[];return this.forEach(function(b,c){a.push(c)}),a},entries:function(){var a=[];return this.forEach(function(b,c){a.push({key:b,value:c})}),a},size:k,empty:l,forEach:function(a){for(var b in this)b.charCodeAt(0)===kh&&a.call(this,b.substring(1),this[b])}});var jh="\x00",kh=jh.charCodeAt(0);Wg.nest=function(){function a(b,h,i){if(i>=f.length)return d?d.call(e,h):c?h.sort(c):h;for(var j,k,l,m,n=-1,o=h.length,p=f[i++],q=new g;++n<o;)(m=q.get(j=p(k=h[n])))?m.push(k):q.set(j,[k]);return b?(k=b(),l=function(c,d){k.set(c,a(b,d,i))}):(k={},l=function(c,d){k[c]=a(b,d,i)}),q.forEach(l),k}function b(a,c){if(c>=f.length)return a;var d=[],e=h[c++];return a.forEach(function(a,e){d.push({key:a,values:b(e,c)})}),e?d.sort(function(a,b){return e(a.key,b.key)}):d}var c,d,e={},f=[],h=[];return e.map=function(b,c){return a(c,b,0)},e.entries=function(c){return b(a(Wg.map,c,0),0)},e.key=function(a){return f.push(a),e},e.sortKeys=function(a){return h[f.length-1]=a,e},e.sortValues=function(a){return c=a,e},e.rollup=function(a){return d=a,e},e},Wg.set=function(a){var b=new m;if(a)for(var c=0,d=a.length;d>c;++c)b.add(a[c]);return b},f(m,{has:h,add:function(a){return this[jh+a]=!0,a},remove:function(a){return a=jh+a,a in this&&delete this[a]},values:j,size:k,empty:l,forEach:function(a){for(var b in this)b.charCodeAt(0)===kh&&a.call(this,b.substring(1))}}),Wg.behavior={},Wg.rebind=function(a,b){for(var c,d=1,e=arguments.length;++d<e;)a[c=arguments[d]]=n(a,b,b[c]);return a};var lh=["webkit","ms","moz","Moz","o","O"];Wg.dispatch=function(){for(var a=new q,b=-1,c=arguments.length;++b<c;)a[arguments[b]]=r(a);return a},q.prototype.on=function(a,b){var c=a.indexOf("."),d="";if(c>=0&&(d=a.substring(c+1),a=a.substring(0,c)),a)return arguments.length<2?this[a].on(d):this[a].on(d,b);if(2===arguments.length){if(null==b)for(a in this)this.hasOwnProperty(a)&&this[a].on(d,null);return this}},Wg.event=null,Wg.requote=function(a){return a.replace(mh,"\\$&")};var mh=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,nh={}.__proto__?function(a,b){a.__proto__=b}:function(a,b){for(var c in b)a[c]=b[c]},oh=function(a,b){return b.querySelector(a)},ph=function(a,b){return b.querySelectorAll(a)},qh=$g[o($g,"matchesSelector")],rh=function(a,b){return qh.call(a,b)};"function"==typeof Sizzle&&(oh=function(a,b){return Sizzle(a,b)[0]||null},ph=Sizzle,rh=Sizzle.matchesSelector),Wg.selection=function(){return vh};var sh=Wg.selection.prototype=[];sh.select=function(a){var b,c,d,e,f=[];a=w(a);for(var g=-1,h=this.length;++g<h;){f.push(b=[]),b.parentNode=(d=this[g]).parentNode;for(var i=-1,j=d.length;++i<j;)(e=d[i])?(b.push(c=a.call(e,e.__data__,i,g)),c&&"__data__"in e&&(c.__data__=e.__data__)):b.push(null)}return v(f)},sh.selectAll=function(a){var b,c,d=[];a=x(a);for(var e=-1,f=this.length;++e<f;)for(var g=this[e],h=-1,i=g.length;++h<i;)(c=g[h])&&(d.push(b=Yg(a.call(c,c.__data__,h,e))),b.parentNode=c);return v(d)};var th={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};Wg.ns={prefix:th,qualify:function(a){var b=a.indexOf(":"),c=a;return b>=0&&(c=a.substring(0,b),a=a.substring(b+1)),th.hasOwnProperty(c)?{space:th[c],local:a}:a}},sh.attr=function(a,b){if(arguments.length<2){if("string"==typeof a){var c=this.node();return a=Wg.ns.qualify(a),a.local?c.getAttributeNS(a.space,a.local):c.getAttribute(a)}for(b in a)this.each(y(b,a[b]));return this}return this.each(y(a,b))},sh.classed=function(a,b){if(arguments.length<2){if("string"==typeof a){var c=this.node(),d=(a=B(a)).length,e=-1;if(b=c.classList){for(;++e<d;)if(!b.contains(a[e]))return!1}else for(b=c.getAttribute("class");++e<d;)if(!A(a[e]).test(b))return!1;return!0}for(b in a)this.each(C(b,a[b]));return this}return this.each(C(a,b))},sh.style=function(a,b,c){var d=arguments.length;if(3>d){if("string"!=typeof a){2>d&&(b="");for(c in a)this.each(E(c,a[c],b));return this}if(2>d)return _g.getComputedStyle(this.node(),null).getPropertyValue(a);c=""}return this.each(E(a,b,c))},sh.property=function(a,b){if(arguments.length<2){if("string"==typeof a)return this.node()[a];for(b in a)this.each(F(b,a[b]));return this}return this.each(F(a,b))},sh.text=function(a){return arguments.length?this.each("function"==typeof a?function(){var b=a.apply(this,arguments);this.textContent=null==b?"":b}:null==a?function(){this.textContent=""}:function(){this.textContent=a}):this.node().textContent},sh.html=function(a){return arguments.length?this.each("function"==typeof a?function(){var b=a.apply(this,arguments);this.innerHTML=null==b?"":b}:null==a?function(){this.innerHTML=""}:function(){this.innerHTML=a}):this.node().innerHTML},sh.append=function(a){return a=G(a),this.select(function(){return this.appendChild(a.apply(this,arguments))})},sh.insert=function(a,b){return a=G(a),b=w(b),this.select(function(){return this.insertBefore(a.apply(this,arguments),b.apply(this,arguments)||null)})},sh.remove=function(){return this.each(function(){var a=this.parentNode;a&&a.removeChild(this)})},sh.data=function(a,b){function c(a,c){var d,e,f,h=a.length,l=c.length,m=Math.min(h,l),n=new Array(l),o=new Array(l),p=new Array(h);if(b){var q,r=new g,s=new g,t=[];for(d=-1;++d<h;)q=b.call(e=a[d],e.__data__,d),r.has(q)?p[d]=e:r.set(q,e),t.push(q);for(d=-1;++d<l;)q=b.call(c,f=c[d],d),(e=r.get(q))?(n[d]=e,e.__data__=f):s.has(q)||(o[d]=H(f)),s.set(q,f),r.remove(q);for(d=-1;++d<h;)r.has(t[d])&&(p[d]=a[d])}else{for(d=-1;++d<m;)e=a[d],f=c[d],e?(e.__data__=f,n[d]=e):o[d]=H(f);for(;l>d;++d)o[d]=H(c[d]);for(;h>d;++d)p[d]=a[d]}o.update=n,o.parentNode=n.parentNode=p.parentNode=a.parentNode,i.push(o),j.push(n),k.push(p)}var d,e,f=-1,h=this.length;if(!arguments.length){for(a=new Array(h=(d=this[0]).length);++f<h;)(e=d[f])&&(a[f]=e.__data__);return a}var i=L([]),j=v([]),k=v([]);if("function"==typeof a)for(;++f<h;)c(d=this[f],a.call(d,d.parentNode.__data__,f));else for(;++f<h;)c(d=this[f],a);return j.enter=function(){return i},j.exit=function(){return k},j},sh.datum=function(a){return arguments.length?this.property("__data__",a):this.property("__data__")},sh.filter=function(a){var b,c,d,e=[];"function"!=typeof a&&(a=I(a));for(var f=0,g=this.length;g>f;f++){e.push(b=[]),b.parentNode=(c=this[f]).parentNode;for(var h=0,i=c.length;i>h;h++)(d=c[h])&&a.call(d,d.__data__,h,f)&&b.push(d)}return v(e)},sh.order=function(){for(var a=-1,b=this.length;++a<b;)for(var c,d=this[a],e=d.length-1,f=d[e];--e>=0;)(c=d[e])&&(f&&f!==c.nextSibling&&f.parentNode.insertBefore(c,f),f=c);return this},sh.sort=function(a){a=J.apply(this,arguments);for(var b=-1,c=this.length;++b<c;)this[b].sort(a);return this.order()},sh.each=function(a){return K(this,function(b,c,d){a.call(b,b.__data__,c,d)})},sh.call=function(a){var b=Yg(arguments);return a.apply(b[0]=this,b),this},sh.empty=function(){return!this.node()},sh.node=function(){for(var a=0,b=this.length;b>a;a++)for(var c=this[a],d=0,e=c.length;e>d;d++){var f=c[d];if(f)return f}return null},sh.size=function(){var a=0;return this.each(function(){++a}),a};var uh=[];Wg.selection.enter=L,Wg.selection.enter.prototype=uh,uh.append=sh.append,uh.empty=sh.empty,uh.node=sh.node,uh.call=sh.call,uh.size=sh.size,uh.select=function(a){for(var b,c,d,e,f,g=[],h=-1,i=this.length;++h<i;){d=(e=this[h]).update,g.push(b=[]),b.parentNode=e.parentNode;for(var j=-1,k=e.length;++j<k;)(f=e[j])?(b.push(d[j]=c=a.call(e.parentNode,f.__data__,j,h)),c.__data__=f.__data__):b.push(null)}return v(g)},uh.insert=function(a,b){return arguments.length<2&&(b=M(this)),sh.insert.call(this,a,b)},sh.transition=function(){for(var a,b,c=Bj||++Gj,d=[],e=Cj||{time:Date.now(),ease:xe,delay:0,duration:250},f=-1,g=this.length;++f<g;){d.push(a=[]);for(var h=this[f],i=-1,j=h.length;++i<j;)(b=h[i])&&Og(b,i,c,e),a.push(b)}return Lg(d,c)},sh.interrupt=function(){return this.each(N)},Wg.select=function(a){var b=["string"==typeof a?oh(a,Zg):a];return b.parentNode=$g,v([b])},Wg.selectAll=function(a){var b=Yg("string"==typeof a?ph(a,Zg):a);return b.parentNode=$g,v([b])};var vh=Wg.select($g);sh.on=function(a,b,c){var d=arguments.length;if(3>d){if("string"!=typeof a){2>d&&(b=!1);for(c in a)this.each(O(c,a[c],b));return this}if(2>d)return(d=this.node()["__on"+a])&&d._;c=!1}return this.each(O(a,b,c))};var wh=Wg.map({mouseenter:"mouseover",mouseleave:"mouseout"});wh.forEach(function(a){"on"+a in Zg&&wh.remove(a)});var xh="onselectstart"in Zg?null:o($g.style,"userSelect"),yh=0;Wg.mouse=function(a){return S(a,t())},Wg.touches=function(a,b){return arguments.length<2&&(b=t().touches),b?Yg(b).map(function(b){var c=S(a,b);return c.identifier=b.identifier,c}):[]},Wg.behavior.drag=function(){function a(){this.on("mousedown.drag",e).on("touchstart.drag",f)}function b(a,b,e,f,g){return function(){function h(){var a,c,d=b(m,p);d&&(a=d[0]-t[0],c=d[1]-t[1],o|=a|c,t=d,n({type:"drag",x:d[0]+j[0],y:d[1]+j[1],dx:a,dy:c}))}function i(){b(m,p)&&(r.on(f+q,null).on(g+q,null),s(o&&Wg.event.target===l),n({type:"dragend"}))}var j,k=this,l=Wg.event.target,m=k.parentNode,n=c.of(k,arguments),o=0,p=a(),q=".drag"+(null==p?"":"-"+p),r=Wg.select(e()).on(f+q,h).on(g+q,i),s=R(),t=b(m,p);d?(j=d.apply(k,arguments),j=[j.x-t[0],j.y-t[1]]):j=[0,0],n({type:"dragstart"})}}var c=u(a,"drag","dragstart","dragend"),d=null,e=b(p,Wg.mouse,V,"mousemove","mouseup"),f=b(T,Wg.touch,U,"touchmove","touchend");return a.origin=function(b){return arguments.length?(d=b,a):d},Wg.rebind(a,c,"on")};var zh=Math.PI,Ah=2*zh,Bh=zh/2,Ch=1e-6,Dh=Ch*Ch,Eh=zh/180,Fh=180/zh,Gh=Math.SQRT2,Hh=2,Ih=4;Wg.interpolateZoom=function(a,b){function c(a){var b=a*s;if(r){var c=_(p),g=f/(Hh*m)*(c*ab(Gh*b+p)-$(p));return[d+g*j,e+g*k,f*c/_(Gh*b+p)]}return[d+a*j,e+a*k,f*Math.exp(Gh*b)]}var d=a[0],e=a[1],f=a[2],g=b[0],h=b[1],i=b[2],j=g-d,k=h-e,l=j*j+k*k,m=Math.sqrt(l),n=(i*i-f*f+Ih*l)/(2*f*Hh*m),o=(i*i-f*f-Ih*l)/(2*i*Hh*m),p=Math.log(Math.sqrt(n*n+1)-n),q=Math.log(Math.sqrt(o*o+1)-o),r=q-p,s=(r||Math.log(i/f))/Gh;return c.duration=1e3*s,c},Wg.behavior.zoom=function(){function a(a){a.on(B,j).on(Lh+".zoom",l).on(C,m).on("dblclick.zoom",n).on(E,k)}function b(a){return[(a[0]-y.x)/y.k,(a[1]-y.y)/y.k]}function c(a){return[a[0]*y.k+y.x,a[1]*y.k+y.y]}function d(a){y.k=Math.max(A[0],Math.min(A[1],a))}function e(a,b){b=c(b),y.x+=a[0]-b[0],y.y+=a[1]-b[1]}function f(){v&&v.domain(t.range().map(function(a){return(a-y.x)/y.k}).map(t.invert)),x&&x.domain(w.range().map(function(a){return(a-y.y)/y.k}).map(w.invert))}function g(a){a({type:"zoomstart"})}function h(a){f(),a({type:"zoom",scale:y.k,translate:[y.x,y.y]})
}function i(a){a({type:"zoomend"})}function j(){function a(){k=1,e(Wg.mouse(d),n),h(j)}function c(){l.on(C,_g===d?m:null).on(D,null),o(k&&Wg.event.target===f),i(j)}var d=this,f=Wg.event.target,j=F.of(d,arguments),k=0,l=Wg.select(_g).on(C,a).on(D,c),n=b(Wg.mouse(d)),o=R();N.call(d),g(j)}function k(){function a(){var a=Wg.touches(n);return m=y.k,a.forEach(function(a){a.identifier in p&&(p[a.identifier]=b(a))}),a}function c(){var b=Wg.event.target;Wg.select(b).on(u,f).on(v,l),w.push(b);for(var c=Wg.event.changedTouches,g=0,i=c.length;i>g;++g)p[c[g].identifier]=null;var j=a(),k=Date.now();if(1===j.length){if(500>k-r){var m=j[0],n=p[m.identifier];d(2*y.k),e(m,n),s(),h(o)}r=k}else if(j.length>1){var m=j[0],t=j[1],x=m[0]-t[0],z=m[1]-t[1];q=x*x+z*z}}function f(){for(var a,b,c,f,g=Wg.touches(n),i=0,j=g.length;j>i;++i,f=null)if(c=g[i],f=p[c.identifier]){if(b)break;a=c,b=f}if(f){var k=(k=c[0]-a[0])*k+(k=c[1]-a[1])*k,l=q&&Math.sqrt(k/q);a=[(a[0]+c[0])/2,(a[1]+c[1])/2],b=[(b[0]+f[0])/2,(b[1]+f[1])/2],d(l*m)}r=null,e(a,b),h(o)}function l(){if(Wg.event.touches.length){for(var b=Wg.event.changedTouches,c=0,d=b.length;d>c;++c)delete p[b[c].identifier];for(var e in p)return void a()}Wg.selectAll(w).on(t,null),x.on(B,j).on(E,k),z(),i(o)}var m,n=this,o=F.of(n,arguments),p={},q=0,t=".zoom-"+Wg.event.changedTouches[0].identifier,u="touchmove"+t,v="touchend"+t,w=[],x=Wg.select(n).on(B,null).on(E,c),z=R();N.call(n),c(),g(o)}function l(){var a=F.of(this,arguments);q?clearTimeout(q):(N.call(this),g(a)),q=setTimeout(function(){q=null,i(a)},50),s();var c=p||Wg.mouse(this);o||(o=b(c)),d(Math.pow(2,.002*Jh())*y.k),e(c,o),h(a)}function m(){o=null}function n(){var a=F.of(this,arguments),c=Wg.mouse(this),f=b(c),j=Math.log(y.k)/Math.LN2;g(a),d(Math.pow(2,Wg.event.shiftKey?Math.ceil(j)-1:Math.floor(j)+1)),e(c,f),h(a),i(a)}var o,p,q,r,t,v,w,x,y={x:0,y:0,k:1},z=[960,500],A=Kh,B="mousedown.zoom",C="mousemove.zoom",D="mouseup.zoom",E="touchstart.zoom",F=u(a,"zoomstart","zoom","zoomend");return a.event=function(a){a.each(function(){var a=F.of(this,arguments),b=y;Bj?Wg.select(this).transition().each("start.zoom",function(){y=this.__chart__||{x:0,y:0,k:1},g(a)}).tween("zoom:zoom",function(){var c=z[0],d=z[1],e=c/2,f=d/2,g=Wg.interpolateZoom([(e-y.x)/y.k,(f-y.y)/y.k,c/y.k],[(e-b.x)/b.k,(f-b.y)/b.k,c/b.k]);return function(b){var d=g(b),i=c/d[2];this.__chart__=y={x:e-d[0]*i,y:f-d[1]*i,k:i},h(a)}}).each("end.zoom",function(){i(a)}):(this.__chart__=y,g(a),h(a),i(a))})},a.translate=function(b){return arguments.length?(y={x:+b[0],y:+b[1],k:y.k},f(),a):[y.x,y.y]},a.scale=function(b){return arguments.length?(y={x:y.x,y:y.y,k:+b},f(),a):y.k},a.scaleExtent=function(b){return arguments.length?(A=null==b?Kh:[+b[0],+b[1]],a):A},a.center=function(b){return arguments.length?(p=b&&[+b[0],+b[1]],a):p},a.size=function(b){return arguments.length?(z=b&&[+b[0],+b[1]],a):z},a.x=function(b){return arguments.length?(v=b,t=b.copy(),y={x:0,y:0,k:1},a):v},a.y=function(b){return arguments.length?(x=b,w=b.copy(),y={x:0,y:0,k:1},a):x},Wg.rebind(a,F,"on")};var Jh,Kh=[0,1/0],Lh="onwheel"in Zg?(Jh=function(){return-Wg.event.deltaY*(Wg.event.deltaMode?120:1)},"wheel"):"onmousewheel"in Zg?(Jh=function(){return Wg.event.wheelDelta},"mousewheel"):(Jh=function(){return-Wg.event.detail},"MozMousePixelScroll");cb.prototype.toString=function(){return this.rgb()+""},Wg.hsl=function(a,b,c){return 1===arguments.length?a instanceof eb?db(a.h,a.s,a.l):vb(""+a,wb,db):db(+a,+b,+c)};var Mh=eb.prototype=new cb;Mh.brighter=function(a){return a=Math.pow(.7,arguments.length?a:1),db(this.h,this.s,this.l/a)},Mh.darker=function(a){return a=Math.pow(.7,arguments.length?a:1),db(this.h,this.s,a*this.l)},Mh.rgb=function(){return fb(this.h,this.s,this.l)},Wg.hcl=function(a,b,c){return 1===arguments.length?a instanceof hb?gb(a.h,a.c,a.l):a instanceof kb?mb(a.l,a.a,a.b):mb((a=xb((a=Wg.rgb(a)).r,a.g,a.b)).l,a.a,a.b):gb(+a,+b,+c)};var Nh=hb.prototype=new cb;Nh.brighter=function(a){return gb(this.h,this.c,Math.min(100,this.l+Oh*(arguments.length?a:1)))},Nh.darker=function(a){return gb(this.h,this.c,Math.max(0,this.l-Oh*(arguments.length?a:1)))},Nh.rgb=function(){return ib(this.h,this.c,this.l).rgb()},Wg.lab=function(a,b,c){return 1===arguments.length?a instanceof kb?jb(a.l,a.a,a.b):a instanceof hb?ib(a.l,a.c,a.h):xb((a=Wg.rgb(a)).r,a.g,a.b):jb(+a,+b,+c)};var Oh=18,Ph=.95047,Qh=1,Rh=1.08883,Sh=kb.prototype=new cb;Sh.brighter=function(a){return jb(Math.min(100,this.l+Oh*(arguments.length?a:1)),this.a,this.b)},Sh.darker=function(a){return jb(Math.max(0,this.l-Oh*(arguments.length?a:1)),this.a,this.b)},Sh.rgb=function(){return lb(this.l,this.a,this.b)},Wg.rgb=function(a,b,c){return 1===arguments.length?a instanceof tb?sb(a.r,a.g,a.b):vb(""+a,sb,fb):sb(~~a,~~b,~~c)};var Th=tb.prototype=new cb;Th.brighter=function(a){a=Math.pow(.7,arguments.length?a:1);var b=this.r,c=this.g,d=this.b,e=30;return b||c||d?(b&&e>b&&(b=e),c&&e>c&&(c=e),d&&e>d&&(d=e),sb(Math.min(255,~~(b/a)),Math.min(255,~~(c/a)),Math.min(255,~~(d/a)))):sb(e,e,e)},Th.darker=function(a){return a=Math.pow(.7,arguments.length?a:1),sb(~~(a*this.r),~~(a*this.g),~~(a*this.b))},Th.hsl=function(){return wb(this.r,this.g,this.b)},Th.toString=function(){return"#"+ub(this.r)+ub(this.g)+ub(this.b)};var Uh=Wg.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});Uh.forEach(function(a,b){Uh.set(a,qb(b))}),Wg.functor=Ab,Wg.xhr=Cb(Bb),Wg.dsv=function(a,b){function c(a,c,f){arguments.length<3&&(f=c,c=null);var g=Db(a,b,null==c?d:e(c),f);return g.row=function(a){return arguments.length?g.response(null==(c=a)?d:e(a)):c},g}function d(a){return c.parse(a.responseText)}function e(a){return function(b){return c.parse(b.responseText,a)}}function f(b){return b.map(g).join(a)}function g(a){return h.test(a)?'"'+a.replace(/\"/g,'""')+'"':a}var h=new RegExp('["'+a+"\n]"),i=a.charCodeAt(0);return c.parse=function(a,b){var d;return c.parseRows(a,function(a,c){if(d)return d(a,c-1);var e=new Function("d","return {"+a.map(function(a,b){return JSON.stringify(a)+": d["+b+"]"}).join(",")+"}");d=b?function(a,c){return b(e(a),c)}:e})},c.parseRows=function(a,b){function c(){if(k>=j)return g;if(e)return e=!1,f;var b=k;if(34===a.charCodeAt(b)){for(var c=b;c++<j;)if(34===a.charCodeAt(c)){if(34!==a.charCodeAt(c+1))break;++c}k=c+2;var d=a.charCodeAt(c+1);return 13===d?(e=!0,10===a.charCodeAt(c+2)&&++k):10===d&&(e=!0),a.substring(b+1,c).replace(/""/g,'"')}for(;j>k;){var d=a.charCodeAt(k++),h=1;if(10===d)e=!0;else if(13===d)e=!0,10===a.charCodeAt(k)&&(++k,++h);else if(d!==i)continue;return a.substring(b,k-h)}return a.substring(b)}for(var d,e,f={},g={},h=[],j=a.length,k=0,l=0;(d=c())!==g;){for(var m=[];d!==f&&d!==g;)m.push(d),d=c();(!b||(m=b(m,l++)))&&h.push(m)}return h},c.format=function(b){if(Array.isArray(b[0]))return c.formatRows(b);var d=new m,e=[];return b.forEach(function(a){for(var b in a)d.has(b)||e.push(d.add(b))}),[e.map(g).join(a)].concat(b.map(function(b){return e.map(function(a){return g(b[a])}).join(a)})).join("\n")},c.formatRows=function(a){return a.map(f).join("\n")},c},Wg.csv=Wg.dsv(",","text/csv"),Wg.tsv=Wg.dsv("	","text/tab-separated-values"),Wg.touch=function(a,b,c){if(arguments.length<3&&(c=b,b=t().changedTouches),b)for(var d,e=0,f=b.length;f>e;++e)if((d=b[e]).identifier===c)return S(a,d)};var Vh,Wh,Xh,Yh,Zh,$h=_g[o(_g,"requestAnimationFrame")]||function(a){setTimeout(a,17)};Wg.timer=function(a,b,c){var d=arguments.length;2>d&&(b=0),3>d&&(c=Date.now());var e=c+b,f={c:a,t:e,f:!1,n:null};Wh?Wh.n=f:Vh=f,Wh=f,Xh||(Yh=clearTimeout(Yh),Xh=1,$h(Fb))},Wg.timer.flush=function(){Gb(),Hb()},Wg.round=function(a,b){return b?Math.round(a*(b=Math.pow(10,b)))/b:Math.round(a)};var _h=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"].map(Jb);Wg.formatPrefix=function(a,b){var c=0;return a&&(0>a&&(a*=-1),b&&(a=Wg.round(a,Ib(a,b))),c=1+Math.floor(1e-12+Math.log(a)/Math.LN10),c=Math.max(-24,Math.min(24,3*Math.floor((c-1)/3)))),_h[8+c/3]};var ai=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,bi=Wg.map({b:function(a){return a.toString(2)},c:function(a){return String.fromCharCode(a)},o:function(a){return a.toString(8)},x:function(a){return a.toString(16)},X:function(a){return a.toString(16).toUpperCase()},g:function(a,b){return a.toPrecision(b)},e:function(a,b){return a.toExponential(b)},f:function(a,b){return a.toFixed(b)},r:function(a,b){return(a=Wg.round(a,Ib(a,b))).toFixed(Math.max(0,Math.min(20,Ib(a*(1+1e-15),b))))}}),ci=Wg.time={},di=Date;Mb.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){ei.setUTCDate.apply(this._,arguments)},setDay:function(){ei.setUTCDay.apply(this._,arguments)},setFullYear:function(){ei.setUTCFullYear.apply(this._,arguments)},setHours:function(){ei.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){ei.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){ei.setUTCMinutes.apply(this._,arguments)},setMonth:function(){ei.setUTCMonth.apply(this._,arguments)},setSeconds:function(){ei.setUTCSeconds.apply(this._,arguments)},setTime:function(){ei.setTime.apply(this._,arguments)}};var ei=Date.prototype;ci.year=Nb(function(a){return a=ci.day(a),a.setMonth(0,1),a},function(a,b){a.setFullYear(a.getFullYear()+b)},function(a){return a.getFullYear()}),ci.years=ci.year.range,ci.years.utc=ci.year.utc.range,ci.day=Nb(function(a){var b=new di(2e3,0);return b.setFullYear(a.getFullYear(),a.getMonth(),a.getDate()),b},function(a,b){a.setDate(a.getDate()+b)},function(a){return a.getDate()-1}),ci.days=ci.day.range,ci.days.utc=ci.day.utc.range,ci.dayOfYear=function(a){var b=ci.year(a);return Math.floor((a-b-6e4*(a.getTimezoneOffset()-b.getTimezoneOffset()))/864e5)},["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].forEach(function(a,b){b=7-b;var c=ci[a]=Nb(function(a){return(a=ci.day(a)).setDate(a.getDate()-(a.getDay()+b)%7),a},function(a,b){a.setDate(a.getDate()+7*Math.floor(b))},function(a){var c=ci.year(a).getDay();return Math.floor((ci.dayOfYear(a)+(c+b)%7)/7)-(c!==b)});ci[a+"s"]=c.range,ci[a+"s"].utc=c.utc.range,ci[a+"OfYear"]=function(a){var c=ci.year(a).getDay();return Math.floor((ci.dayOfYear(a)+(c+b)%7)/7)}}),ci.week=ci.sunday,ci.weeks=ci.sunday.range,ci.weeks.utc=ci.sunday.utc.range,ci.weekOfYear=ci.sundayOfYear;var fi={"-":"",_:" ",0:"0"},gi=/^\s*\d+/,hi=/^%/;Wg.locale=function(a){return{numberFormat:Kb(a),timeFormat:Pb(a)}};var ii=Wg.locale({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});Wg.format=ii.numberFormat,Wg.geo={},ic.prototype={s:0,t:0,add:function(a){jc(a,this.t,ji),jc(ji.s,this.s,this),this.s?this.t+=ji.t:this.s=ji.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var ji=new ic;Wg.geo.stream=function(a,b){a&&ki.hasOwnProperty(a.type)?ki[a.type](a,b):kc(a,b)};var ki={Feature:function(a,b){kc(a.geometry,b)},FeatureCollection:function(a,b){for(var c=a.features,d=-1,e=c.length;++d<e;)kc(c[d].geometry,b)}},li={Sphere:function(a,b){b.sphere()},Point:function(a,b){a=a.coordinates,b.point(a[0],a[1],a[2])},MultiPoint:function(a,b){for(var c=a.coordinates,d=-1,e=c.length;++d<e;)a=c[d],b.point(a[0],a[1],a[2])},LineString:function(a,b){lc(a.coordinates,b,0)},MultiLineString:function(a,b){for(var c=a.coordinates,d=-1,e=c.length;++d<e;)lc(c[d],b,0)},Polygon:function(a,b){mc(a.coordinates,b)},MultiPolygon:function(a,b){for(var c=a.coordinates,d=-1,e=c.length;++d<e;)mc(c[d],b)},GeometryCollection:function(a,b){for(var c=a.geometries,d=-1,e=c.length;++d<e;)kc(c[d],b)}};Wg.geo.area=function(a){return mi=0,Wg.geo.stream(a,oi),mi};var mi,ni=new ic,oi={sphere:function(){mi+=4*zh},point:p,lineStart:p,lineEnd:p,polygonStart:function(){ni.reset(),oi.lineStart=nc},polygonEnd:function(){var a=2*ni;mi+=0>a?4*zh+a:a,oi.lineStart=oi.lineEnd=oi.point=p}};Wg.geo.bounds=function(){function a(a,b){t.push(u=[k=a,m=a]),l>b&&(l=b),b>n&&(n=b)}function b(b,c){var d=oc([b*Eh,c*Eh]);if(r){var e=qc(r,d),f=[e[1],-e[0],0],g=qc(f,e);tc(g),g=uc(g);var i=b-o,j=i>0?1:-1,p=g[0]*Fh*j,q=ih(i)>180;if(q^(p>j*o&&j*b>p)){var s=g[1]*Fh;s>n&&(n=s)}else if(p=(p+360)%360-180,q^(p>j*o&&j*b>p)){var s=-g[1]*Fh;l>s&&(l=s)}else l>c&&(l=c),c>n&&(n=c);q?o>b?h(k,b)>h(k,m)&&(m=b):h(b,m)>h(k,m)&&(k=b):m>=k?(k>b&&(k=b),b>m&&(m=b)):b>o?h(k,b)>h(k,m)&&(m=b):h(b,m)>h(k,m)&&(k=b)}else a(b,c);r=d,o=b}function c(){v.point=b}function d(){u[0]=k,u[1]=m,v.point=a,r=null}function e(a,c){if(r){var d=a-o;s+=ih(d)>180?d+(d>0?360:-360):d}else p=a,q=c;oi.point(a,c),b(a,c)}function f(){oi.lineStart()}function g(){e(p,q),oi.lineEnd(),ih(s)>Ch&&(k=-(m=180)),u[0]=k,u[1]=m,r=null}function h(a,b){return(b-=a)<0?b+360:b}function i(a,b){return a[0]-b[0]}function j(a,b){return b[0]<=b[1]?b[0]<=a&&a<=b[1]:a<b[0]||b[1]<a}var k,l,m,n,o,p,q,r,s,t,u,v={point:a,lineStart:c,lineEnd:d,polygonStart:function(){v.point=e,v.lineStart=f,v.lineEnd=g,s=0,oi.polygonStart()},polygonEnd:function(){oi.polygonEnd(),v.point=a,v.lineStart=c,v.lineEnd=d,0>ni?(k=-(m=180),l=-(n=90)):s>Ch?n=90:-Ch>s&&(l=-90),u[0]=k,u[1]=m}};return function(a){n=m=-(k=l=1/0),t=[],Wg.geo.stream(a,v);var b=t.length;if(b){t.sort(i);for(var c,d=1,e=t[0],f=[e];b>d;++d)c=t[d],j(c[0],e)||j(c[1],e)?(h(e[0],c[1])>h(e[0],e[1])&&(e[1]=c[1]),h(c[0],e[1])>h(e[0],e[1])&&(e[0]=c[0])):f.push(e=c);for(var g,c,o=-1/0,b=f.length-1,d=0,e=f[b];b>=d;e=c,++d)c=f[d],(g=h(e[1],c[0]))>o&&(o=g,k=c[0],m=e[1])}return t=u=null,1/0===k||1/0===l?[[0/0,0/0],[0/0,0/0]]:[[k,l],[m,n]]}}(),Wg.geo.centroid=function(a){pi=qi=ri=si=ti=ui=vi=wi=xi=yi=zi=0,Wg.geo.stream(a,Ai);var b=xi,c=yi,d=zi,e=b*b+c*c+d*d;return Dh>e&&(b=ui,c=vi,d=wi,Ch>qi&&(b=ri,c=si,d=ti),e=b*b+c*c+d*d,Dh>e)?[0/0,0/0]:[Math.atan2(c,b)*Fh,Z(d/Math.sqrt(e))*Fh]};var pi,qi,ri,si,ti,ui,vi,wi,xi,yi,zi,Ai={sphere:p,point:wc,lineStart:yc,lineEnd:zc,polygonStart:function(){Ai.lineStart=Ac},polygonEnd:function(){Ai.lineStart=yc}},Bi=Fc(Bc,Kc,Mc,[-zh,-zh/2]),Ci=1e9;Wg.geo.clipExtent=function(){var a,b,c,d,e,f,g={stream:function(a){return e&&(e.valid=!1),e=f(a),e.valid=!0,e},extent:function(h){return arguments.length?(f=Pc(a=+h[0][0],b=+h[0][1],c=+h[1][0],d=+h[1][1]),e&&(e.valid=!1,e=null),g):[[a,b],[c,d]]}};return g.extent([[0,0],[960,500]])},(Wg.geo.conicEqualArea=function(){return Rc(Sc)}).raw=Sc,Wg.geo.albers=function(){return Wg.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},Wg.geo.albersUsa=function(){function a(a){var f=a[0],g=a[1];return b=null,c(f,g),b||(d(f,g),b)||e(f,g),b}var b,c,d,e,f=Wg.geo.albers(),g=Wg.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),h=Wg.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),i={point:function(a,c){b=[a,c]}};return a.invert=function(a){var b=f.scale(),c=f.translate(),d=(a[0]-c[0])/b,e=(a[1]-c[1])/b;return(e>=.12&&.234>e&&d>=-.425&&-.214>d?g:e>=.166&&.234>e&&d>=-.214&&-.115>d?h:f).invert(a)},a.stream=function(a){var b=f.stream(a),c=g.stream(a),d=h.stream(a);return{point:function(a,e){b.point(a,e),c.point(a,e),d.point(a,e)},sphere:function(){b.sphere(),c.sphere(),d.sphere()},lineStart:function(){b.lineStart(),c.lineStart(),d.lineStart()},lineEnd:function(){b.lineEnd(),c.lineEnd(),d.lineEnd()},polygonStart:function(){b.polygonStart(),c.polygonStart(),d.polygonStart()},polygonEnd:function(){b.polygonEnd(),c.polygonEnd(),d.polygonEnd()}}},a.precision=function(b){return arguments.length?(f.precision(b),g.precision(b),h.precision(b),a):f.precision()},a.scale=function(b){return arguments.length?(f.scale(b),g.scale(.35*b),h.scale(b),a.translate(f.translate())):f.scale()},a.translate=function(b){if(!arguments.length)return f.translate();var j=f.scale(),k=+b[0],l=+b[1];return c=f.translate(b).clipExtent([[k-.455*j,l-.238*j],[k+.455*j,l+.238*j]]).stream(i).point,d=g.translate([k-.307*j,l+.201*j]).clipExtent([[k-.425*j+Ch,l+.12*j+Ch],[k-.214*j-Ch,l+.234*j-Ch]]).stream(i).point,e=h.translate([k-.205*j,l+.212*j]).clipExtent([[k-.214*j+Ch,l+.166*j+Ch],[k-.115*j-Ch,l+.234*j-Ch]]).stream(i).point,a},a.scale(1070)};var Di,Ei,Fi,Gi,Hi,Ii,Ji={point:p,lineStart:p,lineEnd:p,polygonStart:function(){Ei=0,Ji.lineStart=Tc},polygonEnd:function(){Ji.lineStart=Ji.lineEnd=Ji.point=p,Di+=ih(Ei/2)}},Ki={point:Uc,lineStart:p,lineEnd:p,polygonStart:p,polygonEnd:p},Li={point:Xc,lineStart:Yc,lineEnd:Zc,polygonStart:function(){Li.lineStart=$c},polygonEnd:function(){Li.point=Xc,Li.lineStart=Yc,Li.lineEnd=Zc}};Wg.geo.path=function(){function a(a){return a&&("function"==typeof h&&f.pointRadius(+h.apply(this,arguments)),g&&g.valid||(g=e(f)),Wg.geo.stream(a,g)),f.result()}function b(){return g=null,a}var c,d,e,f,g,h=4.5;return a.area=function(a){return Di=0,Wg.geo.stream(a,e(Ji)),Di},a.centroid=function(a){return ri=si=ti=ui=vi=wi=xi=yi=zi=0,Wg.geo.stream(a,e(Li)),zi?[xi/zi,yi/zi]:wi?[ui/wi,vi/wi]:ti?[ri/ti,si/ti]:[0/0,0/0]},a.bounds=function(a){return Hi=Ii=-(Fi=Gi=1/0),Wg.geo.stream(a,e(Ki)),[[Fi,Gi],[Hi,Ii]]},a.projection=function(a){return arguments.length?(e=(c=a)?a.stream||bd(a):Bb,b()):c},a.context=function(a){return arguments.length?(f=null==(d=a)?new Vc:new _c(a),"function"!=typeof h&&f.pointRadius(h),b()):d},a.pointRadius=function(b){return arguments.length?(h="function"==typeof b?b:(f.pointRadius(+b),+b),a):h},a.projection(Wg.geo.albersUsa()).context(null)},Wg.geo.transform=function(a){return{stream:function(b){var c=new cd(b);for(var d in a)c[d]=a[d];return c}}},cd.prototype={point:function(a,b){this.stream.point(a,b)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},Wg.geo.projection=ed,Wg.geo.projectionMutator=fd,(Wg.geo.equirectangular=function(){return ed(hd)}).raw=hd.invert=hd,Wg.geo.rotation=function(a){function b(b){return b=a(b[0]*Eh,b[1]*Eh),b[0]*=Fh,b[1]*=Fh,b}return a=jd(a[0]%360*Eh,a[1]*Eh,a.length>2?a[2]*Eh:0),b.invert=function(b){return b=a.invert(b[0]*Eh,b[1]*Eh),b[0]*=Fh,b[1]*=Fh,b},b},id.invert=hd,Wg.geo.circle=function(){function a(){var a="function"==typeof d?d.apply(this,arguments):d,b=jd(-a[0]*Eh,-a[1]*Eh,0).invert,e=[];return c(null,null,1,{point:function(a,c){e.push(a=b(a,c)),a[0]*=Fh,a[1]*=Fh}}),{type:"Polygon",coordinates:[e]}}var b,c,d=[0,0],e=6;return a.origin=function(b){return arguments.length?(d=b,a):d},a.angle=function(d){return arguments.length?(c=nd((b=+d)*Eh,e*Eh),a):b},a.precision=function(d){return arguments.length?(c=nd(b*Eh,(e=+d)*Eh),a):e},a.angle(90)},Wg.geo.distance=function(a,b){var c,d=(b[0]-a[0])*Eh,e=a[1]*Eh,f=b[1]*Eh,g=Math.sin(d),h=Math.cos(d),i=Math.sin(e),j=Math.cos(e),k=Math.sin(f),l=Math.cos(f);return Math.atan2(Math.sqrt((c=l*g)*c+(c=j*k-i*l*h)*c),i*k+j*l*h)},Wg.geo.graticule=function(){function a(){return{type:"MultiLineString",coordinates:b()}}function b(){return Wg.range(Math.ceil(f/q)*q,e,q).map(m).concat(Wg.range(Math.ceil(j/r)*r,i,r).map(n)).concat(Wg.range(Math.ceil(d/o)*o,c,o).filter(function(a){return ih(a%q)>Ch}).map(k)).concat(Wg.range(Math.ceil(h/p)*p,g,p).filter(function(a){return ih(a%r)>Ch}).map(l))}var c,d,e,f,g,h,i,j,k,l,m,n,o=10,p=o,q=90,r=360,s=2.5;return a.lines=function(){return b().map(function(a){return{type:"LineString",coordinates:a}})},a.outline=function(){return{type:"Polygon",coordinates:[m(f).concat(n(i).slice(1),m(e).reverse().slice(1),n(j).reverse().slice(1))]}},a.extent=function(b){return arguments.length?a.majorExtent(b).minorExtent(b):a.minorExtent()},a.majorExtent=function(b){return arguments.length?(f=+b[0][0],e=+b[1][0],j=+b[0][1],i=+b[1][1],f>e&&(b=f,f=e,e=b),j>i&&(b=j,j=i,i=b),a.precision(s)):[[f,j],[e,i]]},a.minorExtent=function(b){return arguments.length?(d=+b[0][0],c=+b[1][0],h=+b[0][1],g=+b[1][1],d>c&&(b=d,d=c,c=b),h>g&&(b=h,h=g,g=b),a.precision(s)):[[d,h],[c,g]]},a.step=function(b){return arguments.length?a.majorStep(b).minorStep(b):a.minorStep()},a.majorStep=function(b){return arguments.length?(q=+b[0],r=+b[1],a):[q,r]},a.minorStep=function(b){return arguments.length?(o=+b[0],p=+b[1],a):[o,p]},a.precision=function(b){return arguments.length?(s=+b,k=pd(h,g,90),l=qd(d,c,s),m=pd(j,i,90),n=qd(f,e,s),a):s},a.majorExtent([[-180,-90+Ch],[180,90-Ch]]).minorExtent([[-180,-80-Ch],[180,80+Ch]])},Wg.geo.greatArc=function(){function a(){return{type:"LineString",coordinates:[b||d.apply(this,arguments),c||e.apply(this,arguments)]}}var b,c,d=rd,e=sd;return a.distance=function(){return Wg.geo.distance(b||d.apply(this,arguments),c||e.apply(this,arguments))},a.source=function(c){return arguments.length?(d=c,b="function"==typeof c?null:c,a):d},a.target=function(b){return arguments.length?(e=b,c="function"==typeof b?null:b,a):e},a.precision=function(){return arguments.length?a:0},a},Wg.geo.interpolate=function(a,b){return td(a[0]*Eh,a[1]*Eh,b[0]*Eh,b[1]*Eh)},Wg.geo.length=function(a){return Mi=0,Wg.geo.stream(a,Ni),Mi};var Mi,Ni={sphere:p,point:p,lineStart:ud,lineEnd:p,polygonStart:p,polygonEnd:p},Oi=vd(function(a){return Math.sqrt(2/(1+a))},function(a){return 2*Math.asin(a/2)});(Wg.geo.azimuthalEqualArea=function(){return ed(Oi)}).raw=Oi;var Pi=vd(function(a){var b=Math.acos(a);return b&&b/Math.sin(b)},Bb);(Wg.geo.azimuthalEquidistant=function(){return ed(Pi)}).raw=Pi,(Wg.geo.conicConformal=function(){return Rc(wd)}).raw=wd,(Wg.geo.conicEquidistant=function(){return Rc(xd)}).raw=xd;var Qi=vd(function(a){return 1/a},Math.atan);(Wg.geo.gnomonic=function(){return ed(Qi)}).raw=Qi,yd.invert=function(a,b){return[a,2*Math.atan(Math.exp(b))-Bh]},(Wg.geo.mercator=function(){return zd(yd)}).raw=yd;var Ri=vd(function(){return 1},Math.asin);(Wg.geo.orthographic=function(){return ed(Ri)}).raw=Ri;var Si=vd(function(a){return 1/(1+a)},function(a){return 2*Math.atan(a)});(Wg.geo.stereographic=function(){return ed(Si)}).raw=Si,Ad.invert=function(a,b){return[-b,2*Math.atan(Math.exp(a))-Bh]},(Wg.geo.transverseMercator=function(){var a=zd(Ad),b=a.center,c=a.rotate;return a.center=function(a){return a?b([-a[1],a[0]]):(a=b(),[-a[1],a[0]])},a.rotate=function(a){return a?c([a[0],a[1],a.length>2?a[2]+90:90]):(a=c(),[a[0],a[1],a[2]-90])},a.rotate([0,0])}).raw=Ad,Wg.geom={},Wg.geom.hull=function(a){function b(a){if(a.length<3)return[];var b,e=Ab(c),f=Ab(d),g=a.length,h=[],i=[];for(b=0;g>b;b++)h.push([+e.call(this,a[b],b),+f.call(this,a[b],b),b]);for(h.sort(Ed),b=0;g>b;b++)i.push([h[b][0],-h[b][1]]);var j=Dd(h),k=Dd(i),l=k[0]===j[0],m=k[k.length-1]===j[j.length-1],n=[];for(b=j.length-1;b>=0;--b)n.push(a[h[j[b]][2]]);for(b=+l;b<k.length-m;++b)n.push(a[h[k[b]][2]]);return n}var c=Bd,d=Cd;return arguments.length?b(a):(b.x=function(a){return arguments.length?(c=a,b):c},b.y=function(a){return arguments.length?(d=a,b):d},b)},Wg.geom.polygon=function(a){return nh(a,Ti),a};var Ti=Wg.geom.polygon.prototype=[];Ti.area=function(){for(var a,b=-1,c=this.length,d=this[c-1],e=0;++b<c;)a=d,d=this[b],e+=a[1]*d[0]-a[0]*d[1];return.5*e},Ti.centroid=function(a){var b,c,d=-1,e=this.length,f=0,g=0,h=this[e-1];for(arguments.length||(a=-1/(6*this.area()));++d<e;)b=h,h=this[d],c=b[0]*h[1]-h[0]*b[1],f+=(b[0]+h[0])*c,g+=(b[1]+h[1])*c;return[f*a,g*a]},Ti.clip=function(a){for(var b,c,d,e,f,g,h=Hd(a),i=-1,j=this.length-Hd(this),k=this[j-1];++i<j;){for(b=a.slice(),a.length=0,e=this[i],f=b[(d=b.length-h)-1],c=-1;++c<d;)g=b[c],Fd(g,k,e)?(Fd(f,k,e)||a.push(Gd(f,g,k,e)),a.push(g)):Fd(f,k,e)&&a.push(Gd(f,g,k,e)),f=g;h&&a.push(a[0]),k=e}return a};var Ui,Vi,Wi,Xi,Yi,Zi=[],$i=[];Pd.prototype.prepare=function(){for(var a,b=this.edges,c=b.length;c--;)a=b[c].edge,a.b&&a.a||b.splice(c,1);return b.sort(Rd),b.length},_d.prototype={start:function(){return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a}},ae.prototype={insert:function(a,b){var c,d,e;if(a){if(b.P=a,b.N=a.N,a.N&&(a.N.P=b),a.N=b,a.R){for(a=a.R;a.L;)a=a.L;a.L=b}else a.R=b;c=a}else this._?(a=ee(this._),b.P=null,b.N=a,a.P=a.L=b,c=a):(b.P=b.N=null,this._=b,c=null);for(b.L=b.R=null,b.U=c,b.C=!0,a=b;c&&c.C;)d=c.U,c===d.L?(e=d.R,e&&e.C?(c.C=e.C=!1,d.C=!0,a=d):(a===c.R&&(ce(this,c),a=c,c=a.U),c.C=!1,d.C=!0,de(this,d))):(e=d.L,e&&e.C?(c.C=e.C=!1,d.C=!0,a=d):(a===c.L&&(de(this,c),a=c,c=a.U),c.C=!1,d.C=!0,ce(this,d))),c=a.U;this._.C=!1},remove:function(a){a.N&&(a.N.P=a.P),a.P&&(a.P.N=a.N),a.N=a.P=null;var b,c,d,e=a.U,f=a.L,g=a.R;if(c=f?g?ee(g):f:g,e?e.L===a?e.L=c:e.R=c:this._=c,f&&g?(d=c.C,c.C=a.C,c.L=f,f.U=c,c!==g?(e=c.U,c.U=a.U,a=c.R,e.L=a,c.R=g,g.U=c):(c.U=e,e=c,a=c.R)):(d=a.C,a=c),a&&(a.U=e),!d){if(a&&a.C)return void(a.C=!1);do{if(a===this._)break;if(a===e.L){if(b=e.R,b.C&&(b.C=!1,e.C=!0,ce(this,e),b=e.R),b.L&&b.L.C||b.R&&b.R.C){b.R&&b.R.C||(b.L.C=!1,b.C=!0,de(this,b),b=e.R),b.C=e.C,e.C=b.R.C=!1,ce(this,e),a=this._;break}}else if(b=e.L,b.C&&(b.C=!1,e.C=!0,de(this,e),b=e.L),b.L&&b.L.C||b.R&&b.R.C){b.L&&b.L.C||(b.R.C=!1,b.C=!0,ce(this,b),b=e.L),b.C=e.C,e.C=b.L.C=!1,de(this,e),a=this._;break}b.C=!0,a=e,e=e.U}while(!a.C);a&&(a.C=!1)}}},Wg.geom.voronoi=function(a){function b(a){var b=new Array(a.length),d=h[0][0],e=h[0][1],f=h[1][0],g=h[1][1];return fe(c(a),h).cells.forEach(function(c,h){var i=c.edges,j=c.site,k=b[h]=i.length?i.map(function(a){var b=a.start();return[b.x,b.y]}):j.x>=d&&j.x<=f&&j.y>=e&&j.y<=g?[[d,g],[f,g],[f,e],[d,e]]:[];k.point=a[h]}),b}function c(a){return a.map(function(a,b){return{x:Math.round(f(a,b)/Ch)*Ch,y:Math.round(g(a,b)/Ch)*Ch,i:b}})}var d=Bd,e=Cd,f=d,g=e,h=_i;return a?b(a):(b.links=function(a){return fe(c(a)).edges.filter(function(a){return a.l&&a.r}).map(function(b){return{source:a[b.l.i],target:a[b.r.i]}})},b.triangles=function(a){var b=[];return fe(c(a)).cells.forEach(function(c,d){for(var e,f,g=c.site,h=c.edges.sort(Rd),i=-1,j=h.length,k=h[j-1].edge,l=k.l===g?k.r:k.l;++i<j;)e=k,f=l,k=h[i].edge,l=k.l===g?k.r:k.l,d<f.i&&d<l.i&&he(g,f,l)<0&&b.push([a[d],a[f.i],a[l.i]])}),b},b.x=function(a){return arguments.length?(f=Ab(d=a),b):d},b.y=function(a){return arguments.length?(g=Ab(e=a),b):e},b.clipExtent=function(a){return arguments.length?(h=null==a?_i:a,b):h===_i?null:h},b.size=function(a){return arguments.length?b.clipExtent(a&&[[0,0],a]):h===_i?null:h&&h[1]},b)};var _i=[[-1e6,-1e6],[1e6,1e6]];Wg.geom.delaunay=function(a){return Wg.geom.voronoi().triangles(a)},Wg.geom.quadtree=function(a,b,c,d,e){function f(a){function f(a,b,c,d,e,f,g,h){if(!isNaN(c)&&!isNaN(d))if(a.leaf){var i=a.x,k=a.y;if(null!=i)if(ih(i-c)+ih(k-d)<.01)j(a,b,c,d,e,f,g,h);else{var l=a.point;a.x=a.y=a.point=null,j(a,l,i,k,e,f,g,h),j(a,b,c,d,e,f,g,h)}else a.x=c,a.y=d,a.point=b}else j(a,b,c,d,e,f,g,h)}function j(a,b,c,d,e,g,h,i){var j=.5*(e+h),k=.5*(g+i),l=c>=j,m=d>=k,n=(m<<1)+l;a.leaf=!1,a=a.nodes[n]||(a.nodes[n]=ke()),l?e=j:h=j,m?g=k:i=k,f(a,b,c,d,e,g,h,i)}var k,l,m,n,o,p,q,r,s,t=Ab(h),u=Ab(i);if(null!=b)p=b,q=c,r=d,s=e;else if(r=s=-(p=q=1/0),l=[],m=[],o=a.length,g)for(n=0;o>n;++n)k=a[n],k.x<p&&(p=k.x),k.y<q&&(q=k.y),k.x>r&&(r=k.x),k.y>s&&(s=k.y),l.push(k.x),m.push(k.y);else for(n=0;o>n;++n){var v=+t(k=a[n],n),w=+u(k,n);p>v&&(p=v),q>w&&(q=w),v>r&&(r=v),w>s&&(s=w),l.push(v),m.push(w)}var x=r-p,y=s-q;x>y?s=q+x:r=p+y;var z=ke();if(z.add=function(a){f(z,a,+t(a,++n),+u(a,n),p,q,r,s)},z.visit=function(a){le(a,z,p,q,r,s)},n=-1,null==b){for(;++n<o;)f(z,a[n],l[n],m[n],p,q,r,s);--n}else a.forEach(z.add);return l=m=a=k=null,z}var g,h=Bd,i=Cd;return(g=arguments.length)?(h=ie,i=je,3===g&&(e=c,d=b,c=b=0),f(a)):(f.x=function(a){return arguments.length?(h=a,f):h},f.y=function(a){return arguments.length?(i=a,f):i},f.extent=function(a){return arguments.length?(null==a?b=c=d=e=null:(b=+a[0][0],c=+a[0][1],d=+a[1][0],e=+a[1][1]),f):null==b?null:[[b,c],[d,e]]},f.size=function(a){return arguments.length?(null==a?b=c=d=e=null:(b=c=0,d=+a[0],e=+a[1]),f):null==b?null:[d-b,e-c]},f)},Wg.interpolateRgb=me,Wg.interpolateObject=ne,Wg.interpolateNumber=oe,Wg.interpolateString=pe;var aj=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,bj=new RegExp(aj.source,"g");Wg.interpolate=qe,Wg.interpolators=[function(a,b){var c=typeof b;return("string"===c?Uh.has(b)||/^(#|rgb\(|hsl\()/.test(b)?me:pe:b instanceof cb?me:Array.isArray(b)?re:"object"===c&&isNaN(b)?ne:oe)(a,b)}],Wg.interpolateArray=re;var cj=function(){return Bb},dj=Wg.map({linear:cj,poly:ye,quad:function(){return ve},cubic:function(){return we},sin:function(){return ze},exp:function(){return Ae},circle:function(){return Be},elastic:Ce,back:De,bounce:function(){return Ee}}),ej=Wg.map({"in":Bb,out:te,"in-out":ue,"out-in":function(a){return ue(te(a))}});Wg.ease=function(a){var b=a.indexOf("-"),c=b>=0?a.substring(0,b):a,d=b>=0?a.substring(b+1):"in";return c=dj.get(c)||cj,d=ej.get(d)||Bb,se(d(c.apply(null,Xg.call(arguments,1))))},Wg.interpolateHcl=Fe,Wg.interpolateHsl=Ge,Wg.interpolateLab=He,Wg.interpolateRound=Ie,Wg.transform=function(a){var b=Zg.createElementNS(Wg.ns.prefix.svg,"g");
return(Wg.transform=function(a){if(null!=a){b.setAttribute("transform",a);var c=b.transform.baseVal.consolidate()}return new Je(c?c.matrix:fj)})(a)},Je.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var fj={a:1,b:0,c:0,d:1,e:0,f:0};Wg.interpolateTransform=Ne,Wg.layout={},Wg.layout.bundle=function(){return function(a){for(var b=[],c=-1,d=a.length;++c<d;)b.push(Qe(a[c]));return b}},Wg.layout.chord=function(){function a(){var a,j,l,m,n,o={},p=[],q=Wg.range(f),r=[];for(c=[],d=[],a=0,m=-1;++m<f;){for(j=0,n=-1;++n<f;)j+=e[m][n];p.push(j),r.push(Wg.range(f)),a+=j}for(g&&q.sort(function(a,b){return g(p[a],p[b])}),h&&r.forEach(function(a,b){a.sort(function(a,c){return h(e[b][a],e[b][c])})}),a=(Ah-k*f)/a,j=0,m=-1;++m<f;){for(l=j,n=-1;++n<f;){var s=q[m],t=r[s][n],u=e[s][t],v=j,w=j+=u*a;o[s+"-"+t]={index:s,subindex:t,startAngle:v,endAngle:w,value:u}}d[s]={index:s,startAngle:l,endAngle:j,value:(j-l)/a},j+=k}for(m=-1;++m<f;)for(n=m-1;++n<f;){var x=o[m+"-"+n],y=o[n+"-"+m];(x.value||y.value)&&c.push(x.value<y.value?{source:y,target:x}:{source:x,target:y})}i&&b()}function b(){c.sort(function(a,b){return i((a.source.value+a.target.value)/2,(b.source.value+b.target.value)/2)})}var c,d,e,f,g,h,i,j={},k=0;return j.matrix=function(a){return arguments.length?(f=(e=a)&&e.length,c=d=null,j):e},j.padding=function(a){return arguments.length?(k=a,c=d=null,j):k},j.sortGroups=function(a){return arguments.length?(g=a,c=d=null,j):g},j.sortSubgroups=function(a){return arguments.length?(h=a,c=null,j):h},j.sortChords=function(a){return arguments.length?(i=a,c&&b(),j):i},j.chords=function(){return c||a(),c},j.groups=function(){return d||a(),d},j},Wg.layout.force=function(){function a(a){return function(b,c,d,e){if(b.point!==a){var f=b.cx-a.x,g=b.cy-a.y,h=e-c,i=f*f+g*g;if(i>h*h/q){if(o>i){var j=b.charge/i;a.px-=f*j,a.py-=g*j}return!0}if(b.point&&i&&o>i){var j=b.pointCharge/i;a.px-=f*j,a.py-=g*j}}return!b.charge}}function b(a){a.px=Wg.event.x,a.py=Wg.event.y,h.resume()}var c,d,e,f,g,h={},i=Wg.dispatch("start","tick","end"),j=[1,1],k=.9,l=gj,m=hj,n=-30,o=ij,p=.1,q=.64,r=[],s=[];return h.tick=function(){if((d*=.99)<.005)return i.end({type:"end",alpha:d=0}),!0;var b,c,h,l,m,o,q,t,u,v=r.length,w=s.length;for(c=0;w>c;++c)h=s[c],l=h.source,m=h.target,t=m.x-l.x,u=m.y-l.y,(o=t*t+u*u)&&(o=d*f[c]*((o=Math.sqrt(o))-e[c])/o,t*=o,u*=o,m.x-=t*(q=l.weight/(m.weight+l.weight)),m.y-=u*q,l.x+=t*(q=1-q),l.y+=u*q);if((q=d*p)&&(t=j[0]/2,u=j[1]/2,c=-1,q))for(;++c<v;)h=r[c],h.x+=(t-h.x)*q,h.y+=(u-h.y)*q;if(n)for(Xe(b=Wg.geom.quadtree(r),d,g),c=-1;++c<v;)(h=r[c]).fixed||b.visit(a(h));for(c=-1;++c<v;)h=r[c],h.fixed?(h.x=h.px,h.y=h.py):(h.x-=(h.px-(h.px=h.x))*k,h.y-=(h.py-(h.py=h.y))*k);i.tick({type:"tick",alpha:d})},h.nodes=function(a){return arguments.length?(r=a,h):r},h.links=function(a){return arguments.length?(s=a,h):s},h.size=function(a){return arguments.length?(j=a,h):j},h.linkDistance=function(a){return arguments.length?(l="function"==typeof a?a:+a,h):l},h.distance=h.linkDistance,h.linkStrength=function(a){return arguments.length?(m="function"==typeof a?a:+a,h):m},h.friction=function(a){return arguments.length?(k=+a,h):k},h.charge=function(a){return arguments.length?(n="function"==typeof a?a:+a,h):n},h.chargeDistance=function(a){return arguments.length?(o=a*a,h):Math.sqrt(o)},h.gravity=function(a){return arguments.length?(p=+a,h):p},h.theta=function(a){return arguments.length?(q=a*a,h):Math.sqrt(q)},h.alpha=function(a){return arguments.length?(a=+a,d?d=a>0?a:0:a>0&&(i.start({type:"start",alpha:d=a}),Wg.timer(h.tick)),h):d},h.start=function(){function a(a,d){if(!c){for(c=new Array(i),h=0;i>h;++h)c[h]=[];for(h=0;j>h;++h){var e=s[h];c[e.source.index].push(e.target),c[e.target.index].push(e.source)}}for(var f,g=c[b],h=-1,j=g.length;++h<j;)if(!isNaN(f=g[h][a]))return f;return Math.random()*d}var b,c,d,i=r.length,k=s.length,o=j[0],p=j[1];for(b=0;i>b;++b)(d=r[b]).index=b,d.weight=0;for(b=0;k>b;++b)d=s[b],"number"==typeof d.source&&(d.source=r[d.source]),"number"==typeof d.target&&(d.target=r[d.target]),++d.source.weight,++d.target.weight;for(b=0;i>b;++b)d=r[b],isNaN(d.x)&&(d.x=a("x",o)),isNaN(d.y)&&(d.y=a("y",p)),isNaN(d.px)&&(d.px=d.x),isNaN(d.py)&&(d.py=d.y);if(e=[],"function"==typeof l)for(b=0;k>b;++b)e[b]=+l.call(this,s[b],b);else for(b=0;k>b;++b)e[b]=l;if(f=[],"function"==typeof m)for(b=0;k>b;++b)f[b]=+m.call(this,s[b],b);else for(b=0;k>b;++b)f[b]=m;if(g=[],"function"==typeof n)for(b=0;i>b;++b)g[b]=+n.call(this,r[b],b);else for(b=0;i>b;++b)g[b]=n;return h.resume()},h.resume=function(){return h.alpha(.1)},h.stop=function(){return h.alpha(0)},h.drag=function(){return c||(c=Wg.behavior.drag().origin(Bb).on("dragstart.force",Te).on("drag.force",b).on("dragend.force",Ue)),arguments.length?void this.on("mouseover.force",Ve).on("mouseout.force",We).call(c):c},Wg.rebind(h,i,"on")};var gj=20,hj=1,ij=1/0;Wg.layout.hierarchy=function(){function a(e){var f,g=[e],h=[];for(e.depth=0;null!=(f=g.pop());)if(h.push(f),(j=c.call(a,f,f.depth))&&(i=j.length)){for(var i,j,k;--i>=0;)g.push(k=j[i]),k.parent=f,k.depth=f.depth+1;d&&(f.value=0),f.children=j}else d&&(f.value=+d.call(a,f,f.depth)||0),delete f.children;return $e(e,function(a){var c,e;b&&(c=a.children)&&c.sort(b),d&&(e=a.parent)&&(e.value+=a.value)}),h}var b=bf,c=_e,d=af;return a.sort=function(c){return arguments.length?(b=c,a):b},a.children=function(b){return arguments.length?(c=b,a):c},a.value=function(b){return arguments.length?(d=b,a):d},a.revalue=function(b){return d&&(Ze(b,function(a){a.children&&(a.value=0)}),$e(b,function(b){var c;b.children||(b.value=+d.call(a,b,b.depth)||0),(c=b.parent)&&(c.value+=b.value)})),b},a},Wg.layout.partition=function(){function a(b,c,d,e){var f=b.children;if(b.x=c,b.y=b.depth*e,b.dx=d,b.dy=e,f&&(g=f.length)){var g,h,i,j=-1;for(d=b.value?d/b.value:0;++j<g;)a(h=f[j],c,i=h.value*d,e),c+=i}}function b(a){var c=a.children,d=0;if(c&&(e=c.length))for(var e,f=-1;++f<e;)d=Math.max(d,b(c[f]));return 1+d}function c(c,f){var g=d.call(this,c,f);return a(g[0],0,e[0],e[1]/b(g[0])),g}var d=Wg.layout.hierarchy(),e=[1,1];return c.size=function(a){return arguments.length?(e=a,c):e},Ye(c,d)},Wg.layout.pie=function(){function a(f){var g=f.map(function(c,d){return+b.call(a,c,d)}),h=+("function"==typeof d?d.apply(this,arguments):d),i=(("function"==typeof e?e.apply(this,arguments):e)-h)/Wg.sum(g),j=Wg.range(f.length);null!=c&&j.sort(c===jj?function(a,b){return g[b]-g[a]}:function(a,b){return c(f[a],f[b])});var k=[];return j.forEach(function(a){var b;k[a]={data:f[a],value:b=g[a],startAngle:h,endAngle:h+=b*i}}),k}var b=Number,c=jj,d=0,e=Ah;return a.value=function(c){return arguments.length?(b=c,a):b},a.sort=function(b){return arguments.length?(c=b,a):c},a.startAngle=function(b){return arguments.length?(d=b,a):d},a.endAngle=function(b){return arguments.length?(e=b,a):e},a};var jj={};Wg.layout.stack=function(){function a(h,i){var j=h.map(function(c,d){return b.call(a,c,d)}),k=j.map(function(b){return b.map(function(b,c){return[f.call(a,b,c),g.call(a,b,c)]})}),l=c.call(a,k,i);j=Wg.permute(j,l),k=Wg.permute(k,l);var m,n,o,p=d.call(a,k,i),q=j.length,r=j[0].length;for(n=0;r>n;++n)for(e.call(a,j[0][n],o=p[n],k[0][n][1]),m=1;q>m;++m)e.call(a,j[m][n],o+=k[m-1][n][1],k[m][n][1]);return h}var b=Bb,c=gf,d=hf,e=ff,f=df,g=ef;return a.values=function(c){return arguments.length?(b=c,a):b},a.order=function(b){return arguments.length?(c="function"==typeof b?b:kj.get(b)||gf,a):c},a.offset=function(b){return arguments.length?(d="function"==typeof b?b:lj.get(b)||hf,a):d},a.x=function(b){return arguments.length?(f=b,a):f},a.y=function(b){return arguments.length?(g=b,a):g},a.out=function(b){return arguments.length?(e=b,a):e},a};var kj=Wg.map({"inside-out":function(a){var b,c,d=a.length,e=a.map(jf),f=a.map(kf),g=Wg.range(d).sort(function(a,b){return e[a]-e[b]}),h=0,i=0,j=[],k=[];for(b=0;d>b;++b)c=g[b],i>h?(h+=f[c],j.push(c)):(i+=f[c],k.push(c));return k.reverse().concat(j)},reverse:function(a){return Wg.range(a.length).reverse()},"default":gf}),lj=Wg.map({silhouette:function(a){var b,c,d,e=a.length,f=a[0].length,g=[],h=0,i=[];for(c=0;f>c;++c){for(b=0,d=0;e>b;b++)d+=a[b][c][1];d>h&&(h=d),g.push(d)}for(c=0;f>c;++c)i[c]=(h-g[c])/2;return i},wiggle:function(a){var b,c,d,e,f,g,h,i,j,k=a.length,l=a[0],m=l.length,n=[];for(n[0]=i=j=0,c=1;m>c;++c){for(b=0,e=0;k>b;++b)e+=a[b][c][1];for(b=0,f=0,h=l[c][0]-l[c-1][0];k>b;++b){for(d=0,g=(a[b][c][1]-a[b][c-1][1])/(2*h);b>d;++d)g+=(a[d][c][1]-a[d][c-1][1])/h;f+=g*a[b][c][1]}n[c]=i-=e?f/e*h:0,j>i&&(j=i)}for(c=0;m>c;++c)n[c]-=j;return n},expand:function(a){var b,c,d,e=a.length,f=a[0].length,g=1/e,h=[];for(c=0;f>c;++c){for(b=0,d=0;e>b;b++)d+=a[b][c][1];if(d)for(b=0;e>b;b++)a[b][c][1]/=d;else for(b=0;e>b;b++)a[b][c][1]=g}for(c=0;f>c;++c)h[c]=0;return h},zero:hf});Wg.layout.histogram=function(){function a(a,f){for(var g,h,i=[],j=a.map(c,this),k=d.call(this,j,f),l=e.call(this,k,j,f),f=-1,m=j.length,n=l.length-1,o=b?1:1/m;++f<n;)g=i[f]=[],g.dx=l[f+1]-(g.x=l[f]),g.y=0;if(n>0)for(f=-1;++f<m;)h=j[f],h>=k[0]&&h<=k[1]&&(g=i[Wg.bisect(l,h,1,n)-1],g.y+=o,g.push(a[f]));return i}var b=!0,c=Number,d=of,e=mf;return a.value=function(b){return arguments.length?(c=b,a):c},a.range=function(b){return arguments.length?(d=Ab(b),a):d},a.bins=function(b){return arguments.length?(e="number"==typeof b?function(a){return nf(a,b)}:Ab(b),a):e},a.frequency=function(c){return arguments.length?(b=!!c,a):b},a},Wg.layout.pack=function(){function a(a,f){var g=c.call(this,a,f),h=g[0],i=e[0],j=e[1],k=null==b?Math.sqrt:"function"==typeof b?b:function(){return b};if(h.x=h.y=0,$e(h,function(a){a.r=+k(a.value)}),$e(h,tf),d){var l=d*(b?1:Math.max(2*h.r/i,2*h.r/j))/2;$e(h,function(a){a.r+=l}),$e(h,tf),$e(h,function(a){a.r-=l})}return wf(h,i/2,j/2,b?1:1/Math.max(2*h.r/i,2*h.r/j)),g}var b,c=Wg.layout.hierarchy().sort(pf),d=0,e=[1,1];return a.size=function(b){return arguments.length?(e=b,a):e},a.radius=function(c){return arguments.length?(b=null==c||"function"==typeof c?c:+c,a):b},a.padding=function(b){return arguments.length?(d=+b,a):d},Ye(a,c)},Wg.layout.tree=function(){function a(a,e){var k=g.call(this,a,e),l=k[0],m=b(l);if($e(m,c),m.parent.m=-m.z,Ze(m,d),j)Ze(l,f);else{var n=l,o=l,p=l;Ze(l,function(a){a.x<n.x&&(n=a),a.x>o.x&&(o=a),a.depth>p.depth&&(p=a)});var q=h(n,o)/2-n.x,r=i[0]/(o.x+h(o,n)/2+q),s=i[1]/(p.depth||1);Ze(l,function(a){a.x=(a.x+q)*r,a.y=a.depth*s})}return k}function b(a){for(var b,c={A:null,children:[a]},d=[c];null!=(b=d.pop());)for(var e,f=b.children,g=0,h=f.length;h>g;++g)d.push((f[g]=e={_:f[g],parent:b,children:(e=f[g].children)&&e.slice()||[],A:null,a:null,z:0,m:0,c:0,s:0,t:null,i:g}).a=e);return c.children[0]}function c(a){var b=a.children,c=a.parent.children,d=a.i?c[a.i-1]:null;if(b.length){Cf(a);var f=(b[0].z+b[b.length-1].z)/2;d?(a.z=d.z+h(a._,d._),a.m=a.z-f):a.z=f}else d&&(a.z=d.z+h(a._,d._));a.parent.A=e(a,d,a.parent.A||c[0])}function d(a){a._.x=a.z+a.parent.m,a.m+=a.parent.m}function e(a,b,c){if(b){for(var d,e=a,f=a,g=b,i=e.parent.children[0],j=e.m,k=f.m,l=g.m,m=i.m;g=Af(g),e=zf(e),g&&e;)i=zf(i),f=Af(f),f.a=a,d=g.z+l-e.z-j+h(g._,e._),d>0&&(Bf(Df(g,a,c),a,d),j+=d,k+=d),l+=g.m,j+=e.m,m+=i.m,k+=f.m;g&&!Af(f)&&(f.t=g,f.m+=l-k),e&&!zf(i)&&(i.t=e,i.m+=j-m,c=a)}return c}function f(a){a.x*=i[0],a.y=a.depth*i[1]}var g=Wg.layout.hierarchy().sort(null).value(null),h=yf,i=[1,1],j=null;return a.separation=function(b){return arguments.length?(h=b,a):h},a.size=function(b){return arguments.length?(j=null==(i=b)?f:null,a):j?null:i},a.nodeSize=function(b){return arguments.length?(j=null==(i=b)?null:f,a):j?i:null},Ye(a,g)},Wg.layout.cluster=function(){function a(a,f){var g,h=b.call(this,a,f),i=h[0],j=0;$e(i,function(a){var b=a.children;b&&b.length?(a.x=Ff(b),a.y=Ef(b)):(a.x=g?j+=c(a,g):0,a.y=0,g=a)});var k=Gf(i),l=Hf(i),m=k.x-c(k,l)/2,n=l.x+c(l,k)/2;return $e(i,e?function(a){a.x=(a.x-i.x)*d[0],a.y=(i.y-a.y)*d[1]}:function(a){a.x=(a.x-m)/(n-m)*d[0],a.y=(1-(i.y?a.y/i.y:1))*d[1]}),h}var b=Wg.layout.hierarchy().sort(null).value(null),c=yf,d=[1,1],e=!1;return a.separation=function(b){return arguments.length?(c=b,a):c},a.size=function(b){return arguments.length?(e=null==(d=b),a):e?null:d},a.nodeSize=function(b){return arguments.length?(e=null!=(d=b),a):e?d:null},Ye(a,b)},Wg.layout.treemap=function(){function a(a,b){for(var c,d,e=-1,f=a.length;++e<f;)d=(c=a[e]).value*(0>b?0:b),c.area=isNaN(d)||0>=d?0:d}function b(c){var f=c.children;if(f&&f.length){var g,h,i,j=l(c),k=[],m=f.slice(),o=1/0,p="slice"===n?j.dx:"dice"===n?j.dy:"slice-dice"===n?1&c.depth?j.dy:j.dx:Math.min(j.dx,j.dy);for(a(m,j.dx*j.dy/c.value),k.area=0;(i=m.length)>0;)k.push(g=m[i-1]),k.area+=g.area,"squarify"!==n||(h=d(k,p))<=o?(m.pop(),o=h):(k.area-=k.pop().area,e(k,p,j,!1),p=Math.min(j.dx,j.dy),k.length=k.area=0,o=1/0);k.length&&(e(k,p,j,!0),k.length=k.area=0),f.forEach(b)}}function c(b){var d=b.children;if(d&&d.length){var f,g=l(b),h=d.slice(),i=[];for(a(h,g.dx*g.dy/b.value),i.area=0;f=h.pop();)i.push(f),i.area+=f.area,null!=f.z&&(e(i,f.z?g.dx:g.dy,g,!h.length),i.length=i.area=0);d.forEach(c)}}function d(a,b){for(var c,d=a.area,e=0,f=1/0,g=-1,h=a.length;++g<h;)(c=a[g].area)&&(f>c&&(f=c),c>e&&(e=c));return d*=d,b*=b,d?Math.max(b*e*o/d,d/(b*f*o)):1/0}function e(a,b,c,d){var e,f=-1,g=a.length,h=c.x,j=c.y,k=b?i(a.area/b):0;if(b==c.dx){for((d||k>c.dy)&&(k=c.dy);++f<g;)e=a[f],e.x=h,e.y=j,e.dy=k,h+=e.dx=Math.min(c.x+c.dx-h,k?i(e.area/k):0);e.z=!0,e.dx+=c.x+c.dx-h,c.y+=k,c.dy-=k}else{for((d||k>c.dx)&&(k=c.dx);++f<g;)e=a[f],e.x=h,e.y=j,e.dx=k,j+=e.dy=Math.min(c.y+c.dy-j,k?i(e.area/k):0);e.z=!1,e.dy+=c.y+c.dy-j,c.x+=k,c.dx-=k}}function f(d){var e=g||h(d),f=e[0];return f.x=0,f.y=0,f.dx=j[0],f.dy=j[1],g&&h.revalue(f),a([f],f.dx*f.dy/f.value),(g?c:b)(f),m&&(g=e),e}var g,h=Wg.layout.hierarchy(),i=Math.round,j=[1,1],k=null,l=If,m=!1,n="squarify",o=.5*(1+Math.sqrt(5));return f.size=function(a){return arguments.length?(j=a,f):j},f.padding=function(a){function b(b){var c=a.call(f,b,b.depth);return null==c?If(b):Jf(b,"number"==typeof c?[c,c,c,c]:c)}function c(b){return Jf(b,a)}if(!arguments.length)return k;var d;return l=null==(k=a)?If:"function"==(d=typeof a)?b:"number"===d?(a=[a,a,a,a],c):c,f},f.round=function(a){return arguments.length?(i=a?Math.round:Number,f):i!=Number},f.sticky=function(a){return arguments.length?(m=a,g=null,f):m},f.ratio=function(a){return arguments.length?(o=a,f):o},f.mode=function(a){return arguments.length?(n=a+"",f):n},Ye(f,h)},Wg.random={normal:function(a,b){var c=arguments.length;return 2>c&&(b=1),1>c&&(a=0),function(){var c,d,e;do c=2*Math.random()-1,d=2*Math.random()-1,e=c*c+d*d;while(!e||e>1);return a+b*c*Math.sqrt(-2*Math.log(e)/e)}},logNormal:function(){var a=Wg.random.normal.apply(Wg,arguments);return function(){return Math.exp(a())}},bates:function(a){var b=Wg.random.irwinHall(a);return function(){return b()/a}},irwinHall:function(a){return function(){for(var b=0,c=0;a>c;c++)b+=Math.random();return b}}},Wg.scale={};var mj={floor:Bb,ceil:Bb};Wg.scale.linear=function(){return Qf([0,1],[0,1],qe,!1)};var nj={s:1,g:1,p:1,r:1,e:1};Wg.scale.log=function(){return Yf(Wg.scale.linear().domain([0,1]),10,!0,[1,10])};var oj=Wg.format(".0e"),pj={floor:function(a){return-Math.ceil(-a)},ceil:function(a){return-Math.floor(-a)}};Wg.scale.pow=function(){return Zf(Wg.scale.linear(),1,[0,1])},Wg.scale.sqrt=function(){return Wg.scale.pow().exponent(.5)},Wg.scale.ordinal=function(){return _f([],{t:"range",a:[[]]})},Wg.scale.category10=function(){return Wg.scale.ordinal().range(qj)},Wg.scale.category20=function(){return Wg.scale.ordinal().range(rj)},Wg.scale.category20b=function(){return Wg.scale.ordinal().range(sj)},Wg.scale.category20c=function(){return Wg.scale.ordinal().range(tj)};var qj=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(rb),rj=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(rb),sj=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(rb),tj=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(rb);Wg.scale.quantile=function(){return ag([],[])},Wg.scale.quantize=function(){return bg(0,1,[0,1])},Wg.scale.threshold=function(){return cg([.5],[0,1])},Wg.scale.identity=function(){return dg([0,1])},Wg.svg={},Wg.svg.arc=function(){function a(){var a=b.apply(this,arguments),f=c.apply(this,arguments),g=d.apply(this,arguments)+uj,h=e.apply(this,arguments)+uj,i=(g>h&&(i=g,g=h,h=i),h-g),j=zh>i?"0":"1",k=Math.cos(g),l=Math.sin(g),m=Math.cos(h),n=Math.sin(h);return i>=vj?a?"M0,"+f+"A"+f+","+f+" 0 1,1 0,"+-f+"A"+f+","+f+" 0 1,1 0,"+f+"M0,"+a+"A"+a+","+a+" 0 1,0 0,"+-a+"A"+a+","+a+" 0 1,0 0,"+a+"Z":"M0,"+f+"A"+f+","+f+" 0 1,1 0,"+-f+"A"+f+","+f+" 0 1,1 0,"+f+"Z":a?"M"+f*k+","+f*l+"A"+f+","+f+" 0 "+j+",1 "+f*m+","+f*n+"L"+a*m+","+a*n+"A"+a+","+a+" 0 "+j+",0 "+a*k+","+a*l+"Z":"M"+f*k+","+f*l+"A"+f+","+f+" 0 "+j+",1 "+f*m+","+f*n+"L0,0Z"}var b=eg,c=fg,d=gg,e=hg;return a.innerRadius=function(c){return arguments.length?(b=Ab(c),a):b},a.outerRadius=function(b){return arguments.length?(c=Ab(b),a):c},a.startAngle=function(b){return arguments.length?(d=Ab(b),a):d},a.endAngle=function(b){return arguments.length?(e=Ab(b),a):e},a.centroid=function(){var a=(b.apply(this,arguments)+c.apply(this,arguments))/2,f=(d.apply(this,arguments)+e.apply(this,arguments))/2+uj;return[Math.cos(f)*a,Math.sin(f)*a]},a};var uj=-Bh,vj=Ah-Ch;Wg.svg.line=function(){return ig(Bb)};var wj=Wg.map({linear:jg,"linear-closed":kg,step:lg,"step-before":mg,"step-after":ng,basis:tg,"basis-open":ug,"basis-closed":vg,bundle:wg,cardinal:qg,"cardinal-open":og,"cardinal-closed":pg,monotone:Cg});wj.forEach(function(a,b){b.key=a,b.closed=/-closed$/.test(a)});var xj=[0,2/3,1/3,0],yj=[0,1/3,2/3,0],zj=[0,1/6,2/3,1/6];Wg.svg.line.radial=function(){var a=ig(Dg);return a.radius=a.x,delete a.x,a.angle=a.y,delete a.y,a},mg.reverse=ng,ng.reverse=mg,Wg.svg.area=function(){return Eg(Bb)},Wg.svg.area.radial=function(){var a=Eg(Dg);return a.radius=a.x,delete a.x,a.innerRadius=a.x0,delete a.x0,a.outerRadius=a.x1,delete a.x1,a.angle=a.y,delete a.y,a.startAngle=a.y0,delete a.y0,a.endAngle=a.y1,delete a.y1,a},Wg.svg.chord=function(){function a(a,h){var i=b(this,f,a,h),j=b(this,g,a,h);return"M"+i.p0+d(i.r,i.p1,i.a1-i.a0)+(c(i,j)?e(i.r,i.p1,i.r,i.p0):e(i.r,i.p1,j.r,j.p0)+d(j.r,j.p1,j.a1-j.a0)+e(j.r,j.p1,i.r,i.p0))+"Z"}function b(a,b,c,d){var e=b.call(a,c,d),f=h.call(a,e,d),g=i.call(a,e,d)+uj,k=j.call(a,e,d)+uj;return{r:f,a0:g,a1:k,p0:[f*Math.cos(g),f*Math.sin(g)],p1:[f*Math.cos(k),f*Math.sin(k)]}}function c(a,b){return a.a0==b.a0&&a.a1==b.a1}function d(a,b,c){return"A"+a+","+a+" 0 "+ +(c>zh)+",1 "+b}function e(a,b,c,d){return"Q 0,0 "+d}var f=rd,g=sd,h=Fg,i=gg,j=hg;return a.radius=function(b){return arguments.length?(h=Ab(b),a):h},a.source=function(b){return arguments.length?(f=Ab(b),a):f},a.target=function(b){return arguments.length?(g=Ab(b),a):g},a.startAngle=function(b){return arguments.length?(i=Ab(b),a):i},a.endAngle=function(b){return arguments.length?(j=Ab(b),a):j},a},Wg.svg.diagonal=function(){function a(a,e){var f=b.call(this,a,e),g=c.call(this,a,e),h=(f.y+g.y)/2,i=[f,{x:f.x,y:h},{x:g.x,y:h},g];return i=i.map(d),"M"+i[0]+"C"+i[1]+" "+i[2]+" "+i[3]}var b=rd,c=sd,d=Gg;return a.source=function(c){return arguments.length?(b=Ab(c),a):b},a.target=function(b){return arguments.length?(c=Ab(b),a):c},a.projection=function(b){return arguments.length?(d=b,a):d},a},Wg.svg.diagonal.radial=function(){var a=Wg.svg.diagonal(),b=Gg,c=a.projection;return a.projection=function(a){return arguments.length?c(Hg(b=a)):b},a},Wg.svg.symbol=function(){function a(a,d){return(Aj.get(b.call(this,a,d))||Kg)(c.call(this,a,d))}var b=Jg,c=Ig;return a.type=function(c){return arguments.length?(b=Ab(c),a):b},a.size=function(b){return arguments.length?(c=Ab(b),a):c},a};var Aj=Wg.map({circle:Kg,cross:function(a){var b=Math.sqrt(a/5)/2;return"M"+-3*b+","+-b+"H"+-b+"V"+-3*b+"H"+b+"V"+-b+"H"+3*b+"V"+b+"H"+b+"V"+3*b+"H"+-b+"V"+b+"H"+-3*b+"Z"},diamond:function(a){var b=Math.sqrt(a/(2*Ej)),c=b*Ej;return"M0,"+-b+"L"+c+",0 0,"+b+" "+-c+",0Z"},square:function(a){var b=Math.sqrt(a)/2;return"M"+-b+","+-b+"L"+b+","+-b+" "+b+","+b+" "+-b+","+b+"Z"},"triangle-down":function(a){var b=Math.sqrt(a/Dj),c=b*Dj/2;return"M0,"+c+"L"+b+","+-c+" "+-b+","+-c+"Z"},"triangle-up":function(a){var b=Math.sqrt(a/Dj),c=b*Dj/2;return"M0,"+-c+"L"+b+","+c+" "+-b+","+c+"Z"}});Wg.svg.symbolTypes=Aj.keys();var Bj,Cj,Dj=Math.sqrt(3),Ej=Math.tan(30*Eh),Fj=[],Gj=0;Fj.call=sh.call,Fj.empty=sh.empty,Fj.node=sh.node,Fj.size=sh.size,Wg.transition=function(a){return arguments.length?Bj?a.transition():a:vh.transition()},Wg.transition.prototype=Fj,Fj.select=function(a){var b,c,d,e=this.id,f=[];a=w(a);for(var g=-1,h=this.length;++g<h;){f.push(b=[]);for(var i=this[g],j=-1,k=i.length;++j<k;)(d=i[j])&&(c=a.call(d,d.__data__,j,g))?("__data__"in d&&(c.__data__=d.__data__),Og(c,j,e,d.__transition__[e]),b.push(c)):b.push(null)}return Lg(f,e)},Fj.selectAll=function(a){var b,c,d,e,f,g=this.id,h=[];a=x(a);for(var i=-1,j=this.length;++i<j;)for(var k=this[i],l=-1,m=k.length;++l<m;)if(d=k[l]){f=d.__transition__[g],c=a.call(d,d.__data__,l,i),h.push(b=[]);for(var n=-1,o=c.length;++n<o;)(e=c[n])&&Og(e,n,g,f),b.push(e)}return Lg(h,g)},Fj.filter=function(a){var b,c,d,e=[];"function"!=typeof a&&(a=I(a));for(var f=0,g=this.length;g>f;f++){e.push(b=[]);for(var c=this[f],h=0,i=c.length;i>h;h++)(d=c[h])&&a.call(d,d.__data__,h,f)&&b.push(d)}return Lg(e,this.id)},Fj.tween=function(a,b){var c=this.id;return arguments.length<2?this.node().__transition__[c].tween.get(a):K(this,null==b?function(b){b.__transition__[c].tween.remove(a)}:function(d){d.__transition__[c].tween.set(a,b)})},Fj.attr=function(a,b){function c(){this.removeAttribute(h)}function d(){this.removeAttributeNS(h.space,h.local)}function e(a){return null==a?c:(a+="",function(){var b,c=this.getAttribute(h);return c!==a&&(b=g(c,a),function(a){this.setAttribute(h,b(a))})})}function f(a){return null==a?d:(a+="",function(){var b,c=this.getAttributeNS(h.space,h.local);return c!==a&&(b=g(c,a),function(a){this.setAttributeNS(h.space,h.local,b(a))})})}if(arguments.length<2){for(b in a)this.attr(b,a[b]);return this}var g="transform"==a?Ne:qe,h=Wg.ns.qualify(a);return Mg(this,"attr."+a,b,h.local?f:e)},Fj.attrTween=function(a,b){function c(a,c){var d=b.call(this,a,c,this.getAttribute(e));return d&&function(a){this.setAttribute(e,d(a))}}function d(a,c){var d=b.call(this,a,c,this.getAttributeNS(e.space,e.local));return d&&function(a){this.setAttributeNS(e.space,e.local,d(a))}}var e=Wg.ns.qualify(a);return this.tween("attr."+a,e.local?d:c)},Fj.style=function(a,b,c){function d(){this.style.removeProperty(a)}function e(b){return null==b?d:(b+="",function(){var d,e=_g.getComputedStyle(this,null).getPropertyValue(a);return e!==b&&(d=qe(e,b),function(b){this.style.setProperty(a,d(b),c)})})}var f=arguments.length;if(3>f){if("string"!=typeof a){2>f&&(b="");for(c in a)this.style(c,a[c],b);return this}c=""}return Mg(this,"style."+a,b,e)},Fj.styleTween=function(a,b,c){function d(d,e){var f=b.call(this,d,e,_g.getComputedStyle(this,null).getPropertyValue(a));return f&&function(b){this.style.setProperty(a,f(b),c)}}return arguments.length<3&&(c=""),this.tween("style."+a,d)},Fj.text=function(a){return Mg(this,"text",a,Ng)},Fj.remove=function(){return this.each("end.transition",function(){var a;this.__transition__.count<2&&(a=this.parentNode)&&a.removeChild(this)})},Fj.ease=function(a){var b=this.id;return arguments.length<1?this.node().__transition__[b].ease:("function"!=typeof a&&(a=Wg.ease.apply(Wg,arguments)),K(this,function(c){c.__transition__[b].ease=a}))},Fj.delay=function(a){var b=this.id;return arguments.length<1?this.node().__transition__[b].delay:K(this,"function"==typeof a?function(c,d,e){c.__transition__[b].delay=+a.call(c,c.__data__,d,e)}:(a=+a,function(c){c.__transition__[b].delay=a}))},Fj.duration=function(a){var b=this.id;return arguments.length<1?this.node().__transition__[b].duration:K(this,"function"==typeof a?function(c,d,e){c.__transition__[b].duration=Math.max(1,a.call(c,c.__data__,d,e))}:(a=Math.max(1,a),function(c){c.__transition__[b].duration=a}))},Fj.each=function(a,b){var c=this.id;if(arguments.length<2){var d=Cj,e=Bj;Bj=c,K(this,function(b,d,e){Cj=b.__transition__[c],a.call(b,b.__data__,d,e)}),Cj=d,Bj=e}else K(this,function(d){var e=d.__transition__[c];(e.event||(e.event=Wg.dispatch("start","end"))).on(a,b)});return this},Fj.transition=function(){for(var a,b,c,d,e=this.id,f=++Gj,g=[],h=0,i=this.length;i>h;h++){g.push(a=[]);for(var b=this[h],j=0,k=b.length;k>j;j++)(c=b[j])&&(d=Object.create(c.__transition__[e]),d.delay+=d.duration,Og(c,j,f,d)),a.push(c)}return Lg(g,f)},Wg.svg.axis=function(){function a(a){a.each(function(){var a,j=Wg.select(this),k=this.__chart__||c,l=this.__chart__=c.copy(),m=null==i?l.ticks?l.ticks.apply(l,h):l.domain():i,n=null==b?l.tickFormat?l.tickFormat.apply(l,h):Bb:b,o=j.selectAll(".tick").data(m,l),p=o.enter().insert("g",".domain").attr("class","tick").style("opacity",Ch),q=Wg.transition(o.exit()).style("opacity",Ch).remove(),r=Wg.transition(o.order()).style("opacity",1),s=Lf(l),t=j.selectAll(".domain").data([0]),u=(t.enter().append("path").attr("class","domain"),Wg.transition(t));p.append("line"),p.append("text");var v=p.select("line"),w=r.select("line"),x=o.select("text").text(n),y=p.select("text"),z=r.select("text");switch(d){case"bottom":a=Pg,v.attr("y2",e),y.attr("y",Math.max(e,0)+g),w.attr("x2",0).attr("y2",e),z.attr("x",0).attr("y",Math.max(e,0)+g),x.attr("dy",".71em").style("text-anchor","middle"),u.attr("d","M"+s[0]+","+f+"V0H"+s[1]+"V"+f);break;case"top":a=Pg,v.attr("y2",-e),y.attr("y",-(Math.max(e,0)+g)),w.attr("x2",0).attr("y2",-e),z.attr("x",0).attr("y",-(Math.max(e,0)+g)),x.attr("dy","0em").style("text-anchor","middle"),u.attr("d","M"+s[0]+","+-f+"V0H"+s[1]+"V"+-f);break;case"left":a=Qg,v.attr("x2",-e),y.attr("x",-(Math.max(e,0)+g)),w.attr("x2",-e).attr("y2",0),z.attr("x",-(Math.max(e,0)+g)).attr("y",0),x.attr("dy",".32em").style("text-anchor","end"),u.attr("d","M"+-f+","+s[0]+"H0V"+s[1]+"H"+-f);break;case"right":a=Qg,v.attr("x2",e),y.attr("x",Math.max(e,0)+g),w.attr("x2",e).attr("y2",0),z.attr("x",Math.max(e,0)+g).attr("y",0),x.attr("dy",".32em").style("text-anchor","start"),u.attr("d","M"+f+","+s[0]+"H0V"+s[1]+"H"+f)}if(l.rangeBand){var A=l,B=A.rangeBand()/2;k=l=function(a){return A(a)+B}}else k.rangeBand?k=l:q.call(a,l);p.call(a,k),r.call(a,l)})}var b,c=Wg.scale.linear(),d=Hj,e=6,f=6,g=3,h=[10],i=null;return a.scale=function(b){return arguments.length?(c=b,a):c},a.orient=function(b){return arguments.length?(d=b in Ij?b+"":Hj,a):d},a.ticks=function(){return arguments.length?(h=arguments,a):h},a.tickValues=function(b){return arguments.length?(i=b,a):i},a.tickFormat=function(c){return arguments.length?(b=c,a):b},a.tickSize=function(b){var c=arguments.length;return c?(e=+b,f=+arguments[c-1],a):e},a.innerTickSize=function(b){return arguments.length?(e=+b,a):e},a.outerTickSize=function(b){return arguments.length?(f=+b,a):f},a.tickPadding=function(b){return arguments.length?(g=+b,a):g},a.tickSubdivide=function(){return arguments.length&&a},a};var Hj="bottom",Ij={top:1,right:1,bottom:1,left:1};Wg.svg.brush=function(){function a(f){f.each(function(){var f=Wg.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",e).on("touchstart.brush",e),g=f.selectAll(".background").data([0]);g.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),f.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var h=f.selectAll(".resize").data(o,Bb);h.exit().remove(),h.enter().append("g").attr("class",function(a){return"resize "+a}).style("cursor",function(a){return Jj[a]}).append("rect").attr("x",function(a){return/[ew]$/.test(a)?-3:null}).attr("y",function(a){return/^[ns]/.test(a)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),h.style("display",a.empty()?"none":null);var k,l=Wg.transition(f),m=Wg.transition(g);i&&(k=Lf(i),m.attr("x",k[0]).attr("width",k[1]-k[0]),c(l)),j&&(k=Lf(j),m.attr("y",k[0]).attr("height",k[1]-k[0]),d(l)),b(l)})}function b(a){a.selectAll(".resize").attr("transform",function(a){return"translate("+k[+/e$/.test(a)]+","+l[+/^s/.test(a)]+")"})}function c(a){a.select(".extent").attr("x",k[0]),a.selectAll(".extent,.n>rect,.s>rect").attr("width",k[1]-k[0])}function d(a){a.select(".extent").attr("y",l[0]),a.selectAll(".extent,.e>rect,.w>rect").attr("height",l[1]-l[0])}function e(){function e(){32==Wg.event.keyCode&&(C||(t=null,E[0]-=k[1],E[1]-=l[1],C=2),s())}function o(){32==Wg.event.keyCode&&2==C&&(E[0]+=k[1],E[1]+=l[1],C=0,s())}function p(){var a=Wg.mouse(v),e=!1;u&&(a[0]+=u[0],a[1]+=u[1]),C||(Wg.event.altKey?(t||(t=[(k[0]+k[1])/2,(l[0]+l[1])/2]),E[0]=k[+(a[0]<t[0])],E[1]=l[+(a[1]<t[1])]):t=null),A&&q(a,i,0)&&(c(y),e=!0),B&&q(a,j,1)&&(d(y),e=!0),e&&(b(y),x({type:"brush",mode:C?"move":"resize"}))}function q(a,b,c){var d,e,h=Lf(b),i=h[0],j=h[1],o=E[c],p=c?l:k,q=p[1]-p[0];return C&&(i-=o,j-=q+o),d=(c?n:m)?Math.max(i,Math.min(j,a[c])):a[c],C?e=(d+=o)+q:(t&&(o=Math.max(i,Math.min(j,2*t[c]-d))),d>o?(e=d,d=o):e=o),p[0]!=d||p[1]!=e?(c?g=null:f=null,p[0]=d,p[1]=e,!0):void 0}function r(){p(),y.style("pointer-events","all").selectAll(".resize").style("display",a.empty()?"none":null),Wg.select("body").style("cursor",null),F.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),D(),x({type:"brushend"})}var t,u,v=this,w=Wg.select(Wg.event.target),x=h.of(v,arguments),y=Wg.select(v),z=w.datum(),A=!/^(n|s)$/.test(z)&&i,B=!/^(e|w)$/.test(z)&&j,C=w.classed("extent"),D=R(),E=Wg.mouse(v),F=Wg.select(_g).on("keydown.brush",e).on("keyup.brush",o);if(Wg.event.changedTouches?F.on("touchmove.brush",p).on("touchend.brush",r):F.on("mousemove.brush",p).on("mouseup.brush",r),y.interrupt().selectAll("*").interrupt(),C)E[0]=k[0]-E[0],E[1]=l[0]-E[1];else if(z){var G=+/w$/.test(z),H=+/^n/.test(z);u=[k[1-G]-E[0],l[1-H]-E[1]],E[0]=k[G],E[1]=l[H]}else Wg.event.altKey&&(t=E.slice());y.style("pointer-events","none").selectAll(".resize").style("display",null),Wg.select("body").style("cursor",w.style("cursor")),x({type:"brushstart"}),p()}var f,g,h=u(a,"brushstart","brush","brushend"),i=null,j=null,k=[0,0],l=[0,0],m=!0,n=!0,o=Kj[0];return a.event=function(a){a.each(function(){var a=h.of(this,arguments),b={x:k,y:l,i:f,j:g},c=this.__chart__||b;this.__chart__=b,Bj?Wg.select(this).transition().each("start.brush",function(){f=c.i,g=c.j,k=c.x,l=c.y,a({type:"brushstart"})}).tween("brush:brush",function(){var c=re(k,b.x),d=re(l,b.y);return f=g=null,function(e){k=b.x=c(e),l=b.y=d(e),a({type:"brush",mode:"resize"})}}).each("end.brush",function(){f=b.i,g=b.j,a({type:"brush",mode:"resize"}),a({type:"brushend"})}):(a({type:"brushstart"}),a({type:"brush",mode:"resize"}),a({type:"brushend"}))})},a.x=function(b){return arguments.length?(i=b,o=Kj[!i<<1|!j],a):i},a.y=function(b){return arguments.length?(j=b,o=Kj[!i<<1|!j],a):j},a.clamp=function(b){return arguments.length?(i&&j?(m=!!b[0],n=!!b[1]):i?m=!!b:j&&(n=!!b),a):i&&j?[m,n]:i?m:j?n:null},a.extent=function(b){var c,d,e,h,m;return arguments.length?(i&&(c=b[0],d=b[1],j&&(c=c[0],d=d[0]),f=[c,d],i.invert&&(c=i(c),d=i(d)),c>d&&(m=c,c=d,d=m),(c!=k[0]||d!=k[1])&&(k=[c,d])),j&&(e=b[0],h=b[1],i&&(e=e[1],h=h[1]),g=[e,h],j.invert&&(e=j(e),h=j(h)),e>h&&(m=e,e=h,h=m),(e!=l[0]||h!=l[1])&&(l=[e,h])),a):(i&&(f?(c=f[0],d=f[1]):(c=k[0],d=k[1],i.invert&&(c=i.invert(c),d=i.invert(d)),c>d&&(m=c,c=d,d=m))),j&&(g?(e=g[0],h=g[1]):(e=l[0],h=l[1],j.invert&&(e=j.invert(e),h=j.invert(h)),e>h&&(m=e,e=h,h=m))),i&&j?[[c,e],[d,h]]:i?[c,d]:j&&[e,h])
},a.clear=function(){return a.empty()||(k=[0,0],l=[0,0],f=g=null),a},a.empty=function(){return!!i&&k[0]==k[1]||!!j&&l[0]==l[1]},Wg.rebind(a,h,"on")};var Jj={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Kj=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Lj=ci.format=ii.timeFormat,Mj=Lj.utc,Nj=Mj("%Y-%m-%dT%H:%M:%S.%LZ");Lj.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Rg:Nj,Rg.parse=function(a){var b=new Date(a);return isNaN(b)?null:b},Rg.toString=Nj.toString,ci.second=Nb(function(a){return new di(1e3*Math.floor(a/1e3))},function(a,b){a.setTime(a.getTime()+1e3*Math.floor(b))},function(a){return a.getSeconds()}),ci.seconds=ci.second.range,ci.seconds.utc=ci.second.utc.range,ci.minute=Nb(function(a){return new di(6e4*Math.floor(a/6e4))},function(a,b){a.setTime(a.getTime()+6e4*Math.floor(b))},function(a){return a.getMinutes()}),ci.minutes=ci.minute.range,ci.minutes.utc=ci.minute.utc.range,ci.hour=Nb(function(a){var b=a.getTimezoneOffset()/60;return new di(36e5*(Math.floor(a/36e5-b)+b))},function(a,b){a.setTime(a.getTime()+36e5*Math.floor(b))},function(a){return a.getHours()}),ci.hours=ci.hour.range,ci.hours.utc=ci.hour.utc.range,ci.month=Nb(function(a){return a=ci.day(a),a.setDate(1),a},function(a,b){a.setMonth(a.getMonth()+b)},function(a){return a.getMonth()}),ci.months=ci.month.range,ci.months.utc=ci.month.utc.range;var Oj=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Pj=[[ci.second,1],[ci.second,5],[ci.second,15],[ci.second,30],[ci.minute,1],[ci.minute,5],[ci.minute,15],[ci.minute,30],[ci.hour,1],[ci.hour,3],[ci.hour,6],[ci.hour,12],[ci.day,1],[ci.day,2],[ci.week,1],[ci.month,1],[ci.month,3],[ci.year,1]],Qj=Lj.multi([[".%L",function(a){return a.getMilliseconds()}],[":%S",function(a){return a.getSeconds()}],["%I:%M",function(a){return a.getMinutes()}],["%I %p",function(a){return a.getHours()}],["%a %d",function(a){return a.getDay()&&1!=a.getDate()}],["%b %d",function(a){return 1!=a.getDate()}],["%B",function(a){return a.getMonth()}],["%Y",Bc]]),Rj={range:function(a,b,c){return Wg.range(Math.ceil(a/c)*c,+b,c).map(Tg)},floor:Bb,ceil:Bb};Pj.year=ci.year,ci.scale=function(){return Sg(Wg.scale.linear(),Pj,Qj)};var Sj=Pj.map(function(a){return[a[0].utc,a[1]]}),Tj=Mj.multi([[".%L",function(a){return a.getUTCMilliseconds()}],[":%S",function(a){return a.getUTCSeconds()}],["%I:%M",function(a){return a.getUTCMinutes()}],["%I %p",function(a){return a.getUTCHours()}],["%a %d",function(a){return a.getUTCDay()&&1!=a.getUTCDate()}],["%b %d",function(a){return 1!=a.getUTCDate()}],["%B",function(a){return a.getUTCMonth()}],["%Y",Bc]]);Sj.year=ci.year.utc,ci.scale.utc=function(){return Sg(Wg.scale.linear(),Sj,Tj)},Wg.text=Cb(function(a){return a.responseText}),Wg.json=function(a,b){return Db(a,"application/json",Ug,b)},Wg.html=function(a,b){return Db(a,"text/html",Vg,b)},Wg.xml=Cb(function(a){return a.responseXML}),"function"==typeof define&&define.amd?define(Wg):"object"==typeof module&&module.exports?module.exports=Wg:this.d3=Wg}(),function(){function a(a,b,c){for(var d=(c||0)-1,e=a?a.length:0;++d<e;)if(a[d]===b)return d;return-1}function b(b,c){var d=typeof c;if(b=b.cache,"boolean"==d||null==c)return b[c]?0:-1;"number"!=d&&"string"!=d&&(d="object");var e="number"==d?c:u+c;return b=(b=b[d])&&b[e],"object"==d?b&&a(b,c)>-1?0:-1:b?0:-1}function c(a){var b=this.cache,c=typeof a;if("boolean"==c||null==a)b[a]=!0;else{"number"!=c&&"string"!=c&&(c="object");var d="number"==c?a:u+a,e=b[c]||(b[c]={});"object"==c?(e[d]||(e[d]=[])).push(a):e[d]=!0}}function d(a){return a.charCodeAt(0)}function e(a,b){for(var c=a.criteria,d=b.criteria,e=-1,f=c.length;++e<f;){var g=c[e],h=d[e];if(g!==h){if(g>h||"undefined"==typeof g)return 1;if(h>g||"undefined"==typeof h)return-1}}return a.index-b.index}function f(a){var b=-1,d=a.length,e=a[0],f=a[d/2|0],g=a[d-1];if(e&&"object"==typeof e&&f&&"object"==typeof f&&g&&"object"==typeof g)return!1;var h=i();h["false"]=h["null"]=h["true"]=h.undefined=!1;var j=i();for(j.array=a,j.cache=h,j.push=c;++b<d;)j.push(a[b]);return j}function g(a){return"\\"+_[a]}function h(){return q.pop()||[]}function i(){return r.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function j(a){return"function"!=typeof a.toString&&"string"==typeof(a+"")}function l(a){a.length=0,q.length<w&&q.push(a)}function m(a){var b=a.cache;b&&m(b),a.array=a.cache=a.criteria=a.object=a.number=a.string=a.value=null,r.length<w&&r.push(a)}function n(a,b,c){b||(b=0),"undefined"==typeof c&&(c=a?a.length:0);for(var d=-1,e=c-b||0,f=Array(0>e?0:e);++d<e;)f[d]=a[b+d];return f}function o(c){function q(a){return a&&"object"==typeof a&&!ke(a)&&Rd.call(a,"__wrapped__")?a:new r(a)}function r(a,b){this.__chain__=!!b,this.__wrapped__=a}function w(a){function b(){if(d){var a=n(d);Sd.apply(a,arguments)}if(this instanceof b){var f=bb(c.prototype),g=c.apply(f,a||arguments);return Lb(g)?g:f}return c.apply(e,a||arguments)}var c=a[0],d=a[2],e=a[4];return je(b,a),b}function _(a,b,c,d,e){if(c){var f=c(a);if("undefined"!=typeof f)return f}var g=Lb(a);if(!g)return a;var i=Kd.call(a);if(!W[i]||!he.nodeClass&&j(a))return a;var k=fe[i];switch(i){case O:case P:return new k(+a);case S:case V:return new k(a);case U:return f=k(a.source,C.exec(a)),f.lastIndex=a.lastIndex,f}var m=ke(a);if(b){var o=!d;d||(d=h()),e||(e=h());for(var p=d.length;p--;)if(d[p]==a)return e[p];f=m?k(a.length):{}}else f=m?n(a):ve({},a);return m&&(Rd.call(a,"index")&&(f.index=a.index),Rd.call(a,"input")&&(f.input=a.input)),b?(d.push(a),e.push(f),(m?ue:ye)(a,function(a,g){f[g]=_(a,b,c,d,e)}),o&&(l(d),l(e)),f):f}function bb(a){return Lb(a)?Yd(a):{}}function cb(a,b,c){if("function"!=typeof a)return ed;if("undefined"==typeof b||!("prototype"in a))return a;var d=a.__bindData__;if("undefined"==typeof d&&(he.funcNames&&(d=!a.name),d=d||!he.funcDecomp,!d)){var e=Pd.call(a);he.funcNames||(d=!D.test(e)),d||(d=H.test(e),je(a,d))}if(d===!1||d!==!0&&1&d[1])return a;switch(c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)};case 4:return function(c,d,e,f){return a.call(b,c,d,e,f)}}return Pc(a,b)}function db(a){function b(){var a=i?g:this;if(e){var o=n(e);Sd.apply(o,arguments)}if((f||k)&&(o||(o=n(arguments)),f&&Sd.apply(o,f),k&&o.length<h))return d|=16,db([c,l?d:-4&d,o,null,g,h]);if(o||(o=arguments),j&&(c=a[m]),this instanceof b){a=bb(c.prototype);var p=c.apply(a,o);return Lb(p)?p:a}return c.apply(a,o)}var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],i=1&d,j=2&d,k=4&d,l=8&d,m=c;return je(b,a),b}function eb(c,d){var e=-1,g=pb(),h=c?c.length:0,i=h>=v&&g===a,j=[];if(i){var k=f(d);k?(g=b,d=k):i=!1}for(;++e<h;){var l=c[e];g(d,l)<0&&j.push(l)}return i&&m(d),j}function gb(a,b,c,d){for(var e=(d||0)-1,f=a?a.length:0,g=[];++e<f;){var h=a[e];if(h&&"object"==typeof h&&"number"==typeof h.length&&(ke(h)||tb(h))){b||(h=gb(h,b,c));var i=-1,j=h.length,k=g.length;for(g.length+=j;++i<j;)g[k++]=h[i]}else c||g.push(h)}return g}function hb(a,b,c,d,e,f){if(c){var g=c(a,b);if("undefined"!=typeof g)return!!g}if(a===b)return 0!==a||1/a==1/b;var i=typeof a,k=typeof b;if(!(a!==a||a&&$[i]||b&&$[k]))return!1;if(null==a||null==b)return a===b;var m=Kd.call(a),n=Kd.call(b);if(m==M&&(m=T),n==M&&(n=T),m!=n)return!1;switch(m){case O:case P:return+a==+b;case S:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case U:case V:return a==Dd(b)}var o=m==N;if(!o){var p=Rd.call(a,"__wrapped__"),q=Rd.call(b,"__wrapped__");if(p||q)return hb(p?a.__wrapped__:a,q?b.__wrapped__:b,c,d,e,f);if(m!=T||!he.nodeClass&&(j(a)||j(b)))return!1;var r=!he.argsObject&&tb(a)?Bd:a.constructor,s=!he.argsObject&&tb(b)?Bd:b.constructor;if(r!=s&&!(Kb(r)&&r instanceof r&&Kb(s)&&s instanceof s)&&"constructor"in a&&"constructor"in b)return!1}var t=!e;e||(e=h()),f||(f=h());for(var u=e.length;u--;)if(e[u]==a)return f[u]==b;var v=0;if(g=!0,e.push(a),f.push(b),o){if(u=a.length,v=b.length,g=v==u,g||d)for(;v--;){var w=u,x=b[v];if(d)for(;w--&&!(g=hb(a[w],x,c,d,e,f)););else if(!(g=hb(a[v],x,c,d,e,f)))break}}else xe(b,function(b,h,i){return Rd.call(i,h)?(v++,g=Rd.call(a,h)&&hb(a[h],b,c,d,e,f)):void 0}),g&&!d&&xe(a,function(a,b,c){return Rd.call(c,b)?g=--v>-1:void 0});return e.pop(),f.pop(),t&&(l(e),l(f)),g}function ib(a,b,c,d,e){(ke(b)?dc:ye)(b,function(b,f){var g,h,i=b,j=a[f];if(b&&((h=ke(b))||ze(b))){for(var k=d.length;k--;)if(g=d[k]==b){j=e[k];break}if(!g){var l;c&&(i=c(j,b),(l="undefined"!=typeof i)&&(j=i)),l||(j=h?ke(j)?j:[]:ze(j)?j:{}),d.push(b),e.push(j),l||ib(j,b,c,d,e)}}else c&&(i=c(j,b),"undefined"==typeof i&&(i=b)),"undefined"!=typeof i&&(j=i);a[f]=j})}function jb(a,b){return a+Od(ee()*(b-a+1))}function kb(c,d,e){var g=-1,i=pb(),j=c?c.length:0,k=[],n=!d&&j>=v&&i===a,o=e||n?h():k;if(n){var p=f(o);i=b,o=p}for(;++g<j;){var q=c[g],r=e?e(q,g,c):q;(d?!g||o[o.length-1]!==r:i(o,r)<0)&&((e||n)&&o.push(r),k.push(q))}return n?(l(o.array),m(o)):e&&l(o),k}function lb(a){return function(b,c,d){var e={};if(c=q.createCallback(c,d,3),ke(b))for(var f=-1,g=b.length;++f<g;){var h=b[f];a(e,h,c(h,f,b),b)}else ue(b,function(b,d,f){a(e,b,c(b,d,f),f)});return e}}function mb(a,b,c,d,e,f){var g=1&b,h=2&b,i=4&b,j=16&b,k=32&b;if(!h&&!Kb(a))throw new Ed;j&&!c.length&&(b&=-17,j=c=!1),k&&!d.length&&(b&=-33,k=d=!1);var l=a&&a.__bindData__;if(l&&l!==!0)return l=n(l),l[2]&&(l[2]=n(l[2])),l[3]&&(l[3]=n(l[3])),!g||1&l[1]||(l[4]=e),!g&&1&l[1]&&(b|=8),!i||4&l[1]||(l[5]=f),j&&Sd.apply(l[2]||(l[2]=[]),c),k&&Wd.apply(l[3]||(l[3]=[]),d),l[1]|=b,mb.apply(null,l);var m=1==b||17===b?w:db;return m([a,b,c,d,e,f])}function nb(){Z.shadowedProps=K,Z.array=Z.bottom=Z.loop=Z.top="",Z.init="iterable",Z.useHas=!0;for(var a,b=0;a=arguments[b];b++)for(var c in a)Z[c]=a[c];var d=Z.args;Z.firstArg=/^[^,]+/.exec(d)[0];var e=yd("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString","return function("+d+") {\n"+ie(Z)+"\n}");return e(cb,Q,Gd,Rd,t,tb,ke,Qb,Z.keys,Hd,$,ge,V,Id,Kd)}function ob(a){return qe[a]}function pb(){var b=(b=q.indexOf)===yc?a:b;return b}function qb(a){return"function"==typeof a&&Ld.test(a)}function rb(a){var b,c;return!a||Kd.call(a)!=T||(b=a.constructor,Kb(b)&&!(b instanceof b))||!he.argsClass&&tb(a)||!he.nodeClass&&j(a)?!1:he.ownLast?(xe(a,function(a,b,d){return c=Rd.call(d,b),!1}),c!==!1):(xe(a,function(a,b){c=b}),"undefined"==typeof c||Rd.call(a,c))}function sb(a){return re[a]}function tb(a){return a&&"object"==typeof a&&"number"==typeof a.length&&Kd.call(a)==M||!1}function ub(a,b,c,d){return"boolean"!=typeof b&&null!=b&&(d=c,c=b,b=!1),_(a,b,"function"==typeof c&&cb(c,d,1))}function vb(a,b,c){return _(a,!0,"function"==typeof b&&cb(b,c,1))}function wb(a,b){var c=bb(a);return b?ve(c,b):c}function xb(a,b,c){var d;return b=q.createCallback(b,c,3),ye(a,function(a,c,e){return b(a,c,e)?(d=c,!1):void 0}),d}function yb(a,b,c){var d;return b=q.createCallback(b,c,3),Ab(a,function(a,c,e){return b(a,c,e)?(d=c,!1):void 0}),d}function zb(a,b,c){var d=[];xe(a,function(a,b){d.push(b,a)});var e=d.length;for(b=cb(b,c,3);e--&&b(d[e--],d[e],a)!==!1;);return a}function Ab(a,b,c){var d=me(a),e=d.length;for(b=cb(b,c,3);e--;){var f=d[e];if(b(a[f],f,a)===!1)break}return a}function Bb(a){var b=[];return xe(a,function(a,c){Kb(a)&&b.push(c)}),b.sort()}function Cb(a,b){return a?Rd.call(a,b):!1}function Db(a){for(var b=-1,c=me(a),d=c.length,e={};++b<d;){var f=c[b];e[a[f]]=f}return e}function Eb(a){return a===!0||a===!1||a&&"object"==typeof a&&Kd.call(a)==O||!1}function Fb(a){return a&&"object"==typeof a&&Kd.call(a)==P||!1}function Gb(a){return a&&1===a.nodeType||!1}function Hb(a){var b=!0;if(!a)return b;var c=Kd.call(a),d=a.length;return c==N||c==V||(he.argsClass?c==M:tb(a))||c==T&&"number"==typeof d&&Kb(a.splice)?!d:(ye(a,function(){return b=!1}),b)}function Ib(a,b,c,d){return hb(a,b,"function"==typeof c&&cb(c,d,2))}function Jb(a){return $d(a)&&!_d(parseFloat(a))}function Kb(a){return"function"==typeof a}function Lb(a){return!(!a||!$[typeof a])}function Mb(a){return Ob(a)&&a!=+a}function Nb(a){return null===a}function Ob(a){return"number"==typeof a||a&&"object"==typeof a&&Kd.call(a)==S||!1}function Pb(a){return a&&$[typeof a]&&Kd.call(a)==U||!1}function Qb(a){return"string"==typeof a||a&&"object"==typeof a&&Kd.call(a)==V||!1}function Rb(a){return"undefined"==typeof a}function Sb(a,b,c){var d={};return b=q.createCallback(b,c,3),ye(a,function(a,c,e){d[c]=b(a,c,e)}),d}function Tb(a){var b=arguments,c=2;if(!Lb(a))return a;if("number"!=typeof b[2]&&(c=b.length),c>3&&"function"==typeof b[c-2])var d=cb(b[--c-1],b[c--],2);else c>2&&"function"==typeof b[c-1]&&(d=b[--c]);for(var e=n(arguments,1,c),f=-1,g=h(),i=h();++f<c;)ib(a,e[f],d,g,i);return l(g),l(i),a}function Ub(a,b,c){var d={};if("function"!=typeof b){var e=[];xe(a,function(a,b){e.push(b)}),e=eb(e,gb(arguments,!0,!1,1));for(var f=-1,g=e.length;++f<g;){var h=e[f];d[h]=a[h]}}else b=q.createCallback(b,c,3),xe(a,function(a,c,e){b(a,c,e)||(d[c]=a)});return d}function Vb(a){for(var b=-1,c=me(a),d=c.length,e=ud(d);++b<d;){var f=c[b];e[b]=[f,a[f]]}return e}function Wb(a,b,c){var d={};if("function"!=typeof b)for(var e=-1,f=gb(arguments,!0,!1,1),g=Lb(a)?f.length:0;++e<g;){var h=f[e];h in a&&(d[h]=a[h])}else b=q.createCallback(b,c,3),xe(a,function(a,c,e){b(a,c,e)&&(d[c]=a)});return d}function Xb(a,b,c,d){var e=ke(a);if(null==c)if(e)c=[];else{var f=a&&a.constructor,g=f&&f.prototype;c=bb(g)}return b&&(b=q.createCallback(b,d,4),(e?ue:ye)(a,function(a,d,e){return b(c,a,d,e)})),c}function Yb(a){for(var b=-1,c=me(a),d=c.length,e=ud(d);++b<d;)e[b]=a[c[b]];return e}function Zb(a){var b=arguments,c=-1,d=gb(b,!0,!1,1),e=b[2]&&b[2][b[1]]===a?1:d.length,f=ud(e);for(he.unindexedChars&&Qb(a)&&(a=a.split(""));++c<e;)f[c]=a[d[c]];return f}function $b(a,b,c){var d=-1,e=pb(),f=a?a.length:0,g=!1;return c=(0>c?be(0,f+c):c)||0,ke(a)?g=e(a,b,c)>-1:"number"==typeof f?g=(Qb(a)?a.indexOf(b,c):e(a,b,c))>-1:ue(a,function(a){return++d>=c?!(g=a===b):void 0}),g}function _b(a,b,c){var d=!0;if(b=q.createCallback(b,c,3),ke(a))for(var e=-1,f=a.length;++e<f&&(d=!!b(a[e],e,a)););else ue(a,function(a,c,e){return d=!!b(a,c,e)});return d}function ac(a,b,c){var d=[];if(b=q.createCallback(b,c,3),ke(a))for(var e=-1,f=a.length;++e<f;){var g=a[e];b(g,e,a)&&d.push(g)}else ue(a,function(a,c,e){b(a,c,e)&&d.push(a)});return d}function bc(a,b,c){if(b=q.createCallback(b,c,3),!ke(a)){var d;return ue(a,function(a,c,e){return b(a,c,e)?(d=a,!1):void 0}),d}for(var e=-1,f=a.length;++e<f;){var g=a[e];if(b(g,e,a))return g}}function cc(a,b,c){var d;return b=q.createCallback(b,c,3),ec(a,function(a,c,e){return b(a,c,e)?(d=a,!1):void 0}),d}function dc(a,b,c){if(b&&"undefined"==typeof c&&ke(a))for(var d=-1,e=a.length;++d<e&&b(a[d],d,a)!==!1;);else ue(a,b,c);return a}function ec(a,b,c){var d=a,e=a?a.length:0;if(b=b&&"undefined"==typeof c?b:cb(b,c,3),ke(a))for(;e--&&b(a[e],e,a)!==!1;);else{if("number"!=typeof e){var f=me(a);e=f.length}else he.unindexedChars&&Qb(a)&&(d=a.split(""));ue(a,function(a,c,g){return c=f?f[--e]:--e,b(d[c],c,g)})}return a}function fc(a,b){var c=n(arguments,2),d=-1,e="function"==typeof b,f=a?a.length:0,g=ud("number"==typeof f?f:0);return dc(a,function(a){g[++d]=(e?b:a[b]).apply(a,c)}),g}function gc(a,b,c){var d=-1,e=a?a.length:0,f=ud("number"==typeof e?e:0);if(b=q.createCallback(b,c,3),ke(a))for(;++d<e;)f[d]=b(a[d],d,a);else ue(a,function(a,c,e){f[++d]=b(a,c,e)});return f}function hc(a,b,c){var e=-1/0,f=e;if("function"!=typeof b&&c&&c[b]===a&&(b=null),null==b&&ke(a))for(var g=-1,h=a.length;++g<h;){var i=a[g];i>f&&(f=i)}else b=null==b&&Qb(a)?d:q.createCallback(b,c,3),ue(a,function(a,c,d){var g=b(a,c,d);g>e&&(e=g,f=a)});return f}function ic(a,b,c){var e=1/0,f=e;if("function"!=typeof b&&c&&c[b]===a&&(b=null),null==b&&ke(a))for(var g=-1,h=a.length;++g<h;){var i=a[g];f>i&&(f=i)}else b=null==b&&Qb(a)?d:q.createCallback(b,c,3),ue(a,function(a,c,d){var g=b(a,c,d);e>g&&(e=g,f=a)});return f}function jc(a,b,c,d){var e=arguments.length<3;if(b=q.createCallback(b,d,4),ke(a)){var f=-1,g=a.length;for(e&&(c=a[++f]);++f<g;)c=b(c,a[f],f,a)}else ue(a,function(a,d,f){c=e?(e=!1,a):b(c,a,d,f)});return c}function kc(a,b,c,d){var e=arguments.length<3;return b=q.createCallback(b,d,4),ec(a,function(a,d,f){c=e?(e=!1,a):b(c,a,d,f)}),c}function lc(a,b,c){return b=q.createCallback(b,c,3),ac(a,function(a,c,d){return!b(a,c,d)})}function mc(a,b,c){if(a&&"number"!=typeof a.length?a=Yb(a):he.unindexedChars&&Qb(a)&&(a=a.split("")),null==b||c)return a?a[jb(0,a.length-1)]:p;var d=nc(a);return d.length=ce(be(0,b),d.length),d}function nc(a){var b=-1,c=a?a.length:0,d=ud("number"==typeof c?c:0);return dc(a,function(a){var c=jb(0,++b);d[b]=d[c],d[c]=a}),d}function oc(a){var b=a?a.length:0;return"number"==typeof b?b:me(a).length}function pc(a,b,c){var d;if(b=q.createCallback(b,c,3),ke(a))for(var e=-1,f=a.length;++e<f&&!(d=b(a[e],e,a)););else ue(a,function(a,c,e){return!(d=b(a,c,e))});return!!d}function qc(a,b,c){var d=-1,f=ke(b),g=a?a.length:0,j=ud("number"==typeof g?g:0);for(f||(b=q.createCallback(b,c,3)),dc(a,function(a,c,e){var g=j[++d]=i();f?g.criteria=gc(b,function(b){return a[b]}):(g.criteria=h())[0]=b(a,c,e),g.index=d,g.value=a}),g=j.length,j.sort(e);g--;){var k=j[g];j[g]=k.value,f||l(k.criteria),m(k)}return j}function rc(a){return a&&"number"==typeof a.length?he.unindexedChars&&Qb(a)?a.split(""):n(a):Yb(a)}function sc(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}function tc(a){return eb(a,gb(arguments,!0,!0,1))}function uc(a,b,c){var d=-1,e=a?a.length:0;for(b=q.createCallback(b,c,3);++d<e;)if(b(a[d],d,a))return d;return-1}function vc(a,b,c){var d=a?a.length:0;for(b=q.createCallback(b,c,3);d--;)if(b(a[d],d,a))return d;return-1}function wc(a,b,c){var d=0,e=a?a.length:0;if("number"!=typeof b&&null!=b){var f=-1;for(b=q.createCallback(b,c,3);++f<e&&b(a[f],f,a);)d++}else if(d=b,null==d||c)return a?a[0]:p;return n(a,0,ce(be(0,d),e))}function xc(a,b,c,d){return"boolean"!=typeof b&&null!=b&&(d=c,c="function"!=typeof b&&d&&d[b]===a?null:b,b=!1),null!=c&&(a=gc(a,c,d)),gb(a,b)}function yc(b,c,d){if("number"==typeof d){var e=b?b.length:0;d=0>d?be(0,e+d):d||0}else if(d){var f=Hc(b,c);return b[f]===c?f:-1}return a(b,c,d)}function zc(a,b,c){var d=0,e=a?a.length:0;if("number"!=typeof b&&null!=b){var f=e;for(b=q.createCallback(b,c,3);f--&&b(a[f],f,a);)d++}else d=null==b||c?1:b||d;return n(a,0,ce(be(0,e-d),e))}function Ac(){for(var c=[],d=-1,e=arguments.length,g=h(),i=pb(),j=i===a,k=h();++d<e;){var n=arguments[d];(ke(n)||tb(n))&&(c.push(n),g.push(j&&n.length>=v&&f(d?c[d]:k)))}var o=c[0],p=-1,q=o?o.length:0,r=[];a:for(;++p<q;){var s=g[0];if(n=o[p],(s?b(s,n):i(k,n))<0){for(d=e,(s||k).push(n);--d;)if(s=g[d],(s?b(s,n):i(c[d],n))<0)continue a;r.push(n)}}for(;e--;)s=g[e],s&&m(s);return l(g),l(k),r}function Bc(a,b,c){var d=0,e=a?a.length:0;if("number"!=typeof b&&null!=b){var f=e;for(b=q.createCallback(b,c,3);f--&&b(a[f],f,a);)d++}else if(d=b,null==d||c)return a?a[e-1]:p;return n(a,be(0,e-d))}function Cc(a,b,c){var d=a?a.length:0;for("number"==typeof c&&(d=(0>c?be(0,d+c):ce(c,d-1))+1);d--;)if(a[d]===b)return d;return-1}function Dc(a){for(var b=arguments,c=0,d=b.length,e=a?a.length:0;++c<d;)for(var f=-1,g=b[c];++f<e;)a[f]===g&&(Vd.call(a,f--,1),e--);return a}function Ec(a,b,c){a=+a||0,c="number"==typeof c?c:+c||1,null==b&&(b=a,a=0);for(var d=-1,e=be(0,Md((b-a)/(c||1))),f=ud(e);++d<e;)f[d]=a,a+=c;return f}function Fc(a,b,c){var d=-1,e=a?a.length:0,f=[];for(b=q.createCallback(b,c,3);++d<e;){var g=a[d];b(g,d,a)&&(f.push(g),Vd.call(a,d--,1),e--)}return f}function Gc(a,b,c){if("number"!=typeof b&&null!=b){var d=0,e=-1,f=a?a.length:0;for(b=q.createCallback(b,c,3);++e<f&&b(a[e],e,a);)d++}else d=null==b||c?1:be(0,b);return n(a,d)}function Hc(a,b,c,d){var e=0,f=a?a.length:e;for(c=c?q.createCallback(c,d,1):ed,b=c(b);f>e;){var g=e+f>>>1;c(a[g])<b?e=g+1:f=g}return e}function Ic(){return kb(gb(arguments,!0,!0))}function Jc(a,b,c,d){return"boolean"!=typeof b&&null!=b&&(d=c,c="function"!=typeof b&&d&&d[b]===a?null:b,b=!1),null!=c&&(c=q.createCallback(c,d,3)),kb(a,b,c)}function Kc(a){return eb(a,n(arguments,1))}function Lc(){for(var a=-1,b=arguments.length;++a<b;){var c=arguments[a];if(ke(c)||tb(c))var d=d?kb(eb(d,c).concat(eb(c,d))):c}return d||[]}function Mc(){for(var a=arguments.length>1?arguments:arguments[0],b=-1,c=a?hc(De(a,"length")):0,d=ud(0>c?0:c);++b<c;)d[b]=De(a,b);return d}function Nc(a,b){var c=-1,d=a?a.length:0,e={};for(b||!d||ke(a[0])||(b=[]);++c<d;){var f=a[c];b?e[f]=b[c]:f&&(e[f[0]]=f[1])}return e}function Oc(a,b){if(!Kb(b))throw new Ed;return function(){return--a<1?b.apply(this,arguments):void 0}}function Pc(a,b){return arguments.length>2?mb(a,17,n(arguments,2),null,b):mb(a,1,null,null,b)}function Qc(a){for(var b=arguments.length>1?gb(arguments,!0,!1,1):Bb(a),c=-1,d=b.length;++c<d;){var e=b[c];a[e]=mb(a[e],1,null,null,a)}return a}function Rc(a,b){return arguments.length>2?mb(b,19,n(arguments,2),null,a):mb(b,3,null,null,a)}function Sc(){for(var a=arguments,b=a.length;b--;)if(!Kb(a[b]))throw new Ed;return function(){for(var b=arguments,c=a.length;c--;)b=[a[c].apply(this,b)];return b[0]}}function Tc(a,b){return b="number"==typeof b?b:+b||a.length,mb(a,4,null,null,null,b)}function Uc(a,b,c){var d,e,f,g,h,i,j,k=0,l=!1,m=!0;if(!Kb(a))throw new Ed;if(b=be(0,b)||0,c===!0){var n=!0;m=!1}else Lb(c)&&(n=c.leading,l="maxWait"in c&&(be(b,c.maxWait)||0),m="trailing"in c?c.trailing:m);var o=function(){var c=b-(Fe()-g);if(0>=c){e&&Nd(e);var l=j;e=i=j=p,l&&(k=Fe(),f=a.apply(h,d),i||e||(d=h=null))}else i=Ud(o,c)},q=function(){i&&Nd(i),e=i=j=p,(m||l!==b)&&(k=Fe(),f=a.apply(h,d),i||e||(d=h=null))};return function(){if(d=arguments,g=Fe(),h=this,j=m&&(i||!n),l===!1)var c=n&&!i;else{e||n||(k=g);var p=l-(g-k),r=0>=p;r?(e&&(e=Nd(e)),k=g,f=a.apply(h,d)):e||(e=Ud(q,p))}return r&&i?i=Nd(i):i||b===l||(i=Ud(o,b)),c&&(r=!0,f=a.apply(h,d)),!r||i||e||(d=h=null),f}}function Vc(a){if(!Kb(a))throw new Ed;var b=n(arguments,1);return Ud(function(){a.apply(p,b)},1)}function Wc(a,b){if(!Kb(a))throw new Ed;var c=n(arguments,2);return Ud(function(){a.apply(p,c)},b)}function Xc(a,b){if(!Kb(a))throw new Ed;var c=function(){var d=c.cache,e=b?b.apply(this,arguments):u+arguments[0];return Rd.call(d,e)?d[e]:d[e]=a.apply(this,arguments)};return c.cache={},c}function Yc(a){var b,c;if(!Kb(a))throw new Ed;return function(){return b?c:(b=!0,c=a.apply(this,arguments),a=null,c)}}function Zc(a){return mb(a,16,n(arguments,1))}function $c(a){return mb(a,32,null,n(arguments,1))}function _c(a,b,c){var d=!0,e=!0;if(!Kb(a))throw new Ed;return c===!1?d=!1:Lb(c)&&(d="leading"in c?c.leading:d,e="trailing"in c?c.trailing:e),X.leading=d,X.maxWait=b,X.trailing=e,Uc(a,b,X)}function ad(a,b){return mb(b,16,[a])}function bd(a){return function(){return a}}function cd(a,b,c){var d=typeof a;if(null==a||"function"==d)return cb(a,b,c);if("object"!=d)return id(a);var e=me(a),f=e[0],g=a[f];return 1!=e.length||g!==g||Lb(g)?function(b){for(var c=e.length,d=!1;c--&&(d=hb(b[e[c]],a[e[c]],null,!0)););return d}:function(a){var b=a[f];return g===b&&(0!==g||1/g==1/b)}}function dd(a){return null==a?"":Dd(a).replace(te,ob)}function ed(a){return a}function fd(a,b,c){var d=!0,e=b&&Bb(b);b&&(c||e.length)||(null==c&&(c=b),f=r,b=a,a=q,e=Bb(b)),c===!1?d=!1:Lb(c)&&"chain"in c&&(d=c.chain);var f=a,g=Kb(f);dc(e,function(c){var e=a[c]=b[c];g&&(f.prototype[c]=function(){var b=this.__chain__,c=this.__wrapped__,g=[c];Sd.apply(g,arguments);var h=e.apply(a,g);if(d||b){if(c===h&&Lb(h))return this;h=new f(h),h.__chain__=b}return h})})}function gd(){return c._=Jd,this}function hd(){}function id(a){return function(b){return b[a]}}function jd(a,b,c){var d=null==a,e=null==b;if(null==c&&("boolean"==typeof a&&e?(c=a,a=1):e||"boolean"!=typeof b||(c=b,e=!0)),d&&e&&(b=1),a=+a||0,e?(b=a,a=0):b=+b||0,c||a%1||b%1){var f=ee();return ce(a+f*(b-a+parseFloat("1e-"+((f+"").length-1))),b)}return jb(a,b)}function kd(a,b){if(a){var c=a[b];return Kb(c)?a[b]():c}}function ld(a,b,c){var d=q.templateSettings;a=Dd(a||""),c=we({},c,d);var e,f=we({},c.imports,d.imports),h=me(f),i=Yb(f),j=0,k=c.interpolate||G,l="__p += '",m=Cd((c.escape||G).source+"|"+k.source+"|"+(k===E?B:G).source+"|"+(c.evaluate||G).source+"|$","g");a.replace(m,function(b,c,d,f,h,i){return d||(d=f),l+=a.slice(j,i).replace(I,g),c&&(l+="' +\n__e("+c+") +\n'"),h&&(e=!0,l+="';\n"+h+";\n__p += '"),d&&(l+="' +\n((__t = ("+d+")) == null ? '' : __t) +\n'"),j=i+b.length,b}),l+="';\n";var n=c.variable,o=n;o||(n="obj",l="with ("+n+") {\n"+l+"\n}\n"),l=(e?l.replace(y,""):l).replace(z,"$1").replace(A,"$1;"),l="function("+n+") {\n"+(o?"":n+" || ("+n+" = {});\n")+"var __t, __p = '', __e = _.escape"+(e?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+l+"return __p\n}";var r="\n/*\n//# sourceURL="+(c.sourceURL||"/lodash/template/source["+L++ +"]")+"\n*/";try{var s=yd(h,"return "+l+r).apply(p,i)}catch(t){throw t.source=l,t}return b?s(b):(s.source=l,s)}function md(a,b,c){a=(a=+a)>-1?a:0;var d=-1,e=ud(a);for(b=cb(b,c,1);++d<a;)e[d]=b(d);return e}function nd(a){return null==a?"":Dd(a).replace(se,sb)}function od(a){var b=++s;return Dd(null==a?"":a)+b}function pd(a){return a=new r(a),a.__chain__=!0,a}function qd(a,b){return b(a),a}function rd(){return this.__chain__=!0,this}function sd(){return Dd(this.__wrapped__)}function td(){return this.__wrapped__}c=c?fb.defaults(ab.Object(),c,fb.pick(ab,J)):ab;var ud=c.Array,vd=c.Boolean,wd=c.Date,xd=c.Error,yd=c.Function,zd=c.Math,Ad=c.Number,Bd=c.Object,Cd=c.RegExp,Dd=c.String,Ed=c.TypeError,Fd=[],Gd=xd.prototype,Hd=Bd.prototype,Id=Dd.prototype,Jd=c._,Kd=Hd.toString,Ld=Cd("^"+Dd(Kd).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),Md=zd.ceil,Nd=c.clearTimeout,Od=zd.floor,Pd=yd.prototype.toString,Qd=qb(Qd=Bd.getPrototypeOf)&&Qd,Rd=Hd.hasOwnProperty,Sd=Fd.push,Td=Hd.propertyIsEnumerable,Ud=c.setTimeout,Vd=Fd.splice,Wd=Fd.unshift,Xd=function(){try{var a={},b=qb(b=Bd.defineProperty)&&b,c=b(a,a,a)&&b}catch(d){}return c}(),Yd=qb(Yd=Bd.create)&&Yd,Zd=qb(Zd=ud.isArray)&&Zd,$d=c.isFinite,_d=c.isNaN,ae=qb(ae=Bd.keys)&&ae,be=zd.max,ce=zd.min,de=c.parseInt,ee=zd.random,fe={};fe[N]=ud,fe[O]=vd,fe[P]=wd,fe[R]=yd,fe[T]=Bd,fe[S]=Ad,fe[U]=Cd,fe[V]=Dd;var ge={};ge[N]=ge[P]=ge[S]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},ge[O]=ge[V]={constructor:!0,toString:!0,valueOf:!0},ge[Q]=ge[R]=ge[U]={constructor:!0,toString:!0},ge[T]={constructor:!0},function(){for(var a=K.length;a--;){var b=K[a];for(var c in ge)Rd.call(ge,c)&&!Rd.call(ge[c],b)&&(ge[c][b]=!1)}}(),r.prototype=q.prototype;var he=q.support={};!function(){var a=function(){this.x=1},b={0:1,length:1},d=[];a.prototype={valueOf:1,y:1};for(var e in new a)d.push(e);for(e in arguments);he.argsClass=Kd.call(arguments)==M,he.argsObject=arguments.constructor==Bd&&!(arguments instanceof ud),he.enumErrorProps=Td.call(Gd,"message")||Td.call(Gd,"name"),he.enumPrototypes=Td.call(a,"prototype"),he.funcDecomp=!qb(c.WinRTError)&&H.test(o),he.funcNames="string"==typeof yd.name,he.nonEnumArgs=0!=e,he.nonEnumShadows=!/valueOf/.test(d),he.ownLast="x"!=d[0],he.spliceObjects=(Fd.splice.call(b,0,1),!b[0]),he.unindexedChars="x"[0]+Bd("x")[0]!="xx";try{he.nodeClass=!(Kd.call(document)==T&&!({toString:0}+""))}catch(f){he.nodeClass=!0}}(1),q.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:E,variable:"",imports:{_:q}};var ie=function(a){var b="var index, iterable = "+a.firstArg+", result = "+a.init+";\nif (!iterable) return result;\n"+a.top+";";a.array?(b+="\nvar length = iterable.length; index = -1;\nif ("+a.array+") {  ",he.unindexedChars&&(b+="\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "),b+="\n  while (++index < length) {\n    "+a.loop+";\n  }\n}\nelse {  "):he.nonEnumArgs&&(b+="\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      "+a.loop+";\n    }\n  } else {  "),he.enumPrototypes&&(b+="\n  var skipProto = typeof iterable == 'function';\n  "),he.enumErrorProps&&(b+="\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");var c=[];if(he.enumPrototypes&&c.push('!(skipProto && index == "prototype")'),he.enumErrorProps&&c.push('!(skipErrorProps && (index == "message" || index == "name"))'),a.useHas&&a.keys)b+="\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n",c.length&&(b+="    if ("+c.join(" && ")+") {\n  "),b+=a.loop+";    ",c.length&&(b+="\n    }"),b+="\n  }  ";else if(b+="\n  for (index in iterable) {\n",a.useHas&&c.push("hasOwnProperty.call(iterable, index)"),c.length&&(b+="    if ("+c.join(" && ")+") {\n  "),b+=a.loop+";    ",c.length&&(b+="\n    }"),b+="\n  }    ",he.nonEnumShadows){for(b+="\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ",k=0;7>k;k++)b+="\n    index = '"+a.shadowedProps[k]+"';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))",a.useHas||(b+=" || (!nonEnum[index] && iterable[index] !== objectProto[index])"),b+=") {\n      "+a.loop+";\n    }      ";b+="\n  }    "}return(a.array||he.nonEnumArgs)&&(b+="\n}"),b+=a.bottom+";\nreturn result"};Yd||(bb=function(){function a(){}return function(b){if(Lb(b)){a.prototype=b;var d=new a;a.prototype=null}return d||c.Object()}}());var je=Xd?function(a,b){Y.value=b,Xd(a,"__bindData__",Y)}:hd;he.argsClass||(tb=function(a){return a&&"object"==typeof a&&"number"==typeof a.length&&Rd.call(a,"callee")&&!Td.call(a,"callee")||!1});var ke=Zd||function(a){return a&&"object"==typeof a&&"number"==typeof a.length&&Kd.call(a)==N||!1},le=nb({args:"object",init:"[]",top:"if (!(objectTypes[typeof object])) return result",loop:"result.push(index)"}),me=ae?function(a){return Lb(a)?he.enumPrototypes&&"function"==typeof a||he.nonEnumArgs&&a.length&&tb(a)?le(a):ae(a):[]}:le,ne={args:"collection, callback, thisArg",top:"callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",array:"typeof length == 'number'",keys:me,loop:"if (callback(iterable[index], index, collection) === false) return result"},oe={args:"object, source, guard",top:"var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",keys:me,loop:"if (typeof result[index] == 'undefined') result[index] = iterable[index]",bottom:"  }\n}"},pe={top:"if (!objectTypes[typeof iterable]) return result;\n"+ne.top,array:!1},qe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},re=Db(qe),se=Cd("("+me(re).join("|")+")","g"),te=Cd("["+me(qe).join("")+"]","g"),ue=nb(ne),ve=nb(oe,{top:oe.top.replace(";",";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),loop:"result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"}),we=nb(oe),xe=nb(ne,pe,{useHas:!1}),ye=nb(ne,pe);Kb(/x/)&&(Kb=function(a){return"function"==typeof a&&Kd.call(a)==R});var ze=Qd?function(a){if(!a||Kd.call(a)!=T||!he.argsClass&&tb(a))return!1;var b=a.valueOf,c=qb(b)&&(c=Qd(b))&&Qd(c);return c?a==c||Qd(a)==c:rb(a)}:rb,Ae=lb(function(a,b,c){Rd.call(a,c)?a[c]++:a[c]=1}),Be=lb(function(a,b,c){(Rd.call(a,c)?a[c]:a[c]=[]).push(b)
}),Ce=lb(function(a,b,c){a[c]=b}),De=gc,Ee=ac,Fe=qb(Fe=wd.now)&&Fe||function(){return(new wd).getTime()},Ge=8==de(x+"08")?de:function(a,b){return de(Qb(a)?a.replace(F,""):a,b||0)};return q.after=Oc,q.assign=ve,q.at=Zb,q.bind=Pc,q.bindAll=Qc,q.bindKey=Rc,q.chain=pd,q.compact=sc,q.compose=Sc,q.constant=bd,q.countBy=Ae,q.create=wb,q.createCallback=cd,q.curry=Tc,q.debounce=Uc,q.defaults=we,q.defer=Vc,q.delay=Wc,q.difference=tc,q.filter=ac,q.flatten=xc,q.forEach=dc,q.forEachRight=ec,q.forIn=xe,q.forInRight=zb,q.forOwn=ye,q.forOwnRight=Ab,q.functions=Bb,q.groupBy=Be,q.indexBy=Ce,q.initial=zc,q.intersection=Ac,q.invert=Db,q.invoke=fc,q.keys=me,q.map=gc,q.mapValues=Sb,q.max=hc,q.memoize=Xc,q.merge=Tb,q.min=ic,q.omit=Ub,q.once=Yc,q.pairs=Vb,q.partial=Zc,q.partialRight=$c,q.pick=Wb,q.pluck=De,q.property=id,q.pull=Dc,q.range=Ec,q.reject=lc,q.remove=Fc,q.rest=Gc,q.shuffle=nc,q.sortBy=qc,q.tap=qd,q.throttle=_c,q.times=md,q.toArray=rc,q.transform=Xb,q.union=Ic,q.uniq=Jc,q.values=Yb,q.where=Ee,q.without=Kc,q.wrap=ad,q.xor=Lc,q.zip=Mc,q.zipObject=Nc,q.collect=gc,q.drop=Gc,q.each=dc,q.eachRight=ec,q.extend=ve,q.methods=Bb,q.object=Nc,q.select=ac,q.tail=Gc,q.unique=Jc,q.unzip=Mc,fd(q),q.clone=ub,q.cloneDeep=vb,q.contains=$b,q.escape=dd,q.every=_b,q.find=bc,q.findIndex=uc,q.findKey=xb,q.findLast=cc,q.findLastIndex=vc,q.findLastKey=yb,q.has=Cb,q.identity=ed,q.indexOf=yc,q.isArguments=tb,q.isArray=ke,q.isBoolean=Eb,q.isDate=Fb,q.isElement=Gb,q.isEmpty=Hb,q.isEqual=Ib,q.isFinite=Jb,q.isFunction=Kb,q.isNaN=Mb,q.isNull=Nb,q.isNumber=Ob,q.isObject=Lb,q.isPlainObject=ze,q.isRegExp=Pb,q.isString=Qb,q.isUndefined=Rb,q.lastIndexOf=Cc,q.mixin=fd,q.noConflict=gd,q.noop=hd,q.now=Fe,q.parseInt=Ge,q.random=jd,q.reduce=jc,q.reduceRight=kc,q.result=kd,q.runInContext=o,q.size=oc,q.some=pc,q.sortedIndex=Hc,q.template=ld,q.unescape=nd,q.uniqueId=od,q.all=_b,q.any=pc,q.detect=bc,q.findWhere=bc,q.foldl=jc,q.foldr=kc,q.include=$b,q.inject=jc,fd(function(){var a={};return ye(q,function(b,c){q.prototype[c]||(a[c]=b)}),a}(),!1),q.first=wc,q.last=Bc,q.sample=mc,q.take=wc,q.head=wc,ye(q,function(a,b){var c="sample"!==b;q.prototype[b]||(q.prototype[b]=function(b,d){var e=this.__chain__,f=a(this.__wrapped__,b,d);return e||null!=b&&(!d||c&&"function"==typeof b)?new r(f,e):f})}),q.VERSION="2.4.1",q.prototype.chain=rd,q.prototype.toString=sd,q.prototype.value=td,q.prototype.valueOf=td,ue(["join","pop","shift"],function(a){var b=Fd[a];q.prototype[a]=function(){var a=this.__chain__,c=b.apply(this.__wrapped__,arguments);return a?new r(c,a):c}}),ue(["push","reverse","sort","unshift"],function(a){var b=Fd[a];q.prototype[a]=function(){return b.apply(this.__wrapped__,arguments),this}}),ue(["concat","slice","splice"],function(a){var b=Fd[a];q.prototype[a]=function(){return new r(b.apply(this.__wrapped__,arguments),this.__chain__)}}),he.spliceObjects||ue(["pop","shift","splice"],function(a){var b=Fd[a],c="splice"==a;q.prototype[a]=function(){var a=this.__chain__,d=this.__wrapped__,e=b.apply(d,arguments);return 0===d.length&&delete d[0],a||c?new r(e,a):e}}),q}var p,q=[],r=[],s=0,t={},u=+new Date+"",v=75,w=40,x=" 	\f ﻿\n\r\u2028\u2029 ᠎             　",y=/\b__p \+= '';/g,z=/\b(__p \+=) '' \+/g,A=/(__e\(.*?\)|\b__t\)) \+\n'';/g,B=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,D=/^\s*function[ \n\r\t]+\w/,E=/<%=([\s\S]+?)%>/g,F=RegExp("^["+x+"]*0+(?=.$)"),G=/($^)/,H=/\bthis\b/,I=/['\n\r\t\u2028\u2029\\]/g,J=["Array","Boolean","Date","Error","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],K=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],L=0,M="[object Arguments]",N="[object Array]",O="[object Boolean]",P="[object Date]",Q="[object Error]",R="[object Function]",S="[object Number]",T="[object Object]",U="[object RegExp]",V="[object String]",W={};W[R]=!1,W[M]=W[N]=W[O]=W[P]=W[S]=W[T]=W[U]=W[V]=!0;var X={leading:!1,maxWait:0,trailing:!1},Y={configurable:!1,enumerable:!1,value:null,writable:!1},Z={args:"",array:null,bottom:"",firstArg:"",init:"",keys:null,loop:"",shadowedProps:null,support:null,top:"",useHas:!1},$={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},_={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},ab=$[typeof window]&&window||this,bb=$[typeof exports]&&exports&&!exports.nodeType&&exports,cb=$[typeof module]&&module&&!module.nodeType&&module,db=cb&&cb.exports===bb&&bb,eb=$[typeof global]&&global;!eb||eb.global!==eb&&eb.window!==eb||(ab=eb);var fb=o();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(ab._=fb,define(function(){return fb})):bb&&cb?db?(cb.exports=fb)._=fb:bb._=fb:ab._=fb}.call(this);
(function() {
  "Alchemy.js is a graph drawing application for the web.\nCopyright (C) 2014  GraphAlchemist, Inc.\n\nThis program is free software: you can redistribute it and/or modify\nit under the terms of the GNU Affero General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU Affero General Public License for more details.\n\nYou should have received a copy of the GNU Affero General Public License\nalong with this program.  If not, see <http://www.gnu.org/licenses/>.\nlets";
  var Alchemy, allCaptions, allTags, container, currentNodeTypes, currentRelationshipTypes, nodeDragStarted, nodeDragended, nodeDragged, rootNodeId;

  Alchemy = (function() {
    function Alchemy() {
      this.version = "0.1.0";
      this.layout = {};
      this.interactions = {};
      this.utils = {};
      this.visControls = {};
      this.styles = {};
      this.drawing = {};
      this.log = {};
    }

    return Alchemy;

  })();

  allTags = {};

  allCaptions = {};

  currentNodeTypes = {};

  currentRelationshipTypes = {};

  container = null;

  rootNodeId = null;

  this.alchemy = new Alchemy();

  alchemy.controlDash = {
    init: function() {
      if (alchemy.conf.showControlDash === true) {
        d3.select(".alchemy").append("div").attr("id", "control-dash-wrapper").attr("class", "col-md-4 initial");
        d3.select("#control-dash-wrapper").append("i").attr("id", "dash-toggle").attr("class", "fa fa-flask col-md-offset-12");
        d3.select("#control-dash-wrapper").append("div").attr("id", "control-dash").attr("class", "col-md-12");
        d3.select('#dash-toggle').on('click', alchemy.interactions.toggleControlDash);
        alchemy.controlDash.zoomCtrl();
        alchemy.controlDash.search();
        alchemy.controlDash.filters();
        alchemy.controlDash.stats();
        return alchemy.controlDash.modifyElements();
      }
    },
    search: function() {
      d3.select("#control-dash").append("div").attr("id", "search").html("<div class='input-group'>\n    <input class='form-control' placeholder='Search'>\n    <i class='input-group-addon search-icon'><span class='fa fa-search fa-1x'></span></i>\n</div> ");
      return alchemy.search.init();
    },
    zoomCtrl: function() {
      if (alchemy.conf.zoomControls) {
        d3.select("#control-dash-wrapper").append("div").attr("id", "zoom-controls").attr("class", "col-md-offset-12").html("<button id='zoom-reset'  class='btn btn-defualt btn-primary'><i class='fa fa-crosshairs fa-lg'></i></button> <button id='zoom-in'  class='btn btn-defualt btn-primary'><i class='fa fa-plus'></i></button> <button id='zoom-out' class='btn btn-default btn-primary'><i class='fa fa-minus'></i></button>");
        d3.select('#zoom-in').on("click", function() {
          return alchemy.interactions.clickZoom('in');
        });
        d3.select('#zoom-out').on("click", function() {
          return alchemy.interactions.clickZoom('out');
        });
        return d3.select('#zoom-reset').on("click", function() {
          return alchemy.interactions.clickZoom('reset');
        });
      }
    },
    filters: function() {
      d3.select("#control-dash").append("div").attr("id", "filters");
      return alchemy.filters.init();
    },
    stats: function() {
      d3.select("#control-dash").append("div").attr("id", "stats");
      return alchemy.stats.init();
    },
    modifyElements: function() {
      d3.select("#control-dash").append("div").attr("id", "update-elements");
      return alchemy.modifyElements.init();
    }
  };

  alchemy.drawing.drawedges = function(edge) {
    var edgeStyle;
    if (alchemy.conf.cluster) {
      edgeStyle = function(d) {
        var gid, id, index;
        if (d.source.root || d.target.root) {
          index = (d.source.root ? d.target.cluster : d.source.cluster);
        } else if (d.source.cluster === d.target.cluster) {
          index = d.source.cluster;
        } else if (d.source.cluster !== d.target.cluster) {
          id = "" + d.source.cluster + "-" + d.target.cluster;
          gid = "cluster-gradient-" + id;
          return "stroke: url(#" + gid + ")";
        }
        return "stroke: " + (alchemy.styles.getClusterColour(index));
      };
    } else if (alchemy.conf.edgeColour && !alchemy.conf.cluster) {
      edgeStyle = function(d) {
        return "stroke: " + alchemy.conf.edgeColour;
      };
    } else {
      edgeStyle = function(d) {
        return "";
      };
    }
    edge.enter().insert("line", 'g.node').attr("class", function(d) {
      return "edge " + d.caption + " active " + (d.shortest ? 'highlighted' : '');
    }).attr('source-target', function(d) {
      return d.source.id + '-' + d.target.id;
    }).on('click', alchemy.interactions.edgeClick);
    edge.exit().remove();
    return edge.attr('x1', function(d) {
      return d.source.x;
    }).attr('y1', function(d) {
      return d.source.y;
    }).attr('x2', function(d) {
      return d.target.x;
    }).attr('y2', function(d) {
      return d.target.y;
    }).attr('shape-rendering', 'optimizeSpeed').attr("style", function(d) {
      return edgeStyle(d);
    });
  };

  alchemy.drawing.drawnodes = function(node) {
    var nodeColours, nodeEnter, nonRootNodes, rootNodes;
    nodeEnter = node.enter().append("g").attr("class", function(d) {
      var nodeType, rootKey;
      rootKey = alchemy.conf.rootNodes;
      if (alchemy.conf.nodeTypes) {
        nodeType = d[Object.keys(alchemy.conf.nodeTypes)];
        if ((d[rootKey] != null) && d[rootKey]) {
          return "node root " + nodeType + " active";
        } else {
          return "node " + nodeType + " active";
        }
      } else {
        if ((d[rootKey] != null) && d[rootKey]) {
          return "node root active";
        } else {
          return "node active";
        }
      }
    }).attr('id', function(d) {
      return "node-" + d.id;
    }).on('mousedown', function(d) {
      return d.fixed = true;
    }).on('mouseover', alchemy.interactions.nodeMouseOver).on('mouseout', alchemy.interactions.nodeMouseOut).on('dblclick', alchemy.interactions.nodeDoubleClick).on('click', alchemy.interactions.nodeClick);
    if (!alchemy.conf.fixNodes) {
      nonRootNodes = nodeEnter.filter(function(d) {
        return d.root !== true;
      });
      nonRootNodes.call(alchemy.interactions.drag);
    }
    if (!alchemy.conf.fixRootNodes) {
      rootNodes = nodeEnter.filter(function(d) {
        return d.root === true;
      });
      rootNodes.call(alchemy.interactions.drag);
    }
    nodeColours = function(d) {
      var colour;
      if (alchemy.conf.cluster) {
        if ((isNaN(parseInt(d.cluster))) || (d.cluster > alchemy.conf.clusterColours.length)) {
          colour = alchemy.conf.clusterColours[alchemy.conf.clusterColours.length - 1];
        } else {
          colour = alchemy.conf.clusterColours[d.cluster];
        }
        return "fill: " + colour + "; stroke: " + colour + ";";
      } else {
        if (alchemy.conf.nodeColour) {
          return colour = alchemy.conf.nodeColour;
        } else {
          return '';
        }
      }
    };
    nodeEnter.append('circle').attr('class', function(d) {
      var nodeType, rootKey;
      rootKey = alchemy.conf.rootNodes;
      if (alchemy.conf.nodeTypes) {
        nodeType = d[Object.keys(alchemy.conf.nodeTypes)];
        if ((d[rootKey] != null) && d[rootKey]) {
          return "root " + nodeType + " active";
        } else {
          return "" + nodeType + " active";
        }
      } else {
        if ((d[rootKey] != null) && d[rootKey]) {
          return "root";
        } else {
          return "node";
        }
      }
    }).attr('id', function(d) {
      return "circle-" + d.id;
    }).attr('r', function(d) {
      return alchemy.utils.nodeSize(d);
    }).attr('shape-rendering', 'optimizeSpeed').attr('target-id', function(d) {
      return d.id;
    }).attr('style', function(d) {
      var radius;
      radius = d3.select(this).attr('r');
      return "fill:" + (nodeColours(d)) + "; stroke-width: " + (radius / 3);
    });
    return nodeEnter.append('svg:text').attr('id', function(d) {
      return "text-" + d.id;
    }).attr('dy', function(d) {
      if (d.root) {
        return alchemy.conf.rootNodeRadius / 2;
      } else {
        return alchemy.conf.nodeRadius * 2 - 5;
      }
    }).html(function(d) {
      return alchemy.utils.nodeText(d);
    });
  };

  alchemy.filters = {
    init: function() {
      var caption, e, edgeType, edgeTypes, nodeKey, nodeType, nodeTypes, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (alchemy.conf.showFilters) {
        alchemy.filters.show();
      }
      if (alchemy.conf.edgeFilters) {
        alchemy.filters.showEdgeFilters();
      }
      if (alchemy.conf.nodeFilters) {
        alchemy.filters.showNodeFilters();
      }
      if (alchemy.conf.nodeTypes) {
        nodeKey = Object.keys(alchemy.conf.nodeTypes);
        nodeTypes = '';
        _ref = alchemy.conf.nodeTypes[nodeKey];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          nodeType = _ref[_i];
          caption = nodeType.replace('_', ' ');
          nodeTypes += "<li class = 'list-group-item nodeType' role = 'menuitem' id='li-" + nodeType + "' name = " + nodeType + ">" + caption + "</li>";
        }
        $('#node-dropdown').append(nodeTypes);
      }
      if (alchemy.conf.edgeTypes) {
        _ref1 = d3.selectAll(".edge")[0];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          e = _ref1[_j];
          currentRelationshipTypes[[e].caption] = true;
        }
        edgeTypes = '';
        _ref2 = alchemy.conf.edgeTypes;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          edgeType = _ref2[_k];
          if (!edgeType) {
            continue;
          }
          caption = edgeType.replace('_', ' ');
          edgeTypes += "<li class = 'list-group-item edgeType' role = 'menuitem' id='li-" + edgeType + "' name = " + edgeType + ">" + caption + "</li>";
        }
        $('#rel-dropdown').append(edgeTypes);
      }
      if (alchemy.conf.captionsToggle) {
        alchemy.filters.captionsToggle();
      }
      if (alchemy.conf.edgesToggle) {
        alchemy.filters.edgesToggle();
      }
      if (alchemy.conf.nodesToggle) {
        alchemy.filters.nodesToggle();
      }
      return alchemy.filters.update();
    },
    show: function() {
      var filter_html;
      filter_html = "<div id = \"filter-header\" data-toggle=\"collapse\" data-target=\"#filters form\">\n    <h3>\n        Filters\n    </h3>\n    <span class = \"fa fa-2x fa-caret-right\"></span>\n</div>\n    <form class=\"form-inline collapse\">\n    </form>";
      d3.select('#control-dash #filters').html(filter_html);
      d3.selectAll('#filter-header').on('click', function() {
        if (d3.select('#filters>form').classed("in")) {
          return d3.select("#filter-header>span").attr("class", "fa fa-2x fa-caret-right");
        } else {
          return d3.select("#filter-header>span").attr("class", "fa fa-2x fa-caret-down");
        }
      });
      return $('#filters form').submit(false);
    },
    showEdgeFilters: function() {
      var rel_filter_html;
      rel_filter_html = "<div id=\"filter-relationships\">\n     <div id=\"filter-rel-header\" data-target = \"#rel-dropdown\" data-toggle=\"collapse\">\n         <h4>\n             Edge Types\n         </h4>\n         <span class=\"fa fa-lg fa-caret-right\"></span>\n     </div>\n     <ul id=\"rel-dropdown\" class=\"collapse list-group\" role=\"menu\">\n     </ul>\n</div>\n";
      $('#filters form').append(rel_filter_html);
      return d3.select("#filter-rel-header").on('click', function() {
        if (d3.select('#rel-dropdown').classed("in")) {
          return d3.select("#filter-rel-header>span").attr("class", "fa fa-lg fa-caret-right");
        } else {
          return d3.select("#filter-rel-header>span").attr("class", "fa fa-lg fa-caret-down");
        }
      });
    },
    showNodeFilters: function() {
      var node_filter_html;
      node_filter_html = " <div id=\"filter-nodes\">\n     <div id=\"filter-node-header\" data-target = \"#node-dropdown\" data-toggle=\"collapse\">\n         <h4>\n             Node Types\n         </h4>\n         <span class=\"fa fa-lg fa-caret-right\"></span>\n     </div>\n     <ul id=\"node-dropdown\" class=\"collapse list-group\" role=\"menu\">\n     </ul>\n</div>";
      $('#filters form').append(node_filter_html);
      return d3.select("#filter-node-header").on('click', function() {
        if (d3.select('#node-dropdown').classed("in")) {
          return d3.select("#filter-node-header>span").attr("class", "fa fa-lg fa-caret-right");
        } else {
          return d3.select("#filter-node-header>span").attr("class", "fa fa-lg fa-caret-down");
        }
      });
    },
    captionsToggle: function() {
      return d3.select("#filters form").append("li").attr({
        "id": "toggle-captions",
        "class": "list-group-item active-label toggle"
      }).html("Show Captions").on("click", function() {
        var isDisplayed;
        isDisplayed = d3.select("g text").attr("style");
        if (isDisplayed === "display: block" || null) {
          return d3.selectAll("g text").attr("style", "display: none");
        } else {
          return d3.selectAll("g text").attr("style", "display: block");
        }
      });
    },
    edgesToggle: function() {
      return d3.select("#filters form").append("li").attr({
        "id": "toggle-edges",
        "class": "list-group-item active-label toggle"
      }).html("Toggle Edges").on("click", function() {
        if (d3.selectAll(".edge.hidden")[0].length === 0) {
          return d3.selectAll(".edge").classed("hidden", true);
        } else {
          return d3.selectAll(".edge").classed("hidden", false);
        }
      });
    },
    nodesToggle: function() {
      return d3.select("#filters form").append("li").attr({
        "id": "toggle-nodes",
        "class": "list-group-item active-label toggle"
      }).html("Toggle Nodes").on("click", function() {
        var affectedNodes;
        affectedNodes = alchemy.conf.toggleRootNodes ? ".node,.edge" : ".node:not(.root),.edge";
        if (d3.selectAll(".node.hidden")[0].length === 0) {
          return d3.selectAll(affectedNodes).classed("hidden", true);
        } else {
          return d3.selectAll(affectedNodes).classed("hidden", false);
        }
      });
    },
    update: function() {
      var checked, element, graphElements, name, reFilter, state, tag, tags, vis, _i, _len, _ref;
      vis = alchemy.vis;
      graphElements = {
        "node": vis.selectAll("g"),
        "edge": vis.selectAll("line")
      };
      tags = d3.selectAll(".nodeType, .edgeType");
      reFilter = function(tag, highlight) {
        var checked, edge, edgeType, name, node, nodeId, sourceNode, state, targetNode, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        checked = !element.classed("disabled");
        name = element.attr("name");
        state = checked ? "active" : "inactive";
        if (highlight) {
          state += " highlight";
        }
        name = name.replace(/\s+/g, '_');
        ["node", "edge"].forEach(function(t) {
          return graphElements[t].filter("." + name).attr("class", "" + t + " " + name + " " + state);
        });
        state = state.replace(/\s+/g, '.');
        if (element.classed("nodeType")) {
          _ref = alchemy.node.filter("." + name + "." + state).data();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            nodeId = node.id;
            _ref1 = alchemy.edge.filter("[source-target*='" + nodeId + "']").data();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              edge = _ref1[_j];
              edgeType = edge.caption;
              if (!d3.select("#li-" + edgeType).empty() && d3.select("#li-" + edgeType).classed("disabled")) {
                alchemy.edge.filter("[source-target*='" + nodeId + "']").classed({
                  "inactive": true,
                  "active": false,
                  "highlight": false
                });
              } else {
                alchemy.edge.filter("[source-target*='" + nodeId + "']").classed({
                  "inactive": !checked,
                  "active": checked,
                  "highlight": highlight
                });
              }
            }
          }
        } else if (element.classed("edgeType")) {
          _ref2 = alchemy.edge.filter("." + name + "." + state).data();
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            edge = _ref2[_k];
            sourceNode = edge.source;
            targetNode = edge.target;
            if (d3.select("#node-" + targetNode.id).classed("inactive") || d3.select("#node-" + sourceNode.id).classed("inactive")) {
              alchemy.edge.filter("[source-target='" + sourceNode.id + "-" + targetNode.id + "']").classed({
                "inactive": true,
                "active": false,
                "highlight": false
              });
            } else {
              alchemy.edge.filter("[source-target='" + sourceNode.id + "-" + targetNode.id + "']");
            }
          }
        } else {
          console.log("ERROR tag was neither edgeType nor nodeType");
        }
        return alchemy.stats.update();
      };
      _ref = tags[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        element = d3.select(tag);
        name = element.attr("name");
        checked = !element.classed("disabled");
        state = checked ? "active" : "inactive";
        element.classed({
          'active-label': checked,
          'disabled': !checked
        });
        reFilter(element, false);
      }
      return tags.on("mouseenter", function() {
        var highlight;
        element = d3.select(this);
        highlight = true;
        return reFilter(element, highlight);
      }).on("mouseleave", function() {
        var highlight;
        element = d3.select(this);
        highlight = false;
        return reFilter(element, highlight);
      }).on("click", function() {
        var highlight;
        element = d3.select(this);
        checked = !element.classed("disabled");
        checked = !checked;
        element.classed({
          'active-label': checked,
          'disabled': !checked
        });
        highlight = false;
        return reFilter(element, highlight);
      });
    }
  };

  nodeDragStarted = function(d, i) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
  };

  nodeDragged = function(d, i) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d.px += d3.event.dx;
    d.py += d3.event.dy;
    d3.select(this).attr("transform", "translate(" + d.x + ", " + d.y + ")");
    if (!alchemy.conf.forceLocked) {
      alchemy.force.start();
    }
    alchemy.edge.attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    }).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  };

  nodeDragended = function(d, i) {
    d3.select(this).classed("dragging", false);
  };

  alchemy.interactions = {
    edgeClick: function(d) {
      var vis;
      vis = alchemy.vis;
      vis.selectAll('line').classed('highlight', false);
      d3.select(this).classed('highlight', true);
      d3.event.stopPropagation;
      if (typeof (alchemy.conf.edgeClick != null) === 'function') {
        return alchemy.conf.edgeClick();
      }
    },
    nodeMouseOver: function(n) {
      if (alchemy.conf.nodeMouseOver != null) {
        if (typeof alchemy.conf.nodeMouseOver === 'function') {
          return alchemy.conf.nodeMouseOver(n);
        } else if (typeof alchemy.conf.nodeMouseOver === ('number' || 'string')) {
          return n[alchemy.conf.nodeMouseOver];
        }
      } else {
        return null;
      }
    },
    nodeMouseOut: function(n) {
      if ((alchemy.conf.nodeMouseOut != null) && typeof alchemy.conf.nodeMouseOut === 'function') {
        return alchemy.conf.nodeMouseOut(n);
      } else {
        return null;
      }
    },
    nodeDoubleClick: function(c) {
      var e, links, _results;
      if (!alchemy.conf.extraDataSource || c.expanded || alchemy.conf.unexpandable.indexOf(c.type === !-1)) {
        return;
      }
      $('<div id="loading-spi"></div>nner').show();
      console.log("loading more data for " + c.id);
      c.expanded = true;
      d3.json(alchemy.conf.extraDataSource + c.id, loadMoreNodes);
      links = findAllEdges(c);
      _results = [];
      for (e in edges) {
        _results.push(edges[e].distance *= 2);
      }
      return _results;
    },
    nodeClick: function(c) {
      d3.event.stopPropagation();
      alchemy.vis.selectAll('line').classed('selected', function(d) {
        return c.id === d.source.id || c.id === d.target.id;
      });
      alchemy.vis.selectAll('.node').classed('selected', function(d) {
        return c.id === d.id;
      }).classed('selected', function(d) {
        return d.id === c.id || alchemy.edges.some(function(e) {
          return ((e.source.id === c.id && e.target.id === d.id) || (e.source.id === d.id && e.target.id === c.id)) && d3.select(".edge[source-target*='" + d.id + "']").classed("active");
        });
      });
      if (typeof alchemy.conf.nodeClick === 'function') {
        alchemy.conf.nodeClick(c);
      }
    },
    drag: d3.behavior.drag().origin(Object).on("dragstart", nodeDragStarted).on("drag", nodeDragged).on("dragend", nodeDragended),
    zoom: function(extent) {
      if (this._zoomBehavior == null) {
        this._zoomBehavior = d3.behavior.zoom();
      }
      return this._zoomBehavior.scaleExtent(extent).on("zoom", function() {
        return alchemy.vis.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
      });
    },
    clickZoom: function(direction) {
      var endTransform, startTransform;
      startTransform = alchemy.vis.attr("transform").match(/(-*\d+\.*\d*)/g).map(function(a) {
        return parseFloat(a);
      });
      endTransform = startTransform;
      alchemy.vis.attr("transform", function() {
        if (direction === "in") {
          return "translate(" + endTransform.slice(0, 2) + ") scale(" + (endTransform[2] = endTransform[2] + 0.2) + ")";
        } else if (direction === "out") {
          return "translate(" + endTransform.slice(0, 2) + ") scale(" + (endTransform[2] = endTransform[2] - 0.2) + ")";
        } else if (direction === "reset") {
          return "translate(0,0) scale(1)";
        } else {
          return console.log('error');
        }
      });
      if (this._zoomBehavior == null) {
        this._zoomBehavior = d3.behavior.zoom();
      }
      return this._zoomBehavior.scale(endTransform[2]).translate(endTransform.slice(0, 2));
    },
    toggleControlDash: function() {
      var offCanvas;
      offCanvas = d3.select("#control-dash-wrapper").classed("off-canvas") || d3.select("#control-dash-wrapper").classed("initial");
      return d3.select("#control-dash-wrapper").classed({
        "off-canvas": !offCanvas,
        "initial": false,
        "on-canvas": offCanvas
      });
    }
  };

  alchemy.layout = {
    gravity: function(k) {
      return 8 * k;
    },
    charge: function(k) {
      if (alchemy.conf.cluster) {
        return -500;
      } else {
        return -10 / k;
      }
    },
    linkStrength: function(edge) {
      if (alchemy.conf.cluster) {
        if (edge.source.cluster === edge.target.cluster) {
          return 1;
        } else {
          return 0.1;
        }
      } else {
        if (edge.source.root || edge.target.root) {
          return 0.9;
        } else {
          return 1;
        }
      }
    },
    friction: function() {
      if (alchemy.conf.cluster) {
        return 0.7;
      } else {
        return 0.9;
      }
    },
    collide: function(node) {
      var nx1, nx2, ny1, ny2, r;
      r = 2.2 * alchemy.utils.nodeSize(node) + alchemy.conf.nodeOverlap;
      nx1 = node.x - r;
      nx2 = node.x + r;
      ny1 = node.y - r;
      ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        var l, x, y;
        if (quad.point && (quad.point !== node)) {
          x = node.x - Math.abs(quad.point.x);
          y = node.y - quad.point.y;
          l = Math.sqrt(x * x + y * y);
          r = r;
          if (l < r) {
            l = (l - r) / l * alchemy.conf.alpha;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    },
    tick: function() {
      var node, q, _i, _len, _ref;
      if (alchemy.conf.collisionDetection) {
        q = d3.geom.quadtree(alchemy.nodes);
        _ref = alchemy.nodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          q.visit(alchemy.layout.collide(node));
        }
      }
      alchemy.edge.attr("x1", function(d) {
        return d.source.x;
      }).attr("y1", function(d) {
        return d.source.y;
      }).attr("x2", function(d) {
        return d.target.x;
      }).attr("y2", function(d) {
        return d.target.y;
      });
      return alchemy.node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    },
    positionRootNodes: function() {
      var i, n, number, rootNodes, _i, _j, _len, _len1, _ref, _results;
      container = {
        width: alchemy.conf.graphWidth(),
        height: alchemy.conf.graphHeight()
      };
      rootNodes = Array();
      _ref = alchemy.nodes;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        n = _ref[i];
        if (!n[alchemy.conf.rootNodes]) {
          continue;
        } else {
          n.i = i;
          rootNodes.push(n);
        }
      }
      if (rootNodes.length === 1) {
        n = rootNodes[0];
        alchemy.nodes[n.i].x = container.width / 2;
        alchemy.nodes[n.i].y = container.height / 2;
        alchemy.nodes[n.i].px = container.width / 2;
        alchemy.nodes[n.i].py = container.height / 2;
        alchemy.nodes[n.i].fixed = true;
      } else {
        number = 0;
        _results = [];
        for (_j = 0, _len1 = rootNodes.length; _j < _len1; _j++) {
          n = rootNodes[_j];
          number++;
          alchemy.nodes[n.i].x = container.width / Math.sqrt(rootNodes.length * number);
          alchemy.nodes[n.i].y = container.height / 2;
          _results.push(alchemy.nodes[n.i].fixed = true);
        }
        return _results;
      }
    },
    chargeDistance: function() {
      var distance;
      distance = 500;
      return distance;
    },
    linkDistancefn: function(edge, k) {
      if (alchemy.conf.cluster) {
        if (edge.source.root || edge.target.root) {
          300;
        }
        if (edge.source.cluster === edge.target.cluster) {
          return 10;
        } else {
          return 600;
        }
      } else {
        return 10 / (k * 5);
      }
    }
  };

  alchemy.modifyElements = {
    init: function() {
      if (alchemy.conf.showEditor) {
        return alchemy.modifyElements.show();
      }
    },
    show: function() {
      var modifyElements_html;
      modifyElements_html = "<div id = \"editor-header\" data-toggle=\"collapse\" data-target=\"#update-elements #element-options\">\n     <h3>\n        Editor\n    </h3>\n    <span class = \"fa fa-2x fa-caret-right\"></span>\n</div>";
      d3.select("#update-elements").html(modifyElements_html);
      if (alchemy.conf.removeElement) {
        return alchemy.modifyElements.showRemove();
      }
    },
    showRemove: function() {
      var removeElement_html;
      removeElement_html = "<div id=\"element-options\" class=\"collapse\">\n    <ul class = \"list-group\" id=\"remove\">Remove Selected</ul>\n</div>";
      d3.selectAll('#editor-header').append("div").html(removeElement_html).on('click', function() {
        if (d3.select('#element-options').classed("in")) {
          return d3.select("#editor-header>span").attr("class", "fa fa-2x fa-caret-right");
        } else {
          return d3.select("#editor-header>span").attr("class", "fa fa-2x fa-caret-down");
        }
      });
      return d3.select("#remove").on("click", function() {
        return alchemy.modifyElements.remove();
      });
    },
    remove: function() {
      var selectedEdges, selectedNodes;
      selectedNodes = d3.selectAll(".selected.node").data();
      selectedEdges = d3.selectAll(".selected.edge").data();
      alchemy.edges = _.difference(alchemy.edges, selectedEdges);
      alchemy.nodes = _.difference(alchemy.nodes, selectedNodes);
      alchemy.force.friction(1);
      alchemy.updateGraph(false);
      alchemy.force.resume();
      alchemy.force.friction(0.9);
      return d3.selectAll(".selected").classed("selected", false);
    }
  };

  alchemy.search = {
    init: function() {
      var searchBox;
      searchBox = d3.select("#search input");
      return searchBox.on("keyup", function() {
        var input;
        input = searchBox[0][0].value.toLowerCase();
        d3.selectAll(".node").classed("inactive", false);
        d3.selectAll("text").attr("style", function() {
          if (input !== "") {
            return "display: inline;";
          }
        });
        return d3.selectAll(".node").classed("inactive", function(node) {
          var DOMnode, hidden;
          DOMnode = d3.select(this);
          hidden = DOMnode.text().toLowerCase().indexOf(input) < 0;
          if (hidden) {
            d3.selectAll("[source-target*='" + node.id + "']").classed("inactive", hidden);
          } else {
            d3.selectAll("[source-target*='" + node.id + "']").classed("inactive", function(edge) {
              var nodeIDs, sourceHidden, targetHidden;
              nodeIDs = [edge.source.id, edge.target.id];
              sourceHidden = d3.select("#node-" + nodeIDs[0]).classed("inactive");
              targetHidden = d3.select("#node-" + nodeIDs[1]).classed("inactive");
              return targetHidden || sourceHidden;
            });
          }
          return hidden;
        });
      });
    }
  };

  alchemy.startGraph = function(data) {
    var k, no_results, nodesMap;
    if (d3.select(alchemy.conf.divSelector).empty()) {
      console.warn("create an element with the alchemy.conf.divSelector.\ne.g. the defaul #alchemy");
    }
    if (!data) {
      no_results = "<div class=\"modal fade\" id=\"no-results\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                <h4 class=\"modal-title\">Sorry!</h4>\n            </div>\n            <div class=\"modal-body\">\n                <p>" + alchemy.conf.warningMessage + "</p>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>";
      $('body').append(no_results);
      $('#no-results').modal('show');
      $('#loading-spinner').hide();
      return;
    }
    alchemy.nodes = data.nodes;
    alchemy.edges = data.edges;
    nodesMap = d3.map();
    alchemy.nodes.forEach(function(n) {
      return nodesMap.set(n.id, n);
    });
    alchemy.edges.forEach(function(e) {
      e.source = nodesMap.get(e.source);
      return e.target = nodesMap.get(e.target);
    });
    alchemy.vis = d3.select(alchemy.conf.divSelector).attr("style", "width:" + (alchemy.conf.graphWidth()) + "px; height:" + (alchemy.conf.graphHeight()) + "px").append("svg").attr("xmlns", "http://www.w3.org/2000/svg").attr("pointer-events", "all").on("dblclick.zoom", null).on('click', alchemy.utils.deselectAll).call(alchemy.interactions.zoom(alchemy.conf.scaleExtent)).append('g').attr("transform", "translate(" + alchemy.conf.initialTranslate + ") scale(" + alchemy.conf.initialScale + ")");
    k = Math.sqrt(alchemy.nodes.length / (alchemy.conf.graphWidth() * alchemy.conf.graphHeight()));
    alchemy.force = d3.layout.force().charge(alchemy.layout.charge(k)).linkDistance(function(d) {
      return alchemy.conf.linkDistance(d, k);
    }).theta(1.0).gravity(alchemy.layout.gravity(k)).linkStrength(alchemy.layout.linkStrength).friction(alchemy.layout.friction()).chargeDistance(alchemy.layout.chargeDistance()).size([alchemy.conf.graphWidth(), alchemy.conf.graphHeight()]).nodes(alchemy.nodes).links(alchemy.edges).on("tick", alchemy.layout.tick);
    alchemy.updateGraph();
    alchemy.controlDash.init();
    if (!alchemy.conf.forceLocked) {
      alchemy.force.on("tick", alchemy.layout.tick).start();
    }
    if (alchemy.conf.afterLoad != null) {
      if (typeof alchemy.conf.afterLoad === 'function') {
        alchemy.conf.afterLoad();
      } else if (typeof alchemy.conf.afterLoad === 'string') {
        alchemy[alchemy.conf.afterLoad] = true;
      }
    }
    if (alchemy.conf.initialScale !== alchemy.defaults.initialScale) {
      alchemy.interactions.zoom.scale(alchemy.conf.initialScale);
      return;
    }
    if (alchemy.conf.initialTranslate !== alchemy.defaults.initialTranslate) {
      alchemy.interactions.zoom.translate(alchemy.conf.initialTranslate);
    }
  };

  alchemy.stats = {
    init: function() {
      if (alchemy.conf.showStats === true) {
        alchemy.stats.show();
        return alchemy.stats.update();
      }
    },
    show: function() {
      var stats_html;
      stats_html = "<div id = \"stats-header\" data-toggle=\"collapse\" data-target=\"#stats #all-stats\">\n<h3>\n    Statistics\n</h3>\n<span class = \"fa fa-caret-right fa-2x\"></span>\n</div>\n<div id=\"all-stats\" class=\"collapse\">\n    <ul class = \"list-group\" id=\"node-stats\"></ul>\n    <ul class = \"list-group\" id=\"rel-stats\"></ul>  ";
      d3.select('#stats').html(stats_html);
      return d3.selectAll('#stats-header').on('click', function() {
        if (d3.select('#all-stats').classed("in")) {
          return d3.select("#stats-header>span").attr("class", "fa fa-2x fa-caret-right");
        } else {
          return d3.select("#stats-header>span").attr("class", "fa fa-2x fa-caret-down");
        }
      });
    },
    nodeStats: function() {
      var activeNodes, caption, inactiveNodes, nodeGraph, nodeKey, nodeNum, nodeStats, nodeType, nodeTypes, _i, _len, _ref;
      nodeStats = '';
      nodeNum = d3.selectAll(".node")[0].length;
      activeNodes = d3.selectAll(".node.active")[0].length;
      inactiveNodes = d3.selectAll(".node.inactive")[0].length;
      nodeStats += "<li class = 'list-group-item gen_node_stat'>Number of nodes: <span class='badge'>" + nodeNum + "</span></li>";
      nodeStats += "<li class = 'list-group-item gen_node_stat'>Number of active nodes: <span class='badge'>" + activeNodes + "</span></li>";
      nodeStats += "<li class = 'list-group-item gen_node_stat'>Number of inactive nodes: <span class='badge'>" + inactiveNodes + "</span></li>";
      if (alchemy.conf.nodeTypes) {
        nodeKey = Object.keys(alchemy.conf.nodeTypes);
        nodeTypes = '';
        _ref = alchemy.conf.nodeTypes[nodeKey];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          nodeType = _ref[_i];
          caption = nodeType.replace('_', ' ');
          nodeNum = d3.selectAll("g.node." + nodeType)[0].length;
          nodeTypes += "<li class = 'list-group-item nodeType' id='li-" + nodeType + "' name = " + caption + ">Number of nodes of type " + caption + ": <span class='badge'>" + nodeNum + "</span></li>";
        }
        nodeStats += nodeTypes;
      }
      nodeGraph = "<li id='node-stats-graph' class='list-group-item'></li>";
      nodeStats += nodeGraph;
      return $('#node-stats').html(nodeStats);
    },
    edgeStats: function() {
      var activeEdges, caption, e, edgeData, edgeGraph, edgeNum, edgeType, inactiveEdges, _i, _j, _len, _len1, _ref, _ref1;
      edgeData = null;
      edgeNum = d3.selectAll(".edge")[0].length;
      activeEdges = d3.selectAll(".edge.active")[0].length;
      inactiveEdges = d3.selectAll(".edge.inactive")[0].length;
      edgeGraph = "<li class = 'list-group-item gen_edge_stat'>Number of relationships: <span class='badge'>" + edgeNum + "</span></li> <li class = 'list-group-item gen_edge_stat'>Number of active relationships: <span class='badge'>" + activeEdges + "</span></li> <li class = 'list-group-item gen_edge_stat'>Number of inactive relationships: <span class='badge'>" + inactiveEdges + "</span></li> <li id='edge-stats-graph' class='list-group-item'></li>";
      if (alchemy.conf.edgeTypes) {
        edgeData = [];
        _ref = d3.selectAll(".edge")[0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          currentRelationshipTypes[[e].caption] = true;
        }
        _ref1 = alchemy.conf.edgeTypes;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          edgeType = _ref1[_j];
          if (!edgeType) {
            continue;
          }
          caption = edgeType.replace('_', ' ');
          edgeNum = d3.selectAll(".edge." + edgeType)[0].length;
          edgeData.push(["" + caption, edgeNum]);
        }
      }
      $('#rel-stats').html(edgeGraph);
      alchemy.stats.insertSVG("edge", edgeData);
      return edgeData;
    },
    nodeStats: function() {
      var activeNodes, inactiveNodes, nodeData, nodeGraph, nodeKey, nodeNum, nodeType, totalNodes, _i, _len, _ref;
      nodeData = null;
      totalNodes = d3.selectAll(".node")[0].length;
      activeNodes = d3.selectAll(".node.active")[0].length;
      inactiveNodes = d3.selectAll(".node.inactive")[0].length;
      if (alchemy.conf.nodeTypes) {
        nodeData = [];
        nodeKey = Object.keys(alchemy.conf.nodeTypes);
        _ref = alchemy.conf.nodeTypes[nodeKey];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          nodeType = _ref[_i];
          nodeNum = d3.selectAll("g.node." + nodeType)[0].length;
          nodeData.push(["" + nodeType, nodeNum]);
        }
      }
      nodeGraph = "<li class = 'list-group-item gen_node_stat'>Number of nodes: <span class='badge'>" + totalNodes + "</span></li> <li class = 'list-group-item gen_node_stat'>Number of active nodes: <span class='badge'>" + activeNodes + "</span></li> <li class = 'list-group-item gen_node_stat'>Number of inactive nodes: <span class='badge'>" + inactiveNodes + "</span></li> <li id='node-stats-graph' class='list-group-item'></li>";
      $('#node-stats').html(nodeGraph);
      alchemy.stats.insertSVG("node", nodeData);
      return nodeData;
    },
    insertSVG: function(element, data) {
      var arc, arcs, color, height, pie, radius, svg, width;
      if (data === null) {
        return d3.select("#" + element + "-stats-graph").html("<br><h4 class='no-data'>There are no " + element + "Types listed in your conf.</h4>");
      } else {
        width = alchemy.conf.graphWidth() * .25;
        height = 250;
        radius = width / 4;
        color = d3.scale.category20();
        arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(radius / 2);
        pie = d3.layout.pie().sort(null).value(function(d) {
          return d[1];
        });
        svg = d3.select("#" + element + "-stats-graph").append("svg").append("g").style({
          "width": width,
          "height": height
        }).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        arcs = svg.selectAll(".arc").data(pie(data)).enter().append("g").classed("arc", true).on("mouseover", function(d, i) {
          return d3.select("#" + data[i][0] + "-stat").classed("hidden", false);
        }).on("mouseout", function(d, i) {
          return d3.select("#" + data[i][0] + "-stat").classed("hidden", true);
        });
        arcs.append("path").attr("d", arc).attr("stroke", function(d, i) {
          return color(i);
        }).attr("stroke-width", 2).attr("fill-opacity", "0.3");
        return arcs.append("text").attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        }).attr("id", function(d, i) {
          return "" + data[i][0] + "-stat";
        }).attr("dy", ".35em").classed("hidden", true).text(function(d, i) {
          return data[i][0];
        });
      }
    },
    update: function() {
      if (alchemy.conf.nodeStats === true) {
        alchemy.stats.nodeStats();
      }
      if (alchemy.conf.edgeStats === true) {
        return alchemy.stats.edgeStats();
      }
    }
  };

  alchemy.updateGraph = function(start) {
    var initialComputationDone;
    if (start == null) {
      start = true;
    }
    alchemy.layout.positionRootNodes();
    alchemy.edge = alchemy.vis.selectAll("line").data(alchemy.edges);
    alchemy.node = alchemy.vis.selectAll("g.node").data(alchemy.nodes, function(d) {
      return d.id;
    });
    if (start) {
      this.force.start();
    }
    if (!initialComputationDone) {
      while (this.force.alpha() > 0.005) {
        alchemy.force.tick();
      }
      initialComputationDone = true;
      console.log(Date() + ' completed initial computation');
      if (alchemy.conf.locked) {
        alchemy.force.stop();
      }
    }
    alchemy.styles.edgeGradient(alchemy.edges);
    alchemy.drawing.drawedges(alchemy.edge);
    alchemy.drawing.drawnodes(alchemy.node);
    alchemy.vis.selectAll('g.node').attr('transform', function(d) {
      return "translate(" + d.x + ", " + d.y + ")";
    });
    alchemy.vis.selectAll('.node text').html((function(_this) {
      return function(d) {
        return _this.utils.nodeText(d);
      };
    })(this));
    return alchemy.node.exit().remove();
  };

  alchemy.defaults = {
    graphWidth: function() {
      return d3.select(this.divSelector).node().parentElement.clientWidth;
    },
    graphHeight: function() {
      if (d3.select(this.divSelector).node().parentElement.nodeName === "BODY") {
        return window.innerHeight;
      } else {
        return d3.select(this.divSelector).node().parentElement.clientHeight;
      }
    },
    alpha: .5,
    cluster: false,
    clusterColours: d3.shuffle(["#DD79FF", "#FFFC00", "#00FF30", "#5168FF", "#00C0FF", "#FF004B", "#00CDCD", "#f83f00", "#f800df", "#ff8d8f", "#ffcd00", "#184fff", "#ff7e00"]),
    collisionDetection: true,
    fixNodes: false,
    fixRootNodes: false,
    forceLocked: true,
    linkDistance: alchemy.layout.linkDistancefn,
    nodePositions: null,
    showEditor: false,
    captionToggle: false,
    edgesToggle: false,
    nodesToggle: false,
    toggleRootNodes: true,
    removeElement: false,
    addNodes: false,
    addEdges: false,
    showControlDash: false,
    showStats: false,
    nodeStats: false,
    edgeStats: false,
    showFilters: false,
    edgeFilters: false,
    nodeFilters: false,
    zoomControls: false,
    nodeCaption: 'caption',
    nodeColour: null,
    nodeMouseOver: 'caption',
    nodeOverlap: 25,
    nodeRadius: 10,
    nodeTypes: null,
    rootNodes: 'root',
    rootNodeRadius: 15,
    edgeCaption: 'caption',
    edgeColour: null,
    edgeTypes: null,
    afterLoad: 'afterLoad',
    divSelector: '#alchemy',
    dataSource: null,
    initialScale: 1,
    initialTranslate: [0, 0],
    scaleExtent: [0.5, 2.4],
    warningMessage: "There be no data!  What's going on?"
  };

  alchemy.begin = function(userConf) {
    alchemy.conf = _.assign({}, alchemy.defaults, userConf);
    if (typeof alchemy.conf.dataSource === 'string') {
      return d3.json(alchemy.conf.dataSource, alchemy.startGraph);
    } else if (typeof alchemy.conf.dataSource === 'object') {
      return alchemy.startGraph(alchemy.conf.dataSource);
    }
  };

  alchemy.styles = {
    getClusterColour: function(index) {
      if (alchemy.conf.clusterColours[index] != null) {
        return alchemy.conf.clusterColours[index];
      } else {
        return '#EBECE4';
      }
    },
    edgeGradient: function(edges) {
      var Q, defs, edge, endColour, gradient, gradient_id, id, ids, startColour, _i, _len, _results;
      defs = d3.select("" + alchemy.conf.divSelector + " svg").append("svg:defs");
      Q = {};
      for (_i = 0, _len = edges.length; _i < _len; _i++) {
        edge = edges[_i];
        if (edge.source.root || edge.target.root) {
          continue;
        }
        if (edge.source.cluster === edge.target.cluster) {
          continue;
        }
        if (edge.target.cluster !== edge.source.cluster) {
          id = edge.source.cluster + "-" + edge.target.cluster;
          if (id in Q) {
            continue;
          } else if (!(id in Q)) {
            startColour = this.getClusterColour(edge.target.cluster);
            endColour = this.getClusterColour(edge.source.cluster);
            Q[id] = {
              'startColour': startColour,
              'endColour': endColour
            };
          }
        }
      }
      _results = [];
      for (ids in Q) {
        gradient_id = "cluster-gradient-" + ids;
        gradient = defs.append("svg:linearGradient").attr("id", gradient_id);
        gradient.append("svg:stop").attr("offset", "0%").attr("stop-color", Q[ids]['startColour']);
        _results.push(gradient.append("svg:stop").attr("offset", "100%").attr("stop-color", Q[ids]['endColour']));
      }
      return _results;
    }
  };

  alchemy.utils = {
    deselectAll: function() {
      var _ref;
      if ((_ref = d3.event) != null ? _ref.defaultPrevented : void 0) {
        return;
      }
      alchemy.vis.selectAll('.node, line').classed('selected highlight', false);
      d3.select('.alchemy svg').classed({
        'highlight-active': false
      });
      alchemy.vis.selectAll('line.edge').classed('highlighted connected unconnected', false);
      alchemy.vis.selectAll('g.node,circle,text').classed('selected unselected neighbor unconnected connecting', false);
      if (alchemy.conf.deselectAll && typeof (alchemy.conf.deselectAll === 'function')) {
        return alchemy.conf.deselectAll();
      }
    },
    centreView: function(id) {
      var delta, level, node, nodeBounds, params, svg, svgBounds, x, y;
      svg = $('#graph').get(0);
      node = $(id).get(0);
      svgBounds = svg.getBoundingClientRect();
      nodeBounds = node.getBoundingClientRect();
      delta = [svgBounds.width / 2 + svgBounds.left - nodeBounds.left - nodeBounds.width / 2, svgBounds.height / 2 + svgBounds.top - nodeBounds.top - nodeBounds.height / 2];
      params = getCurrentViewParams();
      x = parseFloat(params[0]) + delta[0];
      y = parseFloat(params[1]) + delta[1];
      level = parseFloat(params[2]);
      alchemy.vis.transition().attr('transform', "translate(" + x + ", " + y + ") scale(" + level + ")");
      return zoom.translate([x, y]).scale(level);
    },
    nodeText: function(d) {
      var caption;
      if (alchemy.conf.nodeCaption && typeof alchemy.conf.nodeCaption === 'string') {
        if (d[alchemy.conf.nodeCaption] != null) {
          return d[alchemy.conf.nodeCaption];
        } else {
          return '';
        }
      } else if (alchemy.conf.nodeCaption && typeof alchemy.conf.nodeCaption === 'function') {
        caption = alchemy.conf.nodeCaption(d);
        if (caption === void 0 || String(caption) === 'undefined') {
          alchemy.log["caption"] = "At least one caption returned undefined";
          alchemy.conf.caption = false;
        }
        return caption;
      }
    },
    nodeSize: function(d, i) {
      var key, rootKey;
      if (alchemy.conf.nodeRadius != null) {
        rootKey = alchemy.conf.rootNodes;
        if (typeof alchemy.conf.nodeRadius === 'function') {
          if ((d[rootKey] != null) && d[rootKey]) {
            return alchemy.conf.rootNodeRadius;
          } else {
            return alchemy.conf.nodeRadius(d);
          }
        } else if (typeof alchemy.conf.nodeRadius === 'string') {
          key = alchemy.conf.nodeRadius;
          if ((d[rootKey] != null) && d[rootKey]) {
            return alchemy.conf.rootNodeRadius;
          } else {
            return d.degree;
          }
        } else if (typeof alchemy.conf.nodeRadius === 'number') {
          if ((d[rootKey] != null) && d[rootKey]) {
            return alchemy.conf.rootNodeRadius;
          } else {
            return alchemy.conf.nodeRadius;
          }
        }
      } else {
        return 20;
      }
    }
  };

  alchemy.welcomeConf = {
    forceLocked: false,
    captionToggle: true,
    edgesToggle: true,
    nodesToggle: true,
    toggleRootNodes: true,
    showControlDash: true,
    showStats: true,
    nodeStats: true,
    edgeStats: true,
    showFilters: true,
    edgeFilters: true,
    nodeFilters: true,
    zoomControls: true,
    nodeTypes: null
  };

}).call(this);

//# sourceMappingURL=alchemy.js.map
;
var config = {
  dataSource: 'data/team.json',                      

  cluster: true,

  nodeTypes: {"node_type":
              ["family", "coworker", 
               "classmate", "friend", 
               "other"]},
  nodeCaption: "firstName",
  rootNodeRadius: 30,

  showControlDash: false,

  showStats: false,
  nodeStats: true,

  showFilters: true,
  nodeFilters: true,

  captionToggle: true,
  edgesToggle: true,
  nodesToggle: true,
  toggleRootNodes: false,

  zoomControls: true
};

// alchemy.begin(config)
;
function Neo(urlSource) {
	function txUrl() {
		var url = (urlSource() || "http://localhost:7474").replace(/\/db\/data.*/,"");
		return url + "/db/data/transaction/commit";
	}
	var me = {
		executeQuery: function(query, params, cb) {
			$.ajax(txUrl(), {
				type: "POST",
				data: JSON.stringify({
					statements: [{
						statement: query,
						parameters: params || {},
						resultDataContents: ["row", "graph"]
					}]
				}),
				contentType: "application/json",
				error: function(err) {
					cb(err);
				},
				success: function(res) {
					if (res.errors.length > 0) {
						cb(res.errors);
					} else {
						var cols = res.results[0].columns;
						var rows = res.results[0].data.map(function(row) {
							var r = {};
							cols.forEach(function(col, index) {
								r[col] = row.row[index];
							});
							return r;
						});
						var nodes = [];
						var rels = [];
						var labels = [];
						res.results[0].data.forEach(function(row) {
							row.graph.nodes.forEach(function(n) {
							   var found = nodes.filter(function (m) { return m.id == n.id; }).length > 0;
							   if (!found) {
								  var node = n.properties||{}; node.id=n.id;node.type=n.labels[0];
								  nodes.push(node);
								  if (labels.indexOf(node.type) == -1) labels.push(node.type);
							   }
							});
							rels = rels.concat(row.graph.relationships.map(function(r) { return { source:r.startNode, target:r.endNode, caption:r.type} }));
						});
						cb(null,{table:rows,graph:{nodes:nodes, edges:rels},labels:labels});
					}
				}
			});
		}
	};
	return me;
}
;
function Cy2Neo(config, graphId, sourceId, execId, urlSource) {
  //   function createEditor() {
		// return CodeMirror.fromTextArea(document.getElementById(sourceId), {
		//   parserfile: ["codemirror-cypher.js"],
		//   path: "scripts",
		//   stylesheet: "styles/codemirror-neo.css",
		//   autoMatchParens: true,
		//   lineNumbers: true,
		//   enterMode: "keep",
		//   value: "some value"
		// });
    // }
	function initAlchemyConfig() {
		config.divSelector="#"+graphId;
		config.dataSource={nodes:[],edges:[]};
		config.forceLocked = false;
		config.alpha = 0.8;
		config.edgeTypes = "caption";
		alchemy.begin(config)
		return config;
	}
	config = initAlchemyConfig();
	var neo = new Neo(urlSource);
    // var editor = createEditor();
	// $("#"+execId).click(function(evt) {
	function displayGraph(){
		// alert('Display graph');
		try {
			// evt.preventDefault();
			// var query = editor.getValue();
			var query = " MATCH (p) RETURN (p)";
			query = "MATCH n RETURN n";
			console.log("Executing Query",query);
			neo.executeQuery(query,{},function(err,res) {
				res = res || {}
				var graph=res.graph;
				var labels = res.labels;
				config.nodeTypes = {type: labels};
				if (err) {
					alchemy.conf.warningMessage=JSON.stringify(err);
					alchemy.startGraph(null)
				} else {
					alchemy.startGraph(graph);
				}
			});
		} catch(e) {
			console.log(e);
		}
		return false;
	}
	displayGraph();
}
;
$(document).ready(function() {
    //todo dynamic configuration
    config.nodeTypes = { type : ["User","Person"]}
    config.nodeCaption=function(n) {return n.name || n.title;};
    config.edgeCaption={"caption":["KNOWS"]};
    config.nodeMouseOver = function(n) {return n.id + "<br/>"+n.name || n.title;};


    config.neo4jUrl="http://localhost:7474/db/data";
    new Cy2Neo(config,"graph","cypher","execute", function() { return $("#neo4jUrl").val(); });
  });
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//










;
