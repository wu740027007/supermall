//防抖函数，防止每次图片都刷新
export function debounce(func,delay){
  let timer = null
  return function (...args){
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}

