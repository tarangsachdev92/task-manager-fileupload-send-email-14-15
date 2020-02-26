
const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc12345' }, 'thisisthesecretkey', { expiresIn: '7 days' });
    // { expiresIn: '7 days' }
    // { expiresIn: '0 seconds' }
    // { expiresIn: '2 months' }

    console.log(token);

    const data = jwt.verify(token, 'thisisthesecretkey');
    console.log(data);
}

myFunction();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjM0NSIsImlhdCI6MTU4MjYxMzU1M30.reFxBPm_rzGwTk9eIq2Nf8SYU813Uvqrpw9DAf9bUmQ

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 -> header
//  -> base64 encoded json string 
// it contains some meta information about what type of token it is (jwt) and the alog which is used to generate that,


// eyJfaWQiOiJhYmMxMjM0NSIsImlhdCI6MTU4MjYxMzU1M30 --> payload/body
//  -> base64 encoded json string 
// it contains data that provided

// reFxBPm_rzGwTk9eIq2Nf8SYU813Uvqrpw9DAf9bUmQ --> signature
// this is used to verify token 

