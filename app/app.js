/* global angular CalendarRange */
angular.module('calendarDemoApp', [])
  .component('calendar', {
    templateUrl: 'calendar-template.html',
    controller : function () {
      var calendar = this;

      calendar.date = new Date();
      angular.merge(calendar, CalendarRange.getMonthlyRange(calendar.date));

      calendar.days = calendar.days.map( (d) => {
        d.inactive = (d.date < calendar.start || d.date > calendar.end); return d
      });

      calendar.setDate = (new_date) => {
        calendar.days = [];
        calendar.date = new_date;
        angular.merge(calendar, CalendarRange.getMonthlyRange(new_date));
        calendar.days = calendar.days.map( (d) => {
          d.inactive = (d.date < calendar.start || d.date > calendar.end); return d
        });
        }
      },
    controllerAs: 'calendar',
    transclude: true,
    bindings: { days: "@", date: "&", setDate: "&" }
  })
  .component('day', {
    templateUrl: 'day-template.html',
    controllerAs: 'day',
    bindings: {
      inactive: "<",
      number: "<"
    }
  })
  .directive('datePicker', function() { return {
    restrict: "A",
    scope: true,
    require: '^^calendar',
    link: function (scope, element, attrs, calendar) {
      scope.month = '' + calendar.date.getMonth();
      scope.year = calendar.date.getFullYear();

      scope.updateMonth = (month) => {
        var date = calendar.date;
        date.setMonth(month);
        calendar.setDate(date);
      }

      scope.updateYear = (year) => {
        var date = calendar.date;
        date.setYear(year);
        calendar.setDate(date);
      }
    }
  }});
