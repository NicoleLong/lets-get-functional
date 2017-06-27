#!/usr/bin/env node
const _ = require("lodown-nicolelong");
'use strict';

const customers = require("./data/customers.json");


/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
 
// Code and test your solutions in index.js. Customer data is available to you in the Array, customers. 
//Utilizing your lodown library, write functions that take the Array of customers and return the following (console.log() the results):

// Find the number of males.
var malecount = 0;
_.each(customers, function(e, i, c) {
    if (e['gender'] === 'male') {
        malecount++;
    }
});


// Find the number of females.
var femalecount = 0;
_.each(customers, function(e, i, c) {
    if (e['gender'] === 'female') {
        femalecount++;
    }
});


// Find the name and age of the oldest customer.
var ages = _.pluck(customers, 'age');//returns all the ages in the array
var names = _.pluck(customers, 'name');//returns customer names in array

var oldest = _.reduce(ages, function(a, b) { //finds the highest age
    return Math.max(a, b);
});


// Find the name and age of the youngest customer.
var youngest = _.reduce(ages, function(a, b) { //finds the smallest age
    return Math.min(a, b);
});



// Find the average balance of all the customers.
var balance = _.pluck(customers, 'balance');
var realBal = _.map(balance, function(e, i, c) {
     e = e.replace(/[,$]/g, '');
     return parseFloat(e);
});
var aveBal = _.reduce(realBal, function(total, amount, index, array) {
    total += amount;
    if(index === realBal.length-1) {
        return total/realBal.length;
    }else{
        return total;
    }
});


// Find how many customers’ names begin with an arbitrary letter. Write a function to answer this question, then log an answer.
//have a count variable
//Given a charater, loop through an array of names, look at the charAt(0), if charAt(0) === letter, increase count
//return count
    
    
//This code also works but reduce should be used because we're looking for a number.
// var nameStart = function(letter){
//     var ownNameStart = [];
//     _.filter(names, function(name, i, c){
//         if (name.charAt(0) === letter){
//             ownNameStart.push(name);
//         } return ownNameStart;
//     });
//     console.log(ownNameStart.length);
// };             
//nameStart('S');

function nameStartsWith(customers, letter) {
    var count = _.reduce(customers, function(count, person) {
        if (person.name[0] === letter) {
            count++;
        } return count;
    }, 0);
    console.log(count+' customers have names that start with '+ letter+'.');
} 
var allNamesThatStartWithO = nameStartsWith(customers, 'O');


// Find how many OF ALL OF THE customers’ friends’ names begin with an arbitrary letter. Write a function to answer this question, then log an answer.

function allFriendsThatStartWith(customers, char) {
    const count = _.reduce(customers, function(count, person) { // within the customers obj, test function happens on each person obj, same count throughout
        return _.reduce(person.friends, function(count, friend) { //within person obj, test function happens on each friend obj, 
            if(friend.name[0] === char){
                ++count;
            }
            return count;
        }, count);
    }, 0);
    console.log(count+' of the customers have friends with names that start with '+char+'.');
}
const allFriendsThatStartWithJ = allFriendsThatStartWith(customers, 'J');


// Find the names of all customers who are friends with a given customer (by name). i.e. Which customers have that customer’s name in their friends list?
//input: one customer's name
//process: function with parameter of customer name... use filter to go through each customer's friend array..if input name is found in array, return true, push name into filter, if not move onto next customer
//output: other customer name's who have the input's name in their friend array

function hasFriend(targetFriend) {
    var friendName = [];
    _.filter(customers, function(person, i, c) {//go through each customer, look for targetFriend returning a true
        _.some(person.friends, function(friend) {//look in all of the friend objects within the friend array
            if(friend.name === targetFriend) {//if friend name is the targetfriend return true
                friendName.push(person.name);
            }     
        });
    });    console.log('These people are all friends with '+targetFriend+': '+friendName+'.');//console has to be outside filter function so it doesn't relog each array
}
var allFriends = hasFriend('Cooley Jimenez');



// Find the top 3 most common tags among the customers.
//input: customers
// might need pluck,concatenating all tags into one array, then counting frequency using reduce.  Or, use reduce within reduce,  First reduce all customers, and pass in a blank object as the accumulator.  Inside the reduction function, call reduce again, reduce that customers Array of tags, and the object you passed in as the seed. Within the second call to reduce, the reduction function will check if each tag is `seen`, if yes, +1, if not, create an entry for it and assign to 1
//output: top 3 tags 


function commonTags (customers){
    var countTag = _.reduce(customers, function(countTag, person, i, c){ //go through each customer
      return _.reduce(person.tags, function(countTag, tag, i, c){ // go through each tag array
         countTag[tag] = countTag[tag] ? countTag[tag] + 1 : 1; // if tag already exists, add 1 to count, else assign count to 1 for that tag
         return countTag;
        }, countTag); 
    }, {}); //console.log(countTag);
   
   var biggestAppearance = 0;
   var mostCommonTags = [];
_.each(countTag, function(v, k, c){
    if(v >= biggestAppearance){//has to be greater than or equals or else you will not get top 3 in front
        mostCommonTags.unshift(k);
        biggestAppearance = v;
    } else {
        mostCommonTags.push(k); // lowest occuring at at end of array
    } 
}); return mostCommonTags.slice(0, 3);//return just the top 3
}

var allTagCount = commonTags(customers);




// Create a summary of genders, the output should be:

// {
//     male: 3,
//     female: 4,
//     transgender: 1
// }

var summary = function(customers) {
    var gendercount = {};
    var genders = _.pluck(customers, 'gender');
    _.reduce(genders, function(tally, gender) {
        gendercount[tally[gender] = (tally[gender] || 0) + 1 ];
        return gendercount;
    }, 0);
    return gendercount;
};



// Remember, in the node.js environment, you can both console.log() or use the dubugger to step through your code and
//inspect your work. Using the dubugger and stepping through your code will help you better understand the relationships 
//and lifecycle of the Functions in your lodown library.

console.log('There are '+malecount+ ' male customers.');
console.log('There are '+femalecount+ ' female customers.');
console.log('The oldest customer is '+ names[_.indexOf(ages, oldest)] + ' at '+ oldest+'.');
console.log('The youngest customer is '+ names[_.indexOf(ages, youngest)] + ' at '+ youngest+'.');
console.log('The average balance of the customers is $' +aveBal.toFixed(2)+'.');
console.log('The most common tags are: '+ allTagCount);
console.log("Here is the breakdown of customer genders:" ,summary(customers));



