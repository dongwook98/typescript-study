{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 18;
    private coffeeBeansGram: number = 0;

    public constructor(coffeeBeansGram: number) {
      this.coffeeBeansGram = coffeeBeansGram;
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

    protected abstract extract(shots: number): CoffeeCup;

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

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
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
    protected extract(shots: number): CoffeeCup {
      return this.addSugar({ shots });
    }
  }

  const machines: CoffeeMaker[] = [
    new CafeLatteMachine(18, '129382ASD'),
    new SweetCoffeeMachine(18),
    new CafeLatteMachine(18, '129382ASD'),
    new SweetCoffeeMachine(18),
  ];

  machines.forEach((machine) => {
    console.log('----------------------------');
    machine.makeCoffee(1);
  });
}
