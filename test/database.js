const Axios = require('axios');
const expect = require('expect.js');

describe('Database', () => {
  describe('schema', () => {
    it('should return an array of names, contain a users table, and not contain the SequelizeMeta table', async () => {
      const tableName = await Axios({ method: 'get', url: 'http://localhost:5000/api/schema/tables/names' });

      expect(tableName.data).to.be.an('array');
      expect(tableName.data).to.contain('users');
      expect(tableName.data).to.not.contain('SequelizeMeta');
    });
  });

  describe('Crud Updates: User', () => {
    // set a value so we can assign our created user to it
    let createdUser = '';

    it('should return a new user with an id and the correct given and family names', async () => {
      let user = await Axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/create',
        data: {
          family_name: 'last name',
          givenName: 'first Name',
        },
      });

      user = user.data;

      createdUser = user;

      expect(user).to.be.an('object');
      expect(user).to.have.property('id');
      expect(user.family_name).to.equal('last name');
      expect(user.givenName).to.equal('first Name');
    });

    it('should update a user to return a property family_name of "new family name"', async () => {
      let user = await Axios({
        method: 'post',
        url: `http://localhost:5000/api/users/update/${createdUser.id}`,
        data: {
          family_name: 'new family name',
        },
      });

      user = user.data;

      createdUser = user;

      expect(user).to.be.an('object');
      expect(user.family_name).to.equal('new family name');
    });

    it('should delete the last user created and return a status of success: true', async () => {
      let deletedUser = await Axios({ method: 'post', url: `http://localhost:5000/api/users/delete/${createdUser.id}` });

      deletedUser = deletedUser.data;

      expect(deletedUser).to.be.an('object');
      expect(deletedUser.success).to.equal(true);
    });
  });

  describe('Comments', () => {
    // set a value so we can assign our created user to it
    let createdLesson = '';

    it('should create a lesson so we have test data', async () => {
      let lesson = await Axios({
        method: 'post',
        url: 'http://localhost:5000/api/course_lessons/create',
        data: {
          name: 'test lesson',
          module_id: 2,
        },
      });

      lesson = lesson.data;

      createdLesson = lesson;

      expect(lesson).to.be.an('object');
      expect(lesson).to.have.property('id');
      expect(lesson).to.have.property('name');
      expect(lesson).to.have.property('module_id');
    });

    it('should return an array of comments with properties id, user_email, user_family_name, and user_picture_url', async () => {
      let tableSchema = await Axios({ method: 'get', url: 'http://localhost:5000/api/v1/comments/get/all' });
      tableSchema = tableSchema.data;

      expect(tableSchema).to.be.an('array');
      expect(tableSchema[0]).to.have.property('id');
      expect(tableSchema[0]).to.have.property('user_family_name');
      expect(tableSchema[0]).to.have.property('user_picture_url');
    });

    it('should return an array of comments with properties id,  lesson_name, user_id, family_name, user_picture_url', async () => {
      let lesson = await Axios({ method: 'get', url: 'http://localhost:5000/api/v1/comments/get_by_lesson/15' });
      lesson = lesson.data;

      console.log(lesson);
      expect(lesson).to.be.an('array');
      expect(lesson[0]).to.have.property('id');
      expect(lesson[0]).to.have.property('lesson_name');
      expect(lesson[0]).to.have.property('user_id');
      expect(lesson[0]).to.have.property('family_name');
      expect(lesson[0]).to.have.property('user_picture_url');
    });
  });
});
