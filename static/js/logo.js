var scale = 'scale(1)';
document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
document.body.style.msTransform =   scale;       // IE 9
document.body.style.transform = scale; 

var logo = {
	container: document.getElementById('logo'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	animationData: logo
};

var anim = lottie.loadAnimation(logo)

var arrow = {
	container: document.getElementById('arrow'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	animationData: arrow
};

var anim1 = lottie.loadAnimation(arrow)

var text = {
	container: document.getElementById('text'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	animationData: text
};

var anim2 = lottie.loadAnimation(text)