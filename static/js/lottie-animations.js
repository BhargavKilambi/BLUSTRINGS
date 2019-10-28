var preloaderAnimation = lottie.loadAnimation({
	container: document.getElementById('preloader'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	animationData: preloader
});

var logoAnimation = lottie.loadAnimation({
	container: document.querySelector('.intro-logo'),
	renderer: 'svg',
	loop: true,
	autoplay: false,
	animationData: logo
});


$(window).on('load', function() {
	// Take a second, let everything setup or we create jank
	setTimeout(function() {
		// Fade out preloader
		$("#preloader").fadeOut("slow");

		// Destroy preloader, we don't need it
		setTimeout(function() {
			preloaderAnimation.stop();
			preloaderAnimation.destroy();
		}, 2000);

		// Wait for preloader to hide, then start logo animation
		setTimeout(function() {
			logoAnimation.play();
		}, 500);
	}, 1000);
});
