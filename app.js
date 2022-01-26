// const form = document.getElementById("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const formInput = e.target.elements.book.value;
//   getFetched(formInput);
//   e.target.reset();
// });

// function getFetched(data) {
//   const url = `https://openlibrary.org/subjects/${data}.json`;
//   fetch(url).then((response) => {
//     response.json().then((datum) => {
//       const randomNumber = randomer(datum.works.length);
//       // console.log(datum.works[randomNumber].authors[0].name);

//       const received = datum.works[randomNumber].title;
//       displayData(received);
//       // console.log(received);
//     });
//   });
// }

// function displayData(data) {
//   document.getElementById("result").innerText = data;
// }

// function randomer(num) {
//   return Math.floor(Math.random() * num);
// }

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formInput = e.target.elements.book.value;

  getFetched(formInput);
  e.target.reset();
});

function getFetched(data) {
  const url = `https://openlibrary.org/subjects/${data}.json`;
  asyncGetInfo(url);
  fetch(url).then((response) => {
    // if (!response.ok) throw new Error("Book not found");
    response.json().then((datum) => {
      console.log(datum);
      displayData(datum);
    });
  });
}

function displayData(data) {
  const randomNumber = randomer(data.works.length);
  const author = data.works[randomNumber].authors[0].name;
  const received = data.works[randomNumber].title;
  const img = `https://covers.openlibrary.org/b/id${data.works[randomNumber].cover_id}-L.jpg`;
  console.log(img);
  // https://covers.openlibrary.org/b/$key/$value-$size.jpg";
  document.getElementById("result").innerText = received;
  document.getElementById("author").innerText = author;
  const image = document.getElementById("image");
  image.innerHTML = '<img src="' + img + '"/>';
}

function randomer(num) {
  return Math.floor(Math.random() * num);
}

async function asyncGetInfo(data) {
  try {
    const response = await fetch(data);

    return await response.json();
  } catch (err) {
    document.getElementById("result").innerText =
      "Check your spelling : " + err;
  }
  // data.finally(() => {
  //   console.log("Finally");
  // });
}
