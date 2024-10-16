import { Request, Response } from "express";
import { addCategorySchemaType } from "../schema/categorySchema";
import { prismaClient } from "..";
import responseHandler from "../services/responseHandler";

export const addCategory = async (req: Request<{}, {}, addCategorySchemaType>, res: Response) => {
  const { name } = req.body;
  let checkNameExist = await prismaClient.category.findFirst({ where: { name } });
  console.log(checkNameExist,"checkNameExist")
  let insertCategory=await prismaClient.category.create({data:{name}})
  console.log(insertCategory,"insertCategory")
  return responseHandler.success(res, "Category inserted successfully.", insertCategory);

};
