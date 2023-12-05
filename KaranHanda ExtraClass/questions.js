const fs = require("fs");


// ----> Question 1
// Synchronous callback:
// function callbackfn() {
//     console.log("This is the callback function");
// }
// function higherOrder(callbackfn) {
//     console.log("this is the higherOrder Function");
//     callbackfn();
// }

// higherOrder(callbackfn);


// ----> Question 2
// Ayscn callback
// function callbackfn() {
//     console.log("This is the callback function");
// }
// const date = new Date().getDate();
// const d = new Date().getUTCDate();  // Another way to get date
// function higherOrderAsync(callbackfn) {
//     console.log("This is higherOrderAsync function")
//     setTimeout(() => {
//         console.log("This is inside the setTimeout")
//         callbackfn()
//     }, date * 1000)
// }
// higherOrderAsync(callbackfn);




// ----> Question 3
// function callback(val) {
//     val = val + 1;
//     return val;
// }
// array = [1, 2, 3, 4, 5];
// function mapArray(callback, array) {
//     const modifiedarray = array.map(callback);
//     return modifiedarray;
// }
// console.log(mapArray(callback, array));

// const mod = []
// array.forEach(element => {
//     element = element + 1;
//     mod.push(element);
// });
// console.log(mod) // [ 2, 3, 4, 5, 6 ]



// ----> Question 4
// function callback(val) {
//     if (val > 5) {
//         return val;
//     }
//     else {
//         return undefined;
//     }
// }
// array = [5, 6, 7, 2, 19, 56];
// function filterArray(callback, array) {
//     const modifiedarray = array.filter(callback);
//     return modifiedarray;
// }
// // console.log(filterArray(callback, array));

// function newFilter(array) {
//     const simran = array.filter(num => num > 5);
//     return simran
// }
// console.log(newFilter(array));



// ----> Question 5
// fs.readFile("a.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(data)
//     }
// })



// ----> Question 6
// let ans = [0, 1];
// const data = "Hello"
// function parallelFileOperation() {
//     fs.readFile('a.txt', "utf8", (err, data) => {
//         if (err) {
//             throw new Error("file doesn't exist")
//         }
//         else {
//             ans[0] = data;
//         }
//     })
//     fs.writeFile('b.txt', data, 'utf8', (err) => {
//         if (err) {
//             ans[1] = 0;
//         }
//         else {
//             console.log("file written successfully!")
//         }
//     })
//     return ans;
// }

// console.log(parallelFileOperation());



// ----> Question 7

// ---using async/await
// function dataCleaner(mess) {
//     const arr = [];
//     const dataArr = mess.split(" ");
//     for (let i = 0; i < dataArr.length; i++) {
//         if (dataArr[i] != '') {
//             arr.push(dataArr[i])
//         }
//     }
//     const ansStr = arr.join(" ")
//     return ansStr;
// }

// function readFileAsync(filePath) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//                 reject(`Error reading ${filePath}`);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }

// function writeFileAsync(filePath, data) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(filePath, data, 'utf8', (err) => {
//             if (err) {
//                 reject(`Error writing to ${filePath}`);
//             } else {
//                 resolve();
//             }
//         });
//     });
// }

// async function series() {
//     try {
//         let aData = await readFileAsync('a.txt');
//         console.log("1: contents of a.txt read successfully!");

//         // Perform operations on aData

//         await writeFileAsync('b.txt', aData);
//         console.log("2: contents of a.txt written in b.txt successfully!");

//         await writeFileAsync('c.txt', aData);
//         console.log("3: contents of a.txt written in c.txt successfully!");

//         const cleanData = dataCleaner(aData);
//         await writeFileAsync('a.txt', cleanData);
//         console.log("4: a.txt cleaned successfully!");

//         const delData = "this is new data";
//         await writeFileAsync('a.txt', delData);
//         console.log("5: the contents of a.txt have been deleted successfully!");

//         await writeFileAsync('b.txt', delData);
//         console.log("6: the contents of b.txt have been deleted successfully!");
//     } catch (error) {
//         console.error(error);
//     }
// }

// series();


// --- using promise chaining

function dataCleaner(mess) {
    const arr = [];
    const dataArr = mess.split(" ");
    for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i] != '') {
            arr.push(dataArr[i])
        }
    }
    const ansStr = arr.join(" ")
    return ansStr;
}

function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading ${filePath}`);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFileAsync(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf8', (err) => {
            if (err) {
                reject(`Error writing to ${filePath}`);
            } else {
                resolve();
            }
        });
    });
}

readFileAsync('a.txt')
    .then((aData) => {
        console.log("1: contents of a.txt read successfully!");
        return aData;
    })
    .then((aData) => {
        // Perform operations on aData

        return writeFileAsync('b.txt', aData);
    })
    .then(() => {
        console.log("2: contents of a.txt written in b.txt successfully!");
        return writeFileAsync('c.txt', aData);
    })
    .then(() => {
        console.log("3: contents of a.txt written in c.txt successfully!");
        const cleanData = dataCleaner(aData);
        return writeFileAsync('a.txt', cleanData);
    })
    .then(() => {
        console.log("4: a.txt cleaned successfully!");
        const delData = "this is new data";
        return writeFileAsync('a.txt', delData);
    })
    .then(() => {
        console.log("5: the contents of a.txt have been deleted successfully!");
        return writeFileAsync('b.txt', delData);
    })
    .then(() => {
        console.log("6: the contents of b.txt have been deleted successfully!");
    })
    .catch((error) => {
        console.error(error);
    });


