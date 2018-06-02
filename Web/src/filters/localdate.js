export function localdate(value) {
  if (!value) {
    value = ''
  }

  return new Date(value).toLocaleDateString();
}
