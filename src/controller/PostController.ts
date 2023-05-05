import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { GetPostsSchema } from "../dtos/Post/getPosts.dto"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"

export class PostController{
    constructor(
        private postBusiness: PostBusiness
    ){}
    public getPosts = async (req:Request, res: Response) => {

        try {

            const input = GetPostsSchema.parse({
                query: req.query.query,
                token: req.headers.authorization
            })

            const output = await this.postBusiness.getPosts(input)
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado.")
              }
        }
    }
}