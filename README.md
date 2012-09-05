# jquery.zen :]


## Old school
```js
$('.menu')
	.append('<li>last child</li>')
	.find('.disabled')
		.remove()
		.end()
	.addClass('ready')
	.on('click', '.item', function (){
		$(this)
			.closest('.menu')
				.children('.selected')
					.removeClass('selected')
					.end()
				.end()
			.addClass('selected')
		;
	})
	.find('.item')
		.each(function (){ /* each */ })
		.css({ cursor: 'pointer' })
		.filter('.selected')
			.attr({ title: 'filtred' })
			.end()
		.end()
	.click(function (){ /* click */ })
	.on('keyup', 'input', function (){ /* keyup */ })
	.find('textarea').val('').end()
	.find('.username').html('%username%')
;
```


<a name="zen"></a>
## Zen school
```js
$.zen('.menu', {
	'+': '<li>last child</li>', // .append()
	'.disabled': '-', // .remove()
	'+class': 'ready', // .addClass()
	'.item': { // .find()
		'&click': function (){ // .delegate()
			$.zen(this, {
				'^.menu': { // .closest()
					'>.selected': { // .children()
						'-.': 'selected' // .removeClass()
					}
				},
				'+.': 'selected', // .addClass()
			});
		},
		'hover': function (evt){
			$(this).z({
				// .toggleClass
				'+-.': [evt.type == 'mouseenter', 'hover_yes']
			});
		},
		'': function (){ /* each */ }
		css: { cursor: 'pointer' },
		'*.selected': { // .filter()
			attr: { title: 'filtred' }
		}
	},
	'click': function (){ /* click */ },
	'&keyup input': function (){ /* keyup */ },
	'textarea': { '=': '' }
	'.username': { '=': '%username%' }
});

// OR

$('.menu').z({
	find: { '.disabled': 'remove' },
	addClass: 'ready'
	/*...*/
})
```


## Zen

### .find
```js
	$('.items').z({
		'.sub-items': function (){
			/* each */
		}
	});

	$.z('.items', {
		'.sub-items': {
			'': function (){ /* each */ },
			css: { color: 'red' },
			'-attr': 'disabled'
		}
	});
```


### .children
```js
	$.z({
		ul: {
			'>': function (){ /* each children */ },
			'>.selected': '-' // remove selected children
		}
	})
```


### .filter
```js
	$.z({
		ul: {
			li: {
				'+class': 'item',
				'*:first': { '+class': 'first-item' }
			}
		}
	});
```


### .parent/.closest
```js
	// .parent
	$.z('li', {
		'^': { '+class': 'is-parent' }
	});


	// .closest
	$.z({
		'&click .item': function (){
			$.z(this, {
				'^.menu': {
					'.selected': { '-class': 'selected' }
				},
				'+class': 'selected'
			})
		}
	})
```



### .append
```js
	$.z('.items', { '+': '#id' });
	$.z('.items', { '+': ['#id', '.sel', { '#id': { '+class': 'sel' } } });
	$.z('.items', { '+': { '#id': { '+class': 'sel' } } });
```



### Я идиот, убейте меня кто-нибудь!!!1
