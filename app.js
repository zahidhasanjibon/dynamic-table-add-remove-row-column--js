// select inputfiled,addcolumn btn,addrow btn,tableColumn tr,tableRow tr
const columnNameInputFiled = document.querySelector("#column-name-input-field")
const addColumnButton = document.querySelector("#add-column-btn")
const addRowButton = document.querySelector("#add-row-btn")

const tableColumnContainer = document.querySelector(".table-column-container")
const tableRowContainer = document.querySelector(".table-row-container")

// for add a unique number to every column
let columnIdentityNum = 0

// add event to dom element
addColumnButton.addEventListener("click", addColumn)
addRowButton.addEventListener("click", addRow)


// delete column functionilaty

function handleColumnDelete(event) {
    event.target.parentElement.parentElement.remove()

    // to get all rows of that column
    const whichRowsToDelete = event.target.parentElement.dataset.columnnum;
    const allTableRowsTrArray = document.querySelectorAll(".table-row-tr")

    // for delete all row of that column
    for (let i = 0; i < allTableRowsTrArray.length; i++) {
        allTableRowsTrArray[i].children[whichRowsToDelete].style.display = 'none'
    }


}


// add column functionality

function addColumn() {
    columnIdentityNum += 1
    const columnName = columnNameInputFiled.value
    if (!columnName) return alert('please provide column name')
    const th = document.createElement("th")
    const columnMarkUp = `
                <div class="d-flex align-items-center" data-columnnum = ${columnIdentityNum}>
                    ${columnName} <span onclick="handleColumnDelete(event)" class="delete-column">x</span>
                </div>
            `
    th.innerHTML = columnMarkUp
    tableColumnContainer.appendChild(th)
    columnNameInputFiled.value = ''
}

// add row functionality

function addRow() {
    const numOfColumn = tableColumnContainer.childElementCount

    const tr = document.createElement('tr')
    tr.className = 'table-row-tr'
    tr.innerHTML = `
                <td style="width:300px;">
                <div class="d-flex">
                  <button class="btn btn-info save-btn" onclick="handleSave(event)">Save</button>
                  <button class="btn btn-info edit-btn" onclick="handleEdit(event)">Edit</button>
                  <button class="btn btn-warning update-btn" onclick="handleUpdate(event)">
                    Update
                  </button>
                  <button class="btn btn-danger ms-3" onclick="handleDelete(event)">Delete</button>
                </div>
              </td>
                `
    // for append new input field in a row based on how many column that table has
    for (let i = 1; i < numOfColumn; i++) {
        const td = document.createElement("td")
        const inputFileddMarkup = `
                    <div class="d-flex">
                    <span class="input-value-showing-div"> </span>
                    <input type="text" class="form-control"/>
                    </div>
                    `
        td.innerHTML = inputFileddMarkup
        tr.appendChild(td)
    }

    tableRowContainer.appendChild(tr)
}

// save btn functionality

function handleSave(event) {
    // get all input filed of a row
    const inputElementsArrayOfRow = event.target.closest(".table-row-tr").querySelectorAll(".form-control");
    const tableRow = event.target.closest(".table-row-tr")

    // save all the input value in the table row

    for (let i = 0; i < inputElementsArrayOfRow.length; i++) {
        const inputFiledvalue = inputElementsArrayOfRow[i].value
        const inputValueShowingElm = inputElementsArrayOfRow[i].parentElement.querySelector(".input-value-showing-div")
        inputValueShowingElm.innerHTML = inputFiledvalue
        inputElementsArrayOfRow[i].style.display = 'none'
    }

    // hide save button and display edit button
    const saveButton = tableRow.querySelector(".save-btn")
    const edditButton = tableRow.querySelector(".edit-btn")
    saveButton.style.display = 'none'
    edditButton.style.display = 'block'


}

// edit button functionality

function handleEdit(event) {
    // get all input filed and value of a row
    const inputValueShowingDiv = event.target.closest(".table-row-tr").querySelectorAll(".input-value-showing-div");
    const tableRow = event.target.closest(".table-row-tr")
    const inputFiledArray = event.target.closest(".table-row-tr").querySelectorAll(".form-control");

    // show all input filed with previous value
    for (let i = 0; i < inputValueShowingDiv.length; i++) {
        const inputValue = inputValueShowingDiv[i].innerHTML
        inputValueShowingDiv[i].innerHTML = ''
        inputFiledArray[i].style.display = 'block'
        inputFiledArray[i].value = inputValue
    }
    // hide edit button and show update button
    const edditButton = tableRow.querySelector(".edit-btn")
    const updateButton = tableRow.querySelector(".update-btn")
    edditButton.style.display = 'none'
    updateButton.style.display = 'block'
}

// update btn functionality

function handleUpdate(event) {

    // get all input of a row
    const inputElementsArrayOfRow = event.target.closest(".table-row-tr").querySelectorAll(".form-control");
    const tableRow = event.target.closest(".table-row-tr")

    // take all the input value and save in the table row
    for (let i = 0; i < inputElementsArrayOfRow.length; i++) {
        const inputFiledvalue = inputElementsArrayOfRow[i].value
        const inputValueShowingElm = inputElementsArrayOfRow[i].parentElement.querySelector(".input-value-showing-div")
        inputValueShowingElm.innerHTML = inputFiledvalue
        inputElementsArrayOfRow[i].style.display = 'none'
    }

    // for showing edit butto and hide update button

    const updateButton = tableRow.querySelector(".update-btn")
    const edditButton = tableRow.querySelector(".edit-btn")
    updateButton.style.display = 'none'
    edditButton.style.display = 'block'
}

// delete btn functionality

function handleDelete(event) {
    const rowThatToDelete = event.target.closest(".table-row-tr")
    rowThatToDelete.remove()
}
