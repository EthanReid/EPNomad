const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
});

dynamoose.setDefaults({ create: false });

let UserSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  projects: {
    type: [String]
  },
  usagePlan: {
    type: String,
    required: true
  }
}, { useDocumentTypes: true });

let ProjectSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  products: {
    type: [String]
  }
}, { useDocumentTypes: true });

let ProductSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  foreground: {
    type: [String]
  },
  background: {
    type: [String]
  },
}, { useDocumentTypes: true });

let User = dynamoose.model('User', UserSchema);
let Project = dynamoose.model('Project', ProjectSchema);
let Product = dynamoose.model('Product', ProductSchema);

module.exports = { User, Project, Product };