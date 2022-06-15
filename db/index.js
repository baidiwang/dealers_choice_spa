const Sequelize = require('sequelize');
const { STRING } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');

const Member = conn.define('member', {
    name: {
        type: STRING,
        allowNull: false, 
        validate: {
            notEmpty: true
        }
    }
});


const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Promise.all([
    Member.create({ name: 'Soyeon' }),
    Member.create({ name: 'Miyeon' }),
    Member.create({ name: 'Yuqi' }),
    Member.create({ name: 'Minnie' }),
    Member.create({ name: 'Shuhua' }),
  ]);
};

module.exports = {
  syncAndSeed,
  Member
};