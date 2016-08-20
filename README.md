### Node JWT Template

This is an opinionated starter template for a lightweight Express based REST API. I put this together with the following ideas in mind:

* Database agnostic (probably the most important feature, will leverage passport)
* Multiple environment setups out of the box
* Test suite template using mocha and chai
* Authentication using JWT (maybe questionable decision, but I trust & like it)

Still very much a WIP, branches will hopefully contain multiple DB setups.

### Where to go from here?

Choose a database and authenticate users. The verification of the JWT will use [passport-jwt strategy](https://github.com/themikenicholson/passport-jwt).

Why this authentication method? Mostly a lightweight stateless implementation, simplicity & stubbornness. I love discussing this subject, shoot me an email or -> [@fdoxyz](https://twitter.com/fdoxyz)

##### LICENSE

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
