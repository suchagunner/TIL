# Mobx

```js
// App.tsx
const Counter = observer((props: PropsWithChildren) => {
    console.log("Count")
    const store = CounterStore;

    return <div>
        <button type="button" onClick={() => store.calculate()}>
            계산
        </button>
        {props.children}
    </div>
})

const Text = observer(({children}: PropsWithChildren) => {
    console.log("Text")
    const store = CounterStore;

    return <span>{children} {store.count} </span>
})

const Button = observer(({onClick, children, which}: { onClick: () => void, children: ReactNode, which: 'left' | 'right' }) => {
    console.log(`${which === 'left' ? 'decrease' : 'increase'}Button`)
    const store = CounterStore;

    return <button type="button" onClick={onClick}>
        {children}
        {which === 'left' ? store.decreaseButtonText : store.increaseButtonText}
    </button>
})

const App = observer(() => {
    const store = CounterStore;

    useEffect(() => {
        console.log("useEffect", store)
    }, [store])
    return  (<div className="App">
        <Counter>
            <Button onClick={() => store.increase()} which='right'>
                증가버튼
            </Button>
            <Text>
                카운트
            </Text>
            <Button onClick={() => store.decrease()} which='left'>
                감소버튼
            </Button>

        </Counter>
    </div>)
})

export default App;
```

```js
// store.tsx
class CounterStore {
    public count = 0;
    private increaseCount = 0;
    private decreaseCount = 0;


    get decreaseButtonText () {
        return `- 버튼 ${this.decreaseCount} 번 눌림`;
    }

    get increaseButtonText () {
        return `+ 버튼 ${this.increaseCount} 번 눌림`;
    }

    constructor() {
        makeAutoObservable(this)
    }

    increase() {
        this.increaseCount += 1;
    }

    decrease() {
        this.decreaseCount += 1;
    }

    calculate() {
        this.count = this.increaseCount + (-1 * this.decreaseCount)
    }
}

export default  new CounterStore();
```

컴포넌트를 observer로 감싸고 store를 참조하게 되면 proxy로 반응형 side-effect를 불러일으킬 수 있다.
또한 *store의 count가 변경이 되어도 `store.decreaseCount`를 바라보는 Button 컴포넌트는 리렌더링이 되지 않는다*