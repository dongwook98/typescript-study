{
  // Array
  // readonly 사용하려면 : string[]를 써야 하기 때문에 코드를 일관성 있게 작성하려면 : string[]을 추천
  const fruits: string[] = ['🍎', '🍇'];
  const numbers: Array<number> = [1, 2, 3, 4, 5];
  function printArray(fruits: readonly string[]) {} // readonly를 사용해 불변성 유지 가능

  // Tuple -> interface, type alias, class로 대체해서 사용 권장
  // 서로 다른 타입을 함께 가질수있는 배열
  // 튜플 사용하는것 권장 ❌, 접근할때 가독성이 안좋음
  let student: [string, number];
  student = ['name', 123];
  student[0]; // name
  student[1]; // 123

  // 튜플 접근할 때 가독성 높이는 법 : 구조 분해 할당
  const [name, age] = student;

  // 튜플을 잘 사용한 예제 리액트의 useState
  // 내가 무언가 동적으로 리턴하는데 클래스나 인터페이스로 묶기 애매하고
  // 동적으로 관련있는 다른 데이터 타입을 묶어서 사용자가 이름을 정의해서 쓸 경우에는 괜찮은데
  // 그 외에 일반적인 타입을 정의하는 경우에는 type alias나 interface를 쓸 수 있지 않는지 체크!
  const [count, setCount] = useState(0);
}
