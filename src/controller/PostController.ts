import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { GetPostsInputDTO, GetPostsOutputDTO, GetPostsSchema } from "../dtos/Post/getPosts.dto"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { CreatePostInputDTO, CreatePostOutputDTO, CreatePostSchema } from "../dtos/Post/createPost.dto"
import { EditPostByIdInputDTO, EditPostByIdOutputDTO, EditPostByIdSchema } from "../dtos/Post/editPostById.dto"
import { DeletePostByIdSchema } from "../dtos/Post/deletePostById.dto"

export class PostController{
    constructor(
        private postBusiness: PostBusiness
    ){}

    public createPost = async (req:Request, res: Response):Promise<void> => {
        try {
            const input:CreatePostInputDTO = CreatePostSchema.parse({
              content: req.body.content,
              token: req.headers.authorization
            })
      
            const output:CreatePostOutputDTO = await this.postBusiness.createPost(input)
            res.status(201).send(output)
  
          } catch (error) {
            console.log(error)
      
            if (error instanceof ZodError) {
              res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else {
              res.status(500).send("Erro inesperado.")
            }
        }
    }

    public getPosts = async (req:Request, res: Response):Promise<void> => {

        try {
            const input:GetPostsInputDTO = GetPostsSchema.parse({
                query: req.query.query,
                token: req.headers.authorization
            })

            const output:GetPostsOutputDTO = await this.postBusiness.getPosts(input)
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

    public editPostById = async (req:Request, res: Response):Promise<void> => {
        try {
            const input:EditPostByIdInputDTO = EditPostByIdSchema.parse({
                idToEditPost: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })
      
            const output:EditPostByIdOutputDTO = await this.postBusiness.editPostById(input)
            res.status(200).send(output)
  
          } catch (error) {
            console.log(error)
      
            if (error instanceof ZodError) {
              res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else {
              res.status(500).send("Erro inesperado.")
            }
        }
    }

    public deletePostById = async (req: Request, res: Response) => {
        try {
          const input = DeletePostByIdSchema.parse({
            idToDelete: req.params.id,
            token: req.headers.authorization
          })
    
          const output = await this.postBusiness.deletePostById(input)
          res.status(200).send(output)
  
        } catch (error) {
          console.log(error)
    
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