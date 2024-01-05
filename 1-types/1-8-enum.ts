{
  /**
   * Enum
   * 여러가지의 관련된 상수값들을 한곳에 모아둬서 정의 할 수 있게 도와주는 타입
   * 보통 Enum 대신에 Union Types으로 대체해서 사용함
   */
  // JavaScript 상수
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY;

  // TypeScript
  type Days2 = 'Monday' | 'Tuesday' | 'Wednesday';
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

  let day2: Days2 = 'Monday';
  day2 = 'Wednesday';
}
