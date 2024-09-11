import { handleRequest } from './handlers/mainHandler.js';
import { addSecurityHeaders } from './utils/securityHeaders.js';
import { addCacheControl } from './utils/cacheControl.js';

const faviconData = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAB5QTFRFnENAbE9nmERDbU9mQVqIRFmGmkRCbE9mQ1qHa09nqp+pUQAAAkpJREFUeJyl1jtKAwEQxvHdFVYEYUVsU8gWaRRNJDaW1hYewEIsUgoRPYkH8Qg5QEAvIsQbmOc+5/HNjJ2KP4b177emSewjTWM/n42DQDmKAflVEQOmg3kIyG6PkxBQjpYxYFIkISC9T2LA2XUM2BwQALLxSQx4+VuGgHy2SAGA6gAnUJ7Xt3h+fjVEMWA1RCFgH6Eb2EfoBiZF4xMHUDfgBOoGfED7ADuwGyI/sBsiN9BqwAM0I/QA67dhCKiGyAu0G7ADnQbsQP8AG9AYIheQv37HgOdyHgLy0wviqwZg+EQcYAHeiSdgAY7uyC/jwOdXDGAOgIFs9hMDhpfdP0MbQEZoAcgIDUD2seC+hQGHD8wTQAGmARjgGoAB4QAIGA6EbwJA9sY1AALTX/ZXAAH0EBkAeohwQH4CACBEiAFSAwggRYgA7BChADtEIMAPEQjwQ4QBwhBhgP4EFIB+G+KA2oAGaBFqAHSAAOgRKoA8RDqgDJEOKEOkAtoQqYA2RCoANSAAWAMCAB/AAOLbEACAIZIBYIhEAI2QBdAIWQAZIgnAG2AAvAEasB3QB8Ah4gFwiFjA1AAFWCKkAORtKALwEHGArYE+YGygD9gPaAOGISIByxCRgLmBDmCOsAuYhogCTENEAI4G2oCjgRbgPKACrEPUA5B/SiXAFWETcEXYAOxD1AHsQ9QBnA1UgLeBCggcsAE8Q9QE4H9KOcD6NuwCviFqAL4hqoHYE1gBgQi3QKSB9cc/MA12PrJyG3sAAAAASUVORK5CYII=';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle favicon requests
    if (url.pathname === '/favicon.ico' || url.pathname === '/favicon.png') {
      const binaryData = atob(faviconData);
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      return new Response(uint8Array, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=604800', // Cache for 1 week
        },
      });
    }

    // Handle other requests
    let response = await handleRequest(request, env);
    response = addSecurityHeaders(response);
    response = addCacheControl(response);

    return response;
  },
};
