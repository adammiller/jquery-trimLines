jQuery Trim Lines
=================

Utility function for trimming a paragraph of text to a specific number of lines.

Preserves html, and allows restricting the trimming to a specific child element
while still measuring by the container

This is useful for cases where you have inline elements at the end of a paragraph 
which you'd like to preserve, such as a link.

License
-------

http://unlicense.org/ - i.e. do what you want with it :-)

Usage
-----

Trimlines accepts the following options: 

- maxLines - Maximum lines of text to allow. Defaults to 3. 
- trimTextSelector - Optional selector for restricting the text trimming to a child element
- truncationText - The text inserted if any truncation occurs. Defaults to '&hellip;'

$( '.celebrity-introduction' ).trimLines( { 'maxLines': 5, 'trimTextSelector': '.celebrity-bio' } );

Examples of use
---------------
