class SinglePost extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {

        this.shadowRoot.innerHTML = `<style>

        </style>`
        let postLink = localStorage.getItem('single-post-link');
        postLink = postLink.slice(0, -1);
        console.log(postLink);
        RedditService.getPostInfo(postLink).then(post => {
            let image = "";
            if (post[0].data.children[0].data.url_overridden_by_dest !== undefined) {
                image = post[0].data.children[0].data.url_overridden_by_dest;
                this.shadowRoot.innerHTML = `<img src="${image}" alt="">`;
            };


        })

    }

}

customElements.define('single-post', SinglePost)