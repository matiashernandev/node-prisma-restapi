import { Router } from "express"

const router = Router()

router.get("/products", (req, res) => {
  res.send("products")
})

export default router
