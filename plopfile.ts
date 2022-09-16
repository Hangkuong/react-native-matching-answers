import { NodePlopAPI } from 'plop'

const requireField = (fieldName: any) => {
  return (value: any) => {
    if (String(value).length === 0) {
      return `${fieldName} is required`
    }
    return true
  }
}

module.exports = (plop: NodePlopAPI) => {
  plop.setGenerator('function screen', {
    description: 'Create a screen component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your screen name?',
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: `app/screens/{{properCase name}}/{{properCase name}}Container.tsx`,
        templateFile: 'plop-templates/fun-screen-template/container.tsx.hbs',
      },
      {
        type: 'add',
        path: `app/screens/{{properCase name}}/{{properCase name}}Screen.tsx`,
        templateFile: 'plop-templates/fun-screen-template/screen.tsx.hbs',
      },
      {
        type: 'add',
        path: `app/screens/{{properCase name}}/{{properCase name}}Style.tsx`,
        templateFile: 'plop-templates/fun-screen-template/style.tsx.hbs',
      },
    ],
  }),
    plop.setGenerator('screen', {
      description: 'Create a screen component',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'What is your screen name?',
          validate: requireField('name'),
        },
      ],
      actions: [
        {
          type: 'add',
          path: `app/screens/{{properCase name}}/{{properCase name}}Container.tsx`,
          templateFile: 'plop-templates/screen-template/container.tsx.hbs',
        },
        {
          type: 'add',
          path: `app/screens/{{properCase name}}/{{properCase name}}Screen.tsx`,
          templateFile: 'plop-templates/screen-template/screen.tsx.hbs',
        },
        {
          type: 'add',
          path: `app/screens/{{properCase name}}/{{properCase name}}Style.tsx`,
          templateFile: 'plop-templates/screen-template/style.tsx.hbs',
        },
      ],
    })

  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'app/components/{{properCase name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
    ],
  })
}
