var fs = require('fs');

/* Search through files: https://stackoverflow.com/questions/6959462/in-node-js-reading-a-directory-of-html-files-and-searching-for-element-attribu */

function inspectFile(contents) {
    if (contents.indexOf('<iframe') != -1) {
        console.log('found');
    }
}

var files = fs.readdirSync('seinfeld-files');

files.forEach(function(file) { 
    inspectFile(fs.readFileSync('seinfeld-files/' + file));
});

fs.writeFile("test.txt", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
