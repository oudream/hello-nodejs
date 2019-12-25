
const CjLog = require('./../common/cjs/cjlog.js');

const fs = require('fs');
const path = require('path');

let mainCvBus1 = function(fp1, fp2) {
    if (!(fp1 && fp2)) {
        cjs.error('mainCvBus1 param invalid!');
        return;
    }
    let fd;
    let buf = Buffer.alloc(1024);
    let iPos = 0;
    let text = '';
    try {
        fd = fs.openSync(fp1, 'r+');

        while (true) {
            let iRead = fs.readSync(fd, buf, 0, buf.length, iPos);
            if (iRead > 0) {
                text += buf.slice(0, iRead).toString();
            }
            if (iRead < buf.length) {
                break;
            }
            iPos += iRead;
            if (iPos > 1024 * 1024 * 4) {
                cjs.warn('mainCvBus1 fp1 too big!');
                return;
            }
        }

        let objBus = JSON.parse(text);
        cjs.debug(objBus);

        let signals = objBus.signal;
        let newSignals = [];
        for (let i = 0; i < signals.length; i++) {
            let signal = signals[i];
            let ui_schemes = signal.ui_scheme;
            for (let j = 0; j < ui_schemes.length; j++) {
                let ui_scheme = ui_schemes[j];
                let newSignal = {};
                newSignal.desc = signal.desc;
                newSignal.neNo = signal.neNo;
                newSignal.signalUrl = signal.signalUrl;
                newSignal.web_id = ui_scheme.id;
                newSignal.scheme = ui_scheme.scheme;
                newSignal.pretreatment = ui_scheme.pretreatment;
                newSignal.iframe = ui_scheme.iframe;
                newSignals.push(newSignal);
            }
        }

        let schemes = objBus.scheme;
    } catch (err) {
        /* Handle the error */
        cjs.error(err);
    } finally {
        if (fd !== undefined) {
            fs.closeSync(fd);
        }
    }
};

let fp1 = path.join(__dirname, './../../assets/hello/cc4k/bus.json');
let fp2 = path.join(__dirname, './../../assets/hello/cc4k/gis_bus1.json');
mainCvBus1(fp1, fp2);
