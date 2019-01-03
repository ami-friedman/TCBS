/** Saves the index state of the row number for each category (new budget form) 
 * The static page loads with index === 0 and therefore starting index at 1
*/
let index1 = 1;
let index2 = 1;
let index3 = 1;

//Budget form handler
$("#ul-category-1").on("click", ".edit-button" ,function(event){
    toggleAddRemoveItem($(this), 1, index1++);
});

$("#ul-category-2").on("click", ".edit-button" ,function(event){
    toggleAddRemoveItem($(this), 2, index2++);
});

$("#ul-category-3").on("click", ".edit-button" ,function(event){
    toggleAddRemoveItem($(this), 3, index3++);
});

function toggleAddRemoveItem(item, category, index){
    item.toggleClass("btn-success");
    item.toggleClass("btn-danger");
    if (item.text() === '+'){
        item.text("-");
        addRow(item, category, index);
    } else {
        removeRow(item);
    }

}

function addRow(currentRow, category, index){
    var newRow = $("<li style='list-style: none;'>");
    var cols = '';

    cols += `<div class='form-row'><div class='col form-group'><input type='text' class='form-control' name='${category}[${index}][name]' placeholder='Expense Name'></div>`;
    cols += `<div class='col form-group'><input type='text' class='form-control' name='${category}[${index}][amount]' placeholder='Expense Amount'></div>`;
    cols += `<div class='col form-group add-remove-button'><button type='button' class='btn btn-success edit-button'>+</button></div></div>`;

    newRow.append(cols);
    newRow.append("</li>");
    
    currentRow.closest("ul").append(newRow);
}

function removeRow(item){
    item.closest("li").remove();
}

