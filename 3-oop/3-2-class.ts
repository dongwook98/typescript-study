{
  type CoffeeCup = {
    shots: number;
    hasSugar: boolean;
  };

  class CoffeeMachine {
    /**
     * static을 붙이는 순간 BEANS_GRAM_PER_SHOT 상수는
     * 오브젝트 레벨이 아니라, 클래스 레벨로 (클래스 영역의 메모리에 할당이 한번만 됨)
     * CoffeeMachine 클래스로 만드는 오브젝트마다 BEANS_GRAM_PER_SHOT 변수가 메모리에 할당X
     *
     * static은 정말 변하지 않는 상수 값
     * 그리고 여러 오브젝트(인스턴스)에 걸쳐서 사용될 수 있는
     * (즉, 오브젝트의 상태 데이터에 접근할 필요가 없는) 함수들
     */
    static BEANS_GRAM_PER_SHOT: number = 18; // class level
    coffeeBeans: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeCoffeeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    makeCoffee(shots: number, hasSugar: boolean): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error(
          `현재 원두:${this.coffeeBeans} 원두가 부족합니다. 원두를 더 넣어주세요.`
        );
      }
      return {
        shots,
        hasSugar,
      };
    }
  }

  const coffeeMachine = new CoffeeMachine(18);
  console.log(coffeeMachine);

  const coffeeMachine2 = new CoffeeMachine(32);
  console.log(coffeeMachine2);

  /**
   * class level 메서드로 만들어두어서
   * 사용자가 constructor를 호출하지 않고도 coffeeMachine을 만듬
   */
  const coffeeMachine3 = CoffeeMachine.makeCoffeeMachine(18);
  console.log(coffeeMachine3);

  // static을 사용한 class level 메서드 예제
  console.log(Math.abs(-5));
}
