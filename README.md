# mmyy-input-mask

A date input mask. Limits data entry to DD/DD or DD/DDDD where D is a digit (0-9).

## Installation 

Browserify:

    npm install --save @nib-components/mmyy-input-mask
    
Component:

    component install nib-components/mmyy-input-mask
    
## Usage

HTML:

    <input/>

JavaScript:

    var mask  = require('@nib-components/mmyy-input-mask');
    var el    = document.querySelector('input');
    
    mask(el);