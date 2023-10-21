var inputText = document.querySelector("#input")
var addBtn = document.querySelector("#button")
var todoList = document.querySelector("#todolist")
var todoArr = JSON.parse(localStorage.getItem("todoArr"))||[]
var rstbtn = document.querySelector("#button2")

addBtn.addEventListener("click",addItemToArray) //When Add button is clicked
inputText.addEventListener("keypress",(event)=>{
    if (event.key=="Enter") {
        addItemToArray()
    }
})//When Input is on focus and Enter is pressed

function addItemToArray(){
    if (inputText.value != "") {
        todoArr.push(inputText.value)
        localStorage.setItem("todoArr",JSON.stringify(todoArr))
    }
    inputText.value = ""
    display()
}
function display() {
    todoList.innerHTML = ""
    todoArr.map((curr,i)=>{
        var listItem = `<li id="item${i}">
        <div>${curr}</div>
        <div>
          <span onclick="deleteItem(${i})">&times;</span>
          <span>|</span>
          <span onclick="editItem(${i})">Edit</span>
        </div>
      </li>`
      todoList.innerHTML += listItem
    })
}
function deleteItem(i) {
    todoArr.splice(i,1)
    localStorage.setItem("todoArr",JSON.stringify(todoArr))
    display()
}
// function editItem(i) {
//     var newValue = prompt("Edit")
//     todoArr.splice(i,1,newValue)
//     display()
// }
function editItem(i) {
    var li = document.getElementById("item"+i);
    var text = todoArr[i];
    li.innerHTML = `<input id="edit${i}" class="edit" type="text" value="${text}" placeholder="Enter Here" />
    <button id="editSubmit${i}" class="editbtn">Update</button>`
    var editInput = document.getElementById("edit"+i)
    var updtbtn = document.getElementById("editSubmit"+i)
    editInput.focus()
    editInput.addEventListener("keypress",(e)=>{
        if (e.key ==="Enter") {
            todoArr[i]=editInput.value;
            localStorage.setItem("todoArr",JSON.stringify(todoArr))
            display()
        }
    })
    updtbtn.addEventListener("click",()=>{
        todoArr[i]=editInput.value;
        localStorage.setItem("todoArr",JSON.stringify(todoArr))
        display()
    })
    editInput.addEventListener("blur",()=>{
        todoArr[i]=editInput.value;
        localStorage.setItem("todoArr",JSON.stringify(todoArr))
        display()
    })

}
rstbtn.addEventListener("click",()=>{
    todoArr = []
    localStorage.setItem("todoArr",JSON.stringify(todoArr))
    display()
})

