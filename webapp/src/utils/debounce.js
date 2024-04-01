const debounce = (func, time) => {
  let timer
  return function (...args) {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      func.apply(context, args)
    }, time)
  }
}

export { debounce }
