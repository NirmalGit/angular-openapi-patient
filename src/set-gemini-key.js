// Inject Gemini API key from .env.local into window for local dev
(function() {
  try {
    // This script is meant to be included in index.html for local dev only
    // It will be replaced/removed in production builds
    fetch('/.env.local')
      .then(res => res.text())
      .then(text => {
        const match = text.match(/^GEMINI_API_KEY=(.*)$/m);
        if (match) {
          window.GEMINI_API_KEY = match[1].trim();
        }
      });
  } catch (e) {}
})();
