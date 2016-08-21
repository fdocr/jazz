## How to contribute

Hello. If you're interested in contributing you might want to open an issue in case anything appears to be broken, or to open a discussion regarding the implementation. I'm open to discussing design patterns, always interested in different approaches to solve a problem.

#### Branches

The objective of this template is to provide a basic starting point that includes role-based authentication vs a DB. The versions I hope to support (in priority order) are the following:

- [x] PostgreSQL (Sequelize)
- [ ] DynamoDB (Vogels)
- [ ] MongoDB (Mongoose)
- [ ] MySQL/MSSQL/etc* (Sequelize)

\*: Since MySQL and others are supported by Sequelize, I figure supporting them wouldn't mean much of a hassle. Not my priority to test that use-case at this moment though (feel free to PR or ping me if interested in doing it).

#### Coding Style

Like the primary description states, this is opinionated. So basically you can follow the general coding style. For summary some of the guidelines are the following:

* 2 space identation
* Stick to < 80 column lines
* No space after if/function/for/etc. -> `if(true) {`
* Avoid opening brackets on single-lined if/else statements
* 1 space can be used to group/separate logically similar lines of code to improve readability
* Module loading (`var express = require('express'),\n...`) at the beginning of files in a single nicely tabbed and whenever possible

Indentation freak here, sorry not sorry.
