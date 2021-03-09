/* 
> ASIDE: Come to think of it, iterating over a collection, 
performing a > transformation and emitting a new collection 
where every element has been > transformed sounds an awful lot like map to us.
*/

/*
> ASIDE: Come to think of it, iterating over a collection, 
performing an > evaluation on each element and emitting a new value 
based on those elements > sounds an awful lot like reduce to us.
*/

const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = (employees) => {
  return employees.map((employee) => {
    return createEmployeeRecord(employee);
  });
};

const createTimeInEvent = (employee, timeStamp) => {
  let [date, hour] = timeStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: +hour,
  });
  return employee;
};

const createTimeOutEvent = (employee, timeStamp) => {
  let [date, hour] = timeStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: +hour,
  });
  return employee;
};

const hoursWorkedOnDate = (employee, dayInQuestion) => {
  let clockIn = employee.timeInEvents.find((day) => day.date === dayInQuestion);
  let clockOut = employee.timeOutEvents.find(
    (day) => day.date === dayInQuestion
  );

  return Math.abs((clockOut.hour - clockIn.hour) / 100);
};

const wagesEarnedOnDate = (employee, dayInQuestion) => {
  let time = hoursWorkedOnDate(employee, dayInQuestion);

  return time * employee.payPerHour;
};

const allWagesFor = (employee) => {
  let daysWorked = employee.timeInEvents.map((day) => {
    return day.date;
  });
  let paycheck = daysWorked.reduce((accumulator, day) => {
    return (accumulator += wagesEarnedOnDate(employee, day));
  }, 0);
  return paycheck;
};

const findEmployeeByFirstName = (employees, name) =>
  employees.find((employee) => employee.firstName === name);

const calculatePayroll = (employees) =>
  employees.reduce((accumulator, employee) => {
    return accumulator + allWagesFor(employee);
  }, 0);


// const csvDataEmployees = [
//   ["Thor", "Odinsson", "Electrical Engineer", 45],
//   ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//   ["Natalia", "Romanov", "CEO", 150],
//   ["Darcey", "Lewis", "Intern", 15],
//   ["Jarvis", "Stark", "CIO", 125],
//   ["Anthony", "Stark", "Angel Investor", 300],
// ];

// const csvTimesIn = [
//   ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
//   ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
//   ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
//   ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
//   ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
//   ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]],
// ];

// const csvTimesOut = [
//   ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
//   ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
//   ["Natalia", ["2018-01-01 2300", "2018-01-02 2300", "2018-01-03 2300"]],
//   ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
//   ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
//   ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]],
// ];

// let employeeRecords = createEmployeeRecords(csvDataEmployees);
// employeeRecords.forEach(function (rec) {
//   let timesInRecordRow = csvTimesIn.find(function (row) {
//     return rec.firstName === row[0];
//   });

//   let timesOutRecordRow = csvTimesOut.find(function (row) {
//     return rec.firstName === row[0];
//   });

//   timesInRecordRow[1].forEach(function (timeInStamp) {
//     createTimeInEvent(rec, timeInStamp);
//   });

//   timesOutRecordRow[1].forEach(function (timeOutStamp) {
//     createTimeOutEvent(rec, timeOutStamp);
//   });
// });

// console.log(employeeRecords);
// console.log(calculatePayroll(employeeRecords));
