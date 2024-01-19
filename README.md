# README

## ToDo & Questions

- [ ] determine if address is within ARPA neighborhood
- [ ] add logic to update a cell(s) to designate row as needing to be contacted
- [ ] missing some values from google form
  - [ ] has applicant (home?) received help from any of the programs within last 2 years
  - [ ] applicant DOB or age
  - [ ] has applicant has lived in home for over a year
- [ ] The screener, a resident is eligible for all programs is under 200% Federal Poverty line. Does this supersede all other income reqs?
- [ ] "County Corp Home Repair" has 2 separate income reqs. Should we just use the easier to meet req to "catch-all"?
- [ ] (possible) add test suite and some test cases

## How can we trigger our code?

Using a [Google Apps Script](https://developers.google.com/apps-script/guides/sheets) we can add some JavaScript to a Google Sheet.

We can trigger that JavaScript through a [custom menu](https://developers.google.com/apps-script/guides/menus) in Google Sheets.

The JavaScript code is found in the `index.js` file. There are some comments which denote sections to help with readability.

## Documentation For Code

> This code is still in progress so this
> is the current state of the docs

### Overview

`checkAllForProgramEligibility` is a function which will be assigned to a custom menu option. We could also choose to run this function based on a [trigger](https://developers.google.com/apps-script/guides/sheets#triggers).

`checkAllForProgramEligibility` will read the whole sheet and loop through each row. Each row represents a google form submission or a user.

We'll take the cells from that row and pass that data to functions which will determine if that user is eligible for a program. There are functions for each program and each return a boolean.

If we get any `true`s returned from the functions then we will update a cell in that row. This cell will designate that user as being eligible to be contacted.

### Util Functions

within `index.js` we have some util functions and some JSDoc type definitions. You can find them all in the "UTILS" section of `index.js`.

### Program Eligibility Functions

All of the functions which determine eligibility are in the "Program Eligibility Functions" section of `index.js`. These functions are meant to be accessed from the object `checkIsEligibleFor`.
