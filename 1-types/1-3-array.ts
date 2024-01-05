{
  // Array
  const fruits: string[] = ['🍎', '🍇'];
  const numbers: Array<number> = [1, 2, 3, 4, 5];
  function printArray(fruits: readonly string[]) {} // readonly를 사용해 불변성을 유지할수있음

  // Tuple -> interface, type alias, class
  // 서로 다른 타입을 함께 가질수있는 배열
  // 튜플 사용하는것 권장 ❌
  let student: [string, number];
  student = ['name', 123];
  student[0]; // name
  student[1]; // 123
  const [name, age] = student;
}
