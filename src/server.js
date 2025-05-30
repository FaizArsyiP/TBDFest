import express from 'express';
import userRouter from './app/api/user/route.js'; // relatif dari src/

const app = express();
app.use(express.json());
app.use('/', userRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
