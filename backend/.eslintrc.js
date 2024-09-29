module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": ["warn", 4],
        "curly": "warn",
        "quotes": ["warn", "double"],
        "semi": ["warn", "always"]
    },
    "noInlineConfig": false
};