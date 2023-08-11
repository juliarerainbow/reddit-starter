class RedditList extends HTMLElement{

    constructor(){
        super()
        this.attachShadow({mode: 'open'})

    }

    connectedCallback(){
        const params = this.getParams()
        this.shadowRoot.innerHTML = `<style>

        </style>`
        this.shadowRoot.innerHTML += `<div id="post-container">

        </div>`         
        RedditService.getPosts(params.get('r')).then(posts => {

            console.log(posts)

            for (let i = 0; i < posts.data.children.length; i++) {
                const post = posts.data.children[i].data;
                const container = this.shadowRoot.getElementById('post-container')
                container.innerHTML += `
                    <div>${post.title}</div>                
                `
                
            }            

        })

        


    }

    getParams() {
        const params = new URLSearchParams(window.location.search);
        console.log(params);
        return params;
    }

}

customElements.define('reddit-list', RedditList)