const fs = require('fs');

const argv = process.argv;

function cat(path) {
    fs.readFile(`${path}`, 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('File contents: ', `${data}`);
    })
}

cat(argv[2]);