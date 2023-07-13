export const numberToWords = (number: string): string => {
    const singleDigits = [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    ];
  
    const teens = [
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
      'seventeen', 'eighteen', 'nineteen',
    ];
  
    const tens = [
      '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
    ];
  
    const scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];
  
    function convertNumberToWords(n: number): string {
      if (n < 10) {
        return singleDigits[n];
      } else if (n < 20) {
        return teens[n - 10];
      } else if (n < 100) {
        const tensDigit = Math.floor(n / 10);
        const onesDigit = n % 10;
        return tens[tensDigit] + (onesDigit ? ' ' + singleDigits[onesDigit] : '');
      } else if (n < 1000) {
        const hundredsDigit = Math.floor(n / 100);
        const remainingDigits = n % 100;
        return (
          singleDigits[hundredsDigit] +
          ' hundred' +
          (remainingDigits ? ' ' + convertNumberToWords(remainingDigits) : '')
        );
      } else {
        for (let i = 1; i < scales.length; i++) {
          if (n < Math.pow(1000, i + 1)) {
            const scaleNumber = Math.floor(n / Math.pow(1000, i));
            const remainingNumber = n % Math.pow(1000, i);
            return (
              convertNumberToWords(scaleNumber) +
              ' ' +
              scales[i] +
              (remainingNumber ? ', ' + convertNumberToWords(remainingNumber) : '')
            );
          }
        }
      }
      return 'Number out of range';
    }
  
    const parts = number.split('.'); // Split the number into integer and decimal parts
    const integerPart = parseInt(parts[0]);
    const decimalPart = parts[1] ? parseInt(parts[1]) : 0;
  
    let result = convertNumberToWords(integerPart);
  
    if (decimalPart > 0) {
      result += ` point ${convertNumberToWords(decimalPart)}`;
    }
  
    return result;
  };
  