{
  type CoffeeCup = {
    shots: number;
    hasSugar: boolean;
  };

  const BEANS_GRAM_PER_SHOT = 18;

  let coffeeBeans = 0;
  function makeCoffee(shots: number, hasSugar = false): CoffeeCup {
    if (coffeeBeans < shots * BEANS_GRAM_PER_SHOT) {
      throw new Error(
        `현재 원두:${coffeeBeans} 원두가 부족합니다. 원두를 더 넣어주세요.`
      );
    }
    coffeeBeans -= shots * BEANS_GRAM_PER_SHOT;
    return {
      shots,
      hasSugar,
    };
  }

  coffeeBeans += 2 * BEANS_GRAM_PER_SHOT; // 2샷을 위한 원두 추가
  const coffee = makeCoffee(2); // 2샷, 설탕X
  console.log(coffee);

  coffeeBeans += 4 * BEANS_GRAM_PER_SHOT; // 4샷을 위한 원두 추가
  const coffee2 = makeCoffee(4, true); // 4샷, 설탕 추가
  console.log(coffee2);

  const coffee3 = makeCoffee(1); // Error: 현재 원두:0 원두가 부족합니다. 원두를 더 넣어주세요.
}
