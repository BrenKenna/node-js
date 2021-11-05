// import modules
// const some_Module = require('../someFolder_Above/Me')


// Variable assignment
let name = "bill";
let number = 10;
let decimalNum = 10.2543;
let mathOut = (number) / decimalNum;
console.log(`Person = ${name} is ${number} years old`);
console.log(`Output of math = ${mathOut}`);


// String manipultation
// process.env.USERNAME.toUpperCase();
// process.env.arch.toLowerCase();


// functions
function myFunction(num1, num2) {
    let output;
    output = num1 / num2;
    return output;
}

let mathOut;
mathOut = myFunction(100, 5);
console.log(`100 divided 5 = ${mathOut}`);


/* 
 * Conditions & Loops
 *
*/

// Conditionss
let num1 = 100;
let num2 = 50;
if (num2 < num1){
    console.log(`Number2 ${num2} is less than Number2 ${num1}`);
} else {
    console.log(`Number1 bigger than number2`);

}


// If, elif, else example
let num3 = 2;
if (num3 > 100){
    console.log(`${num3} > 100`);
} else if(num3 > 10) {
    console.log(`${num3} > 10`);
} else if(num3 == 2) {
    console.log(`${num3} == 2`);
} else {
    console.log("WTF :(");
}