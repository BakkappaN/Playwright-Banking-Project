const { test, expect } = require('@playwright/test');
const xlsx = require('xlsx');

/**
 * Bakkappa N
 */
export async function getExcelDataAsKeyValue(filePath, sheet) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheet];
    const data = xlsx.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
        console.error('Excel file is empty.');
        return;
    }

    const keyValuePairs = [];
    for (const row of data) {
        const keyValuePair = {};
        for (const key in row) {
            keyValuePair[key] = row[key];
        }
        keyValuePairs.push(keyValuePair);
    }
    return keyValuePairs;
}

/**
 * Bakkappa N
 */
export async function printAllRowsData(filePath, sheet) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheet];
    const data = xlsx.utils.sheet_to_json(worksheet);

    expect(data.length).toBeGreaterThan(0);
    for (const row of data) {
        for (const key in row) {
            console.log(`${key} : ` + row[key]);
        }
        console.log("=======")
    }
    // data[0].Skill1 - access using row & key 
}

