/**
 * 발생할 수 있는 예외에 대해 무작정 (Try-Catch) 또는 throw new Error() 예외 처리를 하기 보다는,
 * 예상 가능한 예외 상황이라면 아래 예제처럼 에러 상태를 정의해서 예외적인 상황이 아니라,
 * 우리가 예상하고 있는 에러 상황(상태)로 간주해서 각기 다른 처리를 해주는것이 좋음
 */
{
  type NetworkErrorState = {
    result: 'fail';
    reason: 'offline' | 'down' | 'timeout';
  };

  type SuccessState = {
    result: 'success';
  };

  type ResultState = SuccessState | NetworkErrorState;
  class NetworkClient {
    tryConnect(): ResultState {
      return { result: 'fail', reason: 'offline' };
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      return this.client.tryConnect();
    }
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      const returnData = this.userService.login();
      if (returnData.result === 'success') {
        console.log('로그인 성공');
      } else if (returnData.result === 'fail') {
        console.log(`로그인 실패 :${returnData.reason}`);
      }
      try {
        this.userService.login();
      } catch (error) {
        // show dialog to user
      }
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}
