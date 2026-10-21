import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

export default [
  globalIgnores(['dist/**', 'dist-ssr/**', 'coverage/**']),
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser
    }
  },
  {
    files: ['*.config.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node
    }
  }
]
