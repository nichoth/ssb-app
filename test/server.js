var test = require('tape')
var Server = require('../src/server')

var server
test('server', function (t) {
    server = Server()
    t.ok(server)
    t.end()
})

test('whoami', function (t) {
    var who = server.whoami()
    console.log('who', who)
    t.ok(who, 'whoami')
    t.end()
})

test('done', function (t) {
    console.log('here')
    server.close(function () {
        console.log('here2')
        t.end()
    })
})