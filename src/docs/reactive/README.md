# 비동기를 우아하게 처리하는 방법
> 해당 섹션은 FEConf에서 나석주님이 발표하신 [*비동기를 우아하게 처리하기 위한 Observable*] 를 보고
> 정리하는 reactive 프로그래밍의 내용이다. 출처: https://youtu.be/oHF8PEkteq0

## 비동기 처리의 어려움
웹에서는 다음과 같은 비동기 처리들을 다룬다.
- DOM Events
- Ajax
- Animations
- 시간 (Throttling/Debouncing)
- WebSockets, Web Workers

=> callback은 코드가 지저분해지는 단점, promise는 취소가 불가하고 단일 값을 다루는 데 실제 웹에서의 비동기는
여러 값이 존재한다. **고로 Observable을 다뤄 비동기를 처리하자**

## Observable
> 비동기로 발생하는 여러 데이터를 다루는 인터페이스
- 이벤트 스트림, 취소 가능, 쉽게 선언적으로 쓰인 코드로 흐름을 파악하기 용이