(function(){
  try{
    const desc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'src') || {};
    const origSet = desc.set;
    const origGet = desc.get;
    Object.defineProperty(HTMLMediaElement.prototype, 'src', {
      set: function(val){
        try{
          // On narrow screens (mobile) avoid assigning src for elements
          // marked as `pc` to prevent desktop-only videos from being
          // auto-loaded by global data-src->src copy logic in other scripts.
          if(typeof window !== 'undefined' && window.innerWidth && window.innerWidth < 768){
            try{
              if(this.classList && this.classList.contains('pc')){
                console.log('[fix-lazy] blocked src assignment for .pc element on mobile', val);
                return;
              }
            }catch(e){}
          }
          if(this.dataset && this.dataset._lazyLoaded) return;
          if(this.dataset) this.dataset._lazyLoaded = 1;
        }catch(e){}
        if(origSet) return origSet.call(this, val);
        this.setAttribute('src', val);
      },
      get: function(){
        if(origGet) return origGet.call(this);
        return this.getAttribute('src');
      },
      configurable: true,
      enumerable: true
    });
  }catch(e){}
})();
