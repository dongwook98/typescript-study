{
  /**
   * Type Assertions 💩
   * 내가 정말 100% 타입을 장담할때 사용
   */
  function jsStrFunc(): any {
    return 2;
  }
  const result = jsStrFunc();
  console.log((result as string).length);
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // ❌

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers()!;
  numbers.push(1); // ❌

  const button = document.querySelector('class')!;
  button.nodeValue;
}
