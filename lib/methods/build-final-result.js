
var FinalResult = function (result) {
  this.valid = result.valid;
  this.logs = result.logs;
};

FinalResult.prototype.describe = function () {
  //valid? cool story bro
  if (this.valid) {
    return "Validation succeeded.";
  }

  //invalid
  var messages = [];
  for (var i in this.logs){
    var log = this.logs[i];
    if (log.valid) continue;
    messages.push((log.path ? (log.path + ": ") : "") + log.message);
  }

  return messages.join("\n");
};

module.exports = function (result) {
  return new FinalResult(result);
};