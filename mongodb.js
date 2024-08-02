// Create Collection
db.createCollection("customers");

db.createCollection("products");

db.createCollection("orders");

db.customers.insertOne({
  _id: "aanwidiant",
  name: "Aan Widianto",
});

// Insert Document to Collection
db.products.insertMany([
  {
    _id: "1",
    name: "Indomie Goreng",
    price: new NumberLong("2500"),
  },
  {
    _id: "2",
    name: "Mie Sedap Ayam Bawang",
    price: new NumberLong("2300"),
  },
]);

db.products.insertMany([
  {
    _id: "3",
    name: "Pop Mie Ayam Bawang",
    price: new NumberLong("2500"),
    category: "food",
  },
  {
    _id: "4",
    name: "Realme GT 2 Pro",
    price: new NumberLong("10000000"),
    category: "smartphone",
  },
  {
    _id: "5",
    name: "ASUS Zenbook S 13 OLED",
    price: new NumberLong("25000000"),
    category: "laptop",
  },
]);

db.orders.insertOne({
  _id: new ObjectId(),
  total: new NumberLong("9600"),
  items: [
    {
      products_id: 1,
      price: new NumberLong("2500"),
      quantity: new NumberInt("2"),
    },
    {
      products_id: 2,
      price: new NumberLong("2300"),
      quantity: new NumberInt("2"),
    },
  ],
});

// Query Document from Collection
db.customers.find({ _id: "aanwidiant" });

db.customers.find({ name: "Aan Widianto" });

db.products.find({ price: 2500 });

db.orders.find({ "items.product_id": 1 });

// Query Document with Comparison Operator from Collection
db.customers.find({
  _id: {
    $eq: "aanwidiant",
  },
});

db.products.find({
  price: {
    $gt: 2300,
  },
});

db.products.find({
  category: {
    $in: ["laptop", "smartphone"],
  },
  price: {
    $gt: 10000000,
  },
});

// Query Document with Logical Operator from Collection
db.products.find({
  $and: [{ category: { $in: ["smartphone", "laptop"] } }, { price: { $gt: 20000000 } }],
});

db.products.find({
  category: {
    $not: { $in: ["smartphone", "laptop"] },
  },
});

db.products.find({
  price: {
    $gte: 10000000,
    $lte: 20000000,
  },
  category: {
    $ne: "food",
  },
});

// Query Document with Element Operator from Collection
db.products.find({
  category: {
    $exists: true,
  },
});

db.products.find({
  category: {
    $exists: false,
  },
});

db.products.find({
  category: {
    $type: "string",
  },
});

db.products.find({
  price: {
    $type: ["int", "long"],
  },
});

// Query Document with Expression from Collection
// insert customers dengan _id dan name yang sama
db.customers.insertOne({
  _id: "astri",
  name: "astri",
});

db.customers.find({
  $expr: {
    $eq: ["$_id", "$name"],
  },
});

// Query Document with JSON Schema from Collection
db.products.find({
  $jsonSchema: {
    required: ["name", "category"],
  },
});

db.products.find({
  $jsonSchema: {
    required: ["name"],
    properties: {
      name: {
        type: "string",
      },
      price: {
        type: "number",
      },
    },
  },
});

// Query Document with mod from Collection
db.products.find({
  price: {
    $mod: [5, 0],
  },
});

db.products.find({
  price: {
    $mod: [10000000, 0],
  },
});

// Query Document with regex from Collection
db.products.find({
  name: {
    $regex: /mie/,
    $options: "i",
  },
});

db.products.find({
  name: {
    $regex: /^Mie/,
  },
});

// Query Document with where from Collection
db.customers.find({
  $where: function () {
    return this._id == this.name;
  },
});

// Inset products with tags

db.products.insertMany([
  {
    _id: 6,
    name: "Logitech Wireless Mouse",
    price: new NumberLong("175000"),
    category: "Laptop",
    tags: ["Logitech", "mouse", "accessories"],
  },
  {
    _id: 7,
    name: "Cooler Pad Gaming",
    price: new NumberLong("200000"),
    category: "Laptop",
    tags: ["cooler", "laptop", "accessories", "fan"],
  },
  {
    _id: 8,
    name: "Samsung Curved Monitor",
    price: new NumberLong("1750000"),
    category: "computer",
    tags: ["samsung", "monitor", "computer"],
  },
]);

// Query Document with Array Query from Collection

db.products.find({
  tags: {
    $all: ["samsung", "computer"],
  },
});

db.products.find({
  tags: {
    $elemMatch: {
      $in: ["samsung", "logitech"],
    },
  },
});

db.products.find({
  tags: {
    $size: 3,
  },
});

// Projection Operator

db.products.find(
  {},
  {
    name: 1,
    category: 1,
  }
);

db.products.find(
  {},
  {
    tags: 0,
  }
);

// $elemMatch Projection Operator
db.products.find(
  {},
  {
    name: 1,
    tags: {
      $elemMatch: {
        $in: ["samsung", "logitech"],
      },
    },
  }
);

// $  Projection Operator
db.products.find(
  {
    tags: {
      $exists: true,
    },
  },
  {
    name: 1,
    "tags.$": 1,
  }
);

// $slice Projection Operator
db.products.find(
  {
    tags: {
      $exists: true,
    },
  },
  {
    name: 1,
    tags: {
      $slice: 2,
    },
  }
);

// Query Modifier
db.products.find({}).count();

db.products.find({}).limit(4);

db.products.find({}).skip(2);

db.products.find({}).limit(4).skip(2);

db.products.find({}).sort({
  category: 1,
  name: -1,
});

// Update Sytax
// update one
db.customers.updateOne(
  {}, // filter
  {}, // update
  {} // options
);

db.products.updateOne(
  {
    _id: "1",
  },
  {
    $set: {
      category: "food",
    },
  }
);

db.products.updateOne(
  {
    _id: "2",
  },
  {
    $set: {
      category: "food",
    },
  }
);

// update many
db.customers.updateMany(
  {}, // filter
  {}, // update
  {} // options
);

db.products.updateMany(
  {
    $and: [
      {
        category: {
          $eq: "food",
        },
      },
      {
        tags: {
          $exists: false,
        },
      },
    ],
  },
  {
    $set: {
      tags: ["food"],
    },
  }
);

// replace one
db.customers.replaceOne(
  {}, // filter
  {}, // update
  {} // options
);

// insert wrong document
db.products.insertOne({
  _id: 9,
  name: "Ups Salah",
  wrong: "Salah Lagi",
});

db.products.replaceOne(
  {
    _id: 9,
  },
  {
    name: "Adidas Sepatu lari Pria",
    price: new NumberLong("1100000"),
    category: "shoes",
    tags: ["adidas", "shoes", "running"],
  }
);

// Field Update Operator
// $set
db.products.updateMany(
  {},
  {
    $set: {
      stock: 0,
    },
  }
);

// $inc
db.products.updateMany(
  {},
  {
    $inc: {
      stock: 10,
    },
  }
);

// $rename
db.customers.updateMany(
  {},
  {
    $rename: {
      name: "full_name",
    },
  }
);

// $unset
// wrong update
db.customers.updateMany(
  {},
  {
    $set: {
      wrong: "ups",
    },
  }
);

db.customers.updateMany(
  {},
  {
    $unset: {
      wrong: "",
    },
  }
);

// $currentDate
db.products.updateMany(
  {},
  {
    $currentDate: {
      lastModifiedDate: {
        $type: "date",
      },
    },
  }
);

// Array Update Operator
// $
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

db.products.updateMany(
  {
    ratings: 90,
  },
  {
    $set: {
      "ratings.$": 100,
    },
  }
);

// $[]
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[]": 100,
    },
  }
);

// $[<identifiera>]
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[element]": 100,
    },
  },
  {
    arrayFilters: [
      {
        element: {
          $gte: 80,
        },
      },
    ],
  }
);

// <index>
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.0": 50,
      "ratings.1": 60,
    },
  }
);

// $addToSet
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $addToSet: {
      tags: "popular",
    },
  }
);

// $pop
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $pop: {
      ratings: -1,
    },
  }
);

db.products.updateOne(
  {
    _id: 2,
  },
  {
    $pop: {
      ratings: 1,
    },
  }
);

// $pull
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

db.products.updateMany(
  {},
  {
    $pull: {
      ratings: {
        $gte: 80,
      },
    },
  }
);

// $push
db.products.updateMany(
  {},
  {
    $push: {
      ratings: 100,
    },
  }
);

// $pullAll
db.products.updateMany(
  {},
  {
    $pullAll: {
      ratings: [100],
    },
  }
);

// Array Update Operator Modifier
// $each
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300, 70],
      },
    },
  }
);

db.products.updateMany(
  {},
  {
    $addToSet: {
      tags: {
        $each: ["trending", "popular"],
      },
    },
  }
);

// $position
db.products.updateMany(
  {},
  {
    $push: {
      tags: {
        $each: ["hot"],
        $position: 1,
      },
    },
  }
);

// $slice
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300, 400, 500],
        $slice: 10,
        $sort: -1,
      },
    },
  }
);

// sort
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300, 400, 500],
        $sort: -1,
      },
    },
  }
);

// Delete Document
// deleteOne
db.customers.insertOne({
  _id: "spammer",
  full_name: "Spammer",
});

db.customers.deleteOne({
  _id: "spammer",
});

// deleteMany
db.customers.insertMany([
  {
    _id: "spammer1",
    full_name: "Spammer",
  },
  {
    _id: "spammer2",
    full_name: "Spammer",
  },
  {
    _id: "spammer3",
    full_name: "Spammer",
  },
]);

db.customers.deleteMany({
  _id: {
    $regex: "spammer",
  },
});

// blukWrite
db.customers.bulkWrite([
  {
    insertOne: {
      document: {
        _id: "fatikhatul",
        full_name: "Fatikhatul",
      },
    },
  },
  {
    insertOne: {
      document: {
        _id: "hana",
        full_name: "Hana",
      },
    },
  },
  {
    updateMany: {
      filter: {
        _id: {
          $in: ["fatikhatul", "hana"],
        },
      },
      update: {
        $set: {
          full_name: "Fatikhatul Hana",
        },
      },
    },
  },
]);

// Indexes
// Single Field Index
db.products.createIndex({
  category: 1,
});

db.products.getIndexes();

db.products.dropIndex("category_1");

db.products.find({
  category: "food",
});

db.products.find({
    category: "food",
  }).explain();

db.products.find({}).sort({
    category: 1,
  }).explain();

db.products.find({
    tags: "laptop",
  }).explain();

// Compound Index
db.products.createIndex({
  stock: 1,
  tags: 1
});

db.products.getIndexes();

db.products.find({
  stock: 10,
  tags: "popular"
});

db.products.find({
  stock: 10
}).explain();

db.products.find({
  stock: 10,
  tags: "popular"
}).explain();

db.products.find({
  tags: "popular"
}).explain();

// Text Indexes
 db.products.createIndex({
  name: "text",
  category: "text",
  tags: "text"
 }, {
  weights: {
    name: 10,
    category: 5,
    tags: 1
  }
 });

 db.products.getIndexes();

 db.products.find({
  $text: {
    $search: "mie"
  }
 });

 db.products.find({
  $text: {
    $search: "mie laptop"
  }
 });

 db.products.find({
  $text: {
    $search: '"mie sedap"'
  }
 });

 db.products.find({
  $text: {
    $search: "mie -sedap"
  }
 });

 db.products.find({
  $text: {
    $search: "mie -sedap"
  }
 }).explain();

// $meta Operator
db.products.find({
  $text: {
    $search: "mie laptop"
  }
 }, {
  searchScore:{
    $meta: "textScore"
  }
 });

// wildcard indexes
db.customers.createIndex({
  "customFields.$**" : 1
});

db.customers.getIndexes();

db.customers.insertMany([
  {
    _id: "budi",
    full_name: "Budi",
    customFields: {
      hobby: "Gaming",
      university: "Universitas Belum Ada"
    }
  },
  {
    _id: "rully",
    full_name: "Rully",
    customFields: {
      ipk: 3.9,
      university: "Universitas Belum Ada"
    }
  },
  {
    _id: "rudi",
    full_name: "Rudi",
    customFields: {
      motherName: "Tini",
      passion: "Entepreneur"
    }
  },
]);

db.customers.find({
  "customFields.passion" : "Entepreneur"
}).explain();

db.customers.find({
  "customFields.ipk" : "3.9"
}).explain();

db.customers.find({
  "customFields.hobby" : "Gaming"
}).explain();

// Index properties Time To LIve / TTL
db.createCollection("sessions");

db.sessions.createIndex({
  createdAt: 1
}, {
  expireAfterSeconds : 10
});

db.sessions.insertOne({
  _id: 1,
  session: "Session 1",
  createdAt: new Date()
});

db.sessions.find();


// Unique Index
db.customers.createIndex({
  email:1
}, {
  unique: true,
  sparse: true
})

db.customers.updateOne({
  _id: "aanwidiant"
}, {
  $set : {
    email : "aanwidiant@example.com"
  }
});

db.customers.updateOne({
  _id: "astri"
}, {
  $set : {
    email : "aanwidiant@example.com"
  }
});

// Case Insensitive
db.customers.createIndex({
  full_name: 1
}, {
  collation: {
    locale: "en",
    strength: 2
  }
});

db.customers.find({
  full_name: "Aan Widianto"
});

db.customers.find({
  full_name: "AAN WIDIANTO"
}).collation({
  locale: "en",
  strength: 2
});

// Partial
db.products.createIndex({
  price: 1
}, {
  partialFilterExpression: {
    stock: {
      $gt: 0
    }
  }
});

db.products.find({
  price: {
    $gt: 1000000
  }, 
  stock: {
    $gt: 0
  }
}).explain();

// security
// User Admin
// use admin;

db.createUser({
  user: 'mongo',
  pwd: 'mongo',
  roles: [
    'userAdminAnyDatabase',
    'readWriteAnyDatabase'
  ]
});

// user management
db.createUser(
  {
    user: "contoh",
    pwd: "contoh",
    roles: [
      {role: "read", db: "test"}
    ]
  }
);

db.createUser(
  {
    user: "contoh2",
    pwd: "contoh2",
    roles: [
      {role: "readWrite", db: "test"}
    ]
  }
);

db.getUsers();

db.sample.insertOne({
  _id: 1,
  name: "aan"
})

db.changeUserPassword("contoh", "rahasia");

db.dropUser("contoh");

db.updateUser("contoh2", 
  {
    roles: [
      {role : "readWrite", db: "test"},
      {role : "readWrite", db: "belajar"}
    ]
  }
);

// Role Management
db.createRole({
  role: "session_management",
  privileges : [
    {
      resource: {
        db: "belajar",
        collection: "sessions"
      },
        actions: ["insert"]
    }
  ],
  roles: [
    {
      role: "read",
      db: "belajar"
    }
  ]
});

db.getRoles({showPrivileges:true});

db.createUser({
  user: "dwi",
  pwd: "dwi",
  roles: ["session_management"]
});

db.sessions.find();

db.customers.insertOne({
  _id: "widiant",
  name: "Widiant",
});

db.sessions.insertOne({
  _id: "test",
  name: "test"
});

db.sessions.deleteOne({
  _id: "test"
});

db.sessions.updateOne({
  _id: "test"
}, {
  $set: {
    name: "ubah"
  }
});




