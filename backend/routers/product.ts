import express, { Request, Response } from 'express'
import UserRequest from '../interface/UserRequest'
const router = express.Router()
import { productRepository } from '../db'

router.get('/', async (req: UserRequest, res: Response) => {
    const page = req.query.page ? +req.query.page : 1
    const order = req.query.order || 'ASC' as any
    const limit = 5
    const query = productRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.company', 'company')
        .take(limit)
        .skip((page - 1) * limit)

    if (req.query.name) {
        query.where('product.name like LOWER(:name)', { name: `%${(req.query.name as string).toLowerCase()}%` })
    }
    if (req.query.company) {
        query.where('product.company.id = :companyId', { companyId: +req.query.company })
    }
    if (req.query.category) {
        query.where('product.category = :category', { category: req.query.category })
    }
    if (req.query.order) {
        query.orderBy('product.name', order)
    }
    if (req.query.last) {
        query.orderBy('product.createdAt', 'DESC')
    }
    const products = await query.getMany()
    const totalRecord = await query.getCount()

    return res.status(200).json({ count: totalRecord, total: Math.ceil(totalRecord / limit), products })
})

router.get('/categories', (_, res: Response) => {
    return res.status(200).json(['phone', 'laptop', 'car', 'headphone'])
})

router.post('/', async (req: UserRequest, res: Response) => {
    const product = await productRepository.save(req.body)
    return res.status(201).json(product)
})

router.get('/:id', async (req: UserRequest, res: Response) => {
    try {
        const product = await productRepository.findOneOrFail({ where: { id: +req.params.id }, relations: ['company'] })
        return res.status(200).json(product)
    } catch (e) {
        return res.status(404).json({ message: 'not found' })
    }
})

router.delete('/:id', async (req: UserRequest, res: Response) => {
    const product = await productRepository.delete({ id: +req.params.id })
    return res.status(200).json(product)
})

router.patch('/:id', async (req: UserRequest, res: Response) => {
    const product = await productRepository.update({ id: +req.params.id }, req.body)
    return res.status(200).json(product)
})

export default router