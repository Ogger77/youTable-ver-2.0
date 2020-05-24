//progessive
let deferredPrompt;
let installBut = document.querySelector('#test')

if('serviceWorker' in navigator){
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => {
      console.log('Service worker regsitered');
    })
    .catch((err) => {
      console.log(err);
    })
}

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallPrompt fired');
    event.preventDefault();
    deferredPrompt = event;
    // return false;
    showInstallPromotion();
});

function fireInstall(){
  if(deferredPrompt){
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      console.log(choiceResult.outcome);
      if(choiceResult,outcome === 'dismissed'){
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen')
      }
    })

    deferredPrompt = null;
  }
}

installBut.addEventListener('click', fireInstall);
