// console.log(this)

// console.dir(this)


// function checkThis() {
//   console.log(this)
// }
// checkThis()

// let fnc = {
//   name: "hasan",
//   sayName: function () {
//     console.log(this.name);
//   },
// };
// fnc.sayName();


// document.querySelector("h1").addEventListener("click", function () {
//   console.log(this.style.color = "cyan");
// });

// let obj = {
//   name: "hasan",
//   sayName: function () {
//     let obj_2 = () => {
//       console.log(this);
//     }
//     obj_2();
//   },
// };
// obj.sayName();


let nameObj = {
  name: "hasan",
}

function testCall(a, b) {
  console.log(this, a, b);
}

testCall.call(nameObj, 1, 2);
testCall.apply(nameObj, [1, 2]);

let newTest = testCall.bind(nameObj, 1, 2);
newTest();
