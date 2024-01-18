# Plans

## Notes

- we hav a spreadsheet with columns for:
  - Timestamp
  - Do you own your own home?
  - Is your name on the home's deed?
  - Are you updated on your taxes?
  - Home type
  - Do you have insurance?
  - Weatherization: Has your home been weatherized by another program?
  - First name
  - Last name
  - Address
  - Income: Monthly
- need to create var refs for each col

```javascript
// we'll use this when iterating, to check which col we're in
const columnIdx = {
  timestamp: 0,
  ownsHome: 1,
};

for (var i = 0; i < data.length; i++) {
  Logger.log("timestamp: " + data[i][columnIdx.timestamp]);
  Logger.log("ownsHome: " + data[i][columnIdx.ownsHome]);
}
```

- we'll loop through all rows using a function like this:

```javascript
var sheet = SpreadsheetApp.getActiveSheet();
var data = sheet.getDataRange().getValues();
```

- within that loop, we'll pass the cell data to functions for each program which returns a boolean

```javascript
const checkIsEligibleFor = {
  miamiValleyCommunityActionPartnershipWeatherization: () => {},
  habitatForHumanityEmergencyHomeRepair: () => {},
  countyCorpHomeRepair: () => {},
  miamiValleyCommunityActionPartnershipEmergencyHomeRepair: () => {},
  rebuildingTogetherDayton: () => {},
  habitatForHumanityArpaProgram: () => {},
};
```

- based on the return of those fxns, we'll update cells in that row which represent which program they're eligible for
- we can add a cell in that row which says if they should be contacted, though it will be simple and based on if any programs are eligible

- this function will be triggered through a custom menu
  - more info here: https://developers.google.com/apps-script/guides/menus
