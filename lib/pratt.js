/*
 * stupid-regex-parser
 * https://github.com/tJener/stupid-regex-parser
 *
 * Copyright (c) 2013 Eric Li
 * Licensed under the MIT license.
 */

'use strict';

define([ 'assert' ], function( assert ) {
  var Rule = function( nud, led, lbp ) {
    this.nud = nud;
    this.led = led;
    this.lbp = lbp;
  };

  // http://effbot.org/zone/simple-top-down-parsing.htm
  var Pratt = function() {
    this.rules = {};

    this.token = null;
    this.tokens = null;
  };

  Pratt.prototype.addRule = (function() {
    var noopNud = function() {};
    var noopLed = function( left ) { return left; };

    return function( tokenName, nud, led, lbp ) {
      if ( !nud ) { nud = noopNud; }
      if ( !led ) { led = noopLed; }
      if ( !lbp ) { lbp = 0; }
      this.rules[ tokenName ] = new Rule( nud, led, lbp );
    };
  }());

  Pratt.prototype.parse = function( tokens ) {
    this.tokens = tokens;
    this.consume();
    return this.parseExpression( 0 );
  };

  Pratt.prototype.parseExpression = function( rbp ) {
    if ( !rbp ) { rbp = 0; }

    var t = this.token;
    this.consume();
    var rule = this.rules[ t.name ];
    var left = rule.nud.call( this, t );

    while ( rbp < rule.lbp ) {
      t = this.token;
      this.consume();
      rule = this.rules[ t.name ];
      left = rule.led.call( this, left, t );
    }

    return left;
  };

  Pratt.prototype.consume = function() {
    return this.token = this.tokens.shift();
  };

  return Pratt;
});
