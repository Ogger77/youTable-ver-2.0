//progessive
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallPrompt fired');
    event.preventDefault();
    deferredPrompt = event;
    // return false;
    showInstallPromotion();
  });

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