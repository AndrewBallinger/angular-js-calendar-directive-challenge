/* global angular CalendarRange */
angular.module('calendarDemoApp', [])
  .component('calendarView', {
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
    controller : function () {
      angular.merge(this, this.day);
      this.number = this.day; //Resolve namespace collision... Awkward, but I think the result is worth it.
    },
    controllerAs: 'day',
    bindings: {
      day: "<",
      number: "@"
    }
  })
  .directive('datePicker', function() { return {
    restrict: "A",
    require: '^^calendarView',
    link: function (scope, element, attrs, calendar) {
      scope.month = '' + calendar.date.getMonth();
      scope.year = calendar.date.getFullYear();

      scope.updateDate = () => {
        var date = new Date();
        date.setMonth(scope.month);
        date.setYear(scope.year);
        calendar.setDate(date);
      }
      scope.updateDate();
    }
  }});
