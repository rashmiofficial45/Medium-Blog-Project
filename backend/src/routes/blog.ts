import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import { blogInput, updateBlogInput } from "@rashmi_45/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
		JWT_SECRET: string,
    },
    Variables:{
        userId:string
    }
}>();
//Auth Middleware 
blogRouter.use('/*', async (c,next) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL
		}).$extends(withAccelerate());
		const header = c.req.header('Authorization') || "";
		if (!header || !header.startsWith("Bearer ")){
			c.status(403);
			return c.json({ error: "UnAuthorized Access" });
		}
		const token = header.split(' ')[1]
		console.log(header)
		console.log(token)
		const response = await verify(token,c.env.JWT_SECRET)
		console.log(response)
		if (response){
            c.set("userId",response.id)
			await next()
		}
		else{
			c.status(403);
			return c.json({ error: "Unauthorized Access" });
		}}
)

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success }=blogInput.safeParse(body)
	if (!success){
		c.status(411);
		return c.json({ error: "Input not correct" });
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:authorId
            }
        })
        return c.json({
            id:blog.id
        })
    } catch (error) {
        c.status(403)
        return c.json({ error: "Unexpected Error" });   
    }
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success }=updateBlogInput.safeParse(body)
	if (!success){
		c.status(411);
		return c.json({ error: "Input not correct" });
    }
    const updateUser = await prisma.post.update({
    where: {
        id: body.id,
    },
    data: {
        title:body.title,
        content:body.content,
    }
    })
    return c.json({
        id:updateUser.id
    })
})

//Add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    try {
        const blogs = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
            return c.json({
            blogs
            })
    } catch (error) {           
        c.status(411)
        return c.json({ error: "Failed while fetching the Data" });  
    }
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    try {
        const getData = await prisma.post.findUnique({
            where: {
                id: String(id)
            },
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
            })
            return c.json({
            getData
            })
    } catch (error) {           
        c.status(411)
        return c.json({ error: "Failed while fetching the Data" });  
    }
})

