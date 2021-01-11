/*
Documentation

this page creates the schema for course_comments

*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommModules = new Schema({


    user_id: {
        type: 'ObjectId',
        required: true
    },

    module_1: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_2: {
        type: String,
        get: function(data) {
            try { 
                try { 
                return JSON.parse(data);
                } catch(err) { 
                return {};
                }

            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_3: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_4: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_5: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_6: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_7: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_8: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_9: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_10: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_11: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    module_12: {
        type: String,
        get: function(data) {
            try { 
            return JSON.parse(data);
            } catch(err) { 
            return {};
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },

    

})

CommModules.set('toJSON', { getters: true, minimize: false });


mongoose.model('comm_modules', CommModules)

