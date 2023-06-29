import { Router } from "express"
import { prisma } from "../db.js"

const router = Router()

router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany()

  res.json(products)
})

router.get("/product/:id", async (req, res) => {
  const productFound = await prisma.product.findFirst({
    where: {
      //id: parseInt(req.params.id),
      id: +req.params.id,
    },
    include: {
      categoty: true,
    },
  })

  if (!productFound) return res.status(400).json({ error: "Product not found" })

  res.json(productFound)
})

router.post("/products", async (req, res) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  })

  res.json(newProduct)
})

router.delete("/product/:id", async (req, res) => {
  const productDeleted = await prisma.product.delete({
    where: {
      //id: parseInt(req.params.id),
      id: +req.params.id,
    },
  })

  if (!productDeleted)
    return res.status(400).json({ error: "Product not found" })

  res.json(productDeleted)
})

router.put("/product/:id", async (req, res) => {
  try {
    const productUpdated = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    })
    res.json(productUpdated)
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

export default router
