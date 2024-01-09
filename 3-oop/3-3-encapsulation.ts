/**
 * 현재 외부에서 coffeeBeans를 직접적으로 수정 할 수 없게 Encapsulation하기 -> private 사용
 *
 * 외부에서 직접적으로 coffeeBeans를 수정하는것이 아니라
 * 우리의 public 함수 fillCoffeeBeans를 통해서 coffeeBeans를 수정하게 하기 때문에
 * fillCoffeeBeans 함수 내부에서 coffeeBeans의 값의 유효성을 검사
 */
{
  type CoffeeCup = {
    shots: number;
    hasSugar: boolean;
  };

  // public
  // private : 외부에서 절대 접근X
  // protected : 외부에서 접근 X, 클래스를 상속한 자식 클래스에만 접근 가능
  class CoffeeMachine {
    private static BEANS_GRAM_PER_SHOT: number = 18;
    private coffeeBeans: number = 0;

    // 생성자 사용하지말고 makeCoffeeMachine static 함수를 사용하게 하기위해서 private 붙여줌
    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeCoffeeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('추가할 원두는 0g보다 커야합니다.');
      }
      this.coffeeBeans += beans;
    }

    makeCoffee(shots: number, hasSugar: boolean): CoffeeCup {
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

  // const coffeeMachine = new CoffeeMachine(18); // 'CoffeeMachine' 클래스의 생성자는 private이며 클래스 선언 내에서만 액세스할 수 있습니다.
  // coffeeMachine.coffeeBeans = -2939223; // invalid 'coffeeBeans' 속성은 private이며 'CoffeeMachine' 클래스 내에서만 액세스할 수 있습니다.

  const coffeeMachine2 = CoffeeMachine.makeCoffeeMachine(18);
  coffeeMachine2.fillCoffeeBeans(18);
  console.log(coffeeMachine2);
  const coffee2 = coffeeMachine2.makeCoffee(1, true);
  console.log(coffee2);

  /**
   * 게터와 세터
   */
  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge: number = 3;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      if (num < 0) {
        throw new Error('num은 0보다 커야함');
      }
      this.internalAge = num;
    }
    constructor(private firstName: string, public lastName: string) {}
  }
  const user = new User('강', '동욱');
  console.log(user);

  user.age = 6;
  console.log(user);

  user.lastName = '철수';
  console.log(user.fullName);
}
