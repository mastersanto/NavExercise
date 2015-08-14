'use strict';

describe('huge', function () {

	describe('Append menu to navigation', function() {

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