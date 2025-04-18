import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/severAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        return res.status(405).end()
    }
    try {
        const {currentUser} = await serverAuth(req,res)
        const favoriteMovie = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favorieIds,
                }
            }
        })

        return res.status(200).json(favoriteMovie)
    } catch(error) {
        console.log(error)
        return res.status(400).end()
    }
}