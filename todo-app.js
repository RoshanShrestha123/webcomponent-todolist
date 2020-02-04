import './todo-list.js';


const todo_app_template = document.createElement('template');
todo_app_template.innerHTML = `
<style>

    input{
        padding:5px;
        border:1px solid white;
        width:70%;
    }
    button {
        background-color:green;
        padding:5px;
        border:1px solid white;
        border-radius:5px;
        color:white;
        cursor:pointer;
    }
</style>
    <div>
        <input placeholder="Enter new list" type="text" id="input" name="todo-input"></input>
        <button id="button">Add New</button>
    </div>
    <div id="list-holder">
    </div>

  

`
class TodoApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(todo_app_template.content.cloneNode(true));
        this.button = this.shadowRoot.getElementById('button');
        this.inputField = this.shadowRoot.getElementById('input');
        this.listHolder = this.shadowRoot.getElementById('list-holder');
        this.data = [{ id:1,task: "Learn web component", completed: true }, { id:2,task: "Make todo app", completed: true }, {id:3, task: "Learn Lit HTML", completed: false }];
        this.newList = '';


    }

    connectedCallback() {
        this.render();
        this.inputField.addEventListener('change', (e) => {
            this.newList = e.target.value;
        });
        this.button.addEventListener('click', () => {
            if (this.inputField.value != '') {
                this.data = [...this.data, {
                    task: this.newList,
                    completed: false
                }]
            this.newList = '';
            this.inputField.value = '';
            this.render();
            }
            
        });

}

render = () => {
    this.listHolder.innerHTML = '';
    this.data.forEach(list => {  
        this.el = document.createElement('todo-list');
        this.el.setAttribute('key','test');
        this.el.data = list;
        this.el.shadowRoot.querySelector('.list-wrapper').querySelector('#checkBox').addEventListener('change',()=>{
            this.handleCheckboxChange(list.id);
        })
        this.listHolder.appendChild(this.el);
        
    })
}

handleCheckboxChange=(id)=>{
    this.data.map(list=>{
        if(list.id===id){
            list.completed = !list.completed;
        }
    })    
    this.render();
    
    
}




    
}
window.customElements.define('todo-app', TodoApp);