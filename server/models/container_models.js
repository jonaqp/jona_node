var mongoose = require('./db');
var core = require('./core_models');
var core_country = core.country;
var core_company = core.company;
var core_port = core.port;


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var BoatSchema = new Schema({
    mac_address: String,
    country: {type: ObjectId, ref: 'core_country'},
    company: {type: ObjectId, ref: 'core_company'},
    port: {type: ObjectId, ref: 'core_port'},
    status: {
        type: Boolean,
        default: true
    },
    created_at: Date,
    modified_at: Date
});
var boat = mongoose.model('Boats', BoatSchema);
module.exports.boat = boat;
BoatSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.created_at = currentDate;
  if (!this.modified_at)
    this.modified_at = currentDate;
  next();
});

var TripSchema = new Schema({
    boat: {type: ObjectId, ref: 'BoatSchema'},
    mac_address: String,
    date: String,
    json_filepath: String,
    csv_filepath: String,
    video_filepath: String,
    image: [
        {
            time: String,
            image_filepath: String,
            latitude: String,
            longitude: String,
            orientation: String,
            battery_level: String

        }
    ],
    events: {
        time_start: String,
        time_end: String,
        comments: String,
        supervisor: String
    },
    createdAtt: {
        type: Date,
        default: Date.now()
    }
});
var trip = mongoose.model('Trips', TripSchema);
module.exports.trip = trip;