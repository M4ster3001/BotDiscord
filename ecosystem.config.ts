
const os = require( 'os' );

const numCPUs = os.cpus().length;
const numWorkers = Math.round( numCPUs * ( numCPUs <= 4 ? 0.5 : 0.8 ) );

module.exports = {
  apps : [{
    "name": "cryptocurrency_quotes",
    "exec_mode": "cluster",
    "instances": numWorkers,
    "script": "./src/server.ts",
    "interpreter": '/usr/app/node_modules/pm2/node_modules/.bin/ts-node',
    "max_memory_restart": "1G",
    "watch": ['src'],
    "ignore_watch": ['node_modules', 'src/sequelize'],
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
      "NODE_ENV": "production"
    },
  }],
};