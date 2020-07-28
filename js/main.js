'use strict';

var TITLE = 'Уютное местечко';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_OUTPUT = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
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

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adAddress = document.querySelector('#address');
var adRooms = document.querySelector('#room_number');
var adCapacity = document.querySelector('#capacity');
var mainPin = document.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var fieldsets = document.querySelectorAll('fieldset');
var selects = document.querySelectorAll('select');

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

var createPin = function (info) {
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
    fragment.appendChild(createPin(pins[i]));
  }

  place.appendChild(fragment);
};

var createCard = function (info) {
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = info.offer.title;
  card.querySelector('.popup__text--address').textContent = info.offer.address;
  card.querySelector('.popup__text--price').textContent = info.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = TYPES_OUTPUT[TYPES.indexOf(info.offer.type)];
  card.querySelector('.popup__text--capacity').textContent = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout;

  var features = card.querySelectorAll('.popup__feature');
  for (var i = 0; i < features.length; i++) {
    var count = false;
    for (var j = 0; j < info.offer.features.length; j++) {
      if (features[i].classList.contains('popup__feature--' + info.offer.features[j])) {
        count = true;
      }
    }
    if (count === false) {
      features[i].parentNode.removeChild(features[i]);
    }
  }

  card.querySelector('.popup__description').textContent = info.offer.description;
  if (info.offer.photos) {
    card.querySelector('.popup__photo').src = info.offer.photos[0];
    for (var z = 1; z < info.offer.photos.length; z++) {
      var img = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      img.src = info.offer.photos[z];
      card.querySelector('.popup__photos').appendChild(img);
    }
  } else {
    card.removeChild(card.querySelector('.popup__photos'));
  }

  if (info.author.avatar) {
    card.querySelector('.popup__avatar').src = info.author.avatar;
  } else {
    card.removeChild(card.querySelector('.popup__avatar'));
  }

  return card;
};

var mainPinClickHandler = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].removeAttribute('disabled');
  }
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  adAddress.value = Math.floor(mainPin.offsetLeft + PIN_SIZE.width / 2) + ', ' + Math.floor(mainPin.offsetTop + PIN_SIZE.height);
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    mainPinClickHandler();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    mainPinClickHandler();
  }
});

var selectChangeHandler = function () {
  var selRoomsOption = Number(adRooms.value);
  var selCapacity = Number(adCapacity.value);
  if (selCapacity !== 0 && selCapacity > selRoomsOption) {
    adCapacity.setCustomValidity('Количество гостей не должно превышать количество комнат.');
    adCapacity.reportValidity();
  } else if (selCapacity !== 0 && selRoomsOption === 100) {
    adCapacity.setCustomValidity('Жилье со 100 комнатами не предназначено для гостей.');
    adCapacity.reportValidity();
  } else if (selCapacity === 0 && selRoomsOption !== 100) {
    adCapacity.setCustomValidity('Пригласите гостей.');
    adCapacity.reportValidity();
  } else {
    adCapacity.setCustomValidity('');
  }
};

adCapacity.addEventListener('change', function () {
  selectChangeHandler();
});

adRooms.addEventListener('change', function () {
  selectChangeHandler();
});

// var selRoomsOption = adRooms.options[adRooms.options.selectedIndex].value;
// var similarAds = getSimilarAds();
// renderPins(similarAds, mapOfPins);

// var fragment = document.createDocumentFragment();
// fragment.appendChild(createCard(similarAds[0]));
// document.querySelector('.map').insertBefore(fragment, document.querySelector('.map__filters-container'));
var inactivePage = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', '');
  }
  for (var j = 0; j < selects.length; j++) {
    selects[j].setAttribute('disabled', '');
  }

  adAddress.value = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.floor(mainPin.offsetTop + mainPin.offsetHeight);
};

inactivePage();
