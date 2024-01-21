/**
 * Encapsulation 캡슐화
 * 현재 외부에서 멤버 변수를 직접적으로 수정 할 수 없게 정보 은닉하기 -> private 사용
 *
 * public : 기본값, 외부에서 접근 가능
 * private : 외부에서 절대 접근X
 * protected : 외부에서 접근 X, 클래스를 상속한 자식 클래스에서만  접근 가능
 *
 * 외부에서 직접적으로 coffeeBeansGram를 수정하는것이 아니라
 * 우리의 public 함수 fillCoffeeBeans를 통해서 coffeeBeansGram를 수정하게 하고
 * fillCoffeeBeans 함수 내부에서 전달받는 인자값의 유효성을 검사 하기 때문에 안정적임
 */
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
  };

  class CoffeeMachine {
    private static BEANS_GRAM_PER_SHOT: number = 18;
    private coffeeBeansGram: number = 0;

    // 생성자 사용하지말고 static 메서드(makeCoffeeMachine)를 사용하게 하기위해서 private 붙여줌
    private constructor(coffeeBeansGram: number) {
      this.coffeeBeansGram = coffeeBeansGram;
    }

    static makeCoffeeMachine(coffeeBeansGram: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeansGram);
    }

    /**
     * 외부에서 직접적으로 coffeeBeansGram를 수정하는것이 아니라
     * 우리의 public 함수 fillCoffeeBeans를 통해서 coffeeBeansGram를 수정하게 하고
     * fillCoffeeBeans 함수 내부에서 전달받는 인자값의 유효성을 검사 하기 때문에 안정적임
     */
    fillCoffeeBeans(coffeeBeansGram: number) {
      if (coffeeBeansGram < 0) {
        throw new Error('추가할 원두는 0g보다 커야합니다.');
      }
      this.coffeeBeansGram += coffeeBeansGram;
    }

    makeCoffee(shots: number): CoffeeCup {
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

  // 문제점 : 외부에서 인스턴스의 상태를 변경하는것은 굉장히 좋지 않음
  // const coffeeMachine = new CoffeeMachine(18); // 'CoffeeMachine' 클래스의 생성자는 private이며 클래스 선언 내에서만 액세스할 수 있습니다.
  // coffeeMachine.coffeeBeansGram = -2939223; // invalid 'coffeeBeansGram' 속성은 private이며 'CoffeeMachine' 클래스 내에서만 액세스할 수 있습니다.

  // private constructor이기 때문에 class level 메서드(makeCoffeeMachine)을 사용해서 커피기계를 만듬
  const coffeeMachine2 = CoffeeMachine.makeCoffeeMachine(18);
  coffeeMachine2.fillCoffeeBeans(18);

  /**
   * 게터와 세터
   * 게터와 세터는 함수이긴 하지만 멤버변수와 똑같이 접근 가능
   * 게터와 세터는 멤버변수를 통해 어떠한 계산을 해야할때 유용하게 사용 가능
   */
  class User {
    // constructor에 접근 제어자를 붙이면 멤버 변수 선언, 할당 생략 가능
    constructor(private firstName: string, public lastName: string) {}

    // 멤버변수(firstName, lastName)를 사용해 만든 멤버 변수(fullName)라면
    // getter를 사용해 fullName에 접근할때 마다 새로운 데이터를 만들 수 있음
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    private internalAge: number = 3;
    // getter, setter로 private인 인스턴스 레벨 멤버 변수에 접근, 수정 가능
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      // setter안에서 유효성 검사도 가능
      if (num < 0) {
        throw new Error('num은 0보다 커야함');
      }
      this.internalAge = num;
    }
  }

  const user = new User('강', '동욱');
  user.lastName = '철수';
  // 게터, 세터에 접근할때 멤버변수에 접근하는것처럼 해야함
  console.log(user.fullName); // 강 철수 -> 게터를 사용해서 새로운 데이터가 나옴 만약 fullName이 게터가 아니고 멤버변수 였다면 데이터가 바뀌지 않았을것

  user.age = 6;
  console.log(user);
}
