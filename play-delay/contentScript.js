chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'playVideo') {
      const $youtubeVideo = document.querySelector('.ytp-play-button');

      if ($youtubeVideo) {
        $youtubeVideo.click();
      }
    }
  });
