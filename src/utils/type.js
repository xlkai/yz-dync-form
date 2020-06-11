export function isFunction(functionToCheck) {
  const type = {}
  return functionToCheck && type.toString.call(functionToCheck) === '[object Function]'
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function getProps(prop, names, aliasName = {}) {
  const res = {}
  names.forEach(name => {
    const val = prop[aliasName[name] || name]
    if (val !== undefined) {
      res[name] = val
    }
  })
  return res
}

export function clean(prop) {
  for (const key in prop) {
    const itm = prop[key]
    if (itm && isObject(itm)) {
      clean(itm)
    } else if (itm === undefined || itm === null || itm === '' || key === 'showBtn') {
      delete prop[key]
    }
  }
  return prop
}
