const Teams = require("../models/teams");

const getAllTeams = async (req, res) => {
  const { name, uclwinner, location, sort, fields, numberFilters } = req.query;
  const queryObject = {};
  let result = Teams.find(queryObject);
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (uclwinner) {
    queryObject.uclwinner = uclwinner === "true" ? true : false;
  }
  if (location) {
    queryObject.location = { $regex: location, $options: "i" };
  }
  
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
  }
  //select
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  if (numberFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filters = numberFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = {
          [operator]: Number(value),
        };
      }
    });
  }
  const limit = Number(req.query.limit) || 10;
  result = result.limit(limit);
  result = result.find(queryObject);
  const teams = await result;
  res.status(200).json({ nbSearch: teams.length, data: teams });
};

module.exports = getAllTeams;
