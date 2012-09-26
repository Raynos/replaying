var Replay = require("../index")

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
