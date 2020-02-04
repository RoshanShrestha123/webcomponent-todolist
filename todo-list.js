const todo_list_template = document.createElement('template');
todo_list_template.innerHTML = `

<style>
   
   .list-wrapper{
        padding:10px;
        background-color:white;
        margin:10px;
        border:1px solid white;
        box-shadow:0px 5px 5px #e3e3e3;
        text-align:left;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
   }
   .list{

   }
   .completed{
       text-decoration:line-through;
   }
   .incompleted{
    text-decoration:none;
}
   
</style>
<div class="list-wrapper"> 
   <div id="list"></div>
   <input type="checkbox" id="checkBox"></input>
</div>  

`
class TodoList extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(todo_list_template.content.cloneNode(true));    
        this.checkBox = this.shadowRoot.getElementById('checkBox');
        this.checkBox.addEventListener('change',() => {
            this.handleToggler(this.todoList.id);
            console.log("changed");
            
        })
        this.list = this.shadowRoot.getElementById('list');            
    }
   
    set data(list){
        this.todoList = list;
        this.shadowRoot.getElementById('list').innerHTML = this.todoList.task;
        if(this.todoList.completed){
            this.checkBox.checked = true;
            this.list.setAttribute('class','completed');
            
        }else{
            this.checkBox.checked = false;
            this.list.setAttribute('class','incomplete');
        }

    }
    set toggler(toggler){
        this.handleToggler = toggler; 
    }
}
window.customElements.define('todo-list',TodoList);