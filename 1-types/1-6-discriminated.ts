{
  // printLoginState(state)
  // success -> 🎉 body
  // fail -> 😭 reason
  function printLoginState(state: LoginState) {
    if ('response' in state) {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }

  // 위 방법보다는 Discriminated Union 사용!
  // Union 타입을 사용할때 공통적인 속성을 가짐으로써 조금 더 구분하기 쉽게 만드는 방법
  type SuccessState = {
    result: 'success';
    response: {
      body: string;
    };
  };
  type FailState = {
    result: 'fail';
    reason: string;
  };
  type LoginState = SuccessState | FailState;
  function login(id: string, password: string): LoginState {
    return {
      result: 'success',
      response: {
        body: 'logged in!',
      },
    };
  }

  function printLoginState2(state: LoginState) {
    if (state.result === 'success') {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
}
