import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import typescript from '@typescript-eslint/eslint-plugin'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    parser: '@typescript-eslint/parser',
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
      '@typescript-eslint': typescript,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...js.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'arrow-body-style': ['warn', 'as-needed'],
      curly: ['warn', 'all'],
      'dot-notation': 'warn',
      eqeqeq: 'error',
      'func-names': ['error', 'always'],

      //@stylistic
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/arrow-spacing': 'warn',
      '@stylistic/block-spacing': 'warn',
      '@stylistic/computed-property-spacing': ['error', 'never'],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          allowImplicitTypes: true, // Add this line
        },
      ],
    },
  },
)
