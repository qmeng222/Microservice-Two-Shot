# Wardrobify

Team:

- Carmen Tang:
<<<<<<< HEAD
- hats React components: http://localhost:3000/hats
=======
- hats microservice: http://localhost:8090/hats
>>>>>>> main

- Qingying Meng:
- shoes React components: http://localhost:3000/shoes

## Design

## Shoes microservice

- wardrobe API: 8000
- browser/Insomnia: 8100
- shoes microservice: 8080
- hats microservice: 8090

Shoes microservice has two models:

1. BinVO:

   - Send a request to the Wordrobe bin every minute (through poller.py) to get an update.
   - Store the data polled from the wardrobe bin.
   - Use the stored bin data to create / update / delete shoes, ...

2. Shoes:

   - Model attributes: manufacturer, model name, color, picture url, and bin.
   - views.py contains functions to list, create, delete shoes through RESTful API.
   - At the front end (http://localhost:3000/shoes), we can list, create, and delete shoes through the React components.

## Hats microservice

- Create Hat model
- Create Hat Encoders
- Create Hat Views using encoders
- Create Hat List view in React
- Create Hatform for making hat in React
- Create delete button for each hat
