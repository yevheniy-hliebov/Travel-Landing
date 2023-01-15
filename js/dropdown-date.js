function render(){
    let months, daysOfWeek, today, reset,
    // language = navigator.language;
    language = 'en';
    if (language == 'uk'){
        months = [ 'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
        daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
        today = 'Сьогодні';
        reset = "Очистити";
    }
    else {
        months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        today = 'Today';
        reset = "Reset";
    }

    
    // Current All Variablies Date
    let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    currDay = date.getDay(),
    currDate = date.getDate();

    let currDateValue = getFormat(currYear, currMonth + 1, currDate);

    let iMonth = currMonth, iYear = currYear;

    const dropdownsDate = document.querySelectorAll(".dropdown-date");

    for (let index = 0; index < dropdownsDate.length; index++) {
        // ===================
        // Dropdown Input Date
        const dropdownDate = dropdownsDate[index];
        dropdownDate.classList.add(`dropdown-date--${index}`);
        const dropdownBtn = dropdownDate.querySelector(".dropdown-date__btn"),
        dropdownInput = dropdownDate.querySelector('input[type="date"]'),
        dropdownCalendarWrapper = dropdownDate.querySelector(".dropdown-date__wrapper");

        let dataLocalFormating = String('{ "weekday":"long", "year":"numeric", "month":"short", "day":"numeric"}')
        if (dropdownBtn.hasAttribute("data-date-format")){
            dataLocalFormating = String(dropdownBtn.getAttribute("data-date-format"));
        }
        

        // ===================
        // Calendar
        const calendar = dropdownDate.querySelector(".calendar");
        let checkedDateValue = currDateValue; // selected date
        //Navigation Btns
        const navBtnPrev = calendar.querySelector(".calendar__nav-btn--prev"),
        navBtnNext = calendar.querySelector(".calendar__nav-btn--next"),
        //Actions Btns
        bntReset = calendar.querySelector(".calendar__btn--reset"),
        btnToday = calendar.querySelector(".calendar__btn--today"),
        // text obj of calendar
        monthYearLabel = calendar.querySelector(".calendar__month-year"),
        listDayOfWeek = calendar.querySelectorAll(".calendar__week-day"),
        listDate = calendar.querySelector(".calendar__list-date");

        for (let i = 0; i < listDayOfWeek.length; i++) {
            const dayOfWeek = listDayOfWeek[i];
            dayOfWeek.textContent = daysOfWeek[i];
        }
        if (btnToday) btnToday.textContent = today;
        if (bntReset) bntReset.textContent = reset;

        renderDateList(listDate, monthYearLabel, iMonth, iYear);

        document.addEventListener("click", function(e) {
            const targetEl = e.target;

            // Click and Select Date
            let listItemsDate = listDate.querySelectorAll(".calendar__item-date");
            for (const itemDate of listItemsDate) {
                if (targetEl === itemDate){
                    listItemsDate.forEach(dateItem => {
                        if (dateItem.classList.contains("calendar__item-date--active")){
                            dateItem.classList.remove("calendar__item-date--active");
                        }
                    });
                    itemDate.classList.add("calendar__item-date--active");
                    checkedDateValue = itemDate.dataset.value;

                    let setDate = new Date(Date.parse(checkedDateValue));
                    dropdownBtn.textContent = setDate.toLocaleDateString('en-us', JSON.parse(`${dataLocalFormating}`));
                    dropdownBtn.focus();

                    dropdownInput.setAttribute("value", checkedDateValue);
                    if (dropdownBtn.classList.contains("dropdown-date__btn--active")){
                        dropdownBtn.classList.remove("dropdown-date__btn--active");
                    }
                    if (dropdownCalendarWrapper.classList.contains("dropdown-date__wrapper--open")){
                        dropdownCalendarWrapper.classList.remove("dropdown-date__wrapper--open");
                    }
                    break;
                }
            }

            // Navigation Prev
            if (targetEl === dropdownBtn){
                dropdownBtn.classList.toggle("dropdown-date__btn--active");
                dropdownCalendarWrapper.classList.toggle("dropdown-date__wrapper--open");
            }
            if (targetEl === navBtnPrev){
                iMonth--;
                if (iMonth < 0){
                    iMonth = 11;
                    iYear--;
                }
                renderDateList(listDate, monthYearLabel, iMonth, iYear);
                dropdownBtn.focus();
            }
            // Navigation Next
            if (targetEl === navBtnNext){
                iMonth++;
                if (iMonth > 11){
                    iMonth = 0;
                    iYear++;
                }
                renderDateList(listDate, monthYearLabel, iMonth, iYear);
                dropdownBtn.focus();
            }
            // Reset
            if (targetEl === bntReset){
                checkedDateValue = currDateValue;
                renderDateList(listDate, monthYearLabel, currMonth, currYear);
                dropdownInput.setAttribute("value", '');
                dropdownBtn.textContent = 'Date';
                dropdownBtn.focus();
            }
            // Set Today
            if (targetEl === btnToday){
                checkedDateValue = currDateValue;
                renderDateList(listDate, monthYearLabel, currMonth, currYear);
                dropdownInput.setAttribute("value", checkedDateValue);

                let setDate = new Date(Date.parse(checkedDateValue));
                dropdownBtn.textContent = setDate.toLocaleDateString('en-us', JSON.parse(`${dataLocalFormating}`));

                if (dropdownBtn.classList.contains("dropdown-date__btn--active")){
                    dropdownBtn.classList.remove("dropdown-date__btn--active");
                }
                if (dropdownCalendarWrapper.classList.contains("dropdown-date__wrapper--open")){
                    dropdownCalendarWrapper.classList.remove("dropdown-date__wrapper--open");
                }
                dropdownBtn.focus();
            }

            if (!targetEl.closest(`.dropdown-date--${index}`) && dropdownCalendarWrapper.classList.contains("dropdown-date__wrapper--open")){
                if (dropdownBtn.classList.contains("dropdown-date__btn--active")){
                    dropdownBtn.classList.remove("dropdown-date__btn--active");
                }
                if (dropdownCalendarWrapper.classList.contains("dropdown-date__wrapper--open")){
                    dropdownCalendarWrapper.classList.remove("dropdown-date__wrapper--open");
                }
            }
        });


        // ===================
        // Functions
        function renderDateList(listDate, monthYearLabel, iMonth, iYear){
            // Current All Variablies Date
            let lastDateOfMonth = new Date(iYear, iMonth + 1, 0).getDate(),       // length days in month
            firstDayOfMonth = new Date(iYear, iMonth, 1).getDay(),                  // first week day of month
            lastDayOfMonth = new Date(iYear, iMonth, lastDateOfMonth).getDay(),     // last week day of month
            lastDateOfLastMonth = new Date(iYear, iMonth, 0).getDate();             // last date in last month
        
            //subtract by one index and if day == -1 set 6 
            //because we start the countdown from Monday and finish on Sunday
            firstDayOfMonth = firstDayOfMonth - 1;
            lastDayOfMonth = lastDayOfMonth - 1;
            if (firstDayOfMonth == -1){
                firstDayOfMonth = 6;
            }
            if (lastDayOfMonth == -1){
                lastDayOfMonth = 6;
            }
        
            monthYearLabel.textContent = `${months[iMonth]} ${iYear}`;
        
            listDate.innerHTML = '';
            // last dates of last month
            for (let i = firstDayOfMonth; i > 0; i--) {
                const li = document.createElement("li");
                li.textContent = lastDateOfLastMonth - i + 1;
                li.classList.add("calendar__item-date");
                li.classList.add("calendar__item-date--prev-month");
    
                if (iMonth == 0){
                    li.setAttribute("data-value", getFormat(iYear - 1, 12, lastDateOfLastMonth - i + 1));
                }
                else li.setAttribute("data-value", getFormat(iYear, iMonth, lastDateOfLastMonth - i + 1));
    
                isActiveOrCurrDate(li);
    
                listDate.append(li);
            }

            // all dates in current month 
            for (let i = 0; i < lastDateOfMonth; i++) {
                const li = document.createElement("li");
                li.textContent = i + 1;
                li.classList.add("calendar__item-date");
                
                li.setAttribute("data-value", getFormat(iYear, iMonth + 1, i + 1));
                
                isActiveOrCurrDate(li);
    
                listDate.append(li);
            }
            
            // first dates of next month
            for (let i = lastDayOfMonth + 1; i < 7; i++) {
                const li = document.createElement("li");
                li.textContent = i - lastDayOfMonth;
                li.classList.add("calendar__item-date");
                li.classList.add("calendar__item-date--prev-month");
    
                if (iMonth == 11){
                    li.setAttribute("data-value", getFormat(iYear + 1, 1, i - lastDayOfMonth));
                }
                else li.setAttribute("data-value", getFormat(iYear, iMonth + 2, i - lastDayOfMonth));
    
                isActiveOrCurrDate(li);
    
                listDate.append(li);
            } 
        }
        
        // check date - for current date set class calendar__item-date--current
        //              for selected date set class calendar__item-date--current
        function isActiveOrCurrDate(liobj) {  
            if (liobj.dataset.value == currDateValue){
                liobj.classList.add("calendar__item-date--current");
            }
            if (liobj.dataset.value == checkedDateValue){
                liobj.classList.add("calendar__item-date--active");
            }
        }
    // }
    }

    
    // getting the "yyyy-mm-dd" format, which is valid in input date
    function getFormat(year, month, date){
        let stringFormat = "";
        if (year < 10 && year > 0){
            stringFormat += "000" + `${year}`;
        }
        else if (year < 100 && year >= 10){
            stringFormat += "00" + `${year}`;
        }
        else if (year < 1000 && year >= 100){
            stringFormat += "0" + `${year}`;
        }
        else {
            stringFormat += `${year}`;
        }
        stringFormat += '-';

        if (month < 10 && month > 0){
            stringFormat += "0" + `${month}`;
        }
        else {
            stringFormat += `${month}`;
        }
        stringFormat += '-';

        if (date < 10 && date > 0){
            stringFormat += "0" + `${date}`;
        }
        else {
            stringFormat += `${date}`;
        }
        return stringFormat;
    }
}
render();


