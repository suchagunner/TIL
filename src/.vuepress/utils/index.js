const fs = require('fs');
const path = require('path');

class DocManager {
  #rootDir;

  constructor(rootDocDir) {
    this.#rootDir = rootDocDir;
  }

  #getGroupItem(folderName) {
    const groupTitle = `${folderName[0].toUpperCase()}${folderName.slice(1)}`;
    const groupPath = `/docs/${folderName}`;
    const collapsable = false;
    const children = fs
      .readdirSync(`${path.join(this.#rootDir, folderName)}`)
      .filter((file) => file.slice(-3) === '.md')
      .map((file) => `${groupPath}/${file === 'README.md' ? '' : file.slice(0, -3)}`);

    return {
      title: groupTitle,
      path: groupPath,
      collapsable,
      children,
    };
  }

  getSidebarItems() {
    return fs
      .readdirSync(this.#rootDir)
      .filter((f) => {
        return fs.lstatSync(`${this.#rootDir}/${f}`).isDirectory();
      })
      .map((folder) => this.#getGroupItem(folder));
  }
}

module.exports = {
  DocManager,
};
