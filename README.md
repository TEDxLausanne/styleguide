TEDxLausanne styleguide
=======================

## Styleguide

The styleguide is located in the `/styleguide` directory. You can open `/styleguide/index.html` directly in your browser.

## How to use it in your project

There are several ways to get started:

  - Clone the repo `git clone https://github.com/TEDxLausanne/styleguide.git`

## Installation (development tools)
This is not needed to use the styleguide, only if you want to modify it to fix some bugs and contribute.

### Installation on OSX/Unix

> We use [Gulp.js](http://gulpjs.com) to run tasks and build our styleguide with [Hologram](https://github.com/trulia/hologram).

Make sure you have [Node.js](http://nodejs.org) installed.


Install all the dependencies you need:

```
$ npm install -g gulp
$ npm install
$ bower install
```

NOTE: Until hologram release a version > 1.1.0 you have to build and install the gem manually.

```
$ git clone https://github.com/trulia/hologram.git
$ cd hologram
$ gem build hologram.gemspec
$ gem install hologram-1.1.0.gem // 1.1.0 but actually the head of master
```

Install Hologram from the Gemfile (for version > 1.1.0):

```
$ bundle
$ cd ..
```

Build project using Gulp:

[Browser-sync](http://www.browsersync.io) is automatically set up on `localhost` and will allow you to make changes and see them in real time.
