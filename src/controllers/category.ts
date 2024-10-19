import { Request, Response } from "express";
import { addCategorySchemaType, editCategorySchemaType, listCategorySchemaType } from "../schema/categorySchema";
import { prismaClient } from "..";
import responseHandler from "../services/responseHandler";

export const addCategory = async (req: Request<{}, {}, addCategorySchemaType>, res: Response) => {
  const { name, userId } = req.body;
  let checkNameExist = await prismaClient.category.findMany({ where: { name, userId } });
  if (checkNameExist.length > 0) {
    return responseHandler.validationError(res, "Category name alreday exists.");
  }
  let insertCategory = await prismaClient.category.create({ data: { name, userId } });
  return responseHandler.success(res, "Category inserted successfully.", insertCategory);
};

export const listCategory = async (req: Request<{}, {}, listCategorySchemaType>, res: Response) => {
  const { userId } = req.query;
  if (typeof userId !== "string") {
    return responseHandler.validationError(res, "Invalid userId format");
  }

  let findCategory = await prismaClient.category.findMany({ where: { userId } });
  if (findCategory.length < 1) {
    return responseHandler.success(res, "No data found.");
  }
  return responseHandler.success(res, "Data fetched successfully.", findCategory);
};

export const editCategory = async (req: Request<{}, {}, editCategorySchemaType>, res: Response) => {
  try {
    const { name, userId, categoryId } = req.body;
    let checkCategory = await prismaClient.category.findMany({ where: { uuid: categoryId } });
    if (checkCategory.length < 1) {
      return responseHandler.validationError(res, "No data found.");
    }
    let checkCategoryName = await prismaClient.category.findMany({ where: { userId, name } });
    if (checkCategoryName && checkCategoryName[0]?.uuid != categoryId) {
      return responseHandler.validationError(res, "Name already exists.");
    }
    const updateUser = await prismaClient.category.updateMany({
      where: {
        uuid: categoryId,
      },
      data: {
        name,
      },
    });
    if (updateUser.count == 1) {
      return responseHandler.success(res, "Data updated successfully.");
    } else {
      return responseHandler.validationError(res, "Data not updated.");
    }
  } catch (error) {}
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query;
    if (typeof categoryId !== "string") {
      return responseHandler.validationError(res, "Invalid userId format");
    }
    let checkCategory = await prismaClient.category.findMany({ where: { uuid: categoryId } });
    if (checkCategory.length < 1) {
      return responseHandler.validationError(res, "No data found.");
    }
    let deleteCategory = await prismaClient.category.deleteMany({ where: { uuid: categoryId } });
    if (deleteCategory.count == 1) {
      return responseHandler.success(res, "Category deleted succesfully.");
    } else {
      return responseHandler.success(res, "Category not deleted succesfully.");
    }
  } catch (error) {}
};
