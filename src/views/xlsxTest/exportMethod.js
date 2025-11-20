import XLSX from 'lay-excel/src/xlsx.js';
import { saveAs } from 'file-saver';

import JsZip from "jszip";


function getXlsxBlob(fileName) {
  let json = [
    ["Camera"],
    [],
    ["Type:Camera"],
    ["Exporting Time:2022/02/28 16:42:11"],
    ["Searched by:hccdd2 uat6"],
    ["Total Number:7"],
    [],
    [
      "Name",
      "Device",
      "Area",
      "Version",
      "Network Status",
      "Video Signal",
      "Last Inspection",
    ],
    [
      "camera 01",
      "AE-MD5043",
      "浙A222222",
      "V5.0.1 build20210826",
      "Online",
      "Normal",
      "2022/02/28 16:40:10",
    ],
    [
      "camera 02",
      "AE-MD5043",
      "浙A222222",
      "V5.0.1 build20210826",
      "Online",
      "Normal",
      "2022/02/28 16:40:10",
    ],
    [
      "camera 03",
      "AE-MD5043",
      "浙A222222",
      "V5.0.1 build20210826",
      "Online",
      "Normal",
      "2022/02/28 16:40:10",
    ],
    [
      "DS-2CD3726G2T-IZS(E41491118)",
      "test222",
      "TEST-误删",
      "V4.32.110 build 211009",
      "Online",
      "Normal",
      "2022/02/28 16:40:10",
    ],
    [
      "fisheye1",
      "xjq_fisheye",
      "xjq_fisheye",
      "V5.5.75 build 200512",
      "Online",
      "Normal",
      "2022/02/28 16:40:10",
    ],
    [
      "G95721826",
      "xjq_sun",
      "xjq_sun",
      "V5.7.0 build 211009",
      "Online",
      "Normal",
      "2022/02/28 16:40:10",
    ],
    [
      "IPdome",
      "xjq_PTZ",
      "xjq_PTZ",
      "V5.7.1 build 210712",
      "Online",
      "Normal",
      "2022/02/28 16:40:10",
    ],
  
  ];

  console.log(XLSX);

  let table_book = XLSX.utils.aoa_to_sheet(json);

  //第一行合并
  let merges = [{
    s: {
      c: 0,
      r: 0
    },
    e: {
      c: 5,
      r: 0
    }
  }];
  table_book["!merges"] = merges;

  //设置样式test，目前未生效
  table_book["A1"].s = {									//为某个单元格设置单独样式
    font: {
      name: '宋体',
      sz: 24,
      bold: true,
      color: { rgb: "FFFFAA00" }
    },
    alignment: { horizontal: "center", vertical: "center", wrap_text: true },
    fill: { bgcolor: { rgb: 'ffff00' } }
  };

  console.log(table_book);

  let workbook = { //定义操作文档
    SheetNames: [fileName], //定义表明
    Sheets: {
      [fileName]: Object.assign({}, table_book) //表对象[注意表明]
    }
  };

  
  console.log(workbook);

  var table_write = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  // FileSaver.saveAs(
  //   new Blob([table_write], { type: 'application/octet-stream' }),
  //   `${fileName}_${moment().format("YYYYMMDDHHmmss")}.xlsx`
  // );

  return new Blob([table_write], { type: 'application/octet-stream' });
}

function saveAsZip(files, zipName) {
  let zip = new JsZip();
  files.forEach(file => {
    zip.file(file.name, file.blob);
  });
  zip.generateAsync({type: "blob"})
    .then(function(content) {
      saveAs(content, zipName);
    });
}

export {
  getXlsxBlob,
  saveAsZip,
};
