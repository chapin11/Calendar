let calendarTitle = document.querySelector(".title");
let calendarMain = document.querySelector(".main-calendar");
let calendar = document.querySelector(".calendar");
let notesBlock = document.querySelector(".notes");
let plusBtn = document.querySelector(".plus");
let createNote = document.querySelector(".add-note");

notesBlock.hidden = true;
let now = new Date();
calendarTitle.innerText = `${getFullMonth(now)} ${now.getFullYear()}`;

//* Функция выводит полное название месяца
function getFullMonth(date) {
  let moths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return moths[date.getMonth()];
}

//* Функция выводит название дня недели
function getWeekDay(date, i) {
  let day = [
    "Sunday ",
    "Monday  ",
    "Tuesday ",
    "Wednesday ",
    "Thursday ",
    "Friday ",
    "Saturday ",
  ];

  let dayWeek = new Date(date.getFullYear(), date.getMonth(), i);

  return day[dayWeek.getDay()];
}

//* Расчет дней в текущем месяце
let AllDays = new Date(now.getFullYear(), now.getMonth() - 1, 0).getDate();

//* создание и вывод всех дней
for (let i = 0; i < AllDays; i++) {
  let day = document.createElement("div");
  day.className = `days ${i + 1}`;
  day.id = `daysId`;
  day.innerHTML = `${i + 1} <div>${getWeekDay(now, i + 1)}</div>`;
  calendarMain.append(day);
  day.style.boxShadow = "";
  let daysId = document.querySelectorAll(".daysId");

  if (i + 1 == now.getDate()) {
    day.classList.add("today");
  }
}

let sumbitDay = "";
let selDays = [];

for (let i = 0; i < daysId.length; i++) {
  //* Обработка клика на дату
  daysId[i].onclick = function (event) {
    if (!event.target.classList.contains("days")) return;

    //* Подсвечивание при клике на дату
    if (selDays.length > 0) {
      selDays[0].classList.remove("selected-day");
    }
    event.target.classList.add("selected-day");
    selDays.push(event.target);
    selDays = selDays.slice(selDays.length - 1, selDays.length);

    //* Появляется блок с заметками
    sumbitDay = this;
    target = event.target;
    calendar.style.width = "70%";
    calendarMain.style.height = "500px";
    notesBlock.hidden = false;
  };
}
document.getElementById("closebtn").onclick = function () {
  calendar.style.width = "";
  calendarMain.style.height = "";
  notesBlock.hidden = true;
};

let ch = document.createElement("input");
ch.type = "checkbox";

plusBtn.onclick = function (event) {
  let div = document.createElement("div");
  event.preventDefault();
  let note = document.createElement("textarea");
  notesBlock.append(note);
  note.className = "add-note1";
  note.placeholder = "Нажмите Enter для подтверждения";
  notesBlock.append(div);
  div.className = "add-note";
  div.hidden = true;

  note.onkeydown = function (event) {
    if (event.key == "Enter") {
      div.hidden = false;
      note.hidden = true;
      div.innerHTML = `<div><b><i>${sumbitDay.innerText}:</i></b>  ${note.value}</div> <div class='xbtn' style='cursor:pointer'>X</div>`;
      sumbitDay.innerHTML +=
        '<div style="width:10px;height:10px;background-color:salmon; margin-left:5px; position:absolute;"></div>';
    }
  };
};
document.onclick = function (event) {
  if (event.target.className != "xbtn") return;
  event.target.parentElement.remove();
};
// Создать окно справо в котором можно будет добавлять заметки к дате
/* .color1 {color: #140f0b;}
.color2 {color: #202e52;}
.color3 {color: #585da6;}
.color4 {color: #a397fa;}
.color5 {color: #ffdcf4;} */

//* 22.07.24 - 29.07.24
