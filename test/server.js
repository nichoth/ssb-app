var test = require('tape')
var Server = require('../src/server')

var server
test('server', function (t) {
    server = Server()
    server.close(function () {
        t.end()
    })
})