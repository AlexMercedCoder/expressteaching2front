const $ul = $("ul");
const URL = "https://expressteaching2.herokuapp.com";

fetch(URL + "/dog")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((dog) => {
      $dog = $("<li>").text(`${dog.name} is ${dog.age} years old`);
      $ul.append($dog);
    });
  });

const handleAdd = async (event) => {
  //grab data from form
  const name = $('[name="name"]').val();
  const age = $('[name="age"]').val();

  //make a post request to create a dog
  await fetch("/dog", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age }),
  });

  //get full list of dogs
  const response = await fetch(URL + "/dog");
  const data = await response.json();

  //empty the UL
  $ul.empty();

  //rebuild the ul
  data.forEach((dog) => {
    $dog = $("<li>").text(`${dog.name} is ${dog.age} years old`);
    $ul.append($dog);
  });
};

$("button").on("click", handleAdd);
