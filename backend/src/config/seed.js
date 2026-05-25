const { prisma } = require('./db');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { username: 'admin' },
    });
    
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await prisma.admin.create({
        data: {
          username: 'admin',
          password: hashedPassword,
        },
      });
      console.log('⚠ Default admin created (username: admin). Change password immediately.');
    }
  } catch (error) {
    console.error('Admin seed error:', error.message);
  }
};

module.exports = seedAdmin;
