const dropBtnForms = document.querySelectorAll(".dropdown-btn-form");
for (let i = 0; i < dropBtnForms.length; i++) {
    const dropBtnForm = dropBtnForms[i];
    const dropBtn = dropBtnForm.querySelector(".dropdown-btn-form__btn");
    dropBtn.classList.add("btn--" + (i+1));
    const dropList = dropBtnForm.querySelector(".dropdown-btn-form__list");
    const dropListItems = dropList.querySelectorAll('.dropdown-btn-form__list-item');
    const inputElement = dropBtnForm.querySelector(".dropdown-btn-form__value");

    dropBtn.addEventListener("click", function(event) {
        this.classList.toggle("active");
        dropList.classList.toggle("active");
        event.preventDefault();
    });

    let k = 0;
    dropBtn.addEventListener("keydown", function(event) {
        if(dropBtn === document.activeElement){
            if(event.key === 'ArrowDown'){
                k++;
                if(k > dropListItems.length) k = 1;
                setValue(dropListItems[k-1]);
                checkSelectItem();
                event.preventDefault();
            }
            else if(event.key === 'ArrowUp'){
                if(k <= 1) k = dropListItems.length;
                else k--;
                setValue(dropListItems[k-1]);
                checkSelectItem();
                event.preventDefault();
            }
        }
    });

    for (const listItem of dropListItems) {
        
        listItem.addEventListener("click", function(event) {
            event.stopPropagation();
            setValue(this);
            dropBtn.focus();
            removeDropForm();

            for (const listItem2 of dropListItems) {
                if(inputElement.getAttribute("value") == listItem2.dataset.value){
                    listItem2.classList.add("active");
                }
                else if(listItem2.classList.contains("active")){
                    listItem2.classList.remove("active");
                }
            }
        });
    }

    document.addEventListener("click", function(event) {
        if(!event.target.matches(".dropdown-btn-form__btn.btn--" + (i+1))){
            removeDropForm();
        }
    });

    document.addEventListener("keydown", function(event){
        if(event.key === 'Tab' || event.key === "Escape"){
            removeDropForm();
        }
    });

    function setValue(listItem){
        inputElement.setAttribute("value", `${listItem.dataset.value}`);
        dropBtn.textContent = listItem.textContent;
    }

    function checkSelectItem(){
        for (const Item of dropListItems) {
            if(inputElement.getAttribute("value") == Item.dataset.value){
                Item.classList.add("active");
            }
            else if(Item.classList.contains("active")){
                Item.classList.remove("active");
            }
        }
    }

    function removeDropForm(){
        if(dropBtn.classList.contains("active") && dropList.classList.contains("active")){
            dropBtn.classList.remove("active");
            dropList.classList.remove("active");
        }
    }
}
