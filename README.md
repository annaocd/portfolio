RED RAD Boilerplate
=========================

# Installing the Backend

```sh
cd <PATH_TO_PROJECT>
sh ./scripts/setup.sh
```

# Installing the Frontend

```sh
cd <PATH_TO_PROJECT>
npm install
```

# Running the project

```sh
cd <PATH_TO_PROJECT>
npm start
```

# Building FE

This project is using *Node 5.0.0* so make sure to get that version up&running.

Next commands help you out to install and use *Node 5.0.0*:

```sh
nvm install 5.0.0
nvm use 5.0.0
```

The following commands will create front-end files:

```sh
cd <PATH_TO_PROJECT>
sh scripts/build.sh
```

# Database

You can execute following commands to get your local DB working:

```sh
createdb <PROJECT_DB_NAME>
cd <PATH_TO_PROJECT>
python manage.py migrate
python loaddata project/apps/<PATH_TO_PAGE.json>
```
