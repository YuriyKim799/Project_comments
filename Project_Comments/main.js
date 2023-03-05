let comments = [];
// loadComments();
const commentName = document.getElementById('comment-name');
const commentTime = document.getElementById('comment-time');
const commentText = document.getElementById('comment-textarea');
const btnEl = document.querySelector('.btn');
const formEl = document.querySelector('form');

const handler = (event) => {
  event.preventDefault();
  let comment = {
    name: commentName.value,
    time: commentTime.value,
    text: commentText.value,
  }

  if (commentTime.value) {
    comment.time = commentTime.value;
  } else if (commentName.value !== "" && commentText.value !== "") {
    comment.time = Math.floor(Date.now() / 1000);
  }

  commentName.value = '';
  commentText.value = '';
  commentTime.value = '';
  comments.push(comment)

  saveComments();
  showComments();
}

btnEl.addEventListener('click', handler);


function saveComments() {
  localStorage.setItem('comments', JSON.stringify(comments));
}

// function loadComments() {
//   if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
//   showComments();
// }

function showComments() {
  let commentField = document.querySelector('.comment-field');
  let element = '';
  comments.forEach(function (item) {
    element += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`
    element += `<p>${item.name}</p>`
    element += `<p>${item.text}</p>`
  })
  commentField.innerHTML = element;
}

function timeConverter(UNIX_timestamp) {
  // console.log(UNIX_timestamp);
  let UNIX_timestamp_str = UNIX_timestamp.toString();
  // console.log(UNIX_timestamp_str);
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;


  if (UNIX_timestamp_str.length == 10) {
    return time;
  } else {
    return UNIX_timestamp_str
  }
}