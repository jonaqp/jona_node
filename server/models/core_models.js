var mongoose = require('./db');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GroupSchema = new Schema({
    name: String,
    status: Boolean,
    created_at: Date,
    modified_at: Date
});
var group = mongoose.model('core_group', GroupSchema);
module.exports.group = group;
GroupSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.created_at = currentDate;
  if (!this.modified_at)
    this.modified_at = currentDate;
  next();
});

var BucketSchema = new Schema({
    bucket_name: String,
    bucket_access_key: String,
    bucket_secret_key: String,
    bucket_path_image: String,
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date
    }
});
var bucket = mongoose.model('core_bucket', BucketSchema);
module.exports.bucket = bucket;


var ZoneSchema = new Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date
    }
});
var zone = mongoose.model('core_zone', ZoneSchema);
module.exports.zone = zone;


var CountrySchema = new Schema({
    zone: {type: ObjectId, ref: 'ZoneSchema'},
    name: String,
    code: String,
    state: String,
    iso_code: String,
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date
    }
});
var country = mongoose.model('core_country', CountrySchema);
module.exports.country = country;


var StateSchema = new Schema({
    zone: {type: ObjectId, ref: 'ZoneSchema'},
    country: {type: ObjectId, ref: 'CountrySchema'},
    name: String,
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date
    }
});
var state = mongoose.model('core_state', StateSchema);
module.exports.state = state;


var PortSchema = new Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date
    }
});
var port = mongoose.model('core_port', PortSchema);
module.exports.port = port;


var CompanySchema = new Schema({
    name: String,
    logo: String,
    address: String,
    phone: String,
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date
    }
});
var company = mongoose.model('core_company', CompanySchema);
module.exports.company = company;



