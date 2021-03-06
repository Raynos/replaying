# replaying [![Build Status][1]][2]

Create an object and replay it's methods

## Example

Return synchronous interfaces for asynchronously retrieved asynchronous APIs

``` js
var Replay = require("../index")

var thing = doThing()

thing.store("boom").collect(function (err, values) {
    console.log("values", values)
})

function doThing() {
    return Replay(["store", "collect"], getRealThing)
}

function getRealThing(cb) {
    setTimeout(function () {
        cb(null, {
            store: store
            , collect: collect
            , values: []
        })
    }, 1000)

    function store(v) {
        this.values.push(v)
    }

    function collect(cb) {
        cb(null, this.values)
    }
}
```

## Installation

`npm install replaying`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/replaying.png
  [2]: http://travis-ci.org/Raynos/replaying
