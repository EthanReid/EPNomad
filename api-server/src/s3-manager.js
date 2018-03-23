const knox = require('knox');

class S3Manager {
  constructor() {
    this.client = knox.createClient({
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
      bucket: 'epnomad'
    });
  }

  deleteFiles(keys) {
    return new Promise((resolve, reject) => {
      this.client.deleteMultiple(keys, (err, res) => err ? reject(err) : resolve(res))
    });
  }
}

module.exports = S3Manager;