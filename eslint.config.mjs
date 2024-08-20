import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
// import pluginPrettier from "eslint-config-prettier";
// import pluginReact from "eslint-plugin-react";
// import pluginVue from "eslint-plugin-vue";
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021
      },
      parser: tseslint,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  //eslint 默认规则
  pluginJs.configs.recommended,
  //ts默认规则
  ...tseslint.configs.recommended,
  //react默认规则
  // pluginReact.configs['flat/essential'],
  //vue3默认规则
  // ...pluginVue.configs["flat/essential"],
  //prettier默认规则
  pluginPrettierRecommendedConfigs,
  // pluginPrettier,
  {
    ignores: ['node_modules', '**/*/node_modules', 'dist'],
    // parser: "@typescript-eslint/parser",
    // plugins: ["@typescript-eslint", "prettier"],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
]
