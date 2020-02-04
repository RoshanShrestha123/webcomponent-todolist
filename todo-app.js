import './todo-list.js';
import {html,render} from './node_modules/lit-html/lit-html.js';


const todoAppTemplate = () => html` <style>

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
    </div>`;
class TodoApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        render(todoAppTemplate(),this.shadowRoot);        
        this.button = this.shadowRoot.getElementById('button');
        this.inputField = this.shadowRoot.getElementById('input');
        this.listHolder = this.shadowRoot.getElementById('list-holder');
        this.data = [{ id:1,task: "Learn web component", completed: true },
                     { id:2,task: "Make todo app", completed: true },
                     {id:3, task: "Learn Lit HTML", completed: false }];
        this.newList = '';


    }

    connectedCallback() {
        this.update();
        this.inputField.addEventListener('change', (e) => {
            this.newList = e.target.value;
        });
        this.button.addEventListener('click', () => {
            let lastId = this.data;
            lastId = lastId[lastId.length-1].id;
            
            if (this.inputField.value != '') {
                this.data = [...this.data, {
                    task: this.newList,
                    completed: false,
                    id:lastId+1
                }]
            this.newList = '';
            this.inputField.value = '';
            this.update();
            }
            
        });

    }
    
    toggler = (id) => {
        console.log(" this is the toggler function ",id);
       this.data =  this.data.map(
           list=>(list.id === id ? {...list,completed:!list.completed}:list)
        );
        this.update();
    }

    update = () => {
        this.listHolder.innerHTML = '';
        this.data.forEach(list => {  
            this.el = document.createElement('todo-list');
            this.el.setAttribute('key','test');
            this.el.data = list;
            this.el.toggler = this.toggler;
            this.listHolder.appendChild(this.el);
            
            
        })
    }
    
}
window.customElements.define('todo-app', TodoApp);