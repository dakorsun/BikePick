# PROJECTNAME project

## Dependencies

  * Node.js ~10.x (LTS)
  * [PostgreSQL 10](https://www.postgresql.org/)

## Installation

1) If you don't have `nvm`, install it [https://github.com/creationix/nvm](https://github.com/creationix/nvm)
2) Install node:

    ```
    nvm install 10
    ```
    
3) Install PostgreSQL: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

4) Install dependencies:

    ```
    npm install
    ```

## Configure environment variables

1) Copy ``` example.env ```  to  ``` .env ```.

2) Change variables in ``` .env ``` with necessary values.

3) Add site specific variables (if any).

4) Run Sequelize migrations: ```npm run seq-sync```

## Run Project

```
#run project in development mode:
npm run start

#build and start project in production mode:
npm run start:prod
```

# How to add new ENV variable

1) Add var into `example.env` to ensure that other developers will know about it

2) Update `Dockerfile`: ARGS and ENVS sections

3) Update AWS CodeBuild files `buildspec-staging.yml` and `buildspec-prod.yml`: update variables section and docker build command


# Work with database and Sequelize

When you are going to start project for the 1st time you need to run Sequelize migrations:
```npm seq-sync```

If you you want to modify database you have to implement a new Sequelize migration using skeleton ```config/database/_migrationSkeleton.js``:

- see documentation for [Sequelize Migrations](http://docs.sequelizejs.com/manual/migrations.html);
 
- add a migration into folder ```config/database/migrations```.

# Internationalization guide [react-i18next](https://react.i18next.com/)

NPM task that scan course code for missing keys that rae not added into the bundle:
```
$ npm run i18nscan
```

Here are few common ways of adding internationalization that we use in the project.

1) Functional component ([using hook](https://react.i18next.com/latest/usetranslation-hook)):
```
import React from 'react';
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t, i18n } = useTranslation();
  // or const [t, i18n] = useTranslation();
  
  return <p>{t('common.key')}</p>;
}
```

2) Class component ([using HOC](https://react.i18next.com/latest/withtranslation-hoc)):
```
import React from 'react';
import { useTranslation } from 'react-i18next';

@withTransaction
class Comp extends Component {

    render() {
        return <p>{t('common.key')}</p>;
    }
}
```

3) Outside of component context (e.g. redux forms validation):
```
import i18n from './i18n/i18n';
...
i18n.t('common.key')
...
```

