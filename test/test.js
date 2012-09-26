var test = require("tap").test
    , Replay = require("../index")

test("Replay", function (t) {
    var replay = Replay(["foo", "bar"], returnImpl)

    replay.foo("boom").bar(function (value) {
        console.log("values? :S", arguments)
        t.equal(value, "boom")
        t.end()
    })

    function returnImpl(cb) {
        var impl = {
            foo: function (s) {
                this.baz = []
                this.baz.push(s)
            }
            , bar: function (cb) {
                cb(this.baz[0])
            }
        }

        setTimeout(function () {
            cb(null, impl)
        }, 1000)
    }
})
