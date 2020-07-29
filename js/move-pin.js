'use strict';

(function () {
  var pin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map__pins');

  var pinWidth = 65;

  var MOVE_LIMIT_Y = {
    min: 130,
    max: 630
  };
  var MOVE_LIMIT_X = {
    min: map.offsetLeft - Math.floor(pinWidth / 2),
    max: map.clientWidth - Math.floor(pinWidth / 2)
  };

  var checkLimit = function (data, limit) {
    if (data < limit.min) {
      return limit.min;
    } else if (data > limit.max) {
      return limit.max;
    } else {
      return data;
    }
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startLocation = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startLocation.x - moveEvt.clientX,
        y: startLocation.y - moveEvt.clientY,
      };

      startLocation = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pin.style.top = checkLimit(pin.offsetTop - shift.y, MOVE_LIMIT_Y) + 'px';
      pin.style.left = checkLimit(pin.offsetLeft - shift.x, MOVE_LIMIT_X) + 'px';
      window.util.changeAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
