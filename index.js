/**
 * This function will be assigned to a custom menu option
 * within the google sheet. The user can trigger this function
 * which will scan the whole sheet and determine which
 * rows are eligible for programs.
 *
 * If a row is eligible, then we will update a call in that row
 * which will mark that row as eligible for contact.
 *
 * We can also have extra cells which signify which programs
 * that row is eligible for.
 */
function checkAllForProgramEligibility() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // loop through all rows
  for (var i = 0; i < data.length; i++) {
    const thisRow = data[i];
    // get each cell assigned to var
    const [
      timestamp,
      ownsHome,
      nameIsOnDeed,
      updatedOnTaxes,
      homeType,
      hasInsurance,
      previouslyWeatherized,
      firstName,
      lastName,
      address,
      monthlyIncome,
      usesCentralPointGas,
      _,
      __,
      email,
      phone,
    ] = thisRow;

    // @TODO: pass this data to our program functions
    // which can be accessed from `checkIsEligibleFor`

    // @TODO: based on eligibility, update the cell
    // which marks this row as eligible for contact

    // @TODO: mark cells to signify which programs
    // this row is eligible for.
  }
}

/**
 * we'll access our functions to check
 * for each program's eligibility through
 * this object. Each property is a function
 * which you can find below the util functions
 */
const checkIsEligibleFor = {
  miamiValleyCommunityActionPartnershipWeatherization,
  habitatForHumanityEmergencyHomeRepair,
  countyCorpHomeRepair,
  miamiValleyCommunityActionPartnershipEmergencyHomeRepair,
  rebuildingTogetherDayton,
  habitatForHumanityARPAProgram,
  rebuildingTogetherDaytonARPAProgram,
};

// --------------------------------------------------------------------
// UTILS
// --------------------------------------------------------------------

/**
 * @param {Object} args
 * @param {number} args.householdSize - The size of the household.
 * @param {"300%"|"200%"|"175%"} args.percent - percent of FPL
 */
const getPercentFPLForHouseholdSize = ({ householdSize, percent }) => {
  const federalPovertyLineByHouseholdSize = {
    1: {
      "300%": "$43,740",
      "200%": "$29,160",
      "175%": "$25,515",
    },
    2: {
      "300%": "$59,160",
      "200%": "$39,440",
      "175%": "$34,510",
    },
    3: {
      "300%": "$74,580",
      "200%": "$49,720",
      "175%": "$43,505",
    },
    4: {
      "300%": "$90,000",
      "200%": "$60,000",
      "175%": "$52,500",
    },
    5: {
      "300%": "$105,420",
      "200%": "$70,280",
      "175%": "$61,495",
    },
    6: {
      "300%": "$120,840",
      "200%": "$80,560",
      "175%": "$70,490",
    },
    7: {
      "300%": "$136,260",
      "200%": "$90,840",
      "175%": "$79,485",
    },
    8: {
      "300%": "$151,680",
      "200%": "$101,120",
      "175%": "$88,480",
    },
  };

  return federalPovertyLineByHouseholdSize[householdSize][percent];
};

/**
 * @param {Object} args
 * @param {number} args.householdSize - The size of the household.
 * @param {"80%"|"60%"|"50%"} args.percent - percent of AMI
 */
const getPercentAMIForHouseholdSize = ({ householdSize, percent }) => {
  const AMIByHouseholdSize = {
    1: {
      "80%": "$49,850",
      "60%": "$38,850",
      "50%": "$31,150",
    },
    2: {
      "80%": "$57,000",
      "60%": "$44,400",
      "50%": "$35,600",
    },
    3: {
      "80%": "$64,100",
      "60%": "$49,950",
      "50%": "$40,050",
    },
    4: {
      "80%": "$71,200",
      "60%": "$55,450",
      "50%": "$44,500",
    },
    5: {
      "80%": "$76,900",
      "60%": "$59,900",
      "50%": "$48,100",
    },
    6: {
      "80%": "$82,600",
      "60%": "$64,350",
      "50%": "$51,650",
    },
    7: {
      "80%": "$88,300",
      "60%": "$68,800",
      "50%": "$55,200",
    },
    8: {
      "80%": "$94,000",
      "60%": "$73,200",
      "50%": "$58,750",
    },
  };
  return AMIByHouseholdSize[householdSize][percent];
};

/**
 * User information object.
 *
 * @typedef {Object} UserInfo
 * @property {number} timestamp - Timestamp of the information.
 * @property {boolean} ownsHome - Indicates if the individual owns a home.
 * @property {boolean} nameIsOnDeed - Indicates if the individual's name is on the deed.
 * @property {boolean} updatedOnTaxes - Indicates if taxes are up to date.
 * @property {'single'|'duplex'|'other'} homeType - Type of home (single, duplex, other).
 * @property {boolean} hasInsurance - Indicates if the individual has home insurance.
 * @property {boolean} previouslyWeatherized - Indicates if the home was previously weatherized by another program.
 * @property {string} firstName - First name of the individual.
 * @property {string} lastName - Last name of the individual.
 * @property {string} address - Address of the individual.
 * @property {number} monthlyIncome - Monthly income of the individual.
 * @property {boolean} usesCentralPointGas - Indicates if central point gas is used.
 * @property {string} email - Email address of the individual.
 * @property {string} phone - Phone number of the individual.
 *
 * @TODO STILL NEED BELOW VALUES FROM SPREADSHEET
 * @property {boolean} receivedHelpInLast2Years - received help from any of the programs within last 2 years
 * @property {number} age - applicant age
 * @property {boolean} hasLivedInHomeOver1Year - applicant has lived in home for over a year
 */

// --------------------------------------------------------------------
// Program Eligibility Functions
// --------------------------------------------------------------------

/**
 * Check if the given user (row)
 * is eligible for:
 * "Miami Valley Community Action Partnership Weatherization"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
const miamiValleyCommunityActionPartnershipWeatherization = (userInfo) => {
  const percentFPLForHouseholdSize = getPercentFPLForHouseholdSize({
    householdSize: userInfo.householdSize,
    percent: "300%",
  });

  const meetsIncomeReq =
    userInfo.monthlyIncome * 12 < percentFPLForHouseholdSize;

  return meetsIncomeReq && !userInfo.previouslyWeatherized;
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Habitat for Humanity Emergency Home Repair"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
const habitatForHumanityEmergencyHomeRepair = (userInfo) => {
  const percentAMIForHouseholdSize = getPercentAMIForHouseholdSize({
    householdSize: userInfo.householdSize,
    percent: "60%",
  });

  const meetsIncomeReq =
    userInfo.monthlyIncome * 12 < percentAMIForHouseholdSize;

  return (
    meetsIncomeReq &&
    userInfo.hasInsurance &&
    !userInfo.receivedHelpInLast2Years
  );
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "County Corp Home Repair"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
const countyCorpHomeRepair = (userInfo) => {
  const percentAMIForHouseholdSize = getPercentAMIForHouseholdSize({
    householdSize: userInfo.householdSize,
    percent: "80%",
  });

  const meetsIncomeReq =
    userInfo.monthlyIncome * 12 < percentAMIForHouseholdSize;

  return (
    meetsIncomeReq &&
    userInfo.hasInsurance &&
    !userInfo.receivedHelpInLast2Years
  );
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Miami Valley Community Action Partnership Emergency Home Repair"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
const miamiValleyCommunityActionPartnershipEmergencyHomeRepair = (userInfo) => {
  const percentAMIForHouseholdSize = getPercentFPLForHouseholdSize({
    householdSize: userInfo.householdSize,
    percent: "200%",
  });

  const meetsIncomeReq =
    userInfo.monthlyIncome * 12 < percentAMIForHouseholdSize;

  return meetsIncomeReq && !userInfo.receivedHelpInLast2Years;
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Rebuilding Together Dayton"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
const rebuildingTogetherDayton = (userInfo) => {
  const percentAMIForHouseholdSize = getPercentFPLForHouseholdSize({
    householdSize: userInfo.householdSize,
    percent: "200%",
  });

  const meetsIncomeReq =
    userInfo.monthlyIncome * 12 < percentAMIForHouseholdSize;

  return (
    meetsIncomeReq && userInfo.age >= 60 && !userInfo.receivedHelpInLast2Years
  );
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Habitat for Humanity ARPA program"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
const habitatForHumanityARPAProgram = (userInfo) => {
  // @TODO: convert userInfo.address to cords
  // and use Google Maps Geocoding Service
  const inARPANeighborhood = false;

  return (
    inARPANeighborhood &&
    userInfo.ownsHome &&
    userInfo.homeType !== "other" &&
    userInfo.nameIsOnDeed &&
    userInfo.updatedOnTaxes &&
    userInfo.hasLivedInHomeOver1Year
  );
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Rebuilding Together Dayton ARPA program"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
const rebuildingTogetherDaytonARPAProgram = (userInfo) => {
  // @TODO: convert userInfo.address to cords
  // and use Google Maps Geocoding Service
  const inARPANeighborhood = false;

  return (
    inARPANeighborhood &&
    userInfo.ownsHome &&
    userInfo.homeType !== "other" &&
    userInfo.nameIsOnDeed &&
    userInfo.updatedOnTaxes &&
    userInfo.hasLivedInHomeOver1Year
  );
};
