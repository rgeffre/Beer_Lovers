"use strict";

//mocha with nightmare
var Nightmare = require("nightmare");
var expect = require("chai").expect;

//describe - suite of tests
describe("Beer Lovers", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages - this.timeout
  this.timeout(50000);
  //first test
  //mocha needs to wait until nightmare is complete
  //done is callback to allow this to happen
  //nightmare is async

  it("switch user to search page", function(done) {
    Nightmare({ show: true })
      .goto("https://stormy-lowlands-32238.herokuapp.com/")
      // Just to be safe.
      .wait("a[href='/search/search']")
      // Click the search link.
      .click("a[href='/search/search']")
      .wait("h2.cardHdr")
      .evaluate(function () {
        return document.querySelector(".cardHdr").innerHTML;
      })
      .end()
      .then(function (result) {
        expect(result).to.equal("Search for Beer and Beer Venues");
        done();
      })
      .catch(function (error) {
        console.error("Search failed:", error);
        done();
      });
  });

  it("switch user to my pub page", function (done) {
    Nightmare({ show: true })
      .goto("https://stormy-lowlands-32238.herokuapp.com/")
      // Just to be safe.
      .wait("a[href='/users/mypub']")
      // Click the login button.
      .click("a[href='/users/mypub']")
      .wait("h2.cardHdr")
      .evaluate ( function() {
        return document.querySelector('.cardHdr').innerHTML;
      })
      .end()
      .then(function (result) {
        expect(result).to.equal('Welcome to the Pub');
        done();
      })
      .catch(function (error) {
        console.error("Search failed:", error);
        done();
      });
  });

  it("switch user to search page and search for beer", function (done) {
    Nightmare({ show: true })
      .goto("https://stormy-lowlands-32238.herokuapp.com/")
      // Just to be safe.
      .wait("a[href='/search/search']")
      // Click the search link.
      .click("a[href='/search/search']")
      .wait("#beerName")
      .type("#beerName", "stella")
      .click(".beerSearchButton")
      .wait(".searchResults")
      .evaluate(function () {
        return document.getElementsByClassName("stack")[0].rows.length;
      })
      .end()
      .then(function (result) {
        expect(result).to.not.equal(0);
        done();
      })
      .catch(function (error) {
        console.error("Search failed:", error);
        done();
      });
  });
});
