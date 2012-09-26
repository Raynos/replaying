var test = require("tap").test
    , Replay = require("../index")

test("Replay", function (t) {
    var replay = Replay(["foo", "bar"])
        , object = replay.object
        , impl = {
            foo: function (s) {
                this.baz = []
                this.baz.push(s)
            }
            , bar: function (cb) {
                cb(this.baz[0])
            }
        }

    object.foo("boom").bar(function (value) {
        t.equal(value, "boom")
        t.end()
    })

    replay(impl)
})
