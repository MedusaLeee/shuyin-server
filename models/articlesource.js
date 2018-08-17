module.exports = (sequelize, DataTypes) => {
  const ArticleSource = sequelize.define('ArticleSource', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    tableName: 'articleSource',
    comment: '文章源记录表'
  });
  ArticleSource.associate = function(models) { // eslint-disable-line
    // associations can be defined here
  };
  return ArticleSource;
};
