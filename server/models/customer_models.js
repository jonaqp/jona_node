var mongoose = require('./db');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var core = require('./core_models');
var core_country = core.country;
var core_company = core.company;
var core_zone = core.zone;
var core_state = core.state;

var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    display_name: String,
    is_active: Boolean,
    is_admin: Boolean,
    groups: [],
    permissions: [],
    profile: {
        document_type: String,
        cell: String,
        zone: {type: ObjectId, ref: 'core_zone'},
        country: {type: ObjectId, ref: 'core_country'},
        state: {type: ObjectId, ref: 'core_state'},
        company: {type: ObjectId, ref: 'core_company'},
        profile_image: String,
        gender: {type: String, enum: ['Masculino', 'Femenino']
	}
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.plugin(passportLocalMongoose);


module.exports.user = mongoose.model('users', UserSchema);


// module.exports.comparePassword = function (candPassword, hash, callback) {
//     bcrypt.compare(candPassword, hash, function (err, isMatch) {
//         if (err) return callback(err);
//         callback(null, isMatch);
//     })
// };
//
// module.exports.getUserByUsername = function (username, callback) {
//     var query = {username: username};
//     User.findOne(query, callback);
// };
//
// module.exports.getUserById = function (id, callback) {
//     User.findById(id, callback);
// };
//
// module.exports.createUser = function (newUser, callback) {
//     bcrypt.hash(newUser.password, 10, function (err, hash) {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser.save(callback);
//     });
// };