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

  var successHandler = function (pins) {
    var mapOfPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPin(pins[i]));
    }

    mapOfPins.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var renderPins = function () {
    window.load(successHandler, errorHandler);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
