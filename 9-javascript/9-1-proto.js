const x = {};
const y = {};
console.log(x);
console.log(y);
console.log(x.toString());
console.log(x.__proto__ === y.__proto__);

const array = [];
console.log(array);

function CoffeeMachine(beans) {
  this.beans = beans;
  // Instance member level
  // this.makeCoffee = (shots) => {
  //   console.log('making... ☕️');
  // };
}
// Prototype member level
CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log('making... ☕️');
};
const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1);
console.log(machine2);

function LatteMachine(milk) {
  this.milk = milk;
}
LatteMachine.prototype = Object.create(CoffeeMachine.prototype);

const latteMachine = new LatteMachine(123);
console.log(latteMachine);
latteMachine.makeCoffee();
/**
 * 자바스크립트에서도 프로토타입을 이용해서 상속을 구현 가능
 * 프로토타입은 자바스크립트에서 상속을 구현하기 위한 아이이다.
 * 그리고 코드를 재사용하기 위해서 만들어진 아이이다.
 */
