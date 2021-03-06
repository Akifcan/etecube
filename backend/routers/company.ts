import express, { Request, Response } from 'express'
import UserRequest from '../interface/UserRequest'
const router = express.Router()
import { companyRepository } from '../db'

router.get('/', async (req: UserRequest, res: Response) => {
    const page = req.query.page ? +req.query.page : 1
    const order = req.query.order || 'ASC' as any
    const limit = 5
    const query = companyRepository.createQueryBuilder('company')
        .take(limit)
        .skip((page - 1) * limit)
    const totalRecord = await companyRepository.count()
    if (req.query.name) {
        query.where('company.name like LOWER(:name)', { name: `%${(req.query.name as string).toLowerCase()}%` })
    }
    if (req.query.last) {
        query.orderBy('company.createdAt', 'DESC')
    }
    if (req.query.order) {
        query.orderBy('company.name', order)
    }
    const companies = await query.getMany()

    return res.status(200).json({ count: totalRecord, total: Math.ceil(totalRecord / limit), companies })
})

router.get('/all', async (_, res: Response) => {
    const companies = await companyRepository.find()
    return res.status(200).json(companies)
})

router.post('/', async (req: UserRequest, res: Response) => {
    const company = await companyRepository.save(req.body)
    return res.status(201).json(company)
})

router.get('/:id', async (req: UserRequest, res: Response) => {
    try {
        const company = await companyRepository.findOneByOrFail({ id: +req.params.id })
        return res.status(200).json(company)
    } catch (e) {
        return res.status(404).json({ message: 'not found' })
    }
})

router.delete('/:id', async (req: UserRequest, res: Response) => {
    const company = await companyRepository.delete({ id: +req.params.id })
    return res.status(200).json(company)
})

router.patch('/:id', async (req: UserRequest, res: Response) => {
    const company = await companyRepository.update({ id: +req.params.id }, req.body)
    return res.status(200).json(company)
})

export default router