# Where Am I?

```js
const whereAmI = require('@rainder/where-am-i');

whereAmI.getLocation().then((location) => {
  location === {
    point: GeoPoint, //lat, lng
    accuracy: Number, //in meters
    timestamp: Date,
  };  
});
```