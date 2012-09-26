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
