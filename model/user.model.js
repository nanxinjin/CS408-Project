var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    _ = require("underscore"),
    cryptojs = require('crypto-js'),
    jwt = require('jsonwebtoken'),
    AES_ENCRYPT_SECRET = process.env.AES_ENCREPT_SECRET || '2SD*G(SHagGv&HG3',
    JWT_ENCRYPT_SECRET = process.env.JWT_ENCRYPT_SECRET || 'SDF)90SsHG)(#pgd23f)',
    SALT_WORK_FACTOR = 10;


var UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        index: { unique: false }
    },
    
    displayName: {
        type: String,
        maxlength: [24, 'displayName too long']
    },
    avatarUrl: { type: String },
    password: { type: String },
    postedMarket: [{ type: Schema.Types.ObjectId, ref: 'Market' }]

});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // set the hashed password back on our user document
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.toPublicJSON = function() {
	var json = this.toJSON();
	return _.pick(json, '_id', 'email', 'displayName', 'avatarUrl');
}

//Login
UserSchema.statics.getAuthenticated = function(body) {
    var user = this;
    return new Promise(function(resolve, reject) {
        user.findOne({ email: body.email }, function(err, user) {

            if (err) return reject(err);

            // make sure the user exists
            if (!user) {
                // return cb(null, null, reasons.NOT_FOUND);
                return reject('no user')
            }

            // test for a matching password
            user.comparePassword(body.password, function(err, isMatch) {
                if (err) return reject(err);

                // check if the password was a match
                if (isMatch) return resolve(user);
                reject("wrong email or password");
            });
        });
    });
};

UserSchema.methods.generateToken = function() {
	try {
		var stringData = JSON.stringify({
			id: this.get('_id')
		});
        console.log("get id and type: " + stringData);
		var encryptedData = cryptojs.AES.encrypt(stringData, AES_ENCRYPT_SECRET).toString();
		var token = jwt.sign({
			token: encryptedData
		}, JWT_ENCRYPT_SECRET);
        console.log("token created: " + token);
		return token;
	} catch (e) {
		return undefined;
	}
}

UserSchema.statics.findByToken = function(token) {
    var user = this;
    return new Promise(function(resolve, reject) {
        try {
    		var decodedJWT = jwt.verify(token, JWT_ENCRYPT_SECRET);
    		var bytes = cryptojs.AES.decrypt(decodedJWT.token, AES_ENCRYPT_SECRET);
    		var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

            // console.log("tokendata: " + JSON.stringify(tokenData) );

    		user.findById(tokenData.id).then(function(user) {
    			if (user) {
    				resolve(user);
    			} else {
    				reject();
    			}
    		}, function() {
    			reject();
    		})
    	} catch (e) {
    		reject(e);
    	}
    });
}


module.exports = mongoose.model('User', UserSchema);
