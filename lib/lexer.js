/*
 * stupid-regex-parser
 * https://github.com/tJener/stupid-regex-parser
 *
 * Copyright (c) 2013 Eric Li
 * Licensed under the MIT license.
 */

'use strict';

define([ 'assert' ], function( assert ) {
  var Token = function( name, value ) {
    this.name = name;
    this.value = value;
  };

  var TokenDef = function( name, regex ) {
    this.name = name;
    this.re = regex;
  };

  var Lexer = function() {
    this.index = 0;
    this.tokenDefs = [];
  };

  Lexer.prototype.setDefinitions = function( arr ) {
    this.tokenDefs.length = 0;

    arr.forEach(function( def ) {
      var name = def.name;
      var reStr = def.regex || def.re;

      assert( name, 'Expecting “name” property' );
      assert( reStr, 'Expecting “regex” or “re” property' );
      assert( typeof reStr === 'string', 'Expecting “regex” or “re” to be a String' );

      if ( reStr[0] !== '^' ) {
        reStr = '^' + reStr;
      }

      var re = new RegExp( reStr, 'g' );

      this.tokenDefs.push( new TokenDef( name, re ));
    }, this );
  };

  Lexer.prototype.tokenize = function( string ) {
    this.index = 0;

    var tokens = [];
    while ( this.index < string.length ) {
      var oldIndex = this.index;

      for ( var i = 0; i < this.tokenDefs.length; ++i ) {
        var def = this.tokenDefs[i];
        def.re.lastIndex = 0;

        var match, str = string.substr( this.index );
        if ( match = def.re.exec( str )) {
          this.index += def.re.lastIndex;
          var token = new Token( def.name, match[1] );
          tokens.push( token );
          break;
        }
      }

      assert( this.index !== oldIndex, 'Failed to parse' );
    }

    tokens.push( new Token( '(end)', null ));
    return tokens;
  };

  return Lexer;
});
