/**
 * 클래스는 관련된 데이터과 함수들을 한곳에 묶어서 어떤 모양의 데이터가 될 거라는것을 정의하는 것
 * 정의해놓은 클래스를 이용해서 실제로 데이터를 넣어서 오브젝트를 만들 수 있음
 * 이때 오브젝트마다 새로 만들어져야되는 데이터가 있다면 멤버 변수로 만들면 되고
 * 클래스 레벨에서 함께 공유될 수 있는거라면 static을 사용 가능
 *
 * 클래스안에서 클래스 안에있는 멤버 변수에 접근할때는 this.coffeeBeans와 같이 this.를 붙여야함
 *
 * constructor라는 함수는 클래스를 사용해서 인스턴스를 만들때 항상 호출되는 함수
 */
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
     * 여러 오브젝트(인스턴스)에 걸쳐서 사용될 수 있는
     * 즉, 오브젝트의 상태 데이터에 접근할 필요가 없는 함수들에는 static을 붙여주면 됨
     */
    static BEANS_GRAM_PER_SHOT: number = 18; // class level
    coffeeBeans: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeCoffeeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    makeCoffee(shots: number, hasSugar: boolean = false): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error(
          `현재 원두:${this.coffeeBeans} 원두가 부족합니다. 원두를 더 넣어주세요.`
        );
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
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
  const coffee3 = coffeeMachine3.makeCoffee(1, true);
  console.log(coffee3);

  // static을 사용한 class level 메서드 예제
  console.log(Math.abs(-5));
}
