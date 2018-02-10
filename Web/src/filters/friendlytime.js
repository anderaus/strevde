export function friendlytime(value) {
  if (!value) {
    value = 0
  }

  var hours = Math.floor(value / 3600)
  var minutes = Math.floor((value - hours * 3600) / 60)
  var seconds = value - hours * 3600 - minutes * 60

  // if (hours < 10) { hours = '0' + hours; }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return hours + ':' + minutes + ':' + seconds
}
