// FOR LOOP
var sum_to_n_a = function (n) {
  // your code here
  // Use "for" loop to iterate over each element from 1 to n to add to the sum variable.
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

// MATH FORMULA
var sum_to_n_b = function (n) {
  // your code here
  // Use Arithmetic Progression Formula
  return (n * (n + 1)) / 2;
};

// REDUCE
var sum_to_n_c = function (n) {
  // your code here
  // Create a Array from 1 to n
  const array = Array.from({ length: n }, (_, i) => i + 1);
  // Use reduce
  return array.reduce((sum, cur) => sum + cur, 0);
};

//  Result
console.log(sum_to_n_a(3))
console.log(sum_to_n_b(4))
console.log(sum_to_n_c(5))
