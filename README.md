
<h1 align="center">
  EcoCart
</h1> 
A full-stack e-commerce website called EcoCart made using the MERN stack (MongoDB, Express.js, React.js, Node.js). 

## Run it locally

```
git clone https://github.com/nadeem-R17/EcoCart.git
```
### install the dependencies: -

```
npm i
```

### For database setup:

create a .env file in backend folder and add your MongoDB connection credentials
```
MONGODB_URI=mongodb://localhost:27017/your-database-name
```

also add a secret key in your .env file (anything you like)
```
SECRET_KEY=your_secrect_key
```

### Run your backend and frontend separately

for backend: go to backend folder in your terminal and run the command:
```
node index.js
```

for frontend: open a separate terminal, go frontend folder directory and run the following command:
```
npm run dev
```


