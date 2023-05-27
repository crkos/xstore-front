/***
 * @description Esta función recibe un texto y un número máximo de caracteres, si el texto es mayor al número máximo de caracteres, se recorta y se agrega "..." al final
 * @param text {string} Texto a recortar
 * @param maxLength {number} Número máximo de caracteres
 * @returns {*|string} Texto recortado
 */
export const shortenText = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
