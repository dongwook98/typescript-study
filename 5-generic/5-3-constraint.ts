interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log('full time!');
  }
  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log('part time!');
  }
  workPartTime() {}
}

// 세부적인 타입을 인자로 받아서 정말 추상적인 타입으로 다시 리턴하는 함수는 💩💩💩
function payBad(employee: Employee): Employee {
  employee.pay();
  return employee;
}

function pay<E extends Employee>(employee: E): E {
  employee.pay();
  return employee;
}

const dongwook = new FullTimeEmployee();
const bob = new PartTimeEmployee();
dongwook.workFullTime();
bob.workPartTime();

const dongwookAfterPay = pay(dongwook);
const bobAfterPay = pay(bob);

const obj = {
  name: '동욱',
  age: 27,
};

const obj2 = {
  animal: '🐧',
};

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
console.log(getValue(obj, 'name')); // 동욱
console.log(getValue(obj, 'age')); // 27
console.log(getValue(obj2, 'animal')); // 🐧
