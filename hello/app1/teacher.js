let sm = require('./student');

console.log('teacher');

exports = module.exports = TeacherManager;

/**
 * TeacherManager
 * @constructor
 */
function TeacherManager() {
};

TeacherManager.teachers = [];

TeacherManager.append = function(name) {
    TeacherManager.teachers.push(name);
    sm.append(name);
};
