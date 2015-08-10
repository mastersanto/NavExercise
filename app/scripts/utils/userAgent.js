'use strict';

console.log('USER AGENT!!!!');

var isMobile = function() {
	function Android() {
		return navigator.userAgent.match(/Android/i);
	}
	function BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	}
	function iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
	function Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	}
	function Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	}
	function any() {
		console.log('navigator.userAgent > ', navigator.userAgent);
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
	return {
		any: any
	};
};
