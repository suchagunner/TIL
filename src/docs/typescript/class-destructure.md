# 클래스 (Class)

## Class Destructure

### 구현부
```js
class FunctionMethodClass {
  // function 함수 선언식
  setFileOptions(options: Partial<FileOptions>){
    this.fileOptions.update(options);
  }
}

class LambdaMethodClass {
  // 화살표 함수 표현식
  setFileOptions = (options: Partial<FileOptions>) => {
    this.fileOptions.update(options);
  }
}
```

위와 같이 클래스의 메소드를 `function`으로 작성했을 때와 `lambda`로 작성했을 때는
`구조 분해 할당`을 했을 때의 `this` 레퍼런스에 차이가 있다.

```js
'use strict';
const { setFileOptions: func1 } = new FunctionMethodClass();
const { setFileOptions: func2 } = new LambdaMethodClass();

func1(); // this === undefined
func2(); // this === LambdaMethodClass

```

### WHY
화살표 함수로 메소드를 작성하면 this가 autobind 되기 때문이다.
따로 생성자 함수에서 `this.method = this.method.bind(this)`를 해줄 필요가 없다.

## 유의할 점

### 프로토타입에 존재하지 않는다.
화살표 함수로 메소드를 작성하게 되면 객체의 프로토타입에 해당 메소드가 존재하지 않게 된다.
프로토타입 객체에서 메소드가 정의되지 않으니 매번 인스턴스를 생성할 때마다 메소드 또한 생성하게 되어
프로토타입 패턴을 활용하지 못하는 것이다.

### 상속(확장) 에서의 문제점
```JS
class Parent {
  method = () => "Parent Method";
}
```
위와 같은 코드는 결국 트랜스파일러를 통해
```JS
class Parent {
  consturctor() {
    this.method = "Parent Method";
  }
}
```
로 변환이 된다. 만일 이 `Parent` 클래스를 상속한다면 `Parent`의 `constructor`에 있는
`this`는 상속받은 클래스 인스턴스를 가리키게 된다.

```JS
class Child extends Parent {
  method() {
    "Child Method"
  }
}
```
만일 상속받은 클래스의 동일한 메소드를 위와 같이 오버라이드 하려고 해도 불가하다. Child가 생성될 때
부모 생성자인 `super()` 또한 암시적으로 실행되는데 항상 `this.method = "Parent Method"`로
덮어쓰기 때문이다.

## 결론
```js
    class Sample {
      constructor() {
        this.method = this.method.bind(this);
      }
      
      method() {
        console.log("I want to be me")
      }
    }
```
위의 경우 `Sample` 클래스를 상속받은 어떠한 자식 클래스라도 method 메소드를 오버라이드할 때 `Sample`의 것으로
무시되는 경우는 없을 것이다. 클래스를 정의할 때 메소드는 `usual function`으로 작성하고 생성자에서 bind를 해줘서 오버라이드 하는 것이
구조 분해 할당에서 this 바인딩의 오류를 피하고 `prototype`의 이점을 가져갈 수 있는 방식일 것이다.

