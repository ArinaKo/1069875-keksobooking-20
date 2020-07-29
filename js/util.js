'use strict';

(function () {
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

  var addTextData = function (element, data, string) {
    if (data && string) {
      element.textContent = string;
    } else if (data) {
      element.textContent = data;
    } else {
      element.setAttribute('hidden', true);
    }
  };

  var addTwoTextData = function (element, data1, data2, string) {
    if (data1 && data2) {
      element.textContent = string;
    } else {
      element.setAttribute('hidden', true);
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === 'Enter') {
      action();
    }
  };

  var isMainButtonEvent = function (evt, action) {
    if (evt.which === 1) {
      action();
    }
  };

  var changeAddress = function () {
    var addressInput = document.querySelector('#address');
    var pin = document.querySelector('.map__pin--main');

    var PIN_SIZE = {
      width: 50,
      height: 70
    };

    addressInput.value = Math.floor(pin.offsetLeft + PIN_SIZE.width / 2) + ', ' + Math.floor(pin.offsetTop + PIN_SIZE.height);
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomOption: getRandomOption,
    getRandomOptions: getRandomOptions,
    addTextData: addTextData,
    addTwoTextData: addTwoTextData,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isMainButtonEvent: isMainButtonEvent,
    changeAddress: changeAddress
  };
})();
