export const up = (pgm) => {

  pgm.createTable("users", {
    id: "serial primary key",
    first_name: { type: "text", notNull: true },
    last_name: { type: "text", notNull: true },
    mobile_number: { type: "text", notNull: true },
    email: { type: "text", unique: true, notNull: true },
    password: { type: "text", notNull: true },
    created_at: {
      type: "timestamp",
      default: pgm.func("now()")
    }
  });

  pgm.createTable("admin", {
    id: "serial primary key",
    name: { type: "text", notNull: true },
    email: { type: "text", unique: true },
    password: { type: "text", notNull: true },
    created_at: {
      type: "timestamp",
      default: pgm.func("now()")
    }
  });

};

export const down = (pgm) => {
  pgm.dropTable("admin");
  pgm.dropTable("users");
};
