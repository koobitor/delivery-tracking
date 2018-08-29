# Tracking

Logistics Company
- CJ Logistics

## How to use it
```
const tracking = require('delivery-tracking')

Promise
  .all([tracking.cj('tracking_number')])
  .then(result => {
    console.log(result)
  })
```