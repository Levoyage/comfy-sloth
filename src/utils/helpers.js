export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number / 100)
    return newNumber
}

export const getUniqueValues = (data, type) => {
    //通过将type 变量放在方括号内，可以将其作为属性名传递给data.map() 方法
    //从而获取指定属性的值并返回一个新的数组 unique
    let unique = data.map((item) => item[type])
    //flat() 是 JavaScript 的一个数组方法，它用于将多维数组转换为一维数组。
    if (type === 'colors') {
        unique = unique.flat()
    }
    //Set 对象是 ECMAScript 6（ES6）中新增的一个集合类型，它可以存储一组唯一的值，即不能有重复的值。Set 对象可以用于检查某个值是否存在于集合中，或者从集合中删除某个值。
    return ['all', ...new Set(unique)]
}
