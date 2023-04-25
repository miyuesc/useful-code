export const typeColor = (type: string) => {
  let color = ''
  switch (type) {
    case 'primary':
      color = '#2d8cf0'
      break
    case 'success':
      color = '#19be6b'
      break
    case 'info':
      color = '#909399'
      break
    case 'warn':
      color = '#ff9900'
      break
    case 'error':
      color = '#f03f14'
      break
    default:
      color = '#35495E'
  }
  return color
}

export const colorPrint = (type: string, title?: string, message?: string) => {
  const res: string[] = []
  if (message) {
    res.push(
      `%c ${title} %c ${message} %c`,
      `background:${typeColor(type)};border:1px solid ${typeColor(type)};
       padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`,
      `border:1px solid ${typeColor(type)};
       padding: 1px; border-radius: 0 4px 4px 0; color: ${typeColor(type)};`,
      'background:transparent'
    )
    return res
  }
  if (title) {
    res.push(
      `%c ${title} `,
      `background:${typeColor(type)};border:1px solid ${typeColor(type)};
       padding: 1px; border-radius: 4px; color: #fff;`
    )
  }
  return res
}

export const primaryPrint = (title?: string, message?: string) => {
  return colorPrint('primary', title, message)
}

export const successPrint = (title?: string, message?: string) => {
  return colorPrint('success', title, message)
}

export const infoPrint = (title?: string, message?: string) => {
  return colorPrint('info', title, message)
}

export const warnPrint = (title?: string, message?: string) => {
  return colorPrint('warn', title, message)
}

export const errorPrint = (title?: string, message?: string) => {
  return colorPrint('error', title, message)
}
