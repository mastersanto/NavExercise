(function(window) {
	'use strict';

	// Spacename declaration
	var huge = huge || {};

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

		return;
	};

	huge.drawNav = function(menuItems) {
		var _this = this,
			itemsLength = menuItems.length,
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
				item = createMenuItem('menu-item', menuItem.url, menuItem.label),
				subMenuItems = menuItems[i].items,
				subItemsLength = subMenuItems.length;

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
		var _this = this,
			$hamburguer = document.getElementById('hamburguer'),
			isTouch = function () {
				return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
			};

		this.$nav.addEventListener('click', this.toggleSubmenu, false);
		$hamburguer.addEventListener('click', this.showNav, false);

		/*if (isTouch()) {
			concole.log('is touch!');
			this.$nav.addEventListener('touchend', this.toggleSubmenu, false);
			$hamburguer.addEventListener('touchend', this.showNav, false);

		} else {
			concole.log('not touch!');
			this.$nav.addEventListener('click', this.toggleSubmenu, false);
			$hamburguer.addEventListener('click', this.showNav, false);
		}*/
	};

	huge.showNav = function (event) {
		console.log('showNav > ', event);
		event.preventDefault();
	};

	huge.toggleSubmenu = function (event) {
		console.log('toggleSubmenu', event);
		var $el = event.target,
			_this = this,
			$activeItem = huge.$nav.getElementsByClassName('active')[0];

		if ($el.classList.contains('menu-item') && $el.nextSibling) {
			if ($activeItem) {
				$activeItem.classList.remove('active');
			}

			$el.classList.toggle('active');
		}

		event.preventDefault();
	};

	huge.init = function () {
		//var self = this;
		this.$nav = document.getElementById('nav');
		this.getNavData();
		return;
	};

	window.huge = huge;
	huge.init();

})(window);