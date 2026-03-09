exports.bcolors = {
  HEADER: "\033[95m",
  OKBLUE: "\033[94m",
  OKCYAN: "\033[96m",
  OKGREEN: "\033[92m",
  WARNING: "\033[93m",
  FAIL: "\033[91m",
  ENDC: "\033[0m",
  BOLD: "\033[1m",
  UNDERLINE: "\033[4m",
};

exports.logTime = (addedMsg) => {
  date = new Date();
  if (!addedMsg) addedMsg = "";
  return `[${
    exports.bcolors.OKBLUE +
    require("path").basename(__filename).split(".")[0] +
    exports.bcolors.ENDC
  }][${exports.bcolors.OKGREEN + date.getHours()}:${date.getMinutes()}:${
    date.getSeconds() + exports.bcolors.ENDC
  }]: [Log${addedMsg}]:`;
};
