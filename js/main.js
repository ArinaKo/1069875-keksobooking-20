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

var typesOutput = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var priceLaw = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adAddress = document.querySelector('#address');
var adRooms = document.querySelector('#room_number');
var adCapacity = document.querySelector('#capacity');
var adPrice = document.querySelector('#price');
var adType = document.querySelector('#type');
var adTimeIn = document.querySelector('#timein');
var adTimeOut = document.querySelector('#timeout');
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

var similarAds = getSimilarAds();

var createPin = function (info) {
  var pin = pinTemplate.cloneNode(true);

  if (info.offer) {
    pin.style.left = info.location.x - PIN_SIZE.width / 2 + 'px';
    pin.style.top = info.location.y - PIN_SIZE.height + 'px';

    var avatar = pin.querySelector('img');
    avatar.src = info.author.avatar;
    avatar.alt = info.offer.title;

    pin.addEventListener('click', function () {
      pinClickHandler(info);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        pinClickHandler(info);
      }
    });


  } else {
    pin.setAttribute('hidden', true);
  }

  return pin;
};

var renderPins = function (pins, place) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }

  place.appendChild(fragment);
};

var renderCard = function (info) {
  var card = cardTemplate.cloneNode(true);

  checkElementOnEmptyness(card.querySelector('.popup__title'), info.offer.title);
  checkElementOnEmptyness(card.querySelector('.popup__text--address'), info.offer.address);
  checkElementOnEmptyness(card.querySelector('.popup__text--price'), info.offer.price, info.offer.price + '₽/ночь');
  checkElementOnEmptyness(card.querySelector('.popup__type'), info.offer.type, typesOutput[info.offer.type]);
  checkElementsOnEmptyness(card.querySelector('.popup__text--capacity'), info.offer.rooms, info.offer.guests, 'Комнаты: ' + info.offer.rooms + ', для ' + info.offer.guests + ' гостей');
  checkElementsOnEmptyness(card.querySelector('.popup__text--time'), info.offer.checkIn, info.offer.checkIn, 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout);
  checkElementOnEmptyness(card.querySelector('.popup__description'), info.offer.description);

  if (info.offer.features) {
    var features = card.querySelectorAll('.popup__feature');
    for (var i = 0; i < features.length; i++) {
      var count = false;
      for (var j = 0; j < info.offer.features.length; j++) {
        if (features[i].classList.contains('popup__feature--' + info.offer.features[j])) {
          count = true;
        }
      }
      if (count === false) {
        features[i].setAttribute('hidden', true);
      }
    }
  } else {
    features.setAttribute('hidden', true);
  }

  if (info.offer.photos) {
    card.querySelector('.popup__photo').src = info.offer.photos[0];
    for (var z = 1; z < info.offer.photos.length; z++) {
      var img = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      img.src = info.offer.photos[z];
      card.querySelector('.popup__photos').appendChild(img);
    }
  } else {
    card.querySelector('.popup__photos').setAttribute('hidden', true);
  }

  if (info.author.avatar) {
    card.querySelector('.popup__avatar').src = info.author.avatar;
  } else {
    card.querySelector('.popup__avatar').setAttribute('hidden', true);
  }

  var fragment = document.createDocumentFragment();
  fragment.appendChild(card);
  map.insertBefore(fragment, document.querySelector('.map__filters-container'));
};

var checkElementOnEmptyness = function (element, data, string) {
  if (data && string) {
    element.textContent = string;
  } else if (data) {
    element.textContent = data;
  } else {
    element.setAttribute('hidden', true);
  }
};

var checkElementsOnEmptyness = function (element, data1, data2, string) {
  if (data1 && data2) {
    element.textContent = string;
  } else {
    element.setAttribute('hidden', true);
  }
};

var mainPinClickHandler = function (evt) {
  if ((evt.which === 1) || (evt.key === 'Enter')) {

    map.classList.remove('map--faded');
    renderPins(similarAds, mapOfPins);
    adForm.classList.remove('ad-form--disabled');
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].removeAttribute('disabled');
    }
    for (var i = 0; i < selects.length; i++) {
      selects[i].removeAttribute('disabled');
    }
    adAddress.value = Math.floor(mainPin.offsetLeft + PIN_SIZE.width / 2) + ', ' + Math.floor(mainPin.offsetTop + PIN_SIZE.height);

    mainPin.removeEventListener('mousedown', mainPinClickHandler);
    mainPin.removeEventListener('keydown', mainPinClickHandler);
  }
};

mainPin.addEventListener('mousedown', mainPinClickHandler);
mainPin.addEventListener('keydown', mainPinClickHandler);

var pinClickHandler = function (ad) {
  closePopup();
  renderCard(ad);
  var cardClose = document.querySelector('.popup__close');
  cardClose.addEventListener('click', function () {
    closePopup();
  });
  document.addEventListener('keydown', onPopupEscPress);


};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var closePopup = function () {
  var popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  }
};

var capacityChangeHandler = function () {
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
  capacityChangeHandler();
});

adRooms.addEventListener('change', function () {
  capacityChangeHandler();
});

var validationOfPrice = function () {
  var value = Number(adPrice.value);
  var minValue = Number(adPrice.getAttribute('min'));

  if (value < minValue) {
    adPrice.setCustomValidity('Минимальная цена: ' + minValue);
    adPrice.reportValidity();
  } else {
    adPrice.setCustomValidity('');
  }
};

adPrice.addEventListener('input', function () {
  validationOfPrice();
});

var minPriceChangeHandler = function () {
  var minValue = Number(adPrice.getAttribute('min'));
  var type = adType.value;
  if (Number(priceLaw[type]) !== minValue) {
    adPrice.min = priceLaw[type];
    adPrice.placeholder = priceLaw[type];
  }
};

adType.addEventListener('change', function () {
  minPriceChangeHandler();
});

var timeChangeHandler = function (selectA, selectB) {
  var timeA = selectA.value;
  var timeB = selectB.value;
  if (timeB !== timeA) {
    selectB.value = timeA;
  }
};

adTimeIn.addEventListener('change', function () {
  timeChangeHandler(adTimeIn, adTimeOut);
});

adTimeOut.addEventListener('change', function () {
  timeChangeHandler(adTimeOut, adTimeIn);
});

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
