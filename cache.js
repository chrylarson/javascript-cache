var fs = require('fs');

function Cache(config) {
        config = config || {};

        var data = {};
        var self = this;

        var CacheEntry = function(value) {
            this.value = value;
        };

        CacheEntry.create = function(value) {
            return new CacheEntry(value);
        };

        this.has = function (key) {
            return data.hasOwnProperty(key);
        };

        this.get = function (key) {
            return data[key].value;
        };

        this.set = function (key, value) {
            data[key] = CacheEntry.create(value)
        }

        this.getOrDefault = function (key, def) {
            return self.has(key) ? data[key].value : def;
        };

        this.initCache = function (filePath) {
            var fileIn = fs.readFileSync(filePath).toString().split("\n");
            for(i in fileIn) {
                console.log(fileIn[i]);
                var line = fileIn[i].split("|")
                this.set(line[0], line[1])
            }
        }

        this.clear = function() {
            for(var key in data)
                if (data.hasOwnProperty(key))
                    self.remove(key);
        };
        
        this.refresh = function() {
            this.clear;
            this.initCache
        };
    
        // Periodical cleanup
        setInterval(this.refresh, config['refresh'] * 1000);

    }

    module.exports = Cache;