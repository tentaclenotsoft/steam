const levelToClasses = (level: number) => {
  const subnum = (number: number, from: number, length: number) =>
    String(number).substr(from, length)

  if (level < 10) {
    return ['level-0', '']
  } else if (level >= 10 && level < 100) {
    return [`level-${subnum(level, 0, 1)}0`, '']
  } else if (level >= 100 && level < 1000) {
    return [
      `level-${subnum(level, 0, 1)}00`,
      `level-plus-${subnum(level, 1, 1)}0`
    ]
  } else if (level >= 1000) {
    return [
      `level-${subnum(level, 0, 2)}00`,
      `level-plus-${subnum(level, 2, 1)}0`
    ]
  }
}

const numberFormatter = (value: number) => new Intl.NumberFormat().format(value)

const requiredXPFromLevel = (level: number) => {
  if (level <= 10) {
    return 100
  } else if (level < 100) {
    const [first, last] = level
      .toString()
      .split('')
      .map((number) => +number)

    return (
      +(first + (last === 0 ? '0' : '1'))
        .split('')
        .reduce((a, b) => Number(a) + Number(b), 0) * 100
    )
  } else {
    const [penultimate, last] = level
      .toString()
      .slice(level < 1000 ? 1 : 2)
      .split('')
      .map((number) => +number)

    let lastTwoSum = 0
    lastTwoSum = +(penultimate + (last === 0 ? '0' : '1'))
      .split('')
      .reduce((a, b) => Number(a) + Number(b), 0)

    const lastTwoDigits = penultimate.toString() + last.toString()
    const leadingDigits = level.toString().replace(lastTwoDigits, '')

    if (lastTwoSum === 10) {
      return (+level.toString().replace(lastTwoDigits, '') + 1) * 1000
    } else {
      return (
        +(leadingDigits + lastTwoSum.toString()) *
        (level < 1000
          ? +leadingDigits % 10 !== 0
            ? 100
            : 10
          : +leadingDigits % 1 !== 0
          ? 1000
          : 100)
      )
    }
  }
}

const totalXPFromLevel = (level: number) => {
  let xp = 0

  for (let index = 1; index <= level; index++) {
    xp += requiredXPFromLevel(index)
  }

  return xp
}

export {
  levelToClasses,
  numberFormatter,
  requiredXPFromLevel,
  totalXPFromLevel
}
