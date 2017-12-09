window.__translate = function(varName) {
  var translatedString = window.en_US[varName];
  // // TODO: Code to detect default language and switch accordingly is remaining.

  if(!translatedString) {
    translatedString = varName;
  }
  return translatedString;
}
