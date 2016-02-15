'use strict';

/**
 * @ngdoc function
 * @name firebaseSecurityTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseSecurityTestApp
 */
angular.module('firebaseSecurityTestApp')
  .controller('MainCtrl', function ($firebaseArray, $firebaseObject) {

    // KO
    getRoot();

    // KO
    getLists();

    // OK
    createList();

    // OK
    getExistingList();

    // OK --> have to test if undefined attribute
    getNonExistingList();

    function getRoot() {
      var ref = new Firebase("https://billet.firebaseio.com/");
      var object = $firebaseObject(ref);
      object.$loaded(function() {
        console.log("getRoot OK");
      }, function(error) {
        console.log("getRoot KO");
      });
    }

    function getLists() {
      var ref = new Firebase("https://billet.firebaseio.com/lists");
      var lists = $firebaseArray(ref);
      lists.$loaded(function() {
        console.log("getLists OK");
      }, function(error) {
        console.log("getLists KO");
      });
    }

    function createList() {
      var ref = new Firebase("https://billet.firebaseio.com/lists");
      var lists = $firebaseArray(ref);
      lists.$add({'desc' : 'test security'}).then(function(newList) {
        console.log("createList OK : " + newList.key());
      }, function(error) {
        console.log("createList KO");
      })
    }

    function getExistingList() {
      var existingId = "-K8F5K08HoDGtx1_q8vk";
      var ref = new Firebase("https://billet.firebaseio.com/lists/" + existingId);
      var list = $firebaseObject(ref);
      list.$loaded(function() {
        console.log("getExistingList OK : " + list.name + " (name)");
      }, function(error) {
        console.log("getExistingList KO");
      })
    }

    function getNonExistingList() {
      var nonExistingId = "blablabla";
      var ref = new Firebase("https://billet.firebaseio.com/lists/" + nonExistingId);
      var list = $firebaseObject(ref);
      list.$loaded().then(function(data) {
        if (list.$ref() === ref) {
          console.log("getNonExistingList OK: " + list.$id + " (id) " + list.name + " (name)");
        }
        else {
          console.log("getNonExistingList KO");
        }

      }, function(error) {
        console.log("getNonExistingList KO");
      });
    }

  });
