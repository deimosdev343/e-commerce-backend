import { Router } from 'express';
const ProductRouter = Router();

ProductRouter.get('/', (req, res) => {
  res.send("TEST GET");
})

ProductRouter.get("/:id", (req, res) => {
res.send("TEST GET :ID");
});

ProductRouter.post("/", (req, res) => {
  res.send("TEST POST");
})

export default ProductRouter;