const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

// Mean Tests
try {
    // Should Pass
    const meanOne = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }

 try {
    // Should Fail
    const meanTwo = arrayUtils.mean(1234);
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }

  // Median Squared Tests
try {
    // Should Pass
    const medianSquaredOne = arrayUtils.medianSquared([4, 1, 2]);
    const medianSquared = arrayUtils.medianSquared([1, 2, 4, 5]);
    console.log(medianSquared);
    
    console.log('median squared passed successfully');
 } catch (e) {
    console.error('median squared failed test case');
 }
 
 try {
    // Should Fail
    const medianSquaredTwo = arrayUtils.medianSquared();
    console.error('median squared did not error');
 } catch (e) {
    console.log('median squared failed successfully');
 }

  // Max Element Tests
  try {
    // Should Pass
    const maxElementOne = arrayUtils.maxElement([5, 6, 7]);
    console.log('max element passed successfully');
 } catch (e) {
    console.error('max element failed test case');
 }
 
 try {
    // Should Fail
    const maxElementTwo = arrayUtils.maxElement(5, 6, 7);
    console.error('max element did not error');
 } catch (e) {
    console.log('max element failed successfully');
 }

  // Fill Tests
  try {
    // Should Pass
    const fillOne = arrayUtils.fill(3, 'Welcome');
    console.log('fill passed successfully');
 } catch (e) {
    console.error('fill failed test case');
 }
 
 try {
    // Should Fail
    const fillTwo = arrayUtils.fill();
    console.error('fill did not error');
 } catch (e) {
    console.log('fill failed successfully');
 }

  // Count Repeating Tests
  try {
    // Should Pass
    const countRepeatingOne = arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
    console.log('count repeating passed successfully');
 } catch (e) {
    console.error('count repeating failed test case');
 }
 
 try {
    // Should Fail
    const countRepeatingTwo = arrayUtils.countRepeating();
    console.error('count repeating did not error');
 } catch (e) {
    console.log('count repeating failed successfully');
 }

  // IsEqual Tests
  try {
    // Should Pass
    const isEqualOne = arrayUtils.isEqual([1, 2, 3], [3, 1, 2]);
    console.log('is equal passed successfully');
 } catch (e) {
    console.error('is equal failed test case');
 }
 
 try {
    // Should Fail
    const isEqualTwo = arrayUtils.isEqual();
    console.error('is equal did not error');
 } catch (e) {
    console.log('is equal failed successfully');
 }

  // Camel Case Tests
  try {
    // Should Pass
    const camelCaseOne = stringUtils.camelCase('my function rocks');
    console.log('camel case passed successfully');
 } catch (e) {
    console.error('camel case failed test case');
 }
 
 try {
    // Should Fail
    const camelCaseTwo = stringUtils.camelCase();
    console.error('camel case did not error');
 } catch (e) {
    console.log('camel case failed successfully');
 }

  // Replace Char Tests
  try {
    // Should Pass
    const replaceCharOne = stringUtils.replaceChar("Daddy");
    console.log('replace char passed successfully');
 } catch (e) {
    console.error('replace char failed test case');
 }
 
 try {
    // Should Fail
    const replaceCharTwo = stringUtils.replaceChar();
    console.error('replace char did not error');
 } catch (e) {
    console.log('replace char failed successfully');
 }

  // Mash up Tests
  try {
    // Should Pass
    const mashUpOne = stringUtils.mashUp("Patrick", "Hill");
    console.log('mashUp passed successfully');
 } catch (e) {
    console.error('mashUp failed test case');
 }
 
 try {
    // Should Fail
    const mashUpTwo = stringUtils.mashUp();
    console.error('mashUp did not error');
 } catch (e) {
    console.log('mashUp failed successfully');
 }

  // Make Arrays Tests
  try {
    // Should Pass
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    const makeArraysOne = objUtils.makeArrays([first, second, third]);
    console.log('makeArrays passed successfully');
 } catch (e) {
    console.error('makeArrays failed test case');
 }
 
 try {
    // Should Fail
    const makeArraysTwo = objUtils.makeArrays();
    console.error('makeArrays did not error');
 } catch (e) {
    console.log('makeArrays failed successfully');
 }

  // isDeepEqual Tests
try {
    // Should Pass
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    const isDeepEqualOne = objUtils.isDeepEqual(forth, fifth);
    console.log('isDeepEqual passed successfully');
 } catch (e) {
    console.error('isDeepEqual failed test case');
 }
 
 try {
    // Should Fail
    const isDeepEqualTwo = objUtils.isDeepEqual();
    console.error('isDeepEqual did not error');
 } catch (e) {
    console.log('isDeepEqual failed successfully');
 }

  // computeObject Tests
try {
    // Should Pass
    const computeObjectlOne = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('computeObject passed successfully');
 } catch (e) {
    console.error('computeObject failed test case');
 }
 
 try {
    // Should Fail
    const computeObjectTwo = objUtils.computeObject({}, 123);
    console.error('computeObject did not error');
 } catch (e) {
    console.log('computeObject failed successfully');
 }
