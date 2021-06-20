export const downloadAsFile = (content, fileName) => {
  const a = document.createElement('a')
  a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
  a.setAttribute('download', fileName)

  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
