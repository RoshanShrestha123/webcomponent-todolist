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
class TodoApp extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(todo_app_template.content.cloneNode(true));
        this.button = this.shadowRoot.getElementById('button');
        this.inputField = this.shadowRoot.getElementById('input');
        this.listHolder = this.shadowRoot.getElementById('list-holder');
        this.data = [{task:"my task",completed:false},{task:"my task",completed:true},{task:"my task",completed:false}];
        this.newList = '';
       
       
    }

    connectedCallback(){
        this.render();
        

        this.inputField.addEventListener('change',(e)=>{
            this.newList = e.target.value;
        });
        this.button.addEventListener('click',()=>{
            if(this.inputField.value != ''){
                this.data.push({
                    task:this.newList,
                    completed:false
                });
                this.newList = '';
                this.inputField.value = '';
                this.render();
            }
            
        });
        
    }

    render=()=>{
        this.listHolder.innerHTML= '';
        this.data.forEach(list => {
        this.el = document.createElement('todo-list');
        this.el.data = list;
        this.listHolder.appendChild(this.el); 
            
        })
        
    }
    handleChange = (e) =>{

    }
    
}
window.customElements.define('todo-app',TodoApp);