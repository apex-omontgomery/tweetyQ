$.fn.extend({
	animateCss: function(animationName, callback) {
		var animationEnd = (function(el) {
			var animations = {
				animation: 'animationend',
				OAnimation: 'oAnimationEnd',
				MozAnimation: 'mozAnimationEnd',
				WebkitAnimation: 'webkitAnimationEnd'
			};

			for (var t in animations) {
				if (el.style[t] !== undefined) {
					return animations[t];
				}
			}
		})(document.createElement('div'));

		this.addClass('animated ' + animationName).one(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);

			if (typeof callback === 'function') callback();
		});

		return this;
	}
});

function renderProgressBarCircles(a, b, c) {
	var score1 = document.querySelector('#score1');
	var score2 = document.querySelector('#score2');
	var score3 = document.querySelector('#score3');
	var bar = new ProgressBar.Circle(score1, {
		color: '#28EBD2',
		trailColor: '#eee',
		trailWidth: 5,
		duration: 1400,
		easing: 'bounce',
		strokeWidth: 9,
		from: { color: '#28EBD2', a: 0 },
		to: { color: '#00C1C1', a: 0.9 },
		// Set default step function for all animate calls
		step: function(state, circle) {
			circle.path.setAttribute('stroke', state.color);
		}
	});
	var bar2 = new ProgressBar.Circle(score2, {
		color: '#FEE734',
		trailColor: '#eee',
		trailWidth: 5,
		duration: 1400,
		easing: 'bounce',
		strokeWidth: 9,
		from: { color: '#28EBD2', a: 0 },
		to: { color: '#FEE734', a: 1 },
		// Set default step function for all animate calls
		step: function(state, circle) {
			circle.path.setAttribute('stroke', state.color);
		}
	});
	var bar3 = new ProgressBar.Circle(score3, {
		color: '#FA1474',
		trailColor: '#eee',
		trailWidth: 5,
		duration: 1400,
		easing: 'bounce',
		strokeWidth: 9,
		from: { color: '#28EBD2', a: 0 },
		to: { color: '#FA1474', a: 1 },
		// Set default step function for all animate calls
		step: function(state, circle) {
			circle.path.setAttribute('stroke', state.color);
		}
	});

	bar.animate(a); // Number from 0.0 to 1.0
	bar2.animate(b); // Number from 0.0 to 1.0
	bar3.animate(c); // Number from 0.0 to 1.0
}

function renderBarChart(data) {
	var ctx = document.getElementById('myChart2').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: [1, 2, 3, 4, 5, 6, 7],
			datasets: [
				{
					data: [12, 19, 3, 17, 28, 24, 7],
					backgroundColor: [
						'#04A5FF',
						'#04A5FF',
						'#04A5FF',
						'#04A5FF',
						'#04A5FF',
						'#04A5FF',
						'#04A5FF'
					]
				}
			]
		},
		options: {
			title: {
				display: true,
				text: 'Reps Per Minute',
				fontColor: '#04A5FF',
				fontSize: 18
			},
			legend: {
				display: false
			}
		}
	});
}

function renderAllData(data) {
	data = {
		labels: [0, 5, 10, 15, 20, 25, 30, 35, 40],

		datasets: [
			{
				title: 'Reps Per Minute',
				values: [25, 20, 30, 35, 8, 32, 17, 4]
			}
		]
	};

	let chart = new Chart({
		parent: '#chart2', // or a DOM element
		data: data,
		type: 'bar', // or 'line', 'scatter', 'pie', 'percentage'
		height: 250,

		colors: ['#7cd6fd'],
		// hex-codes or these preset colors;
		// defaults (in order):
		// ['light-blue', 'blue', 'violet', 'red',
		// 'orange', 'yellow', 'green', 'light-green',
		// 'purple', 'magenta', 'grey', 'dark-grey']

		format_tooltip_x: d => (d + '').toUpperCase(),
		format_tooltip_y: d => d + ' pts'
	});

	var ctx3 = document.getElementById('myChart3').getContext('2d');
	var myChart = new Chart(ctx3, {
		type: 'line',
		data: {
			labels: [1, 2, 3, 4, 5, 6, 7],
			datasets: [
				{
					data: [12, 19, 3, 17, 6, 3, 7],
					backgroundColor: '#00C1C1',
					label: 'Back'
				},
				{
					data: [2, 29, 5, 5, 2, 3, 10],
					backgroundColor: '#FEE734',
					label: 'Balance'
				},
				{
					data: [3, 15, 20, 14, 9, 6, 14],
					backgroundColor: '#FA1474',
					label: 'Completion'
				}
			]
		},
		options: {
			legend: {}
		}
	});
}

$('.header').animateCss('fadeIn');
$('#data1').animateCss('fadeIn');
$('#data2').animateCss('fadeIn', function() {
	renderBarChart([]);
});
$('#data3').animateCss('fadeIn', function() {
	renderProgressBarCircles(0.79, 0.47, 0.84);
	setTimeout(function() {
		$('.infoStack').animateCss('fadeIn');
		$('.infoStack').each(function(ele) {
			console.log($('.infoStack').removeClass('noFade'));
		});
	}, 1000);
});
$('#data4').animateCss('fadeIn', function() {
	renderAllData();
});
