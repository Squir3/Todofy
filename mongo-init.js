db.createUser({
  user: "todoadmin",
  pwd: "todoadmin",
  roles: [
    {
      role: "readWrite",
      db: "todofy",
    },
  ],
});
