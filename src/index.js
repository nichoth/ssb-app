console.log(process.env.NODE_ENV)
var manifest = require('../manifest.json')
var muxrpc = require('muxrpc')
var ws = require('pull-ws/client')
var S = require('pull-stream')

function getSbot (cb) {
    ws.connect('ws://localhost:8000', {
        binary: true,
        onConnect
    })

    function onConnect (err, wsStream) {
        if (err) return cb(err)
        var sbot = muxrpc(manifest, null)()
        var rpcStream = sbot.createStream(function _onClose (err) {
            if (err) throw err
        })
        S(wsStream, rpcStream, wsStream)
        cb(null, sbot)
    }
}

getSbot(function (err, sbot) {
    if (err) throw err
    console.log('got sbot', sbot)
})

