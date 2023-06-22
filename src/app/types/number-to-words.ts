export function numberToWords(num: number): string {
    const units = [
      "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];
    const tens = [
      "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    ];
  
    if (num < 0 || num > 999) {
      return "Number out of range";
    }
  
    if (num < 20) {
      return units[num];
    }
  
    if (num < 100) {
      const tensDigit = Math.floor(num / 10);
      const unitsDigit = num % 10;
      const result = tens[tensDigit];
  
      if (unitsDigit !== 0) {
        return result + "-" + units[unitsDigit];
      }
  
      return result;
    }
  
    const hundredsDigit = Math.floor(num / 100);
    const tensDigit = Math.floor((num % 100) / 10);
    const unitsDigit = num % 10;
  
    let words = units[hundredsDigit] + " hundred";
  
    if (tensDigit > 0) {
      words += " " + tens[tensDigit];
  
      if (unitsDigit !== 0) {
        words += "-" + units[unitsDigit];
      }
    } else if (unitsDigit !== 0) {
      words += " " + units[unitsDigit];
    }
  
    return words;
  }
  