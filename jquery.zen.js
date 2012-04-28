/**
 * @param	{document}	document
 * @param	{jQuery}	$
 * @param				[undef]
 */
(function (document, $, undef){
	'use strict';

	var
		  _rlive = /([a-z0-9:\.]+)(\s.+)?/

		, $dummy = $()
		, $document = $(document)
	;

	var zen = function ($ctx, obj){
		if( obj === undef ){
			obj		= $ctx;
			$ctx	= $document;
		}
		else {
			$ctx	= $ctx.jquery ? $ctx : $($ctx);
		}


		if( obj === '-' ){
			// .remove();
			$ctx.remove();
		}
		else if( typeof obj === 'function' ){
			$ctx.each(obj);
		}
		else {
			var key, first, val, name;

			for( key in obj ){
				val = obj[key];
				first = key.charAt(0);
				name = key.substr(1);

				switch( first ){
					case '': $ctx.each(val); break;

					case '#': // $('#...')
							zen($(document.getElementById(name)), val);
						break;

					case '^':
							if( name === '' )
								zen($ctx.parent(), val);
							else
								zen($ctx.closest(name), val);
						break;

					case '>': // .children(...)
					case '*': // .each/filter(...);
							zenFind(first, $ctx, name, val);
						break;

					case '-':
					case '+':
							zenToggle(first, $ctx, name, val);
						break;

					case '&': // delegate
							name = name.match(_rlive);
							$('body').delegate(name[2] ? name[2] : $ctx.selector, name[2] ? name[1] : name[0], val);
						break;

					case '=':
							$ctx.each(function (){
								$dummy[0] = this;
								$dummy.length = 1;
								$dummy['form' in this ? 'val' : 'html'](val);
							});
						break;

					default:
							if( key in $ctx ){
								// .methods(args)
								zenApply($ctx, key, val);
							}
							else {
								// .find()
								zen($ctx.find(key), val);
							}
						break;
				}
			}
		}

		return	$ctx;
	}


	var _append = {
		'+': 'append',
		'+>': 'appendTo',
		'+!': 'prependTo',
		'+^': 'insertBefore'
	};


	function zenToggle(mod, $ctx, name, val){
		switch( name ){
			case 'attr':
					zenApply($ctx, mod === '+' ? 'attr' : 'removeAttr', val);
				break;

			case 'class': // .addClass/removeClass(...)
					zenApply($ctx, mod === '+' ? 'addClass' : 'removeClass', val);
				break;

			case '*': // .prependTo
					zenApply($ctx, 'prependTo', val, true);
				break;

			case '>': // .appendTo
					zenApply($ctx, 'appendTo', val, true);
				break;

			case '': // .append(args);
					zenApply($ctx, 'append', val, true);
				break;

			default: // .bind/unbind(...)
					zenApply($ctx, mod === '+' ? 'bind' : 'unbind', [name, val]);
				break;
		}
	}


	function zenApply($ctx, method, args, zenArgs){
		if( zenArgs === true ){
			args = zenApplyArgs(args);
		}

		if( args === undef || args === null || args.constructor !== Array ){
			$ctx[method](args);
		}
		else {
			$ctx[method].apply($ctx, args);
		}
	}


	function zenApplyArgs(args){
		var ret = [], key, n;

		if( '0' in args ){
			for( key = 0, n = args.length; key < n; key += 1){
				if( typeof args[key] === 'string' ){
					ret.push($(args[key]));
				} else {
					ret = ret.concat(zenApplyArgs(args[key]));
				}
			}
		}
		else {
			for( key in args ){
				ret.push( zen(key, args[key]) );
			}
		}

		return	ret;
	}


	function zenFind(mod, $ctx, sel, val){
		if( sel === '' ){
			sel	= undef
		}

		if( mod == '>' ){
			zen($ctx.children(sel), val);
		}
		else if( sel === undef ){
			zen($ctx, val);
		}
		else {
			zen($ctx.find(sel), val);
		}
	}


	// @export
	$.zen = $.z = zen;
	$.fn.zen = $.fn.z = function (obj){
		zen(this, obj);
		return	this;
	};
})(document, window.jQuery);
