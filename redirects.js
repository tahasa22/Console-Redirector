const interceptRequests = async (redirects) => {
    const originalFetch = window.fetch;

    window.fetch = async (url, options) => {
        const modifiedUrl = redirects.reduce((acc, [from, to]) => {
            const pattern = new RegExp(from, "ig");
            return acc.replace(pattern, to);
        }, url);

        if (modifiedUrl !== url) {
            console.log(`Request redirected from "${url}" to "${modifiedUrl}"`);
            return originalFetch(modifiedUrl, options);
        }

        return originalFetch(url, options);
    };
};
