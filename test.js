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
