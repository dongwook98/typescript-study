{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 18;
    private coffeeBeansGram: number = 0;

    public constructor(coffeeBeansGram: number) {
      this.coffeeBeansGram = coffeeBeansGram;
    }

    static makeCoffeeMachine(coffeeBeansGram: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeansGram);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('추가할 원두는 0g보다 커야합니다.');
      }
      this.coffeeBeansGram += beans;
    }

    clean(): void {
      console.log('기계를 청소합니다...');
    }

    private grindBeans(shots: number): void {
      console.log(`${shots}샷을 위해 원두를 갈고 있습니다...`);
      if (this.coffeeBeansGram < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('원두가 부족합니다. 원두를 더 넣어주세요.');
      }
      this.coffeeBeansGram -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    private preheat(): void {
      console.log('따뜻하게 데우고 있습니다... 🔥');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`${shots}샷 커피를 내리고 있습니다... ☕️`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CafeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }

    private steamMilk(): void {
      console.log('우유를 데웁니다... 🥛');
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    private addSugar(coffee: CoffeeCup) {
      console.log('설탕을 추가합니다...');
      return {
        ...coffee,
        hasSugar: true,
      };
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.addSugar(coffee);
    }
  }

  // SweetCoffeeMachine은 CoffeeMachine이다.
  // CoffeeMachine은 CoffeeMaker이다.
  // 그러므로 SweetCoffeeMachine은 CoffeeMaker이다.
  // machine은 CoffeeMaker이므로 makeCoffee 함수만 사용 가능!!!
  const machines: CoffeeMaker[] = [
    new CoffeeMachine(18),
    new CafeLatteMachine(18, '129382ASD'),
    new SweetCoffeeMachine(18),
    new CoffeeMachine(18),
    new CafeLatteMachine(18, '129382ASD'),
    new SweetCoffeeMachine(18),
  ];

  // 다형성의 장점
  // 내부적으로 구현된 다양한 클래스들이 한가지의 인터페이스를 구현하거나 또는 동일한 부모를 상속했을때
  // 동일한 함수를 어떤 클래스인지 구분하지 않고 호출 할 수 있다.
  machines.forEach((machine) => {
    console.log('----------------------------');
    machine.makeCoffee(1);
  });
  /**
   * 이처럼 다형성이란 하나의 인터페이스나 또는 부모의 클래스를 상속한 자식 클래스들이
   * 인터페이스와 부모 클래스에 있는 함수들을 다른 방식으로 다양하게 구성함으로써 조금 더 다형성을 만들어 볼 수 있다.
   *
   * 이처럼 인터페이스와 부모 클래스에 있는 동일한 함수 API를 통해서 자식 클래스에 각각 구현된 내부 구현사항을
   * 신경쓰지않고 약속된 API를 호출함으로써 사용하는 사람도 간편하게 다양한 기능들을 활용 할 수 있다.
   */
}
