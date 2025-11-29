# LevelUp - Project setup steps

### Copy environment file
```sh
cp .env.example .env
```

---




### INSTALL APP
```sh
# INSTALL THE APP IN A NEW NODE
git git@github.com:vsteppu/levelup.git
cd levelup
npm install

# GENERATE NEW MIGRATION FILE
npx sequelize-cli migration:generate --name "type here migration file name"

# RUN MIGRATIONS
npx sequelize-cli db:migrate   
```
