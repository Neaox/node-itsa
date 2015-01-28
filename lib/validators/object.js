

module.exports = function (example) {

  /*
   * The example is an object where the keys are the field names
   * and the values are itsa instances.
   * Assign parent instance and key
   */
  for(var key in example) {
    if (!example.hasOwnProperty(key)) continue;
    var itsaInstance = this._interpretValidator(example[key]);
    example[key] = itsaInstance;
    itsaInstance._parent = this;
    itsaInstance._key = key;
  }

  return function(val){

    var results = [];

    // typeof [], null, etc are object, so use this check for actual objects
    var prototypeStr = Object.prototype.toString.call(val);
    var valid = prototypeStr === "[object Object]";
    results.push({
      valid: valid,
      logs: [this._buildLog("object", "Type was :"+prototypeStr, valid)]
    });
    if (valid === false) {
      return results[0];
    }

    for(var key in example) {
      if (!example.hasOwnProperty(key)) continue;

      var itsaInstance = example[key];
      var fieldValue = val[key];
      var result = itsaInstance.validate.call(itsaInstance, fieldValue);
      results.push(result);
    }

    return this._combineResults(results);
  };
};