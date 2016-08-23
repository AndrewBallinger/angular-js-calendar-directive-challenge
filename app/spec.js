/*global describe beforeEach inject it inspect expect*/
describe('calendar', function() {
  var scope, element, compiled, html, control;

  beforeEach(module('calendarDemoApp'));
  beforeEach(module('calendar-template.html'));
  beforeEach(module('day-template.html'));

  beforeEach(inject(function($rootScope, $compile) {
    control = "<input date-picker type=number ng-model='year' ng-change='updateYear(year)'></input>";

    html="<calendar>" + control + "</calendar>"

    scope = $rootScope.$new();
    compiled = $compile(html);
    element = compiled(scope);
    scope.$digest();
    
  }));

  it('should render!', function() {
    expect(element.find('day')).toBeTruthy();
    expect(element.find('input[date-picker]')).toBeTruthy();
    expect(element.find('.day-number')).toBeTruthy();
  });

  it('should change the date', function() {
    var calendar = element.controller('calendar');
    var date = new Date();
    date.setYear(317);

    var days = calendar.days;
    calendar.setDate(date);
    expect(days).toNotBe(calendar.days);
  });

  it('should have a date picker', function() {
    var calendar = element.controller('calendar');
    
    var picker = element.find('input[date-picker]').scope();
    expect(angular.isFunction(picker.updateMonth)).toBe(true);
    expect(angular.isFunction(picker.updateYear)).toBe(true);

    var days = calendar.days;
    picker.updateYear(317);
    picker.updateMonth(0);
    expect(days).toNotBe(calendar.days);

    days = calendar.days;
    picker.updateMonth(1);
    expect(days).toNotBe(calendar.days);
  });


});
