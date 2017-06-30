const fs = require('fs');

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
