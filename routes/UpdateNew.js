const Parser = require('rss-parser');
const parser = new Parser();

  async function studentPost(data) {
    // Lee el feed RSS
  const feed = await parser.parseURL(data.url);

  // Utiliza los datos del feed para actualizar los datos en la base de datos
  // Por ejemplo:
  const dataToUpdate = {
    title: feed.title,
    description: feed.description,
    items: feed.items,
    // ...
  };
  // Código que actualiza los datos en la base de datos
  console.log(dataToUpdate);

  }


  module.exports = {studentPost};