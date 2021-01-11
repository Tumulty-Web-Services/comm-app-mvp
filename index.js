
require('dotenv').load();

const app = require('./server/App');
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Started API on port ' + port));