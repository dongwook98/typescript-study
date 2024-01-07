{
  /**
   * Intersection Types: &, 그리고
   * 인터섹션 타입을 사용하면 다양한 타입들을 하나로 묶어서 선언 가능
   */
  type Student = {
    name: string;
    score: number;
  };

  type Worker = {
    empolyeeId: number;
    work: () => void;
  };

  function internWork(person: Student & Worker) {
    console.log(person.name, person.empolyeeId, person.work());
  }
  internWork({
    name: '동욱',
    score: 1,
    empolyeeId: 123,
    work: () => {}, // 속성 하나라도 빠지면 에러
  });
}
