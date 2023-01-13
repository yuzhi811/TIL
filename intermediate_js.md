hoisting: scope 내부 어디서든 변수 선언은 최상위에 선언된 것처럼 행동
var name;
console.log(name); // undefine : 선언은 호이스팅되지만 할당은 x.
//변수만 호이스팅되었고 값은 그 자리에
name = 'Jane';

같은 상황에서 let은 에러를 반환한다. ReferenceError
let과 const: 호이스팅 되지만 var과 달리 에러를 내는 이유 => Temporal Dead Zone
TDZ 영역에 있는 변수들은 사용할 수 없다. 할당하기 전에는 사용 불가능

2. 변수의 생성 과정
   (1) 선언
   (2) 초기화
   (3) 할당
   var: 선언과 초기화가 동시에 된다.
   let: 선언-초기화-할당
   const: 선언과 할당이 동시에 된다

var: function-scoped
let, const: block-scoped

3. new 연산자와 생성자 함수
   new와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있다.
   function User (name) {
   // this = {}; 빈 객체를 만들어 this에 할당
   this.name = name;
   this.isAdmin = false;

//return this; this가 암시적으로 반환됨
}

let user = new User ('Bora');
user.name // Bora
let me = new User ('Yeji');
me.idAdmin //false

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
{name: "Mike", age: 30},
{name: "Tom", age: 10},
{name: "Jane", age: 27},
{name: "Sue", age: 26},
{name: "Marry", age: 42,
{name: "Steve", age: 60},
]
//조건에 해당하는 값만 추출
let result02 = userList.reduce((prev,cur) => {
if (cur.age > 19) { //현재객체의 age가 19보다 크다면
prev.push(cur.name) //지금까지의 객체에 push
}
return prev;
}, [])

//
let result03 = userList.reduce((prev,cur) => {
return prev += cur.age;
}, 0);
