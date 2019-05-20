
    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a){
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }
    hideTabContent(1);

    function showTabContent(b){
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", (event) => {
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = "2019-05-30";

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

            return{
            "total" : t,
            "hours" : hours,
            "minutes" : minutes,
            "seconds" : seconds
        };
    
    }

    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000);
        
            
        function updateClock(){
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            
            if (t.seconds < 10 ) {
                seconds.textContent = "0" + t.seconds;
            }
            if (t.minutes < 10) {
                minutes.textContent = "0" + t.minutes;
            }
            if (t.hours < 10) {
                hours.textContent = "0" + t.hours;
            }

            if(t.total <= 0){
                clearInterval(timeInterval);
                timer.textContent = "00:00:00";

            }
            
        }
        return "";
    }
    setClock("timer", deadline);
    
    //Modal

    let more = document.querySelectorAll(".more, .description-btn"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close");
       
        
    more.forEach((item) => {
        item.addEventListener("click", () => {
        overlay.style.display = "block";
        item.classList.add("more-splash");
        document.body.style.overflow = "hidden";
        
    });

    close.addEventListener("click", () => {
        overlay.style.display = "none";
        item.classList.remove("more-splash");
        document.body.style.overflow = "";
    });
    });

    // Form

    let message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };
    
 function callBackForm(callback) {


    let form = document.querySelector(callback),
        input = form.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

        statusMessage.classList.add("status");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        
    function postData() {
      return new Promise((resolve, reject) =>{

        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader ("Content-type", "application/json; charset=utf-8");

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
         });
        let json = JSON.stringify(obj);

        request.onreadystatechange = function() {
          
            if (request.readyState < 4){
                resolve();
            } else if(request.readyState === 4 && request.status == 200){
                resolve();
            } else {
                reject();
            }
        };
        
        request.send(json);
      });
    }
    
        function clearInput(){
            for (let i = 0; i < input.length; i++){
                input[i].value = "";
            }
        }

        postData()
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput);
        
        close.addEventListener("click", () => {
           if(form.contains(statusMessage)){
            form.removeChild(statusMessage);
            }
        });
            
    }); 
    
}
    callBackForm('.main-form');
    callBackForm('#form');

    function phoneNumber() {
        let placeholder = "+7 (___) ___ __ __",
        i = 0,
        def = placeholder.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) { 
            val = def; 
        }

        this.value = placeholder.replace(/./g,  (a) => {
         return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });

       }
       let input = document.querySelectorAll(".phone-number");
       input.forEach((item) => {
            item.addEventListener("input", phoneNumber);
       });

    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");

    showSlides(slideIndex);
    function showSlides(n) {

        if(n > slides.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = "none");
            // for(let i = 0; i < slides.length; i++) {
            //     slides[i].style.display = "none";
            // }
        dots.forEach((item) => item.classList.remove("dot-active"));

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("dot-active");
    }
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener("click", () => {
        plusSlides(-1);
    });

    next.addEventListener("click", () => {
        plusSlides(1);
    });

    dotsWrap.addEventListener("click", (event) => {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains("dot") && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    // Calc

    let persons = document.querySelectorAll(".counter-block-input")[0],
        restDays = document.querySelectorAll(".counter-block-input")[1],
        inputValue = document.querySelectorAll(".counter-block-input"),
        place = document.getElementById("select"),
        totalValue = document.getElementById("total"),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        inputValue.forEach(function (elem, i, item) {
            item[i].addEventListener("change", function () {
              item[i].value = item[i].value.replace(/\D/ig, "");
            });
          });

        persons.addEventListener("change", function() {
           personsSum = +this.value;
           total = (daysSum + personsSum) * 4000;

           if(restDays.value =="" || restDays.value.charAt(0) == 0 || persons.value.charAt(0) == 0){
            totalValue.innerHTML = 0;
           } else {
            totalValue.innerHTML = total;
           }
        });

        restDays.addEventListener("change", function() {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;
 
            if(persons.value =="" || restDays.value.charAt(0) == 0 || persons.value.charAt(0) == 0){
             totalValue.innerHTML = 0;
            } else {
             totalValue.innerHTML = total;
            }
         });

         place.addEventListener("change", function() {
            if(restDays.value =="" || persons.value =="" || restDays.value.charAt(0) == 0 || persons.value.charAt(0) == 0) {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
         });

        
