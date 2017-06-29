var fs = require('fs');
var cheerio = require('cheerio');

var files = fs.readdirSync('seinfeld-files');
var data = [];

function inspectFile(contents) {
    var $ = cheerio.load(contents);
    var regex = new RegExp(/season \d+ - episode \d+/gi);
    var regexNum = new RegExp(/(\d+)/gi);
    var fileData = [];
    
    if ($('body').find('iframe').attr('src')) {
        fileData.push($('body').find('iframe').attr('src'));
    }
    
    $('body').find('b').filter(function() {
        if (regex.test($(this).text())) {
            fileData.push($(this).text());
            
            // Extract the season and episode numbers.
            var results;
            while((results = regexNum.exec($(this).text())) !== null) {
                fileData.push(Number(results[0]));
            }
        }
    });
    
    // Only include elements that have complete data.
    if (fileData.length === 4) {
        data.push(fileData);
    }
}

function sortData() {
    data.sort(function(a, b) {
        var valueA = a[2];
        var valueB = b[2];
        
        // If the same season, check episode number.
        if (valueA === valueB) {
            valueA = a[3];
            valueB = b[3];
        }
        
        if (valueA < valueB) {
            return -1;
        }
        else if (valueA > valueB) {
            return 1;
        }
        return 0;
    });
}

function buildHtml() {
    var episodes = '';
    
    data.forEach(function(el, i) {
        episodes += '<li><h2>' + el[1] + '</h2><a href="' + el[0] + '">Link</a></li>';
    });
    
    return  '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<head>' +
                '<meta charset="UTF-8">' +
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                '<title>Seinfeld Episode links</title>' + 
            '</head>' +
            '<body>' +
                '<ul>' + episodes + '</ul>' +
            '<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>' +
            '</body>' +
            '</html>';
}

files.forEach(function(file) { 
    inspectFile(fs.readFileSync('seinfeld-files/' + file));
});

sortData();
console.log(data);

fs.writeFile("seinfeld.html", buildHtml(), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
