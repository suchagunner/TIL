# 네이밍 컨벤션

## Interface

```JS
/**
There's no official naming convention though it's common in the broader TS community to not use I for interfaces unless they're explicitly for being implemented by classes like:
*/

import type { IUser } from '$models/interfaces/iuser.interface';
import type { IDeserializable } from '$models/interfaces/ideserializable.interface';

export class UserModel implements IDeserializable<IUser>, IUser {
  public email: string;
  public password: string;

  deserialize(input: IUser): this {
    Object.assign(this, input);
    return this;
  }
}

/**
 * 출처: https://stackoverflow.com/questions/68503504/what-is-the-naming-convention-for-interfaces-and-classes-in-typescript
 */
```

위와 같이 인터페이스는 I[MyInterface]와 같은 형식으로 작성을 많이 함. 

**그러나**

> Do not mark interfaces specially (IMyInterface or MyFooInterface) unless it's idiomatic in its environment. When introducing an interface for a class, give it a name that expresses why the interface exists in the first place (e.g. class TodoItem and interface TodoItemStorage if the interface expresses the format used for storage/serialization in JSON). -- https://ts.dev/style/#identifiers (ts.dev)

위와 같이 ts 스타일 가이드에서 말하는 것처럼 특정 환경에 종속되어 꼭 인터페이스임을 명시하는 경우가 필요한 게 아니라면 애초에 왜 이 인터페이스가 필요한지를 명시적으로 나타낼 수 있는 네이밍을 하는 것이 더 좋은 방법이라 한다.