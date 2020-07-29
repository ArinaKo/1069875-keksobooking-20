'use strict';

(function () {
  var PIN_SIZE = {
    width: 50,
    height: 70
  };

  var createPin = function (info) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);

    if (info.offer) {
      pin.style.left = info.location.x - PIN_SIZE.width / 2 + 'px';
      pin.style.top = info.location.y - PIN_SIZE.height + 'px';

      var avatar = pin.querySelector('img');
      avatar.src = info.author.avatar;
      avatar.alt = info.offer.title;

      pin.addEventListener('click', function () {
        window.card.openCard(info);
      });

      pin.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, window.card.openCrad(info));
      });
    } else {
      pin.setAttribute('hidden', true);
    }

    return pin;
  };

  var renderPins = function (pins) {
    var mapOfPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPin(pins[i]));
    }

    // pins.forEach(function (pin) {
    // fragment.appendChild(createPin(pin));
    // });

    mapOfPins.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
