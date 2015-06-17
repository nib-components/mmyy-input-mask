var assert  = require('assert');
var input   = require('..');

var el;

function create() {
  el = document.createElement('input');
  return input(el);
}

describe('date-input', function() {

  describe('.accept()', function() {

    it('should accept digits', function() {
      assert(input.accept('0'));
      assert(input.accept('1'));
      assert(input.accept('2'));
      assert(input.accept('3'));
      assert(input.accept('4'));
      assert(input.accept('5'));
      assert(input.accept('6'));
      assert(input.accept('7'));
      assert(input.accept('8'));
      assert(input.accept('9'));
    });

  });

  describe('.changed()', function() {

    it('should change nothing when I enter a single digit', function() {

      var event = {
        name:           'INSERT',
        value:          '0',
        selectionStart: 1,
        selectionEnd:   1
      };

      input.changed(event);

      assert.equal(event.value, '0');
      assert.equal(event.selectionStart, 1);
      assert.equal(event.selectionEnd, 1);

    });

    it('should add a slash when I enter a month', function() {

      var event = {
        name:           'INSERT',
        value:          '03',
        selectionStart: 2,
        selectionEnd:   2
      };

      input.changed(event);

      assert.equal(event.value, '03/');
      assert.equal(event.selectionStart, 3);
      assert.equal(event.selectionEnd, 3);

    });

    it('should delete the digit to the left of a slash when I press backspace', function() {

      var event = {
        name:           'BACKSPACE',
        value:          '031984',
        selectionStart: 2,
        selectionEnd:   2
      };

      input.changed(event);

      assert.equal(event.value, '01/984');
      assert.equal(event.selectionStart, 1);
      assert.equal(event.selectionEnd, 1);

    });

  });

});