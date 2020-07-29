'use strict';

(function () {
  var adRooms = document.querySelector('#room_number');
  var adCapacity = document.querySelector('#capacity');
  var adPrice = document.querySelector('#price');
  var adType = document.querySelector('#type');
  var adTimeIn = document.querySelector('#timein');
  var adTimeOut = document.querySelector('#timeout');

  var priceLaw = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
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
})();
