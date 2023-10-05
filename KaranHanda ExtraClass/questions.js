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

function series() {
    let aData = " ";
    fs.readFile('a.txt', "utf8", (err, data) => {
        if (err) {
            throw new Error("a.txt file read error!")
        }
        else {
            aData += data;
            console.log("1 : contents of a.txt read successfully!")
        }
    })

    setTimeout(() => {
        fs.writeFile('b.txt', aData, 'utf8', (err) => {
            if (err) {
                throw new Error("b.txt write error!")
            }
            else {
                console.log("2: contents of a.txt written in b.txt successfully!")
            }
        })
        fs.writeFile('c.txt', aData, 'utf8', (err) => {
            if (err) {
                throw new Error("b.txt write error!")
            }
            else {
                console.log("3: contents of a.txt written in c.txt successfully!")
            }
        })

        const cleanData = dataCleaner(aData);
        fs.writeFile('a.txt', cleanData, 'utf8', (err) => {
            if (err) {
                throw new Error('error cleaning the contents of file!')
            }
            else {
                console.log("4: a.txt cleaned successfully!")
            }
        });


        const delData = "this is new data";

        fs.writeFile('a.txt', delData, 'utf8', (err) => {
            if (err) {
                throw new Error("error deleting contents of a.txt")
            }
            else {
                console.log("5: the contents of a.txt has been deleted succesfully!")
            }
        })

        fs.writeFile('b.txt', delData, 'utf8', (err) => {
            if (err) {
                throw new Error("error deleting contents of b.txt")
            }
            else {
                console.log("6: the contents of b.txt has been deleted succesfully!")
            }
        })
    }, 3000)
}
series();




