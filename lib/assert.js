/*
 * stupid-regex-parser
 * https://github.com/tJener/stupid-regex-parser
 *
 * Copyright (c) 2013 Eric Li
 * Licensed under the MIT license.
 */

'use strict';

define(function() {
  var DEBUG = true;

  if ( DEBUG ) {
    return function( condition, msg ) {
      if ( !condition ) {
        throw new Error( msg );
      }
    };
  } else {
    return function( condition, msg ) {
      if ( !condition ) {
        console.log( msg );
      }
    };
  }
});
