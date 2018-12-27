(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };
    __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 8);
})
({
    8:
    (function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(9);
    }),
    9:
    (function (module, exports) {

        gantt.config.day_date = "%M %d %D";
        gantt.config.default_date = "%Y %M %d";
        gantt.config.month_date = "%Y %M";
        gantt.locale = {
            date: {
                month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                day_short: ["日", "一", "二", "三", "四", "五", "六"]
            },
            labels: {
                new_task: "新任务",
                dhx_cal_today_button: "今天",
                day_tab: "日",
                week_tab: "周",
                month_tab: "月",
                new_event: "新建日程",
                icon_save: "保存",
                icon_cancel: "关闭",
                icon_details: "详细",
                icon_edit: "编辑",
                icon_delete: "删除",
                confirm_closing: "请确认是否撤销修改!",
                confirm_deleting: "是否删除日程?",
                section_description: "项目描述",
                section_person: "负责人",
                section_priority: "优先级",
                section_progress: "进度",
                section_time: "时间范围",
                section_type: "类型",
                section_order: "排序",
                column_wbs: "工作分解结构",
                column_text: "任务名",
                column_start_date: "开始时间",
                column_duration: "持续时间",
                column_add: "",
                link: "关联",
                confirm_link_deleting: "将被删除",
                link_start: " (开始)",
                link_end: " (结束)",
                type_task: "任务",
                type_project: "项目",
                type_milestone: "里程碑",
                minutes: "分钟",
                hours: "小时",
                days: "天",
                weeks: "周",
                months: "月",
                years: "年",
                message_ok: "确定",
                message_cancel: "关闭"
            }
        };
    })
});