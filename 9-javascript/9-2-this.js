/**
 * 자바스크립트에서 this는 호출한 문맥에 따라 동적으로 결정되므로
 * 따로 bind를 호출하던지
 * 클래스 내부에 this에 접근하는 함수가 있다면 화살표 함수 쓰는것이 좋다.
 */
console.log(this);

function simpleFunc() {
  console.log(this);
}
simpleFunc();

class Counter {
  count = 0;
  // arrow function 사용
  increase = () => {
    console.log(this);
  };
}
const counter = new Counter();
counter.increase();
const caller = counter.increase;
// const caller = counter.increase.bind(counter);
caller();

class Bob {}
const bob = new Bob();
bob.run = counter.increase;
bob.run();
/**
 * const나 let으로 선언한 함수나 변수는 window에 등록되지 않음
 */
