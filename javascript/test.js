//Sort
let arr = [27, 8, 5, 13];
// 정렬 시 요소를 문자열로 취급. 숫자에는 적용x
//배열 자체가 변경됨.
// sort는 인수로 함수를 전달받는다

function fuc(a, b) {
  return a - b;
}

arr.sort(fuc);
console.log(arr);
// 두 요소의 크기를 비교해서 양수/음수/0인지 판별
// a가 작으면 a를 앞으로 보낸다 a가 크면 b를 앞으로 보낸다
arr.sort((a, b) => {
  return a - b;
});

//Reduce
//인수로 함수를 받음. 초기값 설정 가능
const resultReduce = arr.reduce((prev, cur) => {
  return prev + cur;
}, 0);
console.log(resultReduce);

let userList = [
  { name: "Mike", age: 30 },
  { name: "Tom", age: 10 },
  { name: "Jane", age: 27 },
  { name: "Sue", age: 26 },
  { name: "Marry", age: 42 },
  { name: "Steve", age: 60 },
];
//조건에 해당하는 값만 추출
let result02 = userList.reduce((prev, cur) => {
  if (cur.age > 19) {
    //현재객체의 age가 19보다 크다면
    prev.push(cur.name); //지금까지의 객체에 push
  }
  return prev;
}, []);

//
let result03 = userList.reduce((prev, cur) => {
  return (prev += cur.age);
}, 0);
/*
  const newUserData = Object.assign({}, user)
  Object.keys(user);
  Object.values(user);
  Object.entries(); //key/value 배열로 반환
  Object.fromEntries(); //key/value배열을 객체로 반환
*/
function Item(title, price) {
  this.title = title;
  this.price = price;
  this.showPrice = function () {
    console.log(`The price of ${title} is ${price}`);
  };
}
const item1 = new Item("a wallet", 400);
const item2 = new Item("a bag", 2000);
const item3 = new Item("a doll", 40);
console.log(item1, item2);
item3.showPrice();

class Item2 {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  showPrice() {
    //해당 메소드는 Item2의 프로토타입에 저장
    console.log(`Class: The price of ${this.title} is ${this.price}`);
  }
}

const item4 = new Item2("Car", 100000);
item4.showPrice();

//4. ARRAY

//For each: 배열 반복. 함수를 인자로
//(해당 요소, 인덱스, 해당 배열자체)
let users = ["Mike", "Tom", "Jane"];
// users.forEach((item, index, arr) => {
//   console.log(item, index, users);
// });
users.forEach((nom, index) => {
  console.log(index, nom);
});
let fruits = ["apple", "banana", "melon"];
fruits.forEach((fruit, num) => {
  console.log(`I want to ${num} ${fruit}`);
});

//배열 인덱스_해당값의 인덱스넘버를 알려준다
arr.indexOf / arr.lastIndexOf;
let arra = [11, 22, 33, 44, 55, 11, 22, 33];
console.log(arra.indexOf(11, 4));
arra.indexOf(33, 3); //두번째 인수= 시작위치
//
// arr.includes
// arr.find(함수)

let userList2 = [
  { name: "Mike", age: 30 },
  { name: "Tom", age: 10 },
  { name: "Jane", age: 27 },
  { name: "Sue", age: 26 },
  { name: "Marry", age: 42 },
  { name: "Steve", age: 60 },
];
//find: 조건 만족하는 요소 하나
const findResult = userList2.find((user) => {
  if (user.age < 19) {
    return true;
  }
  return false;
});

console.log(findResult);

//filter: 만족하는 모든 요소를 배열로 반환

const arr3 = [1, 2, 3, 4, 5, 6];
const filterResult = arr3.filter((item) => {
  return item % 2 == 0;
});
console.log(filterResult);

const filterEx = userList2.filter((nom) => {
  if (nom.age > 30) {
    return `You are ${this.age}`;
  }
});
console.log(filterEx);

const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];
const filterEx2 = words.filter((word) => word.length > 6);
console.log(filterEx2); //(3) ['exuberant', 'destruction', 'present']

//arr.map
//함수를 받아 특정 기능을 시행하고 새로운 배열을 반환한다

const isLeapYear = function (year) {
  // if (year % 4 === 0 || (year % 400 === 0 && !(year % 100 === 0))) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
};
console.log(isLeapYear(2020));
console.log(isLeapYear(2010));
console.log(isLeapYear(2000));
console.log(isLeapYear(1900));

//for of / for in 배열 등과 함께 사용
const array = ["banana", "melon", "apple"];
for (const value of array) {
  console.log(value);
}

for (const index in array) {
  console.log(index, array[index]);
}
//범용적으로 사용
for (let i = 0; i < 5; i++) {}

//assignment

//return: 기본값 이외의 값을 반환하려면, 함수는 반환할 값을 지정하는 return 문이 있어야 합니다. return 문이 없는 함수는 기본값을 반환합니다. new 키워드로 호출되는 생성자의 경우에, 기본값은 자신의 this 매개변수 값입니다. 다른 모든 함수의 경우, 기본 반환값은 undefined입니다.
/*
class Book {
  constructor(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
  }
  displayBookInfo() {
    let titleInfo = `Title: ${this.title};`;
    let authorInfo = `Author: ${this.author}`;
    let genreInfo = `Genre: ${this.genre}`;
    return `Book Information: ${titleInfo} and ${authorInfo} and ${genreInfo}`;
  }
}

function addBook() {
  let titleInput = prompt("title");
  let authorInput = prompt("author");
  let genreInput = prompt("genre");
  return new Book(titleInput, authorInput, genreInput);
}
//빈 배열
let bookArray = [];

for (let i = 0; i < 3; i++) {
  bookArray.push(addBook());
  let quit = prompt("if you exit, please enter q");
  if (quit == "q") break;
}

for (let book of bookArray) {
  //book은 객체
  document.writeln(book.displayBookInfo());
}
*/
let kvArray = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 },
];
const reformattedArray = kvArray.map(({ key, value }) => ({ [key]: value }));

// let reformattedArray = kvArray.map(function (obj) {
//   let emptyObj = {};
//   emptyObj[obj.key] = obj.key.value;
//   return emptyObj;
// });

// reformattedArray is now [{1: 10}, {2: 20}, {3: 30}],
const groceries = [
  { item: "apples", type: "fruit" },
  { item: "cereal", type: "pantry" },
  { item: "pork chops", type: "meat" },
  { item: "bananas", type: "fruit" },
  { item: "broccoli", type: "vegetable" },
];

const newFruit = groceries.filter((item) => item.type === "fruit");
console.log(newFruit);

const movies = [
  { title: "Avatar", year: 2009, rating: "PG-13" },
  { title: "I Am Legend", year: 2007, rating: "PG-13" },
  { title: "300", year: 2006, rating: "R" },
  { title: "The Avengers", year: 2012, rating: "PG-13" },
  { title: "The Wolf of Wall Street", year: 2013, rating: "R" },
];
let y1 = 2006;
let y2 = 2009;
//callback function
function movieByYear(movie) {
  return movie.year >= y1 && movie.year <= y2;
}
let bestYears = movies.filter(movieByYear);
console.log("Array that only between ", y1, " and ", y2, " ", bestYears);
//regular function
let best2 = movies.filter(function (movie) {
  return movie.year >= y1 && movie.year <= y2;
});
//arrow function
let best3 = movies.filter((movie) => movie.year >= y1 && movie.year <= y2);

let reated13 = movies.filter((movie) => movie.rating === "PG-13");

//Map Arrays
let movieTt = movies.map((movie) => movie.title);
console.log(movieTt);

//Reduce Arrays – example 4
//Determine how many of the movies are rated R.
const ratedRMovies = movies.reduce((acc, value) => {
  if (value.rating === "R") {
    acc++;
  }
  return acc;
}, 0);
console.log("How many rated R movies", ratedRMovies);

// company . skill . salary . distance .position
