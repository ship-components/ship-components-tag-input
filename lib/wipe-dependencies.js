const fs = require('fs');

/**
 * Updates all the dependencies & dev dependencies
 * If users wants to...
 * NOTE: Please run this command with caution - it may not be supported
 */
function wipeDependencies() {
  const file = fs.readFileSync('package.json');
  const content = JSON.parse(file);

  for (let devDep = 0; devDep < content.devDependencies.length; devDep++) {
    content.devDependencies[devDep] = '*';
  }
  for (let dep = 0; dep < content.dependencies.length; dep++) {
    content.dependencies[dep] = '*';
  }

  fs.writeFileSync('package.json', JSON.stringify(content));
}

if (require.main === module) {
  wipeDependencies();
} else {
  module.exports = wipeDependencies;
}
