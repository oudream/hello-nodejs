let sm = require('./student');
let tm = require('./teacher');
require('./teacher');
require('./teacher');


sm.append('aStudent');
tm.append('aTeacher');
sm.append('bStudent');
tm.append('bTeacher');
sm.append('cStudent');
tm.append('cTeacher');


console.log(sm.students);
console.log(tm.teachers);
