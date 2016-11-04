//Translation filter
//Load the JSON File
$.ajax("cn.json").done(function(text){
  //  Parse it
  data = JSON.parse(text);
  //  Set the data
  i18n.translator.add(data);
  //  Translate away
  //i18n("Yes");        
  //i18n("No");           
})