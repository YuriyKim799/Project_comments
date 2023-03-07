const commentName = document.getElementById('comment-name');
const commentDate = document.getElementById('comment-date');
const commentText = document.getElementById('comment-textarea');
const btnEl = document.querySelector('.btn');
const formEl = document.querySelector('form');
const inpEls = formEl.querySelectorAll('input');
const commentField = document.querySelector('.comment-field')

let months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

// let options = {
//   month: 'short',
//   weekday: 'short',
//   year: 'numeric',
//   day: 'numeric',
//   timezone: 'UTC',
//   hour: 'numeric',
//   minute: 'numeric',
//   second: 'numeric'
// }

formEl.addEventListener('submit', event => {
  if (commentName.value == '' || commentText.value == '') {
    commentName.classList.add('error');
    commentText.classList.add('error');
    event.preventDefault();
  }
  if (commentName.value !== '' && commentText.value !== '') {
    commentName.classList.remove('error');
    commentText.classList.remove('error');
    handler()
    event.preventDefault();
  }
})

inpEls.forEach(inpEl => {
  if (inpEl.value == "" && !inpEl.classList.contains('date')) {
    inpEl.addEventListener('input', event => {
      if (event.target.value !== '') {
        event.target.classList.remove('error');
      }
    })
  }
})

function handler() {
  // let handlerTime = new Date().toLocaleDateString('ru-RU', options);
  let handlerTime = new Date();
  let dayState = "";
  // let dateTime = handlerTime.getDate().toString.padStart(2, "0");
  let dateTime = handlerTime.getDate();
  let monthTime = handlerTime.getMonth();
  let yearTime = handlerTime.getFullYear();
  let h = handlerTime.getHours();
  h = h < 10 ? '0' + h : h;
  let m = handlerTime.getMinutes();
  m = m < 10 ? '0' + m : m;
  let handlerDate = new Date().getDate();

  if (handlerDate == dateTime) {
    dayState = 'СЕГОДНЯ';
  } else if (handlerDate > dateTime) {
    dayState = 'ВЧЕРА';
  }

  let comment = {
    name: commentName.value,
    date: `${handlerDate}  ${months[new Date().getMonth()]}`,
    text: commentText.value,
    // time: handlerTime,
    time: `${dateTime} ${months[monthTime]} ${yearTime} ${h}:${m}`
  }

  if (commentDate.value) {
    comment.date = commentDate.value;
  }

  inpEls.forEach(inpEl => { // здесь мы очищаем наши инпуты
    inpEl.value = '';
  });

  commentField.innerHTML += `
  <div class="comment-container">
    <div class="comments-text">
    <p class="text-right small"><span class="small-text"><em>${dayState}</em></span><em>
    ${comment.time}
    </em>
    </p>
  <p><span class="small-text">Пользователь:</span> ${comment.name}</p>
  <p><span class="small-text">ваш комментарий:</span> ${comment.text}</p>
  <p><span class="small-text">${comment.date}</span></p>
    </div>
 <div class="icons">  
 <i class="fa-solid fa-trash-can"></i>
 <i class="fa-sharp fa-solid fa-heart"></i>
 </div>
 </div>`
}

commentField.addEventListener('click', (event) => {
  if (!event.target.classList.contains("fa-trash-can")) {
    return;
  } else {
    event.target.parentElement.parentElement.remove();
  }
});

commentField.addEventListener('click', (event) => {
  if (!event.target.classList.contains("fa-heart")) {
    return;
  } else {
    event.target.classList.toggle('heart-like');
  }
});
