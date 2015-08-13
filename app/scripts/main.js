(function(window) {
	'use strict';

	// Spacename declaration
	var huge = huge || {};

	huge.getSupportedEvent = function () {
		var isTouch = ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
			supportedEvent = isTouch ? 'touchend' : 'click';

		return supportedEvent;
	};

	huge.getNavData = function () {
		var navData,
			_this = this,
			url = '/api/nav.json',
			xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				navData = JSON.parse(xhr.responseText);
				_this.drawNav(navData.items);
			}
		};

		xhr.open('GET', url, true);
		xhr.send(null);
	};

	huge.drawNav = function(menuItems) {
		var itemsLength = menuItems.length,
			menu = document.createElement('ul');

		function createMenuItem(classEl, url, label) {
			var item = document.createElement('li'),
				link = document.createElement('a');

			link.setAttribute('href', url);
			link.setAttribute('class', classEl);
			link.textContent = label;
			item.appendChild(link);

			return item;
		}

		menu.setAttribute('class', 'menu');

		for (var i = 0; i < itemsLength; i++) {
			var subMenu,
				menuItem = menuItems[i],
				subMenuItems = menuItems[i].items,
				subItemsLength = subMenuItems.length,
				itemClass = subItemsLength ? 'menu-item has-submenu' : 'menu-item',
				item = createMenuItem(itemClass, menuItem.url, menuItem.label);

			if (subItemsLength) {
				subMenu = document.createElement('ul');
				subMenu.setAttribute('class', 'submenu');

				for (var j = 0; j < subMenuItems.length; j++) {
					var subMenuItem = subMenuItems[j],
						subItem = createMenuItem('submenu-item', subMenuItem.url, subMenuItem.label);

					subMenu.appendChild(subItem);
				}

				item.appendChild(subMenu);
			}

			menu.appendChild(item);
		}

		this.$nav.appendChild(menu);
		this.bindEvents();
	};

	huge.bindEvents = function () {
		var _this = this;

		this.$header.addEventListener(this.supportedEvent, function (event) {
			var $el = event.target,
				elClass = $el.classList;

			// Handle event on click menu item
			if (elClass.contains('has-submenu')) {
				_this.toggleSubmenu($el);

			} else {
				// Handle event on click hamburguer icon
				if (elClass.contains('hamburguer')) {
					_this.toogleNavigation();

				// Remove mask on click insise header outside nav for breakpoint >= 768px
				} else if(!_this.$hamburguer.classList.contains('active')) {
					console.log('HAMBURGUER IS ACTIVE');
					_this.$mask.classList.remove('active');
				}

				_this.hideActiveSubmenu();
			}

			event.preventDefault();
		}, false);

		this.$mask.addEventListener(this.supportedEvent, function (event) {
			_this.hideActiveSubmenu();
			_this.toogleNavigation();
			event.preventDefault();
		}, false);
	};

	huge.toogleNavigation = function () {
		console.log('toogleNavigation');
		huge.$hamburguer.classList.toggle('active');
		huge.$mask.classList.toggle('active');
		huge.$header.classList.toggle('active-nav');
		huge.$footer.classList.toggle('active-nav');
	};

	huge.hideActiveSubmenu = function () {
		console.log('hideActiveSubmenu');
		var $activeItem = huge.$nav.getElementsByClassName('active')[0];

		if ($activeItem) {
			$activeItem.classList.remove('active');
		}
	};

	huge.toggleSubmenu = function ($el) {
		console.log('toggleSubmenu', event);
		var _this = this,
			maskClass = huge.$mask.classList;

		if ($el.classList.contains('active')) {
			maskClass.remove('active');
			$el.classList.remove('active');
			huge.hideActiveSubmenu();
			huge.toogleNavigation();

		} else {
			maskClass.add('active');
			$el.classList.add('active');
			huge.toogleNavigation();
			huge.hideActiveSubmenu();
		}

		/*huge.hideActiveSubmenu();

		$el.classList.toggle('active');

		if ($el.classList.contains('active')) {
			maskClass.add('active');

		} else {
			maskClass.remove('active');
		}*/
	};

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	huge.init = function () {
		this.$header = document.getElementById('header');
		this.$nav = document.getElementById('nav');
		this.$hamburguer = document.getElementById('hamburguer');
		this.$footer = document.getElementById('footer');
		this.$mask = document.getElementById('mask');
		this.supportedEvent = this.getSupportedEvent();
		console.log('this.supportedEvent', this.supportedEvent);
		console.log('typeof', typeof this.supportedEvent);
		this.getNavData();
	};

	window.huge = huge;
	huge.init();

})(window);