 export function numberToWords(number) {
    // Define arrays for word representation
    const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
    if (number < 20) {
      return units[number];
    } else if (number < 100) {
      return tens[Math.floor(number / 10)] + ' ' + units[number % 10];
    } else if (number < 1000) {
      return units[Math.floor(number / 100)] + ' hundred ' + numberToWords(number % 100);
    } else if (number < 1000000) {
      return numberToWords(Math.floor(number / 1000)) + ' thousand ' + numberToWords(number % 1000);
    } else if (number < 1000000000) {
      return numberToWords(Math.floor(number / 1000000)) + ' million ' + numberToWords(number % 1000000);
    } else {
      return 'Number out of range';
    }
  }
  