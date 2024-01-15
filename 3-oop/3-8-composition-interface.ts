/**
 * 3-7의 코드와 같이 클래스들 사이에 서로 상호작용, 의사소통 하는 경우에는 클래스 자신을 노출하는것이 아니라
 * 계약서(interface)를 통해서 서로 의사소통을 해야한다.
 *
 * 우리가 필요한 기능들을 각각 클래스로 구현해두었다. 그리고 그냥 구현한게 아니라 인터페이스를 통해서 구현해서
 * 사용하는 사람을 어떤것이 전달되는지 알 필요없고 인터페이스를 통해서 그 인터페이스에 규약된대로만 구현이 되어져 있기 때문에
 * 나중에 우리가 원하는 다른 부품으로 전달하면서 원할때마다 다른 부품을 끼워서 쓸 수 있게 만들어두었다.
 *
 * 우리가 원하는 우유믹서기와 설탕믹서기를 만들었기 때문에 많은 종류의 커피머신을 만들 필요가 없다.
 * 이렇게 컴포지션을 통해서 상속을 사용하지않고도 CoffeeMachine 클래스에 다양한 형태의 우유와 설탕을 주입함으로써
 * 우리가 원하는 다양한 형태의 오브젝트들을 만들 수 있다.
 *
 * 그렇다고 상속이 무조건 나쁘고 컴포지션만을 사용하는것은 아니다. 상속이 유용하고 필요한 경우가 있다.
 * 다만, 너무 수직적인 관계가 만들어지고 있다면 컴포지션을 사용할수는 없는지 고민해보자.
 * 컴포지션을 이용해서 조금 더 필요한 기능들을 조립해서 확장이 가능하고 재사용성이 높고 유지보수가 쉽게 만들자.\
 *
 * 여기서 한가지 유의점은 "오버엔지니어링 하지마라" 이다.
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

    public constructor(
      coffeeBeansGram: number,
      private milkMixer: MilkMixer, // 클래스대신 계약서를 받아옴
      private sugarMixer: SugarMixer // 클래스대신 계약서를 받아옴
    ) {
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
      const coffee = this.extract(shots);
      const sugarAdded = this.sugarMixer.addSugar(coffee);
      return this.milkMixer.makeMilk(sugarAdded);
    }
  }

  // 계약서 작성
  interface MilkMixer {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }
  interface SugarMixer {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 기능 부품들
  class CheapMilkMixer implements MilkMixer {
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

  class FancyMilkMixer implements MilkMixer {
    private steamMilk(): void {
      // 복잡한 로직~~~~~
      console.log('고급스런 우유를 데웁니다... 🥛');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class ColdMilkMixer implements MilkMixer {
    private steamMilk(): void {
      // 복잡한 로직~~~~~
      console.log('차가운 우유를 데웁니다... 🥛');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class NoMilk implements MilkMixer {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  class CandySugarMixer implements SugarMixer {
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

  class JarSugarMixer implements SugarMixer {
    private getSugar() {
      // 복잡한 로직~~~~~
      console.log('바구니로 부터 설탕을 가져옵니다...');
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

  class NoSugar implements SugarMixer {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // 우유
  const cheapMilkMixer = new CheapMilkMixer();
  const fancyMilkMixer = new FancyMilkMixer();
  const coldMilkMixer = new ColdMilkMixer();
  const noMilk = new NoMilk();

  // 설탕
  const candySugarMixer = new CandySugarMixer();
  const jarSugarMixer = new JarSugarMixer();
  const noSugar = new NoSugar();

  // 기계
  const sweetCandyCoffeeMachine = new CoffeeMachine(
    18,
    noMilk,
    candySugarMixer
  );
  const sweetCoffeeMachine = new CoffeeMachine(18, noMilk, jarSugarMixer);
  const cafeLatteMachine = new CoffeeMachine(18, cheapMilkMixer, noSugar);
  const coldCafeLatteMachine = new CoffeeMachine(18, coldMilkMixer, noSugar);
  const sweetCateLatteMachine = new CoffeeMachine(
    18,
    cheapMilkMixer,
    candySugarMixer
  );
}
