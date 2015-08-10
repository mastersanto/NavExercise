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

		for (var i = 0; i < itemsLength; i++) {
			var subMenu,
				menuItem = menuItems[i],
				item = createMenuItem('menu-item', menuItem.url, menuItem.label),
				subMenuItems = menuItems[i].items,
				subItemsLength = subMenuItems.length;

			if (subItemsLength) {
				subMenu = document.createElement('ul');

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
	};

	huge.init = function () {
		//var self = this;
		this.$nav = document.getElementById('nav');
		this.getNavData();
		return;
	};

	window.huge = huge;
	huge.init();



	/*
	//huge.utils.isMobile = isMobile;
	huge.utils.isMobile = require('./utils/userAgent');

	console.log('huge.utils.isMobile > ', huge.utils.isMobile);

	huge.getNavigation = function() {
		console.log('getNav!');
	};*/

})(window);