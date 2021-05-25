module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "ssl": {
    rejectUnauthorized: false
  },
  "entities":[
    process.env.NODE_ENV = "production" ? "dist/modules/**/infra/Typeorm/entities/*.js" : 
    "./src/modules/**/infra/Typeorm/entities/*.ts"  
  ],
  "migrations":[
    process.env.NODE_ENV = "production" ?  "dist/shared/infra/Typeorm/migrations/*.js" :
     "./src/shared/infra/Typeorm/migrations/*.ts" 
  ],
  "cli":{
    "migrationsDir":"./src/shared/infra/Typeorm/migrations"
  }
}
