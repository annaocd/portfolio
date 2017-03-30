const path = require('path')

const TEMPLATE_PATH = path.join(__dirname, 'project/plopTemplates/')
const JS_PATH = path.join(__dirname, 'project/source/js/')

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'react component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the component name?',
      validate: function (value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      }
    },
    {
      type: 'list',
      name: 'type',
      message: 'What is the component type?',
      choices: ['stateless', 'class'],
      default: 0
    }],

    actions: function(data) {
      var templateFile;
      if(data.type === 'stateless') {
        templateFile = TEMPLATE_PATH + 'component-stateless.js';
      } else {
        templateFile = TEMPLATE_PATH + 'component-class.js';
      }

      var actions = [{
        type: 'add',
        path: JS_PATH + 'components/{{name}}.js',
        templateFile: templateFile
      }]

     return actions;
   }
 });

  plop.setGenerator('container', {
    description: 'container',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the container name?',
      validate: function (value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      }
    }],
    actions: [{
      type: 'add',
      path: JS_PATH + 'containers/{{name}}.js',
      templateFile: TEMPLATE_PATH + 'container.js'
    }]
  });
  plop.setGenerator('module', {
    description: 'reducer + actions module',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the module name?',
      validate: function (value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      }
    }],
    actions: [{
      type: 'add',
      path: JS_PATH + 'state/modules/{{name}}.js',
      templateFile: TEMPLATE_PATH + 'module.js'
    }]
  });
};
