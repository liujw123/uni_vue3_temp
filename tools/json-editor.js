const fs = require('fs');
const { parse, modify } = require('jsonc-parser');
const path = require('path');

/**
 * 通用 JSONC 文件字段修改器（支持注释、嵌套路径）
 * @param {string} filePath - JSON 或 JSONC 文件路径
 * @param {string[]} fieldPath - 要修改的字段路径，如 ['a', 'b', 'c']
 * @param {any} newValue - 要写入的新值
 * @param {object} [options] - 可选项
 * @param {number} [options.tabSize=2] - 缩进空格数
 */
function updateJsonFileField(filePath, fieldPath, newValue, options = {}) {
    const tabSize = options.tabSize || 2;
    if (!fs.existsSync(filePath)) {
        console.warn(`[json-editor] 文件不存在: ${filePath}`);
        return;
    }
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        parse(raw); // 验证是否为合法 JSONC

        const edits = modify(raw, fieldPath, newValue, {
            formattingOptions: {
                insertSpaces: true,
                tabSize,
            },
        });
        const updated = applyEdits(raw, edits);
        fs.writeFileSync(filePath, updated, 'utf-8');
        console.log(`[json-editor] ${path.basename(filePath)} -> 修改 ${fieldPath.join('.')} = ${JSON.stringify(newValue)}`);
    } catch (err) {
        console.error(`[json-editor] 修改失败: ${err.message}`);
    }
}

/**
 * 应用 jsonc-parser 的编辑操作
 * @param {string} text
 * @param {import('jsonc-parser').Edit[]} edits
 * @returns {string}
 */
function applyEdits(text, edits) {
    edits.sort((a, b) => b.offset - a.offset);
    for (const edit of edits) {
        text = text.slice(0, edit.offset) + edit.content + text.slice(edit.offset + edit.length);
    }
    return text;
}

module.exports = {
    updateJsonFileField,
};
