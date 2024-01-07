{
  /**
   * Type Inference 타입 추론
   * 간단하고 원시타입의 경우에는 타입 추론을 사용해도 되지만
   * 복잡하고 객체타입인 경우에는 타입 추론을 사용하는것보다는 명시적으로 적어주는게 좋다.
   */
  let text = 'hello';
  function print(message = 'hello') {
    console.log(message);
  }
  print();

  // 함수는 내부에 복잡한 로직이 있는 경우가 많으므로
  // 타입 추론을 사용하는것보다는 명시적으로 타입을 적어주는것이 좋음
  // 물론 void라면 생략 가능
  function add(x: number, y: number): number {
    return x + y;
  }
  const result = add(1, 2);
}
