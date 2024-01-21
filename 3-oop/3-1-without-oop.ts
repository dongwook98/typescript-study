// 절차형 프로그래밍은 필요한 상수, 데이터, 함수들이 밖에서 서로 뒹굴고 있음
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
  };

  const BEANS_GRAM_PER_SHOT: number = 18;

  let coffeeBeansGram: number = 0;
  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeansGram < shots * BEANS_GRAM_PER_SHOT) {
      throw new Error('원두가 부족합니다. 원두를 더 넣어주세요.');
    }
    coffeeBeansGram -= shots * BEANS_GRAM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }

  coffeeBeansGram += 2 * BEANS_GRAM_PER_SHOT;
  const coffee = makeCoffee(2);
  console.log(coffee);
}
