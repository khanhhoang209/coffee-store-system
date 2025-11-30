import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      '*.config.js',
      'migrations/**',
      'migrate-mongo-config.js'
    ]
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths
    },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowSameFolder: false,
          rootDir: 'src',
          prefix: '~'
        }
      ]
    }
  },

  eslintPluginPrettierRecommended,

  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: null
      }
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  },

  {
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^(_|req|res|next|err)$',
          varsIgnorePattern: '^_'
        }
      ]
    }
  }
]
