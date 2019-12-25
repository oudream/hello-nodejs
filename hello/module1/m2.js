import M1 from './m1';

let M2 = {
    kind: {
        uiVueTable: 'ui.vue.table',
        dbMysql: 'db.mysql'
    },
    say: function() {
        console.log('begin: m2');
        M1.say();
        console.log('end: m2');
    }
};

export default M2;

