(function () {
  var humandate = {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    getHumanMonth: function getHumanMonth(index) {
      var monthNumber, date

      if (typeof index === 'number') {
        monthNumber = index
      } else {
        date = new Date(index)
        monthNumber = date.getMonth() + 1
      }

      return humandate.months[monthNumber - 1]
    },
    getHumanTime: function getHumanTime(input) {
      var seconds, time, suffix, then, date, now
      var output = []

      function append(amount, string) {
        output.push(amount + " " + string + (amount > 1 ? "s" : ""))
      }

      if (typeof input === 'number') {
        seconds = input
      } else {
        date = new Date(input)
        then = date.getTime()
        now = new Date().getTime()
        seconds = (now - then) / 1000 * -1
      }

      suffix = seconds < 0 ? "ago" : "from now"
      seconds = Math.abs(seconds)

      time = {
        seconds: Math.floor((((seconds % 31536000) % 86400) % 3600) % 60),
        minutes:  Math.floor((((seconds % 31536000) % 86400) % 3600) / 60),
        hours: Math.floor(((seconds % 31536000) % 86400) / 3600),
        days: Math.floor((seconds % 31536000) / 86400),
        years: Math.floor(seconds / 31536000),
        suffix: suffix
      }

      if (time.years) append(time.years, "year")
      if (time.days) append(time.days, "day")
      if (time.hours) append(time.hours, "hour")
      if (time.minutes) append(time.minutes, "minute")
      if (time.seconds) append(time.seconds, "second")

      return output.join(', ') + " " + time.suffix
    },
    getHumanDate: function getHumanDate(input) {
      var monthName, humanDate, year, day

      input = new Date(input)
      monthName = this.getHumanMonth(input.getMonth() + 1)
      day = input.getDate()

      if (day > 3 && day < 21) {
        humanDate = day + "th"
      } else {
        switch (day % 10) {
          case 1:
            humanDate = day + "st"
            break
          case 2:
            humanDate = day + "nd"
            break
          case 3:
            humanDate = day + "rd"
            break
          default:
            humanDate = day + "th"
            break
        }
      }

      return monthName + " " + humanDate + ", " + input.getFullYear()
    },
    getStartOfDay: function getStartOfDay(input) {
      var date = new Date(input)
      date.setHours(0, 0, 0, 0)
      return date
    },
    getStartOfWeek: function getStartOfWeek(input) {
      var date = new Date(input)
      if (date.getDay()) {
        date.setHours(-Math.abs(date.getDay() - 1) * 24, 0, 0, 0)
      } else {
        date.setHours(-6 * 24, 0, 0, 0)
      }
      return date
    },
    getStartOfMonth: function getStartOfMonth(input) {
      var date = new Date(input)
      if (date.getDate()) {
        date.setHours(-Math.abs(date.getDate() - 1) * 24, 0, 0, 0)
      } else {
        date.setHours(0, 0, 0, 0)
      }
      return date
    },
    getStartOfYear: function getStartOfYear(input) {
      var date = new Date(input)
      date.setMonth(0, 1)
      date.setHours(0, 0, 0, 0)
      return date
    },
    getDayOfYear: function getDayOfYear(input) {
      var date = new Date(input)
      var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      var month = date.getMonth();
      var day = date.getDate();
      var dayOfYear = dayCount[month] + day;
      if(month > 1 && this.isLeapYear()) dayOfYear++;
      return dayOfYear;
    },
    isLeapYear: function isLeapYear(input) {
      var date = new Date(input)
      var year = date.getFullYear();
      if((year & 3) !== 0) return false;
      return ((year % 100) !== 0 || (year % 400) === 0);
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    return module.exports = humandate
  } else if (typeof define === 'function' && define.amd) {
    return define([], function() {
      return humandate
    })
  } else {
    this.humandate = humandate
  }
}())
