import {
  int,
  text,
  index,
  singlestoreTableCreator,
  singlestoreTable,
  bigint,
  timestamp,
} from "drizzle-orm/singlestore-core"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = singlestoreTableCreator(
//   (name) => `t3-drv_${name}`,
// )

export const users = singlestoreTable("users_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
})