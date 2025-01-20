module.exports = { 
  extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
      2,
      'always',
      ['chore', 'fix', 'feat', 'style', 'test', 'revert', 'ci', 'docs', 'refactor', 'env'],
    ],
    'subject-case': [2, 'never', ['upper-case', 'pascal-case']],
  },
}

