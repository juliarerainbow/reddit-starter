class RedditHeader extends HTMLElement{

    constructor(){
        super()
        this.attachShadow({mode: 'open'})
        //da recuperare dal local storage (se non ho niente salvato, apro la dialog)
        this.subscriptions = ['aww', 'italy', 'pokemon']
    }

    connectedCallback(){

        this.shadowRoot.innerHTML = `<style>
            nav{
                display:flex;
                gap: 8px;
            }
        </style>`

        this.shadowRoot.innerHTML += `
            <h1>Reddit viewer</h1>        
        `
        const links = this.subscriptions
        .map(s => `<a href="./?r=${s}">${s}</a>`)

        const linksString = links.join('')

        console.log(linksString);

        this.shadowRoot.innerHTML += `<nav>${linksString}</nav>`
    }

}

customElements.define('reddit-header', RedditHeader)