import Stat, { IStat } from "../../Models/Stat";

export const createViewStatistic = async (stat :IStat) => {
  const newStat = new Stat({
    type:"view",
    productId:stat.productId,
    purchaseId:"",
    ip:stat.ip
  });
  await newStat.save();
}

export const createOrderStatistic = async (stat: IStat) => {

}