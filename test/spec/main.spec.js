'use strict';

describe('huge', function () {

	describe('Append menu to navigation', function() {

		it('should get window with is small or not', function() {
			document.documentElement.clientWidth = 768;
			expect(huge.isSmallWindow()).toBe(true);
		});

		it('should get is mobile or not', function() {
			window.ontouchstart = true;
			expect(huge.getSupportedEvent()).toBe('touchend');
		});

		it('should get menu data', function() {
			expect(huge.getNavData).toBeDefined();
		});

		it('should create a complete menu', function() {
			expect(huge.drawNav).toBeDefined();
		});

		it('should bind events', function() {
			expect(huge.bindEvents).toBeDefined();
		});

		it('should toggle submenu', function() {
			expect(huge.toggleSubmenu).toBeDefined();
		});

	});

});