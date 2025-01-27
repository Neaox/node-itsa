
var assert = require("chai").assert;
var itsa = require('../index');
var _ = require("lodash")._;

describe('to-date', function(){

  it('works on good data', function(){
    var examples = [
      { from: "2012/03/13", to: new Date("2012/03/13") },
      { from: 1322643328957, to: new Date(1322643328957) },
      { from: new Date(1322643328957), to: new Date(new Date(1322643328957)) },
    ];

    _.each(examples, function(example){
      var obj = {birthday:example.from};
      var validator = itsa.object({
        birthday: itsa.toDate()
      });
      assert.equal(validator.validate(obj).valid, true, "Should be valid: "+JSON.stringify(example));
      assert.equal(obj.birthday.getTime(), example.to.getTime(), JSON.stringify(example));
    });
  });

  it('does nothing and fails validation with bad data', function(){
    var values = [
      "abc",
      "",
      "a b",
      null,
      undefined,
      {a:2},
      {},
      [],
      [1],
      [1,2],
      new Date("yesterday")
    ];
    _.each(values, function(val){
      var obj = {birthday:val};
      var validator = itsa.object({
        birthday: itsa.toDate()
      });
      assert.equal(validator.validate(obj).valid, false, "Should be invalid: "+JSON.stringify(val));
      assert.equal(obj.birthday, val, JSON.stringify(val));
    });
  });

});
