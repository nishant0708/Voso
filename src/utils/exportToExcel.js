import * as XLSX from "xlsx";

// Function to export data to Excel
export const exportToExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcelFile(excelBuffer, fileName);
};

// Function to save binary string as Excel file
const saveAsExcelFile = (buffer, fileName) => {
  const data = new Blob([buffer], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
};