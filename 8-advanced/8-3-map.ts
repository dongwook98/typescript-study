{
  type Video = {
    title: string;
    author: string;
    description: string;
  };

  type Optional<T> = {
    [P in keyof T]?: T[P]; // for...in
  };

  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type VideoOptional = Optional<Video>;
  const videoOp: VideoOptional = {
    title: 'hi',
  };

  type Animal = {
    name: string;
    age: number;
  };

  const animal: Optional<Animal> = {
    age: 1,
  };

  const video: ReadOnly<Video> = {
    title: 'hi',
    author: '동욱',
    description: 'diasjdiwq',
  };
  // type VideoOptional = {
  //   title?: string;
  //   author?: string;
  //   description?: string;
  // };
  // type VideoReadOnly = {
  //   readonly title: string;
  //   readonly author: string;
  //   readonly description: string;
  // };

  type Nullable<T> = { [P in keyof T]: T[P] | null };
  const obj2: Nullable<Video> = {
    title: null,
    author: null,
    description: null,
  };

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };
}
