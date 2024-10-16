/* eslint-disable @typescript-eslint/no-var-requires */
import { Response } from "express";
const success = (res: Response, message: string = "", data: any = null) => {
  res.status(200).json({
    status: 200,
    success: true,
    notification: message,
    data,
  });
};

const error = (res: Response, error: any = "", data: any = null) => {
    res.status(422).json({
      status: 422,
      success: false,
      notification: error.message,
      data,
    });
  };

  const validationError = (res: Response, message: any = "", data: any = null) => {
    res.status(422).json({
      status: 422,
      success: false,
      notification: message,
      data,
    });
  };
  const unauthorized = (res: Response, message: any = "", data: any = null) => {
    res.status(401).json({
      status: 401,
      success: false,
      notification: message,
      data,
    });
  };

export default { success,error,validationError,unauthorized };
