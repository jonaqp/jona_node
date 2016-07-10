var mongoose = require('./db');
var restful = require('node-restful');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GroupSchema = new Schema({
    name: String,
    status: Boolean,
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date
    }
});
var group = mongoose.model('core_group', GroupSchema);
var api_group = restful.model('core_group', GroupSchema);
module.exports.group = group;
module.exports.api_group = api_group;


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
var api_bucket = restful.model('core_bucket', BucketSchema);
module.exports.bucket = bucket;
module.exports.api_bucket = api_bucket;

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
var api_zone = restful.model('core_zone', ZoneSchema);
module.exports.zone = zone;
module.exports.api_zone = api_zone;

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
var api_country = restful.model('core_country', CountrySchema);
module.exports.country = country;
module.exports.api_country = api_country;

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
var api_state = restful.model('core_state', StateSchema);
module.exports.state = state;
module.exports.api_state = api_state;

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
var api_port = restful.model('core_port', PortSchema);
module.exports.port = port;
module.exports.api_port = api_port;

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
var api_company = restful.model('core_company', CompanySchema);
module.exports.company = company;
module.exports.api_company = api_company;


