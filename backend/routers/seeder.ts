import express, { Response } from 'express'
const router = express.Router()

import { userRepository, companyRepository, productRepository } from '../db'

router.get('/', async (_, res: Response) => {

    await userRepository.delete({})
    await companyRepository.delete({})
    await productRepository.delete({})

    // Create Users

    const user1 = await userRepository.save({ firstName: 'akifcan', lastName: 'kara', email: 'akif@mail.com', password: '827ccb0eea8a706c4c34a16891f84e7b' })
    const user2 = await userRepository.save({ firstName: 'john', lastName: 'doe', email: 'john@mail.com', password: '827ccb0eea8a706c4c34a16891f84e7b' })
    const user3 = await userRepository.save({ firstName: 'lena', lastName: 'doe', email: 'lena@gmail.com', password: '827ccb0eea8a706c4c34a16891f84e7b' })

    // Create Companies

    const company1 = await companyRepository.save({ name: 'microsoft', legalNumber: '535', country: 'usa', 'website': 'www.microsoft.com' })
    const company2 = await companyRepository.save({ name: 'lenovo', legalNumber: '135', country: 'china', 'website': 'www.lenovo.com' })
    const company3 = await companyRepository.save({ name: 'atlassian', legalNumber: '235', country: 'australia', 'website': 'www.atlassian.com' })
    const company4 = await companyRepository.save({ name: 'github', legalNumber: '535', country: 'usa', 'website': 'www.github.com' })
    const company5 = await companyRepository.save({ name: 'facebook', legalNumber: '535', country: 'usa', 'website': 'www.facebook.com' })

    // Create Products

    const product1 = await productRepository.save({ name: 'ms surface', amount: 10, category: 'phone', company: company1 })
    const product2 = await productRepository.save({ name: 'ms surface 2', amount: 20, category: 'phone', company: company1 })
    const product3 = await productRepository.save({ name: 'nokia lumia 520', amount: 40, category: 'phone', company: company1 })
    const product4 = await productRepository.save({ name: 'lenovo yoga', amount: 20, category: 'laptop', company: company2 })
    const product5 = await productRepository.save({ name: 'lenovo yoga 530', amount: 10, category: 'laptop', company: company2 })
    const product6 = await productRepository.save({ name: 'bitbucket', amount: 10, category: 'car', company: company3 })
    const product7 = await productRepository.save({ name: 'jira', amount: 500, category: 'car', company: company3 })
    const product8 = await productRepository.save({ name: 'github tablet', amount: 20, category: 'laptop', company: company4 })
    const product9 = await productRepository.save({ name: 'github cpu', amount: 10, category: 'laptop', company: company4 })
    const product10 = await productRepository.save({ name: 'instagram', amount: 10, category: 'headphone', company: company5 })


    res.status(201).json({
        user1, user2, user3,
        company1, company2, company3, company4, company5,
        product1, product2, product3, product4, product5, product6, product7, product8, product9, product10
    })
})

export default router