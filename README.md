### Node JWT Template

This is an opinionated starter template for a lightweight Express based REST API. It intends to remove the authentication burden that every API needs to solve before starting to work in their own specific implementation. It pursues compliance with the following ideals:

* Database agnostic (probably the most important feature, using [Passportjs](http://passportjs.org/))
* Multiple environment setups out of the box
* Test suite template using mocha and chai
* Authentication using JWT (maybe questionable decision, but I trust & like it)

Disclaimer: Still a WIP, it even has some custom names that would have to be modified manually. Current master is using postgres and ideally branches would support multiple databases (see [the list](https://github.com/fdoxyz/node-jwt-template/blob/master/CONTRIBUTING.md)).

Checkout the [contributing page](https://github.com/fdoxyz/node-jwt-template/blob/master/CONTRIBUTING.md) in case you are interested in giving me a hand.

### Where to go from here?

Basically user authentication is handled with roles and that implementation is localted in `config/passport.js` file. It is intended to be as decoupled as possible. It leverages JSON Web Tokens using [passport-jwt strategy](https://github.com/themikenicholson/passport-jwt).

Implemented & tested endpoints are:
* `/auth`
* `/users`
* `/roles`

Why this authentication method? Mostly because it's a stateless implementation, simplicity & personal stubbornness tbh. I love discussing this subject, hit me with an email or -> [@fdoxyz](https://twitter.com/fdoxyz)

```
The MIT License

Copyright (c) 2016 Fernando Valverde. https://visualcosita.xyz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
