const fs = require("fs");
const { v4: uuidv4 } = require('uuid')

const { logger } = require("../utils/logger");

const DEFAULT_DOWNLOAD_PATH = "./files/";

const getFileStream = (out) => {
  const fileStream = fs.createWriteStream(out);
  fileStream.on("close", function () {
    logger.log(
      "Archiver has been finalized and the output file(s) descriptor has closed."
    );
  });

  return fileStream;
};

const getDefaultPath = () => {
  const uniqueFolderName = uuidv4();
  const downloadPath = DEFAULT_DOWNLOAD_PATH.concat(uniqueFolderName);

  return downloadPath;
};

const createFoldersStructure = (path) => {
  if (!fs.existsSync(DEFAULT_DOWNLOAD_PATH)) {
    fs.mkdirSync(DEFAULT_DOWNLOAD_PATH);

    logger.log(`Basic ${DEFAULT_DOWNLOAD_PATH} folder created 'Successfully'.`);
  }

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);

    logger.log(`Folder ${path} created 'Successfully'.`);
  }
};

module.exports = {
  getFileStream,
  getDefaultPath,
  createFoldersStructure,
};
