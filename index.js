module.exports = Replay

function Replay(methods) {
    var object = {}
        , calls = []
        , target

    methods.forEach(addTrackerToObject)

    replay.object = object

    return replay

    function addTrackerToObject(methodName) {
        object[methodName] = function trackCall() {
            if (target) {
                target[methodName].apply(target, arguments)
            } else {
                calls.push({
                    methodName: methodName
                    , args: arguments
                })
            }
            return object
        }
    }

    function replay(object) {
        target = object
        calls.forEach(callOnTarget, target)
    }

    function callOnTarget(callData) {
        this[callData.methodName].apply(this, callData.args)
    }
}
