var MaskedInput = require('masked-input');

var DIGIT = /^\d$/;

/**
 * Get whether a character is accepted
 * @param   {string} char
 * @returns {boolean}
 */
function accept(char) {
  return DIGIT.test(char);
}

/**
 * Format
 * @param event
 */
function changed(event) {
  var
    value = event.value,
    start = event.selectionStart,
    end   = event.selectionEnd
  ;

  //backspace the slash immediately to the left of the number
  if (event.name === 'BACKSPACE') {
    if (start === end && (start === 2)) {
      value = value.substr(0, start-1)+value.substr(start);
      --start;
      --end;
    }
  }

  //filter non-digit characters so we don't need to know where the digit was inserted
  for (var i=0; i<value.length; ++i) {
    if (!DIGIT.test(value[i])) {
      value = value.substr(0, i)+value.substr(i+1);
      if (start > i) --start;
      if (end > i) --end;
      --i;
    }
  }

  //add the first slash
  if ((event.name !== 'BACKSPACE' && value.length >= 2) || (event.name === 'BACKSPACE' && value.length > 2)) {
    value = value.substr(0, 2)+'/'+value.substr(2);
    if (start >= 2) ++start;
    if (end >= 2) ++end;
  }

  //set the value and position
  event.value           = value.substr(0, 7);
  event.selectionStart  = start;
  event.selectionEnd    = end;

}

module.exports = function(el) {
  return new MaskedInput({
    el:       el,
    accept:   accept,
    changed:  changed
  });
};

module.exports.accept = accept;
module.exports.changed = changed;