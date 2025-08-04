import ItemOrderCount from "../../Models/ItemOrderCount";
import ItemViewCount from "../../Models/ItemViewCount";
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
  const newstat = new Stat({
    type:"purchase",
    productId: stat.productId,
    purchaseId: stat.purchaseId,
    ip: stat.ip
  });
  await newstat.save();
}

export const updateViewCounter = async (productId: string) => {
  const viewCounter = await ItemViewCount.findOne({productId});
  if(!viewCounter) {
    await (new ItemViewCount({
      productId,
      amount: 0
    })).save()
  }
  await ItemViewCount.findOneAndUpdate({productId}, {$inc:{amount:1}});
}

export const updateBuyCounter = async (productId: string) => {
  const buyCounter = await ItemOrderCount.findOne({productId});
  if(!buyCounter) {
    await (new ItemOrderCount({
      productId,
      amount: 0
    })).save();
  }
  await ItemOrderCount.findOneAndUpdate({productId}, {$inc:{amount: 1}});

}