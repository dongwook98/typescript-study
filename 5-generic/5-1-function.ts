{
  // 숫자만 확인 가능..
  function checkNotNull(arg: number | null): number {
    if (arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }
  const result = checkNotNull(123);
  console.log(result);

  // any를 쓰면 타입보장이 안됨.. 타입이 안전하지 않음
  function checkNotNull2(arg: any | null): any {
    if (arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }
  const result2 = checkNotNull2(123);

  // 제네릭 사용, 타입보장을 받을 수 있음
  function checkNotNull3<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }
  const result3 = checkNotNull3(123);
  const result4: boolean = checkNotNull3(true);
}
