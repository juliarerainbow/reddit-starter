class RedditHeader extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        //da recuperare dal local storage (se non ho niente salvato, apro la dialog)
        this.subscriptions = ['aww', 'italy', 'pokemon', 'otters']

        const userInput = localStorage.getItem('userInput');

        if (userInput) {

        } else {

        }
    }

    connectedCallback() {

        const headerContainer = document.createElement('div');
        headerContainer.setAttribute("id", "header-container");

        headerContainer.innerHTML = `<style>

            #header-container{
                position:relative;
            }

            h1{
                margin-bottom:0;
            }

            nav{
                // background-color:#e6e2de;
                // width:20%;
                position:absolute;
                display:flex;
                flex-direction:column;
                gap: 8px;
            }
            .btn {
                appearance: none;
                background-color: #808080ba;
                border: 2px solid #808080ba;
                box-sizing: border-box;
                color: #FFFFFF;
                font-size: 16px;
                font-weight: 600;
                padding: 8px 20px;
            }
            
            .btn:hover {
                box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
                transform: translateY(-2px);
            }
            
            .btn:active {
                box-shadow: none;
                transform: translateY(0);
            }



            @media (max-width:700px) {
                nav{
                    position:relative;
                }
            }

        </style>`



        headerContainer.innerHTML += `
            <h1>Reddit viewer</h1>  
            <add-btn style="    position: fixed;
            top: 20px;
            right: 20px;
            border: 0;" ></add-btn> 
        `
        const links = this.subscriptions
            .map(s => `<a class="btn" href="./?r=${s}">${s}</a>`)

        const linksString = links.join('')

        console.log(linksString);

        headerContainer.innerHTML += `<nav>
        <br>
        ${linksString}
        </nav>`

        this.shadowRoot.appendChild(headerContainer);
    }

}




customElements.define('reddit-header', RedditHeader)