'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var typesOutput = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var renderCard = function (info) {
    var card = cardTemplate.cloneNode(true);

    window.util.addTextData(card.querySelector('.popup__title'), info.offer.title);
    window.util.addTextData(card.querySelector('.popup__text--address'), info.offer.address);
    window.util.addTextData(card.querySelector('.popup__text--price'), info.offer.price, info.offer.price + '₽/ночь');
    window.util.addTextData(card.querySelector('.popup__type'), info.offer.type, typesOutput[info.offer.type]);
    window.util.addTwoTextData(card.querySelector('.popup__text--capacity'), info.offer.rooms, info.offer.guests, 'Комнаты: ' + info.offer.rooms + ', для ' + info.offer.guests + ' гостей');
    window.util.addTwoTextData(card.querySelector('.popup__text--time'), info.offer.checkIn, info.offer.checkIn, 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout);
    window.util.addTextData(card.querySelector('.popup__description'), info.offer.description);

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
          features[i].classList.add('visually-hidden');
        }
      }
    } else {
      features.classList.add('visually-hidden');
    }

    if (info.offer.photos.length !== 0) {
      card.querySelector('.popup__photo').src = info.offer.photos[0];
      for (var z = 1; z < info.offer.photos.length; z++) {
        var img = cardTemplate.querySelector('.popup__photo').cloneNode(true);
        img.src = info.offer.photos[z];
        card.querySelector('.popup__photos').appendChild(img);
      }
    } else {
      card.querySelector('.popup__photos').classList.add('visually-hidden');
    }

    if (info.author.avatar) {
      card.querySelector('.popup__avatar').src = info.author.avatar;
    } else {
      card.querySelector('.popup__avatar').classList.add('visually-hidden');
    }

    var fragment = document.createDocumentFragment();
    fragment.appendChild(card);
    map.insertBefore(fragment, document.querySelector('.map__filters-container'));
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  var openCard = function (ad) {
    closeCard();
    renderCard(ad);
    var cardClose = document.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      closeCard();
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeCard = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  window.card = {
    openCard: openCard
  };
})();
