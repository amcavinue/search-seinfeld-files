var fs = require('fs');

fs.readdir('seinfeld-files', function(err, files) {
    files.forEach(function(file) { 
        fs.readFile('seinfeld-files/' + file, function(err, contents) { 
            inspectFile(contents); 
        });
    });
});

function inspectFile(contents) {
    if (contents.indexOf('<iframe') != -1) {
        console.log('found');
    }
}
