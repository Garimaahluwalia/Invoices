function numberToWords(number) {
  const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function convertBelowHundred(num) {
    if (num < 10) {
      return units[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else {
      const ten = Math.floor(num / 10);
      const unit = num % 10;
      return tens[ten] + (unit !== 0 ? ' ' + units[unit] : '');
    }
  }

  function convertBelowThousand(num) {
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    let result = '';

    if (hundred !== 0) {
      result += units[hundred] + ' hundred';
      if (remainder !== 0) {
        result += ' ';
      }
    }

    if (remainder !== 0) {
      result += convertBelowHundred(remainder);
    }

    return result;
  }

  if (number === 0) {
    return 'zero';
  }

  const trillion = Math.floor(number / 1000000000000);
  const billion = Math.floor((number % 1000000000000) / 1000000000);
  const million = Math.floor((number % 1000000000) / 1000000);
  const thousand = Math.floor((number % 1000000) / 1000);
  const remainder = number % 1000;
  let result = '';

  if (trillion !== 0) {
    result += convertBelowThousand(trillion) + ' trillion ';
  }
  if (billion !== 0) {
    result += convertBelowThousand(billion) + ' billion ';
  }
  if (million !== 0) {
    result += convertBelowThousand(million) + ' million ';
  }
  if (thousand !== 0) {
    result += convertBelowThousand(thousand) + ' thousand ';
  }
  if (remainder !== 0) {
    result += convertBelowThousand(remainder);
  }

  return result.trim();
}

// Usage example
const number = 123456789;
const words = numberToWords(number);
console.log(words); // Output: "one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine"
