export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  main() {
    // Function to extract comment information
    function extractCommentInfo() {
      const comments = document.querySelectorAll('ytd-comment-view-model');

      const commentData = Array.from(comments).map((comment) => {
        // Extract author handle
        const authorElement = comment.querySelector('#author-text span');
        const author = authorElement ? authorElement.textContent?.trim() : '';

        // Extract comment link
        const linkElement = comment.querySelector('#published-time-text a');
        const commentLink = linkElement
          ? (linkElement as HTMLAnchorElement).href
          : '';

        // Extract comment content
        const contentElement = comment.querySelector('#content-text span');
        const content = contentElement
          ? contentElement.textContent?.trim()
          : '';

        return {
          author,
          commentLink,
          content,
        };
      });

      console.log('Extracted YouTube comments:', commentData);
      return commentData;
    }

    // Run extraction when page is loaded
    if (document.readyState === 'complete') {
      extractCommentInfo();
    } else {
      window.addEventListener('load', extractCommentInfo);
    }

    // Also run extraction when navigating between videos (YouTube is a SPA)
    const observer = new MutationObserver(() => {
      extractCommentInfo();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});
