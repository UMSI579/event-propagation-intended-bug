// We wrap all the JS in a function as a way to contain it so it doesn't
// risk conflicting with other loaded javascript
(function() {
    const logElement = document.getElementById('log');
   const stopEventPropagation = document.querySelector('#stop-event-propagation');
   const propagationTypeLabel = document.querySelector('#prop-type');
   const propagationType = document.querySelector('#prop-type select');
   let trackBub = 0;
   let trackCap = 0;

   const dataStart = document.querySelector("[data-start]");


  let trackElement;
   function log(msg) {
      logElement.innerHTML += ('<p>' + msg + '</p>');
   }

   function capture(e) {
     dataStart.setAttribute('disabled', true);
      if (document.querySelector('#stop-event-propagation').checked) {
         if (propagationType.value === 'Bubble') {
            return;
         }
         e.stopPropagation();
      }

     if (propagationType.value === 'Capture') {
       let element = document.querySelector("[data-start]");
       for(let i = 0; i < trackCap; i++) {
         element = element.children[0];
       }
       setTimeout(() => {
         element.setAttribute('style', 'outline-color:orange; outline-width: 12px; outline-style: solid')
         setTimeout(() => {
           element.removeAttribute('style');
         }, 300)
       }, trackCap * 300)
       trackCap += 1
       setTimeout(() => {
         trackCap = 0;
         dataStart.removeAttribute('disabled');
       }, 2000)
     }

      log('capture: ' + this.firstChild.nodeValue.trim());

   }

   function bubble(e) {
     dataStart.setAttribute('disabled', true);
     if (document.querySelector('#stop-event-propagation').checked) {
         if (propagationType.value === 'Capture') {
            return;
         }
         e.stopPropagation();
      }
     if (propagationType.value === 'Bubble') {
       let element = e.target;
       for(let i = 0; i < trackBub; i++) {
         element = element.parentNode
       }
       setTimeout(() => {
         element.setAttribute('style', 'outline-color:green; outline-width: 12px; outline-style: solid')
         setTimeout(() => {
           element.removeAttribute('style');
         }, 300)
       }, trackBub * 300)
       trackBub += 1
       setTimeout(() => {
         trackBub = 0;
         dataStart.removeAttribute('disabled');

       }, 2000)
     }
      log('bubble: ' + this.firstChild.nodeValue.trim());
   }

   function clearOutput() {
      logElement.innerHTML = "";
   }

   const divs = document.getElementsByTagName('div');
   for (let i = 0; i < divs.length; i++) {
      divs[i].addEventListener('click', capture, true);
      divs[i].addEventListener('click', bubble, false);
   }
   const clearButton = document.getElementById('clear');
   clearButton.addEventListener('click', clearOutput);

 })();
