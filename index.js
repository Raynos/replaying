module.exports = Replay

function Replay(methods, getInstance) {
    var object = {}
        , calls = []
        , error
        , data

    methods.forEach(addTrackerToObject)

    getInstance(replay)

    return object

    function addTrackerToObject(methodName) {
        object[methodName] = trackCall

        function trackCall() {
            calls.push({
                methodName: methodName
                , args: arguments
            })
            return object
        }
    }

    function replay(err, object) {
        error = err
        if (object) {
            data = object
            methods.forEach(overwriteMethods)
        }

        calls.forEach(callOnTarget)
    }

    function callOnTarget(callData) {
        var args = callData.args
        if (error) {
            var cb = args[args.length - 1]

            if (typeof cb === "function") {
                cb(error)
            }
            return
        }

        data[callData.methodName].apply(data, args)
    }

    function overwriteMethods(prop) {
        if (typeof data[prop] === "function") {
            object[prop] = data[prop].bind(data)
        }
    }
}
