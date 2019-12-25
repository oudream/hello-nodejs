function promiseQueue (executors) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(executors)) { executors = Array.from(executors) }
        if (executors.length <= 0) { return resolve([]) }

        let res = [];
        executors = executors.map((x, i) => () => {
            let p = typeof x === 'function' ? new Promise(x) : Promise.resolve(x);
            p.then(response => {
                if (response === null) {
                    resolve(res);
                    return;
                }
                res[i] = response;
                if (i === executors.length - 1) {
                    resolve(res)
                }
                else {
                    executors[i + 1]()
                }
            }, reject)
        });
        executors[0]();
    })
}

function alarm (msg, time) {
    return resolve => {
        setTimeout(() => {
            console.log(msg);
            if (time>1000)
                resolve(null);
            else
                resolve(msg + time);
        }, time)
    }
}

/**
 *
 * @param params
 * @param callback results =>
 */
let queryMessages = (params, callback) => {
    let alarms = [];
    for (let i = 0; i < params.length; i++) {
        let param = params[i];
        alarms.push(alarm(...param));
    }
    promiseQueue(alarms).then(callback);
};

let params = [['a', 100], ['b', 1000], ['c', 100], ['d', 1001], ['e', 100]];
let callback = x => {
    console.log(x);
};

queryMessages(params, callback);

setTimeout(() => {
    console.log('end');
}, 5000)

// let objs = [];
// for (let i = 0; i < 5; i++) {
//     objs.push(alarm('a' + i, i * 100));
// }
//
// promiseQueue(objs).then(x => { console.log(x); console.log(x); console.log(new Date()) });

// promiseQueue([alarm('1', 100), alarm('2', 1000), 12, 'hellp', alarm('3', 2000)]).then(x => console.log(x))

// promiseQueue([() => Promise.reject('error1'), 12, 'hellp', () => Promise.reject('error2')]).then(null, e => console.log(e))
