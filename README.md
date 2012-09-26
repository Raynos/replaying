# replaying

Create an object and replay it's methods

## Example

Return synchronous interfaces for asynchronously retrieved asynchronous APIs

```
var thing = doThing()

thing.store("boom").collect(function (err, values) {
    console.log("values", values)
})

function doThing() {
    var replay = Replay(["store", "collect"])

    getRealThing(function (realThing) {
        replay(realThing)
    })

    return replay.object
}

function getRealThing(cb) {
    setTimeout(function () {
        cb({
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
