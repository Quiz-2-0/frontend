module.exports = {
    root: true,
    env: {
        browser: true,
        node: false,
        jest: true,
        mongo: false,
        es6: true
    },
    plugins: [
        'prefer-arrow',
        'ternary',
        'promise',
        'import',
        'jsx-a11y',
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:import/recommended',
        'plugin:promise/recommended',
        'plugin:ternary/recommended',
        'plugin:jsx-a11y/strict',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            'jsx': true,
            impliedStrict: 'true'
        },
        ecmaVersion: 12, // Версия стандарта JavaScript. Последний 12 (2021).
        sourceType: 'module', // Позволяет использовать import/export
        project: true,
        tsconfigRootDir: __dirname
    },
    ignorePatterns: [
        '*.cjs',
        'config-overrides.js'
    ],
    rules: {
        'class-methods-use-this': ['error'],
        'default-param-last': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'linebreak-style': 'off',
        'no-console': ['warn', { allow: ['debug', 'warn', 'error'] }],
        'no-underscore-dangle': ['error', {
            allow: ['_id', '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
            enforceInMethodNames: true,
            allowAfterThis: true
        }],
        'object-curly-newline': 'off',
        'operator-linebreak': 'off',
        'quotes': 'off',
        'prefer-arrow/prefer-arrow-functions': ['warn', {
            disallowPrototype: true,
            singleReturnOnly: true,
            classPropertiesAllowed: false
        }],
        'spaced-comment': 'off',

        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'warn',

        'react/forbid-prop-types': 'off',
        'react/function-component-definition': ['error', {
            'namedComponents': 'arrow-function',
            'unnamedComponents': 'arrow-function'
        }],
        'react/jsx-key': 'warn',
        'react/jsx-closing-bracket-location': ['error', 'after-props'],
        'react/jsx-filename-extension': ['warn', {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }],

        'ternary/no-unreachable': 'off',

        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
    },
};
