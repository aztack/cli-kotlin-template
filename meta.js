const $fs = require('fs');
const $path = require('path');

module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "label": "Project name, no space or punctuations, for example: my-project"
    },
    "package": {
      "type": "string",
      "required": true,
      "label": "android package, for example: com.company.project"
    },
    "description": {
      "type": "string",
      "required": true,
      "label": "Project description",
      "default": "An Kotlin Project"
    },
    "group": {
      "type": "string",
      "required": true,
      "label": "Your group ID",
      "default": "me.name"
    },
    "author": {
      "type": "string",
      "label": "Author"
    }
  },
  complete: function (data, opts) {
    const cwd = $path.join(process.cwd(), data.inPlace ? '' : data.destDirName);
    const name = data.name;

    // create folders
    const pkg = `src/main/kotlin/${data.package.replace(/\./g, '/')}`;
    [/*'libs'*/, pkg, 'src/main/resources', 'src/test/kotlin', 'src/test/kotlin/resources'].forEach(function(dir){
      console.log(`creating ${dir} folder`);
      $fs.mkdirSync($path.resolve(cwd, `${dir}`), {recursive: true});
    });
    $fs.writeFileSync($path.join(cwd, pkg, 'main.kt'), 
`fun main(args: Array<String>) {
    println("Hello World!")
}`);
  },
  "skipInterpolation": []
}