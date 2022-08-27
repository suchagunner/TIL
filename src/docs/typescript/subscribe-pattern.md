# 디자인 패턴


# Publish - Subscribe 패턴

```ts
class SubscribeManager<
  EventType extends string,
  CallbackParamMap extends Partial<Record<EventType, any>> = Record<EventType, never>,
  > {
  private _listener: Map<EventType, ((param?: any) => void)[]>;
  
  constructor() {
    this._listener = new Map();
  }
  
  subscribe = <T extends EventType>(event: T, fn: (param: CallbackParamMap[T]) => void) => {
    const listeners = [...(this._listener.get(event) || [])];
    
    if (listeners.indexOf(fn) === -1) listeners.push(fn);
    this._listener.set(event, listeners);
  }
  
  unsubscribe = <T extends EventType>(event: T, fn: (param: CallbackParamMap[T]) => void) => {
    const listeners = [...(this._listener.get(event) || [])];
    
    const idx = listeners.indexOf(fn);
    
    if (idx >= 0) {
      listeners.splice(idx, 1);
    }
    
    this._listener.set(event, listeners);
  }
  
  publish = <T extends EventType>(
    event: T,
    ...publishResult: (CallbackParamMap[T] extends never ? [] : [CallbackParamMap[T]])
  ) => {
    (this._listener.get(event) || []).forEach((fn) => {
      fn(publishResult[0]);
    });
  }
}

export default SubscribeManager;
```

