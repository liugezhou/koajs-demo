const fs = require('fs');
const walkFile = require('./walk-file');
const path = require('path')

let contentSqlMap = {}
function getSqlContentmap(){
    const fullPath = path.join(__dirname,'../sql/')
    let sqlMap = walkFile(fullPath);
    for(let key in sqlMap){
        getsqlContent(key,sqlMap[key])
    }
    return contentSqlMap;
}

function getsqlContent(fileName,path){
    let content = fs.readFileSync(path,'binary');
    contentSqlMap[fileName] = content

}
module.exports = getSqlContentmap;
