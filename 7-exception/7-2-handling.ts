class TimeoutError extends Error {}
class OfflineError extends Error {}

class NetworkClient {
  tryConnect(): void {
    throw new OfflineError('no network!');
  }
}

class UserService {
  constructor(private client: NetworkClient) {}

  login() {
    // 에러가 발생했을때 내가 정확하게, 우아하게, 고급스럽게 처리하는것이 아니라면 catch하지않는것이 더 나음
    // try {
    this.client.tryConnect();
    // } catch (error) {
    // console.log('catched!');
    // }
  }
}

class App {
  constructor(private userService: UserService) {}
  run() {
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
