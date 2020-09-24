// META: script=/resources/WebIDLParser.js
// META: script=/resources/idlharness.js
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js

// https://w3c.github.io/screen-fold/

'use strict';

idl_test(
  ['screen-fold'],
  ['cssom-view', 'dom'],
  async idl_array => {
    idl_array.add_objects({
      ScreenFold: ['window.screen.fold'],
    });
  }
);
