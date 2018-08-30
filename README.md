# Tracking

[![build status](https://img.shields.io/travis/koobitor/delivery-tracking.svg?style=flat-square)](https://travis-ci.org/koobitor/delivery-tracking)
[![code coverage](https://img.shields.io/coveralls/koobitor/delivery-tracking.svg?style=flat-square)](https://coveralls.io/r/koobitor/delivery-tracking)

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

### Success Response
```
{
  "tracking_id": "600000000000",
  "sender": "Medvine Limited",
  "recipient": "Sakol Assawasagool",
  "consignee": "Sakol Assawasagool",
  "agent": {
    "pickup": {
      "agent_name": "Bang Bua Thong Agency",
      "agent_tel": "000-000-0000",
      "dm": "Mr. Lorem Ipsum",
      "dm_phone": "000-000-0000"
    },
    "delivery": {
      "agent_name": "Bangna Agency",
      "agent_tel": "00-000-0000",
      "dm": "Mr. Lorem Ipsum",
      "dm_phone": "000-000-0000"
    }
  },
  "tracking": [
    {
      "date": "19\/04\/2018",
      "time": "17:51:10",
      "agent": "Bang Bua Thong Agency",
      "scan_division": "Pickup Complete",
      "etc": ""
    },
    {
      "date": "19\/04\/2018",
      "time": "18:30:09",
      "agent": "Bang Bua Thong Agency",
      "scan_division": "Pickup Start",
      "etc": ""
    },
    {
      "date": "20\/04\/2018",
      "time": "14:12:51",
      "agent": "Central CDC",
      "scan_division": "Loading",
      "etc": ""
    },
    {
      "date": "21\/04\/2018",
      "time": "08:06:28",
      "agent": "Bangna Agency",
      "scan_division": "Delivery Start",
      "etc": ""
    },
    {
      "date": "23\/04\/2018",
      "time": "19:00:33",
      "agent": "Bangna Agency",
      "scan_division": "Delivery Complete",
      "etc": ""
    }
  ]
}
```

### Error Response
```
{
  error: 'invalid_order_no',
  msg: 'Invalid Order No.!'
}
```