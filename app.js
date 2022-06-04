const csvjson = require('csvjson');
const csv = require('csvtojson');
const fs = require("fs");
const writeFile = require("fs").writeFile;

module.exports = async () => {

    let csvArray = await csv({ delimiter: '|' }).fromFile('data/document');
    csvArray.forEach((e, i) => {
        let key = Object.keys(e)
        let discriptionIndex = key[0].split('|').findIndex(f => f == 'Description')
        console.log(discriptionIndex);
        let value = Object.values(e)[0].split('|')
        let finalValue = ''
        let finalKeys = ''
        if ((value && value[discriptionIndex] && value[discriptionIndex].toString().indexOf('FEE CHG')) || (value && value[discriptionIndex] && value[discriptionIndex].toString().indexOf('AEPS'))) {
            finalValue = value[discriptionIndex].toString().indexOf('FEE CHG') ? value.join('|') + '|FEE CHG|' + value[discriptionIndex].split('/')[0] : value.join('|') + '|AEPS|' + value[discriptionIndex].split('/')[0]
        } else {
            finalValue = value.join('|') + '||' + (value && value[discriptionIndex]) ? value[discriptionIndex]?.split('/')[0] : ''

        }
        finalKeys = key[0] + '|flag|Description'
        if (finalKeys)
            finalKeys = finalKeys.split('|').join(',')
        if (finalValue) {
            finalValue = finalValue.split(',').join('$')
            finalValue = finalValue.split('|').join(',')
            finalValue = finalValue.split('$').join('|')
        }
        csvArray[i][finalKeys] = finalValue
        delete csvArray[i][key[0]]


    })
    const option = { headers: "key" }
    const csvData = csvjson.toCSV(csvArray, option);
    writeFile("./finalData.csv", csvData,
        err => {
            if (err) {
                console.log(err);
            }
            console.log("Success!");
        }
    );
}