'use strict';

module.exports = {

    types: [
        { value: '特性', name: '特性:    一个新的特性' },
        { value: '修复', name: '修复:    修复一个Bug(Bug是缺陷的意思，小白同志)' },
        { value: '文档', name: '文档:    变更的只有文档' },
        { value: '风格', name: '风格:    更改代码风格，代码的更改不影响业务逻辑(空格, 分号, 代码审查修复等)' },
        { value: '重构', name: '重构:    代码重构，注意和特性、修复区分开' },
        { value: '性能', name: '性能:    提升性能' },
        { value: '测试', name: '测试:    添加一个测试' },
        { value: '工具', name: '工具:    开发工具变动(构建、脚手架工具等)' },
        { value: '回滚', name: '回滚:    代码回退' }
    ],

    scopes: [
        { name: '小白，这是一个scope' },
        { name: '小白，这是一个scope 2' },
        { name: '小白，这是一个scope 3' },
        { name: '小白，这是一个scope 4' }
    ],

    // it needs to match the value for field type. Eg.: 'fix'
    /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
    // override the messages, defaults are as follows
    messages: {
        type: '选择一种你的提交类型:',
        scope: '选择一个scope (可选):',
        // used if allowCustomScopes is true
        customScope: 'Denote the SCOPE of this change:',
        subject: '短说明:\n',
        body: '长说明(可选)，使用"|"换行：\n',
        breaking: '非兼容性说明 (可选):\n',
        footer: '关联关闭的issue(可选)，例如：#31, #34:\n',
        confirmCommit: '确定提交说明?'
    },

    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],

    // limit subject length
    subjectLimit: 100

};