#!/usr/bin/env node

const os = require('os');
const chalk = require('chalk');

let cpuUsage = 0;
let memoryUsage = 0;
let diskUsage = 0;

const getCPUUsage = () => {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;
  cpus.forEach(cpu => {
    for (type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });
  const cpuPercent = ((totalTick / cpus.length) - totalIdle) / (totalTick / cpus.length) * 100;
  cpuUsage = cpuPercent.toFixed(2);
};

const getMemoryUsage = () => {
  const mem = process.memoryUsage();
  memoryUsage = (mem.rss / 1024 / 1024).toFixed(2);
};

const getDiskUsage = () => {
  const disk = os.diskUsage(__dirname);
  diskUsage = (disk.used / 1024 / 1024 / 1024).toFixed(2);
};

setInterval(() => {
  getCPUUsage();
  getMemoryUsage();
  getDiskUsage();
  console.clear();
  console.log(chalk.cyan(`CPU: ${cpuUsage}%`));
  console.log(chalk.cyan(`Memory: ${memoryUsage} MB`));
  console.log(chalk.cyan(`Disk: ${diskUsage} GB`));
}, 1000);