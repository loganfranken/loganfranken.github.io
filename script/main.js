// Prism
import 'prismjs';
import 'prismjs/components/prism-csharp';

// Set up the service worker
if('serviceWorker' in navigator)
{
  navigator.serviceWorker.register('/service-worker.js');
}