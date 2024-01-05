{
  /**
   * JavaScript Data Types
   * Primitive: number, string, boolean, bigint, symbol, null, undefined
   * Object: function, array.....
   */

  // number
  const num: number = -5;

  // string
  const str: string = 'hello';

  // boolean
  const boal: boolean = true;

  // undefined
  let name: undefined; // 💩
  let age: number | undefined;
  age = undefined;
  age = 1;
  function find(): number | undefined {
    return undefined;
  }

  // null
  let person: null; // 💩
  let person2: string | null;
  person2 = '강동욱';

  // unknown 💩
  // 어떤 타입이든 할당 가능해서 쓰지않는것이 좋음
  // 그래도 any보다는 겸손한 느낌
  let notSure: unknown = 0;
  notSure = 'he';
  notSure = true;

  // any 💩
  // 어떤 타입이든 할당 가능해서 쓰지않는것이 좋음
  let anything: any = 0;
  anything = 'hello';

  // void
  // 함수에서 아무것도 리턴하지 않을때 사용
  function print(): void {
    console.log('hello');
    return;
  }
  let unusable: void = undefined; // 💩

  // never
  // 리턴 절대 사용 할 수 없음
  // 에러를 던지던지, while(true){}를 이용해서 함수가 끝나지 않게 작성해야함
  function throwError(message: string): never {
    // message -> server (log)
    // throw new Error(message);
    // while (true) {

    // }
    return;
  }
  let neverEnding: never; // 💩

  // object
  let obj: object; // 💩
  // 원시타입을 제외한 모든 오브젝트 타입을 할당 할 수 있음 심지어 배열도 가능
  // 이처럼 광범위하고 추상적인 타입은 쓰지않는게 좋음
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: '동욱' });
  acceptSomeObject({ animal: 'cat' });
}
