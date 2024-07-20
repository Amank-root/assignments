/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let data = str.replace(/[\s"'.,-\/#!$%\^&*;:{}=\-_`~()\\\[\]@+|?><]/g,"").toLowerCase()
  let j = data.length - 1
    for (let i = 0; i < data.length / 2; i++) {
        if (data[i].toLowerCase() != data[j].toLowerCase()) {
            return false;
        }
        j--;
    }
    return true;
}

module.exports = isPalindrome;
