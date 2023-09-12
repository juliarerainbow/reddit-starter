class RedditService {

    static getPosts(subreddit, order = 'new') {
        const subredditName = subreddit === null ? 'popular' : subreddit;
        const redditUrl = 'https://www.reddit.com/r/' + subredditName + '/' + order + '.json'
        console.log(redditUrl);
        return fetch(redditUrl).then(resp => resp.json())

    }

    // static getSubreddits() {

    // }

    static getPostInfo(link) {
        const redditPostUrl = 'https://www.reddit.com/' + link + '.json'
        console.log(redditPostUrl);
        return fetch(redditPostUrl).then(resp => resp.json())

    }

}