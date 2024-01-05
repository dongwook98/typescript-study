{
  // Type Aliases
  type Text = string;
  const name: Text = '동욱';
  const address: Text = 'korea';
  type Num = number;
  type Student = {
    name: string;
    age: number;
  };
  const student: Student = {
    name: '강동욱',
    age: 27,
  };

  // String Literal Types
  type Name = 'name';
  let dongwookName: Name;
  dongwookName = 'name';
  type JSON = 'json';
  const json: JSON = 'json';

  type Boal = true;
  const isCat: Boal = true;
}
