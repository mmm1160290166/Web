(function ($) {
    var resultsName = "";
    var inputElement;
    var displayElement;
    $.fn.extend({
        cronGen: function () {
            var cronContainer = $("<div/>", { id: "CronContainer", style: "display:none;width:300px;height:300px;" });
            var mainDiv = $("<div/>", { id: "CronGenMainDiv", style: "width:480px;height:230px;" });
            var topMenu = $("<ul/>", { "class": "nav nav-tabs", id: "CronGenTabs" });
            $('<li/>', { 'class': 'active' }).html($('<a id="MinutesTab" href="#Minutes">分钟</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="HourlyTab" href="#Hourly">小时</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="DailyTab" href="#Daily">日</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="WeeklyTab" href="#Weekly">周</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="MonthlyTab" href="#Monthly">月</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="YearlyTab" href="#Yearly">年</a>')).appendTo(topMenu);
            $(topMenu).appendTo(mainDiv);
            var container = $("<div/>", { "class": "container-fluid", "style": "margin-top: 10px" });
            var row = $("<div/>", { "class": "row-fluid" });
            var span12 = $("<div/>", { "class": "span12" });
            var tabContent = $("<div/>", { "class": "tab-content" });
            var minutesTab = $("<div/>", { "class": "tab-pane active", id: "Minutes" });
            var minuteOption1 = $("<div/>", { "class": "well well-small" });
            $(minuteOption1).append("&nbsp;每&nbsp;");
            $("<input/>", { id: "MinutesInput", type: "number", min: "1", max: "59", value: "1", style: "width: 60px" }).appendTo(minuteOption1);
            $(minuteOption1).append("&nbsp;分钟");
            $(minuteOption1).appendTo(minutesTab);
            $(minutesTab).appendTo(tabContent);
            var hourlyTab = $("<div/>", { "class": "tab-pane", id: "Hourly" });
            var hourlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", id: "HourlyRadio_1", name: "HourlyRadio", "class": "magic-radio", checked: "checked" }).appendTo(hourlyOption1);
            $(hourlyOption1).append("<label for=\"HourlyRadio_1\"></label>");
            $(hourlyOption1).append("&nbsp;每&nbsp;");
            $("<input/>", { id: "HoursInput", type: "number", min: "1", max: "23", value: "1", style: "width: 60px" }).appendTo(hourlyOption1);
            $(hourlyOption1).append("&nbsp;小时");
            $(hourlyOption1).appendTo(hourlyTab);
            var hourlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", id: "HourlyRadio_2", name: "HourlyRadio", "class": "magic-radio" }).appendTo(hourlyOption2);
            $(hourlyOption2).append("<label for=\"HourlyRadio_2\"></label>");
            $(hourlyOption2).append("&nbsp;在&nbsp;");
            $(hourlyOption2).append('<select id="AtHours" class="hours mysel" style="width: 60px"></select>');
            $(hourlyOption2).append("&nbsp;:&nbsp;");
            $(hourlyOption2).append('<select id="AtMinutes" class="minutes mysel" style="width: 60px"></select>');
            $(hourlyOption2).appendTo(hourlyTab);
            $(hourlyTab).appendTo(tabContent);
            var dailyTab = $("<div/>", { "class": "tab-pane", id: "Daily" });
            var dailyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", id: "DailyRadio_1", name: "DailyRadio", "class": "magic-radio", checked: "checked" }).appendTo(dailyOption1);
            $(dailyOption1).append("<label for=\"DailyRadio_1\"></label>");
            $(dailyOption1).append("&nbsp;每&nbsp;");
            $("<input/>", { id: "DaysInput", type: "number", min: "1", max: "99", value: "1", style: "width: 60px" }).appendTo(dailyOption1);
            $(dailyOption1).append("&nbsp;天");
            $(dailyOption1).appendTo(dailyTab);
            var dailyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", id: "DailyRadio_2", name: "DailyRadio", "class": "magic-radio" }).appendTo(dailyOption2);
            $(dailyOption2).append("<label for=\"DailyRadio_2\"></label>");
            $(dailyOption2).append("&nbsp;每个工作日&nbsp;");
            $(dailyOption2).appendTo(dailyTab);
            $(dailyTab).append("触发时间&nbsp;");
            $(dailyTab).append('<select id="DailyHours" class="hours mysel" style="width: 60px"></select>');
            $(dailyTab).append("&nbsp;:&nbsp;");
            $(dailyTab).append('<select id="DailyMinutes" class="minutes mysel" style="width: 60px"></select>');
            $(dailyTab).appendTo(tabContent);
            var weeklyTab = $("<div/>", { "class": "tab-pane", id: "Weekly" });
            var weeklyWell = $("<div/>", { "class": "well well-small" });
            $("<input/>", { id: "chk_1", "class": "magic-checkbox", type: "checkbox", value: "MON" }).appendTo(weeklyWell);
            $(weeklyWell).append("<label for=\"chk_1\">星期一</label>");
            $("<input/>", { id: "chk_2", "class": "magic-checkbox", type: "checkbox", value: "TUE" }).appendTo(weeklyWell);
            $(weeklyWell).append("<label for=\"chk_2\">星期二</label>");
            $("<input/>", { id: "chk_3", "class": "magic-checkbox", type: "checkbox", value: "WED" }).appendTo(weeklyWell);
            $(weeklyWell).append("<label for=\"chk_3\">星期三</label>");
            $("<input/>", { id: "chk_4", "class": "magic-checkbox", type: "checkbox", value: "THU" }).appendTo(weeklyWell);
            $(weeklyWell).append("<label for=\"chk_4\">星期四</label>");
            $("<input/>", { id: "chk_5", "class": "magic-checkbox", type: "checkbox", value: "FRI" }).appendTo(weeklyWell);
            $(weeklyWell).append("<label for=\"chk_5\">星期五</label>");
            $("<input/>", { id: "chk_6", "class": "magic-checkbox", type: "checkbox", value: "SAT" }).appendTo(weeklyWell);
            $(weeklyWell).append("<label for=\"chk_6\">星期六</label>");
            $("<input/>", { id: "chk_7", "class": "magic-checkbox", type: "checkbox", value: "SUN" }).appendTo(weeklyWell);
            $(weeklyWell).append("<label for=\"chk_7\">星期天</label>");
            $(weeklyWell).appendTo(weeklyTab);
            $(weeklyTab).append("触发时间&nbsp;");
            $(weeklyTab).append('<select id="WeeklyHours" class="hours mysel" style="width: 60px"></select>');
            $(weeklyTab).append("&nbsp;:&nbsp;");
            $(weeklyTab).append('<select id="WeeklyMinutes" class="minutes mysel" style="width: 60px"></select>');
            $(weeklyTab).appendTo(tabContent);
            var monthlyTab = $("<div/>", { "class": "tab-pane", id: "Monthly" });
            var monthlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", id: "MonthlyRadio_1", name: "MonthlyRadio", "class": "magic-radio", checked: "checked" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("<label for=\"MonthlyRadio_1\"></label>");
            $(monthlyOption1).append("&nbsp;每&nbsp;");
            $("<input/>", { id: "MonthInput", type: "number", min: "1", max: "99", value: "1", style: "width: 60px" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("&nbsp;个月的第&nbsp;");
            $("<input/>", { id: "DayOfMOnthInput", type: "number", min: "1", max: "31", value: "1", style: "width: 80px" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("&nbsp;天&nbsp");
            $(monthlyOption1).appendTo(monthlyTab);
            var monthlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", id: "MonthlyRadio_2", name: "MonthlyRadio", "class": "magic-radio" }).appendTo(monthlyOption2);
            $(monthlyOption2).append("<label for=\"MonthlyRadio_2\"></label>");
            $(monthlyOption2).append("&nbsp;每&nbsp;");
            $("<input/>", { id: "EveryMonthInput", type: "number", min: "1", max: "99", value: "1", style: "width: 60px" }).appendTo(monthlyOption2);
            $(monthlyOption2).append("&nbsp;个月的第&nbsp;");
            $(monthlyOption2).append('<select id="WeekDay" class="day-order-in-month mysel" style="width: 80px"></select>');
            $(monthlyOption2).append("&nbsp;的&nbsp;");
            $(monthlyOption2).append('<select id="DayInWeekOrder" class="week-days mysel" style="width: 80px"></select>');
            $(monthlyOption2).appendTo(monthlyTab);
            $(monthlyTab).append("触发时间&nbsp;");
            $(monthlyTab).append('<select id="MonthlyHours" class="hours mysel" style="width: 60px"></select>');
            $(monthlyTab).append("&nbsp;:&nbsp;");
            $(monthlyTab).append('<select id="MonthlyMinutes" class="minutes mysel" style="width: 60px"></select>');
            $(monthlyTab).appendTo(tabContent);
            var yearlyTab = $("<div/>", { "class": "tab-pane", id: "Yearly" });
            var yearlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", id: "YearlyRadio_1", name: "YearlyRadio", "class": "magic-radio", checked: "checked" }).appendTo(yearlyOption1);
            $(yearlyOption1).append("<label for=\"YearlyRadio_1\"></label>");
            $(yearlyOption1).append("&nbsp;在&nbsp");
            $(yearlyOption1).append('<select id="MonthsOfYear" class="months mysel" style="width: 80px"></select>');
            $(yearlyOption1).append("&nbsp;第&nbsp;");
            $("<input/>", { id: "YearInput", type: "number", min: "1", max: "31", value: "1", style: "width: 80px" }).appendTo(yearlyOption1);
            $(yearlyOption1).append("&nbsp;天");
            $(yearlyOption1).appendTo(yearlyTab);
            var yearlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", id: "YearlyRadio_2", name: "YearlyRadio", "class": "magic-radio" }).appendTo(yearlyOption2);
            $(yearlyOption2).append("<label for=\"YearlyRadio_2\"></label>");
            $(yearlyOption2).append("&nbsp;在&nbsp;");
            $(yearlyOption2).append('<select id="MonthsOfYear2" class="months mysel" style="width: 80px"></select>');
            $(yearlyOption2).append("&nbsp;第&nbsp;");
            $(yearlyOption2).append('<select id="DayOrderInYear" class="day-order-in-month mysel" style="width: 80px"></select>');
            $(yearlyOption2).append("&nbsp;的&nbsp;");
            $(yearlyOption2).append('<select id="DayWeekForYear" class="week-days mysel" style="width: 80px"></select>');
            $(yearlyOption2).appendTo(yearlyTab);
            $(yearlyTab).append("触发时间&nbsp;");
            $(yearlyTab).append('<select id="YearlyHours" class="hours mysel" style="width: 60px"></select>');
            $(yearlyTab).append("&nbsp;:&nbsp;");
            $(yearlyTab).append('<select id="YearlyMinutes" class="minutes mysel" style="width: 60px"></select>');
            $(yearlyTab).appendTo(tabContent);
            $(tabContent).appendTo(span12);
            resultsName = $(this).prop("id");
            $(this).prop("name", resultsName);
            $(span12).appendTo(row);
            $(row).appendTo(container);
            $(container).appendTo(mainDiv);
            $(cronContainer).append(mainDiv);
            var that = $(this);
            that.hide();
            var $i = $("<input>", { type: 'text', placeholder: 'Cron trigger', readonly: 'readonly' }).addClass("form-control").val($(that).val());
            $(this).before($i);
            inputElement = that;
            displayElement = $i;
            $i.popover({
                html: true,
                content: function () {
                    return $(cronContainer).html();
                },
                template: '<div class="popover" style="max-width:500px !important; width:500px"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
                placement: 'bottom'
            }).on('click', function (e) {
                e.preventDefault();
                fillDataOfMinutesAndHoursSelectOptions();
                fillDayWeekInMonth();
                fillInWeekDays();
                fillInMonths();
                $('#CronGenTabs a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                });
                $("#CronGenMainDiv select, #CronGenMainDiv input").change(function (e) {
                    generate();
                });
            });
            return;
        }
    });
    var fillInMonths = function () {
        var days = [
            { text: "一月", val: "1" },
            { text: "二月", val: "2" },
            { text: "三月", val: "3" },
            { text: "四月", val: "4" },
            { text: "五月", val: "5" },
            { text: "六月", val: "6" },
            { text: "七月", val: "7" },
            { text: "八月", val: "8" },
            { text: "九月", val: "9" },
            { text: "十月", val: "10" },
            { text: "十一月", val: "11" },
            { text: "十二月", val: "12" }
        ];
        $(".months").each(function () {
            fillOptions(this, days);
        });
    };
    var fillOptions = function (elements, options) {
        for (var i = 0; i < options.length; i++)
            $(elements).append("<option value='" + options[i].val + "'>" + options[i].text + "</option>");
    };
    var fillDataOfMinutesAndHoursSelectOptions = function () {
        for (var i = 0; i < 60; i++) {
            if (i < 24) {
                $(".hours").each(function () { $(this).append(timeSelectOption(i)); });
            }
            $(".minutes").each(function () { $(this).append(timeSelectOption(i)); });
        }
    };
    var fillInWeekDays = function () {
        var days = [
            { text: "星期一", val: "MON" },
            { text: "星期二", val: "TUE" },
            { text: "星期三", val: "WED" },
            { text: "星期四", val: "THU" },
            { text: "星期五", val: "FRI" },
            { text: "星期六", val: "SAT" },
            { text: "星期天", val: "SUN" }
        ];
        $(".week-days").each(function () {
            fillOptions(this, days);
        });
    };
    var fillDayWeekInMonth = function () {
        var days = [
            { text: "一周", val: "1" },
            { text: "二周", val: "2" },
            { text: "三周", val: "3" },
            { text: "四周", val: "4" }
        ];
        $(".day-order-in-month").each(function () {
            fillOptions(this, days);
        });
    };
    var displayTimeUnit = function (unit) {
        if (unit.toString().length == 1)
            return "0" + unit;
        return unit;
    };
    var timeSelectOption = function (i) {
        return "<option value='" + i + "'>" + displayTimeUnit(i) + "</option>";
    };
    var generate = function () {
        var activeTab = $("ul#CronGenTabs li.active a").prop("id");
        var results = "";
        switch (activeTab) {
            case "MinutesTab":
                results = "0 0/" + $("#MinutesInput").val() + " * 1/1 * ? *";
                break;
            case "HourlyTab":
                switch ($("input:radio[name=HourlyRadio]:checked").val()) {
                    case "1":
                        results = "0 0 0/" + $("#HoursInput").val() + " 1/1 * ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#AtMinutes").val()) + " " + Number($("#AtHours").val()) + " 1/1 * ? *";
                        break;
                }
                break;
            case "DailyTab":
                switch ($("input:radio[name=DailyRadio]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#DailyMinutes").val()) + " " + Number($("#DailyHours").val()) + " 1/" + $("#DaysInput").val() + " * ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#DailyMinutes").val()) + " " + Number($("#DailyHours").val()) + " ? * MON-FRI *";
                        break;
                }
                break;
            case "WeeklyTab":
                var selectedDays = "";
                $("#Weekly input:checkbox:checked").each(function () { selectedDays += $(this).val() + ","; });
                if (selectedDays.length > 0)
                    selectedDays = selectedDays.substr(0, selectedDays.length - 1);
                results = "0 " + Number($("#WeeklyMinutes").val()) + " " + Number($("#WeeklyHours").val()) + " ? * " + selectedDays + " *";
                break;
            case "MonthlyTab":
                switch ($("input:radio[name=MonthlyRadio]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#MonthlyMinutes").val()) + " " + Number($("#MonthlyHours").val()) + " " + $("#DayOfMOnthInput").val() + " 1/" + $("#MonthInput").val() + " ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#MonthlyMinutes").val()) + " " + Number($("#MonthlyHours").val()) + " ? 1/" + Number($("#EveryMonthInput").val()) + " " + $("#DayInWeekOrder").val() + "#" + $("#WeekDay").val() + " *";
                        break;
                }
                break;
            case "YearlyTab":
                switch ($("input:radio[name=YearlyRadio]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#YearlyMinutes").val()) + " " + Number($("#YearlyHours").val()) + " " + $("#YearInput").val() + " " + $("#MonthsOfYear").val() + " ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#YearlyMinutes").val()) + " " + Number($("#YearlyHours").val()) + " ? " + $("#MonthsOfYear2").val() + " " + $("#DayWeekForYear").val() + "#" + $("#DayOrderInYear").val() + " *";
                        break;
                }
                break;
        }
        inputElement.val(results).change();
        displayElement.val(results);
    };
})(jQuery);

