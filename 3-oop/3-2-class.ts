/**
 * 클래스는 관련된 데이터과 함수들을 한곳에 묶어서 어떤 모양의 데이터가 될 거라는것을 정의하는 것
 * 정의해놓은 클래스를 이용해서 실제로 데이터를 넣어서 오브젝트를 만들 수 있음
 * 이때 오브젝트마다 새로 만들어져야되는 데이터가 있다면 멤버 변수로 만들면 되고
 * 클래스 레벨에서 함께 공유될 수 있는거라면 static 사용!
 *
 * static을 붙이는 순간 BEANS_GRAM_PER_SHOT 상수는
 * 오브젝트 레벨이 아니라, 클래스 레벨로 (클래스 영역의 메모리에 할당이 한번만 됨)
 * CoffeeMachine 클래스로 만드는 오브젝트마다 BEANS_GRAM_PER_SHOT 속성이 메모리에 할당되지 않음!
 * static은 정말 변하지 않는 상수 값, 여러 오브젝트(인스턴스)에 걸쳐서 사용될 수 있는
 * 즉, 오브젝트의 상태 데이터에 접근할 필요가 없는 함수들에는 static을 붙여주면 됨
 */
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
  };

  class CoffeeMachine {
    static BEANS_GRAM_PER_SHOT: number = 18; // class level
    coffeeBeansGram: number = 0; // instance (object) level

    // constructor라는 함수는 클래스를 사용해서 인스턴스를 만들때 항상 호출되는 함수
    constructor(coffeeBeansGram: number) {
      this.coffeeBeansGram = coffeeBeansGram;
    }

    // class level 메서드
    // 클래스 레벨 메서드는 클래스 자체에 속하며, 해당 클래스의 인스턴스와는 독립적입니다.
    // 이 메서드는 클래스의 특정 인스턴스와 관련된 작업을 수행하지 않고 클래스 전체에 대한 작업을 수행합니다.
    // 따라서 클래스 레벨 메서드에서는 인스턴스 레벨 변수에 직접 접근하는 것이 일반적으로 허용되지 않습니다.
    // 클래스 레벨 메서드는 static 키워드로 정의되어 클래스의 인스턴스가 없어도 호출될 수 있습니다.
    // 이는 해당 메서드가 특정 인스턴스의 상태에 의존하지 않고, 오직 클래스 자체의 상태나 동작과 관련이 있기 때문입니다.
    // 이런 함수들은 인스턴스의 상태에 의존하지 않기 때문에 static으로 만들어주면 됨
    static makeCoffeeMachine(coffeeBeansGram: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeansGram);
    }

    makeCoffee(shots: number): CoffeeCup {
      // coffeeBeansGram은 instance level 멤버 변수기 때문에 this로 접근!
      // BEANS_GRAM_PER_SHOT은 class level 멤버 변수기 때문에 클래스이름으로 접근!
      if (this.coffeeBeansGram < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('원두가 부족합니다. 원두를 더 넣어주세요.');
      }
      this.coffeeBeansGram -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const coffeeMachine = new CoffeeMachine(18);
  console.log(coffeeMachine);

  // class level 메서드(makeCoffeeMachine)로 사용자가 constructor를 호출하지 않고도 coffeeMachine을 만듬
  const coffeeMachine2 = CoffeeMachine.makeCoffeeMachine(18);
  console.log(coffeeMachine2);
}
