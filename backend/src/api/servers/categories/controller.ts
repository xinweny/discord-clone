import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';
import { validateFields } from '@middleware/validateFields.js';

import { categoryService } from './service.js';

const getCategory: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
  tryCatch(
    async (req, res) => {
      const { serverId, categoryId } = req.params

      const category = await categoryService.get(serverId, categoryId);

      res.json({ data: category });
    }
  )
];

const getCategories: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
  tryCatch(
    async (req, res) => {
      const categories = await categoryService.get(req.params.serverId);

      res.json({ data: categories });
    }
  )
];

const createCategory: RequestHandler[] = [
  ...validateFields(['categoryName']),
  authenticate,
  authorize.server('manageChannels'),
  tryCatch(
    async (req, res) => {
      const { serverId } = req.params;

      const category = await categoryService.create(serverId, req.body.name);

      res.json({
        data: category,
        message: 'Category created successfully.',
      });
    }
  )
];

const updateCategory: RequestHandler[] = [
  ...validateFields(['categoryName']),
  authenticate,
  authorize.server('manageChannels'),
  tryCatch(
    async (req, res) => {
      const { serverId, categoryId } = req.params;

      const category = await categoryService.update(serverId, categoryId, req.body.name);

      res.json({
        data: category,
        message: 'Category updated successfully',
      });
    }
  )
];

const deleteCategory: RequestHandler[] = [
  authenticate,
  authorize.server('manageChannels'),
  tryCatch(
    async (req, res) => {
      const { serverId, categoryId } = req.params;

      const category = await categoryService.remove(serverId, categoryId);

      res.json({
        data: category,
        message: 'Category deleted successfully.',
      });
    }
  )
];

export const categoryController = {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};