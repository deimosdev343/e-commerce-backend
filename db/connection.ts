import {connect} from 'mongoose';

export const connection = async () => {
    if(!process.env.DB) {
      throw Error("No DB URI Provided");
    }
    if(process.env.DB) {
      console.log(process.env.DB);
      await connect(process.env.DB);
      console.log("DB Sucessfully Connected");
    }
}