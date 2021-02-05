const mongoose = require('mongoose');

const Articles = mongoose.model('articles');
const ArticlesCategories = mongoose.model('article_categories');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const castUserId = (userId) => mongoose.Types.ObjectId(userId);

module.exports = (app) => {
  // get a feature request and who submitted it
  app.get('/api/v1/articles/get/all', async (req, res) => {
    const forms = Articles
      .aggregate([
        {
          $lookup: {
            from: 'article_categories', // collection name in db
            localField: '_id',
            foreignField: 'article_id',
            as: 'categories',
          },

        },
        {
          $lookup: {
            from: 'article_comments', // collection name in db
            localField: '_id',
            foreignField: 'article_id',
            as: 'comments',
          },

        },
        { $sort: { _id: -1 } },
      ])
      .exec((e, objects) => {
        // students contain WorksnapsTimeEntries

        res.send(objects);
      });
  });
  // delete all previews in case they have not been deleted
  app.get('/api/v1/articles/delete/previews', async (req, res) => {
    try {
      const deleted = await Articles.deleteMany({ status: 'preview' });

      res.send({ success: true, deletedCount: deleted.deletedCount });
    } catch (e) {
      res.send({ success: false, message: e });
    }
  });

  // get a feature request and who submitted it
  app.get('/api/v1/articles/get/published', async (req, res) => {
    const forms = Articles
      .aggregate([
        {
          $match: {
            status: 'published',
          },
        },
        {
          $lookup: {
            from: 'article_categories', // collection name in db
            localField: '_id',
            foreignField: 'article_id',
            as: 'categories',
          },

        },
        {
          $lookup: {
            from: 'article_comments', // collection name in db
            localField: '_id',
            foreignField: 'article_id',
            as: 'comments',
          },

        },

        { $sort: { published_at: -1 } },
      ])
      .exec((e, objects) => {
        // students contain WorksnapsTimeEntries

        res.send(objects);
      });
  });

  // get a feature request and who submitted it
  app.get('/api/v1/articles/get/', async (req, res) => {
    const forms = Articles
      .aggregate([
        {
          $match: {
            _id: castUserId('5ce1c3cb0cb606746d7a2544'),
          },
        },
        {

          $lookup: {
            from: 'article_categories', // collection name in db
            localField: '_id',
            foreignField: 'article_id',
            as: 'categories',
          },
        },
        {
          $lookup: {
            from: 'article_comments', // collection name in db
            localField: '_id',
            foreignField: 'article_id',
            as: 'comments',
          },

        },

      ])
      .exec((e, objects) => {
        // students contain WorksnapsTimeEntries

        if (objects[0]) {
          if (objects[0]._id) {
            res.send(objects[0]);
            return;
          }
        }

        res.send({});
      });
  });

  // get a feature request and who submitted it
  app.post('/api/v1/articles_categories/delete/:id', async (req, res) => {
    const _id = req.params.id;

    try {
      const deleted = await ArticlesCategories.deleteMany({ article_id: _id });

      res.send({ success: true, deletedCount: deleted.deletedCount });
    } catch (e) {
      res.send({ success: false, message: e });
    }
  });

  /*
Documentation

this function deletes an article_caegory_name and article_cateogyr

*/
  app.get('/api/v1/article_categories/delete/:name', async (req, res) => {
    const forms = Articles
      .aggregate([
        {
          $lookup: {
            from: 'article_categories', // collection name in db
            localField: '_id',
            foreignField: 'article_id',
            as: 'categories',
          },
        },
        { $sort: { _id: -1 } },
      ])
      .exec((e, objects) => {
        // students contain WorksnapsTimeEntries

        res.send(objects);
      });
  });
};
