module.exports = {
    'root': true,
    'parserOptions': {
        'ecmaVersion': 8,
        'sourceType': 'module'
    },
    'env': {
        'browser': true
    },
    'globals': {
        'axios': true,
        'beautifyJSON': true,
        'helpers': true,
        'httpVueLoader': true,
        'jsdom': true,
        'Promise': true,
        'Vue': true
    },
    'extends': [
      'tjw-base',
      'tjw-vue'
    ]
};
