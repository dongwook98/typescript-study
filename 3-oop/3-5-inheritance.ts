{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 18;
    private coffeeBeansGram: number = 0;

    // 생성자가 private면 상속하지 못함, 상속하는 자식은 다 접근 가능한 protected로 변경
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

  // 상속을 사용해 코드중복 줄일 수 있음
  class CafeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      // 자식 클래스에서 생성자 따로 구현하면 꼭 부모의 생성자도 호출해야함
      super(beans); // 부모의 생성자도 호출하는 방법
    }

    private steamMilk(): void {
      console.log('우유를 데웁니다... 🥛');
    }

    // 오버라이딩: 자식 클래스에서 부모 클래스에 있는 함수를 덮어씌우는 것
    makeCoffee(shots: number): CoffeeCup {
      // 부모의 기능들도 사용하고 싶고 거기에 뭔가 추가하고 싶다면
      // super라는 키워드를 사용해 부모 클래스에 있는 함수를 호출하고 그 뒤에 하고 싶은 기능 추가
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  const machine = new CoffeeMachine(18);
  const latteMachine = new CafeLatteMachine(18, '12389290SAV');
  const coffee = latteMachine.makeCoffee(1);
  console.log(coffee);
  console.log(latteMachine.serialNumber);
}
