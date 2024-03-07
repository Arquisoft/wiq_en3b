import { Request, Response } from 'express';
import { USER_SERVICE_URL } from '../utils/constants';
import axios from 'axios';

const addUser = async (req: Request, res: Response) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(
      USER_SERVICE_URL + '/adduser',
      req.body
    );
    res.json(userResponse.data);
  } catch (error: any) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
};

export { addUser };
