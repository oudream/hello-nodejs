
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    var result = await resolveAfter2Seconds();
    console.log(result);
    console.log('b1');
    var i1 = 3;
    var i2 = 2;
    var i3 = i1 + i2;
    // expected output: 'resolved'
    return i3;
}

let result = asyncCall();
console.log(result);
console.log('a1');
console.log('a2');
