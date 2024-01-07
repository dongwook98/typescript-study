{
  /**
   * Type Assertions 💩
   * as: 내가 정말 100% 타입을 장담할때 사용
   */
  function jsStrFunc(): any {
    return 'hello';
  }
  const result = jsStrFunc();
  console.log((result as string).length);
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // 에러, ❌

  // !: 무조건 null, undefined가 아니라고 장담할때 사용
  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers()!;
  numbers.push(1); // 에러, ❌

  // 프론트엔드 ! 쓰는 예제
  const button = document.querySelector('class')!;
  button.nodeValue;

  // ✨ 좋은 방법
  if (button) {
    button.nodeValue;
  }
  button?.nodeValue;
}
