import XLSX from 'lay-excel/src/xlsx.js';

import FileSaver from 'file-saver';

import LAY_EXCEL from 'lay-excel';

export function exportExcel(data, filename, type, opt) {
  type = type ? type : 'xlsx';
  filename = filename ? filename : '导出数据.'+type;

  // 创建一个 XLSX 对象
  var wb = XLSX.utils.book_new();
  // 1. 定义excel对的基本属性
  var Props = {
    Title: filename,
    Subject: 'Export From web browser',
    Author: "excel.wj2015.com",
    Manager: '',
    Company: '',
    Category: '',
    Keywords: '',
    Comments: '',
    LastAuthor: '',
    CreatedData: new Date(),
  };
  opt && opt.Props && (Props = LAY_EXCEL.objectExtend(Props, opt.Props));
  // 默认进行压缩
  wb.compression = opt ? opt.compression : true
  if(wb.compression !== false) {
    wb.compression = true
  }
  wb.Props = Props;
  // 特殊属性实现，比如合并单元格
  var wbExtend = {
    '!merges': null
    ,'!margins': null
    ,'!cols': null
    ,'!rows': null
    ,'!protect': null
    ,'!autofilter': null
  };
  opt && opt.extend && (wbExtend = LAY_EXCEL.objectExtend(wbExtend, opt.extend));
  // 清理空配置
  for (var key in wbExtend) {
    if (!Object.prototype.hasOwnProperty.bind(wbExtend,key)) {
      continue;
    }
    if (!wbExtend[key]) {
      delete wbExtend[key];
    }
  }

  // 判断 data 如果是 sheet 级别数据，自动加 sheet1
  if (Array.isArray(data)) {
    data = {sheet1: data};
  }

  for(var sheet_name in data) {
    if (!Object.prototype.hasOwnProperty.bind(data,sheet_name)) {
      continue;
    }
    var content = data[sheet_name];
    // 2. 设置sheet名称
    wb.SheetNames.push(sheet_name);
    // 3. 分配工作表对象到 sheet
    var is_aoa = false;
    if (content.length && content[0] && Array.isArray(content[0])) {
      is_aoa = true;
    }
    if (is_aoa) {
      ws = XLSX.utils.aoa_to_sheet(content);
    } else {
      var option = {};
      if (content.length) {
        option.headers = content.unshift();
        option.skipHeader = true;
        // 分离并重组样式
        var splitRes = LAY_EXCEL.splitContent(content);
      }
      var ws = XLSX.utils.json_to_sheet(content, option);
      // 合并样式
      if (typeof splitRes !== 'undefined') {
        LAY_EXCEL.mergeCellOpt(ws, splitRes.style);
      }
    }
    // 特殊属性，支持单独设置某个sheet的属性
    if (wbExtend[sheet_name]) {
      LAY_EXCEL.objectExtend(ws, wbExtend[sheet_name]);
    } else {
      LAY_EXCEL.objectExtend(ws, wbExtend);
    }
    wb.Sheets[sheet_name] = ws;
  }

  var writeOpt = {bookType: type, type: 'binary', cellStyles: true, compression: wb.compression};
  if (opt && typeof opt === 'object' && typeof opt.writeOpt === 'object' && opt.writeOpt) {
    LAY_EXCEL.objectExtend(writeOpt, opt.writeOpt)
  }
  // 4. 输出工作表
  var wbout = XLSX.write(wb, writeOpt);

  console.log(wbout)

  // 5. 跨浏览器支持，采用 FileSaver 三方库
  FileSaver.saveAs(new Blob([LAY_EXCEL.s2ab(wbout)], {type: "application/octet-stream"}), filename);
}

export function ttt() {

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

    // console.log(XLSX)

    // json = XLSX.utils.aoa_to_sheet(json);

    console.log(json)
    
    var data = LAY_EXCEL.setExportCellStyle(json,{
        s: {
            fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FF0000" } },
            alignment: {
                horizontal: 'center',
                vertical: 'center'
            }
        }
    })

    console.log(data)

      
    exportExcel(data, '表格导出.xlsx', 'xlsx')
}