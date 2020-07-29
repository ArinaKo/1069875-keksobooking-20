'use strict';

(function () {
  var TITLE = 'Уютное местечко';
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = 'Блаблабла';
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var mapOfPins = document.querySelector('.map__pins');
  var limitOfPin = {
    minX: 0,
    maxX: mapOfPins.offsetWidth,
    minY: 130,
    maxY: 630
  };

  var generateAd = function (i) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLE,
        address: window.util.getRandomNumber(1, 100) * 10 + ', ' + window.util.getRandomNumber(1, 100) * 10,
        price: window.util.getRandomNumber(8, 100) * 100,
        type: window.util.getRandomOption(TYPES),
        rooms: window.util.getRandomNumber(1, 10),
        guests: window.util.getRandomNumber(1, 20),
        checkin: window.util.getRandomOption(CHECK_TIMES),
        checkout: window.util.getRandomOption(CHECK_TIMES),
        features: window.util.getRandomOptions(FEATURES),
        description: DESCRIPTION,
        photos: window.util.getRandomOptions(PHOTOS)
      },
      location: {
        x: window.util.getRandomNumber(limitOfPin.minX, limitOfPin.maxX),
        y: window.util.getRandomNumber(limitOfPin.minY, limitOfPin.maxY)
      }
    };
    return ad;
  };

  var getSimilarAds = function () {
    var ads = [];
    for (var i = 0; i < 8; i++) {
      ads[i] = generateAd(i);
    }
    return ads;
  };

  window.data = {
    getSimilarAds: getSimilarAds
  };
})();
