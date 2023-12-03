// mirageServer.js
import { createServer } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = 'api';

      this.get('/get', (schema) => {
        return schema.db.items;
      });

      this.post('/items', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.db.items.create(attrs);
      });

      this.patch('/items/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let item = schema.db.items.find(id);
        return item.update(newAttrs);
      });

      this.del('/items/:id', (schema, request) => {
        let id = request.params.id;
        schema.db.items.find(id).destroy();
        return {};
      });
    },
  });

  server.db.loadData({
    items: [
        {
            "name": "Nakup na víkend",
            "note": "Kup rychle,vykoupí!",
            "activeList": false,
            "ownerId": 4586623265,
            "userId": [
              {"userId": 1234567890},
              {"userId": 1111111111},
              {"userId": 3333333333},
              {"userId": 5555555555},
              {"userId": 7777777777},
              {"userId": 5656565656}
                ],  
            "listOfItems": [
              {
                "id": "0",
                "done": true,
                "listItem": "Mrkev",
                "amount": "20",
                "units": "kg"
            },
            {
                "id": "1",
                "done": false,
                "listItem": "Mléko",
                "amount": "10",
                "units": "l"
            },
            {
                "id": "2",
                "done": true,
                "listItem": "Rohlíky",
                "amount": "50",
                "units": "kus"
            },
            {
                "id": "3",
                "done": true,
                "listItem": "Sůl",
                "amount": "3",
                "units": "špetky"
            },
            {
                "id": "4",
                "done": false,
                "listItem": "Pivo",
                "amount": "10",
                "units": "plechovek"
            },
            {
                "id": "5",
                "done": true,
                "listItem": "Víno",
                "amount": "1",
                "units": "láhev"
            },  
            {
              "id": "6",
              "done": false,
              "listItem": "Pepsi",
              "amount": "1",
              "units": "litr"
            },  
            {
              "id": "7",
              "done": false,
              "listItem": "Tatranka",
              "amount": "10",
              "units": "ks"
           }, 
           {
             "id": "8",
             "done": true,
             "listItem": "Mouka",
             "amount": "1",
             "units": "kg"
            }
            ],
            "_id": "bbe82094682e200"
          },
          
          {
            "name": "Ctěl bych koupit něco na víkend",
            "note": "Kup rychle,vykoupí!",
            "activeList": true,
            "ownerId": 4586623265,
            "userId": [
              {"userId": 1234567890},
              {"userId": 1111111111},
              {"userId": 3333333333},
              {"userId": 5555555555},
              {"userId": 7777777777},
              {"userId": 5656565656}
                ],  
            "listOfItems": [
              {
                "id": "0",
                "done": true,
                "listItem": "Mrkev",
                "amount": 1,
                "units": "kg"
              },
              {
                "id": "1",
                "done": false,
                "listItem": "Máslo",
                "amount": 1,
                "units": "ks"
              },
              {
                "id": "2",
                "done": false,
                "listItem": "Mléko",
                "amount": 2,
                "units": "l"
              }
            ],
            "_id": "bbe82094682e300"
          },
          {
            "name": "Tohle je potřeba na oslavu 15.12.2023",
            "note": "Kup rychle, než to vykoupí!",
            "activeList": false,
            "ownerId": 1234567890,
            "userId": [
              {"userId": 1234567890},
              {"userId": 1111111111},
              {"userId": 3333333333},
              {"userId": 5555555555},
              {"userId": 4586623265},
              {"userId": 5656565656}
                ],  
              "listOfItems": [
              {
                "id": "0",
                "done": false,
                "listItem": "Mrkev",
                "amount": 1,
                "units": "kg"
              },
              {
                "id": "1",
                "done": true,
                "listItem": "Máslo",
                "amount": 1,
                "units": "ks"
              },
              {
                "id": "2",
                "done": false,
                "listItem": "Mléko",
                "amount": 2,
                "units": "l"
              }
            ],
            "_id": "bb82089462e201"
      
          },
          {
            "name": "Tohle je na tenhle víkend 12.3.2023",
            "note": "Kup rychle, než to vykoupí!",
            "activeList": true,
            "ownerId": 7777777777,
            "userId": [
              {"userId": 1234567890},
              {"userId": 1111111111},
              {"userId": 3333333333},
              {"userId": 5555555555},
              {"userId": 7777777777},
              {"userId": 5656565656}
                ],  
              "listOfItems": [
              {
                "id": "0",
                "done": true,
                "listItem": "Mrkev",
                "amount": 1,
                "units": "kg"
              },
              {
                "id": "1",
                "done": false,
                "listItem": "Máslo",
                "amount": 1,
                "units": "ks"
              },
              {
                "id": "2",
                "done": true,
                "listItem": "Mléko",
                "amount": 2,
                "units": "l"
              }
            ],
            "_id": "bbe82089462202"
          },
          {
            "name": "Nákup pro babičku 12.3.2023",
            "note": "Kup rychle, než to vykoupí!",
            "activeList": false,
            "ownerId": 1234567890,
            "userId": [
              {"userId": 1234567890},
              {"userId": 1111111111},
              {"userId": 3333333333},
              {"userId": 5555555555},
              {"userId": 7777777777},
              {"userId": 5656565656}
                ],  
              "listOfItems": [
              {
                "id": "0",
                "done": false,
                "listItem": "Mrkev",
                "amount": 1,
                "units": "kg"
              },
              {
                "id": "1", 
                "done": false,
                "listItem": "Máslo",
                "amount": 1,
                "units": "ks"
              },
              {
                "id": "2",
                "done": true,
                "listItem": "Mléko",
                "amount": 2,
                "units": "l"
              }
            ],
            "_id": "bbe820862e203"
          },
          {
            "name": "Nákup na chalupu Karlovy Vary 12.3.2023",
            "note": "Kup rychle, než to vykoupí!",
            "activeList": true,
            "ownerId": 7777777777,
            "userId": [
              {"userId": 1111111111},
              {"userId": 3333333333},
              {"userId": 5555555555},
              {"userId": 7777777777},
              {"userId": 5656565656}
                ],  
              "listOfItems": [
              {
                "id": "0",
                "done": false,
                "listItem": "Mrkev",
                "amount": 1,
                "units": "kg"
              },
              {
                "id": "1",
                "done": true,
                "listItem": "Máslo",
                "amount": 1,
                "units": "ks"
              },
              {
                "id": "2",
                "done": false,
                "listItem": "Mléko",
                "amount": 2,
                "units": "l"
              }
            ],
            "_id": "bbe920862e204"
          },
          {
            "name": "Nákup",
            "note": "Kup rychle, než to vykoupí!",
            "activeList": false,
            "ownerId": 4586623265,
            "userId": [  
              {"userId": 1234567890},
              {"userId": 1111111111},
              {"userId": 3333333333},
              {"userId": 5555555555},
              {"userId": 7777777777},
              {"userId": 5656565656} 
                  ],  
              "listOfItems": [
              {
                "id": "0",
                "done": true,
                "listItem": "Mrkev",
                "amount": 1,
                "units": "kg"
              },
              {
                "id": "1",
                "done": false,
                "listItem": "Máslo",
                "amount": 1,
                "units": "ks"
              },
              {
                "id": "2",
                "done": true,
                "listItem": "Mléko",
                "amount": 2,
                "units": "l"
              }
            ],
            "_id": "bbe8208cc62e205"
          },
      // Add more sample data as needed
    ],
  });

  return server;
}
