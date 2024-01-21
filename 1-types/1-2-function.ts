// 함수에서 타입 이용하기 (JS 💩 -> TS ✨)
{
  // JavaScript 💩
  // 매개변수에 문자열 2개도 전달가능 💩
  function jsAdd(num1, num2) {
    return num1 + num2;
  }

  // TypeScript ✨
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }

  // JavaScript 💩
  function jsFetchNum(id) {
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // TypeScript ✨
  // 타입만봐도 어떤값이 필요한지와 어떤값을 리턴하는지 파악 가능
  function FetchNum(id: string): Promise<number> {
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // 최신 JavaScript 문법 => TypeScript
  // Optional parameter
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName('동욱', '강');
  printName('예리');
  printName('철수', undefined);

  // |을 사용하면 인자로 undefined를 무조건 전달해야 해서 귀찮음
  // |대신에 옵셔널 파라미터를 사용하자.
  function printName2(firstName: string, lastName: string | undefined) {
    console.log(firstName);
    console.log(lastName);
  }
  printName2('동욱', '강');
  printName2('예리'); // 에러 2개의 인수가 필요한데 1개를 가져왔습니다.
  printName2('철수', undefined);

  // Default parameter
  function printMessage(message: string = 'default message') {
    console.log(message);
  }
  printMessage();

  // Rest parameter
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((prev, current) => prev + current, 0);
  }
  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3, 4));
  console.log(addNumbers(1, 2, 3, 4, 5, 0));
}
