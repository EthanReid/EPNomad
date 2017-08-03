var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

// define the schema for our user model
var userSchema = mongoose.Schema({
	name         : String,
    email        : String,
    password     : String,
    verified     : Boolean,
    verification_token: String,
    clientSecret:  String
}, {
	timestamps: true
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);