const cds = require("@sap/cds");
const express = require("express");

cds.on("bootstrap", (app) => {
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
});

module.exports = cds.server;