/*! grunt-grunticon Stylesheet Loader - v2.1.6 | https://github.com/filamentgroup/grunticon | (c) 2015 Scott Jehl, Filament Group, Inc. | MIT license. */

!function(){function e(e,n,t){"use strict";var o=window.document.createElement("link"),r=n||window.document.getElementsByTagName("script")[0],a=window.document.styleSheets;return o.rel="stylesheet",o.href=e,o.media="only x",r.parentNode.insertBefore(o,r),o.onloadcssdefined=function(e){for(var n,t=0;t<a.length;t++)a[t].href&&a[t].href===o.href&&(n=!0);n?e():setTimeout(function(){o.onloadcssdefined(e)})},o.onloadcssdefined(function(){o.media=t||"all"}),o}function n(e,n){e.onload=function(){e.onload=null,n&&n.call(e)},"isApplicationInstalled"in navigator&&"onloadcssdefined"in e&&e.onloadcssdefined(n)}!function(t){var o=function(r,a){"use strict";if(r&&3===r.length){var i=t.navigator,c=t.document,s=t.Image,d=!(!c.createElementNS||!c.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!c.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||t.opera&&i.userAgent.indexOf("Chrome")===-1||i.userAgent.indexOf("Series40")!==-1),l=new s;l.onerror=function(){o.method="png",o.href=r[2],e(r[2])},l.onload=function(){var t=1===l.width&&1===l.height,i=r[t&&d?0:t?1:2];t&&d?o.method="svg":t?o.method="datapng":o.method="png",o.href=i,n(e(i),a)},l.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",c.documentElement.className+=" grunticon"}};o.loadCSS=e,o.onloadCSS=n,t.grunticon=o}(this),function(e,n){"use strict";var t,o=n.document,r="grunticon:",a=function(e){if(o.attachEvent?"complete"===o.readyState:"loading"!==o.readyState)e();else{var n=!1;o.addEventListener("readystatechange",function(){n||(n=!0,e())},!1)}},i=function(e){return n.document.querySelector('link[href$="'+e+'"]')},c=function(e,n){if(t&&!n)return t;t={};var o,a,i,c,s,d;if(o=e.sheet,!o)return t;a=o.cssRules?o.cssRules:o.rules;for(var l=0;l<a.length;l++)i=a[l].cssText,c=r+a[l].selectorText,s=i.split(");")[0].match(/US\-ASCII\,([^"']+)/),s&&s[1]&&(d=decodeURIComponent(s[1]),t[c]=d);return t},s=function(e,n){var t,a,i,c,s;n?t=e:(n=e,t=o),c="data-grunticon-embed";for(var d in n){s=d.slice(r.length);try{a=t.querySelectorAll(s)}catch(e){continue}i=[];for(var l=0;l<a.length;l++)null!==a[l].getAttribute(c)&&i.push(a[l]);if(i.length)for(l=0;l<i.length;l++)i[l].innerHTML=n[d],i[l].style.backgroundImage="none",i[l].removeAttribute(c)}return i},d=function(n,t){"svg"===e.method&&a(function(){var o=c(i(e.href));"function"==typeof t?(s(n,o),t()):"function"==typeof n&&(s(o),n())})};e.embedIcons=s,e.getCSS=i,e.getIcons=c,e.ready=a,e.svgLoadedCallback=d,e.embedSVG=d}(grunticon,this)}();
/*! Shoestring - v1.0.5 - 2016-09-20
* http://github.com/filamentgroup/shoestring/
* Copyright (c) 2016 Scott Jehl, Filament Group, Inc; Licensed MIT & GPLv2 */ 
(function( factory ) {
	if( typeof define === 'function' && define.amd ) {
			// AMD. Register as an anonymous module.
			define( [ 'shoestring' ], factory );
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		factory();
	}
}(function () {
	var win = typeof window !== "undefined" ? window : this;
	var doc = win.document;


	/**
	 * The shoestring object constructor.
	 *
	 * @param {string,object} prim The selector to find or element to wrap.
	 * @param {object} sec The context in which to match the `prim` selector.
	 * @returns shoestring
	 * @this window
	 */
	function shoestring( prim, sec ){
		var pType = typeof( prim ),
				ret = [],
				sel;

		// return an empty shoestring object
		if( !prim ){
			return new Shoestring( ret );
		}

		// ready calls
		if( prim.call ){
			return shoestring.ready( prim );
		}

		// handle re-wrapping shoestring objects
		if( prim.constructor === Shoestring && !sec ){
			return prim;
		}

		// if string starting with <, make html
		if( pType === "string" && prim.indexOf( "<" ) === 0 ){
			var dfrag = doc.createElement( "div" );

			dfrag.innerHTML = prim;

			// TODO depends on children (circular)
			return shoestring( dfrag ).children().each(function(){
				dfrag.removeChild( this );
			});
		}

		// if string, it's a selector, use qsa
		if( pType === "string" ){
			if( sec ){
				return shoestring( sec ).find( prim );
			}

				sel = doc.querySelectorAll( prim );

			return new Shoestring( sel, prim );
		}

		// array like objects or node lists
		if( Object.prototype.toString.call( pType ) === '[object Array]' ||
				(win.NodeList && prim instanceof win.NodeList) ){

			return new Shoestring( prim, prim );
		}

		// if it's an array, use all the elements
		if( prim.constructor === Array ){
			return new Shoestring( prim, prim );
		}

		// otherwise assume it's an object the we want at an index
		return new Shoestring( [prim], prim );
	}

	var Shoestring = function( ret, prim ) {
		this.length = 0;
		this.selector = prim;
		shoestring.merge(this, ret);
	};

	// TODO only required for tests
	Shoestring.prototype.reverse = [].reverse;

	// For adding element set methods
	shoestring.fn = Shoestring.prototype;

	shoestring.Shoestring = Shoestring;

	// For extending objects
	// TODO move to separate module when we use prototypes
	shoestring.extend = function( first, second ){
		for( var i in second ){
			if( second.hasOwnProperty( i ) ){
				first[ i ] = second[ i ];
			}
		}

		return first;
	};

	// taken directly from jQuery
	shoestring.merge = function( first, second ) {
		var len, j, i;

		len = +second.length,
		j = 0,
		i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	};

	// expose
	win.shoestring = shoestring;



	var xmlHttp = function() {
		try {
			return new XMLHttpRequest();
		}
		catch( e ){
			return new ActiveXObject( "Microsoft.XMLHTTP" );
		}
	};

	/**
	 * Make an HTTP request to a url.
	 *
	 * **NOTE** the following options are supported:
	 *
	 * - *method* - The HTTP method used with the request. Default: `GET`.
	 * - *data* - Raw object with keys and values to pass with request as query params. Default `null`.
	 * - *headers* - Set of request headers to add. Default `{}`.
	 * - *async* - Whether the opened request is asynchronouse. Default `true`.
	 * - *success* - Callback for successful request and response. Passed the response data.
	 * - *error* - Callback for failed request and response.
	 * - *cancel* - Callback for cancelled request and response.
	 *
	 * @param {string} url The url to request.
	 * @param {object} options The options object, see Notes.
	 * @return shoestring
	 * @this shoestring
	 */

	shoestring.ajax = function( url, options ) {
		var params = "", req = xmlHttp(), settings, key;

		settings = shoestring.extend( {}, shoestring.ajax.settings );

		if( options ){
			shoestring.extend( settings, options );
		}

		if( !url ){
			url = settings.url;
		}

		if( !req || !url ){
			return;
		}

		// create parameter string from data object
		if( settings.data ){
			for( key in settings.data ){
				if( settings.data.hasOwnProperty( key ) ){
					if( params !== "" ){
						params += "&";
					}
					params += encodeURIComponent( key ) + "=" +
						encodeURIComponent( settings.data[key] );
				}
			}
		}

		// append params to url for GET requests
		if( settings.method === "GET" && params ){
			
			url += "?" + params;
		}

		req.open( settings.method, url, settings.async );

		if( req.setRequestHeader ){
			req.setRequestHeader( "X-Requested-With", "XMLHttpRequest" );

			// Set 'Content-type' header for POST requests
			if( settings.method === "POST" && params ){
				req.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
			}

			for( key in settings.headers ){
				if( settings.headers.hasOwnProperty( key ) ){
					req.setRequestHeader(key, settings.headers[ key ]);
				}
			}
		}

		req.onreadystatechange = function () {
			if( req.readyState === 4 ){
				// Trim the whitespace so shoestring('<div>') works
				var res = (req.responseText || '').replace(/^\s+|\s+$/g, '');
				if( req.status.toString().indexOf( "0" ) === 0 ){
					return settings.cancel( res, req.status, req );
				}
				else if ( req.status.toString().match( /^(4|5)/ ) && RegExp.$1 ){
					return settings.error( res, req.status, req );
				}
				else if (settings.success) {
					return settings.success( res, req.status, req );
				}
			}
		};

		if( req.readyState === 4 ){
			return req;
		}

		// Send request
		if( settings.method === "POST" && params ){
			req.send( params );
		} else {
			req.send();
		}

		return req;
	};

	shoestring.ajax.settings = {
		success: function(){},
		error: function(){},
		cancel: function(){},
		method: "GET",
		async: true,
		data: null,
		headers: {}
	};



	/**
	 * Helper function wrapping a call to [ajax](ajax.js.html) using the `GET` method.
	 *
	 * @param {string} url The url to GET from.
	 * @param {function} callback Callback to invoke on success.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.get = function( url, callback ){
		return shoestring.ajax( url, { success: callback } );
	};



  /**
	 * Load the HTML response from `url` into the current set of elements.
	 *
	 * @param {string} url The url to GET from.
	 * @param {function} callback Callback to invoke after HTML is inserted.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.load = function( url, callback ){
		var self = this,
			args = arguments,
			intCB = function( data ){
				self.each(function(){
					shoestring( this ).html( data );
				});

				if( callback ){
					callback.apply( self, args );
				}
		  };

		shoestring.ajax( url, { success: intCB } );
		return this;
	};



	/**
	 * Helper function wrapping a call to [ajax](ajax.js.html) using the `POST` method.
	 *
	 * @param {string} url The url to POST to.
	 * @param {object} data The data to send.
	 * @param {function} callback Callback to invoke on success.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.post = function( url, data, callback ){
		return shoestring.ajax( url, { data: data, method: "POST", success: callback } );
	};



	/**
	 * Iterates over `shoestring` collections.
	 *
	 * @param {function} callback The callback to be invoked on each element and index
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.each = function( callback ){
		return shoestring.each( this, callback );
	};

	shoestring.each = function( collection, callback ) {
		var val;
		for( var i = 0, il = collection.length; i < il; i++ ){
			val = callback.call( collection[i], i, collection[i] );
			if( val === false ){
				break;
			}
		}

		return collection;
	};



  /**
	 * Check for array membership.
	 *
	 * @param {object} needle The thing to find.
	 * @param {object} haystack The thing to find the needle in.
	 * @return {boolean}
	 * @this window
	 */
	shoestring.inArray = function( needle, haystack ){
		var isin = -1;
		for( var i = 0, il = haystack.length; i < il; i++ ){
			if( haystack.hasOwnProperty( i ) && haystack[ i ] === needle ){
				isin = i;
			}
		}
		return isin;
	};



  /**
	 * Bind callbacks to be run when the DOM is "ready".
	 *
	 * @param {function} fn The callback to be run
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.ready = function( fn ){
		if( ready && fn ){
			fn.call( doc );
		}
		else if( fn ){
			readyQueue.push( fn );
		}
		else {
			runReady();
		}

		return [doc];
	};

	// TODO necessary?
	shoestring.fn.ready = function( fn ){
		shoestring.ready( fn );
		return this;
	};

	// Empty and exec the ready queue
	var ready = false,
		readyQueue = [],
		runReady = function(){
			if( !ready ){
				while( readyQueue.length ){
					readyQueue.shift().call( doc );
				}
				ready = true;
			}
		};

	// Quick IE8 shiv
	if( !win.addEventListener ){
		win.addEventListener = function( evt, cb ){
			return win.attachEvent( "on" + evt, cb );
		};
	}

	// If DOM is already ready at exec time, depends on the browser.
	// From: https://github.com/mobify/mobifyjs/blob/526841be5509e28fc949038021799e4223479f8d/src/capture.js#L128
	if (doc.attachEvent ? doc.readyState === "complete" : doc.readyState !== "loading") {
		runReady();
	}	else {
		if( !doc.addEventListener ){
			doc.attachEvent( "DOMContentLoaded", runReady );
			doc.attachEvent( "onreadystatechange", runReady );
		} else {
			doc.addEventListener( "DOMContentLoaded", runReady, false );
			doc.addEventListener( "readystatechange", runReady, false );
		}
		win.addEventListener( "load", runReady, false );
	}



  /**
	 * Checks the current set of elements against the selector, if one matches return `true`.
	 *
	 * @param {string} selector The selector to check.
	 * @return {boolean}
	 * @this {shoestring}
	 */
	shoestring.fn.is = function( selector ){
		var ret = false, self = this, parents, check;

		// assume a dom element
		if( typeof selector !== "string" ){
			// array-like, ie shoestring objects or element arrays
			if( selector.length && selector[0] ){
				check = selector;
			} else {
				check = [selector];
			}

			return _checkElements(this, check);
		}

		parents = this.parent();

		if( !parents.length ){
			parents = shoestring( doc );
		}

		parents.each(function( i, e ) {
			var children;

					children = e.querySelectorAll( selector );

			ret = _checkElements( self, children );
		});

		return ret;
	};

	function _checkElements(needles, haystack){
		var ret = false;

		needles.each(function() {
			var j = 0;

			while( j < haystack.length ){
				if( this === haystack[j] ){
					ret = true;
				}

				j++;
			}
		});

		return ret;
	}



	/**
	 * Get data attached to the first element or set data values on all elements in the current set.
	 *
	 * @param {string} name The data attribute name.
	 * @param {any} value The value assigned to the data attribute.
	 * @return {any|shoestring}
	 * @this shoestring
	 */
	shoestring.fn.data = function( name, value ){
		if( name !== undefined ){
			if( value !== undefined ){
				return this.each(function(){
					if( !this.shoestringData ){
						this.shoestringData = {};
					}

					this.shoestringData[ name ] = value;
				});
			}
			else {
				if( this[ 0 ] ) {
					if( this[ 0 ].shoestringData ) {
						return this[ 0 ].shoestringData[ name ];
					}
				}
			}
		}
		else {
			return this[ 0 ] ? this[ 0 ].shoestringData || {} : undefined;
		}
	};


	/**
	 * Remove data associated with `name` or all the data, for each element in the current set.
	 *
	 * @param {string} name The data attribute name.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.removeData = function( name ){
		return this.each(function(){
			if( name !== undefined && this.shoestringData ){
				this.shoestringData[ name ] = undefined;
				delete this.shoestringData[ name ];
			}	else {
				this[ 0 ].shoestringData = {};
			}
		});
	};



	/**
	 * An alias for the `shoestring` constructor.
	 */
	win.$ = shoestring;



	/**
	 * Add a class to each DOM element in the set of elements.
	 *
	 * @param {string} className The name of the class to be added.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.addClass = function( className ){
		var classes = className.replace(/^\s+|\s+$/g, '').split( " " );

		return this.each(function(){
			for( var i = 0, il = classes.length; i < il; i++ ){
				if( this.className !== undefined &&
						(this.className === "" ||
						!this.className.match( new RegExp( "(^|\\s)" + classes[ i ] + "($|\\s)"))) ){
					this.className += " " + classes[ i ];
				}
			}
		});
	};



  /**
	 * Add elements matching the selector to the current set.
	 *
	 * @param {string} selector The selector for the elements to add from the DOM
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.add = function( selector ){
		var ret = [];
		this.each(function(){
			ret.push( this );
		});

		shoestring( selector ).each(function(){
			ret.push( this );
		});

		return shoestring( ret );
	};



	/**
	 * Insert an element or HTML string after each element in the current set.
	 *
	 * @param {string|HTMLElement} fragment The HTML or HTMLElement to insert.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.after = function( fragment ){
		if( typeof( fragment ) === "string" || fragment.nodeType !== undefined ){
			fragment = shoestring( fragment );
		}

		if( fragment.length > 1 ){
			fragment = fragment.reverse();
		}
		return this.each(function( i ){
			for( var j = 0, jl = fragment.length; j < jl; j++ ){
				var insertEl = i > 0 ? fragment[ j ].cloneNode( true ) : fragment[ j ];
				this.parentNode.insertBefore( insertEl, this.nextSibling );
			}
		});
	};



	/**
	 * Insert an element or HTML string as the last child of each element in the set.
	 *
	 * @param {string|HTMLElement} fragment The HTML or HTMLElement to insert.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.append = function( fragment ){
		if( typeof( fragment ) === "string" || fragment.nodeType !== undefined ){
			fragment = shoestring( fragment );
		}

		return this.each(function( i ){
			for( var j = 0, jl = fragment.length; j < jl; j++ ){
				this.appendChild( i > 0 ? fragment[ j ].cloneNode( true ) : fragment[ j ] );
			}
		});
	};



	/**
	 * Insert the current set as the last child of the elements matching the selector.
	 *
	 * @param {string} selector The selector after which to append the current set.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.appendTo = function( selector ){
		return this.each(function(){
			shoestring( selector ).append( this );
		});
	};



  /**
	 * Get the value of the first element of the set or set the value of all the elements in the set.
	 *
	 * @param {string} name The attribute name.
	 * @param {string} value The new value for the attribute.
	 * @return {shoestring|string|undefined}
	 * @this {shoestring}
	 */
	shoestring.fn.attr = function( name, value ){
		var nameStr = typeof( name ) === "string";

		if( value !== undefined || !nameStr ){
			return this.each(function(){
				if( nameStr ){
					this.setAttribute( name, value );
				}	else {
					for( var i in name ){
						if( name.hasOwnProperty( i ) ){
							this.setAttribute( i, name[ i ] );
						}
					}
				}
			});
		} else {
			return this[ 0 ] ? this[ 0 ].getAttribute( name ) : undefined;
		}
	};



	/**
	 * Insert an element or HTML string before each element in the current set.
	 *
	 * @param {string|HTMLElement} fragment The HTML or HTMLElement to insert.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.before = function( fragment ){
		if( typeof( fragment ) === "string" || fragment.nodeType !== undefined ){
			fragment = shoestring( fragment );
		}

		return this.each(function( i ){
			for( var j = 0, jl = fragment.length; j < jl; j++ ){
				this.parentNode.insertBefore( i > 0 ? fragment[ j ].cloneNode( true ) : fragment[ j ], this );
			}
		});
	};



	/**
	 * Get the children of the current collection.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.children = function(){
				var ret = [],
			childs,
			j;
		this.each(function(){
			childs = this.children;
			j = -1;

			while( j++ < childs.length-1 ){
				if( shoestring.inArray(  childs[ j ], ret ) === -1 ){
					ret.push( childs[ j ] );
				}
			}
		});
		return shoestring(ret);
	};



	/**
	 * Clone and return the current set of nodes into a new `shoestring` object.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.clone = function() {
		var ret = [];

		this.each(function() {
			ret.push( this.cloneNode( true ) );
		});

		return shoestring( ret );
	};



	/**
	 * Find an element matching the selector in the set of the current element and its parents.
	 *
	 * @param {string} selector The selector used to identify the target element.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.closest = function( selector ){
		var ret = [];

		if( !selector ){
			return shoestring( ret );
		}

		this.each(function(){
			var element, $self = shoestring( element = this );

			if( $self.is(selector) ){
				ret.push( this );
				return;
			}

			while( element.parentElement ) {
				if( shoestring(element.parentElement).is(selector) ){
					ret.push( element.parentElement );
					break;
				}

				element = element.parentElement;
			}
		});

		return shoestring( ret );
	};



  shoestring.cssExceptions = {
		'float': [ 'cssFloat', 'styleFloat' ] // styleFloat is IE8
	};



	/**
	 * A polyfill to support computed styles in IE < 9
	 *
	 * NOTE this is taken directly from https://github.com/jonathantneal/polyfill
	 */
	(function () {
		function getComputedStylePixel(element, property, fontSize) {
			element.document; // Internet Explorer sometimes struggles to read currentStyle until the element's document is accessed.

			var
			value = element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/) || [0, 0, ''],
			size = value[1],
			suffix = value[2],
			rootSize;

			fontSize = !fontSize ? fontSize : /%|em/.test(suffix) && element.parentElement ? getComputedStylePixel(element.parentElement, 'fontSize', null) : 16;
			rootSize = property === 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

			return suffix === '%' ? size / 100 * rootSize :
				suffix === 'cm' ? size * 0.3937 * 96 :
				suffix === 'em' ? size * fontSize :
				suffix === 'in' ? size * 96 :
				suffix === 'mm' ? size * 0.3937 * 96 / 10 :
				suffix === 'pc' ? size * 12 * 96 / 72 :
				suffix === 'pt' ? size * 96 / 72 :
				size;
		}

		function setShortStyleProperty(style, property) {
			var
			borderSuffix = property === 'border' ? 'Width' : '',
			t = property + 'Top' + borderSuffix,
			r = property + 'Right' + borderSuffix,
			b = property + 'Bottom' + borderSuffix,
			l = property + 'Left' + borderSuffix;

			style[property] = (style[t] === style[r] && style[t] === style[b] && style[t] === style[l] ? [ style[t] ] :
												 style[t] === style[b] && style[l] === style[r] ? [ style[t], style[r] ] :
												 style[l] === style[r] ? [ style[t], style[r], style[b] ] :
												 [ style[t], style[r], style[b], style[l] ]).join(' ');
		}

		// <CSSStyleDeclaration>
		function CSSStyleDeclaration(element) {
			var
			style = this,
			currentStyle = element.currentStyle,
			fontSize = getComputedStylePixel(element, 'fontSize'),
			unCamelCase = function (match) {
				return '-' + match.toLowerCase();
			},
			property;

			for (property in currentStyle) {
				Array.prototype.push.call(style, property === 'styleFloat' ? 'float' : property.replace(/[A-Z]/, unCamelCase));

				if (property === 'width') {
					style[property] = element.offsetWidth + 'px';
				} else if (property === 'height') {
					style[property] = element.offsetHeight + 'px';
				} else if (property === 'styleFloat') {
					style.float = currentStyle[property];
				} else if (/margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
					style[property] = Math.round(getComputedStylePixel(element, property, fontSize)) + 'px';
				} else if (/^outline/.test(property)) {
					// errors on checking outline
					try {
						style[property] = currentStyle[property];
					} catch (error) {
						style.outlineColor = currentStyle.color;
						style.outlineStyle = style.outlineStyle || 'none';
						style.outlineWidth = style.outlineWidth || '0px';
						style.outline = [style.outlineColor, style.outlineWidth, style.outlineStyle].join(' ');
					}
				} else {
					style[property] = currentStyle[property];
				}
			}

			setShortStyleProperty(style, 'margin');
			setShortStyleProperty(style, 'padding');
			setShortStyleProperty(style, 'border');

			style.fontSize = Math.round(fontSize) + 'px';
		}

		CSSStyleDeclaration.prototype = {
			constructor: CSSStyleDeclaration,
			// <CSSStyleDeclaration>.getPropertyPriority
			getPropertyPriority: function () {
				throw new Error('NotSupportedError: DOM Exception 9');
			},
			// <CSSStyleDeclaration>.getPropertyValue
			getPropertyValue: function (property) {
				return this[property.replace(/-\w/g, function (match) {
					return match[1].toUpperCase();
				})];
			},
			// <CSSStyleDeclaration>.item
			item: function (index) {
				return this[index];
			},
			// <CSSStyleDeclaration>.removeProperty
			removeProperty: function () {
				throw new Error('NoModificationAllowedError: DOM Exception 7');
			},
			// <CSSStyleDeclaration>.setProperty
			setProperty: function () {
				throw new Error('NoModificationAllowedError: DOM Exception 7');
			},
			// <CSSStyleDeclaration>.getPropertyCSSValue
			getPropertyCSSValue: function () {
				throw new Error('NotSupportedError: DOM Exception 9');
			}
		};

		if( !win.getComputedStyle ) {
			// <win>.getComputedStyle
			// NOTE win is not defined in all browsers
			win.getComputedStyle = function (element) {
				return new CSSStyleDeclaration(element);
			};

			if ( win.Window ) {
				win.Window.prototype.getComputedStyle = win.getComputedStyle;
			}
		}
	})();



	(function() {
		var cssExceptions = shoestring.cssExceptions;

		// IE8 uses marginRight instead of margin-right
		function convertPropertyName( str ) {
			return str.replace( /\-([A-Za-z])/g, function ( match, character ) {
				return character.toUpperCase();
			});
		}

		function _getStyle( element, property ) {
			// polyfilled in getComputedStyle module
			return win.getComputedStyle( element, null ).getPropertyValue( property );
		}

		var vendorPrefixes = [ '', '-webkit-', '-ms-', '-moz-', '-o-', '-khtml-' ];

		/**
		 * Private function for getting the computed style of an element.
		 *
		 * **NOTE** Please use the [css](../css.js.html) method instead.
		 *
		 * @method _getStyle
		 * @param {HTMLElement} element The element we want the style property for.
		 * @param {string} property The css property we want the style for.
		 */
		shoestring._getStyle = function( element, property ) {
			var convert, value, j, k;

			if( cssExceptions[ property ] ) {
				for( j = 0, k = cssExceptions[ property ].length; j < k; j++ ) {
					value = _getStyle( element, cssExceptions[ property ][ j ] );

					if( value ) {
						return value;
					}
				}
			}

			for( j = 0, k = vendorPrefixes.length; j < k; j++ ) {
				convert = convertPropertyName( vendorPrefixes[ j ] + property );

				// VendorprefixKeyName || key-name
				value = _getStyle( element, convert );

				if( convert !== property ) {
					value = value || _getStyle( element, property );
				}

				if( vendorPrefixes[ j ] ) {
					// -vendorprefix-key-name
					value = value || _getStyle( element, vendorPrefixes[ j ] + property );
				}

				if( value ) {
					return value;
				}
			}

			return undefined;
		};
	})();



	(function() {
		var cssExceptions = shoestring.cssExceptions;

		// IE8 uses marginRight instead of margin-right
		function convertPropertyName( str ) {
			return str.replace( /\-([A-Za-z])/g, function ( match, character ) {
				return character.toUpperCase();
			});
		}

		/**
		 * Private function for setting the style of an element.
		 *
		 * **NOTE** Please use the [css](../css.js.html) method instead.
		 *
		 * @method _setStyle
		 * @param {HTMLElement} element The element we want to style.
		 * @param {string} property The property being used to style the element.
		 * @param {string} value The css value for the style property.
		 */
		shoestring._setStyle = function( element, property, value ) {
			var convertedProperty = convertPropertyName(property);

			element.style[ property ] = value;

			if( convertedProperty !== property ) {
				element.style[ convertedProperty ] = value;
			}

			if( cssExceptions[ property ] ) {
				for( var j = 0, k = cssExceptions[ property ].length; j<k; j++ ) {
					element.style[ cssExceptions[ property ][ j ] ] = value;
				}
			}
		};
	})();



	/**
	 * Get the compute style property of the first element or set the value of a style property
	 * on all elements in the set.
	 *
	 * @method _setStyle
	 * @param {string} property The property being used to style the element.
	 * @param {string|undefined} value The css value for the style property.
	 * @return {string|shoestring}
	 * @this shoestring
	 */
	shoestring.fn.css = function( property, value ){
		if( !this[0] ){
			return;
		}

		if( typeof property === "object" ) {
			return this.each(function() {
				for( var key in property ) {
					if( property.hasOwnProperty( key ) ) {
						shoestring._setStyle( this, key, property[key] );
					}
				}
			});
		}	else {
			// assignment else retrieve first
			if( value !== undefined ){
				return this.each(function(){
					shoestring._setStyle( this, property, value );
				});
			}

			return shoestring._getStyle( this[0], property );
		}
	};



	/**
	 * Returns the indexed element wrapped in a new `shoestring` object.
	 *
	 * @param {integer} index The index of the element to wrap and return.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.eq = function( index ){
		if( this[index] ){
			return shoestring( this[index] );
		}

		return shoestring([]);
	};



	/**
	 * Filter out the current set if they do *not* match the passed selector or
	 * the supplied callback returns false
	 *
	 * @param {string,function} selector The selector or boolean return value callback used to filter the elements.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.filter = function( selector ){
		var ret = [];

		this.each(function( index ){
			var wsel;

			if( typeof selector === 'function' ) {
				if( selector.call( this, index ) !== false ) {
					ret.push( this );
				}
			} else {
				if( !this.parentNode ){
					var context = shoestring( doc.createDocumentFragment() );

					context[ 0 ].appendChild( this );
					wsel = shoestring( selector, context );
				} else {
					wsel = shoestring( selector, this.parentNode );
				}

				if( shoestring.inArray( this, wsel ) > -1 ){
					ret.push( this );
				}
			}
		});

		return shoestring( ret );
	};



	/**
	 * Find descendant elements of the current collection.
	 *
	 * @param {string} selector The selector used to find the children
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.find = function( selector ){
		var ret = [],
			finds;
		this.each(function(){
				finds = this.querySelectorAll( selector );

			for( var i = 0, il = finds.length; i < il; i++ ){
				ret = ret.concat( finds[i] );
			}
		});
		return shoestring( ret );
	};



	/**
	 * Returns the first element of the set wrapped in a new `shoestring` object.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.first = function(){
		return this.eq( 0 );
	};



	/**
	 * Returns the raw DOM node at the passed index.
	 *
	 * @param {integer} index The index of the element to wrap and return.
	 * @return {HTMLElement|undefined|array}
	 * @this shoestring
	 */
	shoestring.fn.get = function( index ){

		// return an array of elements if index is undefined
		if( index === undefined ){
			var elements = [];

			for( var i = 0; i < this.length; i++ ){
				elements.push( this[ i ] );
			}

			return elements;
		} else {
			return this[ index ];
		}
	};



	/**
	 * Private function for setting/getting the offset property for height/width.
	 *
	 * **NOTE** Please use the [width](width.js.html) or [height](height.js.html) methods instead.
	 *
	 * @param {shoestring} set The set of elements.
	 * @param {string} name The string "height" or "width".
	 * @param {float|undefined} value The value to assign.
	 * @return shoestring
	 * @this window
	 */
	shoestring._dimension = function( set, name, value ){
		var offsetName;

		if( value === undefined ){
			offsetName = name.replace(/^[a-z]/, function( letter ) {
				return letter.toUpperCase();
			});

			return set[ 0 ][ "offset" + offsetName ];
		} else {
			// support integer values as pixels
			value = typeof value === "string" ? value : value + "px";

			return set.each(function(){
				this.style[ name ] = value;
			});
		}
	};



	/**
	 * Gets the height value of the first element or sets the height for the whole set.
	 *
	 * @param {float|undefined} value The value to assign.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.height = function( value ){
		return shoestring._dimension( this, "height", value );
	};



	var set = function( html ){
		if( typeof html === "string" || typeof html === "number" ){
			return this.each(function(){
				this.innerHTML = "" + html;
			});
		} else {
			var h = "";
			if( typeof html.length !== "undefined" ){
				for( var i = 0, l = html.length; i < l; i++ ){
					h += html[i].outerHTML;
				}
			} else {
				h = html.outerHTML;
			}
			return this.each(function(){
				this.innerHTML = h;
			});
		}
	};
	/**
	 * Gets or sets the `innerHTML` from all the elements in the set.
	 *
	 * @param {string|undefined} html The html to assign
	 * @return {string|shoestring}
	 * @this shoestring
	 */
	shoestring.fn.html = function( html ){
				if( typeof html !== "undefined" ){
			return set.call( this, html );
		} else { // get
			var pile = "";

			this.each(function(){
				pile += this.innerHTML;
			});

			return pile;
		}
	};



	(function() {
		function _getIndex( set, test ) {
			var i, result, element;

			for( i = result = 0; i < set.length; i++ ) {
				element = set.item ? set.item(i) : set[i];

				if( test(element) ){
					return result;
				}

				// ignore text nodes, etc
				// NOTE may need to be more permissive
				if( element.nodeType === 1 ){
					result++;
				}
			}

			return -1;
		}

		/**
		 * Find the index in the current set for the passed selector.
		 * Without a selector it returns the index of the first node within the array of its siblings.
		 *
		 * @param {string|undefined} selector The selector used to search for the index.
		 * @return {integer}
		 * @this {shoestring}
		 */
		shoestring.fn.index = function( selector ){
			var self, children;

			self = this;

			// no arg? check the children, otherwise check each element that matches
			if( selector === undefined ){
				children = ( ( this[ 0 ] && this[0].parentNode ) || doc.documentElement).childNodes;

				// check if the element matches the first of the set
				return _getIndex(children, function( element ) {
					return self[0] === element;
				});
			} else {

				// check if the element matches the first selected node from the parent
				return _getIndex(self, function( element ) {
					return element === (shoestring( selector, element.parentNode )[ 0 ]);
				});
			}
		};
	})();



	/**
	 * Insert the current set after the elements matching the selector.
	 *
	 * @param {string} selector The selector after which to insert the current set.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.insertAfter = function( selector ){
		return this.each(function(){
			shoestring( selector ).after( this );
		});
	};



	/**
	 * Insert the current set before the elements matching the selector.
	 *
	 * @param {string} selector The selector before which to insert the current set.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.insertBefore = function( selector ){
		return this.each(function(){
			shoestring( selector ).before( this );
		});
	};



	/**
	 * Returns the last element of the set wrapped in a new `shoestring` object.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.last = function(){
		return this.eq( this.length - 1 );
	};



	/**
	 * Returns a `shoestring` object with the set of siblings of each element in the original set.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.next = function(){
		
		var result = [];

		// TODO need to implement map
		this.each(function() {
			var children, item, found;

			// get the child nodes for this member of the set
			children = shoestring( this.parentNode )[0].childNodes;

			for( var i = 0; i < children.length; i++ ){
				item = children.item( i );

				// found the item we needed (found) which means current item value is
				// the next node in the list, as long as it's viable grab it
				// NOTE may need to be more permissive
				if( found && item.nodeType === 1 ){
					result.push( item );
					break;
				}

				// find the current item and mark it as found
				if( item === this ){
					found = true;
				}
			}
		});

		return shoestring( result );
	};



	/**
	 * Removes elements from the current set.
	 *
	 * @param {string} selector The selector to use when removing the elements.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.not = function( selector ){
		var ret = [];

		this.each(function(){
			var found = shoestring( selector, this.parentNode );

			if( shoestring.inArray(this, found) === -1 ){
				ret.push( this );
			}
		});

		return shoestring( ret );
	};



	/**
	 * Returns an object with the `top` and `left` properties corresponging to the first elements offsets.
	 *
	 * @return object
	 * @this shoestring
	 */
	shoestring.fn.offset = function(){
		return {
			top: this[ 0 ].offsetTop,
			left: this[ 0 ].offsetLeft
		};
	};



	/**
	 * Returns the set of first parents for each element in the current set.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.parent = function(){
		var ret = [],
			parent;

		this.each(function(){
			// no parent node, assume top level
			// jQuery parent: return the document object for <html> or the parent node if it exists
			parent = (this === doc.documentElement ? doc : this.parentNode);

			// if there is a parent and it's not a document fragment
			if( parent && parent.nodeType !== 11 ){
				ret.push( parent );
			}
		});

		return shoestring(ret);
	};



	/**
	 * Returns the set of all parents matching the selector if provided for each element in the current set.
	 *
	 * @param {string} selector The selector to check the parents with.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.parents = function( selector ){
		var ret = [];

		this.each(function(){
			var curr = this, match;

			while( curr.parentElement && !match ){
				curr = curr.parentElement;

				if( selector ){
					if( curr === shoestring( selector )[0] ){
						match = true;

						if( shoestring.inArray( curr, ret ) === -1 ){
							ret.push( curr );
						}
					}
				} else {
					if( shoestring.inArray( curr, ret ) === -1 ){
						ret.push( curr );
					}
				}
			}
		});

		return shoestring(ret);
	};



	/**
	 * Add an HTML string or element before the children of each element in the current set.
	 *
	 * @param {string|HTMLElement} fragment The HTML string or element to add.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.prepend = function( fragment ){
		if( typeof( fragment ) === "string" || fragment.nodeType !== undefined ){
			fragment = shoestring( fragment );
		}

		return this.each(function( i ){

			for( var j = 0, jl = fragment.length; j < jl; j++ ){
				var insertEl = i > 0 ? fragment[ j ].cloneNode( true ) : fragment[ j ];
				if ( this.firstChild ){
					this.insertBefore( insertEl, this.firstChild );
				} else {
					this.appendChild( insertEl );
				}
			}
		});
	};



	/**
	 * Add each element of the current set before the children of the selected elements.
	 *
	 * @param {string} selector The selector for the elements to add the current set to..
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.prependTo = function( selector ){
		return this.each(function(){
			shoestring( selector ).prepend( this );
		});
	};



	/**
	 * Returns a `shoestring` object with the set of *one* siblingx before each element in the original set.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.prev = function(){
		
		var result = [];

		// TODO need to implement map
		this.each(function() {
			var children, item, found;

			// get the child nodes for this member of the set
			children = shoestring( this.parentNode )[0].childNodes;

			for( var i = children.length -1; i >= 0; i-- ){
				item = children.item( i );

				// found the item we needed (found) which means current item value is
				// the next node in the list, as long as it's viable grab it
				// NOTE may need to be more permissive
				if( found && item.nodeType === 1 ){
					result.push( item );
					break;
				}

				// find the current item and mark it as found
				if( item === this ){
					found = true;
				}
			}
		});

		return shoestring( result );
	};



	/**
	 * Returns a `shoestring` object with the set of *all* siblings before each element in the original set.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.prevAll = function(){
		
		var result = [];

		this.each(function() {
			var $previous = shoestring( this ).prev();

			while( $previous.length ){
				result.push( $previous[0] );
				$previous = $previous.prev();
			}
		});

		return shoestring( result );
	};



	// Property normalization, a subset taken from jQuery src
	shoestring.propFix = {
		"class": "className",
		contenteditable: "contentEditable",
		"for": "htmlFor",
		readonly: "readOnly",
		tabindex: "tabIndex"
	};



	/**
	 * Gets the property value from the first element or sets the property value on all elements of the currrent set.
   *
	 * @param {string} name The property name.
   * @param {any} value The property value.
	 * @return {any|shoestring}
	 * @this shoestring
	 */
	shoestring.fn.prop = function( name, value ){
		if( !this[0] ){
			return;
		}

		name = shoestring.propFix[ name ] || name;

		if( value !== undefined ){
			return this.each(function(){
				this[ name ] = value;
			});
		}	else {
			return this[ 0 ][ name ];
		}
	};



	/**
	 * Remove an attribute from each element in the current set.
	 *
	 * @param {string} name The name of the attribute.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.removeAttr = function( name ){
		return this.each(function(){
			this.removeAttribute( name );
		});
	};



	/**
	 * Remove a class from each DOM element in the set of elements.
	 *
	 * @param {string} className The name of the class to be removed.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.removeClass = function( cname ){
		var classes = cname.replace(/^\s+|\s+$/g, '').split( " " );

		return this.each(function(){
			var newClassName, regex;

			for( var i = 0, il = classes.length; i < il; i++ ){
				if( this.className !== undefined ){
					regex = new RegExp( "(^|\\s)" + classes[ i ] + "($|\\s)", "gmi" );
					newClassName = this.className.replace( regex, " " );

					this.className = newClassName.replace(/^\s+|\s+$/g, '');
				}
			}
		});
	};



	/**
	 * Remove the current set of elements from the DOM.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.remove = function(){
		return this.each(function(){
			if( this.parentNode ) {
				this.parentNode.removeChild( this );
			}
		});
	};



	/**
	 * Remove a proprety from each element in the current set.
	 *
	 * @param {string} name The name of the property.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.removeProp = function( property ){
		var name = shoestring.propFix[ property ] || property;

		return this.each(function(){
			this[ name ] = undefined;
			delete this[ name ];
		});
	};



	/**
	 * Replace each element in the current set with that argument HTML string or HTMLElement.
	 *
	 * @param {string|HTMLElement} fragment The value to assign.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.replaceWith = function( fragment ){
		if( typeof( fragment ) === "string" ){
			fragment = shoestring( fragment );
		}

		var ret = [];

		if( fragment.length > 1 ){
			fragment = fragment.reverse();
		}
		this.each(function( i ){
			var clone = this.cloneNode( true ),
				insertEl;
			ret.push( clone );

			// If there is no parentNode, this is pointless, drop it.
			if( !this.parentNode ){ return; }

			if( fragment.length === 1 ){
				insertEl = i > 0 ? fragment[ 0 ].cloneNode( true ) : fragment[ 0 ];
				this.parentNode.replaceChild( insertEl, this );
			} else {
				for( var j = 0, jl = fragment.length; j < jl; j++ ){
					insertEl = i > 0 ? fragment[ j ].cloneNode( true ) : fragment[ j ];
					this.parentNode.insertBefore( insertEl, this.nextSibling );
				}
				this.parentNode.removeChild( this );
			}
		});

		return shoestring( ret );
	};



	shoestring.inputTypes = [
		"text",
		"hidden",
		"password",
		"color",
		"date",
		"datetime",
		// "datetime\-local" matched by datetime
		"email",
		"month",
		"number",
		"range",
		"search",
		"tel",
		"time",
		"url",
		"week"
	];

	shoestring.inputTypeTest = new RegExp( shoestring.inputTypes.join( "|" ) );


	/**
	 * Serialize child input element values into an object.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.serialize = function(){
		var data = {};

		shoestring( "input, select", this ).each(function(){
			var type = this.type, name = this.name,	value = this.value;

			if( shoestring.inputTypeTest.test( type ) ||
					( type === "checkbox" || type === "radio" ) &&
					this.checked ){

				data[ name ] = value;
			}	else if( this.nodeName === "SELECT" ){
				data[ name ] = this.options[ this.selectedIndex ].nodeValue;
			}
		});

		return data;
	};



  /**
	 * Get all of the sibling elements for each element in the current set.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.siblings = function(){
		
		if( !this.length ) {
			return shoestring( [] );
		}

		var sibs = [], el = this[ 0 ].parentNode.firstChild;

		do {
			if( el.nodeType === 1 && el !== this[ 0 ] ) {
				sibs.push( el );
			}

      el = el.nextSibling;
		} while( el );

		return shoestring( sibs );
	};



	var getText = function( elem ){
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

  /**
	 * Recursively retrieve the text content of the each element in the current set.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.text = function() {
		
		return getText( this );
	};




	/**
	 * Get the value of the first element or set the value of all elements in the current set.
	 *
	 * @param {string} value The value to set.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.val = function( value ){
		var el;
		if( value !== undefined ){
			return this.each(function(){
				if( this.tagName === "SELECT" ){
					var optionSet, option,
						options = this.options,
						values = [],
						i = options.length,
						newIndex;

					values[0] = value;
					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = shoestring.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
							newIndex = i;
						}
					}
					// force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						this.selectedIndex = -1;
					} else {
						this.selectedIndex = newIndex;
					}
				} else {
					this.value = value;
				}
			});
		} else {
			el = this[0];

			if( el.tagName === "SELECT" ){
				if( el.selectedIndex < 0 ){ return ""; }
				return el.options[ el.selectedIndex ].value;
			} else {
				return el.value;
			}
		}
	};



	/**
	 * Gets the width value of the first element or sets the width for the whole set.
	 *
	 * @param {float|undefined} value The value to assign.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.width = function( value ){
		return shoestring._dimension( this, "width", value );
	};



	/**
	 * Wraps the child elements in the provided HTML.
	 *
	 * @param {string} html The wrapping HTML.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.wrapInner = function( html ){
		return this.each(function(){
			var inH = this.innerHTML;

			this.innerHTML = "";
			shoestring( this ).append( shoestring( html ).html( inH ) );
		});
	};



	function initEventCache( el, evt ) {
		if ( !el.shoestringData ) {
			el.shoestringData = {};
		}
		if ( !el.shoestringData.events ) {
			el.shoestringData.events = {};
		}
		if ( !el.shoestringData.loop ) {
			el.shoestringData.loop = {};
		}
		if ( !el.shoestringData.events[ evt ] ) {
			el.shoestringData.events[ evt ] = [];
		}
	}

	function addToEventCache( el, evt, eventInfo ) {
		var obj = {};
		obj.isCustomEvent = eventInfo.isCustomEvent;
		obj.callback = eventInfo.callfunc;
		obj.originalCallback = eventInfo.originalCallback;
		obj.namespace = eventInfo.namespace;

		el.shoestringData.events[ evt ].push( obj );

		if( eventInfo.customEventLoop ) {
			el.shoestringData.loop[ evt ] = eventInfo.customEventLoop;
		}
	}

	// In IE8 the events trigger in a reverse order (LIFO). This code
	// unbinds and rebinds all callbacks on an element in the a FIFO order.
	function reorderEvents( node, eventName ) {
		if( node.addEventListener || !node.shoestringData || !node.shoestringData.events ) {
			// add event listner obviates the need for all the callback order juggling
			return;
		}

		var otherEvents = node.shoestringData.events[ eventName ] || [];
		for( var j = otherEvents.length - 1; j >= 0; j-- ) {
			// DOM Events only, Custom events maintain their own order internally.
			if( !otherEvents[ j ].isCustomEvent ) {
				node.detachEvent( "on" + eventName, otherEvents[ j ].callback );
				node.attachEvent( "on" + eventName, otherEvents[ j ].callback );
			}
		}
	}

	/**
	 * Bind a callback to an event for the currrent set of elements.
	 *
	 * @param {string} evt The event(s) to watch for.
	 * @param {object,function} data Data to be included with each event or the callback.
	 * @param {function} originalCallback Callback to be invoked when data is define.d.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.bind = function( evt, data, originalCallback ){

				if( typeof data === "function" ){
			originalCallback = data;
			data = null;
		}

		var evts = evt.split( " " ),
			docEl = doc.documentElement;

		// NOTE the `triggeredElement` is purely for custom events from IE
		function encasedCallback( e, namespace, triggeredElement ){
			var result;

			if( e._namespace && e._namespace !== namespace ) {
				return;
			}

			e.data = data;
			e.namespace = e._namespace;

			var returnTrue = function(){
				return true;
			};

			e.isDefaultPrevented = function(){
				return false;
			};

			var originalPreventDefault = e.preventDefault;
			var preventDefaultConstructor = function(){
				if( originalPreventDefault ) {
					return function(){
						e.isDefaultPrevented = returnTrue;
						originalPreventDefault.call(e);
					};
				} else {
					return function(){
						e.isDefaultPrevented = returnTrue;
						e.returnValue = false;
					};
				}
			};

			// thanks https://github.com/jonathantneal/EventListener
			e.target = triggeredElement || e.target || e.srcElement;
			e.preventDefault = preventDefaultConstructor();
			e.stopPropagation = e.stopPropagation || function () {
				e.cancelBubble = true;
			};

			result = originalCallback.apply(this, [ e ].concat( e._args ) );

			if( result === false ){
				e.preventDefault();
				e.stopPropagation();
			}

			return result;
		}

		// This is exclusively for custom events on browsers without addEventListener (IE8)
		function propChange( originalEvent, boundElement, namespace ) {
			var lastEventInfo = doc.documentElement[ originalEvent.propertyName ],
				triggeredElement = lastEventInfo.el;

			var boundCheckElement = boundElement;

			if( boundElement === doc && triggeredElement !== doc ) {
				boundCheckElement = doc.documentElement;
			}

			if( triggeredElement !== undefined &&
				shoestring( triggeredElement ).closest( boundCheckElement ).length ) {

				originalEvent._namespace = lastEventInfo._namespace;
				originalEvent._args = lastEventInfo._args;
				encasedCallback.call( boundElement, originalEvent, namespace, triggeredElement );
			}
		}

		return this.each(function(){
			var domEventCallback,
				customEventCallback,
				customEventLoop,
				oEl = this;

			for( var i = 0, il = evts.length; i < il; i++ ){
				var split = evts[ i ].split( "." ),
					evt = split[ 0 ],
					namespace = split.length > 0 ? split[ 1 ] : null;

				domEventCallback = function( originalEvent ) {
					if( oEl.ssEventTrigger ) {
						originalEvent._namespace = oEl.ssEventTrigger._namespace;
						originalEvent._args = oEl.ssEventTrigger._args;

						oEl.ssEventTrigger = null;
					}
					return encasedCallback.call( oEl, originalEvent, namespace );
				};
				customEventCallback = null;
				customEventLoop = null;

				initEventCache( this, evt );

				if( "addEventListener" in this ){
					this.addEventListener( evt, domEventCallback, false );
				} else if( this.attachEvent ){
					if( this[ "on" + evt ] !== undefined ) {
						this.attachEvent( "on" + evt, domEventCallback );
					} else {
						customEventCallback = (function() {
							var eventName = evt;
							return function( e ) {
								if( e.propertyName === eventName ) {
									propChange( e, oEl, namespace );
								}
							};
						})();

						// only assign one onpropertychange per element
						if( this.shoestringData.events[ evt ].length === 0 ) {
							customEventLoop = (function() {
								var eventName = evt;
								return function( e ) {
									if( !oEl.shoestringData || !oEl.shoestringData.events ) {
										return;
									}
									var events = oEl.shoestringData.events[ eventName ];
									if( !events ) {
										return;
									}

									// TODO stopImmediatePropagation
									for( var j = 0, k = events.length; j < k; j++ ) {
										events[ j ].callback( e );
									}
								};
							})();

							docEl.attachEvent( "onpropertychange", customEventLoop );
						}
					}
				}

				addToEventCache( this, evt, {
					callfunc: customEventCallback || domEventCallback,
					isCustomEvent: !!customEventCallback,
					customEventLoop: customEventLoop,
					originalCallback: originalCallback,
					namespace: namespace
				});

				// Don’t reorder custom events, only DOM Events.
				if( !customEventCallback ) {
					reorderEvents( oEl, evt );
				}
			}
		});
	};

	shoestring.fn.on = shoestring.fn.bind;

	


	/**
	 * Unbind a previous bound callback for an event.
	 *
	 * @param {string} event The event(s) the callback was bound to..
	 * @param {function} callback Callback to unbind.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.unbind = function( event, callback ){

		
		var evts = event ? event.split( " " ) : [];

		return this.each(function(){
			if( !this.shoestringData || !this.shoestringData.events ) {
				return;
			}

			if( !evts.length ) {
				unbindAll.call( this );
			} else {
				var split, evt, namespace;
				for( var i = 0, il = evts.length; i < il; i++ ){
					split = evts[ i ].split( "." ),
					evt = split[ 0 ],
					namespace = split.length > 0 ? split[ 1 ] : null;

					if( evt ) {
						unbind.call( this, evt, namespace, callback );
					} else {
						unbindAll.call( this, namespace, callback );
					}
				}
			}
		});
	};

	function unbind( evt, namespace, callback ) {
		var bound = this.shoestringData.events[ evt ];
		if( !(bound && bound.length) ) {
			return;
		}

		var matched = [], j, jl;
		for( j = 0, jl = bound.length; j < jl; j++ ) {
			if( !namespace || namespace === bound[ j ].namespace ) {
				if( callback === undefined || callback === bound[ j ].originalCallback ) {
					if( "removeEventListener" in win ){
						this.removeEventListener( evt, bound[ j ].callback, false );
					} else if( this.detachEvent ){
						// dom event
						this.detachEvent( "on" + evt, bound[ j ].callback );

						// only unbind custom events if its the last one on the element
						if( bound.length === 1 && this.shoestringData.loop && this.shoestringData.loop[ evt ] ) {
							doc.documentElement.detachEvent( "onpropertychange", this.shoestringData.loop[ evt ] );
						}
					}
					matched.push( j );
				}
			}
		}

		for( j = 0, jl = matched.length; j < jl; j++ ) {
			this.shoestringData.events[ evt ].splice( j, 1 );
		}
	}

	function unbindAll( namespace, callback ) {
		for( var evtKey in this.shoestringData.events ) {
			unbind.call( this, evtKey, namespace, callback );
		}
	}

	shoestring.fn.off = shoestring.fn.unbind;


	/**
	 * Bind a callback to an event for the currrent set of elements, unbind after one occurence.
	 *
	 * @param {string} event The event(s) to watch for.
	 * @param {function} callback Callback to invoke on the event.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.one = function( event, callback ){
		var evts = event.split( " " );

		return this.each(function(){
			var thisevt, cbs = {},	$t = shoestring( this );

			for( var i = 0, il = evts.length; i < il; i++ ){
				thisevt = evts[ i ];

				cbs[ thisevt ] = function( e ){
					var $t = shoestring( this );

					for( var j in cbs ) {
						$t.unbind( j, cbs[ j ] );
					}

					return callback.apply( this, [ e ].concat( e._args ) );
				};

				$t.bind( thisevt, cbs[ thisevt ] );
			}
		});
	};



	/**
	 * Trigger an event on the first element in the set, no bubbling, no defaults.
	 *
	 * @param {string} event The event(s) to trigger.
	 * @param {object} args Arguments to append to callback invocations.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.triggerHandler = function( event, args ){
		var e = event.split( " " )[ 0 ],
			el = this[ 0 ],
			ret;

		// TODO needs IE8 support
		// See this.fireEvent( 'on' + evts[ i ], document.createEventObject() ); instead of click() etc in trigger.
		if( doc.createEvent && el.shoestringData && el.shoestringData.events && el.shoestringData.events[ e ] ){
			var bindings = el.shoestringData.events[ e ];
			for (var i in bindings ){
				if( bindings.hasOwnProperty( i ) ){
					event = doc.createEvent( "Event" );
					event.initEvent( e, true, true );
					event._args = args;
					args.unshift( event );

					ret = bindings[ i ].originalCallback.apply( event.target, args );
				}
			}
		}

		return ret;
	};



	/**
	 * Trigger an event on each of the DOM elements in the current set.
	 *
	 * @param {string} event The event(s) to trigger.
	 * @param {object} args Arguments to append to callback invocations.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.trigger = function( event, args ){
		var evts = event.split( " " );

		return this.each(function(){
			var split, evt, namespace;
			for( var i = 0, il = evts.length; i < il; i++ ){
				split = evts[ i ].split( "." ),
				evt = split[ 0 ],
				namespace = split.length > 0 ? split[ 1 ] : null;

				if( evt === "click" ){
					if( this.tagName === "INPUT" && this.type === "checkbox" && this.click ){
						this.click();
						return false;
					}
				}

				if( doc.createEvent ){
					var event = doc.createEvent( "Event" );
					event.initEvent( evt, true, true );
					event._args = args;
					event._namespace = namespace;

					this.dispatchEvent( event );
				} else if ( doc.createEventObject ) {
					if( ( "" + this[ evt ] ).indexOf( "function" ) > -1 ) {
						this.ssEventTrigger = {
							_namespace: namespace,
							_args: args
						};

						this[ evt ]();
					} else {
						doc.documentElement[ evt ] = {
							"el": this,
							_namespace: namespace,
							_args: args
						};
					}
				}
			}
		});
	};



	return shoestring;
}));

/*! X-rayHTML - v2.1.2 - 2016-05-18
* https://github.com/filamentgroup/x-rayhtml
* Copyright (c) 2016 Filament Group; Licensed MIT */
window.jQuery = window.jQuery || window.shoestring;

(function( $ ) {
  var xrayiframeid = 0;
  var pluginName = "xrayhtml",
		o = {
		text: {
			open: "View Source",
			close: "View Demo",
			titlePrefix: "Example",
			antipattern: "Do Not Use"
		},
		classes: {
			button: "btn btn-small",
			open: "view-source",
			sourcepanel: "source-panel",
			title: "xraytitle",
			antipattern: "antipattern"
		},
		initSelector: "[data-" + pluginName + "]",
		defaultReveal: "inline"
	},
	methods = {
		_create: function() {
			return $( this ).each(function() {
				var init = $( this ).data( "init." + pluginName );

				if( init ) {
					return false;
				}

				$( this )
					.data( "init." + pluginName, true )
					[ pluginName ]( "_init" )
					.trigger( "create." +  pluginName );
			});
		},
		_init: function() {
			var $self =	 $(this);

			$self.data( "id." + pluginName, xrayiframeid++);

			var method = $( this ).attr( "data-" + pluginName ) || o.defaultReveal;

			if( method === "flip" ) {
				$( this )[ pluginName ]( "_createButton" );
			}

			$( this )
				.addClass( pluginName + " " + "method-" + method )
			[ pluginName ]( "_createSource" );

			// use an iframe to host the source
			if( $(this).is("[data-" + pluginName + "-iframe]") ){

				// grab the snippet html to ship to the iframe
				var snippetHTML = $(this).find(".snippet").html();

				// grab the url of the iframe to load
				var url = $(this).attr("data-" + pluginName + "-iframe");

				// grab the selector for the element in the iframe to put the html in
				var selector = $(this).attr("data-" + pluginName + "-iframe-target");

				// create the iframe element, so we can bind to the load event
				var $iframe = $("<iframe src='" + url + "'/>");

				// get the scripts and styles to ship to the iframe
				// TODO we should support styles/scripts elsewhere in the page
				var headHTML = $( "head" ).html();

				// wait until the iframe loads to send the data
				$iframe.bind("load",function(){

					// wait for the iframe page to transmit the height of the page
					$(window).bind("message", function(event){
						var data = JSON.parse(event.data || event.originalEvent.data);

						if( data.iframeid !== $self.data("id." + pluginName) ){
							return;
						}

						$iframe.attr("height", data.iframeheight);
					});

					// send a message to the iframe with the snippet to load and any
					// assets that are required to make it look right
					$iframe[0].contentWindow.postMessage({
						html: snippetHTML,
						head: headHTML,
						id: $self.data("id." + pluginName),
						selector: selector
					}, "*");
				});

				// style the iframe properly
				$iframe.addClass("xray-iframe");

				// replace the snippet which is rendered in the page with the iframe
				$(this).find(".snippet").html("").append($iframe);
			}
		},
		_createButton: function() {
			var btn = document.createElement( "a" ),
				txt = document.createTextNode( o.text.open ),
				el = $( this );

			btn.setAttribute( "class", o.classes.button );
			btn.href = "#";
			btn.appendChild( txt );

			$( btn )
				.bind( "click", function( e ) {
					var isOpen = el.attr( "class" ).indexOf( o.classes.open ) > -1;

					el[ isOpen ? "removeClass" : "addClass" ]( o.classes.open );
					btn.innerHTML = ( isOpen ? o.text.open : o.text.close );

					e.preventDefault();

				})
				.insertBefore( el );
		},
		_createSource: function() {
			var el = this;
			var getPrefixText = function () {
				if( el.className.match( new RegExp( "\\b" + o.classes.antipattern + "\\b", "gi" ) ) ) {
					return o.text.antipattern;
				}
				return o.text.titlePrefix;
			};
			var title = el.getElementsByClassName( o.classes.title );
			var deprecatedTitle;
			var preel = document.createElement( "pre" );
			var codeel = document.createElement( "code" );
			var wrap = document.createElement( "div" );
			var sourcepanel = document.createElement( "div" );
			var code;
			var leadingWhiteSpace;
			var source;

			if( title.length ) {
				title = title[ 0 ];
				title.parentNode.removeChild( title );
				title.innerHTML = getPrefixText() + ": " + title.innerHTML;
			} else {
				deprecatedTitle = el.getAttribute( "data-title" );
				title = document.createElement( "div" );
				title.className = o.classes.title;
				title.innerHTML = getPrefixText() + ( deprecatedTitle ? ": " + deprecatedTitle : "" );
			}

			// remove empty value attributes
			code = el.innerHTML.replace( /\=\"\"/g, '' );
			leadingWhiteSpace = code.match( /(^[\s]+)/ );

			if( leadingWhiteSpace ) {
				code = code.replace( new RegExp( leadingWhiteSpace[ 1 ], "gmi" ), "\n" );
			}

			source = document.createTextNode( code );

			wrap.setAttribute( "class", "snippet" );

			$( el ).wrapInner( wrap );

			codeel.appendChild( source );
			preel.appendChild( codeel );

			sourcepanel.setAttribute( "class", o.classes.sourcepanel );
			sourcepanel.appendChild( preel );

			this.appendChild( sourcepanel );
			this.insertBefore( title, this.firstChild );
		}
	};

	// Collection method.
	$.fn[ pluginName ] = function( arrg, a, b, c ) {
		return this.each(function() {

			// if it's a method
			if( arrg && typeof( arrg ) === "string" ){
				return $.fn[ pluginName ].prototype[ arrg ].call( this, a, b, c );
			}

			// don't re-init
			if( $( this ).data( pluginName + "data" ) ){
				return $( this );
			}

			// otherwise, init
			$( this ).data( pluginName + "active", true );
			$.fn[ pluginName ].prototype._create.call( this );
		});
	};

	// add methods
	$.extend( $.fn[ pluginName ].prototype, methods );

	//  auto-init
	var initted;
	function init(){
		if( !initted ){
			$( o.initSelector )[ pluginName ]();
			initted = true;
		}
	}
	// init either on beforeenhance event or domready, whichever comes first.
	$( document ).bind("beforeenhance", init );
	$( init );


}( jQuery ));

// Input a credit card number string, returns a key signifying the type of credit card it is
(function( w ) {
	"use strict";

	var keys = {
		MASTERCARD: "MASTERCARD",
		VISA: "VISA",
		DISCOVER: "DISCOVER",
		AMEX: "AMEX"
	};

	var types = {};

	// 2221-2720 and 51-55
	types[ keys.MASTERCARD ] = /^(222[1-9]|22[3-9]|2[3-6]|27[01]|2720|5[1-5])/;

	types[ keys.VISA ] = /^4/;

	// 6011 or 65
	types[ keys.DISCOVER ] = /^6(011|22(12[6-9]|1[3-9]|[2-8]|9[0-1]|92[0-5])|4[4-9]|5)/;

	// 34 or 37
	types[ keys.AMEX ] = /^3[47]/;

	function CreditableCardType( val ) {
		for( var j in types ) {
			if( !!val.match( types[ j ] ) ) {
				return j;
			}
		}

		return -1;
	}

	CreditableCardType.KEYS = keys;
	CreditableCardType.TYPES = types;
	w.CreditableCardType = CreditableCardType;

}( typeof global !== "undefined" ? global : this ));

// Input a credit card number string, returns a key signifying the type of credit card it is
(function( w, $ ) {
	"use strict";

	var lengths = {
		MASTERCARD: 3,
		VISA: 3,
		DISCOVER: 3,
		AMEX: 4
	};

	function CreditableSecurityCode( securityCodeElement ) {
		this.$el = $( securityCodeElement );
		this.$creditCard = this.$el.closest( "form" ).find( "[data-creditable-creditcard]" );
		this.originalMaxlength = parseInt( this.$el.attr( "maxlength" ), 10 );

		var self = this;
		this.$creditCard.on( "change", function() {
			self.updateSecurityCode();
		});
		this.updateSecurityCode();
	}

	CreditableSecurityCode.prototype.updateSecurityCode = function() {
		var maxlen = this.getMaxlength();
		this.$el.attr( "maxlength", maxlen || this.originalMaxlength );
		this.$el.attr( "placeholder", this.getPlaceholder( maxlen || this.originalMaxLength ) );
	};

	CreditableSecurityCode.prototype.getMaxlength = function() {
		return lengths[ CreditableCardType( this.$creditCard.val() ) ];
	};

	CreditableSecurityCode.prototype.getPlaceholder = function( maxlen ) {
		var len = maxlen || this.getMaxlength() || 4;
		return ( new Array( len ) ).join( "0" ) + "0";
	};

	$(document).on( "enhance", function( e ) {
		$( e.target ).find( "[data-creditable-securitycode]" ).each(function() {
			var $t = $( this );
			var key = "creditable-securitycode";

			if( !$t.data( key ) ) {
				$t.data( key, new CreditableSecurityCode( this ) );
			}
		});
	});

	CreditableSecurityCode.LENGTHS = lengths;
	w.CreditableSecurityCode = CreditableSecurityCode;

}( typeof global !== "undefined" ? global : this, jQuery ));

(function( w, $ ){
	"use strict";

	var Politespace = function( element ) {
		if( !element ) {
			throw new Error( "Politespace requires an element argument." );
		}

		if( !element.getAttribute || window.operamini ) {
			// Cut the mustard
			return;
		}

		this.element = element;
		this.$element = $( element );
		this.delimiter = this.$element.attr( "data-delimiter" ) || " ";
		// https://en.wikipedia.org/wiki/Decimal_mark
		this.decimalMark = this.$element.attr( "data-decimal-mark" ) || "";
		this.reverse = this.$element.is( "[data-reverse]" );
		this.strip = this.$element.attr( "data-politespace-strip" );
		this.groupLength = this.$element.attr( "data-grouplength" ) || 3;

		var proxyAnchorSelector = this.$element.attr( "data-proxy-anchor" );
		this.$proxyAnchor = this.$element;
		this.$proxy = null;

		if( proxyAnchorSelector ) {
			this.$proxyAnchor = this.$element.closest( proxyAnchorSelector );
		}
	};

	Politespace.prototype._divideIntoArray = function( value ) {
		var split = ( '' + this.groupLength ).split( ',' ),
			isUniformSplit = split.length === 1,
			dividedValue = [],
			loopIndex = 0,
			groupLength,
			substrStart,
			useCharCount;

		while( split.length && loopIndex < value.length ) {
			if( isUniformSplit ) {
				groupLength = split[ 0 ];
			} else {
				// use the next split or the rest of the string if open ended, ala "3,3,"
				groupLength = split.shift() || value.length - loopIndex;
			}

			// Use min if we’re at the end of a reversed string
			// (substrStart below grows larger than the string length)
			useCharCount = Math.min( parseInt( groupLength, 10 ), value.length - loopIndex );

			if( this.reverse ) {
				substrStart = -1 * (useCharCount + loopIndex);
			} else {
				substrStart = loopIndex;
			}
			dividedValue.push( value.substr( substrStart, useCharCount ) );
			loopIndex += useCharCount;
		}

		if( this.reverse ) {
			dividedValue.reverse();
		}

		return dividedValue;
	};

	Politespace.prototype.format = function( value ) {
		var split;
		var val = this.unformat( value );
		if( this.strip ) {
			val = val.replace( new RegExp(  this.strip, 'g' ), "" );
		}
		var suffix = '';

		if( this.decimalMark ) {
			split = val.split( this.decimalMark );
			suffix = split.length > 1 ? this.decimalMark + split[ 1 ] : '';
			val = split[ 0 ];
		}

		return this._divideIntoArray( val ).join( this.delimiter ) + suffix;
	};

	Politespace.prototype.trimMaxlength = function( value ) {
		var maxlength = this.element.getAttribute( "maxlength" );
		// Note input type="number" maxlength does nothing
		if( maxlength ) {
			value = value.substr( 0, maxlength );
		}
		return value;
	};

	Politespace.prototype.getValue = function() {
		return this.trimMaxlength( this.element.value );
	};

	Politespace.prototype.update = function() {
		this.element.value = this.useProxy() || this.$element.attr( "type" ) === "password" ?
			this.getValue() :
			this.format( this.getValue() );
	};

	Politespace.prototype.unformat = function( value ) {
		return value.replace( new RegExp(  this.delimiter, 'g' ), '' );
	};

	Politespace.prototype.reset = function() {
		this.element.value = this.unformat( this.element.value );
	};

	Politespace.prototype.useProxy = function() {
		var pattern = this.$element.attr( "pattern" );
		var type = this.$element.attr( "type" );

		// this needs to be an attr check and not a prop for `type` toggling (like password)
		return type === "number" ||
			// When Chrome validates form fields using native form validation, it uses `pattern`
			// which causes validation errors when we inject delimiters. So use the proxy to avoid
			// delimiters in the form field value.
			// Chrome also has some sort of
			( pattern ? !( new RegExp( "^" + pattern + "$" ) ).test( this.delimiter ) : false );
	};

	Politespace.prototype.updateProxy = function() {
		if( this.useProxy() && this.$proxy.length ) {
			var html = this.format( this.getValue() );
			var width = this.element.offsetWidth;

			this.$proxy.html( html );

			if( width ) {
				this.$proxy.css( "width", width + "px" );
			}

			// Hide if empty, to show placeholder
			this.$proxy.closest( ".politespace-proxy" )[ html ? 'addClass' : 'removeClass' ]( "notempty" );
		}
	};

	Politespace.prototype.createProxy = function() {
		if( !this.useProxy() ) {
			return;
		}

		function sumStyles( el, props ) {
			var total = 0;
			var $el = $( el );
			for( var j=0, k=props.length; j<k; j++ ) {
				total += parseFloat( $el.css( props[ j ] ) );
			}
			return total;
		}

		var $el = $( "<div>" ).addClass( "politespace-proxy active" );
		var $nextSibling = this.$proxyAnchor.next();
		var $parent = this.$proxyAnchor.parent();

		this.$proxy = $( "<div>" ).addClass( "politespace-proxy-val" ).css({
			font: this.$element.css( "font" ),
			"padding-left": sumStyles( this.element, [ "padding-left", "border-left-width" ] ) + "px",
			"padding-right": sumStyles( this.element, [ "padding-right", "border-right-width" ] ) + "px",
			top: sumStyles( this.element, [ "padding-top", "border-top-width", "margin-top" ] ) + "px"
		});
		$el.append( this.$proxy );
		$el.append( this.$proxyAnchor );

		if( $nextSibling.length ) {
			$el.insertBefore( $nextSibling );
		} else {
			$parent.append( $el );
		}

		this.updateProxy();
	};

	Politespace.prototype.setGroupLength = function( length ) {
		this.groupLength = length;
		this.$element.attr( "data-grouplength", length );
	};

	w.Politespace = Politespace;

}( this, jQuery ));

// jQuery Plugin
(function( w, $ ) {
	"use strict";

	$( document ).bind( "politespace-init politespace-input", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-politespace-creditcard]" ) ) {
			return;
		}
		var pspace = $t.data( "politespace" );
		var val = $t.val();
		var adjustMaxlength = $t.is( "[data-politespace-creditcard-maxlength]" );
		var type = w.CreditableCardType( val );

		if( type === "AMEX" ) {
			pspace.setGroupLength( adjustMaxlength ? "4,6,5" : "4,6," );

			if( adjustMaxlength ) {
				$t.attr( "maxlength", 15 );
			}
		} else if( type === "DISCOVER" || type === "VISA" || type === "MASTERCARD" ) {
			pspace.setGroupLength( adjustMaxlength ? "4,4,4,4" : "4" );

			if( adjustMaxlength ) {
				$t.attr( "maxlength", 16 );
			}
		}
	});

}( typeof global !== "undefined" ? global : this, jQuery ));

// jQuery Plugin
(function( w, $ ) {
	"use strict";

	var maxlengthCacheKey = "politespace-us-telephone-maxlength";
	var eventName = "politespace-beforeblur.politespace-us-telephone";

	function cleanup( el ) {
		var $t = $( el );
		var val = $t.val();

		$t.val( val.replace( /^1/, "" ) );
	}

	// On init
	$( document ).bind( "politespace-init", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-politespace-us-telephone]" ) ) {
			return;
		}

		// Adjust maxlength
		var maxlength= $t.attr( "maxlength" );

		if( maxlength ) {
			$t.data( maxlengthCacheKey, parseInt( maxlength, 10 ) );

			cleanup( $t[ 0 ] );
			$t.off( eventName ).on( eventName, function() {
				$( this ).attr( "maxlength", $t.data( maxlengthCacheKey ) );
				cleanup( this );
			});
		}
	});

	// On input
	$( document ).bind( "politespace-input", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-politespace-us-telephone]" ) ) {
			return;
		}

		if( $t.val().indexOf( '1' ) === 0 ) {
			$t.attr( "maxlength", $t.data( maxlengthCacheKey ) + 1 );
		}
	});

}( typeof global !== "undefined" ? global : this, jQuery ));

/* global Politespace:true */
(function( $ ) {
	"use strict";

	// jQuery Plugin

	var componentName = "politespace",
		initSelector = "[data-" + componentName + "]";

	$.fn[ componentName ] = function(){
		return this.each( function(){
			var $t = $( this );
			if( $t.data( componentName ) ) {
				return;
			}

			var polite = new Politespace( this );
			if( polite.useProxy() ) {
				polite.createProxy();
			}

			$t.bind( "politespace-hide-proxy", function() {
					$( this ).closest( ".politespace-proxy" ).removeClass( "active" );
				})
				.bind( "politespace-show-proxy", function() {
					$( this ).closest( ".politespace-proxy" ).addClass( "active" );

					polite.update();
					polite.updateProxy();
				})
				.bind( "input keydown", function() {
					$( this ).trigger( "politespace-input" );

					polite.updateProxy();
				})
				.bind( "blur", function() {
					$( this ).trigger( "politespace-beforeblur" );

					polite.update();

					if( polite.useProxy() ){
						$( this ).trigger( "politespace-show-proxy" );
					}
				})
				.bind( "focus", function() {
					$( this ).trigger( "politespace-hide-proxy" );
					polite.reset();
				})
				.data( componentName, polite )
				.trigger( "politespace-init" );

			polite.update();
			polite.updateProxy();
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ) {
		var $sel = $( e.target ).is( initSelector ) ? $( e.target ) : $( initSelector, e.target );
		$sel[ componentName ]();
	});

}( jQuery ));

/*! validator - v2.0.6 - 2016-04-25
* https://github.com/filamentgroup/validator
* Copyright (c) 2016 Filament Group; Licensed MIT */
(function( $, w ){
	"use strict";

	var Validator = function( element, opts ){
		if( !element ){
			throw new Error( "Element passed into Validator is not valid" );
		}
		opts = opts || {};
		opts.validatorClass = opts.validatorClass || "invalid";
		opts.$applyElement = $( opts.applyElement && opts.applyElement.length ? opts.applyElement : element );

		this.opts = opts;
		this.element = element;
		this.$element = $( element );

		this.type = this.$element.attr( "data-validate" );
		this.required = this.$element.is( "[required]" );
		this.invalidValue = this.$element.attr( "data-invalid-value" ) || "-1";
	};

	Validator.prototype.config = {};

	Validator.prototype.copy = {};

	Validator.prototype.validate = function(){
		var value = this.getValue(),
			result = this._isValid( value ),
			$error;

		this.opts.$applyElement[ result ? "removeClass" : "addClass" ]( "invalid" );

		$error = this.getErrorMessageElement();
		if( !result ) {
			$error.html( this.getErrorMessage( value ) );
		} else {
			$error.remove();
		}
		return result;
	};

	Validator.prototype.invalidate = function(){
		var $error;

		this.opts.$applyElement.addClass( "invalid" );
		$error = this.getErrorMessageElement();
		$error.html( this.getErrorMessage( "invalid" ) );
	};

	Validator.prototype._isSelect = function() {
		return this.element.tagName.toLowerCase() === "select";
	};

	Validator.prototype._isCheckboxRadio = function() {
		var type = this.$element.attr( 'type' );
		return type === 'radio' || type === 'checkbox';
	};

	Validator.prototype.getValue = function() {
		var $els, arr, $options, $selected, self = this;

		if( this._isSelect() ) {
			$options = this.$element.find( 'option' );
			if( this.element.selectedIndex > -1 ){
				$selected = $options.filter(function() {
					return this.selected && !!this.value && !this.disabled;
				});
			} else {
				$selected = null;
			}
		} else if( this._isCheckboxRadio() ) {
			$els = this.$element.closest( "form, body" ).find( '[name="' + this.$element.attr( 'name' ) + '"]' ).filter(function() {
				return this.checked;
			});
		}

		if( $options && $options.length ){
			return $selected;
		}

		if( $els ) {
			arr = [];
			$els.each(function(){
				if( this.value !== "" && this.value !== self.invalidValue ) {
					arr.push( this.value );
				}
			});
			return arr;
		}

		return this.element.value;
	};

	Validator.prototype._isValid = function( value ) {
		var result = false,
			method = this[ 'validate' + this.type ];

		if( typeof value === "undefined" || value === null ) {
			return !this.required;
		}

		if( value.length ) { // string or array
			if( !this.type ){
				result = true;
			} else if( this.type && method ){
				result = method.call( this, value );
			}
		} else {
			result = !this.required;
		}

		return result;
	};

	Validator.prototype.getErrorMessageElement = function() {
		var callback = this.opts.getErrorAnchor,
			$anchor = callback ? callback.call( this ) : this.opts.$applyElement,
			isPlaceBefore = $anchor.is( '[data-validate-before]' ),
			$existingError = $anchor[ isPlaceBefore ? 'prev' : 'next' ]().filter( '.error-msg' );

		return $existingError.length ? $existingError : $( '<div>' ).addClass( 'error-msg' )[ isPlaceBefore ? 'insertBefore' : 'insertAfter' ]( $anchor );
	};

	/*
		Order of message selection, if they exist:

		{TYPE} is `required` or the key from `data-validate`:
			this.message{TYPE}()
			data-message
			data-{TYPE}-message
			this.copy.{TYPE}.message
	 */
	Validator.prototype.getErrorMessage = function( value ) {
		var key, msg;
		if( !(value && value.length) ){
			key = "required";
		} else {
			key = this.type;
		}
		msg = this.$element.attr( "data-message" ) ||
			this.$element.attr( "data-" + key + "-message" ) ||
			this.copy[ key ].message;

		return this[ "message" + key ] ?
			this[ "message" + key ].call( this, value, msg ) :
			msg;
	};

	w.Validator = Validator;

}( jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatebirthday = function( val ){
		var result = false;

		if ( new RegExp( this.config.birthday.pattern ).test( val ) ) {
			result = val;
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype.validateminlength = function( val ){
    var result = false,
        pattern = "^[0-9]{"+ this.$element.attr( "minlength" ) +"}$";

    if ( new RegExp( pattern ).test( val ) ) {
      result = val;
    }

    return result;
  };

}( Validator, jQuery, this ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validateccexpiration = function( value ){
		var result = false;

		if ( new RegExp( this.config.ccexpiration.pattern ).test( value ) ) {
			result = true;
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype._getCreditType = function( value ) {
		var card,
			cards = this.config.credit;

		for ( var i = 0; i < cards.length; i++ ) {
			card = cards[ i ];

			if ( new RegExp( card.regex ).test( value ) ) {
				return card;
			}
		}
	};

	Validator.prototype._findCreditField = function() {
		return this.$element.closest( "form" ).find( "[data-validate=credit]" );
	};

	Validator.prototype._findCvvField = function() {
		return this.$element.closest( "form" ).find( "[data-validate=cvv]" );
	};

	Validator.prototype.validatecvv = function( number ){
		if( isNaN( parseInt( number, 10 ) ) || parseInt( number, 10 ) < 0 ){
			return;
		}

		var cc = this._findCreditField(),
			result = false,
			card = this._getCreditType( cc[ 0 ].value );

		if( card && card.id ){
			result = number.toString().length === parseInt( card.cvvlength, 10 );
		}

		return result;
	};

	Validator.prototype.messagecvv = function(){
		var cc = this._findCreditField(),
			card = this._getCreditType( cc[ 0 ].value );

		return card && this.copy.cvv[ card.id ].message || this.copy.cvv.message;
	};

	Validator.prototype.validatecredit = function( value ){
		var number = value.replace( /\s/g , '').replace( /-/g, ''),
			card = this._getCreditType( number );

		return card && new RegExp( card.fullRegex ).test( number ) || false;
	};

	Validator.prototype.messagecredit = function( value ) {
		var card = this._getCreditType( value );

		return card && this.copy.credit[ card.id ].message || this.copy.credit.message;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validateemail = function( address ){
		var result = false;

		if ( new RegExp( this.config.email.pattern ).test( address ) ) {
			result = address;
		}

		return result;
	};
}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype._getValueLength = function( value ){
		if( this.$element.is( "[data-words]" ) ) {
			return value.match(/[^\s]+/g).length;
		}

		return value.length;
	};

	Validator.prototype._getMaxLength = function(){
		return this.$element.attr( "maxlength" ) || this.$element.attr( "data-maxlength" );
	};

	Validator.prototype.validatelength = function( value ){
		var result = false,
			min = this.$element.attr( "minlength" ),
			max = this._getMaxLength(),
			len = this._getValueLength( value );

		if( ( !min || len >= min ) && ( !max || len <= max ) ) {
			result = true;
		}

		return result;
	};

	Validator.prototype.messagelength = function( value, msg ){
		var min = this.$element.attr( "minlength" ),
			max = this._getMaxLength(),
			len = this._getValueLength( value ),
			msgType;

		if( this._isSelect() || this._isCheckboxRadio() ) {
			msgType = msg.options;
		} else if( this.$element.is( "[data-words]" ) ) {
			msgType = msg.words;
		} else {
			msgType = msg.characters;
		}

		if( min && len < min ) {
			return ( ( min !== 1 ? msgType.plural.minlength : msgType.singular.minlength ) || msg ).replace( /\{\d\}/g, min );
		} else if( max && len > max ) {
			return ( ( max !== 1 ? msgType.plural.maxlength : msgType.singular.maxlength ) || msg ).replace( /\{\d\}/g, max );
		}
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatenumeric = function( value ){
		var result = false;

		if ( new RegExp( this.config.numeric.pattern ).test( value ) ) {
			result = true;
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatepassword = function( val ){
		// TODO move functions out to methods
		var result = false,
			isCorrectLength = function( pw ){
				if( typeof pw === "string" && pw.length > 5 && pw.length < 16 ){
					return true;
				}
			},
			hasNumber = function( pw ){
				if( typeof pw === "string" && pw.match( /\d/ ) ){
					return true;
				}
			},
			hasLowerCase = function( pw ){
				if( typeof pw === "string" && pw.match( /[a-z]/ ) ){
					return true;
				}
			},
			hasUpperCase = function( pw ){
				if( typeof pw === "string" && pw.match( /[A-Z]/ ) ){
					return true;
				}
			};

			if( isCorrectLength( val ) && hasUpperCase( val ) && hasLowerCase( val ) && hasNumber( val ) ){
				result = val;
			}

		return result;
	};


}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatepasswordconfirm = function( val ){
		var $form = this.$element.closest( "form" ),
			passwords = $form.find( "[data-validate=password]" ),
			result = false,
			pw;

		if( passwords.length !== 1 ) {
			passwords = $form.find( "[data-passwordconfirm]");
		}

		if( passwords.length ){
			pw = passwords[0].value;
			if( pw === val ){
				result = val;
			}
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {
	Validator.prototype.validatephone = function( val ){
		var result = false;

		if ( new RegExp( this.config.phone.pattern ).test( val ) ) {
			result = val;
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {
	Validator.prototype.validatezip = function( number ){
		// TODO move the data.validator reference to parameter of the constructor
		var result = false;

		if ( new RegExp( this.config.zip.pattern ).test( number ) ) {
			result = number;
		}

		return result;
	};
}( Validator, jQuery, this ));

/*! validator - v2.0.6 - 2016-04-25
* https://github.com/filamentgroup/validator
* Copyright (c) 2016 Filament Group; Licensed MIT */
// Input a credit card number string, returns a key signifying the type of credit card it is
(function( w ) {
	"use strict";

	var types = {
		MASTERCARD: /^(2[2-7]|5[1-5])/, // 22-27 and 51-55
		VISA: /^4/,
		DISCOVER: /^6(011|5)/, // 6011 or 65
		AMEX: /^3[47]/ // 34 or 37
	};

	function CreditableCardType( val ) {
		for( var j in types ) {
			if( !!val.match( types[ j ] ) ) {
				return j;
			}
		}

		return -1;
	}

	CreditableCardType.TYPES = types;
	w.CreditableCardType = CreditableCardType;

}( typeof global !== "undefined" ? global : this ));

// Input a credit card number string, returns a key signifying the type of credit card it is
(function( w, $ ) {
	"use strict";

	var lengths = {
		MASTERCARD: 3,
		VISA: 3,
		DISCOVER: 3,
		AMEX: 4
	};

	function CreditableSecurityCode( securityCodeElement ) {
		this.$el = $( securityCodeElement );
		this.$creditCard = this.$el.closest( "form" ).find( "[data-creditable-creditcard]" );

		var self = this;
		this.$creditCard.on( "change", function() {
			self.updateSecurityCode();
		});
		this.updateSecurityCode();
	}

	CreditableSecurityCode.prototype.updateSecurityCode = function() {
		var maxlen = this.getMaxlength();
		if( maxlen ) {
			this.$el.attr( "maxlength", maxlen );
		} else {
			this.$el.removeAttr( "maxlength" );
		}
		this.$el.attr( "placeholder", this.getPlaceholder( maxlen || 4 ) );
	};

	CreditableSecurityCode.prototype.getMaxlength = function() {
		return lengths[ CreditableCardType( this.$creditCard.val() ) ];
	};

	CreditableSecurityCode.prototype.getPlaceholder = function( maxlen ) {
		var len = maxlen || this.getMaxlength() || 4;
		return ( new Array( len ) ).join( "0" ) + "0";
	};

	$(document).on( "enhance", function( e ) {
		$( e.target ).find( "[data-creditable-securitycode]" ).each(function() {
			var $t = $( this );
			var key = "creditable-securitycode";

			if( !$t.data( key ) ) {
				$t.data( key, new CreditableSecurityCode( this ) );
			}
		});
	});

	CreditableSecurityCode.LENGTHS = lengths;
	w.CreditableSecurityCode = CreditableSecurityCode;

}( typeof global !== "undefined" ? global : this, jQuery ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"birthday": {
			"pattern" : "^(0[1-9]|1[0-2])[ -\\/]?(0[1-9]|[12][0-9])|(0[469]|11)[ -\\/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[ -\\/]?(0[1-9]|[12][0-9]|3[01])$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"birthday": {
			"placeholder": "MM DD",
			"message" : "Birthday should be a two digit month and two digit day."
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"ccexpiration" : {
			"pattern" : "^[0-9]{4}[ -\\/\\.]?[0-9]{2}$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"ccexpiration": {
			"placeholder": "YYYY MM"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
/* global CreditableCardType:true */
/* global CreditableSecurityCode:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"credit": [
			{
				"id": "mastercard",
				"regex": CreditableCardType.TYPES.MASTERCARD,
				"fullRegex": "^(2[2-7]|5[1-5])\\d{14}$",
				"maxlength": "16",
				"cvvlength": CreditableSecurityCode.LENGTHS.MASTERCARD
			},
			{
				"id": "visa",
				"regex": CreditableCardType.TYPES.VISA,
				"fullRegex": "^4\\d{15}$",
				"maxlength": "16",
				"cvvlength": CreditableSecurityCode.LENGTHS.VISA
			},
			{
				"id": "discover",
				"regex": CreditableCardType.TYPES.DISCOVER,
				"fullRegex": "^6(011\\d{12}|5\\d{14})$",
				"maxlength": "16",
				"cvvlength": CreditableSecurityCode.LENGTHS.DISCOVER
			},
			{
				"id": "amex",
				"regex": CreditableCardType.TYPES.AMEX,
				"fullRegex": "^3[47]\\d{13}$",
				"maxlength": "15",
				"cvvlength": CreditableSecurityCode.LENGTHS.AMEX
			}
		]
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"credit" : {
			"placeholder": "0000 0000 0000 0000",
			"message": "Not a valid credit card number.",
			"visa": {
				"message": "Visa cards should have 16 digits."
			},
			"mastercard": {
				"message": "Mastercards should have 16 digits."
			},
			"discover": {
				"message": "Discover cards should have 16 digits."
			},
			"amex": {
				"message": "American Express cards should have 15 digits."
			}
		},
		"ccexpiration": {
			"placeholder": "YYYY MM"
		},
		"cvv" : {
			"message" : "Security code requires a valid card credit card number.",
			"visa": {
				"message": "Visa cards should have a 3 digit security code."
			},
			"mastercard": {
				"message": "Mastercards should have a 3 digit security code."
			},
			"discover": {
				"message": "Discover cards should have a 3 digit security code."
			},
			"amex": {
				"message": "American Express cards should have a 4 digit security code."
			}
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"email" : {
			"pattern" : "^\\S+@\\S+\\.\\S+$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"email" : {
			"message" : "Incorrect e-mail format."
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"length": {
			"message": {
				"characters": {
					"singular": {
						"minlength": "Needs to be at least one character.",
						"maxlength": "Needs to be less than or equal to one character."
					},
					"plural": {
						"minlength": "Needs to be at least {0} characters.",
						"maxlength": "Needs to be less than or equal to {0} characters."
					}
				},
				"options": {
					"singular": {
						"minlength": "Select at least one option.",
						"maxlength": "Select less than or equal to one option."
					},
					"plural": {
						"minlength": "Select at least {0} options.",
						"maxlength": "Select less than or equal to {0} options."
					}
				},
				"words": {
					"singular": {
						"minlength": "Needs to be at least one word.",
						"maxlength": "Needs to be less than or equal to one word."
					},
					"plural": {
						"minlength": "Needs to be at least {0} words.",
						"maxlength": "Needs to be less than or equal to {0} words."
					}
				}
			}
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"numeric": {
			"pattern": "[0-9]+"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"numeric": {
			"message": "Needs to be a number."
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
  $.extend( Validator.prototype.copy, {
    "password" : {
      "message" : "Passwords must contain at least 6 characters with an uppercase letter, a lowercase letter, and a number."
    }
  });

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
  $.extend( Validator.prototype.copy, {
    "passwordconfirm" : {
      "message" : "Passwords must match."
    }
  });

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"phone" : {
			"pattern" : "^[\\(]?[0-9]{3}[\\)]?[ -]?[0-9]{3}[ -]?[0-9]{4}$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"phone" : {
			"message" : "Phone numbers should have 10 digits."
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
  $.extend( Validator.prototype.copy, {
    "required" : {
      "message" : "This is required."
    }
  });

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"zip" : {
			"pattern" : "^\\d{5}(-?\\d{4})?$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"zip" : {
			"placeholder": "00000",
			"message" : "ZIP Code should be 5 or 9 digits."
		}
	});

}( Validator, jQuery ));
/*
 * ValidatorForm (page validation) component
 *
 * Copyright (c) 2014 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, w, undefined ){
	"use strict";

	var ValidatorForm = function( element, opts ){
		if( !element ){
			throw new Error( "Element passed into ValidatorForm is not defined" );
		}
		opts = opts || {};
		opts.title = opts.title || "The form is invalid";
		opts.message = opts.message || "Please review the form below and complete the required information.";

		this.opts = opts;
		this.element = element;
		this.errorShowing = false;
	};

	ValidatorForm.prototype._createMarkup = function(){
		return $( "<div class='validator-form'><div class='title'>" + this.opts.title + "</div><p>" + this.opts.message + "</p></div>" );
	};

	ValidatorForm.prototype._bindEvents = function(){
		var self = this;
		$( self.element ).bind( 'error.validator', function( e ) {
			if( !self.errorShowing ){
				self._createMarkup().prependTo( e.target );
				self.errorShowing = true;
			}
		});
	};

	ValidatorForm.prototype.init = function(){
		if( $( this.element ).data( "validatorform" ) ){
			return;
		}
		this._bindEvents();
		$( this.element ).data( "validatorform", this );
	};

	( w.componentNamespace = w.componentNamespace || w ).ValidatorForm = ValidatorForm;

}( jQuery, this ));

/*
 * page validator component init
 *
 * Copyright (c) 2014 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $ ) {

	var pluginName = "validatorform",
		initSelector = "[data-" + pluginName + "]";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var $t = $( this );
			new window.componentNamespace.ValidatorForm( this, {
				title: $t.attr( "data-error-title" ),
				message: $t.attr( "data-error-message" )
			}).init();
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery, this ));

/*! validator - v2.0.6 - 2016-04-25
* https://github.com/filamentgroup/validator
* Copyright (c) 2016 Filament Group; Licensed MIT */
/* global Validator:true */
/* global jQuery:true */
(function( $, window, undefined ) {

	var pluginName = "validator",
		dataKey = pluginName,
		formSubmitErrorEventName = 'error.validator',
		initSelector = "[required],[data-validate]";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var $el = $( this );

			if( $el.data( dataKey ) ) {
				return;
			}

			var validator = new Validator( this, {
				applyElement: $el.parents().filter( "input, textarea, label, .custom-select, [data-validator-anchor]" ).last()
			});

			$el.data( dataKey, validator );

			$el.bind( "blur", function() {
				validator.validate();
				//if( this.checkValidity ) {
				//	this.checkValidity();
				//}
			});

			//$el.bind( "invalid", function() {
			//	if( !( this.validity && this.validity.patternMismatch ) ) {
			//		validator.invalidate();
			//	}
			//});

			$el.closest( "form" ).bind( "submit", function( e ){
				if( !validator.validate() ){
					if( !e.isDefaultPrevented() ) {
						$( this ).trigger( formSubmitErrorEventName );
					}
					e.preventDefault();
				}
			});
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery, this ));
