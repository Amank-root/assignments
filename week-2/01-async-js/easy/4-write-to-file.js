// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.
const fs = require('fs')

function writeData(path, mssg){
    // const data = fs.writeFileSync(path, String(mssg))
    fs.appendFileSync(path, `${mssg} \n`,"utf-8")
    // console.log(data)
}
writeData('./01-async-js/easy/4-write-to-file.md', "Demo mssg")