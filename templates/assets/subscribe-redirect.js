(function(){
  var newUrl = 'https://formspree.io/f/mwlkazng';
  // Override XMLHttpRequest.open to rewrite subscription endpoint
  var origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    try{
      if(typeof url === 'string' && url.indexOf('/ajax?subscribe') !== -1){
        arguments[1] = newUrl;
      }
    }catch(e){}
    return origOpen.apply(this, arguments);
  };
  // Override fetch to rewrite subscription endpoint
  if(window.fetch){
    var origFetch = window.fetch.bind(window);
    window.fetch = function(input, init){
      try{
        var u = (typeof input === 'string') ? input : (input && input.url) || '';
        if(u && u.indexOf('/ajax?subscribe') !== -1){
          if(typeof input === 'string') input = newUrl;
          else input = new Request(newUrl, input);
        }
      }catch(e){}
      return origFetch(input, init);
    };
  }
})();
