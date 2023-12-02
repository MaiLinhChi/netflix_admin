const authorization = {
  user: {
    create: ["admin"],
    update: ["admin"],
    delete: ["admin"],
  },
  list: {
    create: ["admin", "manager"],
    update: ["admin", "manager"],
    delete: ["admin", "manager"],
  },
  movies: {
    create: ["admin", "manager"],
    update: ["admin", "manager"],
    delete: ["admin", "manager"],
  },
};

export default authorization;
