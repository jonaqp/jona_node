var mongoose = require('./db');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GroupSchema = new Schema({
    name: String,
    status: Boolean,
    createdAtt: {
        type: Date,
        default: Date.now()
    }
});
var group = mongoose.model('core_group', GroupSchema);
module.exports.group = group;


var BucketSchema = new Schema({
    bucket_name: String,
    bucket_access_key: String,
    bucket_secret_key: String,
    bucket_path_image: String,
    createdAtt: {
        type: Date,
        default: Date.now()
    }
});
var bucket = mongoose.model('Bucket', BucketSchema);
module.exports.bucket = bucket;

var ZoneSchema = new Schema({
    name: String,
    createdAtt: {
        type: Date,
        default: Date.now()
    }
});
var zone = mongoose.model('Zone', ZoneSchema);
module.exports.zone = zone;


var CountrySchema = new Schema({
    zone: {type: ObjectId, ref: 'ZoneSchema'},
    name: String,
    code: String,
    state: String,
    iso_code: String,
    createdAtt: {
        type: Date,
        default: Date.now()
    }
});
var country = mongoose.model('Country', CountrySchema);
module.exports.country = country;

var StateSchema = new Schema({
    zone: {type: ObjectId, ref: 'ZoneSchema'},
    country: {type: ObjectId, ref: 'CountrySchema'},
    name: String,
    createdAtt: {
        type: Date,
        default: Date.now()
    }
});
var state = mongoose.model('State', StateSchema);
module.exports.state = state;


var PortSchema = new Schema({
    name: String,
    createdAtt: {
        type: Date,
        default: Date.now()
    }
});
var port = mongoose.model('Port', PortSchema);
module.exports.port = port;


var CompanySchema = new Schema({
    name: String,
    logo: String,
    address: String,
    phone: String,
    createdAtt: {
        type: Date,
        default: Date.now()
    }
});
var company = mongoose.model('Company', CompanySchema);
module.exports.company = company;



