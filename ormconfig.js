module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities":[
    process.env.NODE_ENV = "prod" ? "dist/modules/**/infra/Typeorm/entities/*.js" : 
    "./src/modules/**/infra/Typeorm/entities/*.ts"  
  ],
  "migrations":[
    process.env.NODE_ENV = "dev" ?  "dist/shared/infra/Typeorm/migrations/*.js" :
     "./src/shared/infra/Typeorm/migrations/*.ts" 
  ],
  "cli":{
    "migrationsDir":"./src/shared/infra/Typeorm/migrations"
  }
}
