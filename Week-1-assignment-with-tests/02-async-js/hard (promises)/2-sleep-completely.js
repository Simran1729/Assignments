/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */


// using 'Date' object
// function sleep(milliseconds) {
//     const start = new Date().getTime();
//     while (new Date().getTime - start < milliseconds) {
//         // Busy wait till the desired time has passed
//     }

// }

// console.log("Before sleep");
// sleep(7000);
// console.log("After sleep");


function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

console.log("Before sleep");
sleep(5000).then(() => {
    console.log("After sleep")
})