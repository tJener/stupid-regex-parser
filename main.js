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
    { name: 'char',                re: '([A-Za-z])'    },
    { name: 'wildcard',            re: '(\\.)'         },
    { name: 'kleene',              re: '(\\*)'         },
    { name: 'plus',                re: '(\\+)'         },
    { name: 'alternation',         re: '(\\|)'         },
    { name: 'group_start',         re: '(\\()'         },
    { name: 'group_end',           re: '(\\))'         },
    { name: 'negated_class_start', re: '(\\[\\^)'      },
    { name: 'class_start',         re: '(\\[)(?=[^^])' },
    { name: 'class_end',           re: '(\\])'         },
    { name: 'negate_class',        re: '(\\^)'         },
    { name: 'back_ref',            re: '\\\\(\\d+)'    }
  ]);

  console.log( lexer.tokenize( '.*SE.*UE.*' ));
  console.log( lexer.tokenize( '([^MC]|MM|CC)*' ));
});
