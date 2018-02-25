var card = 0;
list = [];

function getColor(str) {
	if (str == 'cardio') {
		return '#E18700';
	} else if (str == 'leg') {
		return '#00A215';
	} else if (str == 'chest') {
		return '#BD00AC';
	} else if (str == 'arm') {
		return '#F10000';
	} else {
		return '#0040BA';
	}
}
firebase
	.database()
	.ref('/cards')
	.once('value')
	.then(function(snapshot) {
		list = snapshot.val();
		console.log('hiii');
		console.log(list);
	});

function getCard() {
	var meep = document.querySelectorAll('.hold');

	if (list.length > 0) {
		for (i = 0; i < 5; i++) {
			var cardStr = list[card][i];
			meep[i].setAttribute('src', 'assets/' + cardStr + '.svg');
			meep[i].parentElement.setAttribute(
				'style',
				'background: ' + getColor(cardStr) + ';'
			);
		}
	} else {
		firebase
			.database()
			.ref('/cards/' + String(card))
			.once('value')
			.then(function(snapshot) {
				var val = snapshot.val();

				for (i = 0; i < 5; i++) {
					var cardStr = val[i];

					meep[i].setAttribute('src', 'assets/' + cardStr + '.svg');
					meep[i].parentElement.setAttribute(
						'style',
						'background: ' + getColor(cardStr) + ';'
					);

					var test = 'background: ' + getColor(cardStr) + ';';
					console.log(test);
				}
			});
	}
}

function nextCard() {
	card++;
	if (card == 6) {
		card = 0;
	}

	getCard();
}

var noButton = document.querySelector('.icon');
console.log(noButton);
noButton.addEventListener('click', function() {
	console.log('hi');
	nextCard();
});

var yesButton = document.querySelector('.icon2');

yesButton.addEventListener('click', function() {
	window.location = 'match.html';
});

nextCard();
nextCard();
getCard();
console.log('hi');

document.querySelector('.body-container').addEventListener('click', function() {
	console.log('hi');
	window.location = 'description.html';
});
