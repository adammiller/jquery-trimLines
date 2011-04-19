/**
 * jquery.trimLines.js
 * 
 * Utility function for trimming a paragraph of text to a specific number of lines.
 * 
 * Preserves html, and allows restricting the trimming to a specific child element
 * while still measuring by the container
 * 
 * This is useful for cases where you have inline elements at the end of a paragraph 
 * which you'd like to preserve, such as a link. 
 * 
 * 
 * Author: Adam Miller - adam@heyadammiller.com
 * License: http://unlicense.org/ (i.e. do what you want with it!)
 * 
 */
( function( $ ) {
	$.trimLines = {
		defaults: {
			'maxLines': 3, // Maximum lines of text to allow.
			'trimTextSelector': null, // Optional selector for restricting the text trimming to a child element
			'truncationText': '&hellip;' // The text inserted if any truncation occurs
		},
		fn: {
			// shortens a node's textLength while respecting it's child nodes
			// only removes a child node once it has no text remaining in it
			shortenNode: function ( node ) {
				// look at the last child node
				var childNode = node.lastChild;
				if( typeof childNode === "undefined" ) return;
				// is it empty? if so, remove it
				if ( childNode.textContent.length == 0 ) {
					node.removeChild( childNode );
				} else {
					childNode.textContent = childNode.textContent.substr( 0, childNode.textContent.length - 1 );
				}
			},
			getTargetHeight: function( $ele, lines ) {
				// calculate the target height by multiplying line height by number of lines
				var tHeight = parseFloat( $ele.css( 'line-height' ) ) * lines;
				// then give it buffer space of half a line
				tHeight += parseFloat( $ele.css( 'line-height' ) ) * .5;
				// return a whole number
				return Math.ceil( tHeight );
			}
		}
	};
	
	$.fn.trimLines = function( options ) {
		return this.each( function( ) {
			var context = $.extend( { }, $.trimLines.defaults, options );
			context.$container = $( this );
			context.$trimText = context.trimTextSelector ? 
				context.$container.find( context.trimTextSelector ) : 
					context.$container.wrapInner( '<span class="trimLines-text" />' ).find( '.trimLines-text' );
			context.originalText = context.$trimText.text();
			context.originalHTML = context.$trimText.html();
			var targetHeight = $.trimLines.fn.getTargetHeight( context.$trimText, context.maxLines );
			if( context.$container.height() <= targetHeight ) return;
			// insert the truncationText after the trimText
			var $truncationText = $( '<span class="trimLines-ellipsis">' + context.truncationText + '</span>' );
			context.$trimText.after( $truncationText );
			// take it down to our max lines
			while( context.$container.height() > targetHeight ) {
				$.trimLines.fn.shortenNode( context.$trimText.get( 0 ) );
			}
			// set our original text to the title attribute
			context.$trimText
				.attr( 'title', context.originalText );
			// stash our context
			context.$container
				.data( 'trimLines-context', context );
		} );
	};

} )( jQuery );