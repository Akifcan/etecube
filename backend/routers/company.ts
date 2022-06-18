import express, { Request, Response } from 'express'
import UserRequest from '../interface/UserRequest'
const router = express.Router()
import { companyRepository } from '../db'

router.get('/', async (req: UserRequest, res: Response) => {
    const page = req.query.page ? +req.query.page : 1
    const order = req.query.order || 'ASC' as any
    const limit = 5
    const query = companyRepository.createQueryBuilder('company')
        .skip(page - 1)
        .take(limit)
        .orderBy('company.name', order)
    const totalRecord = await companyRepository.count()
    if (req.query.name) {
        query.where('company.name like LOWER(:name)', { name: `%${(req.query.name as string).toLowerCase()}%` })
    }
    const companies = await query.getMany()
    res.status(200).json({ total: Math.ceil(totalRecord / limit), companies })
})

router.get('/all', async (_, res: Response) => {
    const companies = await companyRepository.find()
    return res.status(200).json(companies)
})

router.post('/', async (req: UserRequest, res: Response) => {
    const company = await companyRepository.save(req.body)
    res.status(201).json(company)
})

router.get('/:id', async (req: UserRequest, res: Response) => {
    try {
        const company = await companyRepository.findOneByOrFail({ id: +req.params.id })
        res.status(200).json(company)
    } catch (e) {
        res.status(404).json({ message: 'not found' })
    }
})

router.delete('/:id', async (req: UserRequest, res: Response) => {
    const company = await companyRepository.delete({ id: +req.params.id })
    res.status(200).json(company)
})

router.patch('/:id', async (req: UserRequest, res: Response) => {
    const company = await companyRepository.update({ id: +req.params.id }, req.body)
    res.status(200).json(company)
})

export default router