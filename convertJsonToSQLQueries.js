const fs = require("fs");
const JSONStream = require("JSONStream");

const escapeSqlValue = (value) => {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "string") return `'${value.replace(/'/g, "''")}'`;
  return value;
};

const generateInsertStatement = (obj, tableName) => {
  const columns = Object.keys(obj)
    .map((col) => `\`${col}\``)
    .join(", ");
  const values = Object.values(obj).map(escapeSqlValue).join(", ");
  console.log(values);
  return `INSERT INTO ${tableName} (${columns}) VALUES (${values});\n`;
};

const processJsonFile = (filePath, tableName, outputFilePath) => {
  const parser = JSONStream.parse("*"); // For an array at the root
  const writeStream = fs.createWriteStream(outputFilePath, { flags: "w" });

  fs.createReadStream(filePath)
    .pipe(parser)
    .on("data", (obj) => {
      const sqlStatement = generateInsertStatement(obj, tableName);
      writeStream.write(sqlStatement);
    })
    .on("end", () => {
      console.log(`SQL statements have been written to ${outputFilePath}`);
      writeStream.end();
    })
    .on("error", (err) => {
      console.error("Error processing JSON stream:", err);
      writeStream.end();
    });
};

const tableName = "bet_transactions";
const jsonFilePath = "./bet_data_fe_assessment.json";
const outputSqlFilePath = "output.sql"; // The file where SQL statements will be saved

processJsonFile(jsonFilePath, tableName, outputSqlFilePath);
