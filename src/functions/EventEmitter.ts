import { notNull, isArray } from './tool'

export interface Event extends Function {
  context?: any
  once?: boolean
}

class EventEmitter {
  _events: Record<string, Event | Event[]>
  constructor() {
    this._events = Object.create(null)
  }

  addListener(type: string, fn: Event, context?: any) {
    return this._addListener(type, fn, context)
  }

  _addListener(type: string, fn: Event, context?: any, once?: boolean) {
    if (typeof fn !== 'function') {
      throw new TypeError('fn must be a function')
    }

    fn.context = context
    fn.once = !!once

    const events = this._events[type]
    if (notNull(events)) {
      this._events[type] = fn
    } else if (typeof events === 'function') {
      this._events[type] = [events, fn]
    } else if (isArray(events)) {
      events.push(fn)
    }

    return this
  }

  on(type: string, fn: Event, context?: any) {
    return this.addListener(type, fn, context)
  }

  once(type: string, fn: Event, context?: any) {
    return this._addListener.call(this, type, fn, context, true)
  }

  emit(type: string, ...rest: unknown[]) {
    if (notNull(type)) {
      throw new Error('emit must receive at lease one argument')
    }

    const events = this._events[type]

    if (notNull(events)) return false

    if (typeof events === 'function') {
      events.call(events.context || null, rest)
      if (events.once) {
        this.removeListener(type, events)
      }
    } else if (isArray(events)) {
      events.map((e) => {
        e.call(e.context || null, rest)
        if (e.once) {
          this.removeListener(type, e)
        }
      })
    }

    return true
  }

  removeListener(type: string, fn: Function) {
    if (notNull(this._events)) return this

    // if type is undefined or null, nothing to do, just return this
    if (notNull(type)) return this

    if (typeof fn !== 'function') {
      throw new Error('fn must be a function')
    }

    const events = this._events[type]

    if (typeof events === 'function') {
      events === fn && delete this._events[type]
    } else {
      const findIndex = events.findIndex((e) => e === fn)

      if (findIndex === -1) return this

      if (findIndex === 0) {
        events.shift()
      } else {
        events.splice(findIndex, 1)
      }

      if (events.length === 1) {
        this._events[type] = events[0]
      }
    }

    return this
  }

  removeAllListeners(type: string) {
    if (notNull(this._events)) return this

    // if not provide type, remove all
    if (notNull(type)) this._events = Object.create(null)

    const events = this._events[type]
    if (!notNull(events)) {
      // check if `type` is the last one
      if (Object.keys(this._events).length === 1) {
        this._events = Object.create(null)
      } else {
        delete this._events[type]
      }
    }

    return this
  }

  listeners(type: string) {
    if (notNull(this._events)) return []

    const events = this._events[type]
    // use `map` because we need to return a new array
    return notNull(events) ? [] : typeof events === 'function' ? [events] : events.map((o) => o)
  }

  listenerCount(type: string) {
    if (notNull(this._events)) return 0

    const events = this._events[type]

    return notNull(events) ? 0 : typeof events === 'function' ? 1 : events.length
  }

  eventNames() {
    if (notNull(this._events)) return []

    return Object.keys(this._events)
  }
}

export default EventEmitter
