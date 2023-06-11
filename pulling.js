class MalakCronjob {
  constructor() {
    if (!MalakCronjob.instance) {
      this._data = []
      MalakCronjob.instance = this
    }
    let states = []
    this.states = states
    this.cronJob = (function () {
      setInterval(() => {
        // console.log(111, states)
        states[0].promise.resolve()
        states.splice(0, 1)
        // console.log(222, states)
      }, 1000)
    })()
  }
  fn1(name, expectedState) {
    let resolveParam = {}
    const promiseA = new Promise((resolve, reject) => {
      resolveParam = { resolve, reject }
    })
    this.states.push({ name, expectedState, promise: resolveParam })
    return promiseA
  }
}

const instance = new MalakCronjob()
Object.freeze(instance)

const x1 = (async () => {
  const x1 = await instance.fn1(1, 'off')
  console.log({ x1 })
})()

const x2 = (async () => {
  const x2 = await instance.fn1(2, 'on')
  console.log({ x2 })
})()

const x3 = (async () => {
  const x3 = await instance.fn1(3, 'sss')
  console.log({ x3 })
})()
