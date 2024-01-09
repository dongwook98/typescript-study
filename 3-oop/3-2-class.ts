{
  type CoffeeCup = {
    shots: number;
    hasSugar: boolean;
  };

  class CoffeeMachine {
    /**
     * static필드로 등록해두면 클래스로 만드는 인스턴스에 추가하지않아서 메모리낭비X
     * 만드는 인스턴스마다 공통적으로 쓰이는 필드라면 static필드로 등록
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
