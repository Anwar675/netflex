import bcypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const {email,name, password} = req.body

        const exitingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        }) 

        if(exitingUser) {
            return res.status(422).json({error: 'Email taken'})
        }

        const hashedPassword = await bcypt.hash(password, 12)
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image:'',
                emailVerified: new Date()
            }
        })
        return res.status(200).json(user)
    } catch(error) {
        console.log(error)
        return res.status(400).end()
    }
}