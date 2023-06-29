import { Router } from "express"

const router = Router()

router.get("/categories", (req, res) => {
  res.send("categories")
})

export default router
