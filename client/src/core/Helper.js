export function limitText(text, limit) {
  var str = text;

  if (text.length > limit) str = str.substring(0, limit);

  return str;
}
