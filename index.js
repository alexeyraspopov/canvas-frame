function noop(){}

function timestamp(){
	return Date.now();
}

module.exports = function(options){
	var now, last = timestamp(), delta,
		update = options.update || noop,
		render = options.render || noop,
		context = options.context || throw new Error('context is missing'),
		step = 1 / (options.fps || 60);

	return function frame(){
		now = timestamp();
		delta += Math.min(1, (now - last) / 1000);

		while(delta > step){
			delta -= step;
			update();
		}

		render(context);
		last = now;
		requestAnimationFrame(frame);
	};
};
