/* global self console */
console.log("Service Worker Loaded...");
self.addEventListener('push', e => {
  const data = e.data.json()
  self.registration.showNotification(data.title, {
    body: data.body,
  });
})