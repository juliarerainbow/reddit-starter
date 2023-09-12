class RedditList extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

    }

    connectedCallback() {
        const params = this.getParams()
        this.shadowRoot.innerHTML = `<style>
        #posts-container{
        }

        .card {
            padding:1.6rem;
            margin: 1.6rem auto;
            max-width:350px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            display:flex;
            flex-direction:column;
        }
        
        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }

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

        .float-right{
            padding:1rem;
            margin-left: auto;
            line-height: 2;
        }

        .selectBtn{

        }

        .wrap-btns{
            display:flex;
            max-width:350px;
            margin: 1.6rem auto;
            gap:20px;
            justify-content:center;
        }


          
        </style>
        `
        const postsContainer = document.createElement('div');
        postsContainer.setAttribute("id", "posts-container");
        postsContainer.innerHTML = `
        <div class="wrap-btns">
            <button class="btn selectBtn" value="new" id="New">New</button>
            <button class="btn selectBtn" value="hot"  id="New">Hot</button>
            <button class="btn selectBtn"  value="top" id="New">Top</button>
        <div>
        `
        postsContainer.button = this.shadowRoot.querySelector('.selectBtn');

        // postsContainer.button.addEventListener('click', () => {
        //     const value = postsContainer.button.value;
        //     console.log(value);
        //     // this.modal.style.display = 'none';
        // });


        RedditService.getPosts(params.get('r')).then(posts => {

            // console.log(posts)

            const container = this.shadowRoot.getElementById('post-container')

            //loop every post
            for (let i = 0; i < posts.data.children.length; i++) {
                const post = posts.data.children[i].data;

                const postCard = document.createElement('div');
                postCard.classList.add("card");


                const date = new Date(post.created_utc * 1000).toISOString().slice(0, 19).replace('T', ' ');

                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;
                // document.write(today); 

                if (date.includes(today)) {
                    date.replace(today, "");
                }

                const postAuthor = document.createElement('span');
                postAuthor.innerHTML = `<span>${date}</span> &nbsp;   <span><img width="20px" height="20px"
                src="data:image/png;base64,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"
                alt=""> &nbsp;  </span>`;
                postAuthor.classList.add('float-right');
                postAuthor.appendChild(document.createTextNode(post.subreddit_name_prefixed));
                postCard.appendChild(postAuthor);


                //if theres a url(/) then append thumbnail
                if (post.url_overridden_by_dest !== undefined) {
                    const postThumbnail = document.createElement('img');
                    postThumbnail.src = post.url_overridden_by_dest;
                    postCard.appendChild(postThumbnail);
                } else if (post.thumbnail.indexOf('/') > -1) {
                    const postThumbnail = document.createElement('img');
                    postThumbnail.src = post.thumbnail;
                    postCard.appendChild(postThumbnail);
                }



                // console.log(post);


                const postTitle = document.createElement('h3');
                postTitle.appendChild(document.createTextNode(post.title))
                postCard.appendChild(postTitle);

                const viewBtn = document.createElement('button');
                viewBtn.appendChild(document.createTextNode('Visualizza Post'));
                viewBtn.classList.add("btn");
                viewBtn.addEventListener("click", () => {
                    window.location.href = 'https://www.reddit.com' + post.permalink;
                });

                postCard.appendChild(viewBtn);

                postsContainer.appendChild(postCard);
            }

        })



        this.shadowRoot.appendChild(postsContainer);




    }



    getParams() {
        const params = new URLSearchParams(window.location.search);
        console.log(params);
        return params;
    }



}

customElements.define('reddit-list', RedditList)













