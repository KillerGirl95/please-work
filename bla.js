const bcrypt = require('bcrypt');

const password = "ilikethat"


const fun = async (pwd) => {
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    const hashed_password = await bcrypt.hash(pwd, salt);
    console.log(hashed_password)
}
fun(password)
console.log('thing runs')