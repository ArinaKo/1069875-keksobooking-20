'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adAddress = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');

  var mainPinKeydownHandler = function (evt) {
    window.util.isEnterEvent(evt, activePage);
  };

  var mainPinClickHandler = function (evt) {
    window.util.isMainButtonEvent(evt, activePage);
  };

  var inactivePage = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', '');
    }
    for (var j = 0; j < selects.length; j++) {
      selects[j].setAttribute('disabled', '');
    }

    adAddress.value = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.floor(mainPin.offsetTop + mainPin.offsetHeight / 2);

    mainPin.addEventListener('mousedown', mainPinClickHandler);
    mainPin.addEventListener('keydown', mainPinKeydownHandler);
  };

  var activePage = function () {
    map.classList.remove('map--faded');
    // var ads = window.data.getSimilarAds();
    window.pin.renderPins();
    adForm.classList.remove('ad-form--disabled');
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].removeAttribute('disabled');
    }
    for (var i = 0; i < selects.length; i++) {
      selects[i].removeAttribute('disabled');
    }

    window.util.changeAddress();

    mainPin.removeEventListener('mousedown', mainPinClickHandler);
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  };

  inactivePage();
})();
