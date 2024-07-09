#!/bin/bash

mongosh <<EOF
let config = {
    "_id": "rs0",
    "members": [
        {
            "_id": 0,
            "host": "192.168.91.2:27017"
        },
        {
            "_id": 1,
            "host": "192.168.91.3:27017"
        },
        {
            "_id": 2,
            "host": "192.168.91.4:27017"
        }
    ]
};

rs.initiate(config);
EOF
