(function(window) {
	'use strict';

	/**
	 * HUGE spacename declaration
	 * @type {Object}
	 */
	var huge = huge || {};

	/**
	 * Get if the browser's width is small or not
	 * @return {Boolean} Browser's width is small or not
	 */
	huge.isSmallWindow =  function () {
		return document.documentElement.clientWidth < 768;
	};

	/**
	 * Get event supported by the browser
	 * @return {String} Event supported by the browser
	 */
	huge.getSupportedEvent = function () {
		var isTouch = ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
			supportedEvent = isTouch ? 'touchend' : 'click';

		return supportedEvent;
	};

	/**
	 * Ajax request to get navigation data
	 */
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

	/**
	 * Create main menu, append it to the header navigation
	 * @param {Array} menuItems to append
	 */
	huge.drawNav = function(menuItems) {
		// Create menu and its items
		var itemsLength = menuItems.length,
			menu = document.createElement('ul');

		/**
		 * createMenuItem for a list
		 * @param  {String} classEl to add to class attribute
		 * @param  {String} url     to add to href attribute
		 * @param  {String} label   for the menu item
		 * @return {Object}         item to append to the menu
		 */
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

		// Create menu items
		for (var i = 0; i < itemsLength; i++) {
			var subMenu,
				menuItem = menuItems[i],
				subMenuItems = menuItems[i].items,
				subItemsLength = subMenuItems.length,
				itemClass = subItemsLength ? 'menu-item has-submenu' : 'menu-item',
				item = createMenuItem(itemClass, menuItem.url, menuItem.label);

			// Create submenu
			if (subItemsLength) {
				subMenu = document.createElement('ul');
				subMenu.setAttribute('class', 'submenu');

				// Create submenu items
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

	/**
	 * bindEvents for this app
	 */
	huge.bindEvents = function () {
		var _this = this;

		// Add event listener for click/touch on the header
		this.$header.addEventListener(this.supportedEvent,
			/**
			 * Handle event on click header
			 * @param {Object} event on click header
			 */
			function (event) {
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
			}
		, false);

		// Add event listener for click/touch on the mask
		this.$mask.addEventListener(this.supportedEvent, function (event) {
			_this.hideActiveSubmenu();
			_this.toogleNavigation('remove');
			event.preventDefault();
		}, false);
	};

	/**
	 * toogleNavigation to activate or deactivate hamburguer, mask, header and footer
	 * @param {String} action to be applied to a ellemnt classList
	 */
	huge.toogleNavigation = function (action) {
		huge.$hamburguer.classList[action]('active');
		huge.$mask.classList[action]('active');
		huge.$header.classList[action]('active');
		huge.$footer.classList[action]('active');
	};

	/**
	 * hideActiveSubmenu hide an active submenu
	 */
	huge.hideActiveSubmenu = function () {
		var $activeItem = huge.$nav.getElementsByClassName('active')[0];

		if ($activeItem) {
			$activeItem.classList.remove('active');
		}
	};

	/**
	 * toggleSubmenu handle event when user clicks on a menu item with submenu
	 * @param {Object} $el Clicked Element
	 */
	huge.toggleSubmenu = function ($el) {
		var _this = this,
			maskClass = huge.$mask.classList;

		// if item is active
		if ($el.classList.contains('active')) {
			// remove navigation just for desktop
			if(!huge.isSmallWindow()) {
				huge.toogleNavigation('remove');
			}

			$el.classList.remove('active');

		// if item isn't active
		} else {
			huge.hideActiveSubmenu();
			huge.toogleNavigation('add');
			$el.classList.add('active');
		}
	};

	/**
	 * init
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

	// huge as global
	window.huge = huge;
	// Starts app
	huge.init();

})(window);