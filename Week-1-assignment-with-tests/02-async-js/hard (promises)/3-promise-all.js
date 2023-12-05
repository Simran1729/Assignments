/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */

const start = new Date().getTime()

function waitOneSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("First promise initiated")
            resolve()
        }, 1000)
    })
}

function waitTwoSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("second promise initiated")
            resolve()
        }, 2000)
    })
}


function waitThreeSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("third promise initiated")
            resolve()
        }, 3000)
    })
}

// using Promise.all() method
// Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()])
//     .then(() => {
//         const end = new Date().getTime()
//         console.log(`the time taken by all promises to resovle is: ${(end - start) / 1000}`)
//     })

// Using async await method
// async function waitForAllPromises() {
//     await waitOneSecond();
//     console.log("First promise resolved after 1 second");

//     await waitTwoSecond();
//     console.log("Second promise resolved after 2 seconds");

//     await waitThreeSecond();
//     console.log("Third promise resolved after 3 seconds");

//     const end = new Date().getTime();
//     console.log(`Total time taken: ${(end - start) / 1000}`)
// }

// waitForAllPromises()