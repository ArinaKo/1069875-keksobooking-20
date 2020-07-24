'use strict';

var TITLE = 'Уютное местечко';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = 'Блаблабла';
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_SIZE = {
  width: 50,
  height: 70
};
var mapOfPins = document.querySelector('.map__pins');
var limitOfPin = {
  minX: 0,
  maxX: mapOfPins.offsetWidth,
  minY: 130,
  maxY: 630
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomOption = function (options) {
  var i = getRandomNumber(0, options.length - 1);
  return options[i];
};

var getRandomOptions = function (options) {
  var newArray = [];
  newArray.length = getRandomNumber(1, options.length);
  var i = 0;
  while (i < newArray.length) {
    var newElement = getRandomOption(options);
    if (!newArray.includes(newElement)) {
      newArray[i] = newElement;
      i++;
    }
  }
  return newArray;
};

var getSimilarAds = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLE,
        address: getRandomNumber(1, 100) * 10 + ', ' + getRandomNumber(1, 100) * 10,
        price: getRandomNumber(8, 100) * 100,
        type: getRandomOption(TYPES),
        rooms: getRandomNumber(1, 10),
        guests: getRandomNumber(1, 20),
        checkin: getRandomOption(CHECK_TIMES),
        checkout: getRandomOption(CHECK_TIMES),
        features: getRandomOptions(FEATURES),
        description: DESCRIPTION,
        photos: getRandomOptions(PHOTOS)
      },
      location: {
        x: getRandomNumber(limitOfPin.minX, limitOfPin.maxX),
        y: getRandomNumber(limitOfPin.minY, limitOfPin.maxY)
      }
    };

    ads[i] = ad;
  }
  return ads;
};

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (info) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = info.location.x - PIN_SIZE.width / 2 + 'px';
  pin.style.top = info.location.y - PIN_SIZE.height + 'px';

  var avatar = pin.querySelector('img');
  avatar.src = info.author.avatar;
  avatar.alt = info.offer.title;

  return pin;
};

var renderPins = function (pins, place) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }

  place.appendChild(fragment);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

renderPins(getSimilarAds(), mapOfPins);
