module.exports = {
  name: "nodeplotlib-nx",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/nodeplotlib-nx/",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
