"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amdtoes6_1 = require("./amdtoes6");
const commander = require("commander");
const fs = require("fs");
const glob = require("glob");
const mkdirp = require("mkdirp");
const path = require("path");
commander
    .option('-d --dir <dirname>', 'Use this option to specify a directory to compile.')
    .option('-o --out <dirname>', 'If using the --dir option this specifies the output directory.')
    .option('-i --ignore <glob>', 'If using the --dir options this specifies to exclude eg. libs/**/*', (value, memo) => {
    memo.push(value);
    return memo;
}, [])
    .option('-g --glob [glob]', 'If using the --dir option, optionally specify the glob pattern to match for input files', '**/*.js')
    .option('-b --beautify', 'Run the output through jsbeautify (mainly useful for fixing indentation)', false)
    .option('-I --indent [size]', 'Sets the indent size for jsbeautify', 2)
    .option('-s --star', 'Import entire modules content', false)
    .parse(process.argv);
if (commander.dir && !commander.out) {
    console.error('If using the --dir option you must also specify the --out option.');
    process.exit(1);
}
if (commander.dir && commander.args.length) {
    console.error('Positional arguments are not allowed if using the --dir option.');
    process.exit(1);
}
if (!commander.dir && !commander.args.length) {
    console.error('No files provided.');
    process.exit(1);
}
let inputFiles = commander.args;
if (commander.dir) {
    inputFiles = glob.sync(commander.glob, {
        cwd: commander.dir
    });
    if (commander.ignore.length) {
        const ignoreFiles = commander.ignore
            .map((pattern) => {
            return glob.sync(pattern, {
                cwd: commander.dir
            });
        })
            .reduce((memo, files) => {
            return memo.concat(files);
        }, []);
        inputFiles = inputFiles.filter(f => {
            return ignoreFiles.indexOf(f) === -1;
        });
    }
}
inputFiles.forEach(srcFile => {
    const filePath = commander.dir ? path.join(commander.dir, srcFile) : srcFile;
    const context = fs.readFileSync(filePath, 'utf8');
    var compiled;
    try {
        compiled = amdtoes6_1.convert(context, {
            beautify: commander.beautify,
            indent: commander.indent,
            star: commander.star
        });
    }
    catch (e) {
        console.error('Unable to compile ' + filePath + '.\n  Error:  ' + e.message + '\n');
        return;
    }
    if (commander.dir) {
        const outdir = path.dirname(path.join(commander.out, srcFile));
        mkdirp.sync(outdir);
        fs.writeFileSync(path.join(commander.out, srcFile), compiled);
        console.log('Successfully compiled', filePath, 'to', path.join(commander.out, srcFile));
    }
    else {
        console.log(compiled);
    }
});
