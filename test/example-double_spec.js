var helper = require('node-red-node-test-helper')
var lowerNode = require('../example-double.js')

describe('example-double Node', function () {
  afterEach(function () {
    helper.unload()
  })

  it('should be loaded', function (done) {
    var flow = [{ id: 'n1', type: 'example-double', name: 'test name' }]
    helper.load(lowerNode, flow, function () {
      var n1 = helper.getNode('n1')
      n1.should.have.property('name', 'test name')
      done()
    })
  })

  it('should make payload double', function (done) {
    var flow = [
      { id: 'n1', type: 'example-double', name: 'test name', wires: [['n2']] },
      { id: 'n2', type: 'helper' },
    ]
    helper.load(lowerNode, flow, function () {
      var n2 = helper.getNode('n2')
      var n1 = helper.getNode('n1')
      n2.on('input', function (msg) {
        try {
          msg.should.have.property('payload', ['val', 'val'])
          done()
        } catch (err) {
          done(err)
        }
      })
      n1.receive({ payload: 'val' })
    })
  })
})
