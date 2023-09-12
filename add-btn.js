
class AddButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `

        <style>

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            overflow:hidden;
            box-shadow: 0 12px 20px 0 rgba(0,0,0,0.2);
        }

        .modal-content {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            margin: 20% auto;
            padding: 30px;            
            width: 50%;
            min-width: 350px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            z-index:2000;
            gap:10px;
        }

        input{
            appearance: none;
            background-color: #fff;
            border: 2px solid #1a1a1a2e;
            box-sizing: border-box;
            font-size: 16px;
            font-weight: 600;
            padding:12px;

        }

        input:focus-visible {
            outline: 2px solid #1a1a1a2e;
            outline-offset: 2px;
            border: px solid #1a1a1a2e;
        }

        .close {
            // line-height:-2;
            font-size:44px;
            float: right;
            cursor: pointer;
        }

        /* Stile per il pulsante nel Web Component */
        .btn {
            appearance: none;
            background-color: #000000;
            border: 2px solid #1A1A1A;
            box-sizing: border-box;
            color: #FFFFFF;
            font-size: 16px;
            font-weight: 600;
            padding: 12px 20px;
        }
          
        .btn:hover {
            box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
            transform: translateY(-2px);
        }
          
        .btn:active {
            box-shadow: none;
            transform: translateY(0);
        }   

        </style>

        
          <button class="btn" id="myButton"> Aggiungi </button>
          <div id="modal" class="modal">
            <div class="modal-content">

              <input type="text" id="inputField" placeholder="Inserisci Nuovo Subreddit">

              <button class="btn" id="submitButton">Aggiungi</button>

              <span class="close" id="closeModal">&times;</span>
            </div>
          </div>
        `;
        this.button = this.shadowRoot.querySelector('#myButton');
        this.modal = this.shadowRoot.querySelector('#modal');
        this.inputField = this.shadowRoot.querySelector('#inputField');
        this.submitButton = this.shadowRoot.querySelector('#submitButton');
        this.closeModalButton = this.shadowRoot.querySelector('#closeModal');

        this.button.addEventListener('click', () => {
            this.modal.style.display = 'block';
        });

        this.closeModalButton.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        this.submitButton.addEventListener('click', () => {
            const userInput = this.inputField.value;
            // console.log(userInput);
            localStorage.setItem('userInput', userInput)
            this.modal.style.display = 'none';
        });
    }
}

// Registra il Web Component
customElements.define('add-btn', AddButton);



