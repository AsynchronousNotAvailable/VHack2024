export function calculatePercentage(
    numbers,
    total
  ) {
    const percentageArray = [];
  
    numbers.forEach(number => {
      let percentage = ((number / total) * 100);
      const rounded = Math.round(percentage * 100) / 100;

  
      percentageArray.push(rounded);
    });
  
    return percentageArray;
  }