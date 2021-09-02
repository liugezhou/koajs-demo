const fs = require('fs');
const path = require('path');

/**
 * 遍历目录下的文件目录
 * @param  {string} pathResolve  需进行遍历的目录路径
 * @param  {string} mime         遍历文件的后缀名
 * @return {object}              返回遍历后的目录结果
 */
const walkFile = function(pathResolve,mime){
    const pathExists  = fs.existsSync(pathResolve);
    let filelist = {};
    if(pathExists){
        const list = fs.readdirSync(pathResolve,{
            extension:mime
        })
        list.map((item)=>{
            filelist[item] = pathResolve + item
        })
    }
    return filelist
}
module.exports = walkFile;