var Server = require('ssb-server')
var Config = require('ssb-config')
var ws = require('pull-ws')
var muxrpc = require('muxrpc')
var S = require('pull-stream')
var manifest = require('../manifest.json')

// var stream = ws.connect('ws://localhost:8000')

function start () {
    Server
        .use(require('ssb-master'))
        .use(require('ssb-gossip'))
        .use(require('ssb-replicate'))
        .use(require('ssb-backlinks'))

    var server = Server(Config)

    var rpcServer = muxrpc(null, manifest)(server)
    var rpcServerStream = rpcServer.createStream(function onEnd (err) {
        console.log('rpc stream close', err)
    })
    ws.createServer(function (stream) {
        S(stream, rpcServerStream, stream)
    }).listen(8000)

    return server
}

if (require.main === module) {
    start()
}

module.exports = start
