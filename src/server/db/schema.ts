import "server-only"

import {
  bigint,
  text,
  index,
  singlestoreTableCreator,
  int,
} from "drizzle-orm/singlestore-core"

// files table
export const createTable = singlestoreTableCreator(
  (name) => `t3-drv_${name}`,
)

export const files_table = createTable(
  "files_table",
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    size: int("size").notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  },
  (tempTable) => {
    return [index("parent_index").on(tempTable.parent)]
  },
)

export type DB_FileType = typeof files_table.$inferInsert

// folders table
export const folders_table = createTable(
  "folders_table",
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
  },
  (tempTable) => {
    return [index("parent_index").on(tempTable.parent)]
  },
)

export type DB_FolderType = typeof folders_table.$inferInsert