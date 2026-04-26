const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        username: 'admin',
        password: 'admin123',
      });
      console.log('⚠ Default admin created (username: admin). Change password immediately.');
    }
  } catch (error) {
    console.error('Admin seed error:', error.message);
  }
};

module.exports = seedAdmin;
