{
  /**
   * Enum
   * 다른 프로그래밍 언어에서 많이 사용됨, 자바스크립트에서 enum을 지원 안해서 타입스크립트에서 지원!
   * 여러가지의 관련된 상수값들을 한곳에 모아둬서 정의 할 수 있게 도와주는 타입
   * 보통 Enum 대신에 Union Types으로 대체해서 사용함
   */

  // JavaScript 상수 정의 하는 방법
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY;

  // TypeScript
  // TypeScript에서는 Enum을 사용하지 않는것이 좋음
  enum Days {
    Monday, // 0
    Tuesday, // 1
    Wednesday, // 2
    Thursday, // 3
    Friday, // 4
    Saturday, // 5
    Sunday, // 6
  }
  console.log(Days.Monday); // 0
  let day: Days = Days.Saturday;
  day = Days.Friday;
  console.log(day); // 4
  day = 20392; // 💩 에러가 나야하는데 안남..

  // TypeScript 상수 정의 하는 방법 Union 타입 사용!
  type Days2 = 'Monday' | 'Tuesday' | 'Wednesday';
  let day2: Days2 = 'Monday';
  day2 = 'Wednesday';
}
