(function(window) {
	'use strict';

	// Spacename declaration
	var huge = huge || {};

	huge.isSmallWindow =  function () {
		return document.documentElement.clientWidth < 768;
	};

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
			var action,
				$el = event.target,
				elClass = $el.classList;

			// Handle event on click menu item
			if (elClass.contains('has-submenu')) {
				_this.toggleSubmenu($el);

			// Handle event on click hamburguer icon
			} else if (elClass.contains('hamburguer')) {
				action = elClass.contains('active') ? 'remove' : 'add';
				_this.toogleNavigation(action);

			// Handle event on click mask
			} else {
				huge.toogleNavigation('remove');
				_this.hideActiveSubmenu();
			}

			event.preventDefault();
		}, false);

		this.$mask.addEventListener(this.supportedEvent, function (event) {
			_this.hideActiveSubmenu();
			_this.toogleNavigation('remove');
			event.preventDefault();
		}, false);
	};

	huge.toogleNavigation = function (action) {
		huge.$hamburguer.classList[action]('active');
		huge.$mask.classList[action]('active');
		huge.$header.classList[action]('active');
		huge.$footer.classList[action]('active');
	};

	huge.hideActiveSubmenu = function () {
		var $activeItem = huge.$nav.getElementsByClassName('active')[0];

		if ($activeItem) {
			$activeItem.classList.remove('active');
		}
	};

	huge.toggleSubmenu = function ($el) {
		var _this = this,
			maskClass = huge.$mask.classList;

		if ($el.classList.contains('active')) {
			// remove navigation just for desktop
			if(!huge.isSmallWindow()) {
				huge.toogleNavigation('remove');
			}

			$el.classList.remove('active');

		} else {
			huge.hideActiveSubmenu();
			huge.toogleNavigation('add');
			$el.classList.add('active');
		}
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
		this.getNavData();
	};

	window.huge = huge;
	huge.init();

})(window);