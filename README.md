# simple-commit-message

> Simple commit message wizard and validator;
> works with commitizen and pre-git

[![NPM][simple-commit-message-icon] ][simple-commit-message-url]

[![Build status][simple-commit-message-ci-image] ][simple-commit-message-ci-url]
[![dependencies][simple-commit-message-dependencies-image] ][simple-commit-message-dependencies-url]
[![devdependencies][simple-commit-message-devdependencies-image] ][simple-commit-message-devdependencies-url]
[![semantic-release][semantic-image] ][semantic-url]
[![manpm](https://img.shields.io/badge/manpm-%E2%9C%93-3399ff.svg)](https://github.com/bahmutov/manpm)
[![standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Purpose

This module can:

* parse simple commit message of the type `type(scope): message`
* validate a given message if it fits the above simple format
* guide the user with questions in order to form well formatted message

## Install and use

    npm install --save simple-commit-message

Then use the following methods

```js
var simple = require('simple-commit-message')
simple.name // "simple"
// returns an object with parsed info
simple.parse(message)
// returns true / false, prints errors to given log function or console.error
simple.validate(message, log)
// message wizard built on top of inquirer
simple.prompter(inquirer, cb)
```

See [inquirer](https://www.npmjs.com/package/inquirer) for details.

## Wizard

This module comes with included "bin" script that runs the wizard and asks you the questions.
To use, add a script to your package, for example name it "commit"

```json
{
    "scripts": {
        "commit": "simple-commit-message"
    }
}
```

Then instead of `git commit` use the command `npm run commit` and answer questions.

## Related

* [conventional-commit-message](https://github.com/bahmutov/conventional-commit-message) is based
  on AngularJS log standard and has more commit types allowed.

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/simple-commit-message/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[simple-commit-message-icon]: https://nodei.co/npm/simple-commit-message.png?downloads=true
[simple-commit-message-url]: https://npmjs.org/package/simple-commit-message
[simple-commit-message-ci-image]: https://travis-ci.org/bahmutov/simple-commit-message.png?branch=master
[simple-commit-message-ci-url]: https://travis-ci.org/bahmutov/simple-commit-message
[simple-commit-message-dependencies-image]: https://david-dm.org/bahmutov/simple-commit-message.png
[simple-commit-message-dependencies-url]: https://david-dm.org/bahmutov/simple-commit-message
[simple-commit-message-devdependencies-image]: https://david-dm.org/bahmutov/simple-commit-message/dev-status.png
[simple-commit-message-devdependencies-url]: https://david-dm.org/bahmutov/simple-commit-message#info=devDependencies
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
