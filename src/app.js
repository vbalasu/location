 
class LocationTracker {
    constructor(nav) {
      this.db = new PouchDB('location');
      this.navigator = nav;
    }

    async start() {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      this.watchID = this.navigator.geolocation.watchPosition(async (pos) => {
        var location = {
          _id: new Date().toISOString(),
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          altitudeAccuracy: pos.coords.altitudeAccuracy,
          heading: pos.coords.heading,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          speed: pos.coords.speed
        };
        try {
          var result = await this.db.put(location);
          console.log(result);
        } catch(err) {
          console.log(err);
        }
        
      }, err=>console.log(err), options);
      console.log(`Started tracking location at ${new Date()}`);
    }

    stop() {
      this.navigator.geolocation.clearWatch(this.watchID);
      console.log(`Stopped tracking location at ${new Date()}`);
    }

    async get_data() {
      return await this.db.allDocs({include_docs: true, descending: true});
    }

    sync() {
      var remoteCouch = 'https://location:location-tracker@home.cloudmatica.com/couchdb/location';
      this.db.replicate.to(remoteCouch, {live: true}, (err)=>console.log(err));
      this.lastSync = new Date();
      console.log(`Synchronized at ${this.lastSync}`);
    }
}

module.exports.LocationTracker = LocationTracker;
  