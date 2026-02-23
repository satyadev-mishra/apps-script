function toLowerString(value) {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  return String(value).trim().toLowerCase();
}

function capitalizeFirstLetter(stringValue = '') {
  if (!stringValue) return '';
  return stringValue
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
