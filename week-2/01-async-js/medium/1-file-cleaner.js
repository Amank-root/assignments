// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```
const fs = require('fs')
function noSpace(path){
    const data = fs.readFileSync(path, "utf-8")
    const cleanData = data.trim().split(/[\s,\t,\n]+/).join(' ')

    console.log(cleanData)
}


noSpace("01-async-js/easy/4-write-to-file.md")