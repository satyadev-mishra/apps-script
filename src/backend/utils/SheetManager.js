// SheetManager class to manage Google Sheet operations with clean error and response handling
class SheetManager {
  constructor(config) {
    const { sheetName, headerRowNo = 1, spreadsheetId = '' } = config || {};
    this.headerRowNo = headerRowNo;
    const spreadsheet = spreadsheetId
      ? SpreadsheetApp.openById(spreadsheetId)
      : SpreadsheetApp.getActiveSpreadsheet();

    this.sheet = sheetName
      ? spreadsheet.getSheetByName(sheetName)
      : spreadsheet.getActiveSheet();

    if (!this.sheet) {
      throw new Error(`Sheet "${sheetName}" could not be found.`);
    }
    this.lastRow = this.sheet.getLastRow();
    this.lastColumn = this.sheet.getLastColumn();
  }

  // Get header mapping from a given row (default: row 1)
  getHeaders(headerRowNo = 1) {
    if (headerRowNo === 1) {
      headerRowNo = this.headerRowNo;
    }

    const headerRow = this.sheet
      .getRange(headerRowNo, 1, 1, this.lastColumn)
      .getValues()[0];

    const headerMap = headerRow.reduce((obj, header, index) => {
      if (typeof header === 'string' && header.length > 0) {
        obj[`${header.trim().toLowerCase()}`] = index;
      }
      return obj;
    }, {});

    return headerMap;
  }

  // Get all data from the sheet with headers as keys
  getData() {
    const header = this.getHeaders();
    if (!header || Object.keys(header).length === 0) {
      throw new Error('Header row could not be read or is empty');
    }

    const allData = [];

    if (this.lastRow < 1) return [];

    const numRows = this.lastRow - 1 || 1;

    const allRowData =
      this.sheet.getRange(2, 1, numRows, this.lastColumn).getValues() || [];

    const keywiseData = allRowData.map(row => {
      const rowData = {};
      for (const key in header) {
        rowData[key] = row[header[key]];
      }
      return rowData;
    });

    allData.push(...keywiseData);

    return allData;
  }

  // Get row number by searching for a value in a specific column
  getRowNumber(searchData = {}) {
    // Validate inputs
    if (!searchData || typeof searchData !== 'object') {
      throw new Error('search data is missing or invalid');
    }
    // Data format -> {columnName: value}
    const data = this.getData();

    const searchKey = Object.keys(searchData)[0];
    const searchValue = searchData[searchKey].toString().trim().toLowerCase();

    const findRow = data.findIndex(row => {
      const cellValue = row[searchKey];
      return (
        cellValue && cellValue.toString().trim().toLowerCase() === searchValue
      );
    });

    if (findRow === -1) {
      return 0;
    }

    return findRow + 2;
  }

  // Find the first empty row from row 2
  getLastEmptyRow() {
    const sheetData = this.sheet
      .getRange(2, 1, this.lastRow, this.lastColumn)
      .getValues();

    const rowNumber = sheetData.findIndex(row =>
      row.every(cell => cell === null || cell === '')
    );
    const result = rowNumber === -1 ? this.lastRow + 1 : rowNumber + 2;

    if (result === rowNumber + 2) {
      this.sheet.insertRowsAfter(this.lastRow, 1);
    }

    return result;
  }

  // Append data to sheet using rowData array and optional headers
  appendRowData(rowData) {
    if (!rowData || rowData.length === 0) {
      throw new Error('No data provided to append to sheet');
    }

    const headers = this.getHeaders();
    const headersKey = Object.keys(headers);

    const newRows = [];

    for (let i = 0; i < rowData.length; i++) {
      const tempRow = [];
      for (let j = 0; j < headersKey.length; j++) {
        const headerName = headersKey[j];
        const colIndex = headers[headerName];
        tempRow[colIndex] = rowData[i][headerName] || '';
      }
      newRows.push(tempRow);
    }

    const startRow = this.getLastEmptyRow();

    this.sheet
      .getRange(startRow, 1, newRows.length, headersKey.length)
      .setValues(newRows);
    return true;
  }

  // Update cell in target row after the seleceted column respectively
  updateTargetRow(rowNumber, columns = []) {
    if (typeof rowNumber !== 'number' || rowNumber < 1) return true;
    if (!columns || !Array.isArray(columns) || columns.length === 0) {
      columns.push({ key: 'updatedAt', value: 'timestamp' });
    }

    const headers = this.getHeaders();
    const timestamp = new Date();

    for (let column of columns) {
      const columnName = column.key || '';
      let cellValue = column.value || '';

      if (cellValue.toString().trim().toLowerCase() === 'timestamp') {
        cellValue = timestamp;
      }
      const columnNumber = headers[columnName] + 1;

      const range = this.sheet.getRange(rowNumber, columnNumber);
      range.setValue(cellValue);
    }

    return true;
  }

  // Delete a specific row from the sheet
  deleteRow(row) {
    if (typeof row !== 'number' || row < 2) return true;
    return this.sheet.deleteRow(row);
  }

  getTargetRowData(targetRowNo) {
    const headerMap = this.getHeaders();
    const targetRowData = this.sheet
      .getRange(targetRowNo, 1, 1, this.sheet.getLastColumn())
      .getValues();

    const rowData = {};
    Object.keys(headerMap.data).forEach(header => {
      rowData[header] = targetRowData[0][headerMap.data[header]];
    });
    return rowData;
  }

  getTargetColumnData(columnNo) {
    return this.sheet
      .getRange(this.headerRowNo + 1, columnNo, this.sheet.getLastRow(), 1)
      .getValues()
      .flat();
  }

  //  Get the refrence of target cell
  getCell(rowNo, columnNo) {
    return this.sheet.getRange(rowNo, columnNo);
  }

  //  Get the refrence of target row
  getTargetRowRange(rowNo) {
    return this.sheet.getRange(rowNo, 1, 1, this.sheet.getLastColumn());
  }
}
