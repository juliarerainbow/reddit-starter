class RedditService{

    static getPosts(subreddit, order='new'){
        const subredditName = subreddit === null ? 'popular' : subreddit;
        const redditUrl = 'https://www.reddit.com/r/' + subredditName + '/' + order + '.json'
        console.log(redditUrl);
        return fetch(redditUrl).then(resp => resp.json())

        // if (subreddit) {
        //     const subredditName = subreddit;
        //     const redditUrl = 'https://www.reddit.com/r/' + subredditName + '/' + order + '.json'
        //     console.log(redditUrl);
        //     return fetch(redditUrl).then(resp => resp.json())
        // } else {
        //     const subscriptions = ['aww', 'italy', 'pokemon'] // local storage
        //     const requests = [];
        //     for (let i = 0; i < subscriptions.length; i++) {
        //         const subscription = subscriptions[i];
        //         const subredditName = subscription;
        //         const redditUrl = 'https://www.reddit.com/r/' + subredditName + '/' + order + '.json'
        //         requests.push(fetch(redditUrl).then(resp => resp.json()))
        //     }
        //     return Promise.all(requests)
        // }

    }


}