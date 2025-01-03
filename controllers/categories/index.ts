import { Request, Response } from 'express';

export const getCategories = async (req: Request, res: Response) : Promise<any> => {
  try {

  } catch (err) {
    return res.status(500).json({msg:"Internal Server Error"});
  }
}