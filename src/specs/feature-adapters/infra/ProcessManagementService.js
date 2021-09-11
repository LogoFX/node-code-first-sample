const { exec } = require('child_process');

class ProcessManagementService {
  proc;

  constructor() {}

  async start() {
    
    let currentDir = __dirname;
    process.chdir(currentDir + '/../../../');    
    this.proc = exec(
      'npm start',
      { cwd: process.cwd() },
      () => {}
    );
    
    await this.sleep(5000);
    process.chdir(currentDir);
  }

  async stop() {
    if (this.proc) {
      this.proc.kill();
    }
    await this.sleep(1000);
  }

  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
}

exports.ProcessManagementService = ProcessManagementService;
