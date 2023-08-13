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
        'spaced-comment': 'off',
        'linebreak-style': 'off',
        'no-underscore-dangle': ['error', {
            allow: ['_id', '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
            enforceInMethodNames: true,
            allowAfterThis: true
        }],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-closing-bracket-location': ['error', 'after-props'],
        'class-methods-use-this': ['error'],
        'react/jsx-filename-extension': ['warn', {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }],
        'react/forbid-prop-types': 'off',
        'react/function-component-definition': ['error', {
            'namedComponents': 'arrow-function',
            'unnamedComponents': 'arrow-function'
        }],
        'camelcase': ['error', { allow: ['^image_'] }],
        'prefer-arrow/prefer-arrow-functions': ['warn', {
            disallowPrototype: true,
            singleReturnOnly: true,
            classPropertiesAllowed: false
        }],
        'quotes': 'off',
        'default-param-last': 'off',
        'import/extensions': 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        'import/no-unresolved': 'off',
        'object-curly-newline': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        'react/jsx-key': 'warn',
        'operator-linebreak': 'off',
    },
};
