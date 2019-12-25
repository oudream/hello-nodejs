console.log('student');

exports = module.exports = StudentManager;

/**
 * StudentManager
 * @constructor
 */
function StudentManager() {
};

StudentManager.students = [];

StudentManager.append = function(name) {
    StudentManager.students.push(name);
};
