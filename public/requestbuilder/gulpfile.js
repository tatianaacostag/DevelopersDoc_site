var gulp = require('gulp');
var concat = require('gulp-concat')

gulp.task('concat',function(){

    return gulp.src([
    'requestbodies/modifyauthchargecreditrequestjson.js',
    'requestbodies/modifytokenrequestjson.js',
    'iteraterequestbodyv6.js',
    'checkstatusperkeyv5.js',
    'removefieldsv3.js',
    'showoutputv6.js',
    'messages/custommessagesv6.js',
    'messages/stringsv7.js',
    'rules/checkrulesv4.js',
    'rules/parentrulesv2.js',
    'rules/levelonerulesv1.js',
    'orderfieldsintable.js',
    'buildheadertable.js',
    'buildfieldstablev7.js',
    // 'configlookups/unsupportedrequests.js',
    'configlookups/unsupportedpaymentmethods.js',
    'configlookups/headerfields.js',
    // 'unsupportedrequests.js', // added
    'bbconfiglookups.js', // added
    'fielddescriptions/headerfielddescriptions.js',
    'htmlpartials/extendpaymentmethods.js'
    ])
    .pipe(concat('gobb.js'))
    .pipe(gulp.dest('.'))
});