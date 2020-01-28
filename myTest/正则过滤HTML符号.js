function unescapeHTML (str) {     
  var htmlEntities = {       
    nbsp: ' ',       
    lt: '<',       
    gt: '>',      
    quot: '"',       
    amp: '&',      
    apos: '\''     
  };     
  return str.replace(/\&([^;]+);/g, function (match, key) { 
    console.log(match)
    if (key in htmlEntities) {             
      return htmlEntities[key];         
    }         
    return match;     }); 
  } 
console.log( unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;') ); 