/**
 * Abstraction 추상화
 * 추상화란, 외부에서 어떤 형태로, 공통적으로 어떻게 이 클래스를 이용하게 할것인가... 이걸 고민하는 단계이다.
 * 클래스의 메서드가 너무 많거나 복잡할때
 * 추상화를 통해서 정말 필요한 함수만 노출함으로써 사용하기 쉽게 만들 수 있음
 *
 * 추상화를 하는 방법은 여러가지이다. 접근제어자를 통해서 충분히 추상화 가능함
 * 또는 interface를 사용해서 추상화 가능
 *
 * interface는 규격, 계약서같은 느낌
 */
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
  };

  // interface를 사용하면 얼마만큼의 행동을 규제할지 정할 수 있음, 여기선 makeCoffee가 있어야한다고 규격함
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 여기선 makeCoffee, fillCoffeeBeans, clean가 있어야한다고 규격함
  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  // CoffeeMachine 클래스는 CoffeeMaker, CommercialCoffeeMaker 인터페이스에 규약된 모든 함수를 구현해야함!!!
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 18;
    private coffeeBeansGram: number = 0;

    private constructor(coffeeBeansGram: number) {
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

    // private 접근 제어자를 통해서 외부 사용자가 사용하기 쉽게 추상화 가능
    private grindBeans(shots: number): void {
      console.log(`${shots}샷을 위해 원두를 갈고 있습니다...`);
      if (this.coffeeBeansGram < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('원두가 부족합니다. 원두를 더 넣어주세요.');
      }
      this.coffeeBeansGram -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    // private 접근 제어자를 통해서 외부 사용자가 사용하기 쉽게 추상화 가능
    private preheat(): void {
      console.log('따뜻하게 데우고 있습니다... 🔥');
    }

    // private 접근 제어자를 통해서 외부 사용자가 사용하기 쉽게 추상화 가능
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

  const coffeeMachine: CoffeeMachine = CoffeeMachine.makeCoffeeMachine(36);
  coffeeMachine.fillCoffeeBeans(18);
  coffeeMachine.makeCoffee(2);

  // CoffeeMachine 클래스는 CoffeeMaker의 인터페이스를 구현하는 클래스이기 때문에 CoffeeMachine은 CoffeeMaker와 동일하다.(IS-A 관계)
  const coffeeMachine2: CoffeeMaker = CoffeeMachine.makeCoffeeMachine(18);
  // coffeeMachine2는 CoffeeMaker 인터페이스를 따르기 때문에 fillCoffeeBeans는 사용하지못함
  // 즉, 인터페이스를 사용하면 얼마만큼의 행동을 허용할지 정할수 있음 -> 추상화 가능
  coffeeMachine2.fillCoffeeBeans(18);
  coffeeMachine2.makeCoffee(2);

  // CommercialCoffeeMaker 인터페이스를 따르기 때문에 makeCoffee, fillCoffeeBeans, clean 사용 가능
  // CommercialCoffeeMaker 인터페이스로 타입을 제한해서 받게되면 CommercialCoffeeMaker 인터페이스에서 규격된 함수들만 사용 가능
  const coffeeMachine3: CommercialCoffeeMaker =
    CoffeeMachine.makeCoffeeMachine(18);
  coffeeMachine3.fillCoffeeBeans(18);
  coffeeMachine3.makeCoffee(2);
  coffeeMachine3.clean();

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    // AmateurUser의 machine은 CoffeeMaker를 따르기 때문에 this.machine.makeCoffee밖에 못함
    makeCoffee() {
      const coffee = this.machine.makeCoffee(1);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    // ProBarista의 machine은 CommercialCoffeeMaker를 따르기 때문에 this.machine.makeCoffee, this.machine.fillCoffeeBeans, this.machine.clean 가능
    makeCoffee() {
      const coffee = this.machine.makeCoffee(1);
      console.log(coffee);
      this.machine.fillCoffeeBeans(18);
      this.machine.clean();
    }
  }

  // 동일한 클래스의 인스턴스 일지라도 이 인스턴스는 두 가지의 인터페이스를 구현하기 때문에
  // AmateurUser는 CoffeeMaker 인터페이스를 생성자에서 받아오기 때문에 그 인터페이스에 규약된 함수들만 접근 가능
  // ProBarista는 CommercialCoffeeMaker라는 인터페이스를 따르기 때문에 그 인터페이스에 규약된 함수들만 접근 가능
  const coffeeMachine4: CoffeeMachine = CoffeeMachine.makeCoffeeMachine(18);
  const amateur = new AmateurUser(coffeeMachine4);
  const pro = new ProBarista(coffeeMachine4);
  amateur.makeCoffee(); // 커피만 만듬
  pro.makeCoffee(); // 커피도만들고 원두도 채우고 기계도 청소함
}
