// Stole this from https://github.com/yeoman/stringify-object
// and manually converted it over to be browser safe

// eslint-disable-next-line no-unused-vars
function beautifyJSON (val) {
  function isRegexp (re) {
    return Object.prototype.toString.call(re) === '[object RegExp]';
  }

  function isObj (val) {
    let type = typeof(val);
    return val !== null && (type === 'object' || type === 'function');
  }

  function getOwnEnumPropSymbols (object) {
    return Object.getOwnPropertySymbols(object).filter(function (keySymbol) {
      return object.propertyIsEnumerable(keySymbol);
    });
  }

  const seen = [];

  return (function stringify (val, options, pad) {
    options = options || {};
    options.indent = options.indent || '  ';
    pad = pad || '';
    let tokens = {
      newLine: '\n',
      pad: pad,
      indent: pad + options.indent
    };

    if (seen.indexOf(val) !== -1) {
      return '"[Circular]"';
    }

    if (val === null ||
      val === undefined ||
      typeof val === 'number' ||
      typeof val === 'boolean' ||
      typeof val === 'function' ||
      typeof val === 'symbol' ||
      isRegexp(val)) {
      return String(val);
    }

    if (val instanceof Date) {
      return `new Date('${val.toISOString()}')`;
    }

    if (Array.isArray(val)) {
      if (val.length === 0) {
        return '[]';
      }

      seen.push(val);

      const ret = '[' + tokens.newLine + val.map(function (el, i) {
        let eol = ',' + tokens.newLine;
        if (val.length - 1 === i) {
          eol = tokens.newLine;
        }
        let value = stringify(el, options, pad + options.indent);
        return tokens.indent + value + eol;
      }).join('') + tokens.pad + ']';

      seen.pop();

      return ret;
    }

    if (isObj(val)) {
      let objKeys = Object.keys(val).concat(getOwnEnumPropSymbols(val));

      if (objKeys.length === 0) {
        return '{}';
      }

      seen.push(val);

      const ret = '{' + tokens.newLine + objKeys.map((el, i) => {
        let eol = ',' + tokens.newLine;
        if (objKeys.length - 1 === i) {
          eol = tokens.newLine;
        }
        const isSymbol = typeof el === 'symbol';
        const isClassic = !isSymbol && /^[a-z$_][a-z$_0-9]*$/i.test(el);
        const key = isSymbol || isClassic ? el : stringify(el, options);
        let value = stringify(val[el], options, pad + options.indent);
        return tokens.indent + String(key) + ': ' + value + eol;
      }).join('') + tokens.pad + '}';

      seen.pop();

      return ret;
    }

    val = String(val).replace(/[\r\n]/g, (x) => x === '\n' ? '\\n' : '\\r');

    val = val.replace(/\\?'/g, '\\\'');
    return '\'' + val + '\'';
  })(val);
};
