/*
 * stupid-regex-parser
 * https://github.com/tJener/stupid-regex-parser
 *
 * Copyright (c) 2013 Eric Li
 * Licensed under the MIT license.
 */

'use strict';

var requirejs = require('requirejs');

requirejs.config({
  baseUrl: 'lib',
  nodeRequire: require
});

requirejs([ 'lexer' ], function( Lexer ) {
  var lexer = new Lexer();
  lexer.setDefinitions([
    { name: 'char',                re: '([A-Za-z])' },
    { name: 'wildcard',            re: '(\\.)'      },
    { name: 'kleene',              re: '(\\*)'      },
    { name: 'maybe',               re: '(\\?)'      },
    { name: 'plus',                re: '(\\+)'      },
    { name: 'alternation',         re: '(\\|)'      },
    { name: 'group_start',         re: '(\\()'      },
    { name: 'group_end',           re: '(\\))'      },
    { name: 'negated_class_start', re: '(\\[\\^)'   },
    { name: 'class_start',         re: '(\\[)'      },
    { name: 'class_end',           re: '(\\])'      },
    { name: 'back_ref',            re: '\\\\(\\d+)' }
  ]);

  [ '.*SE.*UE.*',
    '.*LR.*RL.*',
    '.*OXR.*',
    '([^EMC]|EM)*',
    '(HHX|[^HX])*',
    '.*PRR.*DDC.*',
    '.*',
    '[AM]*CM(RC)*R?',
    '([^MC]|MM|CC)*',
    '(E|CR|MN)*',
    'P+(..)\\1.*',
    '[CHMNOR]*I[CHMNOR]*',
    '(ND|ET|IN)[^X]*'
  ].forEach(function( string ) {
    var tokens = lexer.tokenize( string );
    var transformedRegex = '';
    for ( var i = 0; i < tokens.length; ++i ) {
      var nextToken, token = tokens[i];
      switch ( token.name ) {
      case 'class_start':
        transformedRegex += token.value + ' ';
        nextToken = tokens[ i + 1 ];
        while ( nextToken.name === 'char' ) {
          transformedRegex += nextToken.value;
          nextToken = tokens[ ++i + 1 ];
        }
        break;

      case 'negated_class_start':
        transformedRegex += token.value;
        nextToken = tokens[ i + 1 ];
        while ( nextToken.name === 'char' ) {
          transformedRegex += nextToken.value;
          nextToken = tokens[ ++i + 1 ];
        }
        break;

      case 'back_ref':
        transformedRegex += '\\' + token.value;
        break;

      case 'char':
        transformedRegex += '[' + ' ' + token.value + ']';
        break;

      case '(end)':
        break;

      default:
        transformedRegex += token.value;
      }
    }

    console.log( transformedRegex );
  });
});
