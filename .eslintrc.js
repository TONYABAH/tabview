'use strict';
module.exports = {
    root: true,

    env: {
        node: true,
        es6: true,
        jest: true,
    },
    extends: 'babel',
    plugins: ['prettier'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'script',
        allowImportExportEverywhere: true,
    },

    rules: {
        'max-len': 'off',
        strict: 'error',
        'prettier/prettier': 'error',
        'no-console': 'off',
        'no-debugger': 'off',
        // https://github.com/babel/babel-eslint/issues/681#issuecomment-420663038
        'template-curly-spacing': 'off',
        indent: 'off',
        //
        'no-unused-vars': 'off',
        'no-tabs': 'off',
        'no-return-await': 'off',
        'no-func-assign': 'off',
        'no-useless-escape': 'off',
        'no-undef': 'off',
    },

    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};
