const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      await Admin.create({
        username: 'admin',
        password: 'admin123',
      });
      console.log('⚠ Default admin created (username: admin). Change password immediately.');
    } else if (!existingAdmin.password.startsWith('$2a$') && !existingAdmin.password.startsWith('$2b$')) {
      // Fix admin with unhashed password from a previous failed seed
      existingAdmin.password = 'admin123';
      await existingAdmin.save();
      console.log('⚠ Admin password was rehashed (was stored in plaintext).');
    }
  } catch (error) {
    console.error('Admin seed error:', error.message);
  }
};

module.exports = seedAdmin;
