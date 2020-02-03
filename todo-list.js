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
        console.log(this.checkBox);
            
    }
   
    set data(list){
        this.shadowRoot.getElementById('list').innerHTML = list.task;
        if(list.completed){
            this.shadowRoot.getElementById('list').style.textDecoration = "line-through";
        }

    }
}
window.customElements.define('todo-list',TodoList);