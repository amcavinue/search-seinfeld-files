var fs = require('fs');
var files = fs.readdirSync('seinfeld-files');
var data = [];

function inspectFile(contents) {
    if (contents.indexOf('<iframe') != -1) {
        data.push(['abc', 'def']);
    }
}

function buildHtml() {
    return  '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<head>' +
                '<meta charset="UTF-8">' +
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                '<title>Seinfeld Episode links</title>' + 
            '</head>' +
            '<body>' +
            '<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>' +
            '</body>' +
            '</html>';
}

files.forEach(function(file) { 
    inspectFile(fs.readFileSync('seinfeld-files/' + file));
});

console.log(data);

fs.writeFile("test.html", buildHtml(), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
