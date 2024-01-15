/**
 * 상속의 문제점: 상속의 깊이가 길어질수록 서로간의 관계가 복잡해짐.. 상속은 수직적으로 관계가 형성됨
 * 치명적인 문제점은 어떤 부모 클래스의 행동을 수정하게 되면 그 부모 클래스를 상속하는 모든 자식 클래스에 영향을 미칠 수 있음
 * 그리고 새로운 기능을 도입하려고 할 때 어떻게 상속의 구조를 가져가야할지 어려움
 * 그리고 타입스크립트에서는 2개 이상의 부모 클래스를 상속 할 수 없음
 * 이러한 상속의 문제점 때문에 composition을 사용하는것이 좋음!
 */
/**
 * Composition: 구성요소들, 구성
 * 레고를 만들때 필요한 부품들을 조립해서 만드는것처럼 Composition도 필요한 것들을 조립해서 만드는것을 말함
 */
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

  // 싸구려 우유 거품기
  // 각각의 기능별로 따로 클래스를 만들어두어서 필요한 클래스에서 가져다가 쓰게 만들 수 있게 해줌(composition)
  class CheapMilkMixer {
    private steamMilk(): void {
      // 복잡한 로직~~~~~
      console.log('우유를 데웁니다... 🥛');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 설탕 제조기
  // 각각의 기능별로 따로 클래스를 만들어두어서 필요한 클래스에서 가져다가 쓰게 만들 수 있게 해줌(composition)
  class CandySugarMixer {
    private getSugar() {
      // 복잡한 로직~~~~~
      console.log('사탕으로 부터 설탕을 가져옵니다...');
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class CafeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkMixer: CheapMilkMixer // 의존성 주입(Dependency Injection)
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milkMixer.makeMilk(coffee); // 외부 milkMixer 클래스의 makeMilk 사용
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    constructor(
      beans: number,
      private sugarMixer: CandySugarMixer // 의존성 주입(Dependency Injection)
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugarMixer.addSugar(coffee); // 외부 sugarMixer 클래스의 addSugar 사용
    }
  }

  // SweetCafeLatteMachine 클래스는 우유를 어떻게 만드는지, 설탕을 어떻게 만드는지 전혀 신경쓰지 않음
  // 이렇게 필요한 기능을 외부에서 주입 받음으로써(composition) 필요한 기능을 재사용 할 수 있음
  // composition은 코드의 재사용을 굉장히 높여줌
  // 하지만 이 코드는 치명적인 단점이 있음 SweetCafeLatteMachine, SweetCoffeeMachine, CafeLatteMachine
  // 클래스들은 CandySugarMixer, CheapMilkMixer 클래스들과 굉장히 타이트하게 커플링 되어있다.
  // SweetCafeLatteMachine, SweetCoffeeMachine, CafeLatteMachine 클래스들은 항상 싸구려 우유 거품기와 설탕 제조기만 사용해야함
  // 스스로를 제약시키는 것! 그래서 클래스와 클래스들간의 서로 잘 알고있으면 좋지않음
  // 이걸 interface로 개선한 코드는 3-8에서 확인
  class SweetCafeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      private milkMixer: CheapMilkMixer, // 의존성 주입(Dependency Injection)
      private sugarMixer: CandySugarMixer // 의존성 주입(Dependency Injection)
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdded = this.sugarMixer.addSugar(coffee);
      return this.milkMixer.makeMilk(sugarAdded);
    }
  }
}
