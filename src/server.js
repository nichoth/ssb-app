var Server = require('ssb-server')
var Config = require('ssb-config')

function start () {
    Server
        .use(require('ssb-master'))
        .use(require('ssb-gossip'))
        .use(require('ssb-replicate'))
        .use(require('ssb-backlinks'))

    var server = Server(Config)
    return server
}

if (require.main === module) {
    start()
}

module.exports = start
