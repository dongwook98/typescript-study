{
  // Type Aliases
  // 개발자가 새로운 타입을 정의 가능
  type Text = string;
  const name: Text = '동욱';
  const address: Text = 'korea';

  type Num = number;
  const age: Num = 27;

  type Student = {
    name: string;
    age: number;
  };
  const student: Student = {
    name: '강동욱',
    age: 27,
  };

  // String Literal Types
  // 좀 더 세밀하게 타입 사용 가능
  type Name = 'name';
  let dongwookName: Name;
  dongwookName = 'hi'; // 에러 '"hi"' 형식은 '"name"' 형식에 할당할 수 없습니다.
  dongwookName = 'name';

  type JSON = 'json';
  const json: JSON = 'json';

  type Boal = true;
  const isCat: Boal = true;
}
